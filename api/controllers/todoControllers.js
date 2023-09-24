import asyncHandler from 'express-async-handler';
import TodoList from '../models/todo.js';

export const getList = asyncHandler(async (req, res) => {
  const list = await TodoList.find({ user_id: req.user.id });
  res.status(200).json(list);
});

export const createItem = asyncHandler(async (req, res) => {
  const { title, date, completion } = req.body;
  if (!title || date === '') {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }

  const newItem = new TodoList({
    title,
    date,
    completion,
    user_id: req.user.id,
  });

  await newItem.save();
  res.status(201).json({ message: 'Task created successfully' });
});

export const getItem = asyncHandler(async (req, res) => {
  const item = await TodoList.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Task not found');
  }
  res.status(200).json(item);
});

export const updateItem = asyncHandler(async (req, res) => {
  const item = await TodoList.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (item.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "User don't don't have permission to update other user's task"
    );
  }

  const { title, date } = req.body;
  if (!title || date === '') {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }

  const updatedItem = await TodoList.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedItem);
});

export const updateItemCompletion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { completion } = req.body;

  const updatedItem = await TodoList.findByIdAndUpdate(
    id,
    { completion },
    { new: true }
  );

  if (!updatedItem) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (updatedItem.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to update other user's task");
  }

  res.status(200).json(updatedItem);
});

export const deleteItem = asyncHandler(async (req, res) => {
  const item = await TodoList.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (item.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "User don't don't have permission to delete other user's task"
    );
  }

  await TodoList.findByIdAndRemove(req.params.id);

  res.status(200).json(item);
});
