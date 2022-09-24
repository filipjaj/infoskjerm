import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Entur from '@/components/Entur/Entur'
import {useQuery} from '@tanstack/react-query'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '@/lib/firebase'
import { collection} from "firebase/firestore";

import axios from 'axios';
import Place from '@/components/Place/Place'
const getWeather = async (lat, lon) => {
  const data = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`);

  return data.data;
}

export default function Home() {
  const {data, isLoading} = useQuery(['weather'], () => getWeather(59.944991, 10.724816), {
    // Refetch the data every second
    refetchInterval: 60000,
  });
  const placesRef = collection(db, 'places');
  const [value, loading, error] = useCollectionData(placesRef);
  const usersRef = collection(db, 'users', "14I4uDdvIFgWZTyDgtMz89M0ht63", "calendar");
  const [usersValue, usersLoading, usersError] = useCollectionData(usersRef);

 if(isLoading || loading || usersLoading) return <div>Loading...</div>
console.log("users",usersValue);
  return (
    <div className={styles.container}>

     
     <div className={styles.weatherCard}>
     
      <Image src={`/weathericon/svg/${data.properties.timeseries[0].data.next_1_hours.summary.symbol_code}.svg`} alt="Weather" width={200} height={200} />
      <p>{data.properties.timeseries[0].data.instant.details.air_temperature} °C</p>
      </div>

      <Entur />

      <div className={styles.places}>

        {value.map((place, index) => {
          return (
            <Place place={place.name} key={index} />
          )
        })}

      </div>


      <em className={styles.disclaimer}>*Filip har dibset alle søstrene til alle i kollektivet på samtlige arenaer</em>
      </div>
  )
}
