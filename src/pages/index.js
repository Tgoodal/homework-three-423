import React from "react";
import useFirebase from '../useHooks/useFirebase';
import Message from '../components/message'; 
import useGlobalValues from '../useHooks/useGlobalValues';
import homeStyles from '../styles/Home.module.css';






export default function HomePage() {
  const firebase = useFirebase();


  // const [booksListOld, setBooksList] = React.useState([]);

  // const [errorOld, setError] = React.useState('');

  const {booksList, update, error} = useGlobalValues();

  // console.log(globalValues);

  const booksListComponents = booksList.map(book=>{
    return <li key={book.id}>{book.name}</li>
  })

  async function pullBooksFromDb(){
    try{
      if(!firebase.currentUser.email) throw {code: 'auth-failed', name: 'Firebase Auth'}
      const books = await firebase.getBooks();
      update({ booksList: books, error: ''});
    } catch (e) {
      if (e.code === 'auth-failed' && e.name === 'Firebase Auth'){
        update({ error: `${e.name} (${e.code}): You need to log in to access the Book List.` })
      } else{
        update({error: e.toString()})
    }
  }
}


return(
  <>
  <div className={homeStyles.home}>
  <h1 className={homeStyles.header}>My Name: {firebase.currentUser.displayName || '--'}</h1>
  <button className={homeStyles.button} onClick={pullBooksFromDb}>Get Books</button>


  <ul className={homeStyles.books}>{booksListComponents}</ul>
  {error ? (<>
    <Message type="error">{error}</Message>
  </>
  ) :(
    <></>
  )}
  </div>
  </>
)
}
