import React, { useState } from 'react';
import './NewCommentForm.scss';

import { addComment } from '../../api/comments';

type Props = {
  postId: number;
  getComments: () => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, getComments }) => {
  const [body, setBody] = useState('');

  const clearField = () => {
    setBody('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await addComment(postId, body);
    await getComments();

    clearField();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={handleSubmit}
      >
        Add a comment
      </button>
    </form>
  );
};
