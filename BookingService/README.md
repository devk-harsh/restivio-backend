# Express + TypeScript RESTful API Template
(v1.0-production)

A scalable and maintainable template for building RESTful APIs using Express.js and TypeScript. This version (v1.0-production) introduces request correlation IDs for tracing and a production-grade logging system using Winston, along with zod validation and centralized error handling.

## Overview

This version builds upon `v0.3-error-handling` by adding comprehensive logging infrastructure and request correlation tracking. It maintains the same modular architecture, API versioning, and validation layers while introducing enterprise-grade observability features essential for production environments.
The goal of this version is to provide full traceability of requests through correlation IDs, structured logging with file rotation, and robust error handling to ensure reliable operation in production.

## Features

- **TypeScript**: Full type safety for better development experience and fewer runtime errors.
- **Modular Architecture**: Organized folder structure into config, controllers, routers, middlewares, utils, and validators for clear separation of concerns.
- **API Versioning**: Support for multiple API versions (V1, V2) for backward compatibility.
- **Input Validation**: Zod schemas for validating request bodies and query parameters.
- **Centralized Error Handling**: Custom error classes and middleware for consistent error responses.
- **Request Correlation IDs**: Automatic generation and propagation of correlation IDs for request tracing.
- **Production-Grade Logging**: Winston-based logging with console and daily rotating file outputs, including correlation ID tracking.
- **Environment Configuration**: Centralized config management using dotenv.
- **Express Middleware**: JSON parsing, correlation ID attachment, and modular routing.
- **Development Tools**: Nodemon for auto-restart during development.

## Project Structure

```
├── src/
│   ├── server.ts                    # Main server entry point with middleware setup
│   ├── config/
│   │   ├── index.ts                 # Configuration management (PORT, API_VERSION)
│   │   └── logger.config.ts         # Winston logger configuration with correlation ID
│   ├── controllers/
│   │   └── ping.controller.ts       # Example controller with ping handler and logging
│   ├── middlewares/
│   │   ├── correlation.middleware.ts # Correlation ID generation and context management
│   │   └── error.middleware.ts      # Centralized error handling middleware
│   ├── routers/
│   │   ├── V1/
│   │   │   ├── index.router.ts      # V1 router aggregator
│   │   │   └── ping.router.ts       # V1 ping routes
│   │   └── V2/
│       └── index.router.ts          # V2 router aggregator
│   ├── utils/
│   │   ├── context/
│   │   │   └── request.context.ts   # AsyncLocalStorage for request context
│   │   └── errors/
│   │       └── app.error.ts         # Custom error classes (AppError, BadRequestError, etc.)
│   └── validators/
│       ├── index.ts                 # Validation middleware wrapper with logging
│       └── ping.validator.ts        # Zod schemas for ping endpoints
├── logs/                            # Auto-generated log directory (created at runtime)
├── .env                             # Environment variables (create this)
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. **Clone the repository**:
   ```bash
   # For a specific version (e.g., v1.0-production)
   git clone --branch v1.0-production <repository-url>
   # Move into the project directory
   cd <repository-name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   API_VERSION=v1
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`.

## Usage

### Available Scripts

- `npm run dev`: Start the development server with hot reloading using nodemon.
- `npm start`: Start the production server using ts-node.

## API Endpoints

### V1 Endpoints

- **GET /api/v1/ping**
  - Returns a JSON response with "Pong!".
  - Logs the request with correlation ID.

- **POST /api/v1/ping**
  - Validates request body and query parameters.
  - Body schema: `{ message: string (min 2 chars) }`
  - Query schema: `{ search?: string (min 5 chars, optional) }`
  - Returns JSON "Pong!" on success.
  - Returns `400 Bad Request` if validation fails.
  - All requests include correlation ID in logs and response headers.

- **GET /api/v1/ping/check**
  - Returns "Checked" with 200 status.

### V2 Endpoints

- **GET /api/v2/ping**
  - Returns "v2 is active." (placeholder for future enhancements).

## Testing the API

You can test the API endpoints using **Postman** or **curl**. During testing, observe the console output and log files for correlation ID tracking and structured logging messages.

### 1. GET Request – Health Check

- **Method:** `GET`
- **URL:**
  ```
  http://localhost:3000/api/v1/ping
  ```
- **Expected Response:**
  ```json
  {
    "message": "Pong!"
  }
  ```
- **Response Headers:** Includes `x-correlation-id`
- **Logs:** Check console/logs for a log entry with the correlation ID indicating "Ping request received"

---

### 2. POST Request – Validation Example

- **Method:** `POST`
- **URL:**
  ```
  http://localhost:3000/api/v1/ping?search=queryValue
  ```
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "message": "Hello World"
  }
  ```

#### Successful Response

```json
{
  "message": "Pong!"
}
```

- **Logs:** Check console/logs for validation success messages ("Request Body is Valid") and the ping request log, all tagged with the same correlation ID.

#### Validation Failure Example

If the request body is invalid:

```json
{
  "message": "H"
}
```

The API will return:

- `400 Bad Request`
- Validation error details in the response
- **Logs:** Check console/logs for validation failure message ("Request Body is Invalid") with the correlation ID for tracing.

---

## Architecture Overview

- **server.ts**: Initializes Express app, sets up middleware (JSON parsing, correlation ID, error handling), mounts routers, and starts the server with logging.
- **config/**: Manages environment variables and Winston logger configuration.
- **controllers/**: Contains business logic for handling requests, responses, and logging.
- **middlewares/**: Handles cross-cutting concerns like correlation ID attachment and error handling.
- **routers/**: Defines URL routes and maps them to controllers. Supports versioning.
- **utils/**: Provides shared utilities for request context management and custom error classes.
- **validators/**: Zod-based validation schemas and middleware with logging for input validation.

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3001)
- `API_VERSION`: API version string (used in config)

### Logging Configuration

The application uses Winston for logging with the following features:
- **Console Transport**: Real-time logging to console during development.
- **Daily Rotate File Transport**: Logs saved to `logs/app-YYYY-MM-DD.log` with 14-day retention and compression.
- **Correlation ID Integration**: Every log entry includes the request's correlation ID for traceability.
- **Structured JSON Format**: Logs are formatted as JSON with timestamp, level, message, and metadata.

### TypeScript Configuration

The project uses CommonJS modules for compatibility with Node.js. Key settings in `tsconfig.json`:
- `module: "CommonJS"`
- `strict: true`
- `rootDir: "./src"`
- `outDir: "./dist"`

## Request Correlation

Every incoming request is assigned a unique correlation ID:
- **Automatic Generation**: If not provided, a UUID is generated.
- **Header Propagation**: `x-correlation-id` header is set in responses.
- **Context Storage**: Uses AsyncLocalStorage for thread-safe context management.
- **Log Integration**: All log entries include the correlation ID for request tracing.

## Error Handling

Centralized error handling ensures consistent responses:
- **Custom Error Classes**: `AppError` and subclasses (`BadRequestError`, `UnauthorizedError`, etc.) for operational errors.
- **Middleware**: Catches and formats errors appropriately.
- **Logging**: Errors are logged with correlation IDs for debugging.
- **Response Format**: Standardized error responses with success flag and message.

## Validation

Input validation is handled using Zod schemas with logging:
- **Request Body Validation**: Ensures incoming JSON data matches expected structure.
- **Query Parameter Validation**: Validates URL query strings.
- **Error Handling**: Returns 400 status with error details on validation failure.
- **Logging**: Validation attempts and failures are logged.

Example validation schemas in `validators/ping.validator.ts`:
```typescript
export const pingBodySchema = z.object({
    message: z.string().min(2),
});

export const pingQuerySchema = z.object({
    search: z.string().min(5).optional(),
});
```

## Development Notes

### Production Readiness

This version includes production-grade features:
- **Logging**: Structured logging with file rotation for long-term storage.
- **Tracing**: Correlation IDs enable request tracing across distributed systems.
- **Error Handling**: Centralized error management prevents information leakage.
- **Stateless Architecture**: Each request is independent, enabling horizontal scaling.

- **TypeScript Compilation**: The project uses ts-node for direct execution and nodemon for development watching.
- **Middleware Stack**: Global middleware handles body parsing, correlation ID, and error catching.
- **Validation**: Zod schemas are applied through reusable validation middleware with logging.
- **Controllers**: Business logic executes only after successful validation, with comprehensive logging.
- **Routers**: Route definitions are modularized for better organization.

## Version History
This repository is organized into multiple versions, each building upon the previous one with additional features. 
It maintains multiple versions as git tags:

- **v0.1-basic**: Basic Express + TypeScript setup with controllers, routers, and server.ts
- **v0.2-validation**: Added Zod validation layer for request bodies and query parameters
- **v0.3-error-handling**: Introduced centralized error handling with custom error classes
- **v1.0-production**: Added request correlation IDs and production-grade logging (current version)

## Contributing

This is a template project. To contribute or extend:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Test your changes thoroughly.
5. Push to your branch.
6. Submit a pull request.