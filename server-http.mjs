import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

  async function requestListener(_request, response) {

    try{

      let contents = await fs.readFile("index.html", "utf8")
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);

    }
    catch(error){

      console.error(error);
            if (error['code'] == 'ENOENT'){     

              response.writeHead(500)
              return response.end('<h1> Erreur serveur, fichier ou dossier introuvable</h1>')
            }
            else{

              response.writeHead(500)
              return response.end('<h1> Une erreur serveur est survenue.</h1>')
            }
          }
  }

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log("NODE_ENV =", process.env.NODE_ENV);
});