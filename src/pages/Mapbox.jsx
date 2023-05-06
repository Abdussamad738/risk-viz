import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import {render} from 'react-dom';
import  MapGL,{ Marker, Popup } from 'react-map-gl';
import { stringify } from 'querystring';
import 'mapbox-gl/dist/mapbox-gl.css'
import {MarkerSVG} from '@/utils/marker.svg';
import Image from 'next/image';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// export async function getServerSideProps(context) {
//   const data = await fetch('http://localhost:3000/api/data');
//   console.log("Data after fetching in Mapbox: " + JSON.stringify(data));
  
//   return {
//     props: {
//       data,
//     },
//   };
// }
// function CustomMarker(props) {
//   const { latitude, longitude, offsetLeft, offsetTop, text, description, color } = props;
//   return (
//     <Marker latitude={latitude} longitude={longitude} offsetLeft={offsetLeft} offsetTop={offsetTop}>
//       <div style={{ color, cursor: 'pointer' }} onClick={() => alert(`${description}: ${latitude}, ${longitude}`)}>
//       <MarkerSVG />
//       </div>
//     </Marker>
//   );
// }



export default function Mapbox({data}) {
  // console.log(JSON.stringify("data at first of mapbox:"));

  const mapContainer = useRef(null);

  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(5);
  const [selectedYear, setSelectedYear] = useState(null);

  // const excelData = Data();
  const center = [lng, lat];
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleYearSelect = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };
  const [filteredData,setFilteredData] =useState(null);
  const [viewport, setViewport] = useState({
    latitude: 51.505,
    longitude: -0.09,
    zoom: 1
  });
  const [isData,setIsData]=useState(false);
  const mapGLContainerRef = useRef(null);
  const markers =[];
  const markersLayerRef = useRef([]);

  // const filteredData = excelData ? excelData.filter(data => {
  //   return selectedYear ? data.Year === selectedYear : true || data.Year === 'All';
  // }) : [];

  const [selectedLocation, setSelectedLocation] = useState(null);
  const getColor = (riskRating) => {
    // console.log("getColor is called")
    if (riskRating <= 0.39) {
      return '#16A34A';
    } else if (riskRating <= 0.60) {
      return '#FFD52B';
    } else {
      return '#DE3831';
    }
  };
  useEffect(() => {
    //  if(selectedYear=='All'){
    //   setSelectedYear(2050);
    //  } 
      if (data) {
        setFilteredData(data.filter((each) => each.Year === 2050));
        
      }
    }, [data]);
  useEffect(() => {
  //  if(selectedYear=='All'){
  //   setSelectedYear(2050);
  //  } 
    if (data) {
      setFilteredData(data.filter((each) => each.Year === selectedYear));
      
    }
  }, [data,selectedYear]);

 //#############important hook
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(map);

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    
  // console.log("This is just before the mapbox.js return &filteredData is :");
  return () => map.remove();
}, []);

useEffect(() => {
  if (filteredData && filteredData.length>0 && map) {
    const bounds = new mapboxgl.LngLatBounds();
    // console.log("inside useeffect long and lat"+JSON.stringify(filteredData));
    filteredData.forEach((location) => {
      // console.log("inside useeffect long and lat"+JSON.stringify([location.Long, location.Lat]));
      bounds.extend([location.Long, location.Lat]);
      const marker = new mapboxgl.Marker({
        color: getColor(location['Risk Rating']),
      })
        .setLngLat([location.Long, location.Lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3>${location['Asset Name']}</h3><p>${location['Business Category']}</p>`
          )
        )
        .addTo(map);
      markersLayerRef.current.push(marker);
    });
    // console.log(JSON.stringify(bounds));
    map.fitBounds(bounds, { padding: 50 });
  }
}, [filteredData, map]);






 
  return (
    <div style={{backgroundColor:'#f2f2f2'}}>
      
      
      <label htmlFor="year-select">Select a year to check the Risk Markers:</label>
      <select id="year-select" onChange={handleYearSelect}>
        {/* <option value="All">All</option> */}
        <option value="2030">2030</option>
        <option value="2040">2040</option>
        <option value="2050">2050</option>
        <option value="2060">2060</option>
        <option value="2070">2070</option>
      </select>

      <div ref={mapContainer} className="map-container" style={{height: "500px"}}>
  
      </div>
      </div>
      );
 
};