# Restaurants API: 

Restaurants API is a web application that provides users with a restaurants list and their locations. Users can edit and delete their account. Additionally, users can create, edit, delete restaurants or add them to their favourites list.

## Deployed Application:

**Built using: Node, Express and Mongo.**

1. Install the dependencies

```bash
npm install
```

2. Create a .env file in the root folder and add the following environment variables:

```bash
PORT
MONGODB_URI
PASSPORT_SECRET
FRONTEND_ORIGIN
```

3. Run the server to develop locally:

```bash
npm run dev
```


# API Routes

## Auth routes
| URL path                            | HTTP Method   | Response           | Action                  | 
| :----------------------------------:| :-----------: | :----------------: | :---------------------: | 
| /api/auth/signup                    | POST          | {message, user}    | Create a new user       |
| /api/auth/login                     | POST          | {message, token}   | Log user in             |
| /api/auth/getProfile                | POST          | {message, user}    | Get Logged User         |
| /api/auth/edit                      | PUT           | {message, user}    | Edit user               |
| /api/auth/delete                    | DELETE        | {message}          | Remove user             |


### Restaurant
| URL path                                | Method  | Response               | Action                    | 
| :--------------------------------------:| :-----: | :--------------------: | :-----------------------: | 
| /api/restaurants/getAll                 | GET     | [restaurants]          |  Get all restaurants      |
| /api/restaurants/getOne/:restaurant_id  | GET     | {restaurant}           |  Get one restaurant       |
| /api/restaurants/create                 | POST    | {message, restaurant}  |  Create a new restaurant  |
| /api/restaurants/edit/:restaurant_id    | PUT     | {message, restaurant}  |  Edit restaurant          |
| /api/restaurants/changeStatus/:case_id  | DELETE  | {message}              |  Remove restaurant        |

  

### User  
| URL path                                    | Method  | Response                        | Action                     | 
| :------------------------------------------:| :-----: | :-----------------------------: | :------------------------: | 
| /api/user/getFavouriteRestaurants           | POST    | [favouriteRestaurants]          |  Get favourite restaurants             |
| /api/user/likeRestaurant/:restaurant_id     | PUT     | {message, favouriteRestaurants} |  Add restaurant to favourite list      |
| /api/user/dislikeRestaurant/:restaurant_id  | PUT     | {message, favouriteRestaurants} |  Remove restaurant from favourite list |

