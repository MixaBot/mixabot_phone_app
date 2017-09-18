var fs = require( 'vinyl-fs' );
var ftp = require( 'vinyl-ftp' );
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));


var remotePath = '/phoneapp/'
var conn = new ftp({
  host: 'sirmixabot.com',
  user: args.user,
  password: args.password
});

fs.src( [ './www/**' ], { buffer: false } )
  .pipe( conn.dest('/phoneapp/'));
