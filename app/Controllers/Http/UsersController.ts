import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
<<<<<<< HEAD
import UserStoreValidator from "App/Validators/UserValidator";
import Task from "App/Models/Task";
=======
import {
  UserStoreValidator,
  UserUpdateValidator,
} from "App/Validators/UserValidator";
>>>>>>> develop

/*

Route.post('/users', 'UsersController.create')
Route.get('/users', 'UsersController.index')
Route.post('/users/:id', 'UsersController.show')

*/

const USER_PER_PAGE = 2;

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input("page", 1);

    const pagination = await User.query()
      .select(["id", "name", "email"])
      .paginate(page, USER_PER_PAGE);
<<<<<<< HEAD
    return response.json(pagination.all());
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const trustedData = await request.validate(UserStoreValidator);
      const ret = await User.create(trustedData);

=======
    return response.json(pagination);
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const trustedData = await request.validate(UserStoreValidator);
      const ret = await User.create(trustedData);
>>>>>>> develop
      return response.status(201).json(ret);
    } catch (error) {
      return response.status(400).json({ error: error.messages || error });
    }
  }

<<<<<<< HEAD
=======
  public async update({ request, response }: HttpContextContract) {
    const trustedData = await request.validate(UserUpdateValidator);
    try {
      await User.query().where("id", trustedData.id).update(trustedData);
      return response.ok(trustedData);
    } catch (error) {
      return response.badRequest("Failed to update user");
    }
  }

>>>>>>> develop
  public async show({ params, response }: HttpContextContract) {
    const paramId = params.id;

    try {
      const data = await User.query()
        .where("id", paramId)
        .preload("tasks")
        .select();

<<<<<<< HEAD
      return response.status(201).json(data);
    } catch (error) {
      return response.status(400).json({ error: error.messages || error });
=======
      return response.ok(data);
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    const trustedData = await request.validate(UserUpdateValidator);
    try {
      await User.query().where("id", trustedData.id).delete();
      return response.ok("User deleted successfully");
    } catch (error) {
      return response.badRequest("Failed to delete user");
>>>>>>> develop
    }
  }
}
