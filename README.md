# Koovea Technical Test - Todo App

This project is a technical test for Koovea. It is a Todo application built using MongoDB, NestJS, and React with the Next.js framework.

## Getting Started

To start the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd todovea
    ```
3. Run the docker containers:
    ```bash
    docker compose up
    ```

## Write-Up

A detailed write-up of the project is also included in this repository.

## Environment Setup

To configure the environment, you need to create three `.env` files: one at the root of the project, one in the `back` folder, and one in the `front` folder.

### Root `.env` file

The root `.env` file should contain the following variables:

```
MONGO_INITDB_ROOT_USERNAME={mongodb-root-username}
MONGO_INITDB_ROOT_PASSWORD={mongodb-root-password}
MONGO_INITDB_DATABASE={mongodb-database}
```

### Back-end `.env` file

The `back/.env` file should contain the following variables:

```
CONNECTION_STRING={mongodb-connection-string}
JWT_SECRET={jwt-secret}
PORT={server-port}
FRONT_URL={front-url(for-cors)}
```

### Front-end `.env` file

The `front/.env` file should contain the following variables:

```
NEXT_PUBLIC_API_URL={back-api-url}
```
