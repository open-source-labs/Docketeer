# Working with Grafana

## Grafana Files

* Go to ***/imageConfigs/grafana*** this is where the Grafana config files are located

* ***grafana.init*** initializes your Grafana instance with settings that allow us to embed dashboards into Dcoketeer. Do not change this file.

* Inside the ***/imageConfigs/grafanaprovisioning*** you will find 2 more directories: ***dashboards*** and ***datasources***.

* ***datasources*** tells Grafana where to look for metrics. You'll see that it is already set up to query the Prometheus instance on port 9000 (see the Docketeer Config Diagram in ***/docs/assets/docketeer-config.png***). Do not change this file.

* ***dashboards*** contains our JSON and yaml files that build our dahboards. These are the primary files to edit if you want to change the dashboards or create a new one. The yaml file tells Grafana where to fetch the files to build our dashboards, and what datasource we are using for our panels and queries. Each JSON file will build a seperate dashboard for use to use as an embedded iframe in Docketeer. Currently there are 4: ***dashboard.json*** which is used in the Containers tab, ***docker_metrics.json*** which is used in the Container Metrics tab, ***snapshot-dashboard.json*** which is used in the Snapshot tab, and ***k8s-views-nodes.json*** which is used in the Kubernetes Metrics tab. Each JSON file is thousands of lines long, and has many configurations to achieve the graphs we have. To edit, or add panels, the primary method is to navigate to the Grafana and Prometheus endpoints, and to use the Grafana GUI.

## Using the Grafana GUI

When running Docketeer in Dev Mode, a Grafana instance is running on the exposed port 49155, and a Prometheus instance is running on the exposed port 49156.

* Navigate to ***localhost:49155***

* Sign into the Grafana instance with both the username and password ***"admin"***

* This will allow you to edit, your current dashboards and apply those changes to your running instance of Docketeer. 

* To the left of the Welcome Page, you will see a tab titled "Dashboards" where our current dashboards should be listed. We can then navigate to a specific dashboard, and see all of our metrics in the browser.

* On our Nav Bar you should see: The name of our dashboard, a share button, an add panel button, a save button, a settings button, the shared timeframe of all of our panels, a timerange zoomout button, a refresh button, the refresh rate of our panels, a kiosk button (the mode our dashbaords are embedded in), and a toggle top search button. Each of these correspond to an option in our dashboard JSON's. We can change and modify these settings to get the metrics we want.

## Editing the Dashboard

* To change a panel click on the 3 dots in on the upper right of the metric you want to change. Select "Edit".

* Now we can change our query, visualization, and configurations using the Grafana GUI instead of coding the JSON by hand. When you're done, click apply then save, before navigating back to our dashboard. 

* You will notice that once you save, the changes will be reflected in Docketeer. However, These changes will not persist if you rebuild Docketeer. To persist these changes on rebuild we will have to edit the JSON of our dashboards.

* If you made an individual change on a panel. Click the 3 dots on the changed panel, and select "Inspect". Here you can see your Data, Stats, JSON, and Query, but we are interested in the JSON. Copy this entire JSON, and use this to replace the panel in the original dashboard JSON. The easiest way to find the panel you're looking for is to search for the panel name, and to replace the object containing it with your new JSON. 

* Tear down Docketeer, and rebuild to see if the panel has been replaced with your updated one. Sometimes, after tear down, you will need to delete all your images, and delete all volumes except for the prometheus data volume before rebuilding Docketeer in order to make docker rebuild the Grafana instance.

* If you made many changes to many panels, or to the shared settings like timeframe and refresh rate, the JSON process will be slightly different. Click the share button on the Nav Bar, here you can export the entire dashboard ysing different methods. Select "Export" then "View JSON". This is the JSON for the entrie dashboard you have been working on. Select all and copy the JSON. Replacing the whole dashboard JSON will result in an error, so instead you will need to replace the "panels" array. Paste your copied JSON into a seperate VSC window, and callapse the "panels" array to make it easier to copy (in some cases it is thousands of lines long). Callapsed the "panels" array in your dashboard JSON and replace it with your new and improved panels array. Rebuild and your dashboard should be updated with the changes you made. 

## Aditional Notes

* Review the [Grafana Docs](https://grafana.com/docs/grafana/latest/) for details on the configuration files, and working with the JSON settings. 

* To see what your Prometheus query is returning, go to the Prometheus endpoint, exposed in the development mode on port 49156. On localhost:49156 you can insert queries and get raw data to confirm any errors you get on the Grafana Visualizer.

* Review the [Prometheus Docs](https://prometheus.io/docs/introduction/overview/) for details on PromQL and Prometheus.

* . Prometheus is scrapping the container data from cAdvisor which is running on port 49158 in development mode. You can visit this in browser to compare any metrics you're fetching in Prometheus or Grafana. See more in the [Prometheus Docs](https://prometheus.io/docs/guides/cadvisor/) and the [cAdvisor Github](https://github.com/google/cadvisor).

* When export dashboards, Grafana tends to create varibles such as {DS_Prometheus} or {DS_Postgres}. If you run into issues regarding this, find the specific uid for by clicking the 3 dots of a specific panel and looking at its JSON.