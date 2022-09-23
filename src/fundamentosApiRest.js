const express = require('express');

const app = express();

app.use(express.json())

app.get("/cats", (request, response) => { //request recebe, response envia retorno 
  const query = request.query
  console.log(query);

  return response.json([
    "new",
    "pretinha",
  ])
})

app.post("/cats", (request, response) => {
  const body = request.body;
  console.log(body);
  return response.json([
    "new",
    "pretinha",
    "asta",
  ])
})

app.put("/cats/:id", (request, response) => {
  const { id } = request.params;
  console.log(id)

  return response.json([
    "new",
    "pretinha",
    "gatinho anão",
  ])
})

app.patch("/cats/:id", (request, response) => {
  return response.json([
    "new",
    "pretinha(o)",
    "gatinho anão",
  ])
})

app.delete("/cats/:id", (request, response) => {
  return response.json([
    "new",
    "pretinha(o)",
  ])
})

app.listen(3000) //startar a aplicação