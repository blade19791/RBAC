# Security & Role-Based Access Control (RBAC) Project

This is a simple Node.js project built to implement and solidify core backend concepts in web security, authentication, and scalable software architecture.

## 🚀 Concepts Learned & Implemented

### 1. MVC Architecture
The application is structured using the **Model-View-Controller (MVC)** architectural pattern, separating concerns into logical components:
- **Models**: Responsible for all database interactions and data-related business logic.
- **Controllers**: Handle incoming HTTP requests, coordinate with models, and send responses.
- **Routes**: Define the API endpoints and map them to specific controller functions.
- **Middlewares**: Intercept and process requests (e.g., validating inputs, checking auth tokens) before they reach the core logic.

### 2. Authentication
Implemented a secure user authentication workflow:
- Securely storing user credentials using password hashing techniques.
- Validating credentials during the login flow.
- Building stateless authentication to ensure the API can scale without relying on server-side sessions.

### 3. JSON Web Tokens (JWT)
Configured JSON Web Tokens to securely transmit identity information between the client and the server:
- The login route generates and signs a JWT containing the user's `id`, `email`, and `role`.
- Tokens are configured with an expiration window for enhanced security.
- Created custom middleware to intercept incoming requests, extract the token from headers, and verify its signature and expiration.

### 4. Authorization & Role-Based Access Control (RBAC)
Built an authorization layer on top of authentication to control what resources a user can access:
- Users are assigned distinct roles (e.g., `admin`, `moderator`, `user`).
- Developed a custom reusable middleware (`requiredRole`) that intercepts requests to protected routes.
- The middleware cross-references the user's encoded JWT role against the required role for that specific route, resulting in either access being granted or a `403 Forbidden` response.

### 5. SQL Injection Prevention
Secured the database layer from malicious attacks:
- Exclusively utilized **parameterized queries** for all database interactions.
- By passing inputs as parameters (e.g., using `$1, $2` in pg), the database engine properly sanitizes inputs. This creates a strict separation between the SQL command and user data, effectively preventing SQL injection attacks.

## 🛠️ Core Technologies Used
- **Node.js** with **Express.js**
- **PostgreSQL** (Database)
- **jsonwebtoken** (Auth)
- **Joi** (Input Validation)
