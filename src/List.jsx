import { useState, useEffect } from 'react';
import axios from 'axios';
import Items from '../components/Items';
import Form from '../components/Form';
import './App.css';

export default function List() {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

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

  return (
    <div>
      <Items items={items} delete_item={delete_item} />
      <Form setRefresh={setRefresh} accessToken={accessToken} />
    </div>
  );
}
