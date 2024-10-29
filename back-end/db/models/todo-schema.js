const { Schema, model } = require('mongoose');

const todoSchema = Schema(
  {
    description: String,
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    projectid: {
      type: Schema.Types.ObjectId,
      ref: 'projects',
    },
  },
  { timestamps: true }
);
const Todo = model('todos', todoSchema);
module.exports = Todo;
