// This file acts as a fake/mock API for user CRUD operations.
// Swap these for real HTTP requests to your backend when ready.
// chatGPT 4.1 BABY

const mockUsers = [
  {
    user_id: 1,
    username: "jdoe",
    email: "john@coog.edu",
    first_name: "John",
    last_name: "Doe",
    paid_dues: true,
    signup_date: "2025-05-01",
  },
  {
    user_id: 2,
    username: "asmith",
    email: "anna@coog.edu",
    first_name: "Anna",
    last_name: "Smith",
    paid_dues: false,
    signup_date: "2025-01-15",
  },
];

// For demo, all functions use Promise to simulate async/HTTP
// src/services/users.js

export const getUsers = async () => {
  // Always return the latest array (simulate fresh fetch)
  return Promise.resolve({ data: [...mockUsers] });
};

export const createUser = async (user) => {
  const newUser = { ...user, user_id: Math.floor(Math.random() * 100000) };
  mockUsers.push(newUser);
  return Promise.resolve({ data: newUser });
};

export const updateUser = async (id, updatedUser) => {
  const idx = mockUsers.findIndex((u) => u.user_id === id);
  if (idx !== -1) {
    mockUsers[idx] = { ...mockUsers[idx], ...updatedUser };
    return Promise.resolve({ data: mockUsers[idx] });
  }
  return Promise.reject(new Error("User not found"));
};

export const deleteUser = async (id) => {
  const idx = mockUsers.findIndex((u) => u.user_id === id);
  if (idx !== -1) {
    mockUsers.splice(idx, 1);
    return Promise.resolve({ data: { success: true } });
  }
  return Promise.reject(new Error("User not found"));
};
