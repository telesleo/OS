import React, { useState } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState('');

  const onInputChange = ({ target }) => {
    setCommand(target.value);
  };

  const executeCommand = () => {
    setHistory(
      (prevHistory) => [...prevHistory, command],
    );
    setCommand('');
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
          (historyCommand) => (<p>{historyCommand}</p>),
        )
      }
      <input type="text" value={command} onChange={onInputChange} onKeyDown={onInputKeyDown} />
    </div>
  );
}
