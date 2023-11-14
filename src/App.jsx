import React, { useState } from 'react';
import Terminal from './components/Terminal';

function App() {
  const [storage, setStorage] = useState({
    desktop: {
      type: 'directory',
      content: {},
    },
  });

  return (
    <Terminal storage={storage} setStorage={setStorage} />
  );
}

export default App;
