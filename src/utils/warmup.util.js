/**
 * If container is being warmed up, exit early (to save on execution costs!)
 * @param {Function} methodToWarm - method to execute
 * @param {*} event - The AWS Lambda event
 * @param {*} context - The AWS Lambda context
 * @param {*} callback - The AWS Lambda callback
 * @returns {Function}
 */
const warm = methodToWarm => ( event, context, callback ) => {
  if ( event.source === 'serverless-plugin-warmup' ) {
    return callback( null, 'Lambda is warm!' )
  }

  return methodToWarm( event, context, callback );
};

module.exports = warm;
