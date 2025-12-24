# 🛠 Welcome to HardwareHub

**HardwareHub** is a marketplace PC trading platform built as part of my final group project at **Dev Academy Aotearoa**. This allows users to create profiles, list hardware items, place bids, create bids, manage their accounts and more. This repository highlights my contributions to the group project; focusing on user profile management using both frontend and backend framework. 

## ⚙️Setup

### Cloning and installation

- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  ```sh
  git clone https://github.com/ash-nandan/HardwareHub-Portfolio.git
  cd HardwareHub
  npm install
  npm run dev

  Note: In case if the page is loading or shows internal error try:
  npm run knex migrate:rollback --all
  npm run knex migrate:latest
  npm run knex seed:run  
  ```


## 👩‍💻 My Contributions

I was primarily responsible for implementing the **Profile Functionality** including both frontend and backend features:

## ⚛️ Frontend

### EditProfileForm component 

⤑ Users can update their personal profile information such as username, fullname, contact info, address etc.

⤑ Controlled React form with validation and submission to backend.

### ProfilePage component 

⤑ Display user details, edit profile and delete account.

⤑ Integrated profile picture upload using ProfilePictureCard that I created.

⤑ Managed state using useState and useEffect.

⤑ Styled components using TailwindCSS to match the app's UI design.

## 🌐Backend

### Database Functions (db/profile.ts)

⤑ getProfileById, getProfileByAuthId.

⤑ updateProfile for updating user details.

⤑ deleteProfile with transactional handling of related bids and listing. This was self taught (transactional handling).

### Express Routes (routes/profile.ts)

⤑ CRUD endpoints for profile management.

⤑ File upload handling using a middleware; Multer for profile images. 

⤑ Ensured data integrity and error handling across all endpoints. 

## 🧰 Tech Stack

### Frontend: 
React, TypeScript, Tailwind CSS.

### Backend:
Node.js, Express.js

### Database:
PostgreSQL

### Other Tools:
Multer for file uploads, fetch Api for client server communication. 

## 🚧 Challenges
### When I was implementing the **Delete Profile** feature, I faced a challenge:

⤑ Deleting a user required **removing all related listings and bids** without leaving orphan data.

⤑ Initially, deleting in wrong order caused **foreign key contraint errors**.

## 🤔💭Solution
### I implemented a transactional delete in PostgreSQL:
⤑ Deleted all bids associated with the user listings.

⤑ Delete all bids made by the user.

⤑ Delete the user's listings.

⤑ Delete the user account.

### 💡 Reflection
I had a lot of fun and enjoyed working on this group project! The energy in our team was high and everyone collaborated and communicated very well. I'm quite proud of **learning how to use Multer** for profile uploads. I actually had used Multer in the previous group project; so it was a new challenge for me at first but I got to practise using this middleware again and became quite comfortable with it. I'm still fascinated by how it works. I'll definitely be using Multer again in future personal projects. This project not only strengthened my **technical skills** but also fortified the value of **teamwork**, **communication** and **problem solving** in building applications.   

