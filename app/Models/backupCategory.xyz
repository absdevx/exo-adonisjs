import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Task from "app/Models/Task";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, serializeAs: null, autoUpdate: true })
  public updatedAt: DateTime;

  public serializeExtras() {
    return {
      tasks_count: this.$extras.users_count,
    };
  }
}
