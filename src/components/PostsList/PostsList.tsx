import React, { useEffect, useState } from 'react';
import './PostsList.scss';

import {
  addPost,
  deletePost,
  loadPosts,
  updatePost,
} from '../../api/posts';

type Props = {
  handleButtonDetails: (id: number) => void;
  postId: number;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
};

export const PostsList: React.FC<Props> = ({ handleButtonDetails, postId, setPostId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [addBody, setAddBody] = useState('');
  const [addTitle, setAddTitle] = useState('');
  const [idUpdatePost, setIdUpdatePost] = useState(0);

  const getPosts = async () => {
    const postsFromServer = await loadPosts();

    setPosts(postsFromServer);
  };

  const delPost = async (id: number) => {
    await deletePost(id);
    await getPosts();
  };

  const clearFields = () => {
    setAddTitle('');
    setAddBody('');
  };

  const handleSubmitPost = async (event: React.FormEvent) => {
    event.preventDefault();

    await addPost(addTitle, addBody);
    await updatePost(idUpdatePost, addTitle, addBody);
    await getPosts();

    clearFields();
  };

  const handleSubmitPut = async (event: React.FormEvent) => {
    event.preventDefault();

    await updatePost(idUpdatePost, addTitle, addBody);
    await getPosts();

    clearFields();
  };

  useEffect(() => {
    getPosts();
  }, [idUpdatePost]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <form
        className="NewCommentForm"
        onSubmit={handleSubmitPost}
      >
        <input
          type="text"
          value={addTitle}
          name="title"
          onChange={event => setAddTitle(event.target.value)}
        />

        <textarea
          className="NewCommentForm__input"
          name="body"
          value={addBody}
          onChange={event => setAddBody(event.target.value)}
        />

        <button
          type="submit"
          className="NewCommentForm__submit-button button"
          onClick={handleSubmitPost}
        >
          Add a post
        </button>
      </form>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>

            <div className="PostsList__form">
              {postId === post.id ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => handleButtonDetails(0)}
                >
                  Close details
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => handleButtonDetails(post.id)}
                >
                  Open details
                </button>
              )}

              <form
                className="NewCommentForm"
                onSubmit={handleSubmitPut}
              >
                <input
                  type="hidden"
                  value={post.id}
                  onChange={(event) => setPostId(+event.target.value)}
                />

                <input
                  type="text"
                  placeholder="Type title"
                  value={addTitle}
                  onChange={event => setAddTitle(event.target.value)}
                />

                <textarea
                  className="NewCommentForm__input"
                  placeholder="Type text"
                  value={addBody}
                  onChange={event => setAddBody(event.target.value)}
                />

                <button
                  type="submit"
                  className="NewCommentForm__submit-button button"
                  onClick={() => setIdUpdatePost(post.id)}
                >
                  Update post
                </button>

                <button
                  type="button"
                  className="PostsList__button PostsList__button--red button"
                  onClick={() => delPost(post.id)}
                >
                  Remove post
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
