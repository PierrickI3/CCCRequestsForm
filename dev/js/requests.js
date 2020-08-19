let apiBasePath;
const maintenanceMode = false; // Set to true to disable all controls

if (window.location.href.includes("localhost")) apiBasePath = "http://localhost:3000";
else apiBasePath = "https://drbojb15ma.execute-api.eu-central-1.amazonaws.com/dev";

async function postRequests(region, subRegion, segment, product, tasks, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, oppName, oppUrl, oppDSRUrl, oppOwner, oppPartnerCustomerName, oppAssignedSC, _token, customerRelationship, customerType) {
  console.log("Mail Distribution:", mailDistribution[product][$("#region").val()]);
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
    status: "Open",
    isDeleted: false,
    mailDistribution: mailDistribution[product][$("#region").val()],
    token: _token,
  };

  // override Test objects
  if (window.location.href.includes("localhost")) {
    data.mailDistribution = requesterEmail;
    data.isTest = true;
  }

  //#region Optional fields

  // if (partnerCustomerName.length > 0) {
  //   data.partnerCustomerName = partnerCustomerName
  // }

  // if (salesforceAccountOpportunity.length > 0) {
  //   data.salesforceAccountOpportunity = salesforceAccountOpportunity
  // }

  if (customerRelationship.length > 0) {
    data.customerRelationship = customerRelationship;
  }

  if (customerType.length > 0) {
    data.customerType = customerType;
  }

  if (oppName.length > 0) {
    data.oppName = oppName;
  }

  if (oppUrl.length > 0) {
    data.oppUrl = oppUrl;
  }

  if (oppDSRUrl.length > 0) {
    data.oppDSRUrl = oppDSRUrl;
  }

  if (oppOwner.length > 0) {
    data.oppOwner = oppOwner;
  }

  if (oppPartnerCustomerName.length > 0) {
    data.oppPartnerCustomerName = oppPartnerCustomerName;
  }

  if (oppAssignedSC.length > 0) {
    data.oppAssignedSC = oppAssignedSC;
  }

  //#endregion

  return await $.ajax({
    url: `${apiBasePath}/requests`,
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(data),
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

async function putRequest(id, region, subRegion, segment, product, tasks, requesterName, requesterEmail, requesterPhoneNumber, needCompletedBy, description, oppName, oppUrl, oppDSRUrl, oppOwner, oppPartnerCustomerName, oppAssignedSC, priority, acceptedRejected, status, programManager, acceptedRejectedNotes, teamMembers, _token, isDeleted, customerRelationship, customerType, dateAccepted, dateRejected, dateClosed) {
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
    dateAccepted: dateAccepted ? dateAccepted : undefined,
    dateRejected: dateRejected ? dateRejected : undefined,
    dateClosed: dateClosed ? dateClosed : undefined,
    isDeleted: isDeleted,
    mailDistribution: mailDistribution[product][$("#editModal #region").val()],
    token: _token,
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

  if (oppName.length > 0) {
    data.oppName = oppName;
  }

  if (oppUrl.length > 0) {
    data.oppUrl = oppUrl;
  }

  if (oppDSRUrl.length > 0) {
    data.oppDSRUrl = oppDSRUrl;
  }

  if (oppOwner.length > 0) {
    data.oppOwner = oppOwner;
  }

  if (oppPartnerCustomerName.length > 0) {
    data.oppPartnerCustomerName = oppPartnerCustomerName;
  }

  if (oppAssignedSC.length > 0) {
    data.oppAssignedSC = oppAssignedSC;
  }

  //#endregion

  return await $.ajax({
    url: `${apiBasePath}/requests/${id}`,
    method: "PUT",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(data),
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

  if ($("#btnOnlyClosed")[0].classList.contains("btn-success")) onlyClosed = "&onlyClosed=true";

  if ($("#btnOnlyDeleted")[0].classList.contains("btn-success")) onlyDeleted = "&onlyDeleted=true";

  if (region == "super-user") region = "ALL";

  return await $.ajax({
    url: `${apiBasePath}/requests?region=${region}${onlyClosed}${onlyDeleted}&token=${_token}`,
    method: "GET",
    contentType: "application/json",
    dataType: "json",
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
  console.log("Deleting request:", requestId);

  let data = {
    isDeleted: true,
    token: _token,
  };

  return await $.ajax({
    url: `${apiBasePath}/requests/${requestId}`,
    method: "PATCH",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(data),
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

async function getDashboard(_token, _start, _end) {
  return await $.ajax({
    url: `${apiBasePath}/dashboard?token=${_token}&start=${_start}&end=${_end}`,
    method: "GET",
    contentType: "application/json",
    dataType: "json",
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

async function getExport(_region, _subRegion, _product, _segment, _token, _start, _end) {
  var sFilter = "";

  if (_region) sFilter = sFilter + `region=${_region}&`;
  if (_product) sFilter = sFilter + `product=${_product}&`;
  if (_segment) sFilter = sFilter + `segment=${_segment}&`;
  if (_subRegion) sFilter = sFilter + `subRegion=${_subRegion}&`;
  if ($("#customerRelationship").val() !== "") sFilter = sFilter + `customerRelationship=${$("#customerRelationship").val()}&`;
  if ($("#customerType").val() !== "") sFilter = sFilter + `customerType=${$("#customerType").val()}&`;

  // remove last char
  /*
  if (sFilter.length > 0)
    sFilter = "?"
  else sFilter = sFilter + "&" //+ sFilter.substring(0, sFilter.length - 1);
  */
  console.log(`getExport with filter: ${sFilter}`);

  return await $.ajax({
    url: `${apiBasePath}/export?${sFilter}token=${_token}&start=${_start}&end=${_end}`,
    method: "GET",
    contentType: "application/json",
    dataType: "json",
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

async function getOpportunityDSR(_token, _id) {
  return await $.ajax({
    url: `${apiBasePath}/sf/opportunities/${_id}/dsr?token=${_token}`,
    method: "GET",
    contentType: "application/json",
    dataType: "json",
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

function filterExpand() {
  $("#filter-sidebar").removeClass("filter-sidebar-collapsed");
  $("#filter-sidebar").addClass("filter-sidebar-expanded");

  $("#filter-sidebar-addon").show();
  $("#filter-sidebar-addon").addClass("animate__animated");
  $("#filter-sidebar-addon").addClass("animate__faster");
  $("#filter-sidebar-addon").addClass("animate__slideInRight");

  setTimeout(function () {
    $("#filter-sidebar-button-expand").hide();
    $("#filter-sidebar-button-collapse").show();
  }, 500);
}

function filterCollapse() {
  $("#filter-sidebar-addon").removeClass("animate__slideInRight");
  $("#filter-sidebar-addon").addClass("animate__slideOutRight");

  setTimeout(function () {
    $("#filter-sidebar-addon").removeClass("animate__slideOutRight");

    $("#filter-sidebar").removeClass("filter-sidebar-expanded");
    $("#filter-sidebar").addClass("filter-sidebar-collapsed");

    $("#filter-sidebar-button-expand").show();
    $("#filter-sidebar-button-collapse").hide();
    $("#filter-sidebar-addon").hide();
  }, 500);
}

function filterHandleOnMessageEvent(event) {
  console.log("filterHandleOnMessageEvent() ", event);
  // todo: Apply filters
}
