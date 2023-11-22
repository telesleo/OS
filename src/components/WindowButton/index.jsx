import React from 'react';
import PropTypes from 'prop-types';
import { basename } from 'path-browserify';
import styles from './window-button.module.css';
import capitalize from '../../utils/string';

export default function WindowButton({ window }) {
  return (
    <div className={`${styles['window-button']} square`} title={(window.path) ? basename(window.path) : capitalize(window.app)} />
  );
}

WindowButton.propTypes = {
  window: PropTypes.shape({
    app: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
};
