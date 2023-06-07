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
    const trustedData = await request.validate(TaskValidator);

    const userIds = trustedData.users;
    const task = {
      title: trustedData.title,
      description: trustedData.description,
    };

    try {
      const newTask = await Task.create(task);
      await newTask.related("users").attach(userIds)

      for (let i = 0; i < userIds.length; i++){
        await Database.from('task_user')
          .where('task_id', newTask.id)
          .where('user_id', userIds[i])
          .update({status: TaskStatus.EN_COURS})
      }

      return response.ok(newTask);

    } catch (error) {
      return response.badRequest({ error: error.messages || error });
    }
  }

  public async index({ params, response }: HttpContextContract) {
    const paramId = params.id;

    const tasks = await Database.from('tasks')
      .join('task_user', 'task_user.task_id', 'tasks.id')
      .where('task_user.user_id', paramId)
      .select([
        'tasks.*',
        'status'
      ])
    return response.ok(tasks);
  }

  public async getTasks({ response }: HttpContextContract) {
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
    const trustedData = await request.validate(TaskUpdateValidator);
    try {
      await Task.query().where("id", trustedData.id).update(trustedData);
      return response.ok(trustedData);
    } catch (error) {
      return response.badRequest("Failed to update your task");
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
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
