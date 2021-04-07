const child = require('child_process');
const args = process.argv;
const commit = args[args.length - 1];

child.exec(`git add . && git commit -m"${commit}" && git push`, (err, stdout) => {
  if (err) {
    console.log('err', err);
  }
  console.log('stdout', stdout);
});
