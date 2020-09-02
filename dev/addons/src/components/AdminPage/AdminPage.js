import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'reactstrap';
import { BiSave, BiMailSend, BiX } from 'react-icons/bi';
import uuid from 'react-uuid';
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

let clearFilterSet = { region: undefined, product: undefined, category: undefined };

export default function AdminPage(props) {
  //#region "state"
  const [showSpinner, setShowSpinner] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
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

  const categoryList = [
    { value: '<default>', label: '<default>' },
    { value: 'Critical Situation Support', label: 'Critical Situation Support' },
    { value: 'Customer Success Program', label: 'Customer Success Program' },
    { value: 'Demo & Trial Support', label: 'Demo & Trial Support' },
    { value: 'Enablement', label: 'Enablement' },
    { value: 'Opportunity Support', label: 'Opportunity Support' },
    { value: 'Privacy Support', label: 'Privacy Support' },
    { value: 'Roadmap', label: 'Roadmap' },
    { value: 'RR Extension', label: 'RR Extension' },
    { value: 'Security Support', label: 'Security Support' },
    { value: 'Specialist Engagement', label: 'Specialist Engagement' },
    { value: 'Strategic Business Consulting', label: 'Strategic Business Consulting' },
    { value: 'Other Request', label: 'Other Request' },
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
    if (filter.region && filter.product && filter.category) {
      let genericFilter = { ...filter };
      console.log('queryDynamo()', filter);
      if (filter.category === '<default>') genericFilter.category = undefined;
      setShowWarning(false);
      setShowSpinner(true);
      setMailConfigObj(null);
      searchMailConfiguration(query.token, genericFilter)
        .then((resp) => {
          console.log('we have got response !');
          console.log(resp);
          if (resp.length === 0) {
            // No results, remove category Filter & search Again
            genericFilter.category = undefined;
            searchMailConfiguration(query.token, genericFilter)
              .then((resp) => {
                setShowWarning(true);
                setTags(resp[0].addresses);
                setMailConfigObj(resp[0]);
                setShowSpinner(false);
              })
              .catch(() => {
                NotificationManager.error('Failed to get configuration objects', 'Error', 3000);
                setShowSpinner(false);
              });
          } else {
            setTags(resp[0].addresses);
            setMailConfigObj(resp[0]);
            setShowSpinner(false);
          }
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
    let cf = { ...currentFilter };
    obj.token = query.token;
    obj.addresses = tags;
    console.log(obj);
    console.log('cf.category', cf.category);
    if (cf.category !== '<default>' && obj.category === undefined) {
      console.log('prepare new object ...');
      // Create new entry in DynamoDb
      obj.id = uuid();
      obj.category = cf.category;
    }

    updateMailConfiguration(obj)
      .then(() => {
        console.log('saved !');
        NotificationManager.success('Configuration updated', 'Success', 3000);
        setShowSpinner(false);
        setShowWarning(false);
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error('Failed to update configuration', 'Error', 3000);
        setShowSpinner(false);
      });
  };

  const goBack = () => {
    let url;
    if (window.location.href.includes('localhost')) {
      if (window.location.href.includes('dev')) url = `https://localhost/dev/requests.html?region=${query.region}`;
      else url = `https://localhost/dev/requests.html?region=${query.region}`;
    } else {
      url = `../../requests.html?region=${query.region}`;
    }
    console.log('goBack()', url);
    window.location.replace(url);
  };

  return (
    <>
      <Container className="mt-5">
        <Button outline size="xl" color="primary" className="mb-4" onClick={goBack}>
          <BiX /> Return to previous page
        </Button>
        <Row>
          <Col>
            <h1>
              <BiMailSend /> M.C.A.P (Mail Configuration Admin Page)
            </h1>
          </Col>
        </Row>
        <span>
          This configuration page allow to set email reciepments for requests that match Region, Product and Category combination.
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
          <Col>
            <div className="mb-3">
              Category
              <Select
                isDisabled={false}
                options={categoryList}
                isMulti={false}
                isSearchable={false}
                onChange={(v) => {
                  let cf = { ...currentFilter };
                  cf.category = v.value;
                  setCurrentFilter(cf);
                  queryDynamo(cf);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert color="warning" hidden={!showWarning}>
              There is no configuration for this combination. Default rules (Region + Product) applied. <br />
              Once overwritten, new entry will be created.
            </Alert>
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
