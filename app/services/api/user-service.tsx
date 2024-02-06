import { addDoc, collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore";

import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { DataFormMyType, User, UserToRegister } from "../../utils/types";

const auth = FIREBASE_AUTH
const db = FIRESTORE_DB

export function getUser(id: string) {

}
export async function updateUser(user: UserToRegister) {
    console.log('====================================');
    console.log('UPDATE USER');
    console.log(user);
    console.log('====================================');
    try {
        /* const ref = doc(FIRESTORE_DB, `users/nqSxJEWAYJ0GENrypvjZ`) */
        const ref = doc(FIRESTORE_DB, `users/${user.uid}`)
        await updateDoc(ref, { ...user })
    } catch (error: any) {
        console.log('====================================');
        console.log('error: ', { error, message: error.message });
        console.log('====================================');
        throw new Error('Error trying to singin')
    }
}
export function deleteUser(id: string) {

}
export async function login(email: string, password: string) {
    try {
        const userRef = collection(FIRESTORE_DB, 'users')
        const messagesCollectionRef = query(userRef, where("email", "==", email));
        const data = await getDocs(messagesCollectionRef);
        const exist = data.docs.filter((doc: any) => doc.data().email === email)
        if (exist) {
            const response = await signInWithEmailAndPassword(auth, email, password)
            return response
        }
    } catch (error: any) {
        console.log('====================================');
        console.log('error: ', { error, message: error.message });
        console.log('====================================');
        throw new Error('Error trying to singin')
    }
}
export async function register(data: DataFormMyType | any) {
    try {
        const response = await createUserWithEmailAndPassword(auth, data.Email, data.Password)
        const userToSave: User = response.user.providerData[0]
        await addDoc(collection(FIRESTORE_DB, 'users'), { ...userToSave })

    } catch (error: any) {
        console.log(error);
        alert('register in failed: ' + error.message)
    } finally {
    }
}
