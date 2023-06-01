
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Error from './components/error-page';
import Signup from './components/sign-up';
import Login from './components/login';
import Posts from './components/posts';

function App() {
  // logged in state*
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/posts' element={<Posts />} />
          {/* nested routes for individual posts - /posts/:id */}
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
