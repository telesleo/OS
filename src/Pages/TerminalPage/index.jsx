import React from 'react';
import PropTypes from 'prop-types';
import Terminal from '../../components/Terminal';
import styles from './terminal-page.module.css';

export default function TerminalPage({ storage, setStorage }) {
  return (
    <div id={styles['terminal-page']}><Terminal storage={storage} setStorage={setStorage} /></div>
  );
}

TerminalPage.propTypes = {
  storage: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.shape({}),
  }).isRequired,
  setStorage: PropTypes.func.isRequired,
};
