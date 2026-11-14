import React, { useEffect, useState } from 'react';
import bgHeaderMobile from '../images/pattern-bg-mobile.png';
import bgHeaderDesktop from '../images/pattern-bg-desktop.png';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from '../images/icon-location.svg';
import 'leaflet/dist/leaflet.css'
import { FormularioDatos } from './FormularioDatos';
export const ComponentePrincipal = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [cambiarImg, setCambiarImg] = useState(window.innerWidth);
  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [46, 56],
    iconAnchor: [23, 56],
  })
  const handlePin = (latitud:number, longitud:number) =>{
    setLat(latitud);
    setLng(longitud);
    console.log(`Probando: ${lat}`)
  }
  useEffect(()=>{
    const handleResize = () =>  setCambiarImg(window.innerWidth);
    window.addEventListener("resize", handleResize);    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className=' flex flex-col h-auto' >
        <header className='h-62 w-full relative z-10'>
          /*Falta configurar esto*/
            <img src={ cambiarImg >= 1024 ? bgHeaderDesktop : bgHeaderMobile} className='w-full h-full object-cover absolute inset-0'/>
            <FormularioDatos MandarDatosPin={handlePin}/>
        </header>
        <main className='grow h-225 md:h-150'>
          <MapContainer className='w-full relative z-0 h-full' zoom={13} center={[lat,lng]} zoomControl={false}>
          <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
         <Marker position={[lat, lng]} icon={customIcon} />
         </MapContainer>
        </main>
    </div>
  )
}
