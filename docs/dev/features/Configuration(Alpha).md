# Configuration (And Kubernetes) Tabs

### Branch: ***jg/config-builder***


## Purpose
To scrape any endpoint that is running prometheus.

## Main App Functionality
Adding/removing endopints in the configuration tab adds or removes them from the database. These changes are not reflected in the kubernetes tab currently. </br>

***Currently Docketeer's prometheus only scrapes an instance of prometheus running in a kubernetes cluster if it is port forwarded to 'http://localhost:45555' with the endpoint '/federate'***

## Feature Branch: 
Adding/removing endpoints in the configurations tab adds or removes them from the database ***and*** builds config files
and causes prometheus to reload with the new config file.


### Current Progress
1. POST /api/prometheus/config 
  * Will insert data into 'datasources' table in postgres.
  * Will create a prom_${id}.yml file in the imageConfig/prometheus folder
  * Will write the path to this file in the 'datasources' table
  * Will merge all prom_${id}.yml files and basePrometheus.yml into master 'prometheus.yml'
  * Sends POST request to 'http://prometheus:9090/-/reload' which causes prometheus to reload and pull from the new 'prometheus.yml' file
2. DELETE /api/prometheus/config
  * Will remove 'datasources' entry in postgres
  * Will delete prom_${id}.yml file in imageConfig/prometheus folder
  * Will rebuild master 'prometheus.yml'

### Current Limitation
1. The config files that are built are not formatted correctly with multiple matches '{job="kubernetes-apiservers"},{job="kubernetes-nodes"}' for instance
   would format the first match correctly
   ```
      - {job="kubernetes-apiservers"}
    - {job="kubernetes-nodes"} <--- second match is too far to the left
   ```
        
2. If there is an error in one of the config files, reloading with the 'http://prometheus:9090/-/reload' will error without feedback. Any future builds will be 
   wrong because of this unless the erroneus .yml file is removed

### Future Suggestions
1. Fix builder so that the file formatting is correct
2. Handle errors for when the 'http://prometheus:9090/-/reload' POST request throws an error. Remove the erroneus file and rebuild the master 'prometheus.yml' file.
3. Work with the prometheus API to give users suggestions into the types of matches available at the endpoint provided.
4. Get 'update' functionality working