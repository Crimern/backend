export default (database) => {

  const { Crime, CrimeType } = database.models;

  return {
    async create({ name }) {
      try {
        const data = new CrimeType({
          name: name
        })

        await data.save();        
        return data;

      } catch (error) {
        throw error;
      }
    },

    async fetchAll() {
      try {
        const data = await CrimeType.find({})

        return data;
      } catch(error) {
        throw error;
      }
    }
  }
}