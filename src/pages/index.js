import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './Mapbox'
import "@/pages/_app";
import Link from 'next/link'
import { useRef,useState,useEffect } from "react";
//   const [markers, setMarkers] = useState<Marker[]>([]);

export default function Home(){
  // const data =  fetch('http://localhost:3000/api/data');
  
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  return(
    <div>
    <ul>
    <li>
      <Link href="/">Home</Link>    
    </li>
    <div>
      <Map data={data}/>
      </div>
    </ul>
    {/* {mapContainer.current && <Map />} */}
    </div>
    
  )

}