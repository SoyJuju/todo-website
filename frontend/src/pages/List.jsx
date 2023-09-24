import { useState, useEffect } from 'react';
import axios from 'axios';
import Items from '../components/Items';
import Form from '../components/Form';
import { useHistory } from 'react-router-dom';
import '../style/index.css';

export default function List() {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const accessToken = localStorage.getItem('accessToken');

  function handleEdit(task) {
    setEditedTask(task);
  }

  function cancelEdit() {
    setEditedTask(null);
  }

  const history = useHistory();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/todo-list', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => console.log(err));

    setRefresh(false);
  }, [refresh, accessToken]);

  const delete_item = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo-list/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  function handleLogout() {
    localStorage.removeItem('accessToken');
    history.push('/login');
  }

  return (
    <section className="pages">
      <div className="container flex justify-center absolute inset-x-0 top-20 z-10">
        <div className="list-container">
          <h1 className="text-4xl font-bold my-5">Tasks</h1>
          <Form
            setRefresh={setRefresh}
            accessToken={accessToken}
            editTask={editedTask}
            onCancelEdit={cancelEdit}
          />
          <Items
            items={items}
            setRefresh={setRefresh}
            delete_item={delete_item}
            handleEdit={handleEdit}
          />
          <button
            className="mt-6 py-2 px-4 rounded-md bg-yellow-400 text-slate-950"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>
    </section>
  );
}
