// package.json scripts // "mygit":"node handle-mygit"
// in the command line // npm run mygit -- my real commit message

const { exec } = require("child_process"); // to execute another commandline task in a running process

const moduleArgs = process.argv; // -->  [node.exe, handle-mygit.js, my, real, commit, message]
moduleArgs.splice(0, 2); // it removes the first two items in the array -->  [my, real, commit, message]
const commitMessage = moduleArgs.join(" "); // joins the all array items as one string with " " as separator

exec("git add .", () => {
  console.log("everything was added");
  // we write it here to be executed after 'git add .'
  exec(`git commit -m "${commitMessage}"`, () => {
    console.log("everything was commited by this message:", commitMessage);
    exec("git push");
  });
});

console.log("the final string is: ", commitMessage);
