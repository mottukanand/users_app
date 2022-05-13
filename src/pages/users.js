import * as React from "react";
import Header from "pages/header";
import { getUsers } from "services/usersServices";
import { Container, Row, Col, Card } from "react-bootstrap";
import Loader from "shared/loader.js";

function Users() {
  const [usersData, setUsersData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((response) => {
        setUsersData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setUsersData([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Row md="3" sm="2" xs="1" className="my-3">
            {usersData && usersData.length
              ? usersData.map((user, index) => (
                  <Col className="bg-light border" key={index}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                      />
                      <Card.Body>
                        <Card.Title tag="h5" className="my-2">
                          {user.name}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" tag="h6">
                          <Row className="my-3">
                            <Col>
                              <div className="fw-normal">Email: </div>
                            </Col>
                            <Col>
                              {" "}
                              <div className="fst-italic">{user.email}</div>
                            </Col>
                          </Row>
                          <Row className="my-3">
                            <Col>
                              <div className="fw-normal">Phone: </div>
                            </Col>
                            <Col>
                              <div className="fst-italic">{user.phone}</div>
                            </Col>
                          </Row>

                          <Row className="my-3">
                            <Col>
                              <div className="fw-normal">Website: </div>
                            </Col>
                            <Col>
                              <div className="fst-italic">{user.website}</div>
                            </Col>
                          </Row>
                          <Row className="my-3">
                            <Col>
                              <div className="fw-normal">Company Name: </div>
                            </Col>
                            <Col>
                              <div className="fst-italic">
                                {user.company && user.company.name
                                  ? user.company.name
                                  : null}
                              </div>
                            </Col>
                          </Row>
                          <Row className="my-3">
                            <Col>
                              <div className="fw-normal">Address: </div>
                            </Col>
                            <Col>
                              <div className="fst-italic">
                                <p>
                                  {user.address && user.address.suite
                                    ? user.address.suite
                                    : null}
                                </p>
                                <p>
                                  {user.address && user.address.street
                                    ? user.address.street
                                    : null}
                                </p>
                                <p>
                                  {user.address && user.address.city
                                    ? user.address.city
                                    : null}
                                </p>
                                <p>
                                  {user.address && user.address.zipcode
                                    ? user.address.zipcode
                                    : null}
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : null}
          </Row>
        </Container>
      )}
    </>
  );
}

export default Users;
