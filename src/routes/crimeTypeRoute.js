import config from "config";
import CrimeTypeService from "../services/crimeTypeService";

export default (app, database) => {
  const crimeTypeService = CrimeTypeService(database)

  app.router.post("/api/crimeType", async (ctx) => {

    try {
      const data = await crimeTypeService.create(ctx.request.body)
      
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
    
  })
}