import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class CategoryUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.unique({ table: "category", column: "name" }),
    ]),
    description: schema.string.optional({ trim: true }, []),
  });

  public messages: CustomMessages = {};
}
export class CategoryStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.unique({ table: "category", column: "name" }),
    ]),
    description: schema.string({ trim: true }, []),
  });

  public messages: CustomMessages = {};
}
