import './RequestsFilter.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Form, FormGroup, Input } from 'reactstrap';
import { raiseEvent } from '../../services/iFrameEvents';
import { IoIosMenu, IoMdSave, IoIosFolderOpen, IoMdFlash, IoMdCheckmark, IoMdClose, IoMdRemoveCircleOutline, IoIosBackspace, IoIosFunnel } from 'react-icons/io';
import Select from 'react-select';
import queryString from 'query-string';
import { regionList, requestTypeList } from '../../services/dictionary';
import UsersSelect from '../UsersSelect/UsersSelect';

var clearFilterSet = { isTest: false, status: null, isDeleted: false, handled: null, created: null, region: null, subRegion: null, product: null, segment: null, requester: null, programManager: null, teamMember: null, customerName: null, createdAt: { value: 'Last30Days', label: 'Last 30 Days' }, requestType: null, category: null, subCategory: null, fixedRequester: false };

export default function RequestsFilter(props) {
  //#region "value lists"

  const statusValueList = [
    { value: 'Open', label: 'Open' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Waiting On Additional Information', label: 'Waiting On Additional Information' },
    { value: 'Closed', label: 'Closed' },
  ];

  const createdValueList = [
    { value: 'Last30Days', label: 'Last 30 Days' },
    { value: 'CurrentMonth', label: 'Current Month' },
    { value: 'LastMonth', label: 'Last Month' },
  ];

  const requestTypeValueList = [
    { value: '0', label: 'CC Request' },
    { value: '1', label: 'Trial/POC/Pilot Validation' },
  ];

  const handledValueList = [
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Unhandled', label: 'Unhandled' },
  ];

  const regionValueList = [
    { value: 'APAC', label: 'APAC' },
    { value: 'EMEA', label: 'EMEA' },
    { value: 'LATAM', label: 'LATAM' },
    { value: 'NA', label: 'NA' },
  ];

  const categoryValueList = [
    { value: 'Critical Situation Support', label: 'Critical Situation Support' },
    { value: 'Customer Success Program', label: 'Customer Success Program' },
    { value: 'Demo & Trial Support', label: 'Demo & Trial Support' },
    { value: 'Enablement', label: 'Enablement' },
    { value: 'Opportunity Support', label: 'Opportunity Support' },
    { value: 'Privacy Support', label: 'Privacy Support' },
    { value: 'Roadmap', label: 'Roadmap' },
    { value: 'Subscription Extension', label: 'Subscription Extension' },
    { value: 'Security Support', label: 'Security Support' },
    { value: 'Specialist Engagement', label: 'Specialist Engagement' },
    { value: 'Strategic Business Consulting', label: 'Strategic Business Consulting' },
    { value: 'Other Request', label: 'Other Request' },
  ];

  const marketSegmentValueList = [
    { value: 'Mid-market', label: 'Mid-market' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Enterprise', label: 'Enterprise' },
  ];

  const productValueList = [
    { value: 'Genesys Cloud', label: 'Genesys Cloud' },
    { value: 'Genesys Engage', label: 'Genesys Engage' },
    { value: 'Genesys Engage Cloud', label: 'Genesys Engage Cloud' },
    { value: 'PureConnect', label: 'PureConnect' },
    { value: 'Latitude by Genesys', label: 'Latitude by Genesys' },
  ];
  //#endregion

  //#region "state"
  const [query, setQuery] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMode, setFormMode] = useState('edit'); // values: edit, save, load
  const [saveFilterName, setSaveFilterName] = useState('');
  const [loadFilterSelectedItem, setLoadFilterSelectedItem] = useState(null);
  const [loadFilterItemList, setLoadFilterItemList] = useState([]);
  const [deleteFilterConfirm, setDeleteFilterConfirm] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(clearFilterSet);
  const [regionFixed, setRegionFixed] = useState(false);
  const [requesterFixed, setRequesterFixed] = useState(false);
  const [subregionValueList, setSubregionValueList] = useState([]);
  const [filterChanged, setFilterChanged] = useState(false);
  const [subcategoryValueList, setSubcategoryValueList] = useState([]);
  //#endregion

  //#region "initialization"

  useEffect(() => {
    // <parse query string>
    const parsedQueryString = queryString.parse(props.location.search);
    console.log('parsedQueryString: ', parsedQueryString);
    setQuery(parsedQueryString);
    // </parse query string>
    const latestFilterSet = localStorageGetLatestFilter();
    let initialFilterSet = latestFilterSet ? latestFilterSet : clearFilterSet;
    initialFilterSet.isTest = window.location.hostname === 'localhost';
    console.log('initialFilterSet.isTest: ', initialFilterSet.isTest);

    if (parsedQueryString && parsedQueryString.requester) {
      // <Apply requester settings>
      console.log('fixed requester and teamMember will be set to: ', parsedQueryString.requester);
      initialFilterSet.requester = [parsedQueryString.requester];
      initialFilterSet.teamMember = [parsedQueryString.requester];
      initialFilterSet.fixedRequester = true;
      setRequesterFixed(true);
      // </Apply requester settings>
    } else if (parsedQueryString && parsedQueryString.region && parsedQueryString.region.toLowerCase() !== 'super-user') {
      // <Apply region settings>
      console.log('fixed region will be set to: ', parsedQueryString.region);
      initialFilterSet.region = [{ value: parsedQueryString.region, label: parsedQueryString.region }];
      setRegionFixed(true);
      // <Apply region settings>
    } else {
      initialFilterSet.fixedRequester = false;
    }

    initialFilterSet.subRegion = removeSelectedSubregionsForNotSelectedRegions(initialFilterSet.region, initialFilterSet.subRegion); // do not remove it from here
    initialFilterSet.subCategory = removeSelectedSubcategoriesForNotSelectedCategories(initialFilterSet.category, initialFilterSet.subCategory); // do not remove it from here
    setCurrentFilter(initialFilterSet);
    applySubRegionList(initialFilterSet.region);
    raiseEvent('applyFilter', initialFilterSet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region "controls handlers"
  const toggleMenuOpen = () => setMenuOpen((prevState) => !prevState);

  const handleApplyFilters = () => {
    console.log('handleApplyFilters()');
    raiseEvent('applyFilter', currentFilter);
    localStorageSetLatestFilter(currentFilter);
    setFilterChanged(false);
  };

  const handleMenuOptionLoad = () => {
    console.log('handleMenuOptionLoad()');
    reloadFilterList();
    setDeleteFilterConfirm(false);
    setFormMode('load');
  };

  const handleMenuOptionSave = () => {
    console.log('handleMenuOptionSave()');
    setFormMode('save');
  };

  const handleMenuOptionClear = () => {
    console.log('handleMenuOptionClear()');
    let clearFilterCopy = JSON.parse(JSON.stringify(clearFilterSet));
    if (query && query.requester) {
      // <Apply requester settings>
      console.log('fixed requester and teamMember will be set to: ', query.requester);
      clearFilterCopy.requester = [query.requester];
      clearFilterCopy.teamMember = [query.requester];
      clearFilterCopy.fixedRequester = true;
      setRequesterFixed(true);
      // </Apply requester settings>
    } else if (query && query.region && query.region.toLowerCase() !== 'super-user') {
      // <Apply region settings>
      console.log('fixed region will be set to: ', query.region);
      clearFilterCopy.region = [{ value: query.region, label: query.region }];
      setRegionFixed(true);
      // </Apply region settings>
    }

    setCurrentFilter(clearFilterCopy);
    applySubRegionList(clearFilterCopy.region);
    raiseEvent('clearFilter', {});
    localStorageDropLatestFilter();
    setFilterChanged(true);
  };

  const handleSaveOkBtn = () => {
    console.log('handleSaveOkBtn()');
    localStorageSet(saveFilterName, currentFilter);
    setSaveFilterName('');
    setFormMode('edit');
  };

  const handleSaveCancelBtn = () => {
    console.log('handleSaveCancelBtn()');
    setSaveFilterName('');
    setFormMode('edit');
  };

  const handleSaveFilterNameChanged = (v) => {
    console.log('handleSaveFilterNameChanged() ', v.target.value);
    setSaveFilterName(v.target.value);
  };

  const handleLoadApplyBtn = () => {
    console.log('handleLoadApplyBtn()');
    setFormMode('edit');
    setLoadFilterSelectedItem(null);
    raiseEvent('applyFilter', currentFilter);
    localStorageSetLatestFilter(currentFilter);
    setFilterChanged(false);
  };

  const handleLoadDeleteBtn = () => {
    console.log('handleLoadDeleteBtn()');
    setDeleteFilterConfirm(true);
  };

  const handleLoadCloseBtn = () => {
    console.log('handleLoadCloseBtn()');
    setFormMode('edit');
    setLoadFilterSelectedItem(null);
  };

  const handleLoadDeleteConfirmBtn = () => {
    console.log('handleLoadDeleteConfirmBtn()');
    setDeleteFilterConfirm(false);
    localStorageDrop(loadFilterSelectedItem.value);
    reloadFilterList();
  };

  const handleLoadDeleteCancelBtn = () => {
    console.log('handleLoadDeleteCancelBtn()');
    setDeleteFilterConfirm(false);
  };

  //#endregion

  //#region "validators"
  const saveFilterNameValid = (v) => {
    console.log('saveFilterNameValid() ', v);
    if (!v) return false;
    const pattern = /^(?=.*[^\W_])[\w ]*$/;
    if (v && v.length <= 30 && pattern.test(v) && !localStorageGet(v)) return true;
    return false;
  };
  //#endregion

  //#region "local storage"

  const filterConfigKey = 'filter.configuration.list';
  const latestFilterKey = 'filter.configuration.latest';

  const localStorageGetAll = () => {
    console.log('localStorageGetAll()');
    const resultString = localStorage.getItem(filterConfigKey);
    if (!resultString) return [];
    const result = JSON.parse(resultString);
    return Array.isArray(result) ? result : [];
  };

  const localStorageGet = (name) => {
    console.log('localStorageGet()');
    const resultString = localStorage.getItem(filterConfigKey);
    if (!resultString) return null;
    const result = JSON.parse(resultString);
    return Array.isArray(result) ? result.filter((x) => x.name === name)[0] : null;
  };

  const localStorageSet = (name, filterConfiguration) => {
    console.log('localStorageSet()');
    const resultString = localStorage.getItem(filterConfigKey);
    const result = resultString ? JSON.parse(resultString) : [];
    if (!Array.isArray(result)) return;
    let resultClone = result.filter((x) => x.name !== name);
    resultClone.push({ name, filterConfiguration });
    localStorage.setItem(filterConfigKey, JSON.stringify(resultClone));
  };

  const localStorageDrop = (name) => {
    console.log('localStorageDrop()');
    const resultString = localStorage.getItem(filterConfigKey);
    if (!resultString) return;
    const result = JSON.parse(resultString);
    if (!Array.isArray(result)) return;
    const resultClone = result.filter((x) => x.name !== name);
    localStorage.setItem(filterConfigKey, JSON.stringify(resultClone));
  };

  const localStorageGetLatestFilter = (filterConfiguration) => {
    console.log('localStorageGetLatestFilter');
    const latestFilterStr = localStorage.getItem(latestFilterKey);
    if (latestFilterStr) {
      return JSON.parse(latestFilterStr);
    }
  };

  const localStorageSetLatestFilter = (filterConfiguration) => {
    console.log('localStorageSetLatestFilter');
    localStorage.setItem(latestFilterKey, JSON.stringify(filterConfiguration));
  };

  const localStorageDropLatestFilter = () => {
    console.log('localStorageDropLatestFilter');
    localStorage.removeItem(latestFilterKey);
  };

  //#endregion

  //#region "misc"

  const reloadFilterList = () => {
    console.log('reloadFilterList()');
    const itemList = localStorageGetAll();
    const itemList1 = itemList.map((x) => {
      return { value: x.name, label: x.name };
    });
    console.log(itemList1);
    setLoadFilterItemList(itemList1);
    setLoadFilterSelectedItem(null);
  };

  const applySubRegionList = (region) => {
    console.log('applySubRegionList()');
    if (!Array.isArray(region) || region.length === 0) {
      setSubregionValueList([]);
      return;
    }
    let result = [];
    for (const item of region) {
      const subregionList = regionList[item.value];
      if (Array.isArray(subregionList)) {
        for (const subregion of subregionList) {
          result.push({ value: `${item.value}/${subregion}`, label: `${item.value}/${subregion}` });
        }
      }
    }
    setSubregionValueList(result);
  };

  const removeSelectedSubregionsForNotSelectedRegions = (region, subRegion) => {
    console.log('removeSelectedSubregionsForNotSelectedRegions()');

    let result = [];
    if (!Array.isArray(region)) return [];
    if (!Array.isArray(subRegion)) return [];
    for (const item of region) {
      for (const item1 of subRegion) {
        if (item1.value.startsWith(item.value)) {
          result.push(item1);
        }
      }
    }
    return result;
  };

  const applySubCategoryList = (category) => {
    console.log('applySubCategoryList()');
    if (!Array.isArray(category) || category.length === 0) {
      setSubcategoryValueList([]);
      return;
    }
    let result = [];
    for (const item of category) {
      const subcategoryList = requestTypeList[item.value];
      if (Array.isArray(subcategoryList)) {
        for (const subcategory of subcategoryList) {
          result.push({ value: subcategory, label: subcategory });
        }
      }
    }
    setSubcategoryValueList(result);
  };

  const removeSelectedSubcategoriesForNotSelectedCategories = (category, subcategory) => {
    console.log('removeSelectedSubcategoriesForNotSelectedCategories()');
    //debugger;
    let result = [];
    if (!Array.isArray(category)) return [];
    if (!Array.isArray(subcategory)) return [];
    for (const item of category) {
      for (const item1 of subcategory) {
        if (requestTypeList[item.value] && requestTypeList[item.value].includes(item1.value)) {
          result.push(item1);
        }
      }
    }
    return result;
  };

  //#endregion

  return (
    <>
      {/* <Header> */}
      <Navbar color="light">
        <span style={{ fontWeight: '600' }}>
          <IoIosFunnel style={{ marginRight: '4px' }} />
          Filter configuration
        </span>
        <Nav className="ml-auto" navbar>
          <Dropdown isOpen={menuOpen} toggle={toggleMenuOpen}>
            <DropdownToggle caret>
              <IoIosMenu />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={handleMenuOptionLoad}>
                <IoIosFolderOpen /> Filter list...
              </DropdownItem>
              <DropdownItem onClick={handleMenuOptionSave}>
                <IoMdSave /> Save filter as...
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleMenuOptionClear}>
                <IoIosBackspace /> Clear filter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
      {/* </Header> */}

      {/* <Load filter> */}
      {formMode === 'load' && (
        <Form className="p-3" style={deleteFilterConfirm ? { backgroundColor: 'mistyrose' } : { backgroundColor: 'antiquewhite' }}>
          <Label>Filter list</Label>
          <Select
            isDisabled={deleteFilterConfirm}
            noOptionsMessage={() => 'No filters configured yet'}
            className="mb-3"
            options={loadFilterItemList}
            isMulti={false}
            isSearchable={true}
            value={loadFilterSelectedItem}
            onChange={(v) => {
              setLoadFilterSelectedItem(v);
              const f = localStorageGet(v.value);
              if (f && f.filterConfiguration) {
                setCurrentFilter(f.filterConfiguration);
                setFilterChanged(true);
                applySubRegionList(f.filterConfiguration.region);
              }
            }}
          />
          {!deleteFilterConfirm && (
            <FormGroup style={{ textAlign: 'center' }} inline>
              <Button outline size="sm" color="primary" className="ml-2" onClick={handleLoadApplyBtn} disabled={!loadFilterSelectedItem}>
                <IoMdFlash /> Apply
              </Button>
              <Button outline size="sm" color="danger" className="ml-2" onClick={handleLoadDeleteBtn} disabled={!loadFilterSelectedItem}>
                <IoMdRemoveCircleOutline /> Delete
              </Button>
              <Button outline size="sm" color="secondary" className="ml-2" onClick={handleLoadCloseBtn}>
                <IoMdClose /> Close
              </Button>
            </FormGroup>
          )}
          {deleteFilterConfirm && (
            <FormGroup style={{ textAlign: 'center' }} inline>
              <Button outline size="sm" color="secondary" className="ml-2" onClick={handleLoadDeleteCancelBtn}>
                <IoMdClose /> Cancel
              </Button>
              <Button outline size="sm" color="danger" className="ml-2" onClick={handleLoadDeleteConfirmBtn} disabled={!loadFilterSelectedItem}>
                <IoMdRemoveCircleOutline /> Confirm delete
              </Button>
            </FormGroup>
          )}
        </Form>
      )}
      {/* </Load filter> */}

      {/* <Save filter> */}
      {formMode === 'save' && (
        <Form className="p-3" style={{ backgroundColor: 'antiquewhite' }}>
          <Label>Save filter as</Label>
          <Input type="text" className="form-control" placeholder="Enter a name" value={saveFilterName} onChange={handleSaveFilterNameChanged} />
          {saveFilterName && !saveFilterNameValid(saveFilterName) && <span style={{ color: 'red', fontWeight: '600' }}>Please enter a valid and unique value</span>}
          <FormGroup style={{ textAlign: 'center' }} className="mt-3" inline>
            <Button outline size="sm" color="primary" className="ml-2" onClick={handleSaveOkBtn} disabled={!saveFilterNameValid(saveFilterName)}>
              <IoMdCheckmark /> Save
            </Button>
            <Button outline size="sm" color="secondary" className="ml-2" onClick={handleSaveCancelBtn}>
              <IoMdClose /> Cancel
            </Button>
          </FormGroup>
        </Form>
      )}
      {/* </Save filter> */}

      {/* <Filter configuration> */}
      <div className={formMode === 'edit' ? '' : 'disabled'}>
        <div className="p-3">
          <div className="mb-3">
            Status
            <Select
              options={statusValueList}
              isMulti={true}
              isSearchable={true}
              value={currentFilter.status}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.status = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
            <Label check className="ml-4">
              <Input
                type="checkbox"
                checked={currentFilter.isDeleted}
                onChange={(v) => {
                  console.log(v.target.checked);
                  let cf = { ...currentFilter };
                  cf.isDeleted = v.target.checked;
                  setCurrentFilter(cf);
                  setFilterChanged(true);
                }}
              />{' '}
              Show deleted only
            </Label>
          </div>

          <div className="mb-3">
            Created
            <Select
              isClearable={true}
              options={createdValueList}
              isMulti={false}
              isSearchable={true}
              value={currentFilter.createdAt}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.createdAt = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Request type
            <Select
              options={requestTypeValueList}
              isMulti={true}
              isSearchable={true}
              value={currentFilter.requestType}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.requestType = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Handled
            <Select
              options={handledValueList}
              isMulti={true}
              isSearchable={true}
              value={currentFilter.handled}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.handled = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Region
            <Select
              isDisabled={regionFixed}
              options={regionValueList}
              isMulti={true}
              isSearchable={true}
              value={currentFilter.region}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.region = v;
                cf.subRegion = removeSelectedSubregionsForNotSelectedRegions(cf.region, cf.subRegion);
                setCurrentFilter(cf);
                setFilterChanged(true);
                applySubRegionList(cf.region);
              }}
            />
          </div>

          <div className="mb-3">
            Territory
            <Select
              options={subregionValueList}
              isMulti={true}
              isSearchable={true}
              value={currentFilter.subRegion}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.subRegion = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Category
            <Select
              options={categoryValueList}
              isMulti={true}
              isSearchable={true}
              value={currentFilter.category}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.category = v;
                cf.subCategory = removeSelectedSubcategoriesForNotSelectedCategories(cf.category, cf.subCategory);
                setCurrentFilter(cf);
                setFilterChanged(true);
                applySubCategoryList(cf.category);
              }}
            />
          </div>

          <div className="mb-3">
            Sub-category
            <Select
              options={subcategoryValueList}
              isMulti={true}
              isSearchable={true}
              value={currentFilter.subCategory}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.subCategory = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Product
            <Select
              options={productValueList}
              isMulti={true}
              isSearchable={true}
              value={currentFilter.product}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.product = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Market segment
            <Select
              options={marketSegmentValueList}
              isMulti={true}
              isSearchable={true}
              value={currentFilter.segment}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.segment = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Requester name
            <UsersSelect
              isDisabled={requesterFixed}
              token={query && query.token ? query.token : null}
              initialValue={currentFilter.requester}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.requester = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Program manager
            <UsersSelect
              token={query && query.token ? query.token : null}
              initialValue={currentFilter.programManager}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.programManager = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Team member
            <UsersSelect
              isDisabled={requesterFixed}
              token={query && query.token ? query.token : null}
              initialValue={currentFilter.teamMember}
              onChange={(v) => {
                console.log(v);
                let cf = { ...currentFilter };
                cf.teamMember = v;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          <div className="mb-3">
            Customer name
            <Input
              placeholder="Enter a name"
              value={currentFilter.customerName || ''}
              onChange={(e) => {
                console.log(e.target.value);
                let cf = { ...currentFilter };
                cf.customerName = e.target.value;
                setCurrentFilter(cf);
                setFilterChanged(true);
              }}
            />
          </div>

          {filterChanged && formMode === 'edit' && (
            <div className="request-filter-floating-button">
              <Button color="primary" onClick={handleApplyFilters}>
                <IoMdFlash /> Apply filter
              </Button>
            </div>
          )}

          <div className="request-filter-floating-button-bottom-placeholder"></div>
        </div>
      </div>

      {/* </Filter configuration> */}
    </>
  );
}
