import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './Mapbox'
import "@/pages/_app";
import Link from 'next/link'
import { useRef,useState,useEffect } from "react";
import DataTable from './DataTable';
import LineGraph from './LineGraph';
//   const [markers, setMarkers] = useState<Marker[]>([]);

// import { jsonData } from './api/data';


export default function Home(){
  // const data =  fetch('http://localhost:3000/api/data');
  
  const [data, setData] = useState(null);
  console.log("start of home page")

  useEffect(() => {
    async function fetchData() {
      // const response = await fetch('https://risk-viz-psi.vercel.app/api/data');
      const response= await fetch ('http://localhost:3000/api/data')
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  return(
    <div>
    <ul>
    <li>
      <Link href="/">Risk Mapping website</Link>    
    </li>
    <div>
      <Map data={data}/>
      </div>
      <div>
        <DataTable tabledata={data}/>
      </div>
      <div>
        <LineGraph filteredData={data}/>
      </div>
    </ul>
    {/* {mapContainer.current && <Map />} */}
    </div>
    
  )

}