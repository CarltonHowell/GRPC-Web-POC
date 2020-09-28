import { HelloRequest, HelloReply } from "./proto/helloworld_pb";
import { GreeterClient } from "./proto/HelloworldServiceClientPb";

// @ts-ignore
const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});

var client = new GreeterClient(
  "http://" + window.location.hostname + ":8080",
  null,
  null
);

enableDevTools([client]);

// simple unary call
var request = new HelloRequest();
request.setName("World");

client.sayHello(request, {}, (err, response) => {
  if (err) {
    console.log(
      `Unexpected error for sayHello: code = ${err.code}` +
        `, message = "${err.message}"`
    );
  } else {
    console.log(response.getMessage());
  }
});

// server streaming call
// var streamRequest = new RepeatHelloRequest();
// streamRequest.setName('World');
// streamRequest.setCount(5);

// var stream = client.sayRepeatHello(streamRequest, {});
// stream.on('data', (response) => {
// console.log(response.getMessage());
// });
// stream.on('error', (err) => {
// console.log(`Unexpected stream error: code = ${err.code}` +
//          `, message = "${err.message}"`);
// });
