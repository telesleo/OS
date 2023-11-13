import React, { useState } from 'react';

export default function Terminal() {
  const [commandHistory, setCommandHistory] = useState([]);
  const [command, setCommand] = useState('');

  const onInputChange = ({ target }) => {
    setCommand(target.value);
  };

  const executeCommand = () => {
    setCommandHistory((prevCommandHistory) => [...prevCommandHistory, command]);
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
        commandHistory.map((historyCommand) => <p>{historyCommand}</p>)
      }
      <input type="text" value={command} onChange={onInputChange} onKeyDown={onInputKeyDown} />
    </div>
  );
}
