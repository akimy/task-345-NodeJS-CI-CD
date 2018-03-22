#!/bin/bash
for branch in $(git --git-dir ./repository/.git branch --all | grep '^\s*remotes' | egrep --invert-match '(:?HEAD|master)$'); do
    git --git-dir ./repository/.git branch --track "${branch##*/}" "$branch"
done