import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../src/lib/firebase';
const PlaceForm = () => {
   const [placeName, setPlacename] = useState('');
    const [placeHoliness, setPlaceHoliness] = useState('');
    const addPlace = async ({name,holiness }) =>{ await setDoc(doc(db, "places", name), {
        name,
        holiness
       });
       setPlaceHoliness('');
        setPlacename('');
    }

       return (
        <div>
        <input type="text" placeholder="name" value={placeName} onChange={(e) => setPlacename(e.target.value)}/>
        <input type="text" placeholder="holiness" value={placeHoliness} onChange={(e) => setPlaceHoliness(e.target.value)}/>
        <button onClick={() => addPlace({name: placeName, holiness: placeHoliness})}>Add</button>
      </div>
       )

}

export default PlaceForm;