# Assignment 5 Documentation

## Event Management API

### Project Overview 

The Event management API is designed to help organization manage events. It allows users to create, update, delete, retrieve all or retrieve one from the list of events while tracking the amount of registered people and the event's current status.

This solves the problem of event management by providing a single, secure API that handles event data, including date validation, event capacity, and event status tracking. The API is optimized for JSON-based application, ensuring easy integration. The API is intended for developers, product teams, and organizations who want to integrate event management functionality into their application without starting from scratch

### Installation Instructions

#### Prerequisites

Before running this API, make sure you have:

- **Node.js (v18 or higher)**  
- **npm (v9 or higher)**  - install dependencies
- **Firebase project + service account credentials** - database
- **Git** - to clone repo

#### How to start server

1. Clone the repo on your chosen file location: gitbash
    - git clone https://github.com/AldwinCunanan/BED_assignment_3
    - cd to root directory
2. Install dependencies:
    - npm install
3. Setup environment variables
    - setup .env
4. start server
    - npm start
    - api runs at http://localhost:3000

#### API examples 

- Get All Events
    curl -X GET http://localhost:3000/api/v1/event
    response (200 OK)JSON: {
    "message": "Events retrieved",
    "total": 5,
    "data": [
        {
        "id": "1",
        "name": "Tech Workshop",
        "date": "2026-04-15T10:00:00Z",
        "capacity": 50,
        "status": "active",
        "category": "workshop",
        "registrationCount": 12
        }
    ]
    }

- Create event
    curl -X POST http://localhost:3000/api/v1/event \
  -d '{
        "name": "New Conference",
        "date": "2026-05-20T09:00:00Z",
        "capacity": 100,
        "category": "conference"
      }'
    response (201 created) : {
        "message": "Event created",
        "data": {
            "id": "6",
            "name": "New Conference",
            "date": "2026-05-20T09:00:00Z",
            "capacity": 100,
            "status": "active",
            "category": "conference",
            "registrationCount": 0
  }
    }

- Update event 
    curl -X PUT http://localhost:3000/api/v1/event/6 \
  -d '{
        "status": "cancelled"
      }'
      response (200 OK):{
        "message": "Event updated successfully",
        "data": {
            "id": "6",
            "name": "New Conference",
            "date": "2026-05-20T09:00:00Z",
            "capacity": 100,
            "status": "cancelled",
            "category": "conference",
            "registrationCount": 0
  }
      }

#### Public Documentation
 - https://aldwincunanan.github.io/BED_assignment_3/

#### Local documentation Access

Make sure server is running then...
 - http://localhost:3000/api-docs