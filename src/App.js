
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/header';
import Home from './components/home';
import Error from './components/error-page';
import Signup from './components/sign-up';
import Login from './components/login';
import Posts from './components/posts';
import NewPost from './components/newPost';

function App() {
  // logged in state*
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleAuthenticated() {
    setIsAuthenticated(true);
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path='/signup' element={<Signup isAuthenticated={isAuthenticated} />} />
          <Route path='/login' element={<Login isAuthenticated={isAuthenticated} handleAuthenticated={handleAuthenticated} />} />
          <Route path='/posts' >
            <Route index element={<Posts isAuthenticated={isAuthenticated} />} />
            <Route path='new' element={<NewPost isAuthenticated={isAuthenticated} />} />
            <Route path=':id' element={<Error />} />
          </Route>

          <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
