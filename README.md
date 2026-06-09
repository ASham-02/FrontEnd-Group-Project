# FrontEnd-Group-Project

# DnD Character Creator — Frontend

Project Overview

A responsive web-based frontend for the DnD Character Creator application. The frontend provides an intuitive user interface that allows users to register, log in, create characters, view character information, and manage their DnD characters through integration with the Spring Boot backend API.

# How to Run

1. Clone the repository
2. Open the project in Visual Studio Code
3. Ensure the Spring Boot backend is running on http://localhost:8080
4. Open the frontend using Live Server or your preferred local development server
5. Access the application through your browser

# Application Flow

1. User registers or logs in.
2. User is redirected to the Character Creator page.
3. User selects a character class, element, and stats.
4. User enters character details and submits the form.
5. Character data is sent to the backend and stored in the Railway MySQL database.
6. Users can view, edit, and delete their characters.

# Technologies Used

- HTML5
- CSS3
- JavaScript
- Visual Studio Code
- Fetch API
- REST API Integration

# Team

- Zethu
- Bradley
- Bilal
- Alisha
- Edil

# Features Completed

User Authentication - Edil

- User registration functionality
- User login functionality
- Authentication validation
- Backend API integration for login and registration

Character Management - Zethu

- Create character interafce
- View character information
- Update existing Characters
- Delete characters
- Display user-created characters

Stats Management — Bradley

- Display character statistics
- Create and manage stat records
- Backend API integration for stats

Character Classes — Bilal

- Class selection interface
- Display available character classes
  Backend API integration for class management

Elements — Alisha

- Element selection interface
- Display available elements
- Backend API integration for element management

# Backend Integration

The frontend communicates with the Spring Boot REST API using Fetch requests.

# API Endpoints Consumed

Characters

- GET /api/characters/user/{userId}
- GET /api/characters/{id}
- POST /api/characters
- PUT /api/characters/{id}
- DELETE /api/characters/{id}

Stats

- GET /api/stats
- GET /api/stats/{id}
- POST /api/stats
- PUT /api/stats/{id}
- DELETE /api/stats/{id}

Classes

- GET /api/classes
- GET /api/classes/{id}
- POST /api/classes
- PUT /api/classes/{id}
- DELETE /api/classes/{id}

Elements

- GET /api/elements
- GET /api/elements/{id}
- POST /api/elements
- PUT /api/elements/{id}
- DELETE /api/elements/{id}

Users

- GET /api/users
- GET /api/users/{id}
- POST /api/users/register
- POST /api/users/login

# Testing

The frontend was tested to ensure:

- Successful user registration
- Successful user login
- Character creation functionality
- Character retrieval and display
- Character updates
- Character deletion
- Successful communication with backend APIs
- Responsive and user-friendly interface

# Backend Dependency

This frontend requires the Spring Boot backend server to be running and connected to the Railway MySQL database for all data operations.
