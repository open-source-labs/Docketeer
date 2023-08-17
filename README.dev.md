
<h4>Last commit where Docketeer was browser based instead of an extension</h4>
c927ee7835480fcfb815641b10f1ce98111af22a

<h4>Below is mostly stuff that doesn't work</h4>

<h2>Techs</h2>
<h3>cAdvisor</h3>
cAdvisor will be deprecated on May 15, 2024 so this should be replaced with something else.
It scrapes all the container metrics and then has them aggregated to prometheus through host.docker.internal:8080 to be displayed on grafana dashboard

<h3>Grafana</h3>
Displays the metric data aggregated by Prometheus, Node-exporter, cAdvisor
There is currently an issue where clicking on a graph will cause everything to refresh and show no data forcing you to click off and back on the tab

<h2>Files</h2>
Any files with a '?' are tentatively in their sections, need to search deeper to be sure

<h3>Currently unimplemented files</h3>
<pre>
security/email.js
src/components/AccountDisplay/AccountDisplay.tsx
src/components/ProcessLogsCards/ProcessLogsCard.tsx?
src/components/Settings/Settings.tsx
src/components/Yml/Yml.tsx
src/helpers/settingsHelper.ts
src/reducers/composeReducer.ts?
</pre>

<h3>Files with unneccesary/unknown purpose</h3>
<pre>
.babelrc?
.yarnclean
config.js?
docker-compose-dev.yml
dockerfile.dev
</pre>