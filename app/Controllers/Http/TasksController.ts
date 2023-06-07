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
      return response.ok(newTask);
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }
  /*  Récupère toutes les Task attribuées à un User spécifique en utilisant son identifiant. */
  TODO: "Recuperer toute les tâches avec le nombre d'utilisateur pour chaque tâche";
  public async getTasksByUser({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "users");

    const tasks = await Database.from("tasks")
      .join("task_user", "task_user.task_id", "tasks.id")
      .where("task_user.user_id", id)
      .select(["tasks.*", "status"]);
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

  /* Met à jour le Task avec les paramétres fournies */
  public async update({ params, request, response }: HttpContextContract) {
    TODO: "recuperer l'id autrement, ajouter un custom validateur pour les ids";

    const { id } = await IDValidator.validate(params, "tasks");
    const { title, status, description, users } = await request.validate(
      TaskUpdateValidator
    );
    try {
      // const task = await Task.findOrFail(trustedData.id);
      const task = await Task.query().where('id', id).preload('users').firstOrFail()
      await task.merge({
        title: title,
        description: description,
      }).save();

      // const oldUsers = task.related('users').query()
      const pivotData = users.reduce((data, userId) => {
        data[userId] = {
          status: status,
        };
        return data;
      }, {});

      await task.related("users").sync(pivotData, false);

      /* await task.related("users").attach(users);
        await task
          .related("users")
          .pivotQuery()
          .whereIn("user_id", users)
          .update({ status: status }); */
      return response.ok(task);
    } catch (error) {
      return response.badRequest("Failed to update your task");
    }
  }
  /* Supprime le Task en paramétre en utitisant l'ID fournie */
  public async destroy({ params, response }: HttpContextContract) {
    const { id } = await IDValidator.validate(params, "tasks");

    try {
      await Task.query().where("id", id).delete();
      return response.ok({ message: "Task delete successfully" });
    } catch (error) {
      return response.badRequest(error.messages || error);
    }
  }
}
