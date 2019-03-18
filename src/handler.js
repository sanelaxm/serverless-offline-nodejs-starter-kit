const warmup = require( './utils/warmup.util' );

/**
 * POST api/v1/handler
 *
 * @typedef {Function} Handler example
 * @param {*} event - The AWS Lambda event
 * @param {*} context - The AWS Lambda context
 * @returns {Promise} Returns a success or failure response
 */
module.exports.handler = warmup( ( event, context, callback ) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const body = JSON.parse( event.body ) || {};

  return callback( null, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    statusCode: 200,
    body: JSON.stringify( body )
  } );
} );
