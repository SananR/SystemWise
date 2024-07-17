import mongoose from 'mongoose';

const ProblemSchema = new mongoose.Schema({
  problemDescription: {
    type: String,
    required: true,
  },
  referenceSolution: {
    generalScenario: {
      type: String,
    },
    designScenario: {
      type: String,
    },
    functionalRequirements: {
      type: String,
    },
    nonFunctionalRequirements: {
      type: String,
    },
    trafficEstimates: {
      type: String,
    },
    endpoints: {
      type: String,
    },
    databaseSchemas: {
      type: String,
    },
  },
});

export const Problem = mongoose.model('Problem', ProblemSchema);
