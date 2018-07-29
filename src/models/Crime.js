import autoIncrement from 'mongoose-auto-increment';
export default (mongoose) => {
  const Schema = mongoose.Schema;

  const crime = new Schema({
    x: { type: Number, required: true},
    y: { type: Number, required: true },
    date: { type: Date, required: true },
    type : {type: mongoose.Schema.Types.ObjectId, ref: 'CrimeType' },
    created_at: Date,
    updated_at: Date,
  });

  
  autoIncrement.initialize(mongoose.connection);
  return {schema: crime, modelName: 'Crime'}
}