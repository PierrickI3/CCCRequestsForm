const apiBasePath = "https://drbojb15ma.execute-api.eu-central-1.amazonaws.com/dev";

async function postRequests(region, subRegion, product, requestType, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, partnerCustomerName, salesforceAccountOpportunity, fileAttachments) {

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
    partnerCustomerName: partnerCustomerName,
    salesforceAccountOpportunity: salesforceAccountOpportunity,
    fileAttachments: fileAttachments
  };

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

async function getRequests() {

  return await $.ajax({
    url: `${apiBasePath}/requests`,
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