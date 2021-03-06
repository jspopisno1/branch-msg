# Why `branch-msg`

All we know that Git is designed to "forget" the original branch that a commit comes from.

This information is important (or useful) in some scenarios. For example, to matching a commit with your issue tracking system. Or, make it easier to dig into the history to reason about a certain bug.

For actually capture such information, in some project, we are forced to leave the "issue id" or the "branch name" explicitly. That's tedious.

# Here is `branch-msg`

Simple goto the root of your git repo, where `.git/` sits.

run:

```
# if it's the first time
npm install -g branch-msg

# init the git repo's commit-msg hook
branch-msg-init
```

And from now on, your commit message will have the following appended.

```
branch at : #[ YOUR_BRANCH_NAME ]#
```

# Future work

Though it's easy enough, there is some posible plan depending how it's used.

- [ ] Custom commit message template
- [ ] A way to avoid appending for some commit
- [ ] A way that you can re-init the "branch message amending script"

# Known issue

This solution *MIGHT* not work in PC, as it's not fully tested.

The following env is used in for some projects :

- Mac iTerm/Console
- Mac SourceTree

However, Enjoy. ;)

