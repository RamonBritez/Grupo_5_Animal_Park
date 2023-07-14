import { Col, ListGroup, Row } from "react-bootstrap";
import styles from "./index.module.css"

function Sidebar() {
  return (
    <Col className={`${styles.sidebar}`}>
      <Row>
        <ListGroup>
          <ListGroup.Item action href="/">
           Home
          </ListGroup.Item>
          <hr className="sidebar-divider mb-3 mt-3"/>
          <ListGroup.Item action href="/products">
           Products
          </ListGroup.Item>
          <hr className="sidebar-divider mb-3 mt-3"/>
          <ListGroup.Item action href="/users">
           Users
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </Col>
  );
}

export default Sidebar;
