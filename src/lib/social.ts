import { useCallback, useEffect, useState } from "react";
import { getMe, updateProfile } from "@/lib/auth-api";
import { isApiErrorResponse, type CurrentUser } from "@/types/auth";

const SAVED_USER_IDS_FIELD = "savedUserIds";
const CONNECTED_USER_IDS_FIELD = "connectedUserIds";

type SocialState = {
  savedUserIds: string[];
  connectedUserIds: string[];
  loading: boolean;
};

let state: SocialState = {
  savedUserIds: [],
  connectedUserIds: [],
  loading: true,
};
let loadPromise: Promise<void> | null = null;
const listeners = new Set<() => void>();

function uniqueIds(ids: string[]) {
  return Array.from(new Set(ids.filter(Boolean)));
}

function parseIds(rawValue: string | undefined) {
  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed)
      ? uniqueIds(parsed.filter((value): value is string => typeof value === "string"))
      : [];
  } catch {
    return [];
  }
}

function stateFromUser(user: CurrentUser): SocialState {
  const fields = new Map(user.profileFields.map((field) => [field.key, field.rawValue]));

  return {
    savedUserIds: parseIds(fields.get(SAVED_USER_IDS_FIELD)),
    connectedUserIds: parseIds(fields.get(CONNECTED_USER_IDS_FIELD)),
    loading: false,
  };
}

function setState(nextState: SocialState) {
  state = nextState;
  listeners.forEach((listener) => listener());
}

async function loadSocialState() {
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const response = await getMe();
    if (isApiErrorResponse(response)) {
      setState({ savedUserIds: [], connectedUserIds: [], loading: false });
      return;
    }

    setState(stateFromUser(response.user));
  })().finally(() => {
    loadPromise = null;
  });

  return loadPromise;
}

async function persistSocialState(savedUserIds: string[], connectedUserIds: string[]) {
  const response = await updateProfile({
    fields: [
      { key: SAVED_USER_IDS_FIELD, value: JSON.stringify(uniqueIds(savedUserIds)) },
      { key: CONNECTED_USER_IDS_FIELD, value: JSON.stringify(uniqueIds(connectedUserIds)) },
    ],
  });

  if (isApiErrorResponse(response)) return false;

  setState(stateFromUser(response.user));
  return true;
}

function useSocialState() {
  const [, rerender] = useState(0);

  useEffect(() => {
    const listener = () => rerender((current) => current + 1);
    listeners.add(listener);
    void loadSocialState();

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const toggleConnectedUserId = useCallback(async (id: string) => {
    const isConnected = state.connectedUserIds.includes(id);
    const connectedUserIds = isConnected
      ? state.connectedUserIds.filter((connectedId) => connectedId !== id)
      : [...state.connectedUserIds, id];
    const savedUserIds = isConnected
      ? state.savedUserIds.filter((savedId) => savedId !== id)
      : uniqueIds([...state.savedUserIds, id]);

    const persisted = await persistSocialState(savedUserIds, connectedUserIds);
    return persisted ? !isConnected : isConnected;
  }, []);

  const removeUserFromNetwork = useCallback(async (id: string) => {
    return persistSocialState(
      state.savedUserIds.filter((savedId) => savedId !== id),
      state.connectedUserIds.filter((connectedId) => connectedId !== id)
    );
  }, []);

  return {
    ...state,
    toggleConnectedUserId,
    removeUserFromNetwork,
  };
}

export function useSavedUsersState() {
  const socialState = useSocialState();
  return {
    savedUserIds: socialState.savedUserIds,
    loading: socialState.loading,
    removeUserFromNetwork: socialState.removeUserFromNetwork,
  };
}

export function useConnectedUsersState() {
  const socialState = useSocialState();
  return {
    connectedUserIds: socialState.connectedUserIds,
    loading: socialState.loading,
    toggleConnectedUserId: socialState.toggleConnectedUserId,
  };
}
