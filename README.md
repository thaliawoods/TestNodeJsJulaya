# [JULAYA] Test NodeJs

## Models

```javascript
[
  "User": {
    "id" : "integer",
    "firstname" : "text",
    "lastname" : "text",
    "countryCode" : "text",
    "phone" : "text",
    "password" : "text",
    "createdAt" : "datetime",
    "updatedAt" : "datetime"
  },
  "AccessToken": {
    "id" : "uniqid",
    "ttl" : "integer",
    "createdAt" : "datetime"  
  },
  "Review": {
    "id" : "integer",
    "comment" : "text",
    "mark" : "integer"
  },
  "Kiosk": {
    "title" : "text",
    "description" : "text",
    "geolocation" : "point"  
  }
]
```

----

## Relations BDD

Les colonnes indiquants les relations ne sont volontairement pas indiquées, il faudra donc les modifier les models afin de gérer les liaisons ci dessous. 

User <-> Kiosk : One-to-one\
User <-> Review : One-to-many\
User <-> AccessToken : One-to-many

----

## Endpoints

### Login

__Verb__: POST\
__Route__: /users/login\
__Params__: countryCode, phone, password\
__Logic__: Vérifier la validité du trio "countyCode" + "phone" + "mot de passe". Si la vérification est bonne, créer une nouvelle entrée dans la table AccessToken et retourner son id + userId.\
__Result__:

```javascript
{
  "accessToken" : {
    "id" : {ACCESSTOKEN_ID},
    "ttl" : {ACCESSTOKEN_TTL}, 
    "createdAt" : {ACCESSTOKEN_CREATEDAT},
  }
}
```

### Informations utilisateur

__Verb__: GET\
__Route__:  /users/{id}\
__Params__: id\
__Logic__ : Accéder aux informations complètes d’un utilisateur via son id.\
__Result__:

```javascript
{
    "id" : "integer", 
    "firstname" : "text", 
    "lastname" : "text",
    "countryCode" : "text",
    "phone" : "text",
    "password" : "text",
    "createdAt" : "datetime",
    "updatedAt" : "datetime"
}
```

### Rechercher un kiosk (bonus)

__Verb__: POST\
__Route__:  /kiosks/search\
__Params__: geolocation = {lat, lng}, maxDistance, page, offset\
__Logic__: Rechercher un kiosque par géolocalisation, avec une distance maximale et un système de pagination (résultats triés par distance).\
__Result__:

```javascript
[
    {
        "title" : "text",
        "description" : "text",
        "geolocation" : "point",
        "distance" : "float", // Kilometers
        "user" : {
            // User infos
            "reviews" : {
                // User’s reviews
            } 
        }
    }
]
```

----

## Format d'erreur

```javascript
{
    "error" : {
        "statusCode" : {ERROR_CODE},
        "message" : {ERROR_MESSAGE}
    }
}
```

----

## Sécurité  

* Vérifier que l’accessToken présent dans le header HTTP (Authorization) est valide (ttl + createdAt).
* Vérifier l’accès aux routes suivantes :
  * Route publique : /users/login
  * Route accessible au propriétaire : /users/{id}
  * Route accessible aux utilisateurs connectés : /kiosks/search (bonus)

----

## Consignes

Conseils : 

* Utiliser NodeJs avec le framework de ton choix (Express / Koa / Loopback / ...)
* Utiliser une BDD relationnelle (PostgreSQL / mySQL / SQL Lite / ...)

Taches :

* Créer la base de données correspondant aux models en y ajoutant les relations SQL
* Développer la logique des endpoints en respectant le format des resultats + erreurs
* Développer le(s) middleware(s) de sécurité

Rendu : 

* Envoyer un .zip par mail contenant :
  * le code source
  * le fichier SQL de creation de la DB
  * les annotations de logique si jamais tu n'as pas pu coder le test.
* Déployer sur heroku (bonus) 

Bonus : 

* Faire la route de recherche de kiosques via géoloc 🎁

----

Bon courage et à bientôt ! 