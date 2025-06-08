const mockOfficers = [
  { officer_id: 201, user_id: 1, role_id: 1, officer_image: '' },
  { officer_id: 202, user_id: 2, role_id: 2, officer_image: '' }
]
export const getOfficers = async () => Promise.resolve({ data: [...mockOfficers] });
export const createOfficer = async (officer) => {
  const newOfficer = { ...officer, officer_id: Math.floor(Math.random() * 100000) }
  mockOfficers.push(newOfficer)
  return Promise.resolve({ data: newOfficer })
}
export const updateOfficer = async (id, updated) => {
  const idx = mockOfficers.findIndex(o => o.officer_id === id)
  if (idx !== -1) {
    mockOfficers[idx] = { ...mockOfficers[idx], ...updated }
    return Promise.resolve({ data: mockOfficers[idx] })
  }
  return Promise.reject(new Error("Officer not found"))
}
export const deleteOfficer = async (id) => {
  const idx = mockOfficers.findIndex(o => o.officer_id === id)
  if (idx !== -1) {
    mockOfficers.splice(idx, 1)
    return Promise.resolve({ data: { success: true } })
  }
  return Promise.reject(new Error("Officer not found"))
}
