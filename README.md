<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<div align="center" width="100%">   
            
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
            
</div>
            
<!-- PROJECT LOGO -->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/open-source-labs/Docketeer">
    <img src="assets/extended-dark.png" alt="Logo" width="550" height="auto">
  </a>
  <br />
  https://docketeer.io/
<br/>
  
   <br /> 
  <p align="center">
  Docketeer is a developer-friendly application that provides a single interface for container and network management as well as metric visualization.  
    <br />
    <a href="https://github.com/open-source-labs/Docketeer"><strong>Explore the code & contribute here!»</strong></a>
    <br />
    <br />
    <a href="https://github.com/open-source-labs/Docketeer#about-the-project">View Demo</a>
    ·
    <a href="https://github.com/open-source-labs/Docketeer/issues">Report Bug</a>
    ·
    <a href="https://github.com/open-source-labs/Docketeer/issues">Request Feature</a>
  </p>
</div>

<br />
<!-- TABLE OF CONTENTS -->

<br />

## Table of Contents

  <ol>
      <br />
    <li>
    <a href="#about-the-project">About Docketeer</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#in-development">In Development</a></li>
    <li><a href="#contributing">Contributing</a></li> 
    <li><a href="#license">License</a></li>
    <li><a href="#authors">Authors</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
  </ol>

<!-- ABOUT THE PROJECT -->
<br />

## About The Project

<div align="center" width="100%">
            
[![Docker][Docker]][Docker-url][![Typescript][TS.js]][TS-url][![JavaScript][JavaScript]][JavaScript-url][![React][React.js]][React-url][![Redux][Redux]][Redux-url][![RTK][RTK]][RTK-url][![Node][Node.js]][Node-url][![Express][Express]][Express-url][![Postgres][Postgres]][Postgres-url][![MySQL][MySQL]][MySQL-url][![Grafana][Grafana]][Grafana-url][![Prometheus][Prometheus]][Prometheus-url][![Helm][Helm]][Helm-url][![Kubernetes][Kubernetes]][Kubernetes-url][![Jest][Jest]][Jest-url][![Vite][Vite]][Vite-url][![Git][Git]][Git-url][![HTML5][HTML5]][HTML5-url][![CSS3][CSS3]][CSS3-url][![SASS][SASS]][SASS-url][![D3][D3]][D3-url]

</div>

<br />
  <div align="center">
    <img alt="Logo" src="assets/docketeer-peek.gif" width="fit" height="auto">
  </div>
<br />


Docketeer is an open source initiative comprising contributions from dozens of talented and passionate software engineers. Our application provides a simple interface to manage Docker resources & visualize both host and container metric data, along with Kubernetes cluster data. Docketeer is a containerized application that can be deployed alongside your application cluster with hardly any effort. To learn more about our application and how to get started, keep reading!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features:

- Docketeer is a Docker developer tool that's available as an open-source project on GitHub.
- It aims to simplify the development process for projects that use Docker containers.
- Allows you to filter through both your running and stopped container logs. 
- Docketeer provides an easy-to-use command-line interface for managing Docker containers, images, and networks.
- With Docketeer, developers can quickly create, start, stop, and delete containers, as well as manage Docker networks and images.
- Docketeer includes a variety of features, including automatic container naming, customizable configurations, and support for multiple Docker Compose - files.
- Docketeer offers full networking capabilities: create and manage networks without touching the terminal. 
- Docketeer offers Node and kubelet metric visualizations for your Kubernetes clusters, along with an easy set up process to get your cluster connected to the application. 
- Docketeer also offers built-in support for popular development frameworks like Rails and Node.js, making it easy to get started with these technologies.
- Docketeer is highly customizable, and developers can configure it to suit their specific needs.
- It's a community-maintained project, with frequent updates and bug fixes.
- Docketeer is licensed under the MIT license, meaning it can be used and modified freely, even for commercial projects.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation

The local configuration for Docketeer was setup to be as simple as possible for the end-user. <br />
Follow the steps below to get started with Docketeer.

#### Prerequisites:
You must have Docker Desktop installed and running!
<br></br>

#### STEP 1 — Clone the repository

```sh
git clone https://github.com/open-source-labs/Docketeer.git
```

#### STEP 2 — Docker compose up

Making sure you're in your Docketeer directory, run:
```sh
docker compose up
```

#### STEP 3 — Navigate to localhost:4000 to sign-up & login!

```sh
http://localhost:4000
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Setting up Docketeer to work with a Kubernetes cluster

Prerequisites: you must be running a Kubernetes cluster/kube.

Open up a new tab in your terminal. Run 

```sh
npm install
```
Docketeer is using [d3-sankey](https://github.com/d3/d3-sankey) for data visualization, which is currently not being actively maintained. Running `npm install` would install `patch-package` and make sure to input `y` when you see the following prompt:
```
Need to install the following packages:
  patch-package@7.0.2
Ok to proceed? (y) 
```
and

```sh
npm run dev
``` 

Then, navigate to [localhost:4001/api/k8](http://localhost:4001/api/k8):

If you haven't set up Prometheus-Operator with us before, click the first button to install. 
<br />
Otherwise, you can skip the first button and go on with the next two!
<br />
P.S. Make sure to keep this terminal open!

<!-- IN DEVELOPMENT -->

## In Development

- [ ] Support for more development frameworks and languages, such as Next.JS.
- [ ] Expand Docker networking capabilities within Docketeer to provide more sophisticated networking configurations and better interoperability with other network tools.
- [ ] Develop more advanced container configuration options within Docketeer, such as load balancing or high availability setups.
- [ ] Integrate Docketeer with popular development tools like IDEs or continuous integration/delivery systems for better automation and workflow efficiency.
- [ ] Add support for more advanced Docker features, like multi-stage builds or Docker secrets, to expand the capabilities of Docketeer.
- [ ] Develop integration with cloud services like AWS or Azure to simplify the deployment of Docker-based applications.
- [ ] Display additional metrics for Kubernetes clusters.

See <a href="#troubleshooting">Troubleshooting</a> and [open issues](https://github.com/open-source-labs/Docketeer/issues) for a list of known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repository and create a pull request. You can also simply open an issue describing your contribution.
Don't forget to give the project a star! Thanks again!

1. Fork the project and clone onto your local machine
3. Create your Feature Branch (`git checkout -b feature/NewFeatureName`)
4. Commit your Changes (`git commit -m '(feature/bugfix/style/etc.): [commit message here]'`)
5. Push to the Branch (`git push origin feature/NewFeatureName`)
6. Open a Pull Request
7. Create an issue on GitHub (as mentioned above!)

Read our [contributing guide](https://github.com/open-source-labs/Docketeer/blob/master/CONTRIBUTING.md) for more information on how to purpose bugfixes and improvements to Docketeer.

<br />

## <b>Read More</b>

- [Docketeer XIII: A Tool for Docker!](https://medium.com/@michael_kwon_liu/docketeer-a-tool-for-docker-273793014eb0)
- [Docketeer XII: Now Ready for Launch!](https://medium.com/@jaenixlee/docketeer-xii-now-ready-for-launch-d06e8f26cd0f)
- [Introducing Docketeer XI | The Latest Version Ready for Takeoff with a Splash!](https://medium.com/@saadh123/introducing-docketeer-xi-the-latest-version-ready-for-takeoff-with-a-splash-d5f40eacb29d)
- [Enjoy the sleek new look of Docketeer X](https://medium.com/@ajschmidt225/enjoy-the-sleek-new-look-of-docketeer-x-34c1ccf8bb2b)
- [Docketeer is here to make a splash!](https://medium.com/@garima41/docketeer-9-0-is-here-to-make-a-splash-134336923d3d)
- [Docketeer is here! You’re WHALEcome!](https://medium.com/@dfeldman24/docketeer-5-0-is-here-youre-whalecome-6f9d72ec3b58)
- [Docketeer! What's new?](https://medium.com/@hultzentre/docketeer-5-0-whats-new-358a5f107ac4)
- [Docketeer: An Innovative Tool to Manage Docker Containers](https://griffinsilver.medium.com/docketeer-3-0-an-innovative-tool-to-manage-docker-containers-723ea5be6220a)
- [Whale Hello There, Docketeer 4.0 is Here!](https://msscloudy.medium.com/whale-hello-there-docketeer-4-0-is-here-b78bd9d1df01)
- [Our Journey Building Docketeer](https://betterprogramming.pub/our-journey-building-docketeer-an-open-source-docker-container-monitoring-and-visualization-tool-fb6c26d8908a)

<br />

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authors

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
- Eric Lay [@ericlay14](https://github.com/ericlay14) | [Linkedin](https://www.linkedin.com/in/ericlay14/)
- Austin Andrews [@austinandrews](https://github.com/austinandrews) | [Linkedin](https://www.linkedin.com/in/austinandrews17/)
- Fernando Luna [@lunaf-github](https://github.com/lunaf-github) | [Linkedin](https://www.linkedin.com/in/fernando-luna)
- Christina Son [@cson17](https://github.com/cson17) | [Linkedin](https://www.linkedin.com/in/christinason17/)
- Christian Looff [@cmlooff](https://github.com/cmlooff) | [LinkedIn](https://www.linkedin.com/in/christian-looff/)
- Reuel Warner-Rosen [@Ruliwr](https://github.com/Ruliwr) | [Linkedin](https://www.linkedin.com/in/Ruliwr/)
- Trine Medina [@TrineMedina](https://github.com/TrineMedina) | [Linkedin](https://www.linkedin.com/in/trinemedina/)
- Matt Dias [@Schmang13](https://github.com/Schmang13) | [Linkedin](https://www.linkedin.com/in/matthew-j-dias/)
- Abigail Gerig [@4estgirl](https://github.com/4estgirl) | [Linkedin](https://www.linkedin.com/in/abigail-gerig/)
- Jack Yuan [@jackyuan1](https://github.com/jackyuan1) | [LinkedIn](https://www.linkedin.com/in/jack-yuan-298244247/)
- Sarah Moosa [@Sbethm](https://github.com/Sbethm) | [LinkedIn](https://www.linkedin.com/in/sarah-moosa-4b05721b6/)
- Cedar Cooper [@CedarCooper](https://github.com/CedarCooper) | [LinkedIn](https://www.linkedin.com/in/cedar-cooper/)
- Tiffany Chau [@tiffanynchau](https://github.com/tiffanynchau/) | [LinkedIn](https://www.linkedin.com/in/tiffanynchau/)
- Drew Manley [@DrewManley](https://github.com/DrewManley) | [LinkedIn](https://www.linkedin.com/in/andrewmanley13/)
- Eshaan Joshi [@eshaan32](https://github.com/eshaan32) | [LinkedIn](https://www.linkedin.com/in/eshaanjoshi/)
- Garima Bhatia [@GarimaB06](https://github.com/GarimaB06) | [LinkedIn](https://www.linkedin.com/in/garimab06/)
- Nathan Cho [@nathanycho](https://github.com/nathanycho) | [LinkedIn](https://www.linkedin.com/in/nathanycho/)
- Jonathan Wong [@WongJonathann](https://github.com/WongJonathann) | [LinkedIn](https://www.linkedin.com/in/jon-wong-00/)
- Dillon H. Patel [@d-hp](https://github.com/d-hp)
- Alex Schmidt [@RedAfronNinja](https://github.com/RedAfronNinja) | [LinkedIn](https://www.linkedin.com/in/alex-schmidt-44b27413b/)
- Edward Kenny [@EdwardKenny](https://github.com/EdwardKenny) | [LinkedIn](https://www.linkedin.com/in/edward-kenny-8949b8136/)
- Kennan Budnik [@kobudnik](https://github.com/kobudnik) | [LinkedIn](https://www.linkedin.com/in/kobudnik/)
- Mason Royal [@masonroyal](https://github.com/masonroyal) | [LinkedIn](https://www.linkedin.com/in/masonroyal/)
- Benjamin Huang [@byhuang4100](https://github.com/byhuang4100) | [LinkedIn](https://www.linkedin.com/in/bh4120/)
- Saad Hamdani [@Saadh123](https://github.com/saadh123) | [LinkedIn](https://www.linkedin.com/in/saadh123/)
- Michael Angelo Garcia [@MichaelAngelo13](https://github.com/MichaelAngelo13) | [LinkedIn](https://www.linkedin.com/in/michael-angelo-garcia-053848265/)
- Anna Tran [@annamullike](https://github.com/annamullike) | [LinkedIn](https://www.linkedin.com/in/annatran10/)
- Emily John [@emilyjohl](https://github.com/emilyjohl) | [LinkedIn](https://www.linkedin.com/in/emily-johl-5093ab137/)
- Jaeni Lee [@jaenixlee](https://github.com/jaenixlee) | [LinkedIn](https://www.linkedin.com/in/jaenilee/)
- Joseph Salgado [@Jaysalgado](https://github.com/Jaysalgado) | [LinkedIn](https://www.linkedin.com/in/joseph-salgado-76410620b/)
- Michael (Kwon) Liu [@KwonJiyongGD](https://github.com/KwonJiyongGD) | [LinkedIn](https://www.linkedin.com/in/michael-kwon-liu/)
- Garrett Allen [@garrettallen0](https://github.com/garrettallen0) | [LinkedIn](https://www.linkedin.com/in/garrettallen0/)
- Adrian Kormier [@adriankormier](https://github.com/adriankormier) | [LinkedIn](https://www.linkedin.com/in/adrian-kormier/)
- Shuai Shao [@shao-shuai](https://github.com/shao-shuai) | [LinkedIn](http://www.linkedin.com/in/shuai-sh/)
- John Kim [@jayoo0621](https://github.com/jayoo0621) | [LinkedIn](https://www.linkedin.com/in/jayoo0621/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Show Your Support

Please ⭐️ this project if you found it helpful, thank you!

<br />

## Troubleshooting:

<br />

#### WSL

There are some known issues running Docketeer through WSL. Using WindowsOS, MacOS, or Linux is recommended.

<br />

#### Linux

If you are runing Docketeer in Linux and encounter the followeing errors, you might need to change some of your permissions.

```sh
grafana        |Error: ✗ failed to connect to database: failed to create SQLite database file "/var/lib/grafana/grafana.db": open /var/lib/grafana/grafana.db: permission denied
```

```sh
prometheus     | ts=2023-07-05T23:48:01.612Z caller=query_logger.go:113 level=error component=activeQueryTracker msg="Failed to create directory for logging active queries"

prometheus     | ts=2023-07-05T23:48:01.613Z caller=query_logger.go:91 level=error component=activeQueryTracker msg="Error opening query log file" file=/prometheus/data/queries.active err="open data/queries.active: no such file or directory"

prometheus     | panic: Unable to create mmap-ed active query log
```

In order to do this, you need to change the permissions of data in ./imageConfigs/grafana and promDate under ./imageConfigs/prometheus. 

 go to grafana under ./imageConfigs and change permission of data

 ```sh
cd ./imageConfigs/grafana
chmod 771 data/
```

go to prometheus under ./imageConfigs and change permission of promDate

```sh
cd ./imageConfigs/prometheus
chmod 777 promData/
```

<br />

#### Ad-blocker

If you are encountering the following error and are running an ad-blocker, disable your ad-blocker

```sh
ERR_BLOCKED_BY_CLIENT
```
<br />

#### Network Capacity

By default, Docker can only create 31 networks. If you try to create more, you would encounter the following error:

```
Error response from daemon: could not find an available, non-overlapping IPv4 address pool among the defaults to assign to the network
```

To expand network capacity, add the following to `/etc/docker/daemon.json`

```
{
  "default-address-pools" : [
    {
      "base" : "172.17.0.0/12",
      "size" : 20
    },
    {
      "base" : "192.168.0.0/16",
      "size" : 24
    }
  ]
}
```
For details, please read [The definitive guide to docker's default-address-pools option](https://straz.to/2021-09-08-docker-address-pools/)

[contributors-shield]: https://img.shields.io/github/contributors/open-source-labs/Docketeer.svg?style=for-the-badge
[contributors-url]: https://github.com/open-source-labs/Docketeer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/open-source-labs/Docketeer.svg?style=for-the-badge
[forks-url]: https://github.com/open-source-labs/Docketeer/network/members
[stars-shield]: https://img.shields.io/github/stars/open-source-labs/Docketeer.svg?style=for-the-badge
[stars-url]: https://github.com/open-source-labs/Docketeer/stargazers
[issues-shield]: https://img.shields.io/github/issues/open-source-labs/Docketeer.svg?style=for-the-badge
[issues-url]: https://github.com/open-source-labs/Docketeer/issues
[license-shield]: https://img.shields.io/github/license/open-source-labs/Docketeer.svg?style=for-the-badge
[license-url]: https://github.com/open-source-labs/Docketeer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/docketeer
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/
[TS.js]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[Grafana]: https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white
[Grafana-url]: https://grafana.com/
[Prometheus]: https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white
[Prometheus-url]: https://prometheus.io/
[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en/
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[Redux]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white](https://www.postgresql.org/)
[Jest]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Styled Components]: https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[Styled Components-url]: https://styled-components.com/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Git]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://www.w3schools.com/css/
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://www.w3schools.com/html/
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[SASS]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[SASS-url]: https://sass-lang.com/
[RTK]: https://img.shields.io/badge/RTK-563D7C?style=for-the-badge&logo=redux&logoColor=white
[RTK-url]: https://redux-toolkit.js.org/
[Helm]: https://img.shields.io/badge/helm-navy?style=for-the-badge&logo=helm&logoColor=white
[Helm-url]: https://helm.sh/
[Kubernetes]: https://img.shields.io/badge/kubernetes-3371e3?style=for-the-badge&logo=kubernetes&logoColor=white
[Kubernetes-url]: https://kubernetes.io/
[D3]: https://img.shields.io/badge/d3-red?style=for-the-badge&logo=d3.js
[D3-url]: https://d3js.org/

