import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Window from '../components/Window';
import styles from './main.module.css';

export default function Main({ storage }) {
  const [windows] = useState([{
    path: '/desktop/text.txt',
  }]);

  return (
    <div id={styles.main}>
      <div id={styles.windows}>
        {
          windows.map((window, index) => (
            <Window
              key={index + window.path}
              storage={storage}
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
};
