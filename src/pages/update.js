import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useCollection } from 'react-firebase-hooks/firestore';

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../lib/firebase';
import PlaceForm from '../../components/PlaceForm';

export default function Update() {
 
  return (
    <div className={styles.container}>

      <PlaceForm />

      </div>
  )
}
