import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = ({ code }) => {
    if (code === 'Escape') {
      this.props.closeModal();
    }
  };

  clickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <div className={s.Overlay} onClick={this.clickBackdrop}>
        <div className={s.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
