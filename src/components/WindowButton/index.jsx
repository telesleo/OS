import React from 'react';
import PropTypes from 'prop-types';
import { basename } from 'path-browserify';
import styles from './window-button.module.css';
import capitalize from '../../utils/string';

export default function WindowButton({ window, changeWindowVisibility }) {
  return (
    <button
      id="window-button"
      type="button"
      className={`${styles['window-button']} square`}
      onClick={() => changeWindowVisibility(!window.hide)}
      title={(window.path) ? basename(window.path) : capitalize(window.app)}
    >
      {window.app[0].toUpperCase()}
    </button>
  );
}

WindowButton.propTypes = {
  window: PropTypes.shape({
    app: PropTypes.string,
    path: PropTypes.string,
    hide: PropTypes.bool,
  }).isRequired,
  changeWindowVisibility: PropTypes.func.isRequired,
};
