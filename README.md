![logo](https://user-images.githubusercontent.com/67434664/94055454-f7177a00-fdaa-11ea-95dd-1d4980400812.png)

### [Homepage](https://www.docketeer.io/)

### [Repository](https://github.com/open-source-labs/Docketeer)

### [Issue Tracker](https://github.com/open-source-labs/Docketeer/issues?q=is%3Aopen+is%3Aissue)

## Table of Contents

- [Features](#-features)
- [Install](#-install)
- [Usage](#-basic-usage)
- [Developing](#-development)
- [Testing](#-testing)
- [Contributors](#-contributors)
- [Show your support](#-show-your-support)
- [License](#-license)

## Features

<!--
A brief description of your project, what it is used for and how does life get
awesome when someone starts to use it.

- Note and briefly describe any key concepts (technical, philosophical, or both) important to the user’s understanding.
- Link to any supplementary blog posts or project main pages.
- State if it is out-of-the-box user-friendly, so it’s clear to the user.
- List its most useful/innovative/noteworthy features.
- State its goals/what problem(s) it solves.
-->

Managing Docker images, containers and networks from the command line while also trying to monitor crucial metrics can be tedious and counterintuitive. To make this process more developer-friendly, we created Docketeer: a container management platform for Docker.

## Install

1. **Fork** and **clone** this [repository](https://github.com/open-source-labs/Docketeer.git) to your machine.

```
git clone https://github.com/open-source-labs/Docketeer.git
```

2. Navigate to the project directory and install dependencies.

```
npm install
```

3. Create a `.env` file in the project's top-level directory.

> - Docketeer
>   ...
>
>   - .env
>   - server
>   - src
>
>   ...

4. In the .env file, configure the following environment variables for Twilio API. Refer to Twilio Setup section below.

```
// .env
TWILIO_NUMBER=''
TWILIO_ACCOUNT_SID=''
TWILIO_AUTH_TOKEN=''
SERVICE_SID=''
VERIFICATION_SERVICE_SID=''
```

5. Create a folder called `security` in the project's top-level directory.

6. Inside of the `security` folder, create two files `email.js` and `sysadmin.js`. These files will store variables related to the email notification service and system admin setup respectively.

> - Docketeer
>   ...
>
>   - security
>     - email.js
>     - sysadmin.js
>   - server
>   - src
>
>   ...

7. In the `email.js` file, input your organization's organization email credentials. This email address will be used to send email notifications from. The file is already in the `.gitignore` file.

```
// email.js
module.exports = {
  host: 'smtp.gmail.com',
  port: 465,
  username: 'example@gmail.com',
  password: 'beluga',
};
```

8. In the `sysadmin.js` file, input information for the system admin account. If no information is input, the email and phone number for the system admin will be set to default values. These values can always be changed in the system admin's Settings tab.

```
// sysadmin.js
module.exports = {
  phone: '',
  email: '',
};
```
9. Connect your cloud relational database (PostgreSQL) by copying and pasting the connection string to the variable PG_URI the file cloudModel.js located in Docketeer/server/models/.
// cloudModel.js
...
const { Pool } = require('pg');

// Copy and paste your PostgreSQL Connectiion URL below to connect your cloud database. Note: no need to create any tables, upon start up Docketeer will create those tables in your DB instance automatically.

const PG_URI = '';
...


You are all set! Now just enter the following command to start up Docketeer!

```
npm run dev
```

## Twilio setup

    1. Download the helper library from https://www.twilio.com/docs/node/install
    2. In order to manage Twilio SMS notifications follow the step plan : https://www.twilio.com/docs/notify/quickstart/sms#messagingservice
    3. Store your (i) Twilio number, (ii) Account Sid, (iii) Auth Token from twilio.com/console, (iv) SERVICE_SID, (v) verification service SID in a newly created .env file in the Docketeer folder in the following format:

     MY_PHONE_NUMBER='your mobile number'
     TWILIO_ACCOUNT_SID='code from your console'
     TWILIO_AUTH_TOKEN='token from your console'
     SERVICE_SID='code from notify service instance'
     VERIFICATION_SERVICE_SID='code from verify service instance'

    4. Verification service was created here: https://www.twilio.com/console/verify/services code length and serviceSID can be taken from your Twilio account console.
    5. All historical messages from the Twilio account can be found here: https://www.twilio.com/console/sms/logs

<!-- > Getting started with Docketeer is easy: visit [docketeer.io](https://www.docketeer.io/) and download the Docketeer desktop app. Drag and drop the .dmg file that you downloaded into your Applications folder to install it. Before you run the application, make sure Docker itself is running. -->

## Basic usage

### Settings

> On the settings page you can set up container specific sms notifications along with notification rules and connect containers to specific github repositories.
<img width="1297" alt="compose" src="https://static.wixstatic.com/media/57c1fb_364f1d7c6cd046299346e22fd851ce52~mv2.png/v1/fill/w_636,h_352,al_c,q_85,usm_0.66_1.00_0.01/Screen%20Shot%202021-06-30%20at%2010_43_56%20PM.webp">
<img width="1297" alt="compose" src="https://static.wixstatic.com/media/57c1fb_e7313cd1c7184706bf7dc18a2d09c7db~mv2.png/v1/fill/w_634,h_339,al_c,q_85,usm_0.66_1.00_0.01/Screen%20Shot%202021-06-30%20at%2010_54_48%20PM.webp">

### Running & Exited Containers 

> Once you open the app, you will be able to see any containers that are already running. You can stop or see more details about any container with the click of a button. Additionally, designated administrators can run a container based on the id or repo of an image from the top-right. Administrators can click to re-run or remove any exited container.

<img width="1297" alt="running" src="https://static.wixstatic.com/media/57c1fb_9af6a065f7264dbaae802b62c24c3495~mv2.gif">

### Images

> On the Images tab, you can view the images that are available for you locally. You can click to run or remove any image and you can also pull images from DockerHub by providing repo:version and clicking pull on the top-right.

<img width="1297" alt="images" src="https://static.wixstatic.com/media/57c1fb_2b7afa47a1b84eb4a18408e24c96eb9e~mv2.png/v1/fill/w_636,h_180,al_c,q_85,usm_0.66_1.00_0.01/Images.webp">

### Metrics

> On the Metrics tab, you can view the total amount of resources that your containers are currently using including the CPU and memory usage, as well as IO read and written bytes of the containers over specific time periods. You can also view the Github commits for any container linked to a repository.

<img width="1297" alt="metrics" src="https://static.wixstatic.com/media/57c1fb_eb64952713024c859066eaef057efb33~mv2.gif">

<img width="1297" alt="metrics" src="https://static.wixstatic.com/media/57c1fb_0a1852150268436ca01de90430550a3f~mv2.gif">

<img width="1297" alt="metrics" src="https://static.wixstatic.com/media/57c1fb_3a22406d83aa44fd8c40197ce35296b7~mv2.gif">

<img width="1297" alt="metrics" src="https://static.wixstatic.com/media/57c1fb_0e7076749b6141f7953d8ab5847d975e~mv2.gif">

<img width="1297" alt="metrics" src="https://static.wixstatic.com/media/57c1fb_ba33549d96db41179511c92b42e01a9b~mv2.gif">

### Docker Compose

> On the Docker Compose tab, you can drag and drop or upload a docker-compose.yml file to run multi-container applications and view your separate networks.

<img width="1297" alt="compose" src="https://static.wixstatic.com/media/57c1fb_bcfe785a4e2f47db8652c0f32ce36bc4~mv2.png/v1/fill/w_619,h_192,al_c,q_85,usm_0.66_1.00_0.01/compose.webp">

## 🛠 Development

All ideas and contributions to the project are welcome. To run the app in development mode, clone our repo to your local machine and execute the following commands:

```
npm install
```

```
npm run dev
```

## Testing

To conduct tests on the codebase, clone our repo to your local machine and execute the following commands in the terminal:

```
npm install
```

```
npm run test
```

## Contributors

- Dan Lin [@GitHub](https://github.com/ilikecolddrinks) [@LinkedIn](https://www.linkedin.com/in/danlin91/)
- Kadir Gundogdu [@GitHub](https://github.com/kadirgund) [@LinkedIn](https://www.linkedin.com/in/kadirgund/)
- Minchan Jun [@GitHub](https://github.com/MinchanJun) [@LinkedIn](https://www.linkedin.com/in/minchan-jun/)
- Wilmer Sinchi [@GitHub](https://github.com/sinchiw) [@LinkedIn](https://www.linkedin.com/in/wilmer-sinchi-143b7681/)
- Richie Edwards [@GitHub](https://github.com/richie-edwards) [@LinkedIn](https://www.linkedin.com/in/richieedwards/)
- Mitesh Patel [@GitHub](https://github.com/mit1812) [@LinkedIn](https://www.linkedin.com/in/mitesh-patel-8702728b/)
- Matt Jones [@GitHub](https://github.com/mc-jones) [@LinkedIn](https://www.linkedin.com/in/mc-jones/)
- Chai Lee [@GitHub](https://github.com/seachai) [@LinkedIn](https://www.linkedin.com/in/chai-lee-5a064649/)
- Anton Abdukhamidov [@GitHub](https://github.com/abdukhamidov-anton) [@LinkedIn](https://www.linkedin.com/in/anton-abdukhamidov-1163733b/)
- Alex Smith [@Github](https://github.com/ajsmith925) [@LinkedIn](https://www.linkedin.com/in/ajsmith925/)
- Catherine Larcheveque [@Github](https://github.com/charcharryu) [@LinkedIn](https://www.linkedin.com/in/charcharryu/)
- Charles Ryu [@Github](https://github.com/charcharryu) [@LinkedIn](https://www.linkedin.com/in/charcharryu/)
- Griffin Silver [@Github](https://www.linkedin.com/in/griffin-silver-1ab675140/) [@LinkedIn](https://github.com/griffinrogersilver)
- Lorenzo Guevara [@Github](https://github.com/lo-guevara) [@LinkedIn](https://www.linkedin.com/in/lorenzoguevara/)
- May Li [@Github](https://github.com/msscloudy) [@LinkedIn](https://www.linkedin.com/in/maysli)
- Ricardo Cortez [@Github](https://github.com/rcortez88) [@LinkedIn](https://www.linkedin.com/in/rcortez88/)
- Emma Czech [@Github](https://github.com/emczech) [@LinkedIn](https://https://www.linkedin.com/in/emczech/)
- Brent Speight [@Github](https://github.com/brentspeight) [@LinkedIn](https://www.linkedin.com/in/brent-speight/)

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## LICENSE

Distributed under the MIT License. See LICENSE for more information.
