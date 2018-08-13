export default (database) => {

  const { Crime, CrimeType } = database.models;

  return {
    async create({ lng, lat, date, crimeType }) {
      try {
        const crimeTypeId = await CrimeType.findOne({
          name: crimeType
        });

        let data = new Crime({
          location: {
            type: 'Point',
            coordinates: [lng, lat]
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

    async fetchInRadius({lng, lat, types}) {
      try {
        const data = await Crime.find({
          location: {
            $geoWithin: {
              $centerSphere: [[lng, lat],
              100 / 6371.008]
            }
          },
          type: { $in: types }
        }).populate('type')
        return data;
      } catch (error) {
        throw error;
      }
    }
  }
}