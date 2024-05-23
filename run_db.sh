#!/bin/bash

# Set container name and volume name
CONTAINER_NAME=formerdb
VOLUME_NAME=formerdb-volume
DATABASE_NANE=former

# Function to check if the container exists
container_exists() {
    docker container inspect $1 > /dev/null 2>&1
}

# Function to check if the container is running
container_is_running() {
    RUNNING=$(docker inspect --format="{{.State.Running}}" $1 2> /dev/null)

    if [ "$RUNNING" == "true" ]; then
        return 0
    else
        return 1
    fi
}

# Ensure Docker is running
echo "Ensuring Docker service is running..."
if (! docker stats --no-stream ); then
    # Start Docker service if not running
    echo "Starting Docker service..."
    sudo systemctl start docker
fi

# Check if the MongoDB container exists
if container_exists $CONTAINER_NAME; then
    echo "MongoDB container exists."

    # Check if the container is already running
    if container_is_running $CONTAINER_NAME; then
        echo "MongoDB container is already running."
    else
        # Start the container
        echo "Starting MongoDB container..."
        docker start $CONTAINER_NAME
    fi
else
    # Create and start the container
    echo "Creating and starting MongoDB container..."
    docker run --name $CONTAINER_NAME -p 27017:27017 -v $VOLUME_NAME:/data/db -d --restart unless-stopped mongo
fi

# Prompt to connect to MongoDB using mongosh inside the container
read -p "Do you want to enter the container shell and run $DATABASE_NANE database? (y/n) " answer
case ${answer:0:1} in
    y|Y )

    docker exec -it $CONTAINER_NAME mongosh "mongodb://127.0.0.1:27017/$DATABASE_NANE"

    ;;
    * )
        echo "MongoDB is running. You can enter the shell later using: docker exec -it $CONTAINER_NAME mongosh"
    ;;
esac
