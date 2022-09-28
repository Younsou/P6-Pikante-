## frontend
au terminal: `npm install`
pour lancer le serveur front: `npm run start` , ou alors: `ng serve`
Navigate to `http://localhost:4200/`

## backend
pour lancer le server back: `nodemon server`

# pour la route POST --------------> "signup"
`http://localhost:3000/api/auth/signup`

Body-->raw:
{
    "email" : "xxxxxxxxx",
    "password" : "xxxxxx"
}

# pour la route POST --------------> "login"
`http://localhost:3000/api/auth/login`

Body-->raw:
{
    "email" : "xxxxxxxxx",
    "password" : "xxxxxx"
}

# pour la route GET ---------------> "getAllSauces"
`http://localhost:3000/api/sauces`

Authorization--> Bearer Token: xxxxxxxxx
Body-->raw : 
{
  "userId": "xxxxxxxxxxxxxxx"
}

# pour la route POST --------------> "createSauce"
`http://localhost:3000/api/sauces`

Params--> KEY: userId VALUE: _id de l'use
Authorization--> Bearer Token: xxxxxxxxxx
Body-->form-data66>
  KEY: SauceModel
  VALUE:
       {
            "usersLiked": [],
            "usersDisliked": [],
            "userId": "xxxxxxxxxxxxxxxxxxx",
            "name": "xxxxxxx",
            "manufacturer": "xxxx",
            "description": "xxxxxxx",
            "mainPepper": "xxxxxxxxx",
            "imageUrl": "http://localhost:3000/images/xxxxxxx",
            "heat": 1,
            "__v":0
        }

# pour la route GET ---------------> "getOneSauce"
`http://localhost:3000/api/sauces/:id/`


Authorization-->Bearer Token: xxxxxxx
Params--> KEY: userId VALUE: _id de l'user
Body-->none

# pour la route PUT ---------------> "modifySauce"
`http://localhost:3000/api/sauces/:id/`

Params--> KEY: userId VALUE: _id de l'user
Authorization-->Bearer Token: xxxxxxx

Body-->form data-->
  KEY:
  VALUE:
        {
            "userId": "xxxxxxxxxxxxxxxxxxx",
            "name": "xxxxxxx",
            "manufacturer": "xxxx",
            "description": "xxxxxxx",
            "mainPepper": "xxxxxxxxx",
            "imageUrl": "http://localhost:3000/images/xxxxxxx",
            "heat": 1
            "__v":0
        }

# pour la route DELETE ------------> "deleteSauce"
`http://localhost:3000/api/sauces/:id/`

Params--> KEY: userId VALUE: _id de l'user

# pour la route POST --------------> "likeDislikeSauce"
`http://localhost:3000/api/sauces/:id/like`

Authorization--> Bearer Token: xxxxxxxxx
Body-->raw : 

{
  "userId": "xxxxxxxxxxxxxxx"
  "like" : 0 (-1 dislike, 0 neutre, 1like)
}