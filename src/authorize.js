const jwt = require( 'jsonwebtoken' );

/**
 * Returns an IAM policy document for a given user and resource
 * @param {String} userId - user id
 * @param {String} effect  - Allow / Deny
 * @param {String} resource - resource ARN
 * @param {String} context - response context
 * @returns {Object} policyDocument
 * @private
 */
function _buildIAMPolicy ( userId, effect, resource, context ) {
  console.log( `[LOG] buildIAMPolicy ${ userId } ${ effect } ${ resource }` );
  return {
    principalId: userId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    },
    context
  };
}

/**
 * Determines if user has the has access to certain property
 * @param {String} userRole - Holds the user's roles
 * @param {Array} acceptedRoles - User role that has permission to access the endpoint
 * @returns {Boolean}
 * @private
 */
const _authorizeUser = ( userRole, acceptedRoles ) => acceptedRoles.includes( userRole );

/**
 * Creates an IAM policy for a given user
 * @param {*} event - The AWS Lambda event
 * @param {String} token - Authorization Token
 * @param {Array} acceptedRoles - User role that has permission to access the endpoint
 * @private
 */
function _createUserPolicy ( event, token, acceptedRoles ) {

  // Verify JWT
  const decoded = jwt.verify( token, process.env.JWT_SECRET );

  // Checks if user can call endpoint based on the user's role
  const user = decoded.user,
    userRole = user.role,
    isAllowed = _authorizeUser( userRole, acceptedRoles );

  // Return an IAM policy document for the current endpoint
  const effect = isAllowed ? 'Allow' : 'Deny',
    userId = user.userId,
    authorizerContext = { user: JSON.stringify( user ) };

  return _buildIAMPolicy(
    userId,
    effect,
    event.methodArn.split( '/' ).slice( 0, 2 ).join( '/' ) + '/*',
    authorizerContext
  );
}

/**
 * Authorizer function that is executed before the actual function
 * @param {String} event.authorizationToken - JWT
 * @throws Returns 401 if the token is invalid or has expired.
 * @throws Returns 403 if the token does not have sufficient permissions.
 * @private
 */
function _handler  ( event, context, callback, acceptedRoles )  {
  console.log( '[AUTHORIZATION] Authorization initiated for endpoint: ', event.methodArn );
  const token = event[ 'authorizationToken' ];

  try {
    const policyDocument = _createUserPolicy( event, token, acceptedRoles );
    console.log( '[LOG] Returning IAM policy document!' );
    context.succeed( policyDocument );
  } catch ( e ) {
    console.log( e.message );
    context.fail( 'Unauthorized' ); // Return a 401 Unauthorized response
  }
}

/**
 * Example of a role based authorizer method
 */
module.exports.authorizeUser = ( event, context, callback ) => {
  _handler( event, context, callback, [ 'USER' ] );
};
