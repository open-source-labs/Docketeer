# Changelog

## v16.0.0
#### Features
* Added ***Save Metric*** button under Container Metrics tab to save 6 key metrics of the container. Key metrics are metric date, diskspace, memory, swap, cpu usage and available memory. Those metrics are saved in PostgreSQL. 
* Added ***Snapshot*** page. By selecting a timestamp in the dropdown, users can compare the metrics saved in the database. 
* Added ***Snapshot test*** dashboard in Grafana for display the metrics visualization. (see /imageConfigs/grafana/provisioning/dashboards/snapshot-dashboard.json)
* Added ***configurations*** to connect Grafana dashboard and PostgreSQL (see /imageConfigs/grafana/provisioning/datasources/srcPostgres.yml)


#### Bug Fixes
* Fixed all frontend ***testing*** files to make sure the components are being rendered. Testings include Container tab, Image tab, Metric tab, Network tab, Volume tab and Reducers. 
* Fixed all server ***testing*** files to make sure all the routes are functioning as expected. Testing include Network Routes

#### Misc. Fixes and Cleaning
* Added ***Typescript*** to new features and fixed some Typescript on previous codebase.
* Added additional information to ***Documentation*** to help with later iterations.
* Added comments to snapshot related code
* Deleted unnecessary comments 

