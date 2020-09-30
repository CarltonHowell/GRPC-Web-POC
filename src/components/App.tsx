import React, { useEffect, useState } from 'react';
import {Box, CircularProgress} from '@material-ui/core';

import { HelloRequest, HelloReply } from "../proto/helloworld_pb";
import { GreeterClient } from "../proto/HelloworldServiceClientPb";

// @ts-ignore
const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});

var client = new GreeterClient(
  "http://" + window.location.hostname + ":8080",
  null,
  null
);

enableDevTools([client]);

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    // Wait for 1 second before running the request
    setTimeout(() => {
      // Set up the request
      var request = new HelloRequest();
      request.setName("World");
      
      // Send the request
      client.sayHello(request, {}, (err, response) => {
        if (err) {
          console.log(
            `Unexpected error for sayHello: code = ${err.code}` +
              `, message = "${err.message}"`
          );
        } else {
          // Update the React text and loading state
          setText(response.getMessage());
          setLoading(false);
        }
      });
    }, 1000);
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
      {loading && (
        <div data-testid="loader">
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <>
          {text}
        </>
      )}
      </Box>
  );
}

export default App;
