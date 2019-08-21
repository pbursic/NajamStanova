module.exports = {
  begin: "BEGIN",

  end: "END",

  commit: "COMMIT",

  rollback: "ROLLBACK",

  getEmail: `SELECT 
                email
              FROM users
              WHERE email = $1`,

  getUser: `SELECT DISTINCT 
              users.name, 
              users.surname 
            FROM posts, users 
            WHERE posts.user_id = $1`,

  getUserDetail: `SELECT id, email, password, name, surname, birth_date, country, city, phone, encode(image::bytea, 'escape') image 
                  FROM users
                  WHERE email = $1`,

  getUserPosts: `SELECT 
                  DISTINCT ON (p.id)  p.*, i.id image_id, i.post_id, i.image
                  FROM 
                    posts p
                LEFT OUTER JOIN (SELECT DISTINCT ON (post_id, id) * from images) i
                on p.id = i.post_id,
                    users u
                  WHERE p.user_id = $1 
                  AND p.user_id = u.id`,

  getLoginUser: `SELECT 
            id,
            email,
            password,
            image 
          FROM users
          WHERE email = $1`,

  updateUser: `UPDATE 
                users 
                SET login_status = true 
                WHERE email = $1`,

  logoutUser: `UPDATE 
                users 
                SET login_status = false 
                WHERE email = $1`,

  getPosts: `SELECT 
	            DISTINCT ON (p.id) p.*, i.id image_id, i.post_id, i.image 
              FROM
                posts p
                LEFT OUTER JOIN (SELECT DISTINCT ON (post_id, id) * from images) i
                on p.id = i.post_id
              WHERE p.status = true`,

  getPostDetails: `SELECT 
                    * 
                  FROM posts, users 
                  WHERE posts.id = $1
                  AND posts.user_id = users.id`,

  getUserPostDetails: `SELECT 
                  * 
                FROM posts
                WHERE posts.id = $1`,

  postUser: `INSERT INTO users
              ("email", "password", "name", "surname", "birth_date", "country", "city", "phone", "image")
            VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,

  updateUserDetail: `UPDATE
                      users
                      SET 
                      "name" = $2,
                      "surname" = $3,
                      "country" = $4,
                      "city" = $5,
                      "phone" = $6,
                      "image" = $7
                      WHERE "email" = $1`,

  insertPost: `INSERT INTO posts
              ("user_id", "status", "title", "description", "bills_included", "country", "city", "address", "price",
              "squares", "type", "furnished", "bed", "room", "pet", "parking")
              VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8, $9,
              $10, $11, $12, $13, $14, $15, $16)
              RETURNING id`, // "available_date", "walkout_date", , $17, $18
  // "status", , $16

  updatePost: `UPDATE posts
              SET "title" = $2, "description" = $3, "bills_included" = $4, "country" = $5, "city" = $6, "address" = $7, "price" = $8,
              "squares" = $9, "type" = $10, "furnished" = $11, "bed" = $12, "room" = $13, "pet" = $14, "parking" = $15
              WHERE "id" = $1
              RETURNING id`, // "available_date", "walkout_date", , $17, $18
  // "status", , $16

  deletePost: `DELETE FROM posts WHERE id = $1`,

  getImages: `SELECT * FROM images WHERE post_id = $1`,

  insertImages: `INSERT INTO images
                  ("post_id", "image")
                  VALUES
                  %L`,

  deleteImages: `DELETE FROM images WHERE id IN (%L)`,

  getAvgPost: `SELECT ROUND(AVG(price::numeric), 2) avg_price, ROUND(AVG(squares::numeric), 0) avg_squares FROM posts WHERE posts.status = true`,

  updateStatus: `UPDATE posts SET status = $2 WHERE id = $1`
};
