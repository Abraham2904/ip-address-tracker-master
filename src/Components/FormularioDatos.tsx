import React, { useEffect, useState } from 'react';
import IconButton from '../images/icon-arrow.svg';
interface props{
  MandarDatosPin: (latitud: number, longitud: number) => void;
}
export const FormularioDatos = ({MandarDatosPin}: props) => {
  const [buscar, setBuscar] = useState("8.8.8.8");
  const [ip, setIp] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");
  const [isp, setIsp] = useState<string>("");
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
    MandarDatosPin(Number(datos.location.lat), Number(datos.location.lng));
    }
  useEffect(()=>{ 
     getInfoCiudad(buscar);
  },[buscar]);
  return (
    <div className='relative w-full flex flex-col items-center gap-4 pt-6 px-5.5 md:pt-0'>
      <h1 className='text-white rubik-medium text-2xl my-2'>IP address Tracker</h1>
      <form className='flex justify-center w-full sm:mb-4' onSubmit={(e) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const valor = String(formData.get("obtenerIp") ?? "").trim();
        setBuscar(valor);
      }}>
        <input  type="text"  placeholder='Search for any IP address or domain' name="obtenerIp" className='bg-white p-3 rounded-l-2xl grow max-w-140 cursor-pointer'/>
        <button type="submit">
          <img src={IconButton} className='bg-black p-5 rounded-r-2xl w-12.75 cursor-pointer hover:bg-gray-700'/>
        </button>
      </form>
      <section className='bg-white rounded-2xl flex flex-wrap py-3 w-full max-w-300 justify-center md:justify-between md:pl-6 md:py-4'>
        <div className=' w-full flex flex-col items-center py-4 gap-2 max-w-70 sm:gap-4 md:border-r-2 md:border-r-solid md:border-r-gray-300'>
          <p className='text-gray-400 rubik-medium text-[0.65rem] tracking-widest sm:w-full'>IP ADDRESS</p>
          <h3 className='rubik-medium text-gray-950 text-lg sm:w-full md:text-xl'>{ip}</h3>
        </div>
        <div className=' w-full flex flex-col items-center py-4 gap-2 max-w-70 sm:gap-4 md:border-r-2 md:border-r-solid md:border-r-gray-300'>
          <p className='text-gray-400 rubik-medium text-[0.65rem] tracking-widest sm:w-full'>LOCATION</p>
          <h3 className='rubik-medium text-gray-950 text-lg sm:w-full md:text-xl'>{location}</h3>
        </div>
        <div className=' w-full flex flex-col items-center py-4 gap-2 max-w-70 sm:gap-4 md:border-r-2 md:border-r-solid md:border-r-gray-300'>
          <p className='text-gray-400 rubik-medium text-[0.65rem] tracking-widest sm:w-full'>TIMEZONE</p>
          <h3 className='rubik-medium text-gray-950 text-lg sm:w-full md:text-xl'>{timezone}</h3>
        </div>
        <div className=' w-full flex flex-col items-center py-4 gap-2  sm:gap-4 max-w-70'>
          <p className='text-gray-400 rubik-medium text-[0.65rem] tracking-widest sm:w-full'>ISP</p>
          <h3 className='rubik-medium text-gray-950 text-lg sm:w-full md:text-xl'>{isp}</h3>
        </div>
      </section>
    </div>
  )
}
