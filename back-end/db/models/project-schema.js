const { Schema, model } = require('mongoose');

const projectSchema = Schema(
  {
    title: String,
    userid: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },

  { timestamps: true }
);
const Project = model('projects', projectSchema);
module.exports = Project;
