import { useEffect, useState } from "react";
import { app, database } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./App.css";
import Posts from "./Posts";

function App() {
  let [authState, setAuthState] = useState(false);
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  let databaseInstance = collection(database, "posts");
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

  const addPost = () => {
    addDoc(databaseInstance, {
      post: post,
      isLiked: false,
    }).then(() => {
      setPost("");
    });
  };

  const doLike = (id, isLiked) => {
    let docToUpdate = doc(databaseInstance, id);

    if (isLiked) {
      updateDoc(docToUpdate, {
        isLiked: false,
      });
    } else {
      updateDoc(docToUpdate, {
        isLiked: true,
      });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res) {
        setAuthState(true);
      } else {
        setAuthState(false);
      }
    });

    onSnapshot(databaseInstance, (res) => {
      setPosts(
        res.docs.map((post) => {
          return { ...post.data(), id: post.id };
        })
      );
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
            <textarea
              onChange={(event) => setPost(event.target.value)}
              id="post"
              name="post"
              value={post}
              rows="4"
              cols="50"
            ></textarea>
            <br />
            <button onClick={addPost}>Post</button>
          </div>

          <div className="posts-main">
            {posts.map((post) => {
              return <Posts post={post} doLike={doLike} />;
            })}
          </div>
        </>
      ) : (
        <button onClick={signIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default App;
