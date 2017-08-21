
var sp = require('shell-promise');
var fs = require('fs');

// The only argv of commit-msg hook denotes the file path of the commit message
var commitMsgTempFile = process.argv[process.argv.length - 1];

if (!commitMsgTempFile) {
    console.log('File of the commit message is not specified. Exit.');
    process.exit(1);
}

// Get the commit message
var commitMsg = fs.readFileSync(commitMsgTempFile).toString();

// Get the current branch (branch of your HEAD)
sp('git rev-parse --abbrev-ref HEAD')
    .then(function (branchName) {

        // Trim the branch name
        branchName = utils.trim(branchName);

        // Append to the commit message and write to the file
        fs.writeFileSync(commitMsgTempFile, commitMsg + '\n\nbranch at : #[ ' + branchName + ' ]#');
    });