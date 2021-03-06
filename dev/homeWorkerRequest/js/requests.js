let apiBasePath;
const maintenanceMode = false; // Set to true to disable all controls

if (window.location.href.includes('localhost'))
  apiBasePath = "http://localhost:3000"
else
  apiBasePath = "https://drbojb15ma.execute-api.eu-central-1.amazonaws.com/dev";

//#region Homeworker reuqests
async function postRequests() {
  console.log('postRequests()');

  var data = {
    countriesAgents: $("#countriesAgents").val(),
    countriesOperation: $("#countriesOperation").val(),

    // Telephony
    existingTelephonyUsage: $("#existingTelephonyUsage").is(':checked'),
    telephonyModel: $("#telephonyModel").val(),
    byocCloudCarriers: countriesAndCarriers,
    relationshipWithCarrier: $("#relationshipWithCarrier").is(':checked'),
    customerResourceCommitted: $("#customerResourceCommitted").is(':checked'),
    hyperVEnvironment: $("#hyperVEnvironment").is(':checked'),

    // General Configuration
    numberAgents: $("#numberAgents").val(),
    numberConcurrentCalls: $("#numberConcurrentCalls").val(),
    callFlowsDocumented: $("#callFlowsDocumented").is(':checked'),
    emailFlowDocumented: $("#emailFlowDocumented").is(':checked'),
    promptsAvailable: $("#promptsAvailable").is(':checked'),
    identificationAndVerificationProcesses: $("#identificationAndVerificationProcesses").val(),
    itInfrastructure: $("#itInfrastructure").val(),
    networkAssessmentTool: $("#networkAssessmentTool").is(':checked'),
    usersInternetBandwidth: $("#usersInternetBandwidth").is(':checked'),
    endUserDevicesRequireVPN: $("#endUserDevicesRequireVPN").is(':checked'),
    virtualDesktopSolution: $("#virtualDesktopSolution").val(),
    googleChatBot: $("#googleChatBot").is(':checked'),

    // Policies & Processes
    standardTermsConditions: $("#standardTermsConditions").is(':checked'),
    offBoardingPolicy: $("#offBoardingPolicy").is(':checked'),
    changeManagementProcessDelays: $("#changeManagementProcessDelays").is(':checked'),

    // Your info
    region: $("#region").val(),
    subRegion: $("#subRegion").val(),
    requesterName: $("#requesterName").val(),
    requesterEmail: $("#requesterEmail").val(),
    requesterPhoneNumber: $("#requesterPhoneNumber").val(),
    notes: $("#notes").val(),
    partnerCustomerName: $("#partnerCustomerName").val(),

    status: "Open",
    isDeleted: false,
    mailDistribution: mailDistribution['Genesys Cloud'][$("#region").val()],
    token: gcToken
  };

  //#region Optional fields

  // Need completed by
  let needCompletedBy = "Not Set";
  let needCompletedByDate = moment($("#datepicker").datepicker('getDate')).format("YYYY-MM-DDT00:00:00.000");
  if (needCompletedByDate != "Invalid date") {
    needCompletedBy = moment($("#datepicker").datepicker('getDate')).format("YYYY-MM-DDT00:00:00.000") + "Z";
  }
  data.needCompletedBy = needCompletedBy;

  if ($("#genesysCloudRegion").val()) {
    data.genesysCloudRegion = $("#genesysCloudRegion").val()
  }

  if ($("#estimatedVolumeMinsPerMonth").val().length > 0) {
    data.estimatedVolumeMinsPerMonth = $("#estimatedVolumeMinsPerMonth").val()
  }

  if ($("#salesforceAccountOpportunity").val().length > 0) {
    data.salesforceAccountOpportunity = $("#salesforceAccountOpportunity").val()
  }

  if ($("#phoneNumbersDeployment").val().length > 0) {
    data.phoneNumbersDeployment = $("#phoneNumbersDeployment").val()
  }

  if ($("#newNumbers").val().length > 0) {
    data.newNumbers = $("#newNumbers").val();
  }

  if ($("#existingTelephonyUsage").is(':checked') && $("#existingTelephonyUsageDetails").val().length > 0) {
    data.existingTelephonyUsageDetails = $("#existingTelephonyUsageDetails").val();
  }

  if ($("#emailInfrastructure").val().length > 0) {
    data.emailInfrastructure = $("#emailInfrastructure").val();
  }

  if ($("#customerRelationship").val().length > 0) {
    data.customerRelationship = $("#customerRelationship").val();
  }

  if ($("#customerType").val().length > 0) {
    data.customerType = $("#customerType").val();
  }

  if ($("#solutionBusinessConsultingRequired")) {
    data.solutionBusinessConsultingRequired = $("#solutionBusinessConsultingRequired").is(':checked');
  }

  if ($("#nonProfitOrganization")) {
    data.nonProfitOrganization = $("#nonProfitOrganization").is(':checked');
  }

  //#endregion

  console.log(data);

  // override Test objects
  if (window.location.href.includes('localhost')) {
    data.mailDistribution = $("#requesterEmail").val();
    data.isTest = true
  }

  //#endregion

  return await $.ajax({
    url: `${apiBasePath}/homeworkerrequests`,
    method: "POST",
    contentType: 'application/json',
    dataType: "json",
    data: JSON.stringify(data)
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 201) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("postRequests completed");
    });


}

async function putRequest() {

  let id = $("#editModal #id").text();

  var data = {
    countriesAgents: $("#editModal #countriesAgents").val(),
    countriesOperation: $("#editModal #countriesOperation").val(),

    // Telephony
    existingTelephonyUsage: $("#editModal #existingTelephonyUsage").is(':checked'),
    telephonyModel: $("#editModal #telephonyModel").val(),
    byocCloudCarriers: countriesAndCarriers,
    relationshipWithCarrier: $("#editModal #relationshipWithCarrier").is(':checked'),

    //nonGeographicNumbersReRouting: $("#nonGeographicNumbersReRouting").val(),
    customerResourceCommitted: $("#editModal #customerResourceCommitted").is(':checked'),
    hyperVEnvironment: $("#editModal #hyperVEnvironment").is(':checked'),
    estimatedVolumeMinsPerMonth: $("#editModal #estimatedVolumeMinsPerMonth").val() || "n/a",
    genesysCloudRegion: $("#editModal #genesysCloudRegion").val() || "n/a",

    // General Configuration
    numberAgents: $("#editModal #numberAgents").val() || "n/a",
    numberConcurrentCalls: $("#editModal #numberConcurrentCalls").val(),
    callFlowsDocumented: $("#editModal #callFlowsDocumented").is(':checked'),
    emailFlowDocumented: $("#editModal #emailFlowDocumented").is(':checked'),
    promptsAvailable: $("#editModal #promptsAvailable").is(':checked'),
    identificationAndVerificationProcesses: $("#editModal #identificationAndVerificationProcesses").val(),
    itInfrastructure: $("#editModal #itInfrastructure").val(),
    networkAssessmentTool: $("#editModal #networkAssessmentTool").is(':checked'),
    usersInternetBandwidth: $("#editModal #usersInternetBandwidth").is(':checked'),
    endUserDevicesRequireVPN: $("#editModal #endUserDevicesRequireVPN").is(':checked'),
    virtualDesktopSolution: $("#editModal #virtualDesktopSolution").val(),
    googleChatBot: $("#editModal #googleChatBot").is(':checked'),


    // Policies & Processes
    standardTermsConditions: $("#editModal #standardTermsConditions").is(':checked'),
    offBoardingPolicy: $("#editModal #offBoardingPolicy").is(':checked'),
    changeManagementProcessDelays: $("#editModal #changeManagementProcessDelays").is(':checked'),

    // Your info
    region: $("#editModal #region").val(),
    subRegion: $("#editModal #subRegion").val(),
    requesterName: $("#editModal #requesterName").val(),
    requesterEmail: $("#editModal #requesterEmail").val(),
    requesterPhoneNumber: $("#editModal #requesterPhoneNumber").val(),
    notes: $("#editModal #notes").val(),


    isDeleted: false,
    mailDistribution: mailDistribution['Genesys Cloud'][$("#editModal #region").val()],
    token: gcToken
  };

  if ($("#editModal #bAcceptedRequest").val() == 'Rejected')
    data.status = "Closed"
  else
    data.status = $("#editModal #status").val();

  if ($("#editModal #bAcceptedRequest").val() !== '') {
    data.acceptedRejected = $("#editModal #bAcceptedRequest").val()
  }

  //#region Optional fields

  // Need completed by
  let needCompletedBy = "Not Set";
  let needCompletedByDate = moment($("#editModal #datepicker").datepicker('getDate')).format("YYYY-MM-DDT00:00:00.000");
  if (needCompletedByDate != "Invalid date") {
    needCompletedBy = moment($("#editModal #datepicker").datepicker('getDate')).format("YYYY-MM-DDT00:00:00.000") + "Z";
  }
  data.needCompletedBy = needCompletedBy;

  if ($("#editModal #salesforceAccountOpportunity").val().length > 0) {
    data.salesforceAccountOpportunity = $("#editModal #salesforceAccountOpportunity").val()
  }

  if ($("#editModal #phoneNumbersDeployment").val().length > 0) {
    data.phoneNumbersDeployment = $("#editModal #phoneNumbersDeployment").val()
  }

  if ($("#editModal #existingTelephonyUsageDetails").val().length > 0) {
    data.existingTelephonyUsageDetails = $("#editModal #existingTelephonyUsageDetails").val();
  }

  if ($("#editModal #newNumbers").val().length > 0) {
    data.newNumbers = $("#editModal #newNumbers").val();
  }

  if ($("#editModal #emailInfrastructure").val().length > 0) {
    data.emailInfrastructure = $("#emailInfrastructure").val();
  }

  if ($("#editModal #teamMembers").val().length > 0) {
    data.teamMembers = $("#editModal #teamMembers").val();
  }

  if ($("#editModal #txtAcceptedRejectedNotes").val().length > 0) {
    data.acceptedRejectedNotes = $("#editModal #txtAcceptedRejectedNotes").val();
  }

  if ($("#editModal #programManager").val().length > 0) {
    data.programManager = $("#editModal #programManager").val();
  }

  if ($("#editModal #partnerCustomerName").val().length > 0) {
    data.partnerCustomerName = $("#editModal #partnerCustomerName").val();
  }

  if ($("#editModal #priority").val() && $("#editModal #priority").val().length > 0) {
    data.priority = $("#editModal #priority").val();
  }

  if ($("#editModal #customerRelationship").val() !== '') {
    data.customerRelationship = $("#editModal #customerRelationship").val()
  }

  if ($("#editModal #customerType").val() !== '') {
    data.customerType = $("#editModal #customerType").val()
  }

  if ($("#editModal #solutionBusinessConsultingRequired")) {
    data.solutionBusinessConsultingRequired = $("#editModal #solutionBusinessConsultingRequired").is(':checked');
  }

  if ($("#editModal #nonProfitOrganization")) {
    data.nonProfitOrganization = $("#editModal #nonProfitOrganization").is(':checked');
  }

  console.log(data);

  // override Test objects
  if (window.location.href.includes('localhost')) {
    data.mailDistribution = $("#editModal #requesterEmail").val();
    data.isTest = true
  }

  //#endregion

  return await $.ajax({
    url: `${apiBasePath}/homeworkerrequests/${id}`,
    method: "PUT",
    contentType: 'application/json',
    dataType: "json",
    data: JSON.stringify(data)
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("putRequest completed");
    });
}

async function getRequests(region = "", _token) {

  let onlyClosed = "";
  let onlyDeleted = "";

  if ($('#btnOnlyClosed')[0].classList.contains('btn-success'))
    onlyClosed = "&onlyClosed=true";

  if ($('#btnOnlyDeleted')[0].classList.contains('btn-success'))
    onlyDeleted = "&onlyDeleted=true";

  if (region == "super-user")
    region = "ALL";

  return await $.ajax({
    url: `${apiBasePath}/homeworkerrequests?region=${region}${onlyClosed}${onlyDeleted}&token=${_token}`,
    method: "GET",
    contentType: 'application/json',
    dataType: "json"
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("getRequests completed");
    });
}


async function getRequest(_requestId) {
  console.log('getRequest', _requestId);
  return await $.ajax({
    url: `${apiBasePath}/homeworkerrequests/${_requestId}?token=${gcToken}`,
    method: "GET",
    contentType: 'application/json',
    dataType: "json"
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("getRequest completed");
    });
}


async function deleteRequest(requestId) {

  console.log('Deleting request:', requestId);

  let data = {
    "isDeleted": true,
    "token": gcToken
  }

  return await $.ajax({
    url: `${apiBasePath}/homeworkerrequests/${requestId}`,
    method: "PATCH",
    contentType: 'application/json',
    dataType: "json",
    data: JSON.stringify(data)
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("deleteRequest completed");
    });
}

async function getDashboard(_token) {

  return await $.ajax({
    url: `${apiBasePath}/homeworkerdashboard?token=${_token}`,
    method: "GET",
    contentType: 'application/json',
    dataType: "json"
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("getDashboard completed");
    });
}

async function getExport() {

  let exportRegion = $('#region').val() == "" ? undefined : $('#region').val();
  let exportSubRegion = $('#subRegion').val() == "" ? undefined : $('#subRegion').val();
  let exportCustomerRelationship = $('#customerRelationship').val() == "" ? undefined : $('#customerRelationship').val();
  let exportCustomerType = $('#customerType').val() == "" ? undefined : $('#customerType').val();

  var sFilter = "";

  if (exportRegion)
    sFilter = sFilter + `region=${exportRegion}&`;
  if (exportSubRegion)
    sFilter = sFilter + `subRegion=${exportSubRegion}&`;
  if (exportCustomerRelationship)
    sFilter = sFilter + `customerRelationship=${exportCustomerRelationship}&`;
  if (exportCustomerType)
    sFilter = sFilter + `customerType=${exportCustomerType}&`;


  console.log(`getExport with filter: ${sFilter}`);

  return await $.ajax({
    url: `${apiBasePath}/homeworkerexport?${sFilter}token=${gcToken}`,
    method: "GET",
    contentType: 'application/json',
    dataType: "json"
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("getRequests completed");
    });
}

//#endregion /homeworker requests

//#region cloudAutomation requests


//#region Homeworker reuqests
async function ca_createItem(_json) {
  console.log('ca_createItem()');
  _json.token = gcToken;

  return await $.ajax({
    url: `${apiBasePath}/cloudautomation/items`,
    method: "POST",
    contentType: 'application/json',
    dataType: "json",
    data: JSON.stringify(_json)
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 201) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("ca_createItem completed");
    });


}


async function ca_getItem(_id) {
  console.log(`function ca_getItem(${_id})`);
  return await $.ajax({
    url: `${apiBasePath}/cloudautomation/items/${_id}?token=${gcToken}`,
    method: "GET",
    contentType: 'application/json',
    dataType: "json"
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("ca_getItem completed");
    });
}

async function ca_updateItem(_id, _json) {
  console.log(`ca_updateItem(${_id})`);

  _json.token = gcToken;
  return await $.ajax({
    url: `${apiBasePath}/cloudautomation/items/${_id}`,
    method: "PUT",
    contentType: 'application/json',
    dataType: "json",
    data: JSON.stringify(_json)
  })
    .done((data, textStatus, jqXHR) => {
      try {
        if (jqXHR.status === 200) {
          console.log(jqXHR);
          return data;
        } else {
          showMessage("Unexpected error: " + textStatus, true);
          reject(textStatus);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
    .always(() => {
      console.log("ca_updateItem completed");
    });


}

//#endregion /cloudAutomation requests
