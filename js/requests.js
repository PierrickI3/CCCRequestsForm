const apiBasePath = "https://drbojb15ma.execute-api.eu-central-1.amazonaws.com/dev";

async function postRequests(region, subRegion, segment, product, requestCategory, requestType, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, partnerCustomerName, salesforceAccountOpportunity) {

  var data = {
    region: region,
    subRegion: subRegion,
    segment: segment,
    product: product,
    requestCategory: requestCategory,
    requesterName: requesterName,
    requesterEmail: requesterEmail,
    requesterPhoneNumber: requesterPhoneNumber,
    needCompletedBy: needCompletedBy,
    description: description,
    status: "Open",
    isDeleted: false,
    mailDistribution: mailDistribution[$("#region").val()]
  };

  //#region Optional fields

  if (partnerCustomerName.length > 0) {
    data.partnerCustomerName = partnerCustomerName
  }

  if (requestType && requestType.length > 0) {
    data.requestType = requestType
  }

  if (salesforceAccountOpportunity.length > 0) {
    data.salesforceAccountOpportunity = salesforceAccountOpportunity
  }

  //#endregion

  return await $.ajax({
    url: `${apiBasePath}/requests`,
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

async function putRequest(id, region, subRegion, segment, product, requestCategory, requestType, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, partnerCustomerName, salesforceAccountOpportunity, priority, acceptedRejected, status, programManager, time, acceptedRejectedNotes, teamMembers, isDeleted) {


  if (!isDeleted) isDeleted = false;
  if (!acceptedRejected) acceptedRejected = "not handled";

  var data = {
    id: id,
    region: region,
    subRegion: subRegion,
    segment: segment,
    product: product,
    requestCategory: requestCategory,
    requesterName: requesterName,
    requesterEmail: requesterEmail,
    requesterPhoneNumber: requesterPhoneNumber,
    needCompletedBy: needCompletedBy,
    description: description,
    status: status,
    programManager: programManager,
    acceptedRejected: acceptedRejected,
    isDeleted: isDeleted,
    mailDistribution: mailDistribution[$("#editModal #region").val()]
  };

  //#region Optional fields

  if (requestType && requestType.length > 0) {
    data.requestType = requestType
  }

  if (teamMembers && teamMembers.length > 0) {
    data.teamMembers = teamMembers;
  }

  if (acceptedRejectedNotes && acceptedRejectedNotes.length > 0) {
    data.acceptedRejectedNotes = acceptedRejectedNotes;
  }
/*
  if (acceptedRejected && acceptedRejected.length > 0) {
    data.acceptedRejected = acceptedRejected;
  }
*/
  if (time && time.length > 0) {
    data.time = time;
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

async function getRequests(region = "") {

  let onlyClosed = "";
  let onlyDeleted = "";

  if ($('#btnOnlyClosed')[0].classList.contains('btn-success'))
    onlyClosed = "&onlyClosed=true";

  if ($('#btnOnlyDeleted')[0].classList.contains('btn-success'))
    onlyDeleted = "&onlyDeleted=true";



  return await $.ajax({
    url: `${apiBasePath}/requests?region=${region}${onlyClosed}${onlyDeleted}`,
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
    "isDeleted": true
  }

  return await $.ajax({
    url: `${apiBasePath}/requests/${requestId}`,
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


async function getDashboard() {

  return await $.ajax({
    url: `${apiBasePath}/dashboard`,
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
