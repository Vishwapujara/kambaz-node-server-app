import model from "./model.js"; // Import the Mongoose model
import { v4 as uuidv4 } from "uuid"; // <-- ADD THIS IMPORT

// Note: We keep the 'db' parameter in the function signature for compatibility 
// with the main application entry point (index.js), but we no longer use it.
export default function UsersDao(db) { 
  
  // Refactored to use Mongoose: model.create()
  // We keep your previous logic to ensure basic defaults (firstName, lastName) are set
  const createUser = (user) => {
    // 1. Prepare user object with required fields and defaults
    const newUser = {
      // FIX: Generate a unique string ID, since schema requires _id: String
      _id: uuidv4(), 
      ...user,
      firstName: user.firstName || "New",
      lastName: user.lastName || "User",
    };
    // Ensure the client-provided _id (if any) is overwritten or explicitly set, not deleted.
    
    return model.create(newUser);
  };

  // Refactored to use Mongoose: model.find()
  const findAllUsers = () => model.find();

  // Refactored to use Mongoose: model.findById()
  const findUserById = (userId) => model.findById(userId);

  // Refactored to use Mongoose: model.findOne({ criteria })
  const findUserByUsername = (username) => model.findOne({ username });

  // Refactored to use Mongoose: model.findOne({ criteria })
  const findUserByCredentials = (username, password) => {
    // IMPORTANT: Retaining your critical client-side logic for trimming credentials 
    const trimmedUsername = username ? username.trim() : username;
    const trimmedPassword = password ? password.trim() : password;

    return model.findOne({ username: trimmedUsername, password: trimmedPassword });
  };

  // Refactored to use Mongoose: model.updateOne({ filter }, { update })
  const updateUser = (userId, userUpdates) =>
    model.updateOne({ _id: userId }, { $set: userUpdates });

  // Refactored to use Mongoose: model.deleteOne({ filter })
  const deleteUser = (userId) => model.deleteOne({ _id: userId });

  // Retrieves users filtered by exact role match
  const findUsersByRole = (role) => model.find({ role }); 

  // Retrieves users filtered by partial name (first or last)
  const findUsersByPartialName = (partialName) => {
    // Create a case-insensitive regular expression
    const regex = new RegExp(partialName, "i"); 
    return model.find({
      $or: [
        { firstName: { $regex: regex } }, // Match first name partially
        { lastName: { $regex: regex } },  // Match last name partially
      ],
    });
  };



  return { 
    createUser, 
    findAllUsers, 
    findUserById, 
    findUserByUsername, 
    findUserByCredentials, 
    updateUser, 
    deleteUser,
    findUsersByRole,
    findUsersByPartialName,
  };
}