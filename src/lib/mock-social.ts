import { useEffect, useState } from "react";
import { savedUserIds as defaultSavedUserIds } from "@/data/users";

export const MOCK_SOCIAL_EVENT = "nexus-social-change";

const SAVED_USER_IDS_KEY = "nexus-saved-user-ids";
const CONNECTED_USER_IDS_KEY = "nexus-connected-user-ids";

function uniqueIds(ids: string[]) {
  return Array.from(new Set(ids.filter(Boolean)));
}

function readIds(key: string, fallback: string[]) {
  if (typeof window === "undefined") return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;

    return uniqueIds(parsed.filter((value): value is string => typeof value === "string"));
  } catch {
    return fallback;
  }
}

function writeIds(key: string, ids: string[]) {
  if (typeof window === "undefined") return uniqueIds(ids);

  const nextIds = uniqueIds(ids);
  window.localStorage.setItem(key, JSON.stringify(nextIds));
  emitSocialChange();
  return nextIds;
}

function useIds(reader: () => string[]) {
  const [ids, setIds] = useState<string[]>(() => reader());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sync = () => {
      setIds(reader());
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(MOCK_SOCIAL_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(MOCK_SOCIAL_EVENT, sync);
    };
  }, [reader]);

  return ids;
}

export function emitSocialChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(MOCK_SOCIAL_EVENT));
}

export function readSavedUserIds() {
  return readIds(SAVED_USER_IDS_KEY, defaultSavedUserIds);
}

export function readConnectedUserIds() {
  return readIds(CONNECTED_USER_IDS_KEY, []);
}

export function writeSavedUserIds(ids: string[]) {
  return writeIds(SAVED_USER_IDS_KEY, ids);
}

export function writeConnectedUserIds(ids: string[]) {
  return writeIds(CONNECTED_USER_IDS_KEY, ids);
}

export function toggleSavedUserId(id: string) {
  const savedIds = readSavedUserIds();
  const nextSavedIds = savedIds.includes(id)
    ? savedIds.filter((savedId) => savedId !== id)
    : [...savedIds, id];

  writeSavedUserIds(nextSavedIds);
  return !savedIds.includes(id);
}

export function toggleConnectedUserId(id: string) {
  const connectedIds = readConnectedUserIds();
  const isConnected = connectedIds.includes(id);
  const nextConnectedIds = isConnected
    ? connectedIds.filter((connectedId) => connectedId !== id)
    : [...connectedIds, id];

  writeConnectedUserIds(nextConnectedIds);

  const savedIds = readSavedUserIds();
  if (isConnected) {
    writeSavedUserIds(savedIds.filter((savedId) => savedId !== id));
  } else if (!savedIds.includes(id)) {
    writeSavedUserIds([...savedIds, id]);
  }

  return !isConnected;
}

export function removeUserFromNetwork(id: string) {
  writeSavedUserIds(readSavedUserIds().filter((savedId) => savedId !== id));
  writeConnectedUserIds(readConnectedUserIds().filter((connectedId) => connectedId !== id));
}

export function useSavedUsersState() {
  const savedUserIds = useIds(readSavedUserIds);

  return {
    savedUserIds,
    replaceSavedUserIds: writeSavedUserIds,
    toggleSavedUserId,
  };
}

export function useConnectedUsersState() {
  const connectedUserIds = useIds(readConnectedUserIds);

  return {
    connectedUserIds,
    replaceConnectedUserIds: writeConnectedUserIds,
    toggleConnectedUserId,
  };
}
