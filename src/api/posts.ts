export const API_URL = 'https://bloggy-api.herokuapp.com';

export const loadPosts = async (): Promise<[]> => {
  const response = await fetch(`${API_URL}/posts`);

  return response.json();
};

export const loadPostDetails = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}?_embed=comments`);

  return response.json();
};

export const deletePost = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });

  return response.json();
};

export const addPost = async (
  title: string,
  body: string,
) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });

  return response.json();
};

export const updatePost = async (
  id: number,
  title: string,
  body: string,
) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });

  return response.json();
};
