import React, { useEffect, useState } from 'react';
import './PostDetails.scss';

import { loadPostDetails } from '../../api/posts';
import { deleteComment, loadComments } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>();
  const [comments, setComments] = useState<Comments[]>([]);

  const getPostDetails = async () => {
    const detailsFromServer = await loadPostDetails(postId);

    setPostDetails(detailsFromServer);
  };

  const getComments = async () => {
    const commentsFromServer = await loadComments(postId);

    setComments(commentsFromServer.comments);
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id);
    await getComments();
  };

  useEffect(() => {
    getComments();
    getPostDetails();
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.title}</p>
      </section>

      <section className="PostDetails__comments">

        <ul className="PostDetails__list">
          {comments.map(commentary => (
            <li key={commentary.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => handleDeleteComment(commentary.id)}
              >
                X
              </button>
              <p>{commentary.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            getComments={getComments}
          />
        </div>
      </section>
    </div>
  );
};
