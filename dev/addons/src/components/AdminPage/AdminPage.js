import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { IoMdFlash } from "react-icons/io";

import queryString from "query-string";

export default function AdminPage(props) {
  //#region "state"
  const [query, setQuery] = useState(null);
  //#endregion

  //#region "initialization"

  useEffect(() => {
    // <parse query string>
    const parsedQueryString = queryString.parse(props.location.search);
    console.log("parsedQueryString: ", parsedQueryString);
    setQuery(parsedQueryString);
    // </parse query string>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  return (
    <>
      {/* See this one (Reactstrap - Bootstrap wrapped by React components): */}
      {/* https://reactstrap.github.io/ */}
      {/* And the icon set: */}
      {/* https://react-icons.github.io/react-icons/icons?name=io */}
      {/* Some examples below: */}
      <Container>
        <Row>
          <Col>
            <h1>
              <IoMdFlash /> Admin Page
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Region: {query && query.region ? query.region : "unknown"}</p>
          </Col>
          <Col>
            <p>Token: {query && query.token ? query.token : "unknown"}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
