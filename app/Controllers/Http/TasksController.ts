import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { TaskStatus } from "App/Enums/TaskStatus";
import Task from "App/Models/Task";
import User from "App/Models/User";
import {
  TaskValidator,
  TaskUpdateValidator,
} from "App/Validators/TaskValidator";

export default class TasksController {
  public async store({ request, response }: HttpContextContract) {
    /* Crée un nouvel Task avec les paramètres fournies:
     */

    const trustedData = await request.validate(TaskValidator);
    const userIds = trustedData.users;
    const task = {
      title: trustedData.title,
      description: trustedData.description,
    };

    try {
      const newTask = await Task.create(task);
      await newTask.related("users").attach(userIds);

      for (let i = 0; i < userIds.length; i++) {
        await Database.from("task_user")
          .where("task_id", newTask.id)
          .where("user_id", userIds[i])
          .update({ status: TaskStatus.EN_COURS });
      }

      return response.ok(newTask);
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }

  public async index({ params, response }: HttpContextContract) {
    /*  Récupère toutes les Task attribuées à un User spécifique en utilisant son identifiant. */
    const paramId = params.id;

    const tasks = await Database.from("tasks")
      .join("task_user", "task_user.task_id", "tasks.id")
      .where("task_user.user_id", paramId)
      .select(["tasks.*", "status"]);
    return response.ok(tasks);
  }

  public async getTasks({ response }: HttpContextContract) {
    /* Récupère toutes les Tasks */

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

  public async update({ request, response }: HttpContextContract) {
    /* Met à jour le Task avec les paramétres fournies */

    const trustedData = await request.validate(TaskUpdateValidator);
    try {
      const task = await Task.findOrFail(trustedData.id);
      const userIds = await task.related('users').query()
      await task.merge({ title: trustedData.title, description: trustedData.description}).save();

      if (trustedData.status) {
        await task
          .related("users")
          .pivotQuery
          
      }

      return response.ok(trustedData);
    } catch (error) {
      return response.badRequest("Failed to update your task");
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    /* Supprime le Task en paramétre en utitisant l'ID fournie */

    const paramId = params.id;
    try {
      await Task.query().where("id", paramId).delete();
      return response.ok({ message: "Task delete successfully" });
    } catch (error) {
      return response.badRequest(error.messages || error);
    }
  }
}
