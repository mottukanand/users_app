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
          {usersData && usersData.length
            ? usersData.map((user, index) => (
                <Card
                  className="shadow p-3 mb-4 mt-4 bg-white rounded"
                  key={index}
                >
                  <Card.Body>
                    <Row>
                      <Col sm={2}>
                        <Card.Img
                          variant="top"
                          src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                          width={"200px"}
                          height={"200px"}
                        />
                      </Col>
                      <Col>
                        <Card.Title tag="h5" className="my-2 fw-bold">
                          {user.name}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 " tag="h6">
                          <div className="my-2 d-flex">
                            <div className="fw-bold marginR">Email: </div>
                            <div className="fst-italic">{user.email}</div>
                          </div>
                          <div className="my-2 d-flex">
                            <div className="fw-bold marginR">Phone: </div>
                            <div className="fst-italic">{user.phone}</div>
                          </div>
                          <div className="my-2  d-flex">
                            <div className="fw-bold marginR">Company: </div>
                            <div className="fst-italic">
                              {user.company && user.company.name
                                ? user.company.name
                                : null}
                            </div>
                          </div>
                          <div className="my-2  d-flex">
                            <div className="fw-bold marginR">Website: </div>
                            <div className="fst-italic">{user.website}</div>
                          </div>

                          <div className="my-2  d-flex">
                            <div className="fw-bold marginR">Address: </div>
                            <div className="fst-italic">
                              {user.address && user.address.suite
                                ? user.address.suite
                                : null}
                              ,
                              {user.address && user.address.street
                                ? user.address.street
                                : null}
                              ,
                              {user.address && user.address.city
                                ? user.address.city
                                : null}
                              ,
                              {user.address && user.address.zipcode
                                ? user.address.zipcode
                                : null}
                            </div>
                          </div>
                        </Card.Subtitle>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            : null}
        </Container>
      )}
    </>
  );
}

export default Users;
