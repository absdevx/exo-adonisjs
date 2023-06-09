#!/bin/bash

# Argument parsing
OPTIONS=$(getopt -o c:n: --long commit: -n 'update_feature.sh' -- "$@")
if [ $? -ne 0 ]; then
  echo "Invalid arguments provided."
  exit 1
fi
eval set -- "$OPTIONS"

# Default values
commit=""

# Process command-line options
while true; do
  case "$1" in
    -c | --commit )
      commit="$2"
      shift 2 ;;
    -- )
      shift
      break ;;
    * )
      echo "Invalid option: $1"
      exit 1 ;;
  esac
done

if [ -z "$commit" ] || [ -z "$FEATURE_NAME" ]; then
  echo "Usage: $0 -c <commit>"
  exit 1
fi


git add "."

# Commit the changes with the provided message
git commit -am "$commit"

# Publish the feature branch using Git Flow
git flow feature publish "$FEATURE_NAME"

# Publish the feature branch using Git Flow
git flow feature track origin "$FEATURE_NAME"


echo "Feature '$FEATURE_NAME' published successfully."
