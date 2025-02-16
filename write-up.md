# Technical Test Write-Up

## Backend Development

For the technical test, I was tasked with creating the backend for a todo app using NestJS. Here is a summary of the steps I followed:

1. **Research and Setup**: I began by looking up the official NestJS documentation to familiarize myself with the framework. This helped me understand the best practices and how to structure the project.

2. **Project Initialization**: I set up the project using the NestJS CLI and started with some initial tests to ensure everything was configured correctly.

3. **Following a Tutorial**: To get a better grasp of NestJS, I followed a tutorial which provided a hands-on approach to building a basic application.

4. **Coding the Server**: With the foundational knowledge in place, I began coding the server. I implemented basic modules, including:
    - **Users Module**: For managing user data.
    - **Todos Module**: For managing todo items.

5. **User Authentication**: I then implemented authentication for users, ensuring secure access to the application. This involved setting up JWT (JSON Web Tokens) for user sessions.

6. **Testing with Postman**: I used Postman to test the authentication endpoints. This helped me verify that the backend was functioning as expected.

7. **Todo Management**: After confirming that user authentication was working, I implemented the todo management features, allowing users to create, read, update, and delete todo items.

8. **Final Testing**: I conducted thorough testing of the todo functionalities to ensure everything was operational.

## Dockerisation

To ensure the back end could be easily deployed and run in different environments, I added Docker support:

1. **Dockerfile for NestJS Server**: I created a Dockerfile for the NestJS server. This file defines the environment and dependencies required to run the server in a Docker container.

2. **Docker Compose Configuration**: I modified the `docker-compose.yml` file to include the NestJS server and mongodb server. This setup allows for seamless orchestration of multiple containers, ensuring that the backend and the database work together correctly.

By dockerising the server, I made it easier to deploy and run in various environments, ensuring consistency and reliability.

## Frontend Development

After completing the backend, I moved on to developing the frontend for the todo app. Here are the steps I followed:

1. **Choosing a Framework**: I discovered that Create React App was deprecated. The official documentation recommended using Next.js instead.

2. **Project Initialization**: I started a new project with Next.js, setting up the initial structure and configuration.

3. **Authentication Setup**: I began by setting up user authentication using the React Hook Form package. I read through the documentation to understand how to integrate it into my Next.js project and configured it accordingly. 

4. **Bug Fixes in Backend**: During the authentication setup, I encountered some bugs in the backend. However, these issues were not very difficult to resolve, and I was able to fix them promptly.

5. **Todo Dashboard Page**: After setting up authentication, I proceeded to develop the todo dashboard page. I used Material-UI (MUI) for all the components, which provided a consistent and visually appealing design. I started with the services to consume the backend API and then implemented the UI components and pages.

6. **Continuous Bug Fixes**: Whenever I encountered bugs in the backend while working on the frontend, I addressed them immediately to ensure smooth functionality across the application.

By following these steps, I successfully developed both the backend and frontend for the todo app, ensuring a fully functional and secure application.
