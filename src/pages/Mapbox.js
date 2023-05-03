import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Data } from '@/utils/Data';
import ReactMapboxGl, { Map, Layer, Feature } from 'react-map-gl';
import * as XLSX from 'xlsx';
import { stringify } from 'querystring';


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
// export async function getStaticProps() {
//   const data=Data();
//   return {
//     props: {
//       filteredData:data
//     }, // will be passed to the page component as props
//   }
// }

export default function Mapbox() {
  const ref = useRef(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [selectedYear, setSelectedYear] = useState(null);
  const excelData = Data();
  const center = [lng, lat];

  const handleYearSelect = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const [filteredData, setFilteredData] = useState([]);
  // const { loading } = Data();

  // useEffect(() => {
  //   if (!loading) {
  //     setFilteredData(Data());
  //   }
  // }, [loading]);

  // console.log(filteredData);
  // console.log("filtered data in mapbox :"+JSON.stringify(filteredData));

  useEffect(() => {
    if (excelData) {
      console.log("you have excel data: "+JSON.stringify(excelData));
      setFilteredData(excelData.filter((data) => data.Year === 2050));
    }
  }, [excelData]);

  useEffect(() => {
    if (ref.current && !map) {
      const map = new mapboxgl.Map({
        container: ref.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 1,
      });
      setMap(map);
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      map.on('move', () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });
    }
  }, [map]);
  console.log("This is just before the mapbox.js return &filteredData is :"+JSON.stringify(filteredData));


  return (
    <div>
      <label htmlFor="year-select">Select year:</label>
      <select id="year-select" onChange={handleYearSelect}>
        <option value="All">All</option>
        <option value="2030">2030</option>
        <option value="2040">2040</option>
        <option value="2050">2050</option>
        <option value="2060">2060</option>
        <option value="2070">2070</option>
      </select>
      {filteredData && filteredData.length > 0 ? (
        <div ref={ref} className="map-container">
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: '100vh',
              width: '100vw',
            }}
            center={center}
            zoom={zoom}
          >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
              {filteredData.map((location) => (
                <Feature
                  key={location.id}
                  coordinates={[location.Long, location.Lat]}
                  onClick={() => handleMarkerClick(location)}
                />
              ))}
            </Layer>
          </Map>
        </div>
      ) : (
        <p>Loading Data</p>
      )}
    </div>
  )};
