import logo from "../../assets/logo-large.png"
import styles from "./index.module.css"
import { Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar className={styles.header} fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="150"
              height="50"
              className="d-inline-block align-center"
            />
            {"  "}Animal Park
          </Navbar.Brand>
        </Container>
      </Navbar>

  );
}

export default Header;
