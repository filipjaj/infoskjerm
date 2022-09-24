import { auth } from '@/lib/firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const SignIn = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <button onClick={() => signInWithGoogle()}>Sign In</button>
    )
}

export default SignIn;