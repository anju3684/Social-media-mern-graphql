import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
// import SinglePost from './pages/SinglePost';
import { AuthContext } from './context/auth';
import { useContext } from 'react';
const App = () => {
  const context=useContext(AuthContext)

  return (
    <BrowserRouter>
      <Container>
        <MenuBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
         {context.user ?<Route path='/login' element={<Navigate to ="/"/>}/> :<Route exact path='/login' element={<Login />} /> } 
         {context.user ?<Route path='/register' element={<Navigate to ="/"/>}/> :<Route exact path='/register' element={<Register />} /> } 
          {/* <Route exact path='/posts/:postId' element={<SinglePost />} /> */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
export default App;