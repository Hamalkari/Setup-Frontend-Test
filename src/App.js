import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />

      <ToastContainer hideProgressBar />
    </div>
  );
}

export default App;
