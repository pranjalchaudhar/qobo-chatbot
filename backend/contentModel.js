import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  title: String,
  question: String,
  answer: String,
  keywords: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Knowledge = mongoose.model("Knowledge", knowledgeSchema);

export default Knowledge;