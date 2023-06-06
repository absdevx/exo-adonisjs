import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { TaskStatus } from "App/Enums/TaskStatus";

export default class extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(this.raw("uuid_generate_v4()"));

      table.string("title").notNullable();
      table.string("description").notNullable();
      table
        .enum("status", Object.values(TaskStatus))
        .defaultTo(TaskStatus.EN_COURS);

      table.uuid("user_id").references("users.id").unsigned().notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
