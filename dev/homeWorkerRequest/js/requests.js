let apiBasePath;
const maintenanceMode = false; // Set to true to disable all controls

if (window.location.href.includes('localhost'))
  apiBasePath = "http://localhost:3000"
else
  apiBasePath = "https://drbojb15ma.execute-api.eu-central-1.amazonaws.com/dev";

// Homeworker create newRequest
async function postRequests() {
  console.log('postRequests()');

  var data = {
    countriesAgents: $("#countriesAgents").val(),
    countriesOperation: $("#countriesOperation").val(),

    // Telephony
    existingTelephonyUsage: $("#existingTelephonyUsage").is(':checked'),
    telephonyModel: $("#telephonyModel").val(),
    byocCloudCarriers: countriesAndCarriers,
    //byocPremiseWithVirtualEdges: getBYOCWithVirtualEdges(),
    relationshipWithCarrier: $("#relationshipWithCarrier").is(':checked'),

    //nonGeographicNumbersReRouting: $("#nonGeographicNumbersReRouting").val(),
    customerResourceCommitted: $("#customerResourceCommitted").is(':checked'),
    projectSponsorAssigned: $("#projectSponsorAssigned").is(':checked'),
    changeManagementProcess: $("#changeManagementProcess").val(),
    hyperVEnvironment: $("#hyperVEnvironment").is(':checked'),

    // Common Questions
    regulatoryConsiderations: $("#regulatoryConsiderations").val(),
    numberConcurrentCalls: $("#numberConcurrentCalls").val(),
    callFlowsDocumented: $("#callFlowsDocumented").is(':checked'),
    promptsAvailable: $("#promptsAvailable").is(':checked'),
    identificationAndVerificationProcesses: $("#identificationAndVerificationProcesses").val(),
    itInfrastructure: $("#itInfrastructure").val(),
    usersInternetBandwidth: $("#usersInternetBandwidth").is(':checked'),
    endUserDevicesRequireVPN: $("#endUserDevicesRequireVPN").is(':checked'),
    virtualDesktopSolution: $("#virtualDesktopSolution").val(),

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

  if ($("#salesforceAccountOpportunity").val().length > 0) {
    data.salesforceAccountOpportunity = $("#salesforceAccountOpportunity").val()
  }

  if ($("#phoneNumbersDeployment").val().length > 0) {
    data.phoneNumbersDeployment = $("#phoneNumbersDeployment").val()
  }

  if ($("#newNumbers").val().length > 0) {
    data.newNumbers = $("#newNumbers").val();
  }

  if ($("#existingTelephonyUsageDetails").val().length > 0) {
      data.existingTelephonyUsageDetails = $("#existingTelephonyUsageDetails").val();
  }

  if ($("#emailInfrastructure").val().length > 0) {
      data.emailInfrastructure = $("#emailInfrastructure").val();
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
    projectSponsorAssigned: $("#editModal #projectSponsorAssigned").is(':checked'),
    changeManagementProcess: $("#editModal #changeManagementProcess").val(),
    hyperVEnvironment: $("#editModal #hyperVEnvironment").is(':checked'),

    // Common Questions
    regulatoryConsiderations: $("#editModal #regulatoryConsiderations").val(),
    numberConcurrentCalls: $("#editModal #numberConcurrentCalls").val(),
    callFlowsDocumented: $("#editModal #callFlowsDocumented").is(':checked'),
    promptsAvailable: $("#editModal #promptsAvailable").is(':checked'),
    identificationAndVerificationProcesses: $("#editModal #identificationAndVerificationProcesses").val(),
    itInfrastructure: $("#editModal #itInfrastructure").val(),
    usersInternetBandwidth: $("#editModal #usersInternetBandwidth").is(':checked'),
    endUserDevicesRequireVPN: $("#editModal #endUserDevicesRequireVPN").is(':checked'),
    virtualDesktopSolution: $("#editModal #virtualDesktopSolution").val(),

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

  if ($("#editModal #bAcceptedRequest").val() == '') {
    data.acceptedRejected = "not handled";
  } else
    data.acceptedRejected = $("#editModal #bAcceptedRequest").val()


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

  var sFilter = "";

  if (exportRegion)
    sFilter = sFilter + `region=${exportRegion}&`;
  if (exportSubRegion)
    sFilter = sFilter + `subRegion=${exportSubRegion}&`;

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

