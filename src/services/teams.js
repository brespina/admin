// src/services/teams.js

const mockTeams = [
  {
    team_id: 1,
    team_name: "Cougar Smash",
    game_id: 1,
    achievements: "2024 Spring Champions",
    coordinator_id: 101,
    player_image: "", // For demo, leave blank or use a URL string if you wish
    wins: 12,
    losses: 3,
  },
  {
    team_id: 2,
    team_name: "Valorant Elite",
    game_id: 2,
    achievements: "Runner Up Fall 2023",
    coordinator_id: 102,
    player_image: "",
    wins: 8,
    losses: 7,
  },
];

export const getTeams = async () => {
  return Promise.resolve({ data: [...mockTeams] });
};

export const createTeam = async (team) => {
  const newTeam = { ...team, team_id: Math.floor(Math.random() * 100000) };
  mockTeams.push(newTeam);
  return Promise.resolve({ data: newTeam });
};

export const updateTeam = async (id, updatedTeam) => {
  const idx = mockTeams.findIndex((t) => t.team_id === id);
  if (idx !== -1) {
    mockTeams[idx] = { ...mockTeams[idx], ...updatedTeam };
    return Promise.resolve({ data: mockTeams[idx] });
  }
  return Promise.reject(new Error("Team not found"));
};

export const deleteTeam = async (id) => {
  const idx = mockTeams.findIndex((t) => t.team_id === id);
  if (idx !== -1) {
    mockTeams.splice(idx, 1);
    return Promise.resolve({ data: { success: true } });
  }
  return Promise.reject(new Error("Team not found"));
};
