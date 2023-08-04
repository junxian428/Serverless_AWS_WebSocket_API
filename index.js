export const handler = async (event) => {
  const { requestContext, body } = event;
  
  // Check if the request is a WebSocket connection request (CONNECT)
  if (requestContext && requestContext.routeKey === '$connect') {
    // Handle WebSocket connection
    const connectionId = requestContext.connectionId;
    console.log(`New WebSocket connection established with ID: ${connectionId}`);

    // Optionally, you can send a welcome message to the client
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from WebSocket Lambda!'),
    };
    return response;
  } else if (requestContext && requestContext.routeKey === '$disconnect') {
    // Handle WebSocket disconnection
    const connectionId = requestContext.connectionId;
    console.log(`WebSocket connection with ID ${connectionId} disconnected.`);
    return {
      statusCode: 200,
      body: JSON.stringify('WebSocket connection disconnected.'),
    };
  } else if (requestContext && requestContext.routeKey === '$default') {
    // Handle other WebSocket events (e.g., message received)
    console.log('WebSocket event received:', body);
    return {
      statusCode: 200,
      body: JSON.stringify('WebSocket event received.'),
    };
  } else {
    // Invalid route key
    return {
      statusCode: 400,
      body: JSON.stringify('Invalid route key.'),
    };
  }
};
