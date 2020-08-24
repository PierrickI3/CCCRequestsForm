import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Form, FormGroup, Input } from "reactstrap";
import { raiseEvent } from "../../services/iFrameEvents";
import { IoIosMenu, IoMdSave, IoIosFolderOpen, IoMdFlash, IoMdCheckmark, IoMdClose, IoMdRemoveCircleOutline, IoMdOpen, IoIosBackspace } from "react-icons/io";
import Select from "react-select";
import queryString from "query-string";
import { regionList } from "../../services/dictionary";
import UsersSelect from "../UsersSelect/UsersSelect";

export default function RequestsFilter(props) {
  //#region "value lists"
  const statusValueList = [
    { value: "Open", label: "Open" },
    { value: "On Hold", label: "On Hold" },
    { value: "Waiting On Additional Information", label: "Waiting On Additional Information" },
    { value: "Closed", label: "Closed" },
  ];

  const handledValueList = [
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
    { value: "Unhandled", label: "Unhandled" },
  ];

  const regionValueList = [
    { value: "APAC", label: "APAC" },
    { value: "EMEA", label: "EMEA" },
    { value: "LATAM", label: "LATAM" },
    { value: "NA", label: "NA" },
  ];

  const marketSegmentValueList = [
    { value: "Mid-market", label: "Mid-market" },
    { value: "Commercial", label: "Commercial" },
    { value: "Enterprise", label: "Enterprise" },
  ];
  //#endregion

  //#region "state"
  const clearFilterSet = { status: null, handled: null, region: null };
  const [query, setQuery] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMode, setFormMode] = useState("edit"); // values: edit, save, load
  const [saveFilterName, setSaveFilterName] = useState("");
  const [loadFilterSelectedItem, setLoadFilterSelectedItem] = useState(null);
  const [loadFilterItemList, setLoadFilterItemList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(clearFilterSet);
  const [regionFixed, setRegionFixed] = useState(false);
  const [subregionValueList, setSubregionValueList] = useState([]);
  //#endregion

  //#region "initialization"

  useEffect(() => {
    // <parse query string>
    const parsedQueryString = queryString.parse(props.location.search);
    console.log("parsedQueryString", parsedQueryString);
    setQuery(parsedQueryString);
    // </parse query string>

    // <intialize filter>
    if (parsedQueryString && parsedQueryString.region && parsedQueryString.region.toLowerCase() !== "super-user") {
      console.log("region will be set to: ", parsedQueryString.region);
      let cf = { ...currentFilter };
      cf.region = [{ value: parsedQueryString.region, label: parsedQueryString.region }];
      setCurrentFilter(cf);
      setRegionFixed(true);
      applySubRegionList(cf.region);
    }
    // </intialize filter>

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region "controls handlers"
  const toggleMenuOpen = () => setMenuOpen((prevState) => !prevState);

  const handleApplyFilters = () => {
    console.log("handleApplyFilters()");
    raiseEvent("applyFilter", { prop1: "val1", prop2: "val2" });
  };

  const handleMenuOptionLoad = () => {
    console.log("handleMenuOptionLoad()");
    reloadFilterList();
    setFormMode("load");
  };

  const handleMenuOptionSave = () => {
    console.log("handleMenuOptionSave()");
    setFormMode("save");
  };

  const handleMenuOptionClear = () => {
    console.log("handleMenuOptionClear()");
    setCurrentFilter(clearFilterSet);
  };

  const handleSaveOkBtn = () => {
    console.log("handleSaveOkBtn()");
    localStorageSet(saveFilterName, currentFilter);
    setSaveFilterName("");
    setFormMode("edit");
  };

  const handleSaveCancelBtn = () => {
    console.log("handleSaveCancelBtn()");
    setSaveFilterName("");
    setFormMode("edit");
  };

  const handleSaveFilterNameChanged = (v) => {
    console.log("handleSaveFilterNameChanged() ", v.target.value);
    setSaveFilterName(v.target.value);
  };

  const handleLoadOkBtn = () => {
    console.log("handleLoadOkBtn()");
    const f = localStorageGet(loadFilterSelectedItem.value);
    if (f && f.filterConfiguration) setCurrentFilter(f.filterConfiguration);
    setFormMode("edit");
    setLoadFilterSelectedItem(null);
  };

  const handleLoadDeleteBtn = () => {
    console.log("handleLoadDeleteBtn()");
    localStorageDrop(loadFilterSelectedItem.value);
    reloadFilterList();
  };

  const handleLoadCancelBtn = () => {
    console.log("handleLoadCancelBtn()");
    setFormMode("edit");
    setLoadFilterSelectedItem(null);
  };

  //#endregion

  //#region "validators"
  const saveFilterNameValid = (v) => {
    console.log("saveFilterNameValid() ", v);
    if (!v) return false;
    const pattern = /^(?=.*[^\W_])[\w ]*$/;
    if (v && v.length <= 30 && pattern.test(v) && !localStorageGet(v)) return true;
    return false;
  };
  //#endregion

  //#region "local storage"

  const filterConfigKey = "filter.configuration.list";

  const localStorageGetAll = () => {
    console.log("localStorageGetAll()");
    const resultString = localStorage.getItem(filterConfigKey);
    if (!resultString) return [];
    const result = JSON.parse(resultString);
    return Array.isArray(result) ? result : [];
  };

  const localStorageGet = (name) => {
    console.log("localStorageGet()");
    const resultString = localStorage.getItem(filterConfigKey);
    if (!resultString) return null;
    const result = JSON.parse(resultString);
    return Array.isArray(result) ? result.filter((x) => x.name === name)[0] : null;
  };

  const localStorageSet = (name, filterConfiguration) => {
    console.log("localStorageSet()");
    const resultString = localStorage.getItem(filterConfigKey);
    const result = resultString ? JSON.parse(resultString) : [];
    if (!Array.isArray(result)) return;
    let resultClone = result.filter((x) => x.name !== name);
    resultClone.push({ name, filterConfiguration });
    localStorage.setItem(filterConfigKey, JSON.stringify(resultClone));
  };

  const localStorageDrop = (name) => {
    console.log("localStorageDrop()");
    const resultString = localStorage.getItem(filterConfigKey);
    if (!resultString) return;
    const result = JSON.parse(resultString);
    if (!Array.isArray(result)) return;
    const resultClone = result.filter((x) => x.name !== name);
    localStorage.setItem(filterConfigKey, JSON.stringify(resultClone));
  };
  //#endregion

  //#region "misc"

  const reloadFilterList = () => {
    console.log("reloadFilterList()");
    const itemList = localStorageGetAll();
    const itemList1 = itemList.map((x) => {
      return { value: x.name, label: x.name };
    });
    console.log(itemList1);
    setLoadFilterItemList(itemList1);
    setLoadFilterSelectedItem(null);
  };

  const applySubRegionList = (region) => {
    console.log("applySubRegionList()");
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
    console.log("removeSelectedSubregionsForNotSelectedRegions()");

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

  //#endregion

  return (
    <>
      {/* <Header> */}
      <Navbar color="light">
        <span style={{ fontWeight: "600" }}>Filter configuration</span>
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
      {formMode === "load" && (
        <Form className="p-3" style={{ backgroundColor: "antiquewhite" }}>
          <Label>Filter list</Label>
          <Select
            noOptionsMessage={() => "No filters configured yet"}
            className="mb-3"
            options={loadFilterItemList}
            isMulti={false}
            isSearchable={true}
            value={loadFilterSelectedItem}
            onChange={(v) => {
              setLoadFilterSelectedItem(v);
            }}
          />
          <FormGroup inline>
            <Button outline size="sm" color="primary" className="ml-2" onClick={handleLoadOkBtn} disabled={!loadFilterSelectedItem}>
              <IoMdOpen /> Load
            </Button>
            <Button outline size="sm" color="danger" className="ml-2" onClick={handleLoadDeleteBtn} disabled={!loadFilterSelectedItem}>
              <IoMdRemoveCircleOutline /> Delete
            </Button>
            <Button outline size="sm" color="secondary" className="ml-2" onClick={handleLoadCancelBtn}>
              <IoMdClose /> Cancel
            </Button>
          </FormGroup>
        </Form>
      )}
      {/* </Load filter> */}

      {/* <Save filter> */}
      {formMode === "save" && (
        <Form className="p-3" style={{ backgroundColor: "antiquewhite" }}>
          <Label>Save filter as</Label>
          <Input type="text" className="form-control" placeholder="Enter a name" value={saveFilterName} onChange={handleSaveFilterNameChanged} />
          {saveFilterName && !saveFilterNameValid(saveFilterName) && <span style={{ color: "red", fontWeight: "600" }}>Please enter a valid and unique value</span>}
          <FormGroup className="mt-3" inline>
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
      <div className={formMode === "edit" ? "" : "disabled"}>
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
              }}
            />
          </div>

          <div className="mb-3">
            Requester name
            <UsersSelect token={query && query.token ? query.token : null} />
          </div>

          <div className="mb-3">
            <Button outline onClick={handleApplyFilters}>
              <IoMdFlash /> Apply filter
            </Button>
          </div>
        </div>
      </div>

      {/* </Filter configuration> */}
    </>
  );
}
