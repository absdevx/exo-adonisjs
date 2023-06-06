import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { TaskStatusList } from "App/Enums/TaskStatus";

<<<<<<< HEAD
export default class TaskValidator {
=======
export class TaskValidator {
>>>>>>> develop
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    description: schema.string(),
    status: schema.enum(TaskStatusList),
    user_id: schema.number([rules.exists({ table: "users", column: "id" })]),
  });

<<<<<<< HEAD
  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
=======
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

>>>>>>> develop
  public messages: CustomMessages = {
    "title.*": "Titre invalide",
    "description.*": "Description invalide",
    "status.*": "Status incorrect",
    "user_id.*": "ID utilisateur incorrect",
  };
}
