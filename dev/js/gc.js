// **** Token Implicit Grant (Browser) - UserLogin ****
const redirectUri = window.location.href;
const platformClient = require('platformClient');
const client = platformClient.ApiClient.instance;

const config = {
  prd: {
    env: 'mypurecloud.com',
    clientId: 'ae638594-45f7-4e59-bd8d-fd95c9df28c8',
    webhook: 'https://apps.mypurecloud.com:443/webhooks/api/v1/webhook/d68c7daf-2c0c-4872-8353-47c1b474008b',
  },
  emeabilling: {
    env: 'mypurecloud.ie',
    clientId: '42f3a603-79ca-4212-a4b5-7847846ce47e',
    webhook: 'https://apps.mypurecloud.ie:443/webhooks/api/v1/webhook/91ebde78-7dfe-4279-b5af-b8fe187b0973',
  },
};

client.setEnvironment(config.prd.env);
client.setPersistSettings(true);

function getMe() {
  console.log('function getMe()');
  let userInfo = {
    id: undefined,
    name: undefined,
    mail: undefined,
    phone: undefined,
    groups: [],
    token: undefined,
  };

  return new Promise(async (resolve, reject) => {
    try {
      client
        .loginImplicitGrant(config.prd.clientId, redirectUri) // PRD
        .then(() => {
          console.log('Logged in!');
          userInfo.token = platformClient.ApiClient.instance.authData.accessToken;
          // Get Users/me
          let apiInstance = new platformClient.UsersApi();
          let opts = {
            expand: ['groups'],
          };
          apiInstance
            .getUsersMe(opts)
            .then((data) => {
              //Read UserData
              userInfo.name = data.name;
              userInfo.mail = data.username;
              userInfo.id = data.id;
              console.log(data.primaryContactInfo);
              data.primaryContactInfo.forEach(function (aItem) {
                switch (aItem.mediaType.toLowerCase()) {
                  case 'email':
                    userInfo.mail = aItem.address;
                    break;
                  case 'phone':
                    userInfo.phone = aItem.address;
                    break;
                  default:
                    break;
                }
              });

              data.groups.forEach(function (aItem) {
                userInfo.groups.push(aItem.id);
              });

              console.log('User Info:', userInfo);
              resolve(userInfo);
            })
            .catch((err) => {
              console.log('There was a failure calling getUsersMe');
              console.error(err);
              reject(err);
            });
        })
        .catch((err) => {
          console.log('There was a failure calling loginIn');
          console.error(err);
          reject(err);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function postUsersSearch(_userName) {
  console.log('function postUsersSearch() for user', _userName);
  return new Promise(async (resolve, reject) => {
    try {
      // Get Users/me
      let apiInstance = new platformClient.SearchApi();
      let body = {
        query: [
          {
            fields: ['name'],
            value: _userName,
            type: 'EXACT',
          },
        ],
      };

      apiInstance
        .postUsersSearch(body)
        .then((data) => {
          if (data.total === 1 && data.results[0].primaryContactInfo.length > 0 && data.results[0].primaryContactInfo[0].address) {
            resolve(data.results[0].primaryContactInfo[0].address);
          } else {
            if (data.total > 1) {
              console.error('ambigous response. more than 1 match found!');
              reject();
            } else {
              console.error('not found');
              reject();
            }
          }
        })
        .catch((err) => {
          console.log('There was a failure calling postUsersSearch');
          console.error(err);
          reject(err);
        });
    } catch (err) {
      console.log('There was a failure calling postUsersSearch()');
      console.error(err);
      reject(err);
    }
  });
}

/* 
async function login() {
    console.log('function login()');
    return new Promise(async (resolve, reject) => {
        client.loginImplicitGrant("42f3a603-79ca-4212-a4b5-7847846ce47e", redirectUri) // PRD
            .then(() => {
                console.log('Logged in!');
                gcToken = platformClient.ApiClient.instance.authData.accessToken;
                resolve();
            }).catch((err) => {
                console.log('There was a failure calling getUsersMe');
                console.error(err);
                reject(err);
            });

    });
}
*/

function sendNotification(_message, _region, _subRegion, _segment, _product) {
  let data = {
    message: _message,
    metadata: `newRequest | ${_region} | ${_subRegion} | ${_segment} | ${_product}`,
  };

  console.log('Sending notification:', data);
  $.ajax({
    url: config.prd.webhook,
    type: 'POST',
    data: data,
    dataType: 'json',
    success: function (response) {
      var resp = JSON.parse(response);
      console.log(resp.status);
    },
    error: function (xhr, status) {
      console.log(status);
    },
  });
}
