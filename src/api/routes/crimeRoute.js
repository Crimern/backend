import config from "config";
import controller, {get,post} from "inra-server-http/dest/router";
import CrimeService from "../services/crimeService";


@controller('/api')
export default class CrimeRouter {
  constructor(dependencies) {
    this.database = dependencies.database;

    this.crimeService = CrimeService(this.database)
  }


  @post('/crime')
  async create(ctx) {
    try {
      const data = await this.crimeService.create(ctx.request.body)
      ctx.body = {
        success: true,
        data: data
      }
    } catch (error) {
      ctx.body = {
        success: false,
        error: error
      }
    }
  }

  @get('/crime')
  async fetch(ctx) {
    try {
      const data = await this.crimeService.fetchAll()
      
      ctx.body = {
        success: true,
        data: data
      }
    } catch (error) {
      ctx.body = {
        success: false,
        error: error
      }
    }
  }

  @post('/crime/radius')
  async fetchInRadius(ctx) {
    try {
      const data = await this.crimeService.fetchInRadius(ctx.request.body)
      
      ctx.body = {
        success: true,
        data: data
      }
    } catch (error) {
      ctx.body = {
        success: false,
        error: error.message
      }
    }
  }

}