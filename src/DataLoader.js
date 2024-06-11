// src/DataLoader.js
import { useEffect } from 'react';

const DataLoader = ({ setCountryData, setGroupData }) => {
  useEffect(() => {
    fetch('/country_data.json')
      .then(response => response.json())
      .then(data => setCountryData(data))
      .catch(error => console.error('Error loading country data:', error));

    fetch('/group_data.json')
      .then(response => response.json())
      .then(data => setGroupData(data))
      .catch(error => console.error('Error loading group data:', error));
  }, [setCountryData, setGroupData]);

  return null;
};

export default DataLoader;
