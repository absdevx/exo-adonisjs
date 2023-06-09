import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { IDValidator } from "App/Validators/IDValidator";
import {
  UserStoreValidator,
  UserUpdateValidator,
} from "App/Validators/UserValidator";


export default class UsersController {
  // Listing des Users disponibles avec pagination avec
  // un nombre d'elements par page selon USER_PER_PAGE
  public async index({ request, response }: HttpContextContract) {
    const { page = 1, limit = 10 } = request.qs()

    try {
      const pagination = await User.query()
        .withCount("tasks")
        .select(["users.*"])
        .paginate(page, limit);
      
      return response.ok({
        message: "Data retrieved successfully",
        meta: pagination.getMeta(),
        users: pagination.all()
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to retrieved data",
        error: error.message || error,
      });
    }
  }

  /* 
    Permet aux utilisateurs de 
    rechercher des utilisateurs en fonction d'un terme de recherche spécifié 
    dans le paramètre "query". Les résultats renvoyés doivent correspondre au om ou à l'adresse e-mail des utilisateurs.
  */
  public async search({ request, response }: HttpContextContract) {
    const {page, limit, query} = request.qs()
    if (!query) return;

    try {
      const users = await User.query()
        .whereILike("name", `%${query}%`)
        .orWhereILike("email", `%${query}%`)
        .paginate(page, limit);

      return response.ok({
        message: "Search finished successfully",
        meta: users.getMeta(),
        users: users.all(),
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to search users",
        error: error.message || error,
      });
    }
  }

  /* Crée un nouveau User avec les paramètres de request */
  public async store({ request, response }: HttpContextContract) {
    const trustedData = await request.validate(UserStoreValidator);
    try {
      const user = await User.create(trustedData);
      return response.created({ message: "User created successfully", user });
    } catch (error) {
      return response.badRequest({
        message: "Failed to create user",
        error: error.message || error,
      });
    }
  }

  // Met à jour le User avec les paramétres fournies
  public async update({ request, params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "users");
    const trustedData = await request.validate(UserUpdateValidator);

    try {
      
      const user = await User.findOrFail(id);
      await user.merge(trustedData).save();

      return response.ok({
        message: "User updated successfully",
        data: trustedData,
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to update user",
        error: error.message || error,
      });
    }
  }

  /* Affiche un User à l'aide de son ID */
  public async show({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "users");

    try {
      const data = await User.query().where("id", id).preload("tasks").select();

      return response.ok({
        message: "User updated successfully",
        user: data,
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to show user data",
        error: error.message || error,
      });
    }
  }

  // Supprime le User avec l'ID en paramètre
  public async destroy({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "users");

    try {
      const user = await User.findOrFail(id)
      await user.delete();
      return response.noContent();

    } catch (error) {
      return response.badRequest({
        error: "Failed to delete user",
        data: error.message || error,
      });
    }
  }
}
