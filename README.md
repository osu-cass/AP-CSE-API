# AP-CSE-API

> Express API for the Smarter Balanced Content Specification Explorer

## Developing

### Getting Started

To get started, you need the following tools installed on your machine:

- [Git](https://git-scm.com)
- [Docker](https://www.docker.com) with `docker-compose`
- [NodeJS](https://nodejs.org/en/) (Current is preferred, LTS is fine)

Open your command-line tool of choice (cmd, Powershell, Terminal, etc.), and then run the following commands:

```sh
# Go to a directory of your choice
cd path/of/choice

# Clone the repository
git clone https://github.com/osu-cass/AP-CSE-API

# Enter the project directory
cd AP-CSE-API

# Install NPM dependencies
npm i

# Create a .env file for docker-compose to use
cp .env.example .env
```

With that, you should be able to start contributing.

### Running the API Server

#### Via CLI

The easiest way to run the server in development is to use the following command:

```sh
# Compile TS and watch the API server
npm run dev
```

This command will compile the Typescript sourcefiles and watch the `dist` output directory, recompiling and relaunching the server whenever you change a file. This launches the server _without any associated databases._

#### Via Visual Studio Code

If you're using VSCode, you can run the server with debugging using the Debug Server launch option. This will launch the server with `nodemon` so the server can autoreload on recompilation, and then attach a Node debugger on port 9222. For the best development experience, open a new CLI tab/window and run the following command:

```sh
# Recompile on file change
npm run watch-ts
```

### Running the API Server with Associated Resources

#### Breakdown

Since this API server requires a number of resources for data storage and retrieval, we use `docker-compose` to run the following services for local development:

- [MongoDB](https://www.mongodb.com/) for document storage
- [Elasticsearch](https://www.elastic.co/products/elasticsearch) for search indexing and log storage
- [Logstash](https://www.elastic.co/products/logstash) for log collection
- [Jaeger](https://www.jaegertracing.io/) for request tracing

We also run a few helpful applications to make development less painful:

- `mongo-express` for investigating the MongoDB instance
- [Kibana](https://www.elastic.co/products/kibana) for investigating the Elasticearch instance

Use the following table to figure out how to use each of these services in both the API and for debugging:

| Service       |          Exposed Port           | Container Hostname     | Container Port |
| ------------- | :-----------------------------: | ---------------------- | :------------: |
| AP-CSE-API    |  [3000](http://localhost:3000)  |                        |      3000      |
| MongoDB       |                                 | `http://mongo`         |     27017      |
| mongo-express |  [8081](http://localhost:8081)  |                        |                |
| Elasticsearch |                                 | `http://elasticsearch` |      9200      |
| Kibana        |  [5601](http://localhost:5601)  |                        |                |
| Logstash      |                                 | `http://logstash`      |     13337      |
| Jaeger UI     | [16686](http://localhost:16686) | `http://jaeger-query`  |     16686      |

#### Running the services

First, make sure that you have `docker-compose` installed:

```sh
docker-compose
```

If you get an error about being added to the docker user group, consult [this issue](https://github.com/docker/for-win/issues/868) on how to resolve it.

Then, you need to allocate more memory to Docker than the default amount. To do this, open your Docker preferences, open the Advanced tab, and move the Memory slider to somewhere around 3.5GB. Follow the steps that Docker requests once you save these changes.

Then, verify that you have a `.env` file in the root of the project. If you didn't make one during the project setup, do so now:

```sh
cp .env.example .env
```

The next steps are pretty simple. Run the following command in the root of the project to instanciate the services:

```sh
docker-compose up
```

The first run will take a decent amount of time, as Docker will do an initial build of the application image and pull down all the required service images. The output will more or less be a stream of logs, which you'll need to read through to figure out if anything fails. If all goes well, you should be able to visit localhost in the browser on the afore-mentioned exposed ports.

To enable file-watching and recompilation, run the following command in a seperate CLI instance:

```sh
npm run watch-ts
```

This will watch and rebuild the Typescript sourcefiles, and the instance of the API server in Docker will reboot itself using the new files.

#### Debugging

In VSCode, we have a convenient launch configuration for debugging the server from within the Docker container. Simply launch the **Attach to Docker** launch configuration _after you've followed the previous section_, and VSCode will attach a debugger instance. With both the VSCode debug configuration and the `watch-ts` script running, you'll be able use breakpoints to debug the API server as you develop.

## Deployment

Building the deployment is fairly simple. You simply need to build the docker image and push the docker image to docker hub.
You can do that by doing the following:
```
docker build -t {tag name} .
docker push {tag name}
```
For more information on deploying the CSE image please see the CSE configuration repository.
