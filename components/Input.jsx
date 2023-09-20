import PropTypes from 'prop-types';

export default function Input({ value, setValue, placeHolder }) {
  Input.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    placeHolder: PropTypes.string.isRequired,
  };

  return (
    <input
      type="text"
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeHolder}
    />
  );
}
