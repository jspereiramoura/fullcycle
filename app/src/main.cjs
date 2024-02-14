const express = require("express");

const server = express();
server.use(express.json());

const mysql = require("mysql2");

const dbPool = mysql.createPool({
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
  charset: "utf8",
});

function getBaseHtml(content) {
  return `
  <!DOCTYPE html>
  <html lang="pt">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Full Cycle Rocks!</title>
  </head>
  <body>
      <h1>Full Cycle Rocks!</h1> 
      ${content}
  </body>
  </html>
`;
}

function getHtml(people) {
  let html = "";

  if (people?.length) {
    html += "<ul>";

    people.forEach((person) => {
      html += `<li>${person.name}</li>`;
    });

    html += "</ul>";
  }

  return getBaseHtml(html);
}

server.get("/", (_, res) => {
  res.status(200);
  res.contentType("text/html; charset=utf-8");

  dbPool.query("SELECT name FROM people", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro com a conexão do banco de dados.");
    } else {
      res.send(getHtml(results));
    }
  });
});

server.post("/people/add", (req, res) => {
  if (req.body) {
    dbPool.query(
      `INSERT INTO people(age, name) VALUES(${req.body["age"]}, '${req.body["name"]}')`,
      (err, _) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send("Erro ao tentar adicionar a pessoa ao banco de dados.");
        } else {
          res.sendStatus(200);
        }
      }
    );
  } else {
    res.status(400).send("Requisição malformada");
  }
});

server.listen(3000);
