
<h4>Last commit where Docketeer was browser based instead of an extension</h4>
c927ee7835480fcfb815641b10f1ce98111af22a


<h2>Techs</h2>
<h3>Prometheus</h3>
Collects and aggregates the data scraped from Node-exporter and cAdvisor then exposes it's port on 9090 for Grafana to display.


<h3>cAdvisor</h3>
cAdvisor will be deprecated on May 15, 2024 so this should be replaced with something else.<br />
It scrapes all the container metrics and then has them aggregated to prometheus through host.docker.internal:8080 to be displayed on grafana dashboard

<h3>Grafana</h3>
Displays the metric data aggregated by Prometheus, Node-exporter, cAdvisor
There is currently an issue where clicking on a graph will cause everything to refresh and show no data forcing you to click off and back on the tab

<h3>PostgreSQL</h3>
This was originally for storing user info but having moved Docketeer to an extension on Docker Desktop we felt it was uneccessary as it did not add functionality.<br />
There were also some functions in commands.tsx that are commented out to write metrics to the database but whichever iteration did that didn't get to fully implement them so they are unused and commented out. 

<h2>Unused/Unimplemented Files</h2>
All unused files will either be in the top directory or UNUSED-FILES<br />
Many files are currently unused as we did not have time to do full implementation of them or were just dangling and unused when we began working on Docketeer as of Docketeer 14.<br />
All user account creation or login/logout functionality has been either commented out or moved into UNUSED-FILES<br />
Postgres that was primarily used for user data has been completely removed and related functions in commands.tsx are commented out and files are moved to UNUSED-FILES

