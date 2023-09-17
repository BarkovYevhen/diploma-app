import logo from './logo.svg';
import './App.css';
import Login from './containers/Login/Login';
import ProductTable from './containers/ProductTable/ProductTable';
import ProductPreview from './containers/ProductPreview/ProductPreview';

function App() {
  return (
    <div className="App">

      {/* <Login /> */}
      <ProductPreview />
      {/* <ProductTable /> */}

    </div>
  );
}

export default App;
