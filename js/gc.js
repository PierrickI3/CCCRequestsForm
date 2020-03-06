// **** Token Implicit Grant (Browser) - UserLogin ****
const redirectUri = window.location.href;
const platformClient = require('platformClient');
const client = platformClient.ApiClient.instance;

client.setEnvironment("mypurecloud.com");
client.setPersistSettings(true);

let userInfo = {
    id: undefined,
    name: undefined,
    mail: undefined,
    phone: undefined,
    groups: [],
    token: undefined
};




function getMe() {
    return new Promise(async (resolve, reject) => {
        try {
            // Authenticate

            client.loginImplicitGrant("ae638594-45f7-4e59-bd8d-fd95c9df28c8", redirectUri) // PRD
                .then(() => {
                    console.log('Logged In');
                    let gcToken = platformClient.ApiClient.instance.authData.accessToken;
                    let apiInstance = new platformClient.UsersApi();
                    let opts = {
                        'expand': ["groups"]
                    };

                    apiInstance.getUsersMe(opts)
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
                            })

                            data.groups.forEach(function (aItem) {
                                userInfo.groups.push(aItem.id)
                            })

                            console.log('User Info:', userInfo);
                            userInfo.token = gcToken;
                            resolve(userInfo);
                        })
                        .catch((err) => {
                            console.log('There was a failure calling getUsersMe');
                            console.error(err);
                            reject(err);
                        });

                })
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

function sendNotification(_message, _region) {

    let data =
    {
        "message": _message,
        "metadata": `newRequest | ${_region}`
    }

    $.ajax({
        //url: `https://apps.mypurecloud.ie:443/webhooks/api/v1/webhook/91ebde78-7dfe-4279-b5af-b8fe187b0973`, // emeabilling
        url: 'https://apps.mypurecloud.com:443/webhooks/api/v1/webhook/d68c7daf-2c0c-4872-8353-47c1b474008b',
        type: "POST",
        data: data,
        dataType: "json",
        success: function (response) {
            var resp = JSON.parse(response)
            console.log(resp.status);
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });


}
