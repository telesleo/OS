import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Window from '../components/Window';
import styles from './main.module.css';
import Taskbar from '../components/Taskbar';

export default function Main({ storage, setStorage }) {
  const [windows, setWindows] = useState([{
    id: 0,
    app: 'terminal',
  }]);

  const removeWindow = (id) => {
    setWindows((prevWindows) => prevWindows.filter((window) => window.id !== id));
  };

  return (
    <div id={styles.main}>
      <Taskbar windows={windows} />
      <div id={styles.windows}>
        {
          windows.map((window, index) => (
            <Window
              key={index + window.path}
              storage={storage}
              setStorage={setStorage}
              app={window.app}
              path={window.path}
              removeWindow={() => removeWindow(window.id)}
            />
          ))
        }
      </div>
    </div>
  );
}

Main.propTypes = {
  storage: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.shape({}),
  }).isRequired,
  setStorage: PropTypes.func.isRequired,
};
