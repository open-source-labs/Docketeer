
<h2>Techs</h2>
<h3>Prometheus</h3>
Collects and aggregates the data scraped from Node-exporter and cAdvisor then exposes it's port on 9090 for Grafana to display.<br />
Check imageConfigs/prometheus/prometheus.yml to see all ports used for aggregation.

<h3>Node exporter</h3>
Scrapes the computer metrics and then has them aggregated by prometheus. Look at docker-compose service for node-exporter to see commands used to set up the container.

<h3>cAdvisor</h3>
cAdvisor will be deprecated on May 15, 2024 so this should be replaced with something else.<br />
It scrapes all the container metrics and then has them aggregated to prometheus through host.docker.internal:8080 to be displayed on grafana dashboard.

<h3>Grafana</h3>
Displays the metric data aggregated by Prometheus, Node-exporter, cAdvisor

<h3>PostgreSQL</h3>
Stores user account information. Has functions in commands.tsx that go to the backend and tell it to store metric data but that data is never used anywhere and is just taking up space. 

<h2>Unused/Unimplemented Files</h2>
<pre>
security/email.js (unused, probably planned for prometheus email alert integration)
server/controllers/testingroute.ts
src/components/AccountDisplay
src/components/Notfound 
src/components/ProcessLogsCard 
src/components/Settings 
src/components/Yml 
src/helpers/settingsHelper.ts 
.yarnclean
config.js (these env variables are not called anywhere that we could find)
postcss.config.cjs (same as below)
tailwind.config.cjs (currently is called in vite.config.js but never used. Tailwind is used in some of the unused components above but none that are currently in use)
</pre>

<h2>Tests</h2>
Currently only passes about half the tests. There are files you have to alter the routes for when testing to see if they work such as grafanaApiController.ts. We did not focus on the testing so we're not sure what all needs to be changed with it.

<h2>Other Known Issues/ToDo</h2>
<strong>File size:</strong> Extremely bloated file size due to the dockerfile just grabbing everything and adding it to the image. There's also still a ton of dependencies that are unused and forgotten. This all causes it take and extremely long time to compose and build to test any changes you make significantly slowing down development speed.<br />
<strong>Grafana:</strong> Dashboard container metric tiles get super crammed when you have a lot of containers and are unreadable<br />
<strong>Grafana:</strong> Dashboard does not remove containers that have been completely deleted and they still appear on the dashboard<br />
<strong>Kubernetes:</strong> Current implementation is completely detached from the app itself. You have to have an entirely seperate session running to do the setup for it. Should find some way to have it all in the container but interacting with the kubernetes clusters from inside a container was pretty difficult and we couldn't find a good way to do it.<br />
<strong>Typescript:</strong> Current coverage is quite messy. There are a lot of 'any' tags and things that use implicit any that we did not have time to fix.<br />
<strong>Code cleanup:</strong> There's a lot of commented out code everywhere that was never fully implemented.<br />
<strong>Operating systems:</strong> Only really seems to work on macs and no other operating systems consistently. Even macs are inconsistent with it working. One of the issues is how the current images being used are built without using commands for multi platform builds. Another is that bind mounts are used in the docker-compose which regularly throws errors for windows users trying to compose and I couldn't figure out why.

<h2>Who worked on what</h2>
<h4>Docketeer XIV</h2>
<h5>Browser</h5>
<ol>
  <li>Updated deprecated dependencies and removed some unused dependencies</li>
  <li>Added documentation to .yml files and added dev readme</li>
</ol>
<h5>Extension</h5>
<ol>
  <li>Ported the browser version of docketeer into an extension for docker desktop.</li>
  <li>We managed to get all functionality excluding kubernetes monitoring to the extension.</li>
  <li>Opted to not include user functionality in the extension version.</li>
  <li>Restructured the file system and completely redid the dockerfile and docker-compose files to significantly reduce file size.</li>
  <li>Home and about pages information has been moved to the docker extension detailed description.</li>
  <li>Added documentation to .yml files and added dev readme</li>
</ol>