import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public status: string;

  @column()
  public userId: string;

  @hasMany(() => User)
  public manyUsers: HasMany<typeof User>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @manyToMany(() => User, { pivotTable: "task_user" })
  public users: ManyToMany<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
