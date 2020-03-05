# ¿Cómo está tu abuela?
The purpose of this application is to synchronize pictures between two or more devices, where one device controls which picture is present on all other devices. It consists of two elements, a controller and viewer, named accordingly. 

In order to add pictures you have to create a folder in the root of the project named `photos/`. All pictures added in this directory are available for the controller. 
You can use subfolders as "albums". The subfolder names must only contain alphanumerical characters, underscores and hyphens.

## Requirements
  - NodeJS (>=8)
  - Docker
  - docker-compose

## Build and run locally
To build and run it locally you need NodeJS. To change the URL or port the application is served from you can set the environment variables `PORT="8080"` and `APP_URL="http://localhost:8080/"` to appropriate values. 

  - npm install
  - npm run build
  - npm run start
  - Go to: [http://localhost:8080/](http://localhost:8080/) ([http://localhost:8080/controller](http://localhost:8080/controller))

## Build and run in docker
To build and run it in docker you need docker and docker-compose.
  - docker-compose up [-d] [--build]
  - Go to: [http://localhost:8080/](http://localhost:8080/) ([http://localhost:8080/controller](http://localhost:8080/controller))
  
## Screenshots
![Controller](assets/controller.png)
![Viewer](assets/viewer.png)
