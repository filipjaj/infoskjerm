import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useCollection } from 'react-firebase-hooks/firestore';
import {useQuery} from '@tanstack/react-query'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../lib/firebase';
import PlaceForm from '../../components/PlaceForm';
import axios from 'axios';
const getWeather = async (lat, lon) => {
  const data = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`);

  return data.data;
}

export default function Home() {
  const {data, isLoading} = useQuery(['weather'], () => getWeather(59.944991, 10.724816));
 if(isLoading) return <div>Loading...</div>
 console.log(data);
  return (
    <div className={styles.container}>

     <h1>Infoskjerm</h1>
     <div className={styles.weatherCard}>
     
      <Image src={`/weathericon/svg/${data.properties.timeseries[0].data.next_1_hours.summary.symbol_code}.svg`} alt="Weather" width={200} height={200} />
      <p>{data.properties.timeseries[0].data.instant.details.air_temperature} °C</p>
      </div>

      </div>
  )
}
