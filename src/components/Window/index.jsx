import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { basename } from 'path-browserify';
import { isPathValid, getEntry } from '../../utils/fileSystem';
import styles from './window.module.css';

export default function Window({ storage, path }) {
  const [name, setName] = useState();
  const [entry, setEntry] = useState();
  const [position] = useState({ x: 30, y: 30 });
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
        top: `${position.x}px`,
        left: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {
        (name) && (
          <div className={styles.header}>
            {name}
          </div>
        )
      }
      {
        (entry) && (
          <div className={styles.content}>
            {entry.content}
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
  path: PropTypes.string.isRequired,
};
