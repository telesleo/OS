import React from 'react';
import PropTypes from 'prop-types';
import WindowButton from '../WindowButton';

export default function WindowBar({ windows }) {
  return (
    <div>
      {
        windows.map((window, index) => (
          <WindowButton
            key={`${index}_${window.app}_${window.path}`}
            window={window}
          />
        ))
      }
    </div>
  );
}

WindowBar.propTypes = {
  windows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
