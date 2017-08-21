#!/usr/bin/env node

var fs = require('fs');
var npath = require('path');
var utils = require('../lib/utils');

var sp = require('shell-promise');

var cwd = npath.resolve('.');
var gitPath = utils.j(cwd, '/.git');

var SPECIAL_TAG = '@@@SPECIAL_HOOK_FROM_BRANCH_MSG@@@';
var hookContent = '\n\n# ' + SPECIAL_TAG + '\n' +
    'commit_file="$1"\n' +
    'if [ -e ~/.bash_profile ]\nthen\nsource ~/.bash_profile\nfi\n' +
    'if [ -e ~/.profile ]\nthen\nsource ~/.profile\nfi\n' +
    'branch-msg-append "$commit_file"\n\n';

// Check if it's an active git repo
if (!fs.existsSync(gitPath) && fs.statSync(gitPath).isDirectory()) {
    console.log('The current working directory is not an active git repo. Please make sure that you init ' +
        'branch msg tool on an existing git repo.');
}
else {
    var commitMsgHookPath = utils.j(gitPath, 'hooks/commit-msg');
    utils.ensureFolder(commitMsgHookPath);

    // Check if the git repo's commit-msg hook exists
    if (!fs.existsSync(commitMsgHookPath)) {
        fs.writeFileSync(commitMsgHookPath, '#!/bin/sh\n' + hookContent);
        console.log('`commit-msg` hook is not created yet for the current git repo. A new one has been created.');

        // The hook script should be set as 755 ...
        sp('chmod 755 ' + commitMsgHookPath);
    }
    else {
        var currentHookContent = fs.readFileSync(commitMsgHookPath, 'utf8');

        // Check if the git repo is init-ed
        if (currentHookContent.indexOf(SPECIAL_TAG) !== -1) {
            console.log('This git repo is initialized, initialization skipped.');
        }

        // For commit msg hook exists and not initialized
        else {
            var lines = currentHookContent.split('\n');
            var hashFound = false, binFound = false, inserted = false;

            lines.some(function (line, idx) {
                if (/^\s*#!/.exec(line)) {
                    binFound = true;
                    hashFound = true;
                }
                else if (/^\s*#/.exec(line)) {
                    hashFound = true;
                }
                else if (hashFound && binFound) {
                    // We could only insert the statement after `#!/bin/shell` etc.
                    // And also make it after the first group of hashes.
                    lines.splice(idx, 0, hookContent);
                    inserted = true;
                    return true;
                }
            });

            if (!inserted) {

                // If no bin definition is found, it means the file is some-how broken ?
                // e.g. empty file ???
                if (!binFound) {
                    console.log('Bin definition missing in your git `.git/hooks/commit-msg`. Please have a check why.')
                }
                else {
                    lines.push(hookContent);
                }
            }

            var newContent = lines.join('\n');
            fs.writeFileSync(commitMsgHookPath, newContent);
            console.log('Done. ;)');
        }
    }
}