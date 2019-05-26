module.exports = {
  getUser: `SELECT DISTINCT 
              users.name, 
              users.surname 
            FROM posts, users 
            WHERE posts.user_id = $1`,

  getLoginUser: `SELECT 
            email,
            password
          FROM users
          WHERE email = $1`,

  getEmail: `SELECT 
                email
              FROM users
              WHERE email = $1`,

  getPassword: `SELECT 
                password
              FROM users
              WHERE password = $1`,

  updateUser: `UPDATE 
                users 
                SET login_status = true 
                WHERE email = $1`,

  getPosts: `SELECT * FROM posts WHERE posts.status = true`,

  getPostDetails: `SELECT 
                      * 
                    FROM posts, users 
                    WHERE posts.id = $1
                    AND posts.user_id = users.id`,

  postUser: `INSERT INTO users
              ("email", "password", "name", "surname", "birth_date", "country", "city", "phone")
            VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8)`
};
