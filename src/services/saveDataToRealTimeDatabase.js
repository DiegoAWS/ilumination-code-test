import { database } from "./firebase";

export const saveVideoData=(fileName,fullName,size,downloadURL)=>{

        database.child(fullName).set({
            fileName,
            size,
            downloadURL
        });
      
}