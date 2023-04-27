import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';
const Login = () => {
    const [userProfile, setUserProfile] = useState(null)
    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider()
    const gitHubProvider = new GithubAuthProvider()

    



    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                setUserProfile(user)
            })
            .catch(error => {
                console.log('error', error.massage)
            })
    }


    const handleGoogleSignOut = () => {

        signOut(auth)
            .then(result => {
                setUserProfile(null)
            })
            .catch(error => {
                console.log(error)
            })
    }



    const githubSignIn = () => {
        signInWithPopup(auth,gitHubProvider)
        .then(result => {
            const gitUser = result.user;
            console.log(gitUser)
            setUserProfile(gitUser)
        })
        .catch(error => {
            console.log(error)
        })
    }






    return (
        <div>
            {userProfile ?
                <button onClick={handleGoogleSignOut}>Sign Out</button> :
                <div>
                     <button onClick={handleGoogleSignIn}>Google Login</button>
                     <button onClick={githubSignIn}>GitHub Login</button>
                </div>
               }
            {userProfile && <div>
                <h3>User : {userProfile.displayName
                }</h3>
                <p>Email : {userProfile.email}</p>
                <img src={userProfile.photoURL
                } alt="" />
            </div>}
        </div>
    );
};

export default Login;