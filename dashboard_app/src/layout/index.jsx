import Header from "./Header";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.css"

const Layout = ({ children }) => {
  return (
    <Container style={{paddingTop: "90px", paddingLeft: "110px"}}> 
      <Header />
      <Container>
      <Sidebar />
        {children}
      </Container>
    </Container>
  );
};

export default Layout;
