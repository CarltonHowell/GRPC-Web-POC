# GRPC-Web POC Demo
This repository demonstrates GPRC-Web integration with Typescript.

## Setup Guide

### Install packages
Run `yarn` in the project root to install required packages

### Install protoc and protoc-gen-grpc-web
To generate the protobuf messages and client service stub class from the
`.proto` definitions, we need:
 - the `protoc` binary, _and_
 - the `protoc-gen-grpc-web` plugin.

#### protoc
For mac users, run `brew install protobuf` to install protobuf. Alternate installation instructions can be found at [Installing protoc](http://google.github.io/proto-lens/installing-protoc.html).

#### protoc-gen-grpc-web
You can download the `protoc-gen-grpc-web` protoc plugin from the
[release](https://github.com/grpc/grpc-web/releases) page.

If you don't already have `protoc` installed, you will have to download it
first from [here](https://github.com/protocolbuffers/protobuf/releases).
Make sure they are both executable and are discoverable from your PATH.

For example, in MacOS, you can do:

```sh
$ sudo mv ~/Downloads/protoc-gen-grpc-web-1.2.1-darwin-x86_64 \
  /usr/local/bin/protoc-gen-grpc-web
$ sudo chmod +x /usr/local/bin/protoc-gen-grpc-web
```
### Install docker
Ensure docker is installed on your local machine. See the [Get Docker](https://docs.docker.com/get-docker/) docs.

## Running

1. Run the NodeJS gRPC Service. This listens at port :9090.

 ```sh
 $ node server.js &
 ```

 2. Run the Envoy proxy. The envoy.yaml file configures Envoy to listen to browser requests at port :8080, and forward them to port :9090 (see above).

 ```sh
 $ docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
    -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.15.0
```

3. Run the simple Web Server. This hosts the static file index.html and dist/main.js we generated earlier.

```sh
$ yarn start
```

When these are all ready, you can open a browser tab and navigate to

```sh
localhost:8081
```

Open up the developer console and you should see the following printed out:

```sh
Hello! World
```

## Debugging

### GRPC-Web Chrome Extenstion
Install the [GRPC-Web Chrome Extenstion](https://chrome.google.com/webstore/detail/grpc-web-developer-tools/ddamlpimmiapbcopeoifjfmoabdbfbjj?hl=en) to debug GRPC network requests.


## Updating the proto definition
After making changes to the `helloworld.proto` file, run the following command:
```sh
$ yarn build
```
This will generate new GRPC js client files in the `src/proto` directory.

## Prettier
Prettier is configured to ensure consistent styling on all working files. To prettify all working files run:
```sh
$ yarn prettify
```