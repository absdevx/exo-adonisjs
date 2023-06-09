import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Task from "App/Models/Task";
import User from "App/Models/User";
import { IDValidator } from "App/Validators/IDValidator";
import {
  TaskValidator,
  TaskUpdateValidator,
} from "App/Validators/TaskValidator";

export default class TasksController {
  /* Crée un nouvel Task avec les paramètres fournies: */
  public async store({ request, response }: HttpContextContract) {
    const { users, title, description, categoryId } = await request.validate(
      TaskValidator
    );

    try {
      const newTask = await Task.create({
        title: title,
        description: description,
        categoryId: categoryId,
      });
      await newTask.related("users").attach(users);
      return response.created({
        message: "Task created successfully",
        data: newTask,
      });
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }
  /*  Récupère toutes les Task attribuées à un User spécifique en utilisant son identifiant. */
  TODO: "Recuperer toute les tâches avec le nombre d'utilisateur pour chaque tâche";
  public async getTasksByUser({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "users");
    try {
      const tasks = await User.query().where("id", id).preload("tasks");

      return response.ok(tasks);
    } catch (error) {
      return response.badRequest(error.message || error);
    }
  }
  /* Récupère toutes les Tasks */
  // "Ajouter la fonction show, recuperer une tâche specific avec les infos des u◘tilisateus assigne";
  public async index({ response }: HttpContextContract) {
    try {
      const tasks = await Task.query().withCount("users").select(["tasks.*"]);

      return response.ok(tasks);
    } catch (error) {
      return response.badRequest(error.message || error);
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "tasks");
    try {
      const tasks = await Task.query()
        .where("id", id)
        .preload("users")
        .select();
      return response.ok({ message: "Task fetched with success", data: tasks });
    } catch (error) {
      return response.badRequest(error.message || error);
    }
  }

  /* Met à jour le Task avec les paramétres fournies */
  public async update({ params, request, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "tasks");
    const { users, ...trustedData } = await request.validate(TaskUpdateValidator);
    
    try {

      const task = await Task.query().where("id", id).firstOrFail();
      await task.merge({ ...trustedData }).save();

      console.log("task updated: %s", task);

      if (users) 
        await task.related("users").sync(users, false);
      
      return response.ok({
        message: "Task updated successfully",
        data: request.all(),
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
      await Task.query().where("id", id).delete();
      return response.noContent();
    } catch (error) {
      return response.badRequest(error.messages || error);
    }
  }
}
