import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [postId, setPostId] = useState(0);

  const handleButtonDetails = (id: number) => {
    setPostId(id);
  };

  return (
    <div className="App">
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            handleButtonDetails={handleButtonDetails}
            postId={postId}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          {postId ? (
            <PostDetails
              postId={postId}
            />
          ) : ''}
        </div>
      </main>
    </div>
  );
};

export default App;
