import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { TaskStatus } from "App/Enums/TaskStatus";
import User from "App/Models/User";

export default class extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .notNullable()
        .defaultTo(this.raw("uuid_generate_v4()"));

      table.string("title").notNullable();
      table.string("description").notNullable();

      table
        .enum("status", Object.values(TaskStatus))
        .defaultTo(TaskStatus.EN_COURS);

      table
        .uuid("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .notNullable();

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
