module.exports = {
  begin: "BEGIN",

  end: "END",

  commit: "COMMIT",

  rollback: "ROLLBACK",

  getUser: `SELECT DISTINCT 
              users.name, 
              users.surname 
            FROM posts, users 
            WHERE posts.user_id = $1`,

  getUserPosts: `select posts.id from posts, users where posts.user_id = $1 AND posts.user_id = users.id`,

  //get: `select * from posts post, users us where us.email = $1 and post.user_id = us.id`,

  getLoginUser: `SELECT 
            id,
            email,
            password
          FROM users
          WHERE email = $1`,

  /*getEmail: `SELECT 
                email
              FROM users
              WHERE email = $1`,

  getPassword: `SELECT 
                password
              FROM users
              WHERE password = $1`,*/

  updateUser: `UPDATE 
                users 
                SET login_status = true 
                WHERE email = $1`,

  logoutUser: `UPDATE 
                users 
                SET login_status = false 
                WHERE email = $1`,

  getPosts: `SELECT * FROM posts WHERE posts.status = true`,

  getPostDetails: `SELECT 
                      * 
                    FROM posts, users 
                    WHERE posts.id = $1
                    AND posts.user_id = users.id`,

  postUser: `INSERT INTO users
              ("email", "password", "name", "surname", "birth_date", "country", "city", "phone", "image")
            VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,

  insertPost: `INSERT INTO posts
              ("user_id", "status", "title", "description", "bills_included", "country", "city", "address", "price",
              "squares", "type", "available_date", "walkout_date", "furnished", "bed", "room", "pet", "parking")
              VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8, $9,
              $10, $11, $12, $13, $14, $15, $16, $17, $18);`
};
