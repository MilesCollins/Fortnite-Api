import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  server: {
    type: String,
    required: true
  },
  earnings: {
    type: Number,
    required: true,
    default: 0
  },
  input: {
    type: String
  }
})

const model = mongoose.model('Player', playerSchema)

export const schema = model.schema;
export default model;