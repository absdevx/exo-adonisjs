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

Route.post("/users", "UsersController.create");
Route.get("/users", "UsersController.index");

Route.post("/tasks", "TasksController.store");
/* Récupère toutes les tâches. */

Route.get("/tasks/user/:id", "TasksController.index");
/*  Récupère toutes les tâches attribuées à un 
utilisateur spécifique en utilisant son identifiant. */

Route.get("/users/:id", "UsersController.show");

Route.get("/tasks", "TasksController.getTasks");

Route.get("/tasks/:id/user", "TasksController.getUserByTask");
/*  Récupère l'utilisateur attribué à une tâche 
spécifique en utilisant l'identifiant de la tâche. */
Route.post("/users", "UsersController.store");
Route.post("/users", "UsersController.create");
Route.post("/users", "UsersController.store");
Route.get("/users", "UsersController.index");

Route.post("/tasks", "TasksController.store");
/* Récupère toutes les tâches. */

Route.get("/tasks/user/:id", "TasksController.index");
/*  Récupère toutes les tâches attribuées à un 
utilisateur spécifique en utilisant son identifiant. */

Route.get("/users/:id", "UsersController.show");

Route.get("/tasks", "TasksController.getTasks");
// AAAAasasasa

Route.get("/tasks/:id/user", "TasksController.getUserByTask");
/*  Récupère l'utilisateur attribué à une tâche 
spécifique en utilisant l'identifiant de la tâche. */

Route.patch("/tasks", "TasksController.update");
/* Met à jour le model Task avec les paramétres fournies */

Route.delete("/tasks", "TasksController.delete");
/* Supprime le model Task en paramétre en utitisant l'ID fournie */

Route.patch("/users", "UsersController.update");
// Met à jour le model User en paramétre

Route.delete("/users", "UsersController.delete");
