import { useCallback, useEffect, useState } from "react";
import { getMe, updateProfile } from "@/lib/auth-api";
import { isApiErrorResponse, type CurrentUser } from "@/types/auth";

const SAVED_USERNAMES_FIELD = "savedUsernames";
const CONNECTED_USERNAMES_FIELD = "connectedUsernames";

type SocialState = {
  savedUsernames: string[];
  connectedUsernames: string[];
  loading: boolean;
};

let state: SocialState = {
  savedUsernames: [],
  connectedUsernames: [],
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
    savedUsernames: parseIds(fields.get(SAVED_USERNAMES_FIELD)),
    connectedUsernames: parseIds(fields.get(CONNECTED_USERNAMES_FIELD)),
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
      setState({ savedUsernames: [], connectedUsernames: [], loading: false });
      return;
    }

    setState(stateFromUser(response.user));
  })().finally(() => {
    loadPromise = null;
  });

  return loadPromise;
}

async function persistSocialState(savedUsernames: string[], connectedUsernames: string[]) {
  const response = await updateProfile({
    fields: [
      { key: SAVED_USERNAMES_FIELD, value: JSON.stringify(uniqueIds(savedUsernames)) },
      { key: CONNECTED_USERNAMES_FIELD, value: JSON.stringify(uniqueIds(connectedUsernames)) },
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

  const toggleConnectedUserId = useCallback(async (username: string) => {
    const isConnected = state.connectedUsernames.includes(username);
    const connectedUsernames = isConnected
      ? state.connectedUsernames.filter((connectedId) => connectedId !== username)
      : [...state.connectedUsernames, username];
    const savedUsernames = isConnected
      ? state.savedUsernames.filter((savedId) => savedId !== username)
      : uniqueIds([...state.savedUsernames, username]);

    const persisted = await persistSocialState(savedUsernames, connectedUsernames);
    return persisted ? !isConnected : isConnected;
  }, []);

  const removeUserFromNetwork = useCallback(async (username: string) => {
    return persistSocialState(
      state.savedUsernames.filter((savedId) => savedId !== username),
      state.connectedUsernames.filter((connectedId) => connectedId !== username)
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
    savedUsernames: socialState.savedUsernames,
    loading: socialState.loading,
    removeUserFromNetwork: socialState.removeUserFromNetwork,
  };
}

export function useConnectedUsersState() {
  const socialState = useSocialState();
  return {
    connectedUsernames: socialState.connectedUsernames,
    loading: socialState.loading,
    toggleConnectedUserId: socialState.toggleConnectedUserId,
  };
}
