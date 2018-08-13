import config from "config";
import CrimeTypeService from "../services/crimeTypeService";
import controller, {get,post} from "inra-server-http/dest/router";

@controller('/api')
export default class CrimeTypeRouter {
  constructor(dependencies) {
    this.database = dependencies.database;

    this.crimeTypeService = CrimeTypeService(this.database)
  }

  @post('/crimeType')
  async create(ctx) {
    try {
      const data = await this.crimeTypeService.create(ctx.request.body)
      
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

  @get('/crimeType')
  async fetchAll(ctx) {
      const data = await this.crimeTypeService.fetchAll()
      
      ctx.body = {
        success: true,
        data: data
      }
  }
}