import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(this.raw("uuid_generate_v4()"));

      table.string("name").notNullable();
      table.string("email").notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
