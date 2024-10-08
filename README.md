# Live Link
https://bike-service-bice.vercel.app/

# Bike Service Booking Application🏍️💨🚀

This is the MERN Application stack for managing bike services. It provides a platform for users to schedule bike services, track maintenance and history, and receive email notifications when a customer booked for service and when bike is ready for delivery. Admins can manage services , change the status of bookings, and receive email notifications for each booking.

## User Roles
  1.Admin: The Admin role manages the overall system, including managing services, booking statuses, and viewing customer bookings.
  2.Customer: The Customer role can add new bookings, view the status and history of their bookings.

## Features
- Notification
- Authentication
  
### Bike station owner:
 - View a list of all bookings filtered by status (Pending, Ready, Completed, Cancelled)
 - View details of each booking
 - Mark a booking as ready for delivery
 - Mark a booking as completed
 - Receive email notifications whenever a booking is made
 - User Booked but not drop the bike to the service will be Mark as Cancelled

### Customers
 - Register for an account with email address and mobile number
 - Booking service will automatically takes the current date.
 - View the status of their bookings
 - View all previous bookings
 - When user completed Registration Email notifications sent to both user and admin. 
 - User get  Email notifications when their booking is ready for delivery .
 - User account signup/login.

## Technologies
- Reactjs
- Nodejs
- Expressjs
- MongoDB 
- Tailwind CSS
- NodeMailer (Email)

## Login

- Admin 
username: sanjayramesh.official@gmail.com
-You have to add the password to the admin info DB to Login Admin Role

## Deployment

#### 1. Clone the Repository
Clone the Repository by using this github link 
bash
https://github.com/sanjayrp2/BikeService.git


#### 2. Go to the directory and install dependencies for Front-End.
bash
cd Bike
cd frontend
npm install

#### 3. Go to the directory and install dependencies for Back-End.
bash
cd backend
npm install


#### 4. Start the both, Server and Front-End

bash
npm start
nodemon server.js


## Sample Data
Sample Data is in the Model Page
