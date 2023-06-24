import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/Layout';
import NavBar from './components/NavBar/NavBar';
function App() {
  return (
    <NavBar>
      <Layout />
    </NavBar>
  );
}

export default App;
