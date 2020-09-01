import React, { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown, DropdownMenu, Label, Input, Button } from "reactstrap";
import { IoMdFlash } from "react-icons/io";
import Select from 'react-select';
import { searchMailConfiguration } from "../../services/backend";


import queryString from "query-string";
let clearFilterSet = { region: undefined, product: undefined };


export default function AdminPage(props) {
  //#region "state"
  const [query, setQuery] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(clearFilterSet);
  //#endregion

  //#region "initialization"

  const regionList = [
    { value: 'EMEA', label: 'EMEA' },
    { value: 'NA', label: 'NA' },
    { value: 'LATAM', label: 'LATAM' },
    { value: 'APAC', label: 'APAC' },
  ];

  const productList = [
    { value: 'PureCloud', label: 'PureCloud' },
    { value: 'PureConnect', label: 'PureConnect' },
    { value: 'Genesys Engage', label: 'Genesys Engage' },
    { value: 'Genesys Engage Cloud', label: 'Genesys Engage Cloud' },
    { value: 'Latitude by Genesys', label: 'Latitude by Genesys' },
  ];


  useEffect(() => {
    // <parse query string>
    const parsedQueryString = queryString.parse(props.location.search);
    console.log("parsedQueryString: ", parsedQueryString);
    setQuery(parsedQueryString);
    // </parse query string>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion


  const queryDynamo = (filter) => {
    console.log('queryDynamo()', filter);
    searchMailConfiguration(query.token, filter);

  };

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
            <p>Token: {query && query.token ? query.token.substring(0, 10) + '...' : "unknown"}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mb-3">
              Region
            <Select
                isDisabled={false}
                options={regionList}
                isMulti={false}
                isSearchable={false}
                //value={currentFilter.region}
                onChange={(v) => {
                  let cf = { ...currentFilter };
                  cf.region = v.value;
                  setCurrentFilter(cf);
                  queryDynamo(cf);
                }}
              />
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              Product
            <Select
                isDisabled={false}
                options={productList}
                isMulti={false}
                isSearchable={false}
                //value={currentFilter.region}
                onChange={(v) => {
                  let cf = { ...currentFilter };
                  cf.product = v.value;
                  setCurrentFilter(cf);
                  queryDynamo(cf);
                }}
              />
            </div>
          </Col>
        </Row>



      </Container>
    </>
  );
}
