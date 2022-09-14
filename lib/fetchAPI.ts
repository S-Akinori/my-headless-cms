import { collection, getDocs, QueryDocumentSnapshot, DocumentData, addDoc, doc, getDoc, setDoc } from "firebase/firestore"; 
import { Content } from "src/types/Content";
import ContentType from "src/types/ContentType";
import { db } from "./firebase";

export const getContentTypes = async (id: string) => {
  const querySnapshot = await getDocs(collection(db, "domains", id, "contentTypes"));
  const docs: DocumentData[] = [];
  querySnapshot.forEach(doc => {
    docs.push(doc.data())
  })
  return docs;
}

export const addContentType = async (id: string, contentType: ContentType) => {
  await setDoc(doc(db, "domains", id, "contentTypes", contentType.id), contentType)
}
export const addContent = async (id: string, content: Content) => {
  await setDoc(doc(db, "domains", id, "contents", content.id), content)
}

export const getContents = async (id: string) => {
  const querySnapshot = await getDocs(collection(db, "domains", id, "contents"));
  const docs: DocumentData[] = [];
  querySnapshot.forEach(doc => {
    docs.push(doc.data())
  })
  return docs;
}

export const getContent = async (domainId : string, docId: string) => {
  const docRef = doc(db, "domains", domainId, 'contents', docId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}