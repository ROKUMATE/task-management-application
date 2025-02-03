# Task Management Application

This project is a **Task Management Application** built using **React**, **TypeScript**, and **Node.js** with a backend powered by **Express** and **MongoDB**. It allows users to perform CRUD operations on tasks, including creating, updating, deleting, and marking tasks as complete or incomplete.

## Features

-   Add new tasks with details like person, title, description, and due date.
-   Edit tasks to update any field as needed.
-   Mark tasks as completed or incomplete.
-   Delete tasks.
-   View all tasks in a tabular format.

---

## How to Run

### Prerequisites

-   Node.js installed on your machine.
-   MongoDB connection string.

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <repository-folder>
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```env
MONGO_URI=<your-MONGO_URI>
DOMAIN=<your-deployed-domain> # e.g., localhost:3000
```

### Run the Application

To run the application in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## API Endpoints

### 1. Get All Tasks

**Endpoint:** `GET /api/getTasks`

**Response Example:**

```json
{
    "data": [
        {
            "_id": "67a101669c82488ec1c42b52",
            "person": "John Doe",
            "title": "Complete React Project",
            "description": "Finish the remaining components.",
            "dueDate": "2025-02-15",
            "completed": false
        }
    ]
}
```

### 2. Create a New Task

**Endpoint:** `POST /api/createTasks`

**Request Body Example:**

```json
{
    "person": "Jane Doe",
    "title": "Write Documentation",
    "description": "Prepare README.md for the project.",
    "dueDate": "2025-02-20"
}
```

### 3. Update a Task

**Endpoint:** `PUT /api/updateTasks`

**Request Body Example:**

```json
{
    "id": "67a101669c82488ec1c42b52",
    "title": "Update React Components",
    "description": "Refactor existing components.",
    "completed": true
}
```

### 4. Delete a Task

**Endpoint:** `DELETE /api/deleteTasks`

**Request Body Example:**

```json
{
    "id": "67a101669c82488ec1c42b52"
}
```

---

## Development Notes

-   The project uses **Axios** for API calls.
-   Task statuses are toggled via checkboxes in the UI.
-   The UI is styled using TailwindCSS.
-   Errors are logged in the console for debugging.

---

## License

This project is licensed under the MIT License.
