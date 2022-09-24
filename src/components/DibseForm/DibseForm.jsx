import Select from 'react-select'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection} from "firebase/firestore"; 
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import {db} from '../../lib/firebase';
import styles from "./dibseForm.module.scss";
import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { format, compareAsc } from 'date-fns'



import  useInput  from '../../hooks/useInput'
const DibseForm = () => {
    const { user } = useContext(UserContext)
 
    const placesRef = collection(db, 'places');
    const person = useInput()
    const date = useInput(format(new Date(), "yyyy-MM-dd"))
    const place = useInput()
    const score = useInput(1)
    const [values, loading, error, snapshot] = useCollectionData(placesRef);
    
    const dibseHandler = async () => {
        const dibseObject = {
            name: person.value,
            score: personality(),
            place: place.value,
            user: user.uid,
            dibsedBy: user.displayName,
            date: date.value,
            createdAt: serverTimestamp()
         }
         const addPerson = await setDoc(doc(db, "people", person.value),
        dibseObject)
         const personCollectionRef = collection(db,"places", place.value, "people");
         const personRef = doc(personCollectionRef, person.value);
         const addToPlace = await setDoc(personRef,dibseObject
         )



         
       

       
    }

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }
    const options = values?.map((place) => {
        return {value: place.name, label: place.name}
    })

    const personality = () => {
        if(score.value == 1){
            return "A"
        }
        if(score.value == 2){
            return "B"
        }
        if(score.value == 3){
            return "C"
        }
        if(score.value == 4){
            return "D"
        }
        if(score.value == 5){
            return "E"
        }

    }
   
   

    return(
        <div className={styles.form}>
            <h1>DibseForm</h1>
            <input {...person} />
            <Select options={options}  onChange={(e) => place.setValue(e.value)}
          value={options.find((option) => option.value === place.value)}/>
            <input type="date" placeholder="Dato" {...date} />
            <p>{personality()}</p>
            <input type="range" min={1} max={5} placeholder="Personlighet" {...score}/>
            <button onClick={dibseHandler}>Legg til</button>
            <p>{user.displayName}</p>
        </div>
    )
    
}

export default DibseForm;