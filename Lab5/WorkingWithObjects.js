const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2025-11-17", completed: false, score: 0,
};

// add a module object per task 5.2.3.4
const moduleObj = {
  id: "M1",
  name: "Intro to Node",
  description: "Basics of Node and Express",
  course: "C1",
};

export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };

  // new: get module object
  const getModule = (req, res) => {
    res.json(moduleObj);
  };
  // new: get module name
  const getModuleName = (req, res) => {
    res.json(moduleObj.name);
  };
  // new: set module name
  const setModuleName = (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  };
  // new: set module description
  const setModuleDescription = (req, res) => {
    const { newDesc } = req.params;
    moduleObj.description = newDesc;
    res.json(moduleObj);
  };

  // new: set assignment score
  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    const parsed = Number(newScore);
    assignment.score = isNaN(parsed) ? assignment.score : parsed;
    res.json(assignment);
  };
  // new: set assignment completed (true/false)
  const setAssignmentCompleted = (req, res) => {
    const { val } = req.params;
    assignment.completed = val === "true";
    res.json(assignment);
  };

  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);

  // module routes
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/module/description/:newDesc", setModuleDescription);

  // assignment score/completed routes
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
  app.get("/lab5/assignment/completed/:val", setAssignmentCompleted);
};

