const mockSponsors = [
  {
    sponsor_id: 1,
    sponsor_name: "Red Bull",
    start_date: "2025-01-01T00:00:00",
    end_date: "2026-01-01T00:00:00",
  },
  {
    sponsor_id: 2,
    sponsor_name: "Alienware",
    start_date: "2024-08-01T00:00:00",
    end_date: "2025-08-01T00:00:00",
  },
];

export const getSponsors = async () =>
  Promise.resolve({ data: [...mockSponsors] });
export const createSponsor = async (sponsor) => {
  const newSponsor = {
    ...sponsor,
    sponsor_id: Math.floor(Math.random() * 100000),
  };
  mockSponsors.push(newSponsor);
  return Promise.resolve({ data: newSponsor });
};
export const updateSponsor = async (id, updated) => {
  const idx = mockSponsors.findIndex((s) => s.sponsor_id === id);
  if (idx !== -1) {
    mockSponsors[idx] = { ...mockSponsors[idx], ...updated };
    return Promise.resolve({ data: mockSponsors[idx] });
  }
  return Promise.reject(new Error("Sponsor not found"));
};
export const deleteSponsor = async (id) => {
  const idx = mockSponsors.findIndex((s) => s.sponsor_id === id);
  if (idx !== -1) {
    mockSponsors.splice(idx, 1);
    return Promise.resolve({ data: { success: true } });
  }
  return Promise.reject(new Error("Sponsor not found"));
};
