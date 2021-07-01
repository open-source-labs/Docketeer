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

4. Configure environment variables for Twilio API. Refer to **Twilio Setup** section below.

5. Create a folder called `security` in the project's top-level directory.

6. Inside of the `security` folder, create two files `email.js` and `sysadmin.js`. These files will store variables related to the email notification service and system admin setup respectively.

7. Connect your cloud relational database (PostgreSQL) by copying and pasting the connection string to the variable `PG_URI` the file `cloudModel.js` located in `Docketeer/server/models/`.

8. You are all set! Now just enter the following command to start up Docketeer!
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

<img width="1297" alt="compose" src="https://static.wixstatic.com/media/57c1fb_b853288e21e14ea5b891cf7ee8b6126c~mv2.png/v1/crop/x_0,y_86,w_2784,h_1598/fill/w_870,h_500,al_c,q_90,usm_0.66_1.00_0.01/Docker%20Compose.webp">

### Running Containers

>Once you open the app, you will be able to see any containers that are already running. You can stop or see more details about any container with the click of a button. You can also run a container based on the id or repo of an image from the top-right.

<img width="1297" alt="running" src="https://static.wixstatic.com/media/57c1fb_4c29afde2afd4ac6a776eae9ba102cde~mv2.png/v1/crop/x_0,y_86,w_2784,h_1598/fill/w_870,h_500,al_c,q_90,usm_0.66_1.00_0.01/Running%20containers.webp">



### Exited Containers

> On the Exited Containers tab, you can view the containers that exited or were stopped. You can click to re-run or remove any exited container.

<img width="1297" alt="exited" src="https://static.wixstatic.com/media/57c1fb_33a06de6eaeb47d1af714990cfd36a12~mv2.png/v1/crop/x_0,y_86,w_2784,h_1598/fill/w_870,h_500,al_c,q_90,usm_0.66_1.00_0.01/Running%20containers.webp">



### Images

> On the Images tab, you can view the images that are available for you locally. You can click to run or remove any image and you can also pull images from DockerHub by providing repo:version and clicking pull on the top-right.

<img width="1297" alt="images" src="https://static.wixstatic.com/media/57c1fb_61106dadc6a94bce980e2c11dcc025d0~mv2.png/v1/crop/x_0,y_86,w_2784,h_1594/fill/w_870,h_498,al_c,q_90,usm_0.66_1.00_0.01/Exited%20Containers.webp">



### Metrics

> On the Metrics tab, you can view the total amount of resources that your containers are currently using.

<img width="1297" alt="metrics" src="https://static.wixstatic.com/media/57c1fb_85898fa6a4e045b5a2c7f7fbc327fa5a~mv2.png/v1/crop/x_0,y_86,w_2779,h_1594/fill/w_869,h_498,al_c,q_90,usm_0.66_1.00_0.01/Metrics%201.webp">


### Docker Compose

> On the Docker Compose tab, you can drag and drop or upload a docker-compose.yml file to run multi-container applications and view your separate networks.

<img width="1297" alt="compose" src="https://static.wixstatic.com/media/57c1fb_92172f479ea24682bb1b37b0a42d61b6~mv2.png/v1/crop/x_0,y_86,w_2784,h_1598/fill/w_870,h_500,al_c,q_90,usm_0.66_1.00_0.01/Docker%20Compose.webp">

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

## ⭐ Show your support

Give a ⭐️ if this project helped you!


## LICENSE

Distributed under the MIT License. See LICENSE for more information.
