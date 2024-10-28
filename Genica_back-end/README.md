# Job Portal Backend API

This repository contains the backend API for the Job Portal project. It handles user registration, authentication, admin panel , job posting, job searching, and job applications.

## Table of Contents
- [Job Portal Backend API](#job-portal-backend-api)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Connecting Frontend (Basic Example)](#connecting-frontend-basic-example)
  - [Types of Routers](#router-types)
  - [API Endpoints](#api-endpoints)
    - [User/Employee Endpoints](#useremployee-endpoints)
    - [Employer Endpoints](#employer-endpoints)
    - [Admin Endpoints](#admin-endpoints)
  - [Request Samples](#request-samples)

## Prerequisites
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/)

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/Geinca/Back-end.git
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the PostgreSQL database:
    - Ensure PostgreSQL is installed and running.
    - Create a new database and user for the project.

## Configuration
1. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    PORT=3000
    DB_USER=your_postgres_username
    DB_PASSWORD=your_postgres_password
    DB_HOST=localhost
    DB_PORT=your_db_port
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret
    SALT_ROUNDS=10
    NODE_ENV = set envirnoment (production / developement)
    ```

## Running the Application
1. Start the server:
    ```sh
    npm run test
    ```

2. The server will be running at `http://localhost:3000`.

## Connecting Frontend (Basic Example)
1. Ensure the backend server is running.
2. Update your frontend application to make API requests to `http://localhost:3000`.

    Example using Axios in a React frontend:
    ```javascript
    import axios from 'axios';

    const register = async (email, password, role) => {
      try {
        await axios.post('http://localhost:3000/api/auth/register', { email, password, role });
      } catch (error) {
        console.error('Registration error', error);
      }
    };

    const login = async (email, password) => {
      try {
        await axios.post('http://localhost:3000/api/auth/login', { email, password });
      } catch (error) {
        console.error('Login error', error);
      }
    };
    ```

## Router Types
There are 3 routers :-

Router1 ```/api/auth```  : This is basic authentication router

Router2 ```/api/role```  : This router is only for role based auth

Router3 ```/api/role/employer```  : This route is for operations by employer

## API Endpoints

### User/Employee Endpoints
- `POST api/auth/register`: Register a new user.
    - **Description**: Registers a new user (default role: user) and for employer (role:employer). Requires `email`, `password`, and optionally `role` (either `user` or `employer`) in the request body.
    - **Sample Request**:
      ```json
      {
        "email": "user@example.com",
        "password": "password123",
        "role": "user"
      }
      ```

- `POST api/auth/login`: Login a user and generate a JWT.
    - **Description**: Authenticates a user and returns a JWT. Requires `email` and `password` in the request body.
    - **Sample Request**:
      ```json
      {
        "email": "user@example.com",
        "password": "password123"
      }
      ```

- `Jwt verification`: include jwt token from cookie in request.
   **JWT refs of back-end**:
   ```javascript

   const authenticateToken = (req, res, next) => {

    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.redirect('/login');
        req.user = user;
        next();
    });
   }


  ```     

- `GET api/auth/main`: Redirect to this route after sucessfully signup/login (requires valid JWT).
    - **Description**: Access protected user content after logging in. (Requires a valid JWT in cookies.)

- `GET api/auth/search`: Search for a specific job.(requirs valid jwt token in cookies)
    - **Description**: Search for jobs based on title and location. Requires `title`, `location`, `page`, and `limit` as query parameters where page means which page you want to show starts from 1 , and limit means no of data per page;
    - **Sample Request**:
      ```http
      GET /api/auth/search?title=developer&location=kolkata&page=1&limit=10
      ```

- `POST api/auth/jobs/:jobId/apply`: Apply for a specific job.
    - **Description**: Allows an employee to apply for a job. Requires the `jobId` as a URL parameter.
    - **Sample Request**:
      ```json
      {
        "jobId": "1"
      }
      ```      

### Employer Endpoints
- `GET api/role/employer`: Access to the employer (admin) page.
    - **Description**: Access the employer dashboard. Requires employer role verification.

- `POST api/role/employer/job`: Post jobs by the employer.
    - **Description**: Allows an employer to post a new job. Requires job details in the request body.
    - **Sample Request (include in request body)**:
      ```json
      {
        "title": "Web developer",
        "description":"Web developer job desc ........",
        "requirments":"html , css , j.s",
        "location":"remote",
        "salary":"45000"
      }
      ```

- `GET api/role/employer/jobs`: Get all the jobs posted by an employer.
    - **Description**: Retrieves all jobs posted by the authenticated employer(non-pagenated).

- `DELETE api/role/employer/jobs/:id`: Delete a specific job posted by an employer.
    - **Description**: Deletes a job by `jobId`. Requires the `jobId` as a URL parameter.

- `PUT api/role/employer/jobs/:id`: Update specific job data posted by an employer.
    - **Description**: Updates job details. Requires the `jobId` as a URL parameter and updated job data in the request body.

- `GET api/role/employer/jobs/applications`: View job applications for posted jobs.
    - **Description**: Retrieves a list of applicants for the employer's jobs.

-`PUT api/role/employer/jobs/applications/accept/:jobId/:userId` : Accept a employee's job application , 'jobid' and 'userid' to be included in the request as url params.

-`PUT api/role/employer/jobs/applications/reject/:jobId/:userId` : Reject a employee's job application , 'jobid' and 'userid' to be included in the request as url params.