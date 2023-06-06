import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
<<<<<<< HEAD
import Task from "App/Models/Task";
import User from "App/Models/User";
import TaskValidator from "App/Validators/TaskValidator";
=======
import Database from "@ioc:Adonis/Lucid/Database";
import Task from "App/Models/Task";
import User from "App/Models/User";
import {
  TaskValidator,
  TaskUpdateValidator,
} from "App/Validators/TaskValidator";
>>>>>>> develop

export default class TasksController {
  public async store({ request, response }: HttpContextContract) {
    const trustedData = await request.validate(TaskValidator);
    try {
      const task = await Task.create(trustedData);

<<<<<<< HEAD
      return response.json(task);
    } catch (error) {
      return response.status(400).json({ error: error.messages || error });
=======
      return response.ok(task);
    } catch (error) {
      return response.badRequest({ error: error.messages || error });
>>>>>>> develop
    }
  }

  public async index({ params, response }: HttpContextContract) {
    const paramId = params.id;
<<<<<<< HEAD
    const tasks = await Task.query().where("user_id", paramId);
    return response.json(tasks);
  }

  public async getTasks({ response }: HttpContextContract) {
    const tasks = await Task.all();
    return response.json(tasks);
=======
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

  public async delete({ params, response, request }: HttpContextContract) {
    const paramId = (await request.validate(TaskUpdateValidator)).id;
    try {
      await Task.query().where("id", paramId).delete();
      return response.ok({ message: "Task delete successfully" });
    } catch (error) {
      return response.badRequest(error.messages || error);
    }
>>>>>>> develop
  }

  public async getUserByTask({ params, response }: HttpContextContract) {
    const paramId = params.id;
    const task = await User.query()
      .join("tasks", "tasks.user_id", "users.id")
      .where("tasks.id", paramId)
      .select();
<<<<<<< HEAD
    return response.json(task);
=======
    return response.ok(task);
>>>>>>> develop
  }
}
