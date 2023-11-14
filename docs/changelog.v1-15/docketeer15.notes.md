# Changelog

## v15.0.0
#### Features
* Added pagination for docker containers in ***Containers*** tab
* Changed ***Metrics*** tab dashboard (see imageConfigs/grafana/provisioning/docker_metrics.json)
* Added ***Kubernetes Metrics*** tab for monitoring nodes running on a kubernetes cluster (see imageConfigs/grafana/provisioning/k8s-view-nodes.json)
* Added ability to search through container logs based on timeframe, as well as keywords and select-all functionality
* Added a Home button to the Container and K8 Metrics Tabs so users can return to the dashboard after viewing individual panels

#### Dev Features
* Fixed backend API and added documentation (docs/api/openapi.yml)
* Frontend SDK for API
* Added build feature for browser-dev, extension-dev, and prod

#### Bug Fixes
* Made STOP button, stop the specified container from running (Broken button before)
* Application crashing when querying empty containers
* Removed bug that crashes app in the process logs form

#### Misc. Fixes and Cleaning
* Removed all docker images from imageConfigs folders as they were unused
* Removed ***d3 sankey patch*** file and directory
* Removed prometheus-grafana.yml (unused in new configuration)
* Removed ***UNUSED_FILES*** directory as it was unused...
* Removed left over comments from the browser version
* Removed bug that crashes app in the process logs foNetworks Tab, since it did not work anyway

## v14.0.0
#### Features
* Changed browser version of dockeeteer into Docker DesktopExtension
* ***REMOVED USER FUNCTIONALITY***
* Reduced image size for dockerfiles
* Moved ***Home*** and ***About Us*** pages to docker extension detailed description
* Created makefile for deployment


## v13.0.0 and prior
* unkown