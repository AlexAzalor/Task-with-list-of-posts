/// <reference types="react-scripts" />

type Post = {
  title: string,
  body: string,
  id: number,
  comments: Comments[],
};

type Comments = {
  id: number,
  postId: number,
  body: string,
};
