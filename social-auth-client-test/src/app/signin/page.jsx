'use client';

import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { socialAuthApp } from '@/config/firebase';
import { backendUrl } from '@/config/config';
import axios from 'axios';
import Form from '@/components/From';

const SignIn = () => {
    const router = useRouter();
    const auth = getAuth(socialAuthApp);

    // Helper function for social login
    const handleSocialLogin = async (provider, socialType) => {
        try {
            provider.setCustomParameters({ prompt: 'select_account' });
            const result = await signInWithPopup(auth, provider);
            const userUid = result.user.providerData[0].uid;
            console.log(`${socialType} user UID:`, userUid);

            const payload = { uid: userUid, socialType };
            const response = await axios.post(`${backendUrl}/auth/social-auth`, payload);
            console.log('API Response:', response);
        } catch (error) {
            console.error(`Error during ${socialType} login:`, error.message);
        }
    };

    // Handlers for Google and Facebook login
    const handleGoogleLogin = () => {
        const googleProvider = new GoogleAuthProvider();
        handleSocialLogin(googleProvider, 'google');
    };

    const handleFacebookLogin = () => {
        const facebookProvider = new FacebookAuthProvider();
        handleSocialLogin(facebookProvider, 'facebook');
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white text-yellow-400">
            <h1>Signup or Signin</h1>
            <div className="flex restore-box h-10 justify-center items-center">
                <div onClick={handleGoogleLogin} className="border-right pr-3 cursor-pointer">
                    <img src="/images/google.png" className="store-img" alt="Google Login" />
                </div>
                <div onClick={handleFacebookLogin} className="pl-3 cursor-pointer size-8 overflow-hidden">
                    <img 
                        src="https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc" 
                        className="store-img" 
                        alt="Facebook Login" 
                    />
                </div>
            </div>
            <Form />
        </div>
    );
};

export default SignIn;
