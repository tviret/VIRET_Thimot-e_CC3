import express from "express";
import morgan from "morgan";
import createError from "http-errors";  

const host = "localhost";
const port = 8000;

const app = express();
//app.use(http_errors)

app.set("view engine", "ejs");


app.use(express.static("static", {index:"index.html"}));
if (app.get("env") === "development") app.use(morgan("dev"));

app.get("/random/:nb", async function (request, response, next) {

  const length = Number.parseInt(request.params.nb, 10);

  if(Number.isNaN(length)) { return next(createError(400, "Le paramètre n'est pas un nombre valide"));}; // on vérifie que l'argument est bien un nombre
  
  const numbers = Array.from({ length},()=>Math.floor(Math.random()*100))
  const welcome = "Bienvenue sur la page de nombres aléatoires"

  return response.render("random", {numbers, welcome});
});

const server = app.listen(port, host); 

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);