import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { TaskStatus } from "App/Enums/TaskStatus";
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
    const { users, title, description } = await request.validate(TaskValidator);
    const task = {
      title: title,
      description: description,
    };
    TODO: "Trouve dans la doc une maniere plus approprie de gerer cette partie";
    try {
      const newTask = await Task.create(task);
      await newTask.related("users").attach(users);
      return response.created(newTask);
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }
  /*  Récupère toutes les Task attribuées à un User spécifique en utilisant son identifiant. */
  TODO: "Recuperer toute les tâches avec le nombre d'utilisateur pour chaque tâche";
  public async getTasksByUser({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "users");
    /* const user = await User.findOrFail(id)
    const tasks = user.related("tasks").query().select([
      'tasks.*'
    ]) */
    // const tasks = (await User.findOrFail(id)).related('tasks').query().select()
    const tasks = await User.query()
      .withCount("tasks")
      .preload("tasks")
      .where("id", id);

    return response.ok(tasks);
  }
  /* Récupère toutes les Tasks */
  public async index({ response }: HttpContextContract) {
    TODO: "Ajouter la fonction show, recuperer une tâche specific avec les infos des utilisateus assigne";

    const tasks = await Database.from("task_user")
      .join("users", "task_user.user_id", "users.id")
      .join("tasks", "task_user.task_id", "tasks.id")
      .select([
        "tasks.id",
        "tasks.title",
        "tasks.description",
        "status",
        "users.name as username",
      ]);
    return response.ok(tasks);
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, 'tasks')
    const taskWithUsers = await Task.query().where('id', id).preload("users")
    return response.ok(taskWithUsers)
  }

  /* Met à jour le Task avec les paramétres fournies */
  public async update({ params, request, response }: HttpContextContract) {
    TODO: "recuperer l'id autrement, ajouter un custom validateur pour les ids";

    const { id } = await IDValidator.validate(params, "tasks");
    const { title, status, description, users } = await request.validate(
      TaskUpdateValidator
    );
    try {
      const task = await Task.query().where("id", id).firstOrFail();
      await task
        .merge({
          title: title,
          description: description,
        })
        .save();
      console.log("task updated: %s", task.id);

      await task.related("users").sync(users, false);
      console.log("Adding users:%s to task:%s", users, task.id);

      await task.related("users").pivotQuery().update({ status: status });
      console.log("Updating status' task");

      return response.noContent()
    } catch (error) {
      return response.badRequest("Failed to update your task");
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
