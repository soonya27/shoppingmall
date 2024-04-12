import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, child, update, set } from "firebase/database";
import { v4 as uuid } from 'uuid';
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


export async function addNewProduct(product, { defaultImageUrl, hoverImageUrl }) {
    const id = uuid();
    set(ref(database, 'products/' + id), {
        ...product,
        id,
        price: product.price,
        defaultImageUrl,
        hoverImageUrl,
        options: product.options.split(','),
    });
}

export async function addCartsByUser({ id, size, itemNum, user, product }) {
    set(ref(database, 'carts/' + user + '/products/' + id), {
        product,
        id,
        size,
        itemNum
    });
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



export async function getCartProduct(uid) {
    return get(child(ref(database), `carts/${uid}/products`)).then((snapshot) => {
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        }
        return [];
    }).catch((error) => {
        console.error(error);
    });
}




