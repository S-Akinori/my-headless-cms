import { collection, getDocs, QueryDocumentSnapshot, DocumentData, addDoc, doc, getDoc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Content } from "src/types/Content";
import ContentType from "src/types/ContentType";
import { db, storage } from "./firebase";

export const getContentTypes = async (id: string) => {
  const querySnapshot = await getDocs(collection(db, "domains", id, "contentTypes"));
  const docs: ContentType[] = [];
  querySnapshot.forEach((doc) => {
    const contentType = doc.data() as ContentType
    if(contentType.dateFormat === 'string') {
      docs.push({
        ...contentType,
        createdAt: contentType.createdAt!,
        updatedAt: contentType.updatedAt!
      })
    } else {
      docs.push({
        ...contentType,
        createdAt: (contentType.createdAt! as Timestamp).toDate().toString(),
        updatedAt: (contentType.updatedAt! as Timestamp).toDate().toString()
      })
    }
  })
  return docs;
}

export const addContentType = async (id: string, contentType: ContentType) => {
  const timestamp = serverTimestamp();
  await setDoc(doc(db, "domains", id, "contentTypes", contentType.id), {
    ...contentType,
    dateformat: 'timestamp',
    createdAt: timestamp,
    updatedAt: timestamp
  })
}
export const addContent = async (id: string, content: Content) => {
  const timestamp = serverTimestamp();
  await setDoc(doc(db, "domains", id, "contents", content.id), {
    ...content,
    dateformat: 'timestamp',
    createdAt: timestamp,
    updatedAt: timestamp
  })
}

export const getContents = async (id: string) => {
  const querySnapshot = await getDocs(collection(db, "domains", id, "contents"));
  const docs: Content[] = [];
  querySnapshot.forEach((doc) => {
    const content = doc.data() as Content
    if(content.dateFormat === 'string') {
      docs.push({
        ...content,
        createdAt: content.createdAt!,
        updatedAt: content.updatedAt!
      })
    } else {
      docs.push({
        ...content,
        createdAt: (content.createdAt! as Timestamp).toDate().toString(),
        updatedAt: (content.updatedAt! as Timestamp).toDate().toString()
      })
    }
  })
  return docs;
}

export const getContent = async (domainId : string, docId: string) => {
  const docRef = doc(db, "domains", domainId, "contents", docId);
  const docSnap = await getDoc(docRef);
  const content = docSnap.data() as Content
  if(content.dateFormat === 'string') {
    content.createdAt = content.createdAt!
    content.updatedAt = content.updatedAt!
  } else {
    content.createdAt = (content.createdAt! as Timestamp).toDate().toString();
    content.updatedAt = (content.updatedAt! as Timestamp).toDate().toString()
  }
  return content;
}


export const addFile = async (domainId: string, file: File) => {
  const imageRef = ref(storage, `${domainId}/${file.name}`);
  const res = await uploadBytes(imageRef, file);
  return res.ref
}

export const getFileURL = async (path: string) => {
  const fileRef = ref(storage, path);
  const url = await getDownloadURL(fileRef);
  const res = await fetch(url);
  console.log(url)
  return res.blob();
}