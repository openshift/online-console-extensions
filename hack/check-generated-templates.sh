#!/bin/bash

set -e

# Install grunt if needed
if ! which grunt > /dev/null 2>&1 ; then
  npm install grunt-cli
fi

npm install --unsafe-perm

# We don't need grunt to be installed globally for the system,  so
# we can amend our path to look into the local node_modules for the
# correct binaries.
repo_root="$( dirname "${BASH_SOURCE}" )/.."
export PATH="${PATH}:${repo_root}/node_modules/grunt-cli/bin"

# run the build to generate dist
echo "Rebuilding templates..."
grunt build --env=free
grunt build --env=paid

# validate generated against what is committed
echo "Verifying that checked in built files match the source..."
GIT_STATUS="$( git status --short --untracked-files )"
GIT_DIFF="$( git diff )"

if [[ -n "$GIT_STATUS" ]]; then
  FAILURE_COUNT=1
  FAILURE_MESSAGE="Built templates does not match what is committed, run grunt build and include the results in your commit."
  ERROR_COUNT=1
  POTENTIAL_FAILED_TEST="<failure type=\"GENERATED_TEMPLATES_FAILURE\" message=\"$FAILURE_MESSAGE\"><![CDATA[ $GIT_DIFF ]]></failure>"
  PASSED=false
else
  PASSED=true
fi

# finally, print results message & write the file
if [[ "${PASSED}" == "true" ]]; then
  echo "Verified. Rebuilt templates match what has been committed."
else
  echo "Built templates do not match what is committed, run 'grunt build' and include the results in your commit."
  git diff --exit-code
  exit 1
fi
