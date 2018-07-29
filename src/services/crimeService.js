export default (database) => {

  const { Crime, CrimeType } = database.models;

  return {
    async create({ geoCoord, date, crimeType }) {
      try {
        const crimeTypeId = await CrimeType.findOne({
          name: crimeType
        });

        let data = new Crime({
          x: geoCoord.x,
          y: geoCoord.y,
          date: new Date(date),
          type: crimeTypeId._id
        })

        await data.save()
        
        return data;
      } catch (error) {
        throw error;
      }

    },

    async fetchAll() {
      try {
        const data = await Crime.find({}).populate('type')
       
        return data;
      } catch(error) {
        throw error;  
      }
    }
  }
}