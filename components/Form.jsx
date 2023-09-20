import { useState } from 'react';
import axios from 'axios';
import Input from './Input';
import PropTypes from 'prop-types';

export default function Form({ setRefresh, accessToken }) {
  Form.propTypes = {
    setRefresh: PropTypes.func.isRequired,
    accessToken: PropTypes.string.isRequired,
  };

  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [date, setDate] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.post(
        'http://localhost:5000/api/todo-list',
        {
          title,
          description,
          date,
        },
        config
      );

      setRefresh(true);

      setTitle('');
      setDesc('');
      setDate('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={submit}>
      <Input value={title} setValue={setTitle} placeHolder={'title'} />
      <Input
        value={description}
        setValue={setDesc}
        placeHolder={'description'}
      />
      <Input value={date} setValue={setDate} placeHolder={'date'} />
      <button>Submit</button>
    </form>
  );
}
