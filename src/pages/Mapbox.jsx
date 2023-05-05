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
  console.log(JSON.stringify("data at first of mapbox:"+JSON.stringify(data)));

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

  useEffect(() => {
    if (data) {
      setFilteredData(data.filter((each) => each.Year === 2050));
      
    }
  }, [data]);

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
    
  console.log("This is just before the mapbox.js return &filteredData is :");
  return () => map.remove();
}, []);

  useEffect(() => {
    // console.log("start of useeffect having dep with map and filtered data"+JSON.stringify(map))
    if (filteredData && map) {
      console.log("u have both the filtered data and map");
    // fit bounds to the locations
    // const bounds = new mapboxgl.LngLatBounds();
    // filteredData.map((location) => {
    // bounds.extend([location.Long, location.Lat]);
    // });
    // map.fitBounds(bounds, { padding: 50 });
    // console.log("filtered data is :"+JSON.stringify(filteredData));
    
      // create markers for each location
      filteredData.forEach((location) => {
        console.log("marker forEach loop start");
        const markerEl = document.createElement('div');
        markerEl.className = 'marker';
        markerEl.style.background = getColor(location);
        // console.log("map is"+ map.Lat);
        
       const markerInstance= new mapboxgl.Marker({
          element: markerEl,
          anchor: 'bottom'
        })
          .setLngLat([location.Long, location.Lat])
          .addTo(map)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${location.Asset_Name}</h3><p>${location.Business_Category}</p>`)
          )
          .on('click', () => setSelectedLocation(location));
          
          markers.push(markerInstance);
          console.log("marker instance:"+markerInstance);
          
          
          return markerInstance;
      });

      const markersLayer = markers.map((marker) => {
        const markerOptions = {
          title: marker.assetName,
        };
        const markerIcon = document.createElement('div');
        markerIcon.className = 'risk-marker';
        markerIcon.innerHTML = marker.riskRating ? marker.riskRating.toString() : '';

    });
    markersLayerRef.current = markersLayer;
// clear existing markers
// markersLayer.forEach((marker) => marker.remove());
      
// add new markers
markers.forEach((marker, index) => {
  
  const markerLayer = markersLayerRef.current[index];
  marker.addTo(map);

  })
}

    }, [filteredData]);



    // useEffect(()=>{
      function getColor(location) {
        const colorScale = ['#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8'];
        const index = Math.floor(location['Risk_Rating'] / 20);
        return colorScale[index];
        }
 
  return (
    <div >
      
      
      <label htmlFor="year-select">Select year:</label>
      <select id="year-select" onChange={handleYearSelect}>
        <option value="All">All</option>
        <option value="2030">2030</option>
        <option value="2040">2040</option>
        <option value="2050">2050</option>
        <option value="2060">2060</option>
        <option value="2070">2070</option>
      </select>

      <div ref={mapContainer} className="map-container" style={{height: "400px"}}>
  
      </div>
      </div>
      );
 
};