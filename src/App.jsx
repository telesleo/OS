import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Pages/Main';
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
    <Routes>
      <Route path="/" element={<Main storage={storage} setStorage={setStorage} />} />
      <Route path="/terminal" element={<Terminal storage={storage} setStorage={setStorage} />} />
    </Routes>
  );
}

export default App;
