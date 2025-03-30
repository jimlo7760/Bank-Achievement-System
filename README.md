# Bank Achievement System

A web-based achievement system for banking activities that gamifies financial tasks and educates users about banking services.

## Live Demo

[Bank Achievement System](https://sddproject-hqfxarbpfrf6fxdz.canadacentral-01.azurewebsites.net/)

## Repository

[GitHub Repository](https://github.com/hengruiren/Bank-Achievement-System)

## Features

- **User Authentication**: Secure login and registration system
- **Employee Performance Tracking**: Complete banking tasks to earn achievements
- **Branch Comparison**: Compare the selected branch with other branches
- **Task Notification**: Notify users of submitted a form/task

## Tech Stack

- **Frontend**: React.js @19.0.0
- **Backend**: Express.js @4.18.2
- **Database**: MySQL @3.10.0
- **Deployment Server**: Microsoft Azure
- **Web Cache & Authentication**: JWT @9.0.2

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/hengruiren/Bank-Achievement-System.git
   cd Bank-Achievement-System
   ```

2. Install server dependencies:
   ```
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

4. Build the frontend:
   ```
   npm run build
   ```

5. Return to the project root and start the server:
   ```
   cd ..
   node server
   ```

6. Open your browser and navigate to `http://localhost:3000` or `http://localhost:8080` (Depending the port displayed on your terminal) to view the application.

**Note**: For security reasons, the local development environment cannot access the production database. Use the **live demo** for full functionality.

### If you want to preview a page specifically:
Following the portion division on `frontend/src/components/AppRouter.jsx`, you can navigate to specific pages by commenting/uncommenting the portion.\
(e.g By default, it directs to the sign-up/login page, if you want to preview the admin dashboard, you can comment out the login/sign-up portion (as well as the employee portion) and uncomment the admin dashboard portion in the `AppRouter.jsx` file.)\
Same reason for if you want to preview the employee dashboard or any other pages. \
**Note**: Whenever you changed the `AppRouter.jsx` file, you will need to restart the server by following commands from step 3.

## Admin Access

For demonstration purposes, you can use the following admin account:

- **Username**: Kerui
- **Password**: Aptx4869030102!

**Note**: Regular users cannot register admin accounts directly for security reasons.

## Project Structure

- `server.js` - Main backend application file
- `frontend/` - React frontend application
    - `src/` - Source code
    - `public/` - Static assets
- `models/` - Database models
- `routes/` - API routes

## API Endpoints

The application provides several API endpoints for various functionalities:

- Authentication routes (login, registration)
- User management routes
- Administrative routes

## Deployment

The application is deployed on Microsoft Azure at [https://sddproject-hqfxarbpfrf6fxdz.canadacentral-01.azurewebsites.net/](https://sddproject-hqfxarbpfrf6fxdz.canadacentral-01.azurewebsites.net/)

**Note**: Since we store cookie and session once you login. Please try to use incognito mode or clear your browser cache if you want to login another user or test different accounts.


## Local Development Limitations

When running the application locally, please note the following limitations:

1. The local instance cannot connect to the production database
2. The achievement system functionality will be limited
3. Admin features will not be fully accessible

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have participated in this project
- Special thanks to the CCB banking resources that helped inform our achievements system