import React from 'react'
import '../styles/globals.css'
import useFirebase from '../useHooks/useFirebase';
import Link from 'next/link';
import {GlobalProvider} from '../useHooks/useGlobalValues';
import navStyles from '../styles/nav.module.css';

export default function App({ Component, pageProps }) {

  const initalGlobalValues = {
    booksList:[],
    error: '',
  }
  const [globalValues, setGlobalValues] = React.useState(initalGlobalValues);

  function updateGlobalValues(newValues){
    setGlobalValues({...globalValues, ...newValues});
  }


  const firebase = useFirebase();

  return(
  <>
  <GlobalProvider value={{...globalValues, update: updateGlobalValues}}>
  <div className={navStyles.wrapper}>
  <nav>
    <ul>
      <li>
        <Link href='/'>Home</Link>
      </li>
      <li>
        {firebase.currentUser.email ? (
        <button onClick={firebase.logoutUser}>Logout</button>

        ) : (
          <button onClick={firebase.loginUser}>Login</button>
          )}
      </li>
    </ul>
  </nav>
  </div>
    <Component {...pageProps} />
    </GlobalProvider>
  </>
  )

}
