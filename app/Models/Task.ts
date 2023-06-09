import { DateTime } from "luxon";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  afterFetch,
  belongsTo,
  column,
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

  @column({ serializeAs: null })
  public categoryId: string | null;

  @belongsTo(() => Category, {
    foreignKey: "categoryId",
  })
  public category: BelongsTo<typeof Category>;

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
      category_name: this.$extras.category_name,
      status: this.$extras.pivot_status,
    };
  }

  @afterFetch()
  public static async afterFetchCategory(tasks: Task[]) {
    return Promise.all(
      tasks.map(async (task) => {
        task.$extras.category_name = (await Category.findOrFail(task.categoryId)).name
      })
    )
  }
}
