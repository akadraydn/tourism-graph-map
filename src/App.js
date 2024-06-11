// src/App.js
import React, { useState } from 'react';
import DataLoader from './DataLoader';
import MapComponent from './components/MapComponent';
import GraphComponent from './components/GraphComponent';
import PanelComponent from './components/PanelComponent';

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2022');

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 100, left: 10, zIndex: 1000, width: '200px' }}>
        <GraphComponent selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      </div>
      <MapComponent data={countryData} selectedYear={selectedYear} />
      <PanelComponent groupData={groupData} selectedYear={selectedYear} />
      <DataLoader setCountryData={setCountryData} setGroupData={setGroupData} />
    </div>
  );
};

export default App;
