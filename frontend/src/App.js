import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/footer';
import Header from './components/layouts/header';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'

function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        <Footer/>
        </HelmetProvider>
      </div>
    </Router> 
  );
}

export default App;
