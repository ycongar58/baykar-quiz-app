import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import {Paper, Button} from '@mui/material';
import { styled } from '@mui/material/styles';

const NavPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'start',
  margin: 15,
}));

function App() {
  function clickFunction(page){
    window.open(page, '_self');
  };
  return (
    <Router>
      <div>
        <NavPaper>
            <Button variant='outlined' onClick={()=>clickFunction('/')}>
              {/*<Link to="/">Startseite</Link>*/}
              HOME
            </Button>
            <Button variant='outlined' onClick={()=>clickFunction('/quiz')}>
              QUIZ
              {/*<Link to="/quiz">Quiz</Link>*/}
            </Button>
        </NavPaper>

        <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
