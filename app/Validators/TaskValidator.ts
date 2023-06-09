import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { TaskStatusList } from "App/Enums/TaskStatus";

export class TaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [
      rules.required(),
      rules.unique({ table: "tasks", column: "title" }),
    ]),
    categoryId: schema.string({ trim: true }, [
      rules.exists({ table: "categories", column: "id" }),
    ]),
    description: schema.string({ trim: true, escape: true }, [
      rules.maxLength(200),
    ]),
    users: schema
      .array()
      .members(schema.string([rules.exists({ table: "users", column: "id" })])),
  });

  /*  public messages = {
    "title.unique": "Titre invalide",
    "title.required": "Titre invalide",
    "description.maxLength": "Description trop long",
    "users.*.exists": "ID utilisateur incorrect",
  }; */
}

export class TaskUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional(),
    status: schema.enum.optional(TaskStatusList),
    categoryId: schema.string.optional({ trim: true }, [
      rules.exists({ table: "categories", column: "id" }),
    ]),

    description: schema.string.optional(),
    users: schema
      .array.optional()
      .members(schema.string([rules.exists({ table: "users", column: "id" })])),
  })

  public messages: CustomMessages = {
    "title.*": "Titre invalide",
    "description.*": "Description invalide",
    "status.*": "Status incorrect",
    "users.*": "IDs utilisateur incorrect",
  };
}
