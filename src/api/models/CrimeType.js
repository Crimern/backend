export default (mongoose) => {
  const Schema = mongoose.Schema;

  const crimeType = new Schema({
    name: { type: String, required: true, unique: true},
  });


  return {schema: crimeType, modelName: 'CrimeType'}
}