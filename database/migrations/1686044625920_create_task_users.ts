import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "task_user";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer("task_id").unsigned().notNullable();
      table.integer("user_id").unsigned().notNullable();

      table
        .foreign("task_id")
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE");

      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      
      table.primary(['user_id', 'task_id'])
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
