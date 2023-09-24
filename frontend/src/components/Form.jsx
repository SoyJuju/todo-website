import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import PropTypes from 'prop-types';
import '../style/index.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function Form({
  setRefresh,
  accessToken,
  editTask,
  onCancelEdit,
}) {
  Form.propTypes = {
    setRefresh: PropTypes.func.isRequired,
    accessToken: PropTypes.string.isRequired,
    editTask: PropTypes.object,
    onCancelEdit: PropTypes.func,
  };

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const completion = false;

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);

      const parsedDate = dayjs(editTask.date, 'DD/MM/YYYY');
      setDate(parsedDate);

      setIsEditing(true);
    }
  }, [editTask]);

  function handleCancel() {
    setTitle('');
    setDate(null);
    setIsEditing(false);
    onCancelEdit();
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (isEditing && editTask) {
        await axios.put(
          `http://localhost:5000/api/todo-list/${editTask._id}`,
          {
            title,
            date: date.format('DD/MM/YYYY'),
          },
          config
        );
        setIsEditing(false);
      } else {
        await axios.post(
          'http://localhost:5000/api/todo-list',
          {
            title,
            date: date.format('DD/MM/YYYY'),
            completion,
          },
          config
        );
      }

      setRefresh(true);

      setTitle('');
      setDate(null);
    } catch (err) {
      console.log(err);
    }
  }

  const inputClass = `list-input px-3 py-2 rounded-sm my-3 text-slate-950 ${
    isEditing && 'editOn'
  }`;

  return (
    <form className="flex flex-wrap gap-x-3" onSubmit={submit}>
      <Input
        className={inputClass}
        value={title}
        setValue={setTitle}
        placeHolder={'New task...'}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slotProps={{ textField: { variant: 'filled' } }}
          closeOnSelect={true}
          value={date}
          format={'DD/MM/YYYY'}
          onChange={(newDate) => setDate(newDate)}
        />
      </LocalizationProvider>
      <button
        className={`px-3 py-2 rounded-sm my-3 text-slate-950 ${
          isEditing ? 'bg-blue-400' : 'bg-yellow-400'
        }`}
      >
        {isEditing ? 'Edit' : 'Add'}
      </button>
      {isEditing && (
        <button
          onClick={handleCancel}
          className="px-3 py-2 rounded-sm my-3 text-slate-950 bg-yellow-400"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
