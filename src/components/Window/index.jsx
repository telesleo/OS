import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { basename } from 'path-browserify';
import { isPathValid, getEntry } from '../../utils/fileSystem';
import styles from './window.module.css';

export default function Window({ storage, path }) {
  const [name, setName] = useState();
  const [entry, setEntry] = useState();

  useEffect(() => {
    if (!isPathValid(storage, path)) return;
    setName(basename(path));
    setEntry(getEntry(storage, path));
  }, [path]);

  return (
    <div className={styles.window}>
      {
        (name) && (
          <div>
            {name}
          </div>
        )
      }
      {
        (entry) && (
          <div>
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
