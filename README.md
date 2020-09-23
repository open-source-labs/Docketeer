![logo](https://user-images.githubusercontent.com/67434664/94055454-f7177a00-fdaa-11ea-95dd-1d4980400812.png)

# Docketeer
Managing Docker images, containers and networks from the command line while also trying to monitor crucial metrics can be tedious and counterintuitive. To make this process more developer-friendly, we created Docketeer: a GUI for Docker.


### Get Started
Getting started with Docketeer is easy: visit docketeer.io and download the Docketeer desktop app. Drag and drop the .dmg file that you downloaded into your Applications folder to install it. Before you run the application, make sure Docker itself is running.


### Running Containers
Once you open the app, you will be able to see any containers that are already running. You can stop or see more details about any container with the click of a button. You can also run a container based on the id or repo of an image from the top-right.
<img width="1297" alt="running" src="https://user-images.githubusercontent.com/67434664/94055509-08f91d00-fdab-11ea-9d2d-3938f9c3d988.png">


### Exited Containers
On the Exited Containers tab, you can view the containers that exited or were stopped. You can click to re-run or remove any exited container.


### Images
On the Images tab, you can view the images that are available for you locally. You can click to run or remove any image and you can also pull images from DockerHub by providing repo:version and clicking pull on the top-right.


### Metrics
On the Metrics tab, you can view the total amount of resources that your containers are currently using.


### Docker Compose
On the Docker Compose tab, you can drag and drop or upload a docker-compose.yml file to run multi-container applications and view your separate networks.


### Development
All ideas and contributions to the project are welcome. To run the app in development mode, clone our repo to your local machine and first
```
npm install
```

```
npm run dev
```


### Testing
To conduct tests on the codebase, clone our repo to your local machine and execute the following commands in the terminal: 
```
npm install
```

```
npm run test
```


### Built With
- React (Hooks, Router): Frontend library
- Redux: State management library
- Electron: Desktop app framework
- Webpack: Bundler
- npm: Package manager
- Chart.js: Data visualization
- Jest: Testing framework
- Enzyme: Testing utility
- ESLint: Linter
