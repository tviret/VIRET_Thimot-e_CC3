import express from "express";
import morgan from "morgan";
import createError from "http-errors";  

const host = "localhost";
const port = 8000;

const app = express();
//app.use(http_errors)

app.set("view engine", "ejs");


app.use(express.static("static", {index:"index.html"})); // route / et /index.html
if (app.get("env") === "development") app.use(morgan("dev"));


app.get("/random/:nb", async function (request, response, next) {  // route /random/

  const length = Number.parseInt(request.params.nb, 10);

  if(Number.isNaN(length)) { return next(createError(400, "Le paramètre n'est pas un nombre valide"));}; // on vérifie que l'argument est bien un nombre

  const numbers = Array.from({ length},()=>Math.floor(Math.random()*100))
  const welcome = "Bienvenue sur la page de nombres aléatoires"

  return response.render("random", {numbers, welcome});
});


app.use((request, response, next) => {
  console.debug(`default route handler : ${request.url}`);
  return next(createError(404));
});

app.use((error, _request, response, _next) => {
  console.debug(`default error handler: ${error}`);
  const status = error.status ?? 500;
  const stack = app.get("env") === "development" ? error.stack : "";
  const result = { code: status, message: error.message, stack };
  return response.render("error", result);
});


const server = app.listen(port, host); 

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);