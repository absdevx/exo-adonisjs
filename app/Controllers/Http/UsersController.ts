import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserStoreValidator from 'App/Validators/UserValidator'
import Task from 'App/Models/Task'

/*

Route.post('/users', 'UsersController.create')
Route.get('/users', 'UsersController.index')
Route.post('/users/:id', 'UsersController.show')

*/

const USER_PER_PAGE = 2

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)

    const pagination = await User.query()
      .select(['id', 'name', 'email'])
      .paginate(page, USER_PER_PAGE)
    return response.json(pagination.all())
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const trustedData = await request.validate(UserStoreValidator)
      const ret = await User.create(trustedData)

      return response.status(201).json(ret)
    } catch (error) {
      return response.status(400).json({ error: error.messages || error })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const paramId = params.id

    try {
      const data = await User.query().where('id', paramId).preload('tasks').select()

      return response.status(201).json(data)
    } catch (error) {
      return response.status(400).json({ error: error.messages || error })
    }
  }
}
