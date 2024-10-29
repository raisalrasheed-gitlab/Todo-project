const express = require('express');
const db = require('./db/db');
const Project = require('./db/models/project-schema');
const Todo = require('./db/models/todo-schema');
const User = require('./db/models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkToken = require('./middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

console.log(checkToken);

app.get('/todo', checkToken, async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
});
app.get('/todo/:id', checkToken, async (req, res) => {
  const todo = await Todo.find({ projectid: req.params.id });
  res.json(todo);
});
app.get('/project/get', checkToken, async (req, res) => {
  const project = await Project.find();
  res.json(project);
});
app.get('/project/get/:id', checkToken, async (req, res) => {
  const { id } = req.params;
  const project = await Project.find({ userid: id });
  res.json(project);
});

app.post('/project/add', checkToken, async (req, res) => {
  const title = req.body.title;
  const user = req.body.userid;
  const project = await Project.create({ title: title, userid: user });
  res.status(200).json({ message: 'adding project' });
});
app.post('/todo/add', checkToken, async (req, res) => {
  const task = req.body.task;
  const projectid = req.body.projectid;

  const todo = await Todo.create({ description: task, projectid: projectid });
  res.status(200).json({ message: 'todo update' });
});

app.post('/user/signup', async (req, res) => {
  try {
    console.log('print');
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'Email already exist', error: true });
    }
    const hashedPassword = await bcrypt.hash(password, 2);
    const dbResponse = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: 'User added successfully', error: false });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

app.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(403)
        .json({ message: 'Email or Password incorrect', error: true });
    }
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res
        .status(403)
        .json({ message: 'Email or Password incorrect', error: true });
    }

    const token = jwt.sign(
      { id: user._id },
      '2930ru8h24r84fh8hh380her98h398h',
      {
        expiresIn: '5d',
      }
    );

    return res.status(200).json({
      message: 'You are logged in',
      error: false,
      token,
      id: user._id,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

app.listen(8001, () => {
  console.log('app is running at http://localhost:8001');
});
