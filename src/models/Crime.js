import autoIncrement from 'mongoose-auto-increment';
import mongooseDecimal from 'mongoose-big-decimal';
export default (mongoose) => {
  mongooseDecimal(mongoose)
  const Schema = mongoose.Schema;
  

  const crime = new Schema({
    x: { type:  mongoose.Schema.Types.BigDecimal, required: true},
    y: { type:  mongoose.Schema.Types.BigDecimal, required: true },
    date: { type: Date, required: true },
    type : {type: mongoose.Schema.Types.ObjectId, ref: 'CrimeType' },
    created_at: Date,
    updated_at: Date,
  });

  
  autoIncrement.initialize(mongoose.connection);
  return {schema: crime, modelName: 'Crime'}
}