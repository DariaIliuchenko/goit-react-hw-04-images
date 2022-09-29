import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button
      type="button"
      className={s.button}
      onClick={onClick}
      disabled={false}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};