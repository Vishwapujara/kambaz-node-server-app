import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";

const db = { 
  courses: [...courses], 
  modules: [...modules], 
  assignments: [...assignments], 
  users: [...users], 
  enrollments: [...enrollments] 
};

export default { courses, modules, assignments, users, enrollments };
