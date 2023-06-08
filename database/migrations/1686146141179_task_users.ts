import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "task_user";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      this.raw(
        `ALTER TABLE task_user ADD CONSTRAINT unique_task_user UNIQUE (task_id, user_id);`
      );
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {});
  }
}
