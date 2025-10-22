import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: "TODO"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  priority: {
    type: String
  },
  deadLine: {
    type: Date
  },
  helpNotes: {
    type: String
  },
  relatedSkills: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
