import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Window from '../components/Window';
import styles from './main.module.css';

export default function Main({ storage, setStorage }) {
  const [windows] = useState([{
    app: 'terminal',
  }]);

  return (
    <div id={styles.main}>
      <div id={styles.windows}>
        {
          windows.map((window, index) => (
            <Window
              key={index + window.path}
              storage={storage}
              setStorage={setStorage}
              app={window.app}
              path={window.path}
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
