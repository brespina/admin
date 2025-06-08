// src/services/matches.js

const mockMatches = [
  {
    match_id: 1,
    date_time: "2025-03-22T18:00:00",
    opponent_name: "Texas State",
    team_id: 1,
    bg_image: "", // Could be a URL or base64 string for demo
    watch_link: "https://twitch.tv/coogesports"
  },
  {
    match_id: 2,
    date_time: "2025-04-10T20:00:00",
    opponent_name: "Rice University",
    team_id: 2,
    bg_image: "",
    watch_link: ""
  }
];

export const getMatches = async () => {
  return Promise.resolve({ data: [...mockMatches] });
};

export const createMatch = async (match) => {
  const newMatch = { ...match, match_id: Math.floor(Math.random() * 100000) };
  mockMatches.push(newMatch);
  return Promise.resolve({ data: newMatch });
};

export const updateMatch = async (id, updatedMatch) => {
  const idx = mockMatches.findIndex((m) => m.match_id === id);
  if (idx !== -1) {
    mockMatches[idx] = { ...mockMatches[idx], ...updatedMatch };
    return Promise.resolve({ data: mockMatches[idx] });
  }
  return Promise.reject(new Error("Match not found"));
};

export const deleteMatch = async (id) => {
  const idx = mockMatches.findIndex((m) => m.match_id === id);
  if (idx !== -1) {
    mockMatches.splice(idx, 1);
    return Promise.resolve({ data: { success: true } });
  }
  return Promise.reject(new Error("Match not found"));
};
