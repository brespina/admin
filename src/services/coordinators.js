const mockCoordinators = [
  { coordinator_id: 101, user_id: 1, game_id: 1 },
  { coordinator_id: 102, user_id: 2, game_id: 2 },
]

export const getCoordinators = async () => Promise.resolve({ data: [...mockCoordinators] });
export const createCoordinator = async (coordinator) => {
  const newCoordinator = { ...coordinator, coordinator_id: Math.floor(Math.random() * 100000) }
  mockCoordinators.push(newCoordinator)
  return Promise.resolve({ data: newCoordinator })
}
export const updateCoordinator = async (id, updated) => {
  const idx = mockCoordinators.findIndex(c => c.coordinator_id === id)
  if (idx !== -1) {
    mockCoordinators[idx] = { ...mockCoordinators[idx], ...updated }
    return Promise.resolve({ data: mockCoordinators[idx] })
  }
  return Promise.reject(new Error("Coordinator not found"))
}
export const deleteCoordinator = async (id) => {
  const idx = mockCoordinators.findIndex(c => c.coordinator_id === id)
  if (idx !== -1) {
    mockCoordinators.splice(idx, 1)
    return Promise.resolve({ data: { success: true } })
  }
  return Promise.reject(new Error("Coordinator not found"))
}
