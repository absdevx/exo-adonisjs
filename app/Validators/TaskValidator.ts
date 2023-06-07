import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import {  TaskStatusList } from "App/Enums/TaskStatus";

export class TaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string([
      rules.required(),
      rules.unique({ table: "tasks", column: "title" }),
    ]),
    description: schema.string([rules.maxLength(200)]),
    users: schema
      .array()
      .members(schema.string([rules.exists({ table: "users", column: "id" })])),
  });

  public messages: CustomMessages = {
    "title.unique": "Titre invalide",
    "title.required": "Titre invalide",
    "description.": "Description invalide",
    "users.*": "ID utilisateur incorrect",
  };
}

export class TaskUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional(),
    status: schema.enum(TaskStatusList),
    description: schema.string.optional(),
    users: schema
      .array()
      .members(schema.string([rules.exists({ table: "users", column: "id" })])),
  });

  public messages: CustomMessages = {
    "title.*": "Titre invalide",
    "description.*": "Description invalide",
    "status.*": "Status incorrect",
    "users.*": "IDs utilisateur incorrect",
  };
}
