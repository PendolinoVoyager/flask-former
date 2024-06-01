#!/bin/bash

sudo ./run_db.sh

cd ./answer-aggregator
echo "Starting the Rust application..."
cargo run --release &
RUST_PID=$!
cd ..

cd ./server
echo "Starting the Python server..."
./run.sh &
PYTHON_PID=$!
cd ..

cd ./former-frontend
npm run build
npm start &
NEXT_PID=$!

# Optionally wait for all processes to exit (if you need the script to stay open)
wait $RUST_PID $PYTHON_PID $NEXT_PID
