/// /////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
/// /////////////////////////////////////////////

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SanitySchema = require('./sanity');

const State = {
  Executing: 0,
  Finished: 1
}

const Priority = {
  Minimum: 0,
  Low: 1,
  Normal: 2,
  High: 3,
  Urgent: 4
}

const simulationGroupSchema = Schema({

  _user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  seedAmount: {
    type: Number,
    required: true
  },
  load: {
    minimum: Number,
    maximum: Number,
    step: Number
  },
  priority: {
    type: Number,
    default: Priority.Minimum
  },
  state: {
    type: Number,
    default: State.Executing
  },
  sanity: SanitySchema,
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  estimatedEndTime: {
    type: Date
  }

})

simulationGroupSchema.statics.State = State

simulationGroupSchema.statics.countFinishedInstance = (simulationGroupId, error = false) => {
  const data = {
    $inc: {
      "sanity.errors": (error ? 1 : 0),
      "sanity.total": 1
    }
  };
  return model
    .findByIdAndUpdate(simulationGroupId, data)
    .exec();
};

const model = mongoose.model('SimulationGroup', simulationGroupSchema);

module.exports = model;
