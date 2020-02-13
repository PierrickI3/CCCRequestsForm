// **** Token Implicit Grant (Browser) - UserLogin ****
//let redirectUri = 'https://szlaskidaniel.github.io/purecloud-place-call/index.html';
const redirectUri = window.location.href; // 'http://localhost:444/index.html';
const platformClient = require('platformClient');
const client = platformClient.ApiClient.instance;

client.setEnvironment("mypurecloud.ie");
client.setPersistSettings(true);

let userInfo = {
    id: undefined,
    name: undefined,
    mail: undefined,
    phone: undefined,
    groups: []
};




function getMe() {
    return new Promise(async (resolve, reject) => {
        try {
            // Authenticate

            client.loginImplicitGrant("42f3a603-79ca-4212-a4b5-7847846ce47e", redirectUri)
                .then(() => {
                    console.log('Logged In');
                    let apiInstance = new platformClient.UsersApi();
                    let opts = {
                        'expand': ["groups"]
                    };

                    apiInstance.getUsersMe(opts)
                        .then((data) => {
                            //console.log(`getUsersMe success! data: ${JSON.stringify(data, null, 2)}`);

                            //Read UserData
                            userInfo.name = data.name;
                            userInfo.mail = data.username;
                            userInfo.id = data.id;

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

function sendNotification(_message, _target) {

    let data =
    {
        "message": _message,
        "metadata": `newRequest | ${_target}`
    }

    $.ajax({
        url: `https://apps.mypurecloud.ie:443/webhooks/api/v1/webhook/91ebde78-7dfe-4279-b5af-b8fe187b0973`,
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
