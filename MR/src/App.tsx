import "./styles/app.scss";
import Layout from './options/Layout'
import Login from './Components/Login'
function App() {
  return (
    <div id="app" className="App">
      <Layout>
        <Login/>
      </Layout>
    </div>
  );
}

export default App;
