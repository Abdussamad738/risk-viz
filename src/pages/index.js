import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './Mapbox'
import "@/pages/_app";
import Link from 'next/link'

//   const [markers, setMarkers] = useState<Marker[]>([]);

export default function Home(){
  return(
    <div>
    <ul>
    <li>
      <Link href="/">Home</Link>    
    </li>
    <li>
      <Link href="/Mapbox">Map</Link>
    </li>
    </ul>
    {/* {mapContainer.current && <Map />} */}
    </div>
    
  )

}