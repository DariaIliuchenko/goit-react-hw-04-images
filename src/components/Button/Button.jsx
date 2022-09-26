import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ clickHandler }) {
  return (
    <button 
    className={s.button} 
    onClick={clickHandler}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};