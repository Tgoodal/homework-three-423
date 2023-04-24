import React from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_ID,
  };

const app = firebase.initializeApp(firebaseConfig); 

// const app = firebase.app();

const auth = firebase.auth(app);

const googleProvider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore(app);

export default function useFirebase(){
    const initialUser = {email: '', displayName: ''};
    const [currentUser, setCurrentUser] = React.useState(initialUser);
  
    auth.onAuthStateChanged(function(user){
        if (user && currentUser.email !== user.email){
            setCurrentUser({
                email: user.email,
                displayName: user.displayName,
            })
        }  else if (!user && currentUser.email){
            setCurrentUser(initialUser)
        }
      });

    return{
        currentUser,
        async loginUser() {
           await auth.signInWithPopup(googleProvider);
           return {};
        },
        async logoutUser(){
            await auth.signOut();
            return{};
        },
        async getBooks(){
            const booksSnapshot = await db.collection('books').get();
            const booksList = [];
            for (let book of booksSnapshot.docs){
                const bookData = book.data();
                booksList.push({
                    ...bookData,
                    id: book.id,
                });

            }
            return booksList;
        }, 
        async createBook(name, author) {
            try {
            console.log('book is created');
              const bookRef = db.collection('books');
              const doc = bookRef.doc();
              const newBook = {
                id: doc.id,
                name,
                author,
              };
              await doc.set(newBook);
              return doc.id;
            } catch (error) {}
          },
        
          async updateBook(id, updatedFields) {
            try {
              const bookRef = db.collection('books').doc(id);
              await bookRef.update(updatedFields);
            } catch (error) {}
          },
        
          async deleteBook(id) {
            try {
              const bookRef = db.collection('books').doc(id);
              await bookRef.delete();
            } catch (error) {}
          }
        

    };
}

