const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const bodyParser = require("body-parser");
const queries = require("../db/queries");
const transaction = require("../db/transaction");
const bcrypt = require("bcrypt");
const middleware = require("./middleware");
const formatSQL = require("pg-format");

router.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json({ limit: "5mb", extended: true });

// express.bodyParser({limit: '5mb'})

router.post("/", jsonParser, (req, res, next) => {
  const user_id = req.cookies["user_id"];

  transaction
    .getPool()
    .connect()
    .then(client => {
      client
        .query(queries.begin)
        .then(() => {
          const sql = queries.deleteImages;
          let params;

          return client.query(sql, params);
        })
        .then(() => {
          /*const sql = queries.insertPost;
          let params = [
            user_id,
            false,
            //req.body.status,
            req.body.title,
            req.body.description,
            req.body.bills_included,
            req.body.country,
            req.body.city,
            req.body.address,
            req.body.price,
            req.body.squares,
            req.body.type,
            //new Date(req.body.available_date),
            //new Date(req.body.walkout_date),
            req.body.furnished,
            req.body.bed,
            req.body.room,
            req.body.pet,
            req.body.parking
          ];

          return client.query(sql, params);*/
        })
        .then(results => {
          let post_id = results.rows[0].id;

          const sql2 = queries.insertImages;
          let arrayImages = [];
          req.body.images.forEach(img => {
            arrayImages.push([post_id, img]);
          });
          let sql = formatSQL(sql2, arrayImages);

          return client.query(sql);
        })
        .then(results2 => {
          res.status(200).json(results2);
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
