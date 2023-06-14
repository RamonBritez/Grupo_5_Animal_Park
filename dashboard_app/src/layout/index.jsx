import Header from "./Header";
import Sidebar from "./Sidebar";
import "./index.css"

const Layout = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
