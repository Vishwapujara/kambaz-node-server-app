import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  
  // R: Read (Find all for a course)
  function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  // C: Create
  function createAssignment(assignment) {
    // ⚠️ FIX: Generate _id using uuidv4() before creating the document
    const newAssignment = {
        _id: uuidv4(), 
        ...assignment 
    };
    
    return model.create(newAssignment);
  }

  // U: Update
  async function updateAssignment(assignmentId, assignmentUpdates) {
    await model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
    const updatedAssignment = await model.findById(assignmentId);
    return updatedAssignment;
  }

  // D: Delete
  async function deleteAssignment(assignmentId) {
    const status = await model.deleteOne({ _id: assignmentId });
    return status;
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}