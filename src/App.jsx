import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Pages/Main';
import TerminalPage from './Pages/TerminalPage';
import './App.css';

function App() {
  const [storage, setStorage] = useState({
    type: 'directory',
    content: {
      desktop: {
        type: 'directory',
        content: {
          'text.txt': {
            type: 'file',
            content: 'content',
          },
        },
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
      <Route path="/terminal" element={<TerminalPage storage={storage} setStorage={setStorage} />} />
    </Routes>
  );
}

export default App;
