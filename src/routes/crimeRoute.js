import config from "config";
import CrimeService from "../services/crimeService";

export default (app, database) => {
  const {Crime} = database.models;
  const crimeService = CrimeService(database)

  app.router.post("/api/crime", async (ctx) => {
    const {geoCoord,date, crimeType} = ctx.request.body;
    try {
      const data = await crimeService.create(ctx.request.body)
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
  })

  app.router.get("/api/crime", async (ctx) => {
    try {
      const data = await crimeService.fetchAll()
      
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
  })

  app.router.post("/api/crime/radius", async (ctx) => {
    try {
      const data = await crimeService.fetchInRadius(ctx.request.body)
      
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