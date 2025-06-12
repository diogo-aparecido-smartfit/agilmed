# AgilMed

AgilMed is a healthcare application platform consisting of a backend API and a mobile application, designed to facilitate appointment scheduling, doctor-patient communication, and healthcare management.

## Project Structure

The project is divided into two main components:

- **Backend API** (api): Node.js-based backend service
- **Mobile App** (app): React Native mobile application

## Technologies

### Backend API

- **Node.js + Express**: Web server framework
- **Sequelize**: ORM for database operations
- **Microsoft SQL Server**: Database
- **JWT**: Authentication mechanism
- **Nodemailer**: Email services
- **Swagger**: API documentation
- **Azure Blob Storage**: Image and file storage
- **Natural**: NLP for chatbot functionality
- **Docker**: Containerization

### Mobile App

- **React Native (Expo)**: Cross-platform mobile framework
- **Redux Toolkit**: State management
- **Redux Saga**: Side effect management
- **React Hook Form + Yup**: Form handling and validation
- **Axios**: HTTP client
- **React Query**: Data fetching and caching
- **Expo Router**: Navigation
- **Emotion/Styled Components**: Styling
- **Date-fns**: Date manipulation

## Setup Instructions

### Backend API Setup

1. Navigate to the API directory:

   ```bash
   cd agilmed/api
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root of the api directory with the following variables:

   ```
   PORT=3000
   DB_URL=your_mssql_connection_string
   JWT_SECRET=your_jwt_secret
   AZURE_STORAGE_CONNECTION_STRING=your_azure_storage_connection_string
   OPENROUTER_MODEL=openai/gpt-4o
   FIRST_OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. Run database migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the development server:

   ```bash
   yarn dev
   ```

6. For production:

   ```bash
   yarn build
   yarn start
   ```

7. Docker alternative:
   ```bash
   docker build -t agilmed-api .
   docker run -p 3000:3000 agilmed-api
   ```

### Mobile App Setup

1. Navigate to the app directory:

   ```bash
   cd agilmed/app
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root of the app directory with:

   ```
   API_URL=http://your-api-url:3000
   ```

4. Start the Expo development server:

   ```bash
   npx expo start
   ```

5. Use the Expo Go app on your mobile device to scan the QR code or press 'i' to open in iOS simulator or 'a' for Android emulator.

## Architecture

### Backend Architecture

The API follows a layered architecture:

- **Controllers** (controllers): Handle HTTP requests and responses
- **Services** (services): Implement business logic
- **Repositories** (repositories): Database access layer
- **Models** (models): Sequelize data models
- **Routes** (routes): Define API endpoints
- **Middlewares** (middlewares): Handle authentication and request processing
- **Utils** (utils): Helper functions

Key features include:

- RESTful API design
- JWT-based authentication
- Database migrations for version control
- Docker containerization for deployment
- AI-powered chatbot capabilities
- Azure blob storage integration for file uploads

### Mobile Architecture

The mobile app uses a modern React Native architecture:

- **Screens** (organized in app): Main application screens
- **Components** (components): Reusable UI components
- **Redux Store** (store): State management
- **Services** (services): API communication
- **Hooks** (hooks): Custom React hooks
- **Providers** (providers): Context providers

Features:

- Redux Toolkit for state management
- React Query for data fetching
- Expo Router for navigation
- Responsive design with Emotion/Styled Components
- Offline capabilities with AsyncStorage

## API Documentation

When running the backend, Swagger documentation is available at:

```
http://localhost:3000/docs
```

## Database Schema

The database includes tables for:

- Users (doctors, patients, admins)
- Doctors
- Patients
- Appointments
- Medical Centers

The schema relationships are defined in associations.ts.

## Development Workflow

1. Backend: Make changes, run tests, and use migrations for database changes
2. Mobile: Use Expo's hot reloading for rapid development
3. Both use TypeScript for type safety and better developer experience

## Troubleshooting

- If the API doesn't connect to the database, check your connection string and network settings
- For mobile app issues, ensure your API_URL is accessible from your device/emulator
- Check logs using `yarn logs` in the respective directories

## Contributing

Please follow the established code structure and patterns when contributing to the project.

## License

This project is proprietary and confidential.
