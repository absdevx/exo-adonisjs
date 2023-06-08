import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Category from "app/Models/Category";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public title: string;

  @column()
  public description: string;

  @belongsTo(() => Category)
  public category_id: BelongsTo<typeof Category>;

  @manyToMany(() => User, {
    pivotTable: "task_user",
    pivotForeignKey: "task_id",
    pivotRelatedForeignKey: "user_id",
    pivotColumns: ["status"],
  })
  public users: ManyToMany<typeof User>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  public serializeExtras() {
    return {
      users_count: this.$extras.users_count,
    };
  }
}
