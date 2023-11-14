# API Model (SDK)

## To build API Docs - Use Swagger Editor to View [API Docs](/docs/api/openapi.yml)
<https://github.com/swagger-api/swagger-editor>
</br>
<https://editor.swagger.io/>

## Frontend Models

### Purpose
To abstract away API calls made by the frontend.

##### /ui/src/models

1. To import Client

```
import Client from '/path/to/models/Client.ts'
```

2. There are multiple services to which an API call can be made
  * ContainerService
  * VolumeService
  * ImageService
  * NetworkService
  * SystemService
  * ConfigService
  * API (can be used to make direct API calls to underlying API)

```
// Example
import Client from '../../models/Client'

const containerId: string = 'docker-container' // This can be the container ID or name of the container
// Returns a boolean whether or not the container could be run
const success: boolean = await Client.ContainerService.runContainer(continerId); 

// Returns all running containers on host machine
const containers: ContainerPS[] = await Client.ContainerService.getRunningContainers(); 

```

## Future Direction

1. Build out a more descriptive error catching system

* Give user feedback on whether the container couldn't be stopped because the name was not found, or because the container was being used by a process that couldn't be stopped

2. Add an option to select which fields are returned from the backend.

```
const fields: string[] = ['Mounts', 'RunningFor', 'CreatedAt'];
const containers: ContainerPS[] = await Client.ContainerService.getRunningContainers(fields);

/*
* Returned containers would have the properties
* {ID, Mounts, Names, RunningFor, CreatedAt, Status} 
* Certain defaults like 'ID', 'Name' and 'Status' 
* should all be returned from the backend, but may be configured
*/
```

3. Fix backend status codes and returns. Currently almost all return 500 for errors, or 201-204 for some kind of success. These are not correct.

4. Make sure [/docs/api/openapi.yml](/docs/api/openapi.yml) are all up to date with the backend API.
