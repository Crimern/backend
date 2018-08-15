import config from "config";
import CrimeTypeService from "../services/crimeTypeService";
import controller, { get, post } from "inra-server-http/dest/router";

@controller('/api')
export default class CrimeTypeRouter {
  constructor(dependencies) {
    this.database = dependencies.database;

    this.crimeTypeService = CrimeTypeService(this.database)
  }

  /**
 * @api {post} /api/crimeType Add new crimeType
 * @apiName CreateCrimeType
 * @apiGroup CrimeType
 *
 * @apiParam {String} name 
 * 
 * @apiSuccess {Object} created object.
 */
  @post('/crimeType')
  async create(ctx) {
    const data = await this.crimeTypeService.create(ctx.request.body)

    ctx.status = 201;
    ctx.body = {
      success: true,
      data: data
    }
  }

  /**
 * @api {post} /api/crimeType Fetches all CrimeTypes
 * @apiName GetCrimeType
 * @apiGroup CrimeType
 *
 * 
 * @apiSuccess {Object} requested objects.
 */
  @get('/crimeType')
  async fetchAll(ctx) {
    const data = await this.crimeTypeService.fetchAll()

    ctx.body = {
      success: true,
      data: data
    }
  }
}