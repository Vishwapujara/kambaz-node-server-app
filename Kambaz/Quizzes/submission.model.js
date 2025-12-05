// Kambaz/Quizzes/submission.model.js
import mongoose from "mongoose";
import schema from "./submission.schema.js";
const model = mongoose.model("QuizSubmissionModel", schema);
export default model;