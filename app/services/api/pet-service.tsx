import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { FIRESTORE_DB } from "../../../firebaseConfig";
import { Pet } from "../../utils/types";

export async function addPetService(pet: Pet, uid: string) {
    const data = await addDoc(collection(FIRESTORE_DB, 'pets'), { ...pet, uid: [uid] })
    return data.id
}

export async function saveImagePetService(pet: Pet, uid: string) {

}


export async function getPets(pid: string) {
    const ref = doc(FIRESTORE_DB, `pets/${pid}`)
    const data = await getDoc(ref);

    return data
}
export function getPet(id: string) {

}
export function updatePet(id: string) {

}
export function deletePet(id: string) {

}