import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { basename } from 'path-browserify';
import { isPathValid, getEntry } from '../../utils/fileSystem';
import Terminal from '../Terminal';
import styles from './window.module.css';

export default function Window({
  storage, setStorage, app, path, removeWindow,
}) {
  const [name, setName] = useState();
  const [entry, setEntry] = useState();
  const [position] = useState({ x: 120, y: 30 });
  const [size] = useState({ width: 700, height: 500 });

  useEffect(() => {
    if (!isPathValid(storage, path)) return;
    setName(basename(path));
    setEntry(getEntry(storage, path));
  }, [path]);

  return (
    <div
      className={`${styles.window} ${'square'}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      <div className={styles.header}>
        <div className={styles['hide-button']}>⌄</div>
        {(name) || app }
        <button type="button" className={styles['exit-button']} onClick={removeWindow}>×</button>
      </div>
      {
        (entry) && (
          <div className={styles.content}>
            { (app === 'terminal') && <Terminal storage={storage} setStorage={setStorage} /> }
          </div>
        )
      }
    </div>
  );
}

Window.propTypes = {
  storage: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.shape({}),
  }).isRequired,
  setStorage: PropTypes.func.isRequired,
  app: PropTypes.string.isRequired,
  path: PropTypes.string,
  removeWindow: PropTypes.func.isRequired,
};

Window.defaultProps = {
  path: '/',
};
