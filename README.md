# CCC Requests Form (UI)

## Developer notes

- Root folder is production
- `dev` is for development purposes only and does not affect production

### Making changes

- Make all changes in `dev`
- Test locally with Live Server (https)

### REACT.JS

Some page elements are created in REACT.JS, e.g. the filter configuration feature. They are stored in the _addons_ folder. In order to apply changes from the REACT.JS code to the main app you have to follow below steps:

- Open a terminal window.
- Navigate to: _/CCCRequestsForm/dev/addons/src_
- _Yarn install_
- _Yarn build_

The REACT.JS part of the app will be built to the _/CCCRequestsForm/dev/addons/build_ folder and it is loaded from this location into the main app.

### Move changes to production

- Commit and push all changes to the repository
- Test the changes using the `CC Request Form (dev)` app in Genesys Cloud (in the Genesys .com organization)
- Set `maintenanceMode` to `true` in `/js/requests.js` (not in the `dev` folder). This will let everyone know that changes are being deployed on every page and disable all controls
- Commit and push all changes to the repository
- Wait 10 minutes for the cache to clear on all users (see [here](https://webapps.stackexchange.com/a/119294) for more info)
- When ready, copy all code from `dev` to the root folder (code automatically checks whether localhost is being used and in the `dev` folder or not)
- Test the changes using the `CC Request Form` app in Genesys Cloud (in the Genesys .com organization)

## UI Tests

### Create tests

- Install the [Selenium Chrome Extension](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd)
- Create your tests
- Save your tests in the `tests` folder

### Run tests

- Run `npm i -g selenium-side-runner chromedriver`
- Add the folder containing `chromedriver` to your PATH (path is shown after you install it)
- Open a terminal and go to the `tests` folder
- Make sure all existing instances of Chrome are closed
- Make sure `Live Server` is disposed (not running)
  - Windows: Run `selenium-side-runner -c "goog:chromeOptions.args=[--user-data-dir=C:\Users\Pierrick\AppData\Local\Google\Chrome\User Data, --profile-directory=Profile 7] browserName=chrome" *.side` (change `Profile 7` to your profile directory)

## Email Templates

- Use [https://fa2png.app/](https://fa2png.app/) to convert font awesome icons to PNG
- Set the color to RGB 255, 79, 31 for the Genesys color
- Copy all PNG files to the [S3 bucket](https://s3.console.aws.amazon.com/s3/buckets/cc-requests-icons/?region=eu-central-1&tab=overview), cc-requests-icons in Genesys-managed AWS account
- Make sure to give public read access
- You can test what your email will look like in Outlook by using [PutsMail](https://putsmail.com/tests/new)
- Test your template using the Live Server VS Code extension
- When ready, overwrite the content of the \*.mustache files in the services\requests\emailTemplates folder in the backend repository
