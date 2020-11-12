![logo](https://user-images.githubusercontent.com/67434664/94055454-f7177a00-fdaa-11ea-95dd-1d4980400812.png)

# Docketeer

Managing Docker images, containers and networks from the command line while also trying to monitor crucial metrics can be tedious and counterintuitive. To make this process more developer-friendly, we created Docketeer: a GUI for Docker.

Download our app: [https://www.docketeer.io/](https://www.docketeer.io/)


## Get Started
Getting started with Docketeer is easy: visit [docketeer.io](https://www.docketeer.io/) and download the Docketeer desktop app. Drag and drop the .dmg file that you downloaded into your Applications folder to install it. Before you run the application, make sure Docker itself is running.
If you plan to use notification functionality you also need to follow the instructions below to create a Twilio account

## Service providing

### Running Containers
Once you open the app, you will have a chance to (i) set-up the notification rules for containers and (ii) provide details of GitHub urls for getting access to latest commits in the project repository file  
<img width="1297" alt="running" src="https://static.wixstatic.com/media/57c1fb_4c29afde2afd4ac6a776eae9ba102cde~mv2.png/v1/crop/x_0,y_86,w_2784,h_1598/fill/w_870,h_500,al_c,q_90,usm_0.66_1.00_0.01/Running%20containers.webp">


### Running Containers
On the running containers tab you will be able to see any containers that are already running. You can stop or see more details about any container with the click of a button. 
<img width="1297" alt="running" src="https://static.wixstatic.com/media/57c1fb_4c29afde2afd4ac6a776eae9ba102cde~mv2.png/v1/crop/x_0,y_86,w_2784,h_1598/fill/w_870,h_500,al_c,q_90,usm_0.66_1.00_0.01/Running%20containers.webp">


### Exited Containers
On the Exited Containers tab, you can view the containers that exited or were stopped. You can click to re-run or remove any exited container.
<img width="1297" alt="exited" src="https://static.wixstatic.com/media/57c1fb_33a06de6eaeb47d1af714990cfd36a12~mv2.png/v1/crop/x_0,y_86,w_2784,h_1594/fill/w_870,h_498,al_c,q_90,usm_0.66_1.00_0.01/Exited%20Containers.webp">


### Images
On the Images tab, you can view the images that are available for you locally. You can (i) run or remove any image and (ii) pull images from DockerHub by providing repo:version and clicking pull on the top-right.
<img width="1297" alt="images" src="https://static.wixstatic.com/media/57c1fb_61106dadc6a94bce980e2c11dcc025d0~mv2.png/v1/crop/x_0,y_86,w_2784,h_1594/fill/w_870,h_498,al_c,q_90,usm_0.66_1.00_0.01/Images.webp">


### Metrics
On the Metrics tab, you can view (i) the total amount of resources that your containers are currently using, (ii) CPU and memory dynamics overtime, and (iii) history of GitHub commits (if you provided GitHub url details on the Settings tab) 
<img width="1297" alt="metrics" src="https://static.wixstatic.com/media/57c1fb_85898fa6a4e045b5a2c7f7fbc327fa5a~mv2.png/v1/crop/x_0,y_86,w_2779,h_1594/fill/w_869,h_498,al_c,q_90,usm_0.66_1.00_0.01/Metrics%201.webp">


### Docker Compose
On the Docker Compose tab, you can drag and drop or upload a docker-compose.yml file to run multi-container applications and view your separate networks, including environments created outside of Docketeer.
<img width="1297" alt="metrics" src="https://static.wixstatic.com/media/57c1fb_92172f479ea24682bb1b37b0a42d61b6~mv2.png/v1/crop/x_0,y_86,w_2784,h_1598/fill/w_870,h_500,al_c,q_90,usm_0.66_1.00_0.01/Docker%20Compose.webp">

## Twilio account setup
1. Download the helper library from https://www.twilio.com/docs/node/install
2. In order to manage Twilio SMS notifications (1) create a Twilio account, (2) get the phone number that you want to use for SMS, create a messaging service (follow the step plan: https://www.twilio.com/docs/notify/quickstart/sms#messagingservice ), (4) create a verification service (follow the step plan: https://www.twilio.com/console/verify/services)
3. Created a .env file in the root in the Docketeer folder and store your (i) Twilio number, (ii) Account Sid, (iii) Auth Token from twilio.com/console, (iv) SERVICE_SID, (v) verification service SID in the following format:
   MY_PHONE_NUMBER='+19252559538'
   TWILIO_ACCOUNT_SID='code from your console'
   TWILIO_AUTH_TOKEN='token from your console'
   SERVICE_SID='code from notify service instance'
   VERIFICATION_SERVICE_SID='code from verify service instance'
4. All historical messages from the Twilio account can be found here: https://www.twilio.com/console/sms/logs

## Development

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

## Built With

- React (Hooks, Router): Frontend library
- Redux: State management library
- Electron: Desktop app framework
- Webpack: Bundler
- npm: Package manager
- Chart.js: Data visualization
- Jest: Testing framework
- Enzyme: Testing utility
- ESLint: Linter
- Twilio: cloud communication service provider
- Postgres: database

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


## License
Distributed under the MIT License. See LICENSE for more information.
