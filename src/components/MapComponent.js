import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3';
import L from 'leaflet';
import PanelComponent from './PanelComponent';

const MapComponent = ({ selectedYear }) => {
  const mapRef = useRef(null);
  const [touristData, setTouristData] = useState([]);
  const [countryLocations, setCountryLocations] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [tooltipData, setTooltipData] = useState(null);
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
      .catch(error => console.error('Error loading country location data:', error));
    
    // group_data.json dosyasını yükle
    fetch('/group_data.json')
      .then(response => response.json())
      .then(data => setGroupData(data))
      .catch(error => console.error('Error loading group data:', error));
  }, []);

  const CustomSVGOverlay = () => {
    const map = useMap();

    useEffect(() => {
      if (touristData.length === 0 || countryLocations.length === 0 || !selectedYear) return;

      // Clear previous svg elements
      d3.select(map.getPanes().overlayPane).selectAll("*").remove();

      const svg = d3.select(map.getPanes().overlayPane).append("svg")
        .attr("width", map.getSize().x)
        .attr("height", map.getSize().y)
        .style("position", "absolute")
        .style("top", "0")
        .style("left", "0")
        .style("pointer-events", "auto");

      const g = svg.append("g").attr("class", "leaflet-zoom-hide");

      const projectPoint = (x, y) => {
        const point = map.latLngToLayerPoint(new L.LatLng(y, x));
        return [point.x, point.y];
      };

      const update = () => {
        // Clear previous svg elements
        g.selectAll("*").remove();

        const bounds = map.getBounds();
        const topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
        const bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

        svg.attr("width", bottomRight.x - topLeft.x)
          .attr("height", bottomRight.y - topLeft.y)
          .style("left", `${topLeft.x}px`)
          .style("top", `${topLeft.y}px`);

        g.attr("transform", `translate(${-topLeft.x}, ${-topLeft.y})`);

        const turkeyCoords = projectPoint(32.8597, 39.9334);

        touristData.forEach(country => {
          const countryLocation = countryLocations.find(loc => loc.Nationality === country.Nationality);
          if (!countryLocation) return;

          const countryCoords = projectPoint(countryLocation.Longitude, countryLocation.Latitude);

          const line = g.append("line")
            .attr("x1", turkeyCoords[0])
            .attr("y1", turkeyCoords[1])
            .attr("x2", countryCoords[0])
            .attr("y2", countryCoords[1])
            .attr("stroke", "orange") // Kenar renklerini turuncu yapar
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0.6)
            .style("cursor", "pointer");

          line.on("mouseover", function() {
            d3.select(this).attr("stroke", "red").attr("stroke-width", 4).attr("stroke-opacity", 1);
          }).on("mouseout", function() {
            d3.select(this).attr("stroke", "orange").attr("stroke-width", 2).attr("stroke-opacity", 0.6);
          }).on("click", function(event) {
            setTooltipData({
              country: country.Nationality,
              tourists: country[selectedYear],
              x: event.pageX,
              y: event.pageY
            });
          });

          g.append("circle")
            .attr("cx", countryCoords[0])
            .attr("cy", countryCoords[1])
            .attr("r", 5)
            .attr("fill", "blue")
            .attr("fill-opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .on("mouseover", function() {
              d3.select(this).attr("r", 7).attr("fill-opacity", 1);
            }).on("mouseout", function() {
              d3.select(this).attr("r", 5).attr("fill-opacity", 0.7);
            });

          g.append("circle")
            .attr("cx", turkeyCoords[0])
            .attr("cy", turkeyCoords[1])
            .attr("r", 7)
            .attr("fill", "red")
            .attr("fill-opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);
        });
      };

      map.on("zoomend", update);
      map.on("moveend", update);

      update();

    }, [map, touristData, countryLocations, selectedYear]);

    return null;
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <MapContainer
        center={[39.9334, 32.8597]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        worldCopyJump={false}
        maxBounds={[[85, -180], [-85, 180]]}
        maxBoundsViscosity={1.0}
        minZoom={2}
        maxZoom={6}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <CustomSVGOverlay />
      </MapContainer>
      {tooltipData && (
        <div
          style={{
            position: 'absolute',
            top: tooltipData.y,
            left: tooltipData.x,
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            pointerEvents: 'auto',
            transform: 'translate(-50%, -100%)',
            whiteSpace: 'nowrap',
            zIndex: 1000
          }}
        >
          <button
            onClick={() => setTooltipData(null)}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              background: 'transparent',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            &times;
          </button>
          <strong>{tooltipData.country}</strong>: {tooltipData.tourists} tourists
        </div>
      )}
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

export default MapComponent;
