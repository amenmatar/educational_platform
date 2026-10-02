const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const usersFile = path.join(dataDir, 'users.json');
const coursesFile = path.join(dataDir, 'courses.json');

const ensureFile = (filePath, defaultData) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

const defaultUsers = [
  {
    id: 'admin-1',
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '$2a$10$R3KcD1vNQ7vQ6Kkg7vU42eXw0T4ZbFJ0K2b8A9l4xj1lW1A7OqN2',
    role: 'admin',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

const defaultCourses = [];

const initializeDatabase = () => {
  ensureFile(usersFile, defaultUsers);
  ensureFile(coursesFile, defaultCourses);
};

const readJson = (filePath, fallback) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    return fallback;
  }
};

const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getUsers = () => readJson(usersFile, []);
const getCourses = () => readJson(coursesFile, []);

const getUserById = (id) => getUsers().find((user) => user.id === id);
const getUserByEmail = (email) => getUsers().find((user) => user.email.toLowerCase() === String(email).toLowerCase());

const createUser = (user) => {
  const users = getUsers();
  users.push(user);
  writeJson(usersFile, users);
  return user;
};

const updateUser = (id, updates) => {
  const users = getUsers();
  const idx = users.findIndex((user) => user.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...updates };
  writeJson(usersFile, users);
  return users[idx];
};

const deleteUser = (id) => {
  const users = getUsers();
  const filtered = users.filter((user) => user.id !== id);
  if (filtered.length === users.length) return false;
  writeJson(usersFile, filtered);
  return true;
};

const getCourseById = (id) => getCourses().find((course) => course.id === id);
const getCoursesByTeacherId = (teacherId) => getCourses().filter((course) => course.teacherId === teacherId);

const createCourse = (course) => {
  const courses = getCourses();
  courses.push(course);
  writeJson(coursesFile, courses);
  return course;
};

const updateCourse = (id, updates) => {
  const courses = getCourses();
  const idx = courses.findIndex((course) => course.id === id);
  if (idx === -1) return null;
  courses[idx] = { ...courses[idx], ...updates };
  writeJson(coursesFile, courses);
  return courses[idx];
};

const deleteCourse = (id) => {
  const courses = getCourses();
  const filtered = courses.filter((course) => course.id !== id);
  if (filtered.length === courses.length) return false;
  writeJson(coursesFile, filtered);
  return true;
};

module.exports = {
  initializeDatabase,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getCourses,
  getCourseById,
  getCoursesByTeacherId,
  createCourse,
  updateCourse,
  deleteCourse
};
