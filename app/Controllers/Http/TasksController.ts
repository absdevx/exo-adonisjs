import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";
import Task from "App/Models/Task";
import User from "App/Models/User";
import { IDValidator } from "App/Validators/IDValidator";
import {
  TaskValidator,
  TaskUpdateValidator,
} from "App/Validators/TaskValidator";

export default class TasksController {

  /*
  Renvoie toutes les Tasks qui correspond au texte de recherche.
  Cette recherche sera faite dans la colonne tasks.title uniquement
  */
  public async search({ request, response }: HttpContextContract) {
    const { page, limit, query } = request.qs();
    if (!query) return;

    try {
      const tasks = await Task.query()
        .whereILike("title", `%${query}%`)
        .paginate(page, limit);

      return response.ok({
        message: "Search finished successfully",
        meta: tasks.getMeta(),
        tasks: tasks.all(),
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to search tasks",
        error: error.message || error,
      });
    }
  }
  /* Crée un nouvel Task avec les paramètres fournies */
  public async store({ request, response }: HttpContextContract) {
    const { users, ...trustedData } = await request.validate(TaskValidator);

    try {
      const newTask = await Task.create(trustedData);
      await newTask.related("users").attach(users);

      return response.created({
        message: "Task created successfully",
        data: newTask,
      });
    } catch (error) {
      return response.badRequest({ error: error.message || error });
    }
  }
  /* Récupère toutes les Tasks disponibles */
  public async index({ request, response }: HttpContextContract) {
    const { page = 1, limit = 10 } = request.qs();

    try {
      const tasks = await Task.query().withCount("users").paginate(page, limit);

      return response.ok({
        message: "Tasks retrieved successfully",
        meta: tasks.getMeta(),
        tasks: tasks.all(),
      });
    } catch (error) {
      return response.badRequest({
        message: "Failed to fetch tasks",
        error: error.message || error,
      });
    }
  }

  /* Renvoie les informations d'une Task: le title, description et le nom de la catégorie
  */
  public async show({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "tasks");
    try {
      const tasks = await Task.query()
        .where("id", id)
        .preload("users")
        .select();
      return response.ok({ message: "Task fetched with success", task: tasks });
    } catch (error) {
      return response.badRequest({
        message: "Failed to fetch user",
        error: error.message || error,
      });
    }
  }

  /* Met à jour le Task avec les paramétres fournies
  */
  public async update({ params, request, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "tasks");
    const { users, ...trustedData } = await request.validate(
      TaskUpdateValidator
    );

    try {
      const task = await Task.query().where("id", id).firstOrFail();
      await task.merge(trustedData).save();

      if (users) await task.related("users").sync(users, false);

      return response.ok({
        message: "Task updated successfully",
      });
    } catch (error) {
      return response.badRequest({
        error: error.message || error,
        message: "Failed to update task",
      });
    }
  }
  /* Supprime le Task en paramétre en utitisant l'ID fournie */
  public async destroy({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "tasks");

    try {
      const task = await Task.findOrFail(id)
      await task.delete();
      
      return response.noContent();
    } catch (error) {
      return response.badRequest({ message: error.message || error });
    }
  }
}
