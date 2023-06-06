import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { TaskStatusList } from "App/Enums/TaskStatus";

export class TaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    description: schema.string(),
    status: schema.enum(TaskStatusList),
    user_id: schema.string([rules.exists({ table: "users", column: "id" })]),
    users: schema.array
      .optional([rules.requiredIfNotExists("user_id")])
      .members(schema.string([rules.exists({ table: "users", column: "id" })])),
  });

  public messages: CustomMessages = {
    "title.*": "Titre invalide",
    "description.*": "Description invalide",
    "status.*": "Status incorrect",
    "user_id.*": "ID utilisateur incorrect",
  };
}

export class TaskUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([
      rules.required(),
      rules.exists({ table: "tasks", column: "id" }),
    ]),
    title: schema.string.optional(),
    description: schema.string.optional(),
    status: schema.enum.optional(TaskStatusList),
    user_id: schema.number.optional([
      rules.exists({ table: "users", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {
    "title.*": "Titre invalide",
    "description.*": "Description invalide",
    "status.*": "Status incorrect",
    "user_id.*": "ID utilisateur incorrect",
  };
}
