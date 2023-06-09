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

Route.group(() => {
  Route.post("/users", "UsersController.store");
  Route.get("/users", "UsersController.index");
  Route.patch("/users/:id", "UsersController.update");
  Route.delete("/users/:id", "UsersController.destroy");
  Route.get("/users/:id", "UsersController.show");
});

Route.group(() => {
  Route.get("/tasks", "TasksController.index");
  Route.post("/tasks", "TasksController.store");
  Route.get("/tasks/:id", "TasksController.show");
  Route.patch("/tasks/:id", "TasksController.update");
  Route.delete("/tasks/:id", "TasksController.destroy");
  // Route.get("/tasks/user/:id", "TasksController.getTasksByUser");
});

Route.group(() => {
  Route.get("/categories", "CategoryController.index");
  Route.post("/categories", "CategoryController.store");
  Route.patch("/categories/:id", "CategoryController.update");
  Route.delete("/categories/:id", "CategoryController.destroy");
  Route.get("/categories/:id", "CategoryController.show");
})
