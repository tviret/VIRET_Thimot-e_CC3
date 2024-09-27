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

PARTIE 2 : framework Express

Question 2.1 : donner les URL des documentations de chacun des modules installés par la commande précédente.

    https://expressjs.com/fr/
    https://www.npmjs.com/package/http-errors
    https://www.npmjs.com/package/loglevel
    https://www.npmjs.com/package/morgan

Question 2.3 lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?

    Les headers renvoyés par Express sont :

      HTTP/1.1 200 OK
      X-Powered-By: Express
      Accept-Ranges: bytes
      Cache-Control: public, max-age=0
      Last-Modified: Wed, 25 Sep 2024 02:37:59 GMT
      ETag: W/"10e-192270aeb3f"
      Content-Type: text/html; charset=UTF-8
      Content-Length: 270
      Date: Thu, 26 Sep 2024 22:15:11 GMT
      Connection: keep-alive
      Keep-Alive: timeout=5

    Les nouvelles en-têtes sont  X-Powered-By, Accept-Ranges, Cache-Control, Last-Modified, ETag

Question 2.4 quand l’événement listening est-il déclenché ?

    L'evenement listenning est demarré au lancement du serveur Express au moment où celui-ci commence à écouter les requêtes

Question 2.5 indiquer quelle est l’option (activée par défaut) qui redirige / vers /index.html ?

    L'option activée par défaut qui permet cela est l'option "index" qu'on peut utiliser comme suit :  

      app.use(express.static("static", {index:"index.html"})); activée par défaut redirige / vers /index.html
      app.use(express.static("static", {index:"home.html"})); renvoirait / vers /home.html
      app.use(express.static("static", {index:false})); désactive le routage automatique de /

Question 2.6 visiter la page d’accueil puis rafraichir (Ctrl+R) et ensuite forcer le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier style.css ? Justifier.

  Avec le rafraichissement normal on a un code 304 pour style.css, ce code signifie que le fichier a été recupéré depuis le cache du navigateur.
  Avec le rafraichissement forcé on a un code 200 car on force le navigateur à ne pas récupérer les données dans le cache et redemander directement au serveur.