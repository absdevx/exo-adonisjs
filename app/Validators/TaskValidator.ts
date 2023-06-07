import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { TaskStatus, TaskStatusList } from "App/Enums/TaskStatus";

export class TaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    description: schema.string(),
    status: schema.enum(TaskStatusList),

    users: schema
      .array([rules.requiredIfNotExists("user_id")])
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
    id: schema.string([
      rules.required(),
      rules.exists({ table: "tasks", column: "id" }),
    ]),
    title: schema.string.optional(),
    description: schema.string.optional(),
    status: schema.enum.optional(Object.values(TaskStatus)),
  });

  public messages: CustomMessages = {
    "title.*": "Titre invalide",
    "description.*": "Description invalide",
    "status.*": "Status incorrect",
    "user_id.*": "ID utilisateur incorrect",
  };
}
