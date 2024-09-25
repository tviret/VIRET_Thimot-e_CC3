import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    const url_splitted = request.url.split("/");
    console.log(url_splitted)
    switch (url_splitted[1]) {
      case "":    
        response.writeHead(200);
        return response.end(contents);
      case "index.html":
        response.writeHead(200);
        return response.end(contents);
      case "random":
        let size = Object.keys(url_splitted).length
        if(size == 3){
          let cpt = parseInt(url_splitted[2])
          if (cpt == NaN){
            response.writeHead(200);
            return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
          }
          else{
            let resp_html = `<html>`
            for(let i = 0 ; i < cpt ; i++){
              resp_html += `<p>${Math.floor(100 * Math.random())}</p>`
            }
            resp_html += `</html>`
            response.writeHead(200);
            return response.end(resp_html);
          }
        }else{
          response.writeHead(200);
        return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
        }
        
      

      response.writeHead(200);
        return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);

      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log("NODE_ENV =", process.env.NODE_ENV);
});