import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { FIRESTORE_DB } from "../../../firebaseConfig";
import { Pet } from "../../utils/types";

export async function addPetService(pet: Pet, uid: string) {
    await addDoc(collection(FIRESTORE_DB, 'pets'), { ...pet, uid: [uid] })
}

export async function saveImagePetService(pet: Pet, uid: string) {

}


export function getPets() {

}
export function getPet(id: string) {

}
export function updatePet(id: string) {

}
export function deletePet(id: string) {

}