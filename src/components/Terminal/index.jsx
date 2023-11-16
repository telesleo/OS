import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import commands from '../../utils/commands';
import styles from './terminal.module.css';

export default function Terminal({ storage, setStorage }) {
  const [path, setPath] = useState('/');
  const [history, setHistory] = useState([]);
  const [commandLine, setCommandLine] = useState('');

  const inputRef = useRef();

  const onInputChange = ({ target }) => {
    setCommandLine(target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const executeCommand = () => {
    setHistory(
      (prevHistory) => [...prevHistory, { type: 'input', content: commandLine }],
    );

    let command = '';
    let parameters = '';
    const paramIndex = commandLine.indexOf(' ');
    if (paramIndex > -1) {
      command = commandLine.slice(0, paramIndex);
      parameters = commandLine.slice(paramIndex + 1);
    } else {
      command = commandLine;
    }
    if (Object.keys(commands).includes(command)) {
      const output = commands[command](
        parameters,
        path,
        setPath,
        storage,
        setStorage,
        history,
        setHistory,
      );
      if (output) {
        setHistory(
          (prevHistory) => [...prevHistory, { type: 'output', content: output }],
        );
      }
    } else {
      setHistory(
        (prevHistory) => [...prevHistory, { type: 'output', content: `The command "${command}" does not exist` }],
      );
    }

    setCommandLine('');
  };

  const onInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      executeCommand();
    }
  };

  return (
    <div className={styles.terminal}>
      {
        (history.length > 0) && (
          <div className={styles.history}>
            {
            history.map(
              (historyPiece, index) => (
                <p
                  className={`${styles['history-piece']} ${((historyPiece.type === 'input') ? styles['history-piece-input'] : styles['history-piece-output'])}`}
                  key={`${index}-${historyPiece}`}
                >
                  {historyPiece.content}
                </p>
              ),
            )
          }
          </div>
        )
      }
      <input className={styles.input} ref={inputRef} type="text" value={commandLine} onChange={onInputChange} onKeyDown={onInputKeyDown} />
    </div>
  );
}

Terminal.propTypes = {
  storage: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.shape({}),
  }).isRequired,
  setStorage: PropTypes.func.isRequired,
};
