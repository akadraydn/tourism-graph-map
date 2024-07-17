// src/components/GraphComponent.js
import React from 'react';
import Select from 'react-select';

const GraphComponent = ({ selectedYear, setSelectedYear }) => {
  
  const options = Array.from({ length: 2023 - 2000 + 1 }, (_, i) => ({
    value: (2000 + i).toString(),
    label: (2000 + i).toString()
  }));

  
  const customStyles = {
    control: (base) => ({
      ...base,
      minWidth: 120, 
      fontSize: 12,  
    }),
    menu: (base) => ({
      ...base,
      fontSize: 12,  
    }),
  };

  return (
    <Select
      styles={customStyles} 
      options={options} 
      defaultValue={options.find(option => option.value === selectedYear)} // Varsayılan değer olarak seçilen yılı kullan
      onChange={selectedOption => setSelectedYear(selectedOption.value)} // Seçim yapıldığında yılı güncelle
    />
  );
};

export default GraphComponent; 
