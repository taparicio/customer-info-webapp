# Trevor Aparicio Customer Information Webapp
This is a basic web application built to display customer information to its users. It is built using a Node.js and ExpressJs RESTful API server, an Angular client web-based interface, and a MongoDB backend-database.

## Structure
./client - This is the location of the angular front-end source code
./server - This is the location of the Node.js back-end RESTful server source code.

## Docker Setup
This project was setup to allow instantiation within docker containers. Each section is hosted in its own container so there are three total: a client container, a server container, and a database container.

### Running Docker
Install the docker daemon and docker-compose. Once Docker is installed on the machine, enter the main project directory. There is a file called docker-compose.yml in this directory. From the directory run `docker-compose up`. This will build the docker images and run them according to the docker-compose configuration and the dockerfile configurations in client and server.

**Note:**
For some reason when first running the database image restarts after first initialization and import of base data. Then the server attempts to connect, fails, and shuts down. If you `ctrl-c` your first docker run and then execute `docker-compose up` once more this will start all three images successfully

**Note2:**
Due to my developing on a Windows 8.1 machine I was forced to use Docker Toolbox instead of Docker Desktop for Windows so I had to follow https://www.jhipster.tech/tips/020_tip_using_docker_containers_as_localhost_on_mac_and_windows.html to be able to access my server from my client using the "localhost" URL. Using "localhost" should allow others running docker from the desktop (Docker Desktop for Windows/Mac or docker in Linux) to run without issues. Therefore, if you are running Docker on linux or Docker Desktop for Windows/Mac, you shouldn't have to do this.

## Viewing the Application
When the docker images are running via docker-compose the web application can be accessed at [localhost](http://localhost:80).
