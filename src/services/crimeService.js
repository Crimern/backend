export default (database) => {

  const { Crime, CrimeType } = database.models;

  return {
    async create({ x, y, date, crimeType }) {
      try {
        const crimeTypeId = await CrimeType.findOne({
          name: crimeType
        });

        let data = new Crime({
          x,
          y,
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
      } catch (error) {
        throw error;
      }
    },

    async fetchInRadius(x, y, zoom) {
      try {
        const data = await Crime.find({}).populate('type')
        const radius = 1;
        return data.filter(el => {
          return (Math.sqrt(Math.pow((el.x - x),2) + Math.pow((el.y - y),2)) < radius)
        })
      } catch (error) {
        throw error;
      }
    }
  }
}