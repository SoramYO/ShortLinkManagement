import { getDownloadURL, ref, StorageReference, uploadBytes, UploadResult } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

const uploadFile = async (file: File, folderPath: string): Promise<string> => {
    console.log(file);
    const storageRef : StorageReference = ref(storage, `${folderPath}/${file.name}`);
    const response : UploadResult= await uploadBytes(storageRef, file);
    const downloadURL :string = await getDownloadURL(response.ref);
    return downloadURL;
};

export default uploadFile;
  

export const getBase64 = (file :File) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    }
);