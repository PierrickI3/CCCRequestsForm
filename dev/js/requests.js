let apiBasePath;
const maintenanceMode = false; // Set to true to disable all controls
var filterConfiguration = null;
const stakeholdersEmailsClear = { loadedFromDb: [], temp: [], toBeSaved: [] };
var stakeholdersEmails = null;
var currentRequestType = 0;

if (window.location.href.includes('localhost')) apiBasePath = 'http://localhost:3000';
else apiBasePath = 'https://drbojb15ma.execute-api.eu-central-1.amazonaws.com/dev';

async function postRequests(region, subRegion, segment, product, tasks, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, oppName, oppUrl, oppDSRUrl, oppOwner, oppPartnerCustomerName, oppAssignedSC, oppAssignedSCMail, _token, customerRelationship, customerType) {
  console.log('Mail Distribution:', mailDistribution[product][$('#region').val()]);
  var data = {
    region: region,
    subRegion: subRegion,
    segment: segment,
    product: product,
    tasks: tasks,
    requesterName: requesterName,
    requesterEmail: requesterEmail,
    requesterPhoneNumber: requesterPhoneNumber,
    needCompletedBy: needCompletedBy,
    description: description,
    status: 'Open',
    isDeleted: false,
    mailDistribution: mailDistribution[product][$('#region').val()],
    token: _token,
  };

  // override Test objects
  if (window.location.href.includes('localhost')) {
    data.mailDistribution = requesterEmail;
    data.isTest = true;
  }

  //#region Optional fields

  if (customerRelationship.length > 0) {
    data.customerRelationship = customerRelationship;
  }

  if (customerType.length > 0) {
    data.customerType = customerType;
  }

  if (oppName && oppName.length > 0) {
    data.oppName = oppName;
  }

  if (oppUrl && oppUrl.length > 0) {
    data.oppUrl = oppUrl;
  }

  if (oppDSRUrl && oppDSRUrl.length > 0) {
    data.oppDSRUrl = oppDSRUrl;
  }

  if (oppOwner && oppOwner.length > 0) {
    data.oppOwner = oppOwner;
  }

  if (oppPartnerCustomerName && oppPartnerCustomerName.length > 0) {
    data.oppPartnerCustomerName = oppPartnerCustomerName;
  }

  if (oppAssignedSC && oppAssignedSC.length > 0) {
    data.oppAssignedSC = oppAssignedSC;
  }

  if (oppAssignedSCMail && oppAssignedSCMail.length > 0) {
    data.oppAssignedSCMail = oppAssignedSCMail;
  }

  //#endregion

  if (currentRequestType == 1) {
    // Include FreeTrial Fields
    data.requestType = '1';
    data.tasks = [{ taskCategory: 'Demo & Trial Support', taskId: 0, taskTime: 0, taskType: $('#trialValidationType').val() }];
    if ($('#trialValidationType').val()) data.freeTrialValidationType = $('#trialValidationType').val();
    if ($('#trialValidationType').val() !== 'FreeTrial') {
      if ($('#countriesAgents').val().length > 0) data.freeTrialCountriesAgents = $('#countriesAgents').val();
      if ($('#countriesOperation').val().length > 0) data.freeTrialCountriesOperation = $('#countriesOperation').val();

      if ($('#telephonyModel').val()) data.freeTrialTelephonyModel = $('#telephonyModel').val();

      if (countriesAndCarriers.length > 0) data.freeTrialByocCloudCarriers = countriesAndCarriers;

      if ($('#phoneNumbersDeployment').val().length > 0) {
        data.freeTrialPhoneNumbersDeployment = $('#phoneNumbersDeployment').val();
      }
      if ($('#newNumbers').val().length > 0) {
        data.freeTrialNewNumbers = $('#newNumbers').val();
      }
      if ($('#genesysCloudRegion').val()) {
        data.freeTrialGenesysCloudRegion = $('#genesysCloudRegion').val();
      }
      if ($('#estimatedVolumeMinsPerMonth').val().length > 0) {
        data.freeTrialEstimatedVolumeMinsPerMonth = $('#estimatedVolumeMinsPerMonth').val();
      }
      data.freeTrialRelationshipWithCarrier = $('#relationshipWithCarrier').is(':checked');
      data.freeTrialHyperVEnvironment = $('#hyperVEnvironment').is(':checked');
    }

    // General Configuration

    if ($('#numberAgents').val().length > 0) {
      data.freeTrialNumberAgents = $('#numberAgents').val();
    }
    data.freeTrialExistingTelephonyUsage = $('#existingTelephonyUsage').is(':checked');
    if ($('#existingTelephonyUsageDetails').val().length > 0) {
      data.freeTrialExistingTelephonyUsageDetails = $('#existingTelephonyUsageDetails').val();
    }

    if ($('#identificationAndVerificationProcesses').val().length > 0) {
      data.freeTrialIdentificationAndVerificationProcesses = $('#identificationAndVerificationProcesses').val();
    }

    if ($('#itInfrastructure').val().length > 0) {
      data.freeTrialItInfrastructure = $('#itInfrastructure').val();
    }
    data.freeTrialEndUserDevicesRequireVPN = $('#endUserDevicesRequireVPN').is(':checked');

    if ($('#virtualDesktopSolution').val().length > 0) {
      data.freeTrialVirtualDesktopSolution = $('#virtualDesktopSolution').val();
    }

    // Other

    data.freeTrialCustomerResourceCommitted = $('#customerResourceCommitted').is(':checked');
    data.freeTrialStandardTermsConditions = $('#standardTermsConditions').is(':checked');
    data.freeTrialSolutionBusinessConsultingRequired = $('#solutionBusinessConsultingRequired').is(':checked');
  } else data.requestType = '0';

  console.log(data);

  return await $.ajax({
    url: `${apiBasePath}/requests`,
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 201) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage('Unexpected error: ' + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log('postRequests completed');
    });
}

async function putRequest(id, region, subRegion, segment, product, tasks, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, oppName, oppUrl, oppDSRUrl, oppOwner, oppPartnerCustomerName, oppAssignedSC, oppAssignedSCMail, priority, acceptedRejected, status, programManager, acceptedRejectedNotes, teamMembers, _token, isDeleted, customerRelationship, customerType, dateAccepted, dateRejected, dateClosed, stakeholdersEmails, _requestType) {
  if (!isDeleted) isDeleted = false;
  if (!acceptedRejected) acceptedRejected = 'not handled';

  var data = {
    id: id,
    region: region,
    subRegion: subRegion,
    segment: segment,
    product: product,
    tasks: tasks,
    requesterName: requesterName,
    requesterEmail: requesterEmail,
    requesterPhoneNumber: requesterPhoneNumber,
    needCompletedBy: needCompletedBy,
    description: description,
    status: status,
    acceptedRejected: acceptedRejected,
    dateAccepted: dateAccepted ? dateAccepted : undefined,
    dateRejected: dateRejected ? dateRejected : undefined,
    dateClosed: dateClosed ? dateClosed : undefined,
    isDeleted: isDeleted,
    mailDistribution: mailDistribution[product][$('#editModal #region').val()],
    token: _token,
    stakeholdersEmails,
  };

  //#region Optional fields

  if (teamMembers && teamMembers.length > 0) {
    data.teamMembers = teamMembers;
  }

  if (acceptedRejectedNotes && acceptedRejectedNotes.length > 0) {
    data.acceptedRejectedNotes = acceptedRejectedNotes;
  }

  if (programManager && programManager.length > 0) {
    data.programManager = programManager;
  }

  // if (partnerCustomerName && partnerCustomerName.length > 0) {
  //   data.partnerCustomerName = partnerCustomerName
  // }

  // if (salesforceAccountOpportunity && salesforceAccountOpportunity.length > 0) {
  //   data.salesforceAccountOpportunity = salesforceAccountOpportunity
  // }

  if (priority && priority.length > 0) {
    data.priority = priority;
  }

  if (customerRelationship && customerRelationship.length > 0) {
    data.customerRelationship = customerRelationship;
  }

  if (customerType && customerType.length > 0) {
    data.customerType = customerType;
  }

  if (oppName && oppName.length > 0) {
    data.oppName = oppName;
  }

  if (oppUrl && oppUrl.length > 0) {
    data.oppUrl = oppUrl;
  }

  if (oppDSRUrl && oppDSRUrl.length > 0) {
    data.oppDSRUrl = oppDSRUrl;
  }

  if (oppOwner && oppOwner.length > 0) {
    data.oppOwner = oppOwner;
  }

  if (oppPartnerCustomerName && oppPartnerCustomerName.length > 0) {
    data.oppPartnerCustomerName = oppPartnerCustomerName;
  }

  if (oppAssignedSC && oppAssignedSC.length > 0) {
    data.oppAssignedSC = oppAssignedSC;
  }

  if (oppAssignedSCMail && oppAssignedSCMail.length > 0) {
    data.oppAssignedSCMail = oppAssignedSCMail;
  }

  if (_requestType == 1) {
    // Include FreeTrial Fields
    data.requestType = '1';
    data.tasks = [{ taskCategory: 'Demo & Trial Support', taskId: 0, taskTime: 0, taskType: $('#trialValidationType').val() }];
    if ($('#trialValidationType').val()) data.freeTrialValidationType = $('#trialValidationType').val();
    if ($('#trialValidationType').val() !== 'FreeTrial') {
      if ($('#countriesAgents').val().length > 0) data.freeTrialCountriesAgents = $('#countriesAgents').val();
      if ($('#countriesOperation').val().length > 0) data.freeTrialCountriesOperation = $('#countriesOperation').val();

      if ($('#telephonyModel').val()) data.freeTrialTelephonyModel = $('#telephonyModel').val();

      if (countriesAndCarriers.length > 0) data.freeTrialByocCloudCarriers = countriesAndCarriers;

      if ($('#phoneNumbersDeployment').val().length > 0) {
        data.freeTrialPhoneNumbersDeployment = $('#phoneNumbersDeployment').val();
      }
      if ($('#newNumbers').val().length > 0) {
        data.freeTrialNewNumbers = $('#newNumbers').val();
      }
      if ($('#genesysCloudRegion').val()) {
        data.freeTrialGenesysCloudRegion = $('#genesysCloudRegion').val();
      }
      if ($('#estimatedVolumeMinsPerMonth').val().length > 0) {
        data.freeTrialEstimatedVolumeMinsPerMonth = $('#estimatedVolumeMinsPerMonth').val();
      }
      data.freeTrialRelationshipWithCarrier = $('#relationshipWithCarrier').is(':checked');
      data.freeTrialHyperVEnvironment = $('#hyperVEnvironment').is(':checked');
    }

    // General Configuration

    if ($('#numberAgents').val().length > 0) {
      data.freeTrialNumberAgents = $('#numberAgents').val();
    }
    data.freeTrialExistingTelephonyUsage = $('#existingTelephonyUsage').is(':checked');
    if ($('#existingTelephonyUsageDetails').val().length > 0) {
      data.freeTrialExistingTelephonyUsageDetails = $('#existingTelephonyUsageDetails').val();
    }

    if ($('#identificationAndVerificationProcesses').val().length > 0) {
      data.freeTrialIdentificationAndVerificationProcesses = $('#identificationAndVerificationProcesses').val();
    }

    if ($('#itInfrastructure').val().length > 0) {
      data.freeTrialItInfrastructure = $('#itInfrastructure').val();
    }
    data.freeTrialEndUserDevicesRequireVPN = $('#endUserDevicesRequireVPN').is(':checked');

    if ($('#virtualDesktopSolution').val().length > 0) {
      data.freeTrialVirtualDesktopSolution = $('#virtualDesktopSolution').val();
    }

    // Other

    data.freeTrialCustomerResourceCommitted = $('#customerResourceCommitted').is(':checked');
    data.freeTrialStandardTermsConditions = $('#standardTermsConditions').is(':checked');
    data.freeTrialSolutionBusinessConsultingRequired = $('#solutionBusinessConsultingRequired').is(':checked');
  } else data.requestType = '0';

  //#endregion
  return await $.ajax({
    url: `${apiBasePath}/requests/${id}`,
    method: 'PUT',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage('Unexpected error: ' + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log('putRequest completed');
    });
}

async function getRequests(region = '', _token) {
  let onlyClosed = '';
  let onlyDeleted = '';

  if ($('#btnOnlyClosed')[0].classList.contains('btn-success')) onlyClosed = '&onlyClosed=true';

  if ($('#btnOnlyDeleted')[0].classList.contains('btn-success')) onlyDeleted = '&onlyDeleted=true';

  if (region == 'super-user') region = 'ALL';

  return await $.ajax({
    url: `${apiBasePath}/requests?region=${region}${onlyClosed}${onlyDeleted}&token=${_token}`,
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage('Unexpected error: ' + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log('getRequests completed');
    });
}

async function queryFilteredRequests(filter, _token) {
  return await $.ajax({
    url: `${apiBasePath}/requests/filtered/${_token}`,
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(filter),
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage('Unexpected error: ' + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log('queryFilteredRequests completed');
    });
}

async function deleteRequest(requestId, _token) {
  console.log('Deleting request:', requestId);

  let data = {
    isDeleted: true,
    token: _token,
  };

  return await $.ajax({
    url: `${apiBasePath}/requests/${requestId}`,
    method: 'PATCH',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage('Unexpected error: ' + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log('deleteRequest completed');
    });
}

async function getDashboard(_token, _start, _end) {
  let requestType,
    sExtendedFilter = '';
  if ($('#requestType').val() !== '') requestType = $('#requestType').val();

  if (requestType) sExtendedFilter = `&requestType=${requestType}`;

  return await $.ajax({
    url: `${apiBasePath}/dashboard?token=${_token}&start=${_start}&end=${_end}${sExtendedFilter}`,
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage('Unexpected error: ' + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log('getDashboard completed');
    });
}

async function getExport(_region, _subRegion, _product, _segment, _token, _start, _end) {
  var sFilter = '';
  let requestType = '';

  if (_region) sFilter = sFilter + `region=${_region}&`;
  if (_product) sFilter = sFilter + `product=${_product}&`;
  if (_segment) sFilter = sFilter + `segment=${_segment}&`;
  if (_subRegion) sFilter = sFilter + `subRegion=${_subRegion}&`;
  if ($('#customerRelationship').val() !== '') sFilter = sFilter + `customerRelationship=${$('#customerRelationship').val()}&`;
  if ($('#customerType').val() !== '') sFilter = sFilter + `customerType=${$('#customerType').val()}&`;
  if ($('#requestType').val() !== '') sFilter += `requestType=${$('#requestType').val()}&`;

  console.log(`getExport with filter: ${sFilter}`);

  return await $.ajax({
    url: `${apiBasePath}/export?${sFilter}token=${_token}&start=${_start}&end=${_end}`,
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage('Unexpected error: ' + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log('getRequests completed');
    });
}

async function getOpportunityDSR(_token, _id) {
  return await $.ajax({
    url: `${apiBasePath}/sf/opportunities/${_id}/dsr?token=${_token}`,
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage('Unexpected error: ' + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log('getRequests completed');
    });
}

function filterExpand() {
  $('#filter-sidebar-label').hide();

  $('#filter-sidebar').removeClass('filter-sidebar-collapsed');
  $('#filter-sidebar').addClass('filter-sidebar-expanded');

  $('#filter-sidebar-addon').show();
  $('#filter-sidebar-addon').addClass('animate__animated');
  $('#filter-sidebar-addon').addClass('animate__faster');
  $('#filter-sidebar-addon').addClass('animate__slideInRight');

  setTimeout(function () {
    $('#filter-sidebar-button-expand').hide();
    $('#filter-sidebar-button-collapse').show();
  }, 500);
}

function filterCollapse() {
  $('#filter-sidebar-addon').removeClass('animate__slideInRight');
  $('#filter-sidebar-addon').addClass('animate__slideOutRight');

  setTimeout(function () {
    $('#filter-sidebar-label').show();

    $('#filter-sidebar-addon').removeClass('animate__slideOutRight');

    $('#filter-sidebar').removeClass('filter-sidebar-expanded');
    $('#filter-sidebar').addClass('filter-sidebar-collapsed');

    $('#filter-sidebar-button-expand').show();
    $('#filter-sidebar-button-collapse').hide();
    $('#filter-sidebar-addon').hide();
  }, 500);
}

async function filterHandleOnMessageEvent(event) {
  console.log('filterHandleOnMessageEvent() ', event);
  if (!event || !event.eventName) {
    return;
  } else if (event.eventName === 'applyFilter' && event.customData) {
    console.log(`Event [${event.eventName}] received: `, event.customData);
    filterConfiguration = event.customData;
    refreshGrid();
  } else if (event.eventName === 'clearFilter') {
    console.log(`Event [${event.eventName}] received.`);
    filterConfiguration = null;
    refreshGrid();
  }
}

function getSearchUserBody(pattern) {
  console.log(`searchUser([${pattern}])`);
  const patternParsed = pattern.split(' ');
  let query = [{ type: 'EXACT', fields: ['state'], value: 'active' }];
  for (const item of patternParsed) {
    if (!item) continue;
    query.push({ type: 'QUERY_STRING', fields: ['name', 'email', 'title', 'department'], value: item });
  }
  const body = {
    pageSize: 5,
    pageNumber: 1,
    types: ['users'],
    query,
    sortOrder: 'ASC',
    sortBy: 'name',
  };
  return body;
}

function updateStakeholdersEmailsTemp(name, email) {
  console.log(`updateStakeholdersEmails([${name}],[${email}])`);
  if (!name || !email || stakeholdersEmails.temp.filter((x) => x.name === name)[0]) return;
  stakeholdersEmails.temp.push({ name, email });
  console.log('stakeholdersEmails.temp: ', stakeholdersEmails.temp);
}

function processStakeholdersEmails(programManager, teamMembers) {
  console.log('processtakeholdersEmails() ', programManager, teamMembers);
  if (!programManager && (!Array.isArray(teamMembers) || teamMembers.length) === 0) return;

  // <step #1 - remove deleted items>
  if (Array.isArray(stakeholdersEmails.loadedFromDb) && stakeholdersEmails.loadedFromDb.length > 0) {
    for (const loaded of stakeholdersEmails.loadedFromDb) {
      if (!stakeholdersEmails.toBeSaved.filter((x) => x.name === loaded.name)[0]) {
        if (programManager === loaded.name || teamMembers.filter((x) => x.text === loaded.name)[0]) {
          stakeholdersEmails.toBeSaved.push(loaded);
        }
      }
    }
  }
  // </step #1 - remove deleted items>

  // <step #2 - push added items>
  // programManager
  if (!stakeholdersEmails.toBeSaved.filter((x) => x.name === programManager)[0] && stakeholdersEmails.temp.filter((x) => x.name === programManager)[0]) {
    stakeholdersEmails.toBeSaved.push(stakeholdersEmails.temp.filter((x) => x.name === programManager)[0]);
  }
  // teamMembers
  for (const tm of teamMembers) {
    if (!stakeholdersEmails.toBeSaved.filter((x) => x.name === tm.text)[0] && stakeholdersEmails.temp.filter((x) => x.name === tm.text)[0]) {
      stakeholdersEmails.toBeSaved.push(stakeholdersEmails.temp.filter((x) => x.name === tm.text)[0]);
    }
  }
  // </step #2 - push added items>

  console.log('stakeholdersEmails.toBeSaved: ', stakeholdersEmails.toBeSaved);
}

function setRequestFormType(type /* 0 - standard, 1 - free trial */) {
  console.log(`setRequestFormType(${type})`);
  currentRequestType = type;

  switch (type) {
    case 0:
      $('#task-list').show();
      $('#free-trial-questions').hide();
      $('#home-tab')[0].classList.add('active');
      $('#profile-tab')[0].classList.remove('active');
      $('#trial')[0].classList.remove('show');
      $('#trial')[0].classList.remove('active');
      $('#standard')[0].classList.add('show');
      $('#standard')[0].classList.add('active');
      break;
    case 1:
      $('#task-list').hide();
      $('#free-trial-questions').show();
      $('#profile-tab')[0].classList.add('active');
      $('#home-tab')[0].classList.remove('active');
      $('#standard')[0].classList.remove('show');
      $('#standard')[0].classList.remove('active');
      $('#trial')[0].classList.add('show');
      $('#trial')[0].classList.add('active');

      break;
    default: {
      console.error('unhandled request type: ', type);
    }
  }
}
