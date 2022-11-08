import React, { createContext, useEffect, useState, } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const googleProviderLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }
    const singIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsbscribe = onAuthStateChanged(auth, (carentUser) => {
            setUser(carentUser);
            setLoading(false);
        });
        return () => {
            unsbscribe();
        }
    }, []);


    const authinfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        googleProviderLogin,
        singIn,
        logout
    }
    return (

        < AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;