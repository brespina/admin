// src/services/events.js

const mockEvents = [
  {
    event_id: 1,
    title: "Spring Kickoff",
    description: "Welcome event for all members!",
    location: "Student Center South, Houston, TX",
    date_time: "2025-02-01T18:00:00",
    end_time: "2025-02-01T20:00:00",
    attendance: 48,
  },
  {
    event_id: 2,
    title: "Smash Bros Tournament",
    description: "Open bracket tournament—prizes for top 3.",
    location: "Esports Lounge",
    date_time: "2025-03-15T15:00:00",
    end_time: "2025-03-15T19:00:00",
    attendance: 32,
  },
];

export const getEvents = async () => {
  return Promise.resolve({ data: [...mockEvents] });
};

export const createEvent = async (event) => {
  const newEvent = { ...event, event_id: Math.floor(Math.random() * 100000) };
  mockEvents.push(newEvent);
  return Promise.resolve({ data: newEvent });
};

export const updateEvent = async (id, updatedEvent) => {
  const idx = mockEvents.findIndex((e) => e.event_id === id);
  if (idx !== -1) {
    mockEvents[idx] = { ...mockEvents[idx], ...updatedEvent };
    return Promise.resolve({ data: mockEvents[idx] });
  }
  return Promise.reject(new Error("Event not found"));
};

export const deleteEvent = async (id) => {
  const idx = mockEvents.findIndex((e) => e.event_id === id);
  if (idx !== -1) {
    mockEvents.splice(idx, 1);
    return Promise.resolve({ data: { success: true } });
  }
  return Promise.reject(new Error("Event not found"));
};
