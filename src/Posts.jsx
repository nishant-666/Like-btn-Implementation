import React from "react";

export default function Posts({ post, doLike }) {
  return (
    <div className="posts-body">
      <p>{post.post}</p>

      {post.isLiked ? (
        <button onClick={() => doLike(post.id, post.isLiked)}>Liked 👍 </button>
      ) : (
        <button onClick={() => doLike(post.id, post.isLiked)}>Like</button>
      )}
    </div>
  );
}
