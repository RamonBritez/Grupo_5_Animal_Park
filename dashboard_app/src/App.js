import Layout  from "./layout";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="App">
      <Layout>
        <AppRoutes />
      </Layout>
    </div>
  );
}

export default App;
