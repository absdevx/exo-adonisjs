import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Task from "App/Models/Task";
import User from "App/Models/User";
import {
  TaskValidator,
  TaskUpdateValidator,
} from "App/Validators/TaskValidator";

export default class TasksController {
  public async store({ request, response }: HttpContextContract) {
    const trustedData = await request.validate(TaskValidator);

    const usersId = trustedData.users || [trustedData.user_id];
    console.log(usersId);
    const users = await Database.from("users").whereIn("id", usersId);

    try {
      const task = {
        title: trustedData.title,
        description: trustedData.description,
        status: trustedData.status,
        user_id: trustedData.user_id,
      };
      const newTask = await Task.create(task);
      await newTask.related("manyUsers").saveMany(users);

      return response.ok(task);
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }

  public async index({ params, response }: HttpContextContract) {
    const paramId = params.id;
    /* const tasks = await Task.query()
      .join("users", "tasks.user_id", "users.id")
      .select(["*"]); */
    // const tasks = await Task.query().preload("user").select(["*"]);
    const tasks = await Database.from("tasks")
      .join("users", "tasks.user_id", "users.id")
      .where("users.id", paramId)
      .select([
        "tasks.id",
        "tasks.title",
        "tasks.description",
        "tasks.status",
        "name as username",
      ]);
    return response.ok(tasks);
  }

  public async getTasks({ response }: HttpContextContract) {
    const tasks = await Database.from("tasks")
      .join("users", "tasks.user_id", "users.id")
      .select([
        "tasks.id",
        "tasks.title",
        "tasks.description",
        "tasks.status",
        "name as username",
      ]);
    return response.ok(tasks);
  }

  public async update({ request, response }: HttpContextContract) {
    const trustedData = await request.validate(TaskUpdateValidator);
    try {
      await Task.query().where("id", trustedData.id).update(trustedData);
      return response.ok(trustedData);
    } catch (error) {
      return response.badRequest("Failed to update your task");
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    const paramId = params.id;
    try {
      await Task.query().where("id", paramId).delete();
      return response.ok({ message: "Task delete successfully" });
    } catch (error) {
      return response.badRequest(error.messages || error);
    }
  }

  public async getUserByTask({ params, response }: HttpContextContract) {
    const paramId = params.id;
    const task = await User.query()
      .join("tasks", "tasks.user_id", "users.id")
      .where("tasks.id", paramId)
      .select();
    return response.ok(task);
  }
}
