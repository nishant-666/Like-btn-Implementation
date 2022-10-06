import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app, database } from "./firebaseConfig";
import { collection } from "firebase/firestore";
import "./App.css";

function App() {
  let [authState, setAuthState] = useState(false);
  let dbInstance = collection(database, "like-system");
  let auth = getAuth();
  let googleAuth = new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(auth, googleAuth).then((res) => {
      alert("Logged In");
    });
  };

  const signout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res) {
        setAuthState(true);
      } else {
        setAuthState(false);
      }
    });
  }, []);
  return (
    <div className="App">
      {authState ? (
        <>
          <button>Like 👍 </button>
          <button onClick={signout}>Log Out </button>
        </>
      ) : (
        <button onClick={signIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default App;
