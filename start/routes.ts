/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

/*
Route.get('/', async ({ view }) => {
  return view.render('blog/index')
})*/

const API_PREFIX = "/api/v1"

Route.group(() => {
  Route.post("/users", "UsersController.store");
  /* Crée un nouveau User */
  Route.get("/users", "UsersController.index");
  // Listing des Users disponibles
  Route.patch("/users", "UsersController.update");
  // Met à jour le User avec les paramétres fournies
  Route.delete("/users/:id", "UsersController.destroy");
  // Supprime le User avec l'ID en paramètre
  Route.get("/users/:id", "UsersController.show");
  // Affiche un User à l'aide de son ID
}).prefix(API_PREFIX)


Route.group(() => {
  Route.get("/tasks", "TasksController.getTasks");
  // Listing des tasks

  Route.post("/tasks", "TasksController.store");
  /* Crée un nouvel Tasks */

  Route.patch("/tasks", "TasksController.update");
  /* Met à jour le Task avec les paramétres fournies */

  Route.delete("/tasks/:id", "TasksController.destroy");
  /* Supprime le Task en paramétre en utitisant l'ID fournie */

  Route.get("/tasks/user/:id", "TasksController.index");
  /*  Récupère toutes les Task attribuées à un User spécifique en utilisant son identifiant. */
}).prefix(API_PREFIX)