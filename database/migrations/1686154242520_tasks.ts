import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      this.raw(
        `ALTER TABLE tasks ADD CONSTRAINT unique_task_title UNIQUE (title);`
      );
      // table.unique(['title'])
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
     this.raw(
       `ALTER TABLE tasks DROP CONSTRAINT unique_task_title UNIQUE (title);`
     );
    })
  }
}
