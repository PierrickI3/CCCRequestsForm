import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import { BiSave, BiMailSend } from 'react-icons/bi';
import Select from 'react-select';
import { searchMailConfiguration, updateMailConfiguration } from '../../services/backend';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import queryString from 'query-string';

const inputProps = {
  placeholder: 'Add mail address',
};

let clearFilterSet = { region: undefined, product: undefined };

export default function AdminPage(props) {
  //#region "state"
  const [showSpinner, setShowSpinner] = useState(false);
  const [query, setQuery] = useState(null);
  const [tags, setTags] = useState([]);
  const [mailConfigObj, setMailConfigObj] = useState(null);

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
    { value: 'Genesys Cloud', label: 'Genesys Cloud' },
    { value: 'PureConnect', label: 'PureConnect' },
    { value: 'Genesys Engage', label: 'Genesys Engage' },
    { value: 'Genesys Engage Cloud', label: 'Genesys Engage Cloud' },
    { value: 'Latitude by Genesys', label: 'Latitude by Genesys' },
  ];

  useEffect(() => {
    // <parse query string>
    const parsedQueryString = queryString.parse(props.location.search);
    console.log('parsedQueryString: ', parsedQueryString);
    setQuery(parsedQueryString);
    // </parse query string>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  const handleChange = (tags) => {
    console.log(tags);
    setTags(tags);
  };

  const queryDynamo = (filter) => {
    console.log('queryDynamo()', filter);
    if (filter.region && filter.product) {
      setShowSpinner(true);
      setMailConfigObj(null);
      searchMailConfiguration(query.token, filter)
        .then((resp) => {
          console.log(resp);
          setTags(resp[0].addresses);
          setMailConfigObj(resp[0]);
          setShowSpinner(false);
        })
        .catch(() => {
          NotificationManager.error('Failed to get configuration objects', 'Error', 3000);
          setShowSpinner(false);
        });
    }
  };

  const handleSave = () => {
    console.log('handleSave()');
    setShowSpinner(true);
    let obj = { ...mailConfigObj };
    obj.token = query.token;
    obj.addresses = tags;

    updateMailConfiguration(obj)
      .then(() => {
        console.log('saved !');
        NotificationManager.success('Configuration updated', 'Success', 3000);
        setShowSpinner(false);
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error('Failed to update configuration', 'Error', 3000);
        setShowSpinner(false);
      });
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>
              <BiMailSend /> M.C.A.P (Mail Configuration Admin Page)
            </h1>
          </Col>
        </Row>
        <span>
          This configuration page allow to set email reciepments for requests that match Region and Product combination.
          <br />
          Please note that this involves frontend and backend behaviour.
        </span>

        <Row className="mt-4">
          <Col>
            <div className="mb-3">
              Region
              <Select
                isDisabled={false}
                options={regionList}
                isMulti={false}
                isSearchable={false}
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
        <Row>
          <Col>
            <TagsInput value={tags} onChange={handleChange} inputProps={inputProps} validationRegex={/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/} onlyUnique={true} disabled={!mailConfigObj} />
          </Col>
          <Spinner className="mt-2" color="primary" hidden={!showSpinner} />
        </Row>
        <Row>
          <Col>
            <Button outline size="xl" color="primary" className="mt-4" onClick={handleSave} disabled={!mailConfigObj}>
              <BiSave /> Apply
            </Button>
          </Col>
          <Col></Col>
        </Row>

        <NotificationContainer />
      </Container>
    </>
  );
}
