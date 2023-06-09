import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";
import {
  CategoryStoreValidator,
  CategoryUpdateValidator,
} from "App/Validators/CategoryValidator";
import { IDValidator } from "App/Validators/IDValidator";

const CATEGORIES_PER_PAGE = 3;

export default class CategoryController {
  public async index({ request, response }: HttpContextContract) {
    const page: number = request.input("page", 1);
    let limit: number = request.input("limit", CATEGORIES_PER_PAGE);

    const max_of_limit = (await Category.query()).length;
    if (limit > max_of_limit) limit = max_of_limit;

    try {
      const pagination = await Category.query()
        .withCount("tasks")
        .select(["categories.*"])
        .paginate(page, limit);
      return response.ok({
        message: "Data retrieved successfully",
        pagination,
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to retrieve categories",
        error: error.message || error,
      });
    }
  }
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
  public async update({ params, request, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "categories");
    const trustedData = await request.validate(CategoryUpdateValidator);

    try {
      await (await Category.findOrFail(id)).merge(trustedData).save();
      return response.ok({
        message: "Category updated successfully",
        data: trustedData,
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to update category",
        error: error.message || error,
      });
    }
  }
  public async show({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "categories");

    try {
      const data = await Category.query().where("id", id).preload("tasks");

      return response.ok({
        message: "Category fetched successfully",
        data: data,
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to fetch category data",
        error: error.message || error,
      });
    }
  }
  public async destroy({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "categories");

    try {
      await Category.query().where("id", id).delete();
      return response.noContent();
    } catch (error) {
      return response.badRequest({
        error: "Failed to delete category",
        data: error.message || error,
      });
    }
  }
}
