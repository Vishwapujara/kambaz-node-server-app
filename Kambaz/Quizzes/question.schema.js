import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Client-side generated ID (e.g., using uuidv4)
    title: String,
    questionText: String, // WYSIWYG content for the question itself [cite: 231, 268, 276]
    points: { type: Number, default: 10 }, // How many points the question is worth [cite: 231]
    
    questionType: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_THE_BLANK"],
      default: "MULTIPLE_CHOICE",
      required: true,
    },

    // --- Type-Specific Answer Fields ---
    
    // Used for MULTIPLE_CHOICE: Array of all possible choice strings [cite: 232]
    choices: [String], 

    // Used for MULTIPLE_CHOICE (single correct answer string) 
    // and TRUE_FALSE ("True" or "False" string)
    correctAnswer: String,

    // Used for FILL_IN_THE_BLANK: Array of all possible correct answers (e.g., ["4", "four"]) [cite: 277]
    correctAnswers: [String], 
    
  },
  { _id: false } // Do not create an external collection for this; it is always embedded
);

export default questionSchema;