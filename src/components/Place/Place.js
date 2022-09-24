import { useCollectionData } from "react-firebase-hooks/firestore"
import { db } from "@/lib/firebase";
import { collection } from "firebase/firestore";
import styles from "./place.module.scss"
const Place = ({place}) =>{
    const placesRef = collection(db, 'places', place, "people");
    const [value, loading, error] = useCollectionData(placesRef);
    if(loading) return <div>Loading...</div>
    console.log(place, value);
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>{place}</h1>
        <div>
            {value.map((person, index) => {
                return (
                    <div key={index} className={styles.card}>
                        <p>{person.name}</p>
                        <p className={styles.score}>Rating: {person.score}</p>
                        <p className={styles.dibsedBy}>{person.dibsedBy}</p>
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default Place;