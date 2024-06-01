# Former app

This project is a Google-Forms-like application that allows users to create, share, and analyze forms anonymously. It is composed of three main services: a Flask server, a Next.js frontend server, and a Rust server for analytics. The project is designed to run on Linux systems.

## Requirements

Before you begin, ensure you have the following installed on your system:

- **Node.js** version 20.0.0+ with npm
- **Python** with the following packages:
  - flask
  - flask-cors
  - dotenv
  - mongoengine
  - bcrypt
  - slugify

- **Cargo** (Rust package manager)
- **Docker** (to run MongoDB)
- **Choice of OS**
    - Linux: App created with this system in mind, the bash scripts work out of the box.
    - MacOS: Should also work as long as dependencies are met.
    - Windows: Bash scripts aren't necessary to run this app but it will be a hassle, still, all tools          used are open source and thus available on Windows.
## Quick Start

Follow these steps to set up and run the application:

### 1. Clone the Repository

```bash
git clone https://github.com/PendolinoVoyager/flask-former.git
cd flask-former
```
### 2. Install Node.js Dependencies
```bash
cd former-frontend
npm install
cd ..
```
### 3. Set Up Python Environment
Install the required Python packages:
```bash
pip install flask flask-cors dotenv mongoengine bcrypt slugify
```
### 4. Install Rust Dependencies
Ensure you have Cargo installed, then build the Rust server:

```bash

cd answer-aggregator
cargo build --release
cd ..
```

### 5. Start MongoDB

Run MongoDB in a Docker container:

```bash
./run_db.sh
```
This script conviniently set's up the database with the same name as in .env file.
### 6. Start the Application

Run the main bash script to start all services:

```bash
./start_app.sh
```
or for release mode:

```bash
./start_release.sh
```
Alternatively, start the 3 servers with:
```bash
    cd former-frontent
    npm run dev
    //In another shell
    cd answer-aggregator
    cargo run
    //Yet another shell, why not
    cd server
    ./run.sh
```
## Scripts
    start_app.sh

This script sets up the environment and starts the Flask server, Next.js frontend server, and Rust analytics server in development mode.
start_release.sh

    start_release.sh
This script sets up the environment and starts the Flask server, Next.js frontend server, and Rust analytics server in production mode.
## Services
## Flask Server

The Flask server handles the backend logic and API endpoints.
## Next.js Frontend Server

The Next.js server serves the frontend of the application.
## Rust Analytics Server

The Rust server handles the data analysis tasks for the application.

