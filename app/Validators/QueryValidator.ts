import { schema, CustomMessages, rules, validator } from "@ioc:Adonis/Core/Validator";

export class UserQueryValidator {
  public static validate(params: any, table) {
    const customSchema = schema.create({
      query: schema.string([
        rules.required(),
        rules.exists({ table: table, column: "id" }),
      ]),
      page: schema.number.optional([
      ]),
    });

    const messages: CustomMessages = {
      "id.*": "L'ID est incorrect",
    };
    return validator.validate({
      schema: customSchema,
      messages: messages,
      data: params,
    });
  }
}
