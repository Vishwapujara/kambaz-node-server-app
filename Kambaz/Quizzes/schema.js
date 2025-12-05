import mongoose from "mongoose";
import questionSchema from "./question.schema.js"; // Import the embedded schema

const quizSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    course: { type: String, ref: "CourseModel", required: true }, // Links to the parent course [cite: 27]
    
    // Meta Fields [cite: 184-185]
    title: { type: String, default: "Unnamed Quiz" },
    description: String,

    // Configuration Fields [cite: 89-123]
    quizType: {
      type: String,
      enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
      default: "GRADED_QUIZ", // "Graded Quiz" is the default [cite: 89, 187]
    },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES", // "Quizzes" is the default [cite: 91, 189]
    },
    points: { type: Number, default: 0 }, // Sum of question points, managed by DAO logic [cite: 90]
    
    // Options [cite: 92-121]
    shuffleAnswers: { type: Boolean, default: true }, // Default: Yes [cite: 92, 190]
    timeLimit: { type: Number, default: 20 }, // In minutes. Default: 20 Minutes [cite: 92, 191]
    multipleAttempts: { type: Boolean, default: false }, // Default: No [cite: 92, 192]
    howManyAttempts: { type: Number, default: 1 }, // Default: 1 [cite: 115]
    accessCode: String, // Passcode students need to type [cite: 118]
    oneQuestionAtATime: { type: Boolean, default: true }, // Default: Yes [cite: 119]
    webcamRequired: { type: Boolean, default: false }, // Default: No [cite: 120]
    lockQuestionsAfterAnswering: { type: Boolean, default: false }, // Default: No [cite: 121]
    
    // Availability/Publish Status [cite: 74, 122-123]
    isPublished: { type: Boolean, default: false }, // Defaults to Unpublished [cite: 74]
    dueDate: Date,
    availableDate: Date, // Available from
    untilDate: Date, // Available until
    
    // Embedded Questions
    questions: [questionSchema],
  },
  { collection: "quizzes" }
);

export default quizSchema;