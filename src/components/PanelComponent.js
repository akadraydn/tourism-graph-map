import React from 'react';

const PanelComponent = ({ isOpen, onClose, groupData, selectedYear }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '10px',
        borderRadius: '5px',
        maxHeight: '300px',
        overflowY: 'scroll',
        zIndex: 1000
      }}
    >
      <button onClick={onClose} style={{ marginBottom: '10px', cursor: 'pointer' }}>Close</button>
      <h4>Group Data for {selectedYear}</h4>
      <ul>
        {groupData.map((group, index) => (
          <li key={index}>
            {group.Nationality}: {group[selectedYear]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelComponent;
