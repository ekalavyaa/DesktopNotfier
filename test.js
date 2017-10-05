const exec= require('child_process').exec;
exec(`echo -e '\a' > /dev/console`, function(err, stdout) {
console.log(err);    
console.log(stdout);
});
