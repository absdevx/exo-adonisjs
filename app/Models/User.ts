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

  @manyToMany(() => Task, {
    pivotTable: "task_user",
    pivotForeignKey: "user_id", 
    pivotRelatedForeignKey: "task_id", 
    pivotColumns: ["status"],
  })
  public tasks: ManyToMany<typeof Task>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
