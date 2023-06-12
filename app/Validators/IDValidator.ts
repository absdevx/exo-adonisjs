import {
  schema,
  CustomMessages,
  rules,
  validator,
} from "@ioc:Adonis/Core/Validator";

export class IDValidator {
  public static validate(params: any, table) {
    const customSchema = schema.create({
      id: schema.string([
        rules.required(),
        rules.exists({ table: table, column: "id" }),
      ]),
    });

    const messages: CustomMessages = {
      required: "L'ID {{  }} est incorrect",
      exists: "L'ID n'existe pas",
    };
    return validator.validate({
      schema: customSchema,
      messages: messages,
      data: params,
    });
  }
}
