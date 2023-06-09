import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  HasOne,
  ManyToMany,
  column,
  hasMany,
  hasOne,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Category from "App/Models/Category";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public title: string;

  @column()
  public description: string;

  @column({serializeAs: null})
  public categoryId: string;

  @hasOne(() => Category)
  public categories: HasOne<typeof Category>;

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
      categories_count: this.$extras.categories_count,
      status: this.$extras.pivot_status
    };
  }
}
