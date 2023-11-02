#!/bin/bash

# Build the developer documentation and the Concordium Academy.
# This is assumed to be called from the project root.

set -e # Fail script on error

printf "Building Concordium Developer Documentation... \n\n"

source_dir='source'
build_dir='build'

mkdir -p "${build_dir}"

printf "Copying 'public' to '${build_dir}'\n"
cp -rv public/* ${build_dir}

printf "\nRunning build 'mainnet'\n"
sphinx-build "${source_dir}/mainnet" "${build_dir}/en/mainnet" -W

printf "Adding symlink ${build_dir}/404.html to en/mainnet/404.html\n"
ln -sf "en/mainnet/404.html" "${build_dir}/404.html"

printf "\nDone building Concordium Developer Documentation to '${build_dir}'\n"


# Build Concordium Academy, depends on objects.inv produce by mainnet for checking links.
printf "\nBuilding Concordium Academy... \n\n"

academy_build_dir='build-academy'

mkdir -p "${academy_build_dir}"
sphinx-build "${source_dir}/academy" "${academy_build_dir}" -W

printf "Done building Concordium Academy to '${academy_build_dir}'\n"
