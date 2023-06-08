import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { IDValidator } from "App/Validators/IDValidator";
import {
  UserStoreValidator,
  UserUpdateValidator,
} from "App/Validators/UserValidator";

const USER_PER_PAGE = 2;

export default class UsersController {
  // Listing des Users disponibles avec pagination avec
  // un nombre d'elements par page selon USER_PER_PAGE
  public async index({ request, response }: HttpContextContract) {
    const page = request.input("page", 1);
    const max_of_limit = (await User.query()).length;

    let limit = request.input("limit", USER_PER_PAGE);
    if (limit > max_of_limit) limit = max_of_limit;

    try {
      const pagination = await User.query()
        .withCount("tasks")
        .select(["users.*"])
        .paginate(page, limit);
      return response.ok({
        message: "Data retrieved successfully",
        pagination,
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to retrieved data",
        error: error.messages || error,
      });
    }
  }

  /* Crée un nouveau User */
  public async store({ request, response }: HttpContextContract) {
    const trustedData = await request.validate(UserStoreValidator);
    try {
      const user = await User.create(trustedData);
      return response.created({ message: "User created successfully", user });
    } catch (error) {
      return response.badRequest({
        message: "Failed to create user",
        error: error.messages || error,
      });
    }
  }

  // Met à jour le User avec les paramétres fournies
  public async update({ request, params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "users");
    const trustedData = await request.validate(UserUpdateValidator);
    try {
      await User.query().where("id", id).update(trustedData);
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
        data: data,
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
      await User.query().where("id", id).delete();
      return response.noContent();
    } catch (error) {
      return response.badRequest({
        error: "Failed to delete user",
        data: error.message || error,
      });
    }
  }
}
