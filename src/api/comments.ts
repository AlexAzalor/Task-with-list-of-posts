export const API_URL = 'https://bloggy-api.herokuapp.com';

export const loadComments = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}?_embed=comments`);

  return response.json();
};

export const deleteComment = async (id: number) => {
  const response = await fetch(`${API_URL}/comments/${id}?_embed=comments`, {
    method: 'DELETE',
  });

  return response.json();
};

export const addComment = async (
  postId: number,
  body: string,
): Promise<Comments> => {
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      postId,
      body,
    }),
  });

  return response.json();
};
