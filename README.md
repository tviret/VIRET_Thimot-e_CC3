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

    Celles qui ont changé sont : Content-type, Content-Lenght


Question 1.3 que contient la réponse reçue par le client ?

    Le client ne reçoit aucune réponse

Question 1.4 quelle est l’erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d’erreur affiché.

    L'erreur affichée dans la console est : Error: ENOENT: no such file or directory, open 'C:\Users\viret\cours\devweb\devweb-tp5\index.html'
    
    Sur le site de l'api node on retrouve cette ligne à propos de ce code d'erreur : ENOENT (No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist. No entity (file or directory) could be found by the given path.