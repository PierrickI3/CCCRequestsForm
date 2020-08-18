import React from 'react';
import { Button } from 'reactstrap';
import {raiseEvent} from '../../services/iFrameEvents'

export default function RequestsFilter(props) {

 const  handleApplyFilters = () => {
    console.log('handleApplyFilters()');
    raiseEvent('applyFilter', {prop1: 'val1', prop2: 'val2'});
  }

  return (
    <>
      <h1>Filters</h1>
      <p>....</p>
      <p>....</p>
      <p>....</p>
      <p><Button onClick={handleApplyFilters}>Apply filters</Button></p>      
    </>
  );
}