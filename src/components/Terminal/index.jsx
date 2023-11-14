import React, { useState } from 'react';
import PropTypes from 'prop-types';
import commands from '../../utils/commands';

export default function Terminal({ storage, setStorage }) {
  const [path, setPath] = useState('/');
  const [history, setHistory] = useState([]);
  const [commandLine, setCommandLine] = useState('');

  const onInputChange = ({ target }) => {
    setCommandLine(target.value);
  };

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
      const output = commands[command](parameters, path, setPath, storage, setStorage);
      if (output) {
        setHistory(
          (prevHistory) => [...prevHistory, { type: 'output', content: output }],
        );
      }
    }

    setCommandLine('');
  };

  const onInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      executeCommand();
    }
  };

  return (
    <div>
      {
        history.map(
          (historyPiece, index) => (<p key={`${index}-${historyPiece}`}>{historyPiece.content}</p>),
        )
      }
      <input type="text" value={commandLine} onChange={onInputChange} onKeyDown={onInputKeyDown} />
    </div>
  );
}

Terminal.propTypes = {
  storage: PropTypes.objectOf(PropTypes.shape({})).isRequired,
  setStorage: PropTypes.func.isRequired,
};
