import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { TaskStatus } from "App/Enums/TaskStatus";

export default class extends BaseSchema {
  protected tableName = "task_user";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid("task_id")
        .unsigned()
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE");
      table
        .uuid("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .enum("status", Object.values(TaskStatus))
        .defaultTo(TaskStatus.EN_COURS);

      table.unique(["task_id", "user_id"], {
        indexName: "unique_task_user",
        useConstraint: true,
      });

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
