import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public title: string;

  @column()
  public description: string;

  @manyToMany(() => User, {
    pivotTable: "task_user",
    pivotForeignKey: "task_id", // Clé étrangère vers le modèle User
    pivotRelatedForeignKey: "user_id", // Clé étrangère vers le modèle Role
    pivotColumns: ["status"],
  })
  public users: ManyToMany<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
