import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .uuid("category_id")
        .nullable()
        .alter()
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .uuid("category_id")
        .notNullable()
    });
  }
}
