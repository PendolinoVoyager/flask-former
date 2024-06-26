#!/bin/bash

echo "Starting the database service..."
./run_db.sh

cd ./answer-aggregator
echo "Starting the Rust application..."
cargo run &
RUST_PID=$!
cd ..

cd ./server
echo "Starting the Python server..."
./run.sh &
PYTHON_PID=$!
cd ..

cd ./former-frontend
npm run dev &
NEXT_PID=$!

# Optionally wait for all processes to exit (if you need the script to stay open)
wait $RUST_PID $PYTHON_PID $NEXT_PID
