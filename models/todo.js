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
    date: {
      type: String,
      required: [true, 'Please add the task completion date'],
    },
    completion: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const TodoItems = mongoose.model('todo-lists', todoSchema);
export default TodoItems;
