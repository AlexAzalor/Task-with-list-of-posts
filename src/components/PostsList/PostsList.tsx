import React, { useEffect, useState } from 'react';
import './PostsList.scss';

import { addPost, loadPosts, updatePost } from '../../api/posts';
import { PostListForm } from './PostListForm';

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

              <PostListForm
                getPosts={getPosts}
                setPostId={setPostId}
                setIdUpdatePost={setIdUpdatePost}
                id={post.id}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
