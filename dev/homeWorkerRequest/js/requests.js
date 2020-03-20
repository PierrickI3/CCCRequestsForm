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
    region: $("#region").val(),
    subRegion: $("#subRegion").val(),
    questions: {
      countries: getSelectedCountries(),
      languages: getSelectedLanguages(),
      customerResourceCommitted: $("#customerResourceCommitted").prop("checked"),
      projectSponsorAssigned: $("#projectSponsorAssigned").prop("checked"),
      changeManagementProcess: $("#changeManagementProcess").val(),
      regulatoryConsiderations: $("#regulatoryConsiderations").val(),
      numbersDeployment: $("#numbersDeployment").val(),
      newNumbersBroadcast: $("#newNumbersBroadcast").val(),
      existingTelephonyUsage: $("#existingTelephonyUsage").val(),
      numberTypes: $("#numberTypes").val(),
      itInfrastructure: $("#itInfrastructure").val(),
      endUserDevicesRequireVPN: $("#endUserDevicesRequireVPN").prop("checked"),
      usersInternetBandwidth: $("#usersInternetBandwidth").prop("checked"),
      virtualDesktopSolution: $("#virtualDesktopSolution").val(),
      emailInfrastructure: $("#emailInfrastructure").val(),
      callFlows: $("#callFlows").prop("checked"),
      prompts: $("#prompts").prop("checked"),
      identificationAndVerificationProcesses: $("#identificationAndVerificationProcesses").val()

    },


    requesterName: $("#requesterName").val(),
    requesterEmail: $("#requesterEmail").val(),
    requesterPhoneNumber: $("#requesterPhoneNumber").val(),
    description: $("#description").val(),
    status: "Open",
    isDeleted: false,
    mailDistribution: mailDistribution['Genesys Cloud'][$("#region").val()],
    token: gcToken
  };

  console.log(data);


  // override Test objects
  if (window.location.href.includes('localhost')) {
    data.mailDistribution = $("#requesterEmail").val();
    data.isTest = true
  }

  //#region Optional fields

  if (partnerCustomerName.length > 0) {
    data.partnerCustomerName = partnerCustomerName
  }


  //#endregion
  /*
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
    */

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

async function getExport(_region, _subRegion, _product, _segment, _token) {

  var sFilter = "";

  if (_region)
    sFilter = sFilter + `region=${_region}&`;
  if (_product)
    sFilter = sFilter + `product=${_product}&`;
  if (_segment)
    sFilter = sFilter + `segment=${_segment}&`;
  if (_subRegion)
    sFilter = sFilter + `subRegion=${_subRegion}&`;


  // remove last char
  /*
  if (sFilter.length > 0)
    sFilter = "?"
  else sFilter = sFilter + "&" //+ sFilter.substring(0, sFilter.length - 1);
  */
  console.log(`getExport with filter: ${sFilter}`);

  return await $.ajax({
    url: `${apiBasePath}/homeworkerexport?${sFilter}token=${_token}`,
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

