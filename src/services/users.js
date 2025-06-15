import http from "./http";

export function listUsers(params = { skip: 0, limit: 100 }) {
  return http.get("/users/", { params });
}

export function getUser(id) {
  return http.get(`/users/${id}`);
}

export function createUser(payload) {
  /*  FastAPI expects:
      {
        "email":        "...",
        "first_name":   "...",
        "last_name":    "...",
        "phone_number": null,
        "discord_username": null,
        "profile_picture": null
      }
      see UserBase => UserCreate in schemas.py 
  */
  return http.post("/users/", payload);
}

export function updateUser(id, partial) {
  return http.patch(`/users/${id}`, partial);
}

export function deleteUser(id) {
  return http.delete(`/users/${id}`);
}
