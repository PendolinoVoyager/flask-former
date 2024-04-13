#!/bin/bash

#get env variables
source .env


hasFlask=$(pip list | grep Flask)
if [ -z "$hasFlask" ]; then
    echo "Flask not found, install?"
    read -p "y/n: " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Exiting..."
        exit 1
    fi
    pip install Flask
    if [ $? -ne 0 ]; then
        echo "Failed to install Flask, exiting..."
        exit 1
    fi
    
fi

python -m flask --app $APP_NAME run --port $PORT --host $HOST
