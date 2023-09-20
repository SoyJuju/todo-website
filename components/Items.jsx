import PropTypes from 'prop-types';

export default function Items({ items, delete_item }) {
  Items.propTypes = {
    items: PropTypes.array.isRequired,
    delete_item: PropTypes.func.isRequired,
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>
          <p>
            {item.title} {item.description} {item.date}
          </p>
          <button onClick={() => delete_item(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
