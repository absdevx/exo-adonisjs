import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.minLength(3), rules.unique({ table: 'users', column: 'name' })]),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
  })

  public messages: CustomMessages = {
    'name.minLength': 'La taille minimale est de 3 caractères',
    'email.email': 'Le format de votre email est incorrect',
    'email.unique': 'Ce email existe déja',
    'name.unique': 'Ce nom existe déja',
  }
}
