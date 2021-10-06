<!-- A brief description of your project, what it is used for and how does life get
awesome when someone starts to use it.
- Note and briefly describe any key concepts (technical, philosophical, or both) important to the user’s understanding.
- Link to any supplementary blog posts or project main pages.
- State if it is out-of-the-box user-friendly, so it’s clear to the user.
- List its most useful/innovative/noteworthy features.
- State its goals/what problem(s) it solves. -->

<!-- To help keep this READme organized, use two line breaks for each ## -->

#

# [Docketeer](https://www.docketeer.org/) &middot; ![Github](https://img.shields.io/github/repo-size/open-source-labs/Docketeer) ![GitHub](https://img.shields.io/github/license/open-source-labs/Docketeer) ![GitHub](https://img.shields.io/badge/PRs-welcome-orange) ![GitHub](https://img.shields.io/github/last-commit/open-source-labs/Docketeer)


## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Features](#features)
- [Testing](#testing)
- [Contributing](#contributing)
- [Show your support](#show-your-support)

#

<!-- ![logo](https://user-images.githubusercontent.com/67434664/94055454-f7177a00-fdaa-11ea-95dd-1d4980400812.png) -->

![logo](assets/docketeer-title2.png)

## About
Managing Docker images, containers and networks from the command line while also trying to monitor crucial metrics can be tedious and counterintuitive. To make this process more developer-friendly, we created Docketeer: a container management platform for Docker.

##### **Currently Docketeer does not support M1 chips. Please see our Troubleshoot section for more information.**


## Installation
1. **Fork** and **clone** this [repository](https://github.com/open-source-labs/Docketeer.git) to your machine.
```
git clone https://github.com/open-source-labs/Docketeer.git
```

2. Navigate to the project directory and install dependencies.
```
npm install
```

3. Create a `.env` file in the project's top-level directory.
```
root
  ├─ .env
  ├─ server
  └─ src
```

4. In the .env file, configure the following environment variables for Twilio API, Slack Webhook, and Postgres URI. Refer to [Twilio](#-Twilio) setup section below.
```js
// .env
TWILIO_NUMBER=''
TWILIO_ACCOUNT_SID=''
TWILIO_AUTH_TOKEN=''
SERVICE_SID=''
VERIFICATION_SERVICE_SID=''
SLACK_WEBHOOK=''
POSTGRES_URI=''
```

5. Create a folder called `security` in the project's top-level directory. Inside of the `security` folder, create two files `email.js` and `sysadmin.js`. These files will store variables related to the email notification service and system admin setup respectively.
```
root
  ├─ security
      ├─ email.js
      └─ sysadmin.js
  ├─ server
  └─ src
```

7. In the `email.js` file, input your organization's organization email credentials. This email address will be used to send email notifications from. The file is already in the `.gitignore` file.
```js
// email.js
module.exports = {
  host: 'smtp.gmail.com',
  port: 465,
  username: 'example@gmail.com',
  password: 'belugas',
};
```

8. In the `sysadmin.js` file, input information for the system admin account. If no information is input, the email and phone number for the system admin will be set to default values. These values can always be changed in the system admin's Settings tab.
```js
// sysadmin.js
module.exports = {
  phone: '',
  email: '',
};
```

You are all set! Now just enter the following command to start up Docketeer!
```
npm run dev
```


## Twilio setup
1. Follow documents found [here](https://www.twilio.com/docs/node/install) to download the helper library.
2. In order to manage Twilio SMS notifications follow the [step plan](https://www.twilio.com/docs/notify/quickstart/sms#messagingservice).
3. Store your (i) Twilio number, (ii) Account Sid, (iii) Auth Token from twilio.com/console, (iv) SERVICE_SID, (v) verification service SID in a newly created .env file in the Docketeer folder in the following format:
```js
  // .env.js
  MY_PHONE_NUMBER='your mobile number'
  TWILIO_ACCOUNT_SID='code from your console'
  TWILIO_AUTH_TOKEN='token from your console'
  SERVICE_SID='code from notify service instance'
  VERIFICATION_SERVICE_SID='code from verify service instance'
  ```
4. Verification service was created [here](https://www.twilio.com/console/verify/services); code length and serviceSID can be taken from your Twilio account console.
5. All historical messages from the Twilio account can be found [here](https://www.twilio.com/console/sms/logs).

<!-- > Getting started with Docketeer is easy: visit [docketeer.org](https://www.docketeer.org/) and download the Docketeer desktop app. Drag and drop the .dmg file that you downloaded into your Applications folder to install it. Before you run the application, make sure Docker itself is running. -->


## Features

### ➮ System Wide Notifications
Docketeer offers monitoring support for teams by incorporating sms, email and slack notification as well as configurable options based on a container's memory or cpu usage.

### ➮ Viewing 
You can view a list of running and exited containers, available images, volume history, and docker-compose files stored locally. 

### ➮ Live Metrics
Users have real-time access to the total amount of resources (CPU, memory usage) that your containers are using and total block IO bytes by image over specific time periods.
![alt text](assets/docketeer-metrics.gif)

### ➮ Uploading
Within the Image and Docker Compose tab, you pull images from DockerHub by providing `repo:version` or uploading a `.yml` file.

<br> Demo can found on our [site](https://www.docketeer.org/demo).

<!-- ## Development 🛠 
All ideas and contributions to the project are welcome. To run the app in development mode, clone our repo to your local machine and execute the following commands:
```
npm run dev
``` -->


## Testing
To conduct tests on the codebase, clone our repo to your local machine and execute the following commands in the terminal:
```
npm run test
```

## Troubleshoot

#### **Cannot connect to the Docker daemon**
⤷ Make sure that you have Docker running!

#### **Working with WSL**
⤷ Users may need to install a third-party App to run electron. A helpful article can be found [here](https://techcommunity.microsoft.com/t5/windows-dev-appconsult/running-wsl-gui-apps-on-windows-10/ba-p/1493242).

#### **Using Docketeer with M1 Chip**
⤷ If you are still interested in being a contributor to Docketeer, here are a few articles that may provide some solutions. However, due to how recent the release of the M1 Chip is, there is no guarantee that these solutions will work for your machine. 
- [Medium article](https://moinism.medium.com/running-electron-on-apple-silicon-m1-mac-8d463342a2b5)
- [electron](https://www.electronjs.org/blog/electron-11-0/)
- [Apple](https://www.electronjs.org/blog/apple-silicon/)

## Contributing
Read our [contributing guide](https://github.com/open-source-labs/Docketeer/blob/master/CONTRIBUTING.md) for more information on how to purpose bugfixes and improvements to Docketeer.

### Authors
- Dan Lin [@DanLin91](https://github.com/DanLin91) | [Linkedin](https://www.linkedin.com/in/danlin91/)
- Kadir Gundogdu [@kadirgund](https://github.com/kadirgund) | [Linkedin](https://www.linkedin.com/in/kadirgund/)
- Minchan Jun [@MinchanJun](https://github.com/MinchanJun) | [Linkedin](https://www.linkedin.com/in/minchan-jun/)
- Wilmer Sinchi [@sinchiw](https://github.com/sinchiw) | [Linkedin](https://www.linkedin.com/in/wilmer-sinchi-143b7681/)
- Richie Edwards [@richie-edwards](https://github.com/richie-edwards) | [Linkedin](https://www.linkedin.com/in/richieedwards/)
- Mitesh Patel [@mit1812](https://github.com/mit1812) | [Linkedin](https://www.linkedin.com/in/mitesh-patel-8702728b/)
- Matt Jones [@mc-jones](https://github.com/mc-jones) | [Linkedin](https://www.linkedin.com/in/mc-jones/)
- Chai Lee [@seachai](https://github.com/seachai) | [Linkedin](https://www.linkedin.com/in/chai-lee-5a064649/)
- Anton Abdukhamidov [@abdukhamidov-anton](https://github.com/abdukhamidov-anton) | [Linkedin](https://www.linkedin.com/in/anton-abdukhamidov-1163733b/)
- Alex Smith [@ajsmith925](https://github.com/ajsmith925) | [Linkedin](https://www.linkedin.com/in/ajsmith925/)
- Catherine Larcheveque [@clarcheveque](https://github.com/clarcheveque) | [Linkedin](https://www.linkedin.com/in/clarcheveque/)
- Charles Ryu [@charcharryu](https://github.com/charcharryu) | [Linkedin](https://www.linkedin.com/in/charcharryu/)
- Griffin Silver [@griffinrogersilver](https://github.com/griffinrogersilver) | [Linkedin](https://www.linkedin.com/in/griffin-silver-1ab675140/) 
- Lorenzo Guevara [@lo-guevara](https://github.com/lo-guevara) | [Linkedin](https://www.linkedin.com/in/lorenzoguevara/)
- May Li [@msscloudy](https://github.com/msscloudy) | [Linkedin](https://www.linkedin.com/in/maysli)
- Ricardo Cortez [@rcortez88](https://github.com/rcortez88) | [Linkedin](https://www.linkedin.com/in/rcortez88/)
- Emma Czech [@emczech](https://github.com/emczech) | [Linkedin](https://www.linkedin.com/in/emczech/)
- Brent Speight [@brentspeight](https://github.com/brentspeight) | [Linkedin](https://www.linkedin.com/in/brent-speight/)
- Eric Lee [@errc-lee](https://github.com/errc-lee) | [Linkedin](https://www.linkedin.com/in/errc-lee/)
- Kristine Aguda [@kaguda](https://github.com/kaguda) | [Linkedin](https://www.linkedin.com/in/kristine-aguda/)
- Dylan Feldman [@dfeldman24](https://github.com/dfeldman24) | [Linkedin](https://www.linkedin.com/in/dylan-feldman)
- Tre Hultzen [@THultz](https://github.com/THultz) | [Linkedin](https://www.linkedin.com/in/tre-hultzen/)
- Kenneth Hui [@kennethhui121](https://github.com/kennethhui121) | [Linkedin](https://www.linkedin.com/in/kenneth-hui/)

### License
Docketeer is [MIT Licensed](https://github.com/open-source-labs/Docketeer/blob/master/LICENSE)


## Show your support ⭐ 
Give a ⭐️ if this project helped you!
