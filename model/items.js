import { model, models, Schema } from 'mongoose';

const ItemsSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  }
}, {
  timestamps: true,
});

export const Items = models?.Items || model('Items', ItemsSchema);
