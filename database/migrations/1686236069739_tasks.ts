import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .uuid("category_id")
        .unsigned()
        .references("id")
        .inTable("categories")
        .notNullable()
        .onDelete("cascade");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
