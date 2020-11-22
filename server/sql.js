// User API
const GET_USERS =
  "SELECT id, first_name, last_name, email, role, active FROM users ORDER BY id ASC";

const UPDATE_USER =
  "UPDATE users set first_name = COALESCE(?,first_name), last_name = COALESCE(?,last_name), password = COALESCE(?,password), active = COALESCE(?,active) WHERE id = ?";

const ADD_NEW_USER =
  "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)";

// Review API
const GET_REVIEWS_BY_USER_ID = `SELECT 
                                  title,
                                  start,
                                  end,
                                  first_name || ' ' || last_name AS name,
                                  content,
                                  review_key,
                                  is_closed,
                                  updated_time
                                  FROM   (SELECT review_main.title,
                                          review_main.is_closed,
                                          review_main.start,
                                          review_main.end,
                                          reviews.candidate_id,
                                          reviews.content,
                                          reviews.auditor_id,
                                          reviews.id AS review_key,
                                          reviews.updated_time
                                  FROM   review_main
                                          left join reviews
                                                ON review_main.id = reviews.review_id) AS A
                                  left join users
                                        ON users.id = A.candidate_id
                                  WHERE  A.auditor_id = ? ORDER BY is_closed ASC`;

const UPDATE_REVIEW_BY_USER_ID = `UPDATE reviews 
                                  SET  content = COALESCE(?, content),
                                       auditor_id = COALESCE(?, auditor_id),
                                       updated_time = COALESCE(?, updated_time)
                                  WHERE  id = ?`;

const GET_ALL_PERFORMANCE_PERIODS =
  "SELECT id, title, start, end, is_closed FROM review_main";

const GET_REVIEWS_BY_PERIOD_ID = `SELECT title, 
                                    candidate_name, 
                                    content, 
                                    auditor_id, 
                                    first_name || ' ' || last_name AS auditor_name, 
                                    review_key, 
                                    is_closed, 
                                    candidate_id,
                                    updated_time
                                    FROM   (SELECT title, 
                                            users.first_name || ' ' || users.last_name AS candidate_name, 
                                            content, 
                                            auditor_id, 
                                            review_key, 
                                            is_closed, 
                                            candidate_id,
                                            updated_time
                                    FROM   (SELECT review_main.title, 
                                                    review_main.is_closed, 
                                                    review_main.start, 
                                                    review_main.end, 
                                                    reviews.candidate_id, 
                                                    reviews.content, 
                                                    reviews.auditor_id, 
                                                    reviews.id AS review_key, 
                                                    reviews.review_id,
                                                    reviews.updated_time
                                            FROM   review_main 
                                                    LEFT JOIN reviews 
                                                          ON review_main.id = reviews.review_id) AS A 
                                            LEFT JOIN users 
                                                  ON users.id = A.candidate_id 
                                    WHERE  A.review_id = COALESCE(?, review_id) ) AS B
                                    LEFT JOIN users 
                                          ON users.id = B.auditor_id
                                    ORDER BY is_closed ASC `;

const ADD_NEW_PERFORMANCE_PERIOD =
  "INSERT INTO review_main (title, start, end) VALUES (?,?,?)";

const ADD_REVIEWS_FOR_NEW_PERIOD =
  "INSERT into reviews (candidate_id, review_id) SELECT id, ? from users WHERE active = 1";

const UPDATE_PERFORMANCE_PERIOD =
  "UPDATE review_main set title = COALESCE(?,title), start = COALESCE(?,start), end = COALESCE(?,end), is_closed = COALESCE(?,is_closed) WHERE id = ?";

module.exports = {
  GET_USERS,
  UPDATE_USER,
  ADD_NEW_USER,
  GET_REVIEWS_BY_USER_ID,
  UPDATE_REVIEW_BY_USER_ID,
  GET_ALL_PERFORMANCE_PERIODS,
  GET_REVIEWS_BY_PERIOD_ID,
  ADD_NEW_PERFORMANCE_PERIOD,
  ADD_REVIEWS_FOR_NEW_PERIOD,
  UPDATE_PERFORMANCE_PERIOD,
};
