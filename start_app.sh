#!/bin/bash

./run_db.sh
cd ./server
./run.sh
cd ../former-frontend
npm run dev