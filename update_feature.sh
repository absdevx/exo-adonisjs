#!/bin/bash

# Argument parsing
OPTIONS=$(getopt -o f:c:n: --long folder:,commit:,feature: -n 'publish_feature.sh' -- "$@")
if [ $? -ne 0 ]; then
  echo "Invalid arguments provided."
  exit 1
fi
eval set -- "$OPTIONS"

# Default values
folder=""
commit=""
feature=""

# Process command-line options
while true; do
  case "$1" in
    -f | --folder )
      folder="$2"
      shift 2 ;;
    -c | --commit )
      commit="$2"
      shift 2 ;;
    -n | --feature )
      feature="$2"
      shift 2 ;;
    -- )
      shift
      break ;;
    * )
      echo "Invalid option: $1"
      exit 1 ;;
  esac
done

# Validate required arguments
if [ -z "$folder" ] || [ -z "$commit" ] || [ -z "$feature" ]; then
  echo "Usage: publish_feature.sh -f <folder> -c <commit> -n <feature>"
  exit 1
fi

# Arguments
folder="$1"
commit="$2"
feature="$3"

echo "commit=$commit"
return

# Navigate to the specified folder
cd "$folder" || exit
git add "."

# Commit the changes with the provided message
git commit -am "$commit"

# Publish the feature branch using Git Flow
git flow feature publish "$feature"

# Publish the feature branch using Git Flow
git flow feature track origin "$feature"


echo "Feature '$feature' published successfully."
