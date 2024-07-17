import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import PanelComponent from './PanelComponent';

const GlobeMapComponent = ({ selectedYear }) => {
  const [touristData, setTouristData] = useState([]);
  const [countryLocations, setCountryLocations] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    // country_data.json dosyasını yükle
    fetch('/country_data.json')
      .then(response => response.json())
      .then(data => setTouristData(data))
      .catch(error => console.error('Error loading country data:', error));

    // country_location.json dosyasını yükle
    fetch('/country_location.json')
      .then(response => response.json())
      .then(data => setCountryLocations(data))
      .catch(error => console.error('Error loading country locations data:', error));

    // group_data.json dosyasını yükle
    fetch('/group_data.json')
      .then(response => response.json())
      .then(data => setGroupData(data))
      .catch(error => console.error('Error loading group data:', error));
  }, []);

  const getMaxTourists = () => {
    return Math.max(...touristData.map(d => d[selectedYear] || 0));
  };

  const maxTourists = getMaxTourists();

  const arcsData = touristData.map(country => {
    const countryLocation = countryLocations.find(loc => loc.Nationality === country.Nationality);
    if (!countryLocation) return null;

    const tourists = country[selectedYear] || 0;
    const altitude = tourists / maxTourists * 0.5; // Maksimum yükseklik 

    return {
      startLat: 39.9334,
      startLng: 32.8597,
      endLat: countryLocation.Latitude,
      endLng: countryLocation.Longitude,
      color: ['orange', 'red'],
      strokeWidth: 1, //Kenar uzaklığı
      altitude: altitude,
      name: country.Nationality
    };
  }).filter(Boolean);

  const labelsData = countryLocations.map(countryLocation => ({
    lat: countryLocation.Latitude,
    lng: countryLocation.Longitude,
    label: countryLocation.Nationality
  }));

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        arcsData={arcsData}
        arcColor={d => d.color}
        arcStroke={d => d.strokeWidth}
        arcAltitude={d => Math.max(0.3, d.altitude)} 
        arcsTransitionDuration={2}
        arcDashLength={2}
        arcDashGap={2}
        arcDashInitialGap={() => Math.random() * 2}
        arcDashAnimateTime={2000} 
        arcsOpacity={0.8}
        labelsData={labelsData}
        labelLat={d => d.lat}
        labelLng={d => d.lng}
        labelText={d => d.label}
        labelSize={1.5}
        labelColor={() => 'rgba(255, 165, 0, 0.75)'}
        labelResolution={2}
      />
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          padding: '5px 10px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        {isPanelOpen ? 'Hide' : 'Show'} Group Data
      </button>
      <PanelComponent
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        groupData={groupData}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default GlobeMapComponent;
