import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TaskStatus } from 'App/Enums/TaskStatus'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: true })

      table.integer('user_id').unsigned().references('users.id').onDelete('SET NULL').notNullable()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.enum('status', Object.values(TaskStatus))

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
