/*
--------------------------------------
|               USERS                |
--------------------------------------
| id (PK)                | INTEGER   |
| first_name             | TEXT      |
| last_name              | TEXT      |
| email	(UNIQUE)         | TEXT      |
| password               | TEXT      |
| role                   | TEXT      | 
| active (DEFAULT:1)     | INTEGER   |
| created_time (Auto)    | TIMESTAMP |
--------------------------------------

--------------------------------------
|            REVIEW_MAIN             |
--------------------------------------
| id (PK)                | INTEGER   |
| title                  | TEXT      |
| start_time             | TEXT      |
| end_time               | TEXT      |
| is_closed (DEFAULT:0)  | INTEGER   |
| created_time (Auto)    | TIMESTAMP |
--------------------------------------

--------------------------------------
|              REVIEWS               |
--------------------------------------
| id (PK)                | INTEGER   |
| review_id (FK)         | INTEGER   |
| auditor_id (FK)        | INTEGER   |
| candidate_id (FK)      | INTEGER   |
| updated_time           | TEXT      |
| content (DEFAULT:'')   | TEXT      |
| created_time (Auto)    | TIMESTAMP |
--------------------------------------
*/

module.exports = {
  CREATE_USERS_TABLE: `CREATE TABLE users (
                                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                                            first_name TEXT,
                                            last_name TEXT,
                                            email TEXT UNIQUE,
                                            password TEXT,
                                            role TEXT DEFAULT user,
                                            active INTEGER DEFAULT 1,
                                            created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                            CONSTRAINT email_unique UNIQUE (email)
                                          )`,
  CREATE_REVIEW_MAIN_TABLE: `CREATE TABLE review_main (
                                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                        title TEXT UNIQUE,
                                                        start TEXT,
                                                        end TEXT,
                                                        is_closed INTEGER DEFAULT 0,
                                                        created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                                      )`,
  CREATE_REVIEWS_TABLE: `CREATE TABLE reviews (
                                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                review_id INTEGER,
                                                auditor_id INTEGER,
                                                candidate_id INTEGER,
                                                updated_time TEXT DEFAULT '',
                                                content TEXT DEFAULT '',
                                                created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                              )`,
};
