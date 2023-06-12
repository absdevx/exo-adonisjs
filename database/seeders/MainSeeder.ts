import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { TaskStatus } from "App/Enums/TaskStatus";
import { TaskFactory } from "Database/factories/FullFactory";

export default class extends BaseSeeder {
  public async run() {
    const nbre_users = 10;

    const tasks = await TaskFactory.with("category", 1)
      .with("users", nbre_users, (user) => {
        user.pivotAttributes({ status: TaskStatus.EN_COURS });
      })
      .createMany(5);

    tasks.forEach((task) => {
      console.log("New task: %s", [
        task.title,
        task.category.name,
        task.users.length,
      ]);
    });
  }
}
