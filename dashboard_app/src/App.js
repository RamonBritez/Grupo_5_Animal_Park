import Layout from "./layout";
import {
  BrowserRouter as Router
} from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
          
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
