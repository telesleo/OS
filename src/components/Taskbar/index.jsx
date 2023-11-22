import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import WindowBar from '../WindowBar';
import styles from './taskbar.module.css';

export default function Taskbar({ windows }) {
  const navigate = useNavigate();

  const closeApp = () => {
    navigate(0);
  };

  return (
    <div id={styles.taskbar}>
      <div>00:00</div>
      <WindowBar windows={windows} />
      <button type="button" onClick={closeApp}>
        <span className="material-symbols-outlined">
          restart_alt
        </span>
      </button>
    </div>
  );
}

Taskbar.propTypes = {
  windows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
