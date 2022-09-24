
import DibseForm from '@/components/DibseForm/DibseForm';
import PlaceForm from '../components/PlaceForm';
import Calendar from '@/components/Calendar/Calendar';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import SignIn from '@/components/SignIn/SignIn';


export default function Update() {
  const { user, username } = useContext(UserContext)
  if(!user) return <SignIn/>
  return (
   
<>
      <PlaceForm />
      <DibseForm />
      <Calendar />
      </>

    
  )
}
