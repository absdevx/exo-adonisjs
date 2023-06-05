/* eslint-disable prettier/prettier */
// import Mail from '@ioc:Adonis/Addons/Mail'
// import { rules, validator, schema } from '@ioc:Adonis/Core/Validator'

export class ContactService {
  constructor(private to: string, private mailer: any, private validator: any) {}

  public async send(params: Record<string, any>) {
    let debug
    const { validator, schema, rules } = this.validator

    console.log('Preparing payload: params:"%s"', params)
    const payload = await validator.validate({
      schema: schema.create({
        name: schema.string({ trim: true }),
        email: schema.string({ trim: true }, [rules.email()]),
        message: schema.string({ trim: true }),
      }),
      data: params,
    })

    console.log('Sending payload')
    debug = await this.mailer.send((message) => {
      message
        .from(payload.email)
        .to(this.to)
        .subject(payload.message)
        .htmlView('emails/contact', payload)
    })

    console.log('debug: %s', debug)
  }
}
