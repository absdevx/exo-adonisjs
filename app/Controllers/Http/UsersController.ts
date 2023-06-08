import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";
import { IDValidator } from "App/Validators/IDValidator";
import {
  UserStoreValidator,
  UserUpdateValidator,
} from "App/Validators/UserValidator";

const USER_PER_PAGE = 2;

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    // Listing des Users disponibles avec pagination avec un nombre d'elements par page selon USER_PER_PAGE

    const page = request.input("page", 1);
    const max_of_limit = (await User.query()).length

    let limit = request.input("limit", USER_PER_PAGE)  
    if (limit > max_of_limit) limit = max_of_limit
    // Quand la limite fournie est plus grande que celle disponible, renvoyons les elements disponibles
    // console.log(limit, max_of_limit)

    const pagination = await User.query()
      .select(["id", "name", "email"])
      .paginate(page, limit);

    return response.json(pagination);
  }

  public async store({ request, response }: HttpContextContract) {
    /* Crée un nouveau User */
    const trustedData = await request.validate(UserStoreValidator);
    try {
      const user = await User.create(trustedData);
      return response.ok(user);
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    // Met à jour le User avec les paramétres fournies
    const {id} = await IDValidator.validate(params, "users");
    const trustedData = await request.validate(UserUpdateValidator)
    try {
      (await User.findOrFail(id)).delete()
      return response.ok(trustedData);
    } catch (error) {
      return response.badRequest("Failed to update user");
    }
  }

  public async show({ params, response }: HttpContextContract) {
    /* Affiche un User à l'aide de son ID */
    const {id} = await IDValidator.validate(params, 'users')

    try {
      const data = await User.query()
        .where("id", id)
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
      await Database.from('users').where('id', trustedData).delete()
      return response.noContent();
    } catch (error) {
      return response.badRequest({
        error: "Failed to delete user",
        data: error.messages || error,
      });
    }
  }
}
