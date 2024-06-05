#!/bin/bash

# Get environment variables
source .env

# Function to install a package if not already installed
# install_package_if_not_installed() {
#     package=$1
#     hasPackage=$(pip list | grep $package)
#     if [ -z "$hasPackage" ]; then
#         echo "$package not found, installing..."
#         pip install $package
#         if [ $? -ne 0 ]; then
#             echo "Failed to install $package, exiting..."
#             exit 1
#         fi
#     fi
# }

# # Check if Flask is installed and install it if not
# install_package_if_not_installed "Flask"

# # Install all dependencies from deps.txt
# while IFS= read -r package; do
#     install_package_if_not_installed "$package"
# done < deps.txt

# Run the Flask app using the run.py script
python ./app/run.py
