## Name: Othman NOUAOURY

## How to run project:

### API:

1. Run the migration locally to have the appropriate tables in database using `npm run migration:run`
2. Create a new `.env` file in the root of the API project (Refer to the `.env-sample` file)
3. Run the project using `npm run dev`

### UI:

1. Run the project using `npm run dev`

## Design choice

### API

The backend architecture follows an N-Tier Architecture pattern. This separates the application into the following layers:

- Presentation Layer
- Business Logic Layer
- Data Access Layer

This separation of concerns promotes better maintainability, scalability, and testability.
The design choice made for this project is to use **N-Tiers architecture** for the backend to have seperate layers (prentation layer - business logic layer - data access layer).

### UI

The frontend is a simple **Single Page Application (SPA)** built with ReactJS. It provides a responsive and efficient user experience by dynamically updating the page without requiring a full reload.
