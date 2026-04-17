import { createContext, useContext, useEffect, useMemo, useState } from "react";
import generateFriends from "../utils/friendGenerator";

const KeenKeeperContext = createContext(null);
const TIMELINE_STORAGE_KEY = "keenkeeper.timeline.v2";
const FRIENDS_STORAGE_KEY = "keenkeeper.friends.v1";
const allowedStatuses = new Set(["overdue", "almost due", "on-track"]);
const allowedInteractionTypes = new Set(["call", "text", "video"]);

const defaultTimeline = [];

function sortEntriesByDate(entries) {
  return [...entries].sort((a, b) => {
    const left = new Date(a.createdAt ?? a.date).getTime();
    const right = new Date(b.createdAt ?? b.date).getTime();
    return right - left;
  });
}

function isValidIsoDate(value) {
  if (typeof value !== "string" || value.length < 10) {
    return false;
  }
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp);
}

function sanitizeFriend(friend) {
  if (!friend || typeof friend !== "object") {
    return null;
  }

  const id = Number(friend.id);
  const goal = Number(friend.goal);
  const daysSinceContact = Number(friend.days_since_contact);

  if (!Number.isFinite(id) || !friend.name || !friend.email || !friend.picture || !Number.isFinite(goal)) {
    return null;
  }

  const normalizedDays = Number.isFinite(daysSinceContact) && daysSinceContact >= 0 ? daysSinceContact : goal;
  const normalizedStatus = allowedStatuses.has(friend.status) ? friend.status : deriveStatus(normalizedDays, goal);
  const normalizedDueDate = isValidIsoDate(friend.next_due_date)
    ? friend.next_due_date
    : addDaysToIsoDate(new Date(), goal);

  return {
    id,
    name: String(friend.name),
    picture: String(friend.picture),
    email: String(friend.email),
    days_since_contact: normalizedDays,
    status: normalizedStatus,
    tags: Array.isArray(friend.tags) ? friend.tags.map((tag) => String(tag)) : [],
    bio: String(friend.bio ?? ""),
    goal,
    next_due_date: normalizedDueDate
  };
}

function sanitizeTimelineEntry(entry) {
  if (!entry || typeof entry !== "object") {
    return null;
  }

  const type = String(entry.type ?? "").toLowerCase();
  if (!allowedInteractionTypes.has(type)) {
    return null;
  }

  const friendName = String(entry.friendName ?? "").trim();
  if (!friendName) {
    return null;
  }

  const date = isValidIsoDate(entry.date) ? entry.date : new Date().toISOString().slice(0, 10);
  const createdAt = isValidIsoDate(entry.createdAt) ? entry.createdAt : `${date}T00:00:00.000Z`;
  const title = String(entry.title ?? `${type.charAt(0).toUpperCase()}${type.slice(1)} with ${friendName}`);

  return {
    id: String(entry.id ?? `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`),
    type,
    friendName,
    date,
    createdAt,
    title
  };
}

function addDaysToIsoDate(baseDate, daysToAdd) {
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  return nextDate.toISOString().slice(0, 10);
}

function deriveStatus(daysSinceContact, goal) {
  if (daysSinceContact > goal) {
    return "overdue";
  }
  if (daysSinceContact >= Math.max(goal - 5, 0)) {
    return "almost due";
  }
  return "on-track";
}

function safeGetStorageItem(key) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetStorageItem(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage write failures so rendering can continue.
  }
}

function safeRemoveStorageItem(key) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage removal failures so rendering can continue.
  }
}

function loadTimelineFromStorage() {
  if (typeof window === "undefined") {
    return defaultTimeline;
  }

  const stored = safeGetStorageItem(TIMELINE_STORAGE_KEY);
  if (!stored) {
    return defaultTimeline;
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      safeRemoveStorageItem(TIMELINE_STORAGE_KEY);
      return defaultTimeline;
    }
    const normalized = parsed.map(sanitizeTimelineEntry).filter(Boolean);
    if (normalized.length === 0) {
      safeRemoveStorageItem(TIMELINE_STORAGE_KEY);
      return defaultTimeline;
    }
    return sortEntriesByDate(normalized);
  } catch {
    safeRemoveStorageItem(TIMELINE_STORAGE_KEY);
    return defaultTimeline;
  }
}

function loadFriendsFromStorage() {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = safeGetStorageItem(FRIENDS_STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      safeRemoveStorageItem(FRIENDS_STORAGE_KEY);
      return [];
    }
    const normalized = parsed.map(sanitizeFriend).filter(Boolean);
    if (normalized.length === 0) {
      safeRemoveStorageItem(FRIENDS_STORAGE_KEY);
      return [];
    }
    return normalized;
  } catch {
    safeRemoveStorageItem(FRIENDS_STORAGE_KEY);
    return [];
  }
}

function mergeFriendsWithStored(baseFriends, storedFriends) {
  if (!Array.isArray(baseFriends) || baseFriends.length === 0) {
    return [];
  }

  const storedMap = new Map(storedFriends.map((friend) => [friend.id, friend]));
  return baseFriends.map((baseFriend) => {
    const storedFriend = storedMap.get(baseFriend.id);
    if (!storedFriend) {
      return baseFriend;
    }

    // Keep identity/profile fields from source JSON while preserving progress-like fields from storage.
    return {
      ...baseFriend,
      days_since_contact: storedFriend.days_since_contact,
      status: storedFriend.status,
      next_due_date: storedFriend.next_due_date
    };
  });
}

export function KeenKeeperProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [friendsError, setFriendsError] = useState("");
  const [timelineEntries, setTimelineEntries] = useState(loadTimelineFromStorage);

  useEffect(() => {
    let isMounted = true;

    async function loadFriends() {
      const storedFriends = loadFriendsFromStorage();
      setFriendsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 750));
        const friendsUrl = `${import.meta.env.BASE_URL}friends.json`;
        const response = await fetch(friendsUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch friend profiles.");
        }
        const data = await response.json();
        const normalizedData = Array.isArray(data) ? data.map(sanitizeFriend).filter(Boolean) : [];
        if (normalizedData.length === 0) {
          // Fallback to dynamically generated friends
          const generatedFriends = generateFriends(16);
          if (isMounted) {
            setFriends(mergeFriendsWithStored(generatedFriends, storedFriends));
            setFriendsError("");
          }
          return;
        }
        const mergedData = mergeFriendsWithStored(normalizedData, storedFriends);
        if (isMounted) {
          setFriends(mergedData);
          setFriendsError("");
        }
      } catch (error) {
        if (isMounted) {
          if (storedFriends.length > 0) {
            setFriends(storedFriends);
            setFriendsError("");
          } else {
            // Fallback to dynamically generated friends
            const generatedFriends = generateFriends(16);
            setFriends(generatedFriends);
            setFriendsError("");
          }
        }
      } finally {
        if (isMounted) {
          setFriendsLoading(false);
        }
      }
    }

    loadFriends();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || friends.length === 0) {
      return;
    }
    safeSetStorageItem(FRIENDS_STORAGE_KEY, JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    safeSetStorageItem(TIMELINE_STORAGE_KEY, JSON.stringify(timelineEntries));
  }, [timelineEntries]);

  const addTimelineEntry = (friend, interactionType) => {
    const normalizedType = interactionType.toLowerCase();
    const now = new Date();
    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      type: normalizedType,
      friendName: friend.name,
      date: now.toISOString().slice(0, 10),
      createdAt: now.toISOString(),
      title: `${normalizedType.charAt(0).toUpperCase()}${normalizedType.slice(1)} with ${friend.name}`
    };

    setTimelineEntries((previousEntries) => sortEntriesByDate([newEntry, ...previousEntries]));

    if (friend?.id !== undefined) {
      setFriends((previousFriends) =>
        previousFriends.map((profile) => {
          if (profile.id !== friend.id) {
            return profile;
          }

          const refreshedDays = 0;
          return {
            ...profile,
            days_since_contact: refreshedDays,
            status: deriveStatus(refreshedDays, profile.goal),
            next_due_date: addDaysToIsoDate(now, profile.goal)
          };
        })
      );
    }

    return newEntry;
  };

  const totalInteractions = timelineEntries.length;
  const latestInteraction = timelineEntries[0] ?? null;

  const interactionCounts = useMemo(() => {
    return timelineEntries.reduce(
      (counts, entry) => {
        if (counts[entry.type] !== undefined) {
          counts[entry.type] += 1;
        }
        return counts;
      },
      { call: 0, text: 0, video: 0 }
    );
  }, [timelineEntries]);

  const interactionsThisMonth = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    return timelineEntries.filter((entry) => {
      const date = new Date(entry.date);
      return date.getMonth() === month && date.getFullYear() === year;
    }).length;
  }, [timelineEntries]);

  const contextValue = useMemo(
    () => ({
      friends,
      friendsLoading,
      friendsError,
      timelineEntries,
      interactionCounts,
      interactionsThisMonth,
      totalInteractions,
      latestInteraction,
      addTimelineEntry
    }),
    [friends, friendsError, friendsLoading, interactionCounts, interactionsThisMonth, latestInteraction, timelineEntries, totalInteractions]
  );

  return <KeenKeeperContext.Provider value={contextValue}>{children}</KeenKeeperContext.Provider>;
}

export function useKeenKeeper() {
  const context = useContext(KeenKeeperContext);
  if (!context) {
    throw new Error("useKeenKeeper must be used within KeenKeeperProvider.");
  }
  return context;
}
