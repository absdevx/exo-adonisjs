import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Task from "App/Models/Task";
import User from "App/Models/User";
import TaskValidator from "App/Validators/TaskValidator";

export default class TasksController {
  public async store({ request, response }: HttpContextContract) {
    const trustedData = await request.validate(TaskValidator);
    try {
      const task = await Task.create(trustedData);

      return response.json(task);
    } catch (error) {
      return response.status(400).json({ error: error.messages || error });
    }
  }

  public async index({ params, response }: HttpContextContract) {
    const paramId = params.id;
    const tasks = await Task.query().where("user_id", paramId);
    return response.json(tasks);
  }

  public async getTasks({ response }: HttpContextContract) {
    const tasks = await Task.all();
    return response.json(tasks);
  }

  public async getUserByTask({ params, response }: HttpContextContract) {
    const paramId = params.id;
    const task = await User.query()
      .join("tasks", "tasks.user_id", "users.id")
      .where("tasks.id", paramId)
      .select();
    return response.json(task);
  }
}
