import React, { useState } from 'react';
import Terminal from './components/Terminal';

function App() {
  const [storage, setStorage] = useState({
    type: 'directory',
    content: {
      desktop: {
        type: 'directory',
        content: {},
      },
      newFolder: {
        type: 'directory',
        content: {},
      },
    },
  });

  return (
    <Terminal storage={storage} setStorage={setStorage} />
  );
}

export default App;
