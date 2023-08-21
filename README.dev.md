
<h4>Last commit where Docketeer was browser based instead of an extension</h4>
c927ee7835480fcfb815641b10f1ce98111af22a


<h2>Techs</h2>
<h3>Prometheus</h3>
Collects and aggregates the data scraped from Node-exporter and cAdvisor then exposes it's port on 9090 for Grafana to display.<br />
Check imageConfigs/prometheus/prometheus.yml to see all ports used for aggregation.

<h3>cAdvisor</h3>
cAdvisor will be deprecated on May 15, 2024 so this should be replaced with something else.<br />
It scrapes all the container metrics and then has them aggregated to prometheus through host.docker.internal:8080 to be displayed on grafana dashboard.

<h3>Grafana</h3>
Displays the metric data aggregated by Prometheus, Node-exporter, cAdvisor
There is currently an issue where clicking on a graph will cause everything to refresh and show no data forcing you to click off and back on the tab

<h3>PostgreSQL (Unused)</h3>
This was originally for storing user info but having moved Docketeer to an extension on Docker Desktop we felt it was uneccessary as it did not add functionality. Though we've left it in the files in case future iterations want to reimplement users.<br />
There were also some functions in commands.tsx that are commented out to write metrics to the database but whichever iteration did that didn't get to fully implement them so they are unused and commented out. 

<h2>Unused/Unimplemented Files</h2>
All unused files will either be in the top level of the directory or in UNUSED-FILES<br />
Many files are currently unused as we did not have time to do full implementation of them or were just dangling and unused when we began working on Docketeer as of Docketeer 14.<br />
The package.json and package-lock.json of the top level directory and not used in the containers. They are currently just for reference but in future could be used for npm modules required by the Jest tests.<br />
All user account creation or login/logout functionality has been either commented out or moved into UNUSED-FILES<br />
Postgres that was primarily used for user data has been completely removed and related functions in commands.tsx are commented out and files are moved to UNUSED-FILES

<h2>Tests</h2>
Tests are not correctly implemented for the extension version of Docketeer. Extremely unlikely any pass and will need to be redone.

<h2>Other Known Issues/ToDo</h2>
<strong>Grafana</strong> dashboard contaienr metric tiles get super crammed when you have a lot of containers and are unreadable<br />
<strong>Grafana</strong> dashboard does not remove containers that have been completely deleted and they still appear on the dashboard<br />
<strong>Kubernetes</strong> is currently not implemented in the extension version. The way it works on the browser version requires it have access outside of containers which is difficult to do with an extension. We got a slightly working version by using the 'host' metadata.json block to download kubectl and helm binaries that could interact with the host's kubernetes cluster but accessing the metrics after that point was extremely difficult. There is also the issue of bloated image size due to needing a specific binary version for each operating system<br />

<h2>Who worked on what</h2>
<h4>Docketeer XIV</h2>
<ol>
  <li>Ported the browser version of docketeer into an extension for docker desktop.</li>
  <li>We managed to get all functionality excluding kubernetes monitoring to the extension.</li>
  <li>Opted to not include user functionality in the extension version.</li>
  <li>Restructured the file system and completely redid the dockerfile and docker-compose files to significantly reduce file size.</li>
  <li>Home and about pages information has been moved to the docker extension detailed description.</li>
  <li>Improved documentation and added dev readme</li>
</ol>