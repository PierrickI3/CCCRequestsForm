const apiBasePath = "https://drbojb15ma.execute-api.eu-central-1.amazonaws.com/dev";

async function postRequests(region, subRegion, product, requestType, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, partnerCustomerName, salesforceAccountOpportunity) {

  var data = {
    region: region,
    subRegion: subRegion,
    product: product,
    requestType: requestType,
    requesterName: requesterName,
    requesterEmail: requesterEmail,
    requesterPhoneNumber: requesterPhoneNumber,
    needCompletedBy: needCompletedBy,
    description: description,
    isDeleted: false
  };

  //#region Optional fields

  if (partnerCustomerName.length > 0) {
    data.partnerCustomerName = partnerCustomerName
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

async function putRequest(id, region, subRegion, product, requestType, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, partnerCustomerName, salesforceAccountOpportunity, priority, acceptedRejected, status, programManager, time, acceptedRejectedNotes, isDeleted) {

  if (!isDeleted) isDeleted = false;
  if (!acceptedRejected) acceptedRejected = "not handled";

  var data = {
    id: id,
    region: region,
    subRegion: subRegion,
    product: product,
    requestType: requestType,
    requesterName: requesterName,
    requesterEmail: requesterEmail,
    requesterPhoneNumber: requesterPhoneNumber,
    needCompletedBy: needCompletedBy,
    description: description,
    priority: priority,
    status: status,
    programManager: programManager,
    acceptedRejected: acceptedRejected,
    acceptedRejectedNotes: acceptedRejectedNotes,
    isDeleted: isDeleted
  };

  //#region Optional fields

  if (acceptedRejected.length > 0) {
    data.acceptedRejected = acceptedRejected;
  }

  if (time.length > 0) {
    data.time = time;
  }

  if (partnerCustomerName.length > 0) {
    data.partnerCustomerName = partnerCustomerName
  }

  if (salesforceAccountOpportunity.length > 0) {
    data.salesforceAccountOpportunity = salesforceAccountOpportunity
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

  return await $.ajax({
    url: `${apiBasePath}/requests?region=${region}`,
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