import mongoose from "mongoose";

// Sub-schema for a single question's attempt
const submissionAnswerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true }, // The _id of the question from the embedded question array
    studentAnswer: String, // The student's text answer (for MC/TF/FITB)
    isCorrect: { type: Boolean, default: false }, // Result of grading the answer [cite: 336]
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // E.g., `${quizId}-${studentId}-${attemptNumber}`
    quiz: { type: String, ref: "QuizModel", required: true },
    student: { type: String, ref: "UserModel", required: true },
    
    attemptNumber: { type: Number, default: 1 }, // Tracks the attempt number [cite: 334, 338]
    score: { type: Number, default: 0 }, // Final grade for the attempt [cite: 13, 85, 335]
    submitted: { type: Boolean, default: false }, // True once the student clicks 'Submit Quiz'
    submissionDate: { type: Date, default: Date.now },
    
    answers: [submissionAnswerSchema],
  },
  { collection: "quizSubmissions" }
);

export default submissionSchema;