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
// ADD IMAGE HERE <img width="1297" alt="running" src="">


### Running Containers
On the running containers tab you will be able to see any containers that are already running. You can stop or see more details about any container with the click of a button. 
// UPDATE IMAGE HERE <img width="1297" alt="running" src="https://user-images.githubusercontent.com/67434664/94055509-08f91d00-fdab-11ea-9d2d-3938f9c3d988.png">


### Exited Containers
On the Exited Containers tab, you can view the containers that exited or were stopped. You can click to re-run or remove any exited container.
// UPDATE IMAGE HERE <img width="1297" alt="exited" src="https://user-images.githubusercontent.com/67434664/94055552-144c4880-fdab-11ea-992d-a7b5ebb0ad1e.png">


### Images
On the Images tab, you can view the images that are available for you locally. You can (i) run or remove any image and (ii) pull images from DockerHub by providing repo:version and clicking pull on the top-right.
// UPDATE IMAGE HERE <img width="1297" alt="images" src="https://user-images.githubusercontent.com/67434664/94055551-13b3b200-fdab-11ea-9efa-6b2152a59777.png">


### Metrics
On the Metrics tab, you can view (i) the total amount of resources that your containers are currently using, (ii) CPU and memory dynamics overtime, and (iii) history of GitHub commits (if you provided GitHub url details on the Settings tab) 
// UPDATE IMAGE HERE <img width="1297" alt="metrics" src="https://user-images.githubusercontent.com/67434664/94055553-144c4880-fdab-11ea-8bf3-ad0bed7f411e.png">


### Docker Compose
On the Docker Compose tab, you can drag and drop or upload a docker-compose.yml file to run multi-container applications and view your separate networks, including environments created outside of Docketeer.
// UPDATE IMAGE HERE ![compose](https://user-images.githubusercontent.com/67434664/94055554-14e4df00-fdab-11ea-9bd3-7832c22fd85f.png)

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
- Matt Jones [@GitHub](https://github.com/mc-jones) [@LinkedIn](https://www.linkedin.com/in/mcjones1/)
- Chai Lee [@GitHub](https://github.com/seachai) [@LinkedIn](https://www.linkedin.com/in/chai-lee-5a064649/)
- Anton Abdukhamidov [@GitHub](https://github.com/abdukhamidov-anton) [@LinkedIn](https://www.linkedin.com/in/anton-abdukhamidov-1163733b/)


## License
Distributed under the MIT License. See LICENSE for more information.
