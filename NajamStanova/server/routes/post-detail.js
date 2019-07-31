const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");
const transaction = require("../db/transaction");
const formatSQL = require("pg-format");

router.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json({ limit: "5mb", extended: true });

router.get("/:id", (req, res) => {
  const client = new Client();
  let posts;
  client
    .connect()
    .then(() => {
      const sql = queries.getPostDetails;
      let params = [req.params.id];
      return client.query(sql, params);
    })
    .then(post => {
      posts = post;
      //res.status(200).json(post);
      const sql = queries.getImages;
      let params = [req.params.id];
      return client.query(sql, params);
    })
    .then(images => {
      posts.rows[0].images = images.rows;
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
    })
    .then(() => client.end());
});

router.put("/:id", jsonParser, (req, res) => {
  transaction
    .getPool()
    .connect()
    .then(client => {
      client
        .query(queries.begin)
        .then(() => {
          const sql = queries.updateStatus;
          let status = req.body.status;
          let params = [req.body.id, !status];

          console.log("body: ", req.body);
          return client.query(sql, params);
        })
        .then(results => {
          res.status(200).json(results);
          transaction.commit(client);
        })
        .catch(err => {
          console.log("error", err);
          client.query(queries.end);
          transaction.rollback(client);
        })
        .then(() => {
          client.release();
        });
    })
    .catch(err => {
      console.log("error", err);
      res.status(401).json(err);
    });
});

router.delete("/:id", jsonParser, (req, res) => {
  transaction
    .getPool()
    .connect()
    .then(client => {
      client
        .query(queries.begin)
        .then(() => {
          return client.query(queries.deletePost, [req.params.id]);
        })
        .then(results => {
          res.status(200).json(results);
          transaction.commit(client);
        })
        .catch(err => {
          console.log("error", err);
          client.query(queries.end);
          transaction.rollback(client);
        })
        .then(() => {
          client.release();
        });
    })
    .catch(err => {
      console.log("error", err);
      res.status(401).json(err);
    });
});

//getUserPostDetails
router.get("/:id/post-edit", (req, res) => {
  const client = new Client();
  let posts;
  client
    .connect()
    .then(() => {
      const sql = queries.getUserPostDetails;
      let params = [req.params.id];
      return client.query(sql, params);
    })
    .then(post => {
      posts = post;
      //res.status(200).json(post);
      const sql = queries.getImages;
      let params = [req.params.id];
      return client.query(sql, params);
    })
    .then(images => {
      posts.rows[0].images = images.rows;
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
    })
    .then(() => client.end());
});

router.post("/:id/post-edit", jsonParser, (req, res, next) => {
  //const user_id = req.cookies["user_id"];
  let update;

  transaction
    .getPool()
    .connect()
    .then(client => {
      client
        .query(queries.begin)
        .then(() => {
          /*console.log(
            "req.body.deletedImages.lenght: ",
            req.body.deletedImages.length
          );*/
          if (req.body.deletedImages.length > 0) {
            const sql2 = queries.deleteImages;
            console.log("req.body: ", req.body);
            let params = req.body.deletedImages;

            console.log("params: ", params);
            let sql = formatSQL(sql2, params);

            return client.query(sql);
          }
        })
        .then(() => {
          console.log("req.body: ", req.params);
          console.log("req.body.id: ", req.body.id);
          const sql = queries.updatePost;
          let params = [
            req.params.id,
            req.body.title,
            req.body.description,
            req.body.bills_included,
            req.body.country,
            req.body.city,
            req.body.address,
            req.body.price,
            req.body.squares,
            req.body.type,
            req.body.furnished,
            req.body.bed,
            req.body.room,
            req.body.pet,
            req.body.parking
          ];

          return client.query(sql, params);
        })
        .then(results => {
          console.log("results: ", results);
          update = results;
          let post_id = results.rows[0].id;

          if (req.body.images.length > 0) {
            const sql2 = queries.insertImages;
            let arrayImages = [];
            req.body.images.forEach(img => {
              arrayImages.push([post_id, img]);
            });
            let sql = formatSQL(sql2, arrayImages);
            return client.query(sql);
          }
        })
        .then(results => {
          res.status(200).json(update);
          transaction.commit(client);
        })
        .catch(err => {
          console.log("error", err);
          client.query(queries.end);
          transaction.rollback(client);
        })
        .then(() => {
          client.release();
        });
    })
    .catch(err => {
      console.log("error", err);
      res.status(401).json(err);
    });
});

module.exports = router;
