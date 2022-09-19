import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import MenuBar from './components/MenuBar';
// import SinglePost from './pages/SinglePost';
const App = () => {
  return (
    <BrowserRouter>
      <Container>
        {/* <MenuBar /> */}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          {/* <Route exact path='/posts/:postId' element={<SinglePost />} /> */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
export default App;