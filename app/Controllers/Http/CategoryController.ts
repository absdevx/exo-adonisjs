import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";
import {
  CategoryStoreValidator,
  CategoryUpdateValidator,
} from "App/Validators/CategoryValidator";
import { IDValidator } from "App/Validators/IDValidator";

export default class CategoryController {

  // Affiche toutes les Category avec fonctionnalité de pagination
  public async index({ request, response }: HttpContextContract) {
    const { page = 1, limit = 10 } = request.qs();

    try {
      const pagination = await Category.query()
        .withCount("tasks")
        .select(["categories.*"])
        .paginate(page, limit);

      return response.ok({
        message: "Data retrieved successfully",
        meta: pagination.getMeta(),
        categories: pagination.all(),
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to retrieve categories",
        error: error.message || error,
      });
    }
  }

  /*
  Crée un nouvel Category avec les paramètres néccessaires
  */
  public async store({ request, response }: HttpContextContract) {
    const trustedData = await request.validate(CategoryStoreValidator);
    try {
      const category = await Category.create(trustedData);
      return response.created({
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to create user",
        error: error.messages || error,
      });
    }
  }

  /*
  Met à jour le Category grâce à l'id et autres champs à mettre à jour
  */
  public async update({ params, request, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "categories");
    const trustedData = await request.validate(CategoryUpdateValidator);

    try {
      const category = await Category.findOrFail(id)
      await category.merge(trustedData).save();

      return response.ok({
        message: "Category updated successfully",
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to update category",
        error: error.message || error,
      });
    }
  }
  /*
  L'objectif est de pouvoir afficher les informations d'une Category
  par le biais de <id> fournie en paramètre
  */
  public async show({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "categories");

    try {
      const data = await Category.query().where("id", id).preload("tasks");

      return response.ok({
        message: "Category fetched successfully",
        category: data,
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to fetch category",
        error: error.message || error,
      });
    }
  }

  // Supprime le Category donnée en utilisant l'ID fournie
  // Cette fonction vérifira s'il y a des Task associés à celle-ci,
  // Si oui, elle retourne une erreur sans supprimer quelque chose, sinon
  // elle supprime simplement la Categorie
  public async destroy({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "categories");

    try {
      const category = await Category.query()
        .where("id", id)
        .preload("tasks")
        .firstOrFail();
      
      if (category.tasks.length > 0) {
        return response.badRequest({
          message:
            "Failed to delete this category because it's used by many tasks",
        });
      }
      await category.delete()

      return response.noContent();

    } catch (error) {
      return response.badRequest({
        error: "Failed to delete category",
        data: error.message || error,
      });
    }
  }
}
