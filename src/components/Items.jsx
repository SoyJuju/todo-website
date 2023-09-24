import PropTypes from 'prop-types';
import { useState } from 'react';
import '../style/index.css';
import delete_icon from '../assets/delete.svg';
import edit_icon from '../assets/edit.svg';
import axios from 'axios';

export default function Items({ setRefresh, items, delete_item, handleEdit }) {
  Items.propTypes = {
    items: PropTypes.array.isRequired,
    delete_item: PropTypes.func.isRequired,
    setRefresh: PropTypes.func.isRequired,
    handleEdit: PropTypes.func,
  };

  const [filter, setFilter] = useState('All');
  const accessToken = localStorage.getItem('accessToken');

  const toggleItemChecked = (itemId, completionStatus) => {
    axios
      .put(
        `http://localhost:5000/api/todo-list/${itemId}/update-completion`,
        {
          completion: completionStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setRefresh(true);
        }
      })
      .catch((error) => {
        console.error('Error updating completion status:', error);
      });
  };

  const filterTasks = (filter) => {
    switch (filter) {
      case 'All':
        return items;
      case 'Active':
        return items.filter((item) => !item.completion);
      case 'Completed':
        return items.filter((item) => item.completion);
      default:
        return items;
    }
  };

  const filter_style = 'px-3 sm:px-6 py-3 text-slate-950 hover:bg-slate-200';
  const activeFilterStyle = 'border-b-2 border-blue-500';

  return (
    <div className="bg-slate-50 px-5 py-4 mt-6 rounded-sm">
      <div className="flex gap-4">
        <button
          className={`${filter_style} ${
            filter === 'All' ? activeFilterStyle : ''
          }`}
          onClick={() => setFilter('All')}
        >
          ALL
        </button>
        <button
          className={`${filter_style} ${
            filter === 'Active' ? activeFilterStyle : ''
          }`}
          onClick={() => setFilter('Active')}
        >
          ACTIVE
        </button>
        <button
          className={`${filter_style} ${
            filter === 'Completed' ? activeFilterStyle : ''
          }`}
          onClick={() => setFilter('Completed')}
        >
          COMPLETED
        </button>
      </div>
      <ol className="grid gap-3 mt-6 text-slate-950" role="list">
        {filterTasks(filter).map((item) => (
          <li key={item._id} className={`flex border-b border-gray-300 py-3 `}>
            <div className="list-title">
              <input
                type="checkbox"
                checked={item.completion}
                onChange={() => toggleItemChecked(item._id, !item.completion)}
              />
              <label
                className={`ml-2 ${item.completion ? 'line-through' : ''}`}
              >
                {item.title}
              </label>
            </div>
            <p className="text-center w-20 mx-5 whitespace-nowrap">
              {item.date}
            </p>
            <div className="w-16 ml-auto flex items-center gap-3 z-10">
              <button className="w-6" onClick={() => handleEdit(item)}>
                <img src={edit_icon} alt="" />
              </button>
              <button className="w-6" onClick={() => delete_item(item._id)}>
                <img src={delete_icon} alt="Delete" />
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
