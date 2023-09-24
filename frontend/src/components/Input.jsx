import PropTypes from 'prop-types';

export default function Input({
  value,
  setValue,
  placeHolder,
  className,
  type,
  autoComplete,
}) {
  Input.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    placeHolder: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
    autoComplete: PropTypes.string,
  };

  const inputType = type ? type : 'text';

  return (
    <input
      type={inputType}
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeHolder}
      className={className}
      autoComplete={autoComplete}
    />
  );
}
