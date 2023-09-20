import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: 'Users',
    },
    title: {
      type: String,
      required: [true, 'Please add the task title'],
    },
    description: {
      type: String,
      required: [true, 'Please add the task description'],
    },
    date: {
      type: String,
      required: [true, 'Please add the task completion date'],
    },
  },
  {
    timestamps: true,
  }
);

const TodoItems = mongoose.model('todo-lists', todoSchema);
export default TodoItems;
