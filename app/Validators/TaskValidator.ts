import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TaskStatusList } from 'App/Enums/TaskStatus'

export default class TaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    description: schema.string(),
    status: schema.enum(TaskStatusList),
    user_id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
  })

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
  public messages: CustomMessages = {
    'title.*': 'Titre invalide',
    'description.*': 'Description invalide',
    'status.*': 'Status incorrect',
    'user_id.*': 'ID utilisateur incorrect',
  }
}
