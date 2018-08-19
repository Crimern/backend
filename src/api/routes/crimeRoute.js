import config from "config";
import controller, { get, post } from "inra-server-http/dest/router";
import CrimeService from "../services/crimeService";


@controller('/api')
export default class CrimeRouter {
  constructor(dependencies) {
    this.database = dependencies.database;

    this.crimeService = CrimeService(this.database)
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
  @post('/crime')
  async create(ctx) {
    const data = await this.crimeService.create(ctx.request.body)

    ctx.body = {
      success: true,
      data: data
    }

  }
  /**
  * @api {post} /api/crime Fetches all crimes
  * @apiName FetchCrimes
  * @apiGroup Crime
  *
  * 
  * @apiSuccess {Object} Array with all crimes.
  */
  @get('/crime')
  async fetch(ctx) {
    const data = await this.crimeService.fetchAll()

    ctx.body = {
      success: true,
      data: data
    }
  }

  /**
* @api {post} /api/crime Fetches all crimes in radius
* @apiName FetchCrimesRadius
* @apiGroup Crime
*
* @apiParam {Array} types 
* @apiParam {Number} lng longtidude 
* @apiParam {Number} lat latidude
* @apiSuccess {Object} Array with all crimes in given radius.
*/
  @post('/crime/radius')
  async fetchInRadius(ctx) {
    const data = await this.crimeService.fetchInRadius(JSON.parse(ctx.request.body))
    
    ctx.body = {
      success: true,
      data: data
    }
  }

}