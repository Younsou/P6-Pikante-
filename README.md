Projet 6 du parcours OpenClassRooms:
Construir une API sécurisée pour une application d'avis gastronomiques
backend créer de zéro

## frontend
au terminal: `npm install`
pour lancer le serveur front: `npm run start` , ou alors: `ng serve`
Navigate to `http://localhost:4200/`

## backend
Référez vous au `../backend/package.json` pour installer toute les dependencies, comme Express et Mongoose...

Une fois tout celà installer, pour lancer le server back au terminal entrez: `nodemon server`




## ----|||------|||-----------------------------------|||------|||----- ##
## ----|||------|||-----------------------------------|||------|||----- ##
## ---\|||/----\|||/---------------------------------\|||/----\|||/---- ##
## ----\v/------\v/------|` POUR LES REQUETES `|------\v/------\v/----- ##
## -----V--------V-------------------------------------V--------V------ ##
## -------------------------------------------------------------------- ##



# {1} POST pour la route --------------> "signup"

`http://localhost:3000/api/auth/signup`


Body-->raw:
{
    "email" : "xxxxxxxxx",
    "password" : "xxxxxx"
}


# {2} POST pour la route --------------> "login"
`http://localhost:3000/api/auth/login`


Body-->raw:
{
    "email" : "xxxxxxxxx",
    "password" : "xxxxxx"
}


# {3} GET pour la route ---------------> "getAllSauces"
`http://localhost:3000/api/sauces`


Authorization--> Bearer Token: xxxxxxxxx
Body-->raw : 
{
  "userId": "xxxxxxxxxxxxxxx"
}


# {4} GET pour la route ---------------> "getOneSauce"
`http://localhost:3000/api/sauces/:id/`


Authorization-->Bearer Token: xxxxxxx
Params--> KEY: userId VALUE: _id de l'user
Body-->none


# {5} POST pour la route --------------> "createSauce"
`http://localhost:3000/api/sauces`


Params--> KEY: userId VALUE: _id de l'user
Authorization--> Bearer Token: xxxxxxxxxx
Body-->form-data-->
  KEY: sauce
  VALUE:
       {
            "userId": "xxxxxxxxxxxxxxxxxxx",
            "name": "xxxxxxx",
            "manufacturer": "xxxx",
            "description": "xxxxxxx",
            "mainPepper": "xxxxxxxxx",
            "imageUrl": "",
            "heat": 1,
            "__v":0
        }
  KEY: image
  file et selectionner l'image 


# {6} PUT pour la route ---------------> "modifySauce"
`http://localhost:3000/api/sauces/:id/` 
(exemple: `http://localhost:3000/api/sauces/6335dfbeed14792ca91a46b8?userId=6334691e96136017c7eef30f` )


Params--> KEY: userId VALUE: _id de l'user
Authorization-->Bearer Token: xxxxxxx

Body-->form data-->
  KEY: sauce
  VALUE:
        {
            "userId": "xxxxxxxxxxxxxxxxxxx",
            "name": "xxxxxxx",
            "manufacturer": "xxxx",
            "description": "xxxxxxx",
            "mainPepper": "xxxxxxxxx",
            "imageUrl": "",
            "heat": 1
            "__v":0
        }
  KEY: image
  file et selectionner l'image    


# {7} DELETE pour la route ------------> "deleteSauce"
`http://localhost:3000/api/sauces/:id/` (adress URL meme exemple que modify)


Params--> KEY: userId VALUE: _id de l'user
Authorization-->Bearer Token: xxxxxxx


# {8} POST pour la route --------------> "likeDislikeSauce"
`http://localhost:3000/api/sauces/:id/like`


Authorization--> Bearer Token: xxxxxxxxx
Body-->raw : 

{
  "userId": "xxxxxxxxxxxxxxx",
  "like" : 0 (-1 dislike, 0 neutre, 1like)
}
