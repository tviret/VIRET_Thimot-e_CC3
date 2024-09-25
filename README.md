Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur.

    Les en-têtes reçues sont les suivantes :

    HTTP/1.1 200 OK
    Date: Thu, 19 Sep 2024 04:35:26 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
    Transfer-Encoding: chunked

Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente.

    Les en-têtes reçues sont les suivantes :

    HTTP/1.1 200 OK
    Content-Type: application/json
    Date: Thu, 19 Sep 2024 04:37:44 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
    Content-Length: 20

    Celles qui ont changé sont : Content-type, Content-Lenght, Date


Question 1.3 que contient la réponse reçue par le client ?

    Le client ne reçoit aucune réponse

Question 1.4 quelle est l’erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d’erreur affiché.

    L'erreur affichée dans la console est : Error: ENOENT: no such file or directory, open 'C:\Users\viret\cours\devweb\devweb-tp5\index.html'
    
    Sur le site de l'api node on retrouve cette ligne à propos de ce code d'erreur : ENOENT (No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist. No entity (file or directory) could be found by the given path.

Question 1.5 donner le code de requestListener() modifié avec gestion d’erreur en async/await.
 ```javascript
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
```

Question 1.6 indiquer ce que cette commande a modifié dans votre projet.

    Cette commande a installé un dossier node_modules et un fichier package-lock.json dans mon répertoire.

Question 1.7 quelles sont les différences entre les scripts http-dev et http-prod ?

    http-dev restart automatiquement le serveur lorsqu'on modifie le fichier server-http.mjs, alors que http-prod ne restart pas le server quand on le fait.

Question 1.8 donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.

    http://localhost:8000/index.html    => code 200
    http://localhost:8000/random.html   => code 200
    http://localhost:8000/              => code 404
    http://localhost:8000/dont-exist    => code 404