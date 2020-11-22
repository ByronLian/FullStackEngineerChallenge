// User API
const GET_USERS =
  "SELECT id, first_name, last_name, email, role, active FROM users ORDER BY id ASC";

const UPDATE_USER =
  "UPDATE users set first_name = COALESCE(?,first_name), last_name = COALESCE(?,last_name), password = COALESCE(?,password), active = COALESCE(?,active) WHERE id = ?";

const ADD_NEW_USER =
  "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)";

module.exports = {
  GET_USERS,
  UPDATE_USER,
  ADD_NEW_USER,
};
