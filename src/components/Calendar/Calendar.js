import useInput from "@/hooks/useInput";
import {useContext} from "react"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserContext } from "@/lib/context";
import styles from './calendar.module.scss'

const Calendar = () => {
    const { user } = useContext(UserContext)
    const collectionRef = collection(db, 'users', user.uid, "calendar");
    const [values, loading, error, snapshot] = useCollectionDataOnce(collectionRef);
    const monday = useInput()
    const tuesday = useInput()
    const wednesday = useInput()
    const thursday = useInput()
    const friday = useInput()
    const saturday = useInput()
    const sunday = useInput()

    if(loading) return <div>Loading...</div>
    console.log(values);


    const clickHandler = async () => {
         const updateMonday = await setDoc(doc(collectionRef, "monday"), {
            activity: monday.value,
            updatedAt: serverTimestamp()
         })
            const updateTuesday = await setDoc(doc(collectionRef, "tuesday"), {
                activity: tuesday.value,
                updatedAt: serverTimestamp()
            })
            const updateWednesday = await setDoc(doc(collectionRef, "wednesday"), {
                activity: wednesday.value,
                updatedAt: serverTimestamp()
            })
            const updateThursday = await setDoc(doc(collectionRef, "thursday"), {
                activity: thursday.value,
                updatedAt: serverTimestamp()
            })
            const updateFriday = await setDoc(doc(collectionRef, "friday"), {
                activity: friday.value,
                updatedAt: serverTimestamp()
            })
            const updateSaturday = await setDoc(doc(collectionRef, "saturday"), {
                activity: saturday.value,
                updatedAt: serverTimestamp()
            })
            const updateSunday = await setDoc(doc(collectionRef, "sunday"), {
                activity: sunday.value,
                updatedAt: serverTimestamp()
            })






         
       

       
    }


    return (
        <div className={styles.form}>
        <input {...monday}/>
        <input {...tuesday}/>
        <input {...wednesday}/>
        <input {...thursday}/>
        <input {...friday}/>
        <input {...saturday}/>
        <input {...sunday}/>
        <button onClick={clickHandler}>Update</button>
        </div>
    )
}

export default Calendar;
