# DT207-moment2-backend

A modular API and business logic backend. 

It uses a SQLite database for data persistence and the `zod` library to type-check incoming API data. Data access is done via `better-sqlite3` which is a library that contains synchronous methods.

**Note:** The `workExperienceRepository` interface uses async method signatures even though `better-sqlite3` itself is sync.
That’s intentional, because it keeps things flexible if you ever swap out the database for something async like PostgreSQL or MongoDB. This way, you don’t need two separate interfaces just to support different drivers.

For this project, only SQLite is used, but it's written with future-proofing in mind as if you're building something production-ready, not just a one-off assignment.

Also, the next assignment requires MongoDB for data persistence, which this project can easily support by just adding a custom repository layer. Nothing else needs to change. 
Well, aside from the fact that I no longer need to deal with date string conversions, thanks to MongoDB’s support for native Date objects.

---

## 🧱 Project Structure

📦 project-root

```

src/

├── server.ts                             → Entry point: boots the server

├── app.ts                                → App setup: middleware, routes, DB connection

├── config/                               → Env variables setup, CORS options, DB connection logic

├── models/                               → Shared type aliases

├── errors/                               → Custom class errors

├── features/         

│   ├── workExperienceRoutes.ts           → Route definitions + service injection

│   ├── workExperienceController.ts       → Handles requests, delegates to service layer

│   ├── workExperienceService.ts          → Business/domain logic layer (with dependency injection)

│   ├── sqliteWorkExperienceRepository.ts → Raw data access via prepared statements

│   ├── workExperienceRepository.ts       → Interface for data access (DB abstraction)

│   ├── workExperienceValidation.ts       → Zod schemas for validating request bodies

│   └── workExperienceUtils.ts            → Utility functions

db/

└── CVDb.db                               → SQLite database file

```

---

## 📦 Deployment

Deployed on **Azure App Service**
👉 [https://dt207g-moment2.azurewebsites.net](https://dt207g-moment2.azurewebsites.net)

---

## 🛠 Tech Stack

- **Node.js** / **Express**
- **TypeScript**
- **SQLite** (via `better-sqlite3`)
- **Zod**
- **Azure App Service** (deployment target)
- **GitHub Actions** (CI/CD pipeline)

---

## 📊 Data structure

The database consists of a single `WorkExperiences` table, structured as follows:

| Column              | Type   | Description                             |
|---------------------|--------|-----------------------------------------|
| `Id`                | `INT`  | Primary key (auto-increment)            |
| `CompanyName`       | `TEXT` | Name of the company                     |
| `JobTitle`          | `TEXT` | Title of the job                        |
| `WorkCityLocation`  | `TEXT` | City where the work took place          |
| `StartDate`         | `TEXT` | Starting date of the position           |
| `EndDate`           | `TEXT` | Ending date of the position             |
| `Description`       | `TEXT` | Summary of responsibilities or tasks    |

---

## 📡 API Endpoints

### `GET /api/work-experience`
Returns all work experiences from the database.

#### Example request:
```
GET /api/work-experience
```

#### Response:
- Status code: `200 OK`
- Body:
```json
[
    {
        "id": 1,
        "companyName": "Prisma",
        "jobTitle": "DBA",
        "workCityLocation": "New York",
        "startDate": "2020-05-20",
        "endDate": "2024-10-11",
        "description": "Worked with maintaining the company db."
    }
]
```

### `POST /api/work-experience`

- Adds a new work experience.
- **Request Body** (must include a validated `companyName`, `jobTitle`, `workCityLocation`, `startDate`, `endDate`, and `description`)

#### Example request:
```
POST /api/work-experience
Content-Type: application/json
```

#### Request body example:
```json
{
    "companyName": "Prisma",
    "jobTitle": "DBA",
    "workCityLocation": "New York",
    "startDate": "2020-05-20",
    "endDate": "2024-10-11",
    "description": "Worked with maintaining the company db."
}
```
#### Response:
- Status code: `201 Created`

### `PUT /api/work-experience/:id`

- Updates an existing work experience by its ID.
- The `id` must be passed as a route parameter (i.e., in the URL).
- **Request Body** (must include a validated `companyName`, `jobTitle`, `workCityLocation`, `startDate`, `endDate`, and `description`)

#### Example request:
```
PUT /api/work-experience/1
Content-Type: application/json
```

#### Request body example:
```json
{
    "companyName": "Prisma",
    "jobTitle": "DBA",
    "workCityLocation": "New York",
    "startDate": "2020-05-20",
    "endDate": "2024-10-11",
    "description": "Worked with maintaining the company db."
}
```

#### Response:
- Status code: `204 No Content`

### `DELETE /api/work-experience/:id`

- Deletes a work experience by its ID.
- The `id` must be passed as a route parameter (i.e., in the URL).

#### Example request:
```
DELETE /api/work-experience/1
```

#### Response:
- Status code: `204 No Content`

---

## 🧪 Running Locally

### 🧰 Prerequisites

- [Node.js](https://nodejs.org/)
- Git

---

### 🔧 Step 1: Clone the project
```bash
git clone https://github.com/RobinHawiz/DT207G-moment2-backend.git
```
```bash
cd DT207G-moment2-backend
```

---

### 📦 Step 2: Install dependencies
```bash
npm install
```

---

### 🧬 Step 3: Configure environment variables

Create a .env file in the project root with the following variables:
```env
APP_PORT=4000
CORS_ORIGIN=*
```

---

### 🚀 Step 4: Run the backend server

```bash
npm run dev
```
Now your server will be live at http://localhost:4000
