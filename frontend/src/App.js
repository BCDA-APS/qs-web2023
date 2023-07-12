import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/Layout';
import NavBar from './components/NavBar/NavBar';
import { ConfigProvider } from './redux/configContext';
import './App.css';
function App() {
  return (
    <ConfigProvider>
      <NavBar>
        <Layout />
      </NavBar>
    </ConfigProvider>
  );
}

export default App;
