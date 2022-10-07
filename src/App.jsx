import { useEffect, useState } from "react";
import { app, database } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";

function App() {
  let [authState, setAuthState] = useState(false);
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
          <button onClick={signout} className="logout">
            Log Out{" "}
          </button>

          <div className="add-posts">
            <textarea id="post" name="post" rows="4" cols="50"></textarea>
            <br />
            <button>Post</button>
          </div>
        </>
      ) : (
        <button onClick={signIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default App;
