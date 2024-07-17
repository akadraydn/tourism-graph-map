import React, { useState } from 'react';
import DataLoader from './DataLoader';
import GlobeMapComponent from './components/GlobeMapComponent';
import FlatMapComponent from './components/FlatMapComponent';
import GraphComponent from './components/GraphComponent';
import PanelComponent from './components/PanelComponent';

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2022');
  const [isGlobeMode, setIsGlobeMode] = useState(false);

  const toggleMode = () => {
    setIsGlobeMode(!isGlobeMode);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 80, left: 10, zIndex: 1000, width: '200px' }}>
        <GraphComponent selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      </div>
      <button
        onClick={toggleMode}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: '10px 20px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        {isGlobeMode ? 'Flat Map' : 'Globe Map'}
      </button>
      {isGlobeMode ? (
        <GlobeMapComponent data={countryData} selectedYear={selectedYear} />
      ) : (
        <FlatMapComponent data={countryData} selectedYear={selectedYear} />
      )}
      <PanelComponent groupData={groupData} selectedYear={selectedYear} />
      <DataLoader setCountryData={setCountryData} setGroupData={setGroupData} />
    </div>
  );
};

export default App;
