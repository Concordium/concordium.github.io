#!/bin/bash

# Builds the different versions and translations of the documentation.
# This is assumed to be called from the project root.

set -e # Fail script on error

# Branches to include in the build, must be separated by comma and no spaces.
all_versions='testnet4'
# Languages to include in the build
all_languages='en'

source_dir='source'
build_dir='build'

# Expose settings for the build to create links between them
export all_versions
export all_languages

# Convert the strings to arrays
IFS="," read -a versions <<< $all_versions
IFS="," read -a languages <<< $all_languages

printf "Building documentation versions: ${all_versions} for languages ${all_languages}\n"

mkdir -p "${build_dir}"

# Add root index.html
printf "Copying index.html to ${build_dir}\n"
cp index.html "${build_dir}/index.html"

for current_version in ${versions[@]}; do
  printf "\nVersion '${current_version}':\n-----------------------------\n"
  printf "Checking out branch '${current_version}'\n"
  git checkout origin/${current_version}
  export current_version

  for current_language in ${languages[@]}; do
    export current_language
    printf "\nRunning build on branch '${current_version}' for language '${current_language}'\n"
    sphinx-build "${source_dir}" "${build_dir}/${current_language}/${current_version}" -D language="${current_language}"
  done
done

printf "Returning to 'main' branch\n"
git checkout origin/main