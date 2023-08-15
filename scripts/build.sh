#!/bin/bash

# Builds the different versions and translations of the documentation.
# This is assumed to be called from the project root.

set -e # Fail script on error

# Documentation projects to include in the build, must be separated by comma and no spaces.
all_projects='mainnet,academy'

# Languages to include in the build
all_languages='en'

source_dir='source'
build_dir='build'

# Expose settings for the build to create links between them
export all_projects
export all_languages

# Convert the strings to arrays
IFS="," read -a projects <<< $all_projects
IFS="," read -a languages <<< $all_languages

printf "Building documentation versions: ${all_projects} for languages ${all_languages}\n"

mkdir -p "${build_dir}"

printf "Copying 'public' to '${build_dir}'\n"
cp -rv public/* ${build_dir}

for current_project in ${projects[@]}; do
  printf "\nProject '${current_project}':\n-----------------------------\n"
  export current_version

  for current_language in ${languages[@]}; do
    export current_language
    printf "\nRunning build '${current_project}' for language '${current_language}'\n"
    sphinx-build "${source_dir}/${current_project}" "${build_dir}/${current_language}/${current_project}" -D language="${current_language}" -W
  done

printf "Adding symlink ${build_dir}/404.html to ${languages[0]}/${projects[0]}/404.html\n"
ln -sf "${languages[0]}/${projects[0]}/404.html" "${build_dir}/404.html"

done
