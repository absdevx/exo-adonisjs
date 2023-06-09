#!/bin/bash

  # Ensure a commit message is provided
  if [ -z "$1" && -z "$2" && "$3" ]; then
    echo "Please provide (1:a commit message), (2:the feature name) and (3:folder to add)"
    return 1
  fi

  git add "$3"
  git commit -m "$1"
  git flow feature publish "$2"
  git push feature pull origin "$2"

  echo "Feature: '$2' published successfully."