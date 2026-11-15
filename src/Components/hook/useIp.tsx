import React from 'react'
import { useState,useEffect } from 'react';
export const useIp = (buscar:string) => {
  const [ip, setIp] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");
  const [isp, setIsp] = useState<string>("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const getInfoCiudad = async(buscar:string) =>{
    if(!buscar) return; 
    const valor = buscar.trim();
    const esIp =  /^\d+\.\d+\.\d+\.\d+$/.test(valor) || valor.includes(":");
    const parametro = esIp ? "ipAddress": "domain";
    const response = await fetch( `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&${parametro}=${buscar}`);
    const data = await response.json();
    const datos = await data;
    setIp(datos.ip);
    setLocation(`${datos.location.city} , ${datos.location.region} ${datos.location.postalCode}`);
    setTimezone(datos.location.timezone);
    setIsp(datos.isp);
    setLat(Number(datos.location.lat)); 
    setLng(Number(datos.location.lng));
    }
  useEffect(()=>{ 
     getInfoCiudad(buscar);
  },[buscar]);
  return{
    ip,
    location,
    timezone,
    isp,
    lat,
    lng,
  }
}
