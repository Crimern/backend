export default (database) => {

  const { Crime, CrimeType } = database.models;

  return {
    async create({ x, y, date, crimeType }) {
      try {
        const crimeTypeId = await CrimeType.findOne({
          name: crimeType
        });

        let data = new Crime({
          location: {
            type: 'Point',
            coordinates: [x, y]
          },
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

    async fetchInRadius(lng, lat) {
      try {
        console.log(lng, lat)
        const data = await Crime.find({
          location: {
            $geoWithin: {
              $centerSphere: [[lng, lat],
              100 / 3963.2]
            }
          }
        }).populate('type')
        return data;
      } catch (error) {
        throw error;
      }
    }
  }
}