import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

<<<<<<< HEAD
export default class UserStoreValidator {
=======
export class UserStoreValidator {
>>>>>>> develop
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.minLength(3),
      rules.unique({ table: "users", column: "name" }),
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
  });

  public messages: CustomMessages = {
    "name.minLength": "La taille minimale est de 3 caractères",
    "email.email": "Le format de votre email est incorrect",
    "email.unique": "Ce email existe déja",
    "name.unique": "Ce nom existe déja",
  };
}
<<<<<<< HEAD
=======

export class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([
      rules.required(),
      rules.exists({ table: "users", column: "id" }),
    ]),
    name: schema.string.optional({}, [rules.minLength(3)]),
    email: schema.string.optional({}, [rules.email()]),
  });

  public messages: CustomMessages = {
    "id.*": "L'identifiant est invalide",
    "id.required": "L'identifiant est requis",
    "name.minLength": "La taille minimale est de 3 caractères",
    "email.exists": "L'email est invalide",
  };
}
>>>>>>> develop
