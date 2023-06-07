import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import {
  UserStoreValidator,
  UserUpdateValidator,
} from "App/Validators/UserValidator";

/*

Route.post('/users', 'UsersController.create')
Route.get('/users', 'UsersController.index')
Route.post('/users/:id', 'UsersController.show')

*/

const USER_PER_PAGE = 2;

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    // Listing des Users disponibles avec pagination avec un nombre d'elements par page selon USER_PER_PAGE

    const page = request.input("page", 1);
    const pagination = await User.query()
      .select(["id", "name", "email"])
      .paginate(page, USER_PER_PAGE);

    return response.json(pagination);
  }

  public async store({ request, response }: HttpContextContract) {
    /* Crée un nouveau User */
    const trustedData = await request.validate(UserStoreValidator);
    try {
      const ret = await User.create(trustedData);
      return response.ok(ret);
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    // Met à jour le User avec les paramétres fournies
    const trustedData = await request.validate(UserUpdateValidator);
    try {
      await User.query().where("id", trustedData.id).update(trustedData);
      return response.ok(trustedData);
    } catch (error) {
      return response.badRequest("Failed to update user");
    }
  }

  public async show({ params, response }: HttpContextContract) {
    /* Affiche un User à l'aide de son ID */
    const paramId = params.id;

    try {
      const data = await User.query()
        .where("id", paramId)
        .preload("tasks")
        .select();

      return response.ok(data);
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    // Supprime le User avec l'ID en paramètre

    const trustedData = await params.id;
    try {
      await User.query().where("id", trustedData).delete();
      return response.ok("User deleted successfully");
    } catch (error) {
      return response.badRequest({
        error: "Failed to delete user",
        data: error.messages || error,
      });
    }
  }
}
