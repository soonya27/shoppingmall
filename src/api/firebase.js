import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase();

export function login() {
    // return signInWithPopup(auth, provider)
    //     .then((result) => {
    //         const user = result.user;
    //         return user;
    //     }).catch(console.error)
    signInWithPopup(auth, provider)
        .catch(console.error)

}
export function logout() {
    // return signOut(auth).then(() => null).catch((error) => {
    // });
    signOut(auth)
        .catch(console.error);
}


export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}


async function adminUser(user) {
    return get(child(ref(database), `admins`)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(user.uid);
            const isAdmin = snapshot.val().includes(user.uid)
            return { ...user, isAdmin }
        }
        return user;

    }).catch((error) => {
        console.error(error);
    });
}


export async function addNewProduct() {
    // const postData = {
    //     author: 'username',
    //     uid: 'uid',
    //     body: 'body',
    //     title: 'title',
    //     starCount: 0,
    //     authorPic: 'picture'
    // };
    // const updates = {};

    // updates['/products/' + 0].push(postData);
    // console.log(updates);
    // return update(ref(database), updates);
}



export async function getProduct() {
    return get(child(ref(database), `products`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = Object.values(snapshot.val())
            // console.log(data);
            return data;
        }
        return [];
    }).catch((error) => {
        console.error(error);
    });
}



