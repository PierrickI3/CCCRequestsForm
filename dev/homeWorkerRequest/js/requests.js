let apiBasePath;
const maintenanceMode = false; // Set to true to disable all controls

if (window.location.href.includes('localhost'))
  apiBasePath = "http://localhost:3000"
else
  apiBasePath = "https://drbojb15ma.execute-api.eu-central-1.amazonaws.com/dev";

// Homeworker create newRequest
async function postRequests() {
  console.log('postRequests()');

  //console.log('Mail Distribution:', mailDistribution[product][$("#region").val()]);
  var data = {
    countriesAgents: $("#countriesAgents").val(),
    countriesOperation: $("#countriesOperation").val(),

    // Telephony
    existingTelephonyUsage: $("#existingTelephonyUsage").is(':checked'),
    telephonyModel: $("#telephonyModel").val(),
    byocCloudCarriers: countriesAndCarriers,
    //byocPremiseWithVirtualEdges: getBYOCWithVirtualEdges(),
    relationshipWithCarrier: $("#relationshipWithCarrier").is(':checked'),
    phoneNumbersDeployment: $("#numbersDeployment").val(),
    nonGeographicNumbersReRouting: $("#nonGeographicNumbersReRouting").val(),
    newNumbersBroadcast: $("#newNumbersBroadcast").val(),
    customerResourceCommitted: $("#customerResourceCommitted").is(':checked'),
    projectSponsorAssigned: $("#projectSponsorAssigned").is(':checked'),
    changeManagementProcess: $("#changeManagementProcess").val(),

    // Common Questions
    regulatoryConsiderations: $("#regulatoryConsiderations").val(),
    callFlowsDocumented: $("#callFlowsDocumented").is(':checked'),
    promptsAvailable: $("#promptsAvailable").is(':checked'),
    identificationAndVerificationProcesses: $("#identificationAndVerificationProcesses").val(),
    itInfrastructure: $("#itInfrastructure").val(),
    usersInternetBandwidth: $("#usersInternetBandwidth").is(':checked'),
    endUserDevicesRequireVPN: $("#endUserDevicesRequireVPN").is(':checked'),
    virtualDesktopSolution: $("#virtualDesktopSolution").val(),
    emailInfrastructure: $("#emailInfrastructure").val(),

    // Your info
    region: $("#region").val(),
    subRegion: $("#subRegion").val(),
    requesterName: $("#requesterName").val(),
    requesterEmail: $("#requesterEmail").val(),
    requesterPhoneNumber: $("#requesterPhoneNumber").val(),
    notes: $("#notes").val(),
    partnerCustomerName: $("#partnerCustomerName").val(),
    salesforceAccountOpportunity: $("#salesforceAccountOpportunity").val(),

    status: "Open",
    isDeleted: false,
    mailDistribution: mailDistribution['Genesys Cloud'][$("#region").val()],
    token: gcToken
  };

  // Need completed by
  let needCompletedBy = "Not Set";
  let needCompletedByDate = moment($("#datepicker").datepicker('getDate')).format("YYYY-MM-DDT00:00:00.000");
  if (needCompletedByDate != "Invalid date") {
      needCompletedBy = moment($("#datepicker").datepicker('getDate')).format("YYYY-MM-DDT00:00:00.000") + "Z";
  }
  data.needCompletedBy = needCompletedBy;

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

async function putRequest(id, region, subRegion, segment, product, tasks, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, partnerCustomerName, salesforceAccountOpportunity, priority, acceptedRejected, status, programManager, acceptedRejectedNotes, teamMembers, _token, isDeleted) {


  if (!isDeleted) isDeleted = false;
  if (!acceptedRejected) acceptedRejected = "not handled";

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
    isDeleted: isDeleted,
    mailDistribution: mailDistribution[product][$("#editModal #region").val()],
    token: _token
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

  if (partnerCustomerName && partnerCustomerName.length > 0) {
    data.partnerCustomerName = partnerCustomerName
  }

  if (salesforceAccountOpportunity && salesforceAccountOpportunity.length > 0) {
    data.salesforceAccountOpportunity = salesforceAccountOpportunity
  }

  if (priority && priority.length > 0) {
    data.priority = priority
  }


  //#endregion

  return await $.ajax({
    url: `${apiBasePath}/requests/${id}`,
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

async function deleteRequest(requestId, _token) {

  console.log('Deleting request:', requestId);

  let data = {
    "isDeleted": true,
    "token": _token
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

