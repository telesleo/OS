import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './taskbar.module.css';

export default function Taskbar() {
  const navigate = useNavigate();

  const closeApp = () => {
    navigate(0);
  };

  return (
    <div id={styles.taskbar}>
      <div>00:00</div>
      <div />
      <button type="button" onClick={closeApp}>
        <span className="material-symbols-outlined">
          restart_alt
        </span>
      </button>
    </div>
  );
}
