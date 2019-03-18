/**
 * Grabs all the handler config files and concats it into one yml file.
 */
module.exports = () => {
  const _ = require( 'lodash' );
  const fs = require( 'fs' );
  const apiFiles = fs.readdirSync( './api', {} );
  const YAML = require( 'yamljs' );

  const mappedFileSet = [];

  console.log( [ { files: apiFiles } ]
    .map( fileSet => {
      mappedFileSet.push( fileSet.files.map( fileName =>
        fs.readFileSync( `./api/${ fileName }`, 'utf8' ) )
      );

      return _.flatten( mappedFileSet ).join( '' );
    } ).map( raw => {
      return YAML.parse( raw );
    } ).reduce( ( result, handler ) => Object.assign( result, handler ), {} ) );

  return [ { files: apiFiles } ]
    .map( fileSet => {
      mappedFileSet.push( fileSet.files.map( fileName =>
        fs.readFileSync( `./api/${ fileName }`, 'utf8' ) )
      );

      return _.flatten( mappedFileSet ).join( '' );
    } ).map( raw => {
      return YAML.parse( raw );
    } ).reduce( ( result, handler ) => Object.assign( result, handler ), {} );
};
