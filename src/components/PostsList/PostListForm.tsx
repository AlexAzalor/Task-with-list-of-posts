import React, { useState } from 'react';
import { deletePost, updatePost } from '../../api/posts';

type Props = {
  id: number;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
  setIdUpdatePost: React.Dispatch<React.SetStateAction<number>>;
  getPosts: () => Promise<void>;
};

export const PostListForm: React.FC<Props> = ({
  id,
  setPostId,
  setIdUpdatePost,
  getPosts,
}) => {
  const [addTitle, setAddTitle] = useState('');
  const [addBody, setAddBody] = useState('');

  const handleDeletePost = async (postId: number) => {
    await deletePost(postId);
    await getPosts();
  };

  const clearFields = () => {
    setAddTitle('');
    setAddBody('');
  };

  const handle = async (event: React.FormEvent) => {
    event.preventDefault();

    await updatePost(id, addTitle, addBody);
    await getPosts();

    clearFields();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handle}
    >
      <input
        type="hidden"
        value={id}
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
        onClick={() => setIdUpdatePost(id)}
      >
        Update post
      </button>

      <button
        type="button"
        className="PostsList__button PostsList__button--red button"
        onClick={() => handleDeletePost(id)}
      >
        Remove post
      </button>
    </form>
  );
};
