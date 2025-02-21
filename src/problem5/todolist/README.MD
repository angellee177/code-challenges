# Watch Catalogue Project

## Description

This project is a simple Todolist APIs.

## Project Setup

Before you can start the project, ensure all dependencies are installed:

```bash
$ npm install
```

## Running the Project

You can choose to run the project locally. The following instructions cover the setup for local development
### 1. Local Development Setup

To run the project locally, use the following commands:

#### Development Mode

```bash
$ npm run start
```

This command will start the application in development mode.

#### Watch Mode

```bash
$ npm run dev
```

This will start the application in watch mode, where changes to the code will automatically restart the server.

#### Step 1: Set Up Environment Variables

Create a `.env` file in the root directory with the following configuration:

```env
DB_TYPE=db_type
PG_USER=your_db_username
PG_PASSWORD=your_db_password
PG_DB=your_db_name
PG_PORT=port
PG_HOST=localhost
PORT=8000
```
Check the `.env-example` file [here](.env-example).

#### Step 2: Running migration file to create Tables
I have been setup the tables using typeorm migration, use the following commands to run the migration:
```
npm run migration:run
```

#### Step 3: Running seeder
to run the seeder data, use the following commands:
```
npm run seed
```

now APIs is ready to use!!

## Running Tests

You can run tests to ensure the application is functioning as expected.

### Unit Tests

```bash
$ npm run test
```

This will execute the unit tests for the project.

### Test Coverage

```bash
$ npm run test:cov
```

This will run the tests and generate a coverage report.

## Documentation

You can read the APIs doc after you run the APIs to understand how the API work.

## Postman
**Note:** <br>
You can access the API documentation through a Postman collection.
I already include the postman collection [here](todolist.postman.json)

**Steps to Import Postman Collection**:
1. Open Postman.
2. Click on "Import" in the top-left corner.
3. Select "File" and upload the `todolist.postman.json` file from this repository.
4. After importing, you can start making API requests using the defined endpoints.

## Additional Notes
- **Environment Variables**: The `.env` file is critical for configuring the application correctly, especially for connecting to the PostgreSQL database.