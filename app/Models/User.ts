import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Task from "App/Models/Task";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public email: string;

  /* @belongsToMany(() => Task)
    public belongsToManyTasks: HasMany<typeof Task> */

  @manyToMany(() => Task, {
    pivotTable: "task_user",
    pivotForeignKey: "user_id",
    pivotRelatedForeignKey: "task_id",
    pivotColumns: ["status"],
  })
  public tasks: ManyToMany<typeof Task>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  // public serializeExtras = true;

  public serializeExtras() {
    return {
      tasks_count: this.$extras.tasks_count,
      status: this.$extras.pivot_status
    };
  }
}
