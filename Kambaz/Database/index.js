import courses from "./courses.json" assert { type: "json" };
import modules from "./modules.json" assert { type: "json" };
import assignments from "./assignments.json" assert { type: "json" };
import users from "./users.json" assert { type: "json" };
import enrollments from "./enrollments.json" assert { type: "json" };

const db = { 
  courses: [...courses], 
  modules: [...modules], 
  assignments: [...assignments], 
  users: [...users], 
  enrollments: [...enrollments] 
};

export default { courses, modules, assignments, users, enrollments };