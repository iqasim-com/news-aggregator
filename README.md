# New Aggregator

Welcome to the News Aggregator Application! This project is a frontend web application designed to provide a seamless and user-friendly experience for browsing news articles from multiple sources. The application aggregates articles from various APIs, allowing users to search, filter, and personalize their news feed based on their interests.

---

### [DEMO](https://drive.google.com/drive/folders/1dLniOeW_fIaq6gYE5E4i1rO1X0YU8OZO?usp=sharing)

<img width="1680" alt="image" src="https://github.com/user-attachments/assets/343abd9a-1eb1-4017-a77a-83c5081cfc10" />


## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Running in Development Mode](#running-in-development-mode)
4. [Building the Project](#building-the-project)
5. [Building and Running with Docker](#building-and-running-with-docker)
6. [ESLint Configuration and Recommendations](#eslint-configuration-and-recommendations)

---

## Prerequisites

- **Node.js**: Ensure that [Node.js](https://nodejs.org/) (v20 or later) is installed on your system.
- **npm**: Comes bundled with Node.js. Alternatively, you can use `yarn` if desired, but this project is configured for npm.
- **Docker**: [Docker](https://www.docker.com/) should be installed if you want to build and run the project using a container.

---

## Getting Started

1. **Clone the Repository**

2. **Install Dependencies**
   Run the following command in the project directory:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Create a `.env` file**
   Create a `.env` file in the root of the project to manage environment variables. A sample `.env-template` might be provided to guide you.

---

## Running in Development Mode

To start the project in development mode with hot module reloading:

1. Run the following command:
   ```bash
   npm run dev
   ```

2. **Access the application:**
   Open your browser and navigate to [http://localhost:5173](http://localhost:5173) (or the URL provided in the terminal).

3. **Changing environment variables:**
   Any `.env` changes will require a restart of the development server.

---

## Building the Project

To build the project for production:

1. Run the following command:
   ```bash
   npm run build
   ```

2. The production-ready files will be output to the `dist/` directory. These can be deployed using any static file server, such as [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

---

## Building and Running with Docker

This project can be run in a containerized environment using Docker. Follow the steps below:

Note: Before building with docker make sure you have ``.env`` file in root directory and populated with requirement environment variables.
### 1. **Build the Docker Image**
Use the following command to build the Docker image:
   ```bash
   docker build -t news-aggregator .
   ```

### 2. **Run the Docker Container**
After building the image, run the following:
   ```bash
   docker run -d -p 80:80 news-aggregator
   ```

Your application will now be available at [http://localhost](http://localhost).

---
