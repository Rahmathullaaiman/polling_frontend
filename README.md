# 🎨 Polling System – Frontend

This repository contains the **frontend implementation** of the Polling System Machine Test.  
The frontend is built with **React.js** and provides the user interface for authentication, poll creation, voting, and result viewing.  

It connects with the [Polling System Backend](https://github.com/Rahmathullaaiman/polling_backend.git).

---

## 🚀 Features

- **Authentication**
  - Login and Registration forms
  - JWT token storage in local/session storage
  - Automatic redirect on login/logout

- **Role-Based Views**
  - **Admin Dashboard**
    - Create new polls
    - Edit/Delete polls while active
    - Manage private poll participants
  - **User Dashboard**
    - View public polls
    - Access private polls if invited
    - Vote on active polls
    - View results of expired polls

- **Poll Management**
  - Poll list with title, description, expiry timer
  - Voting interface (single vote per poll)
  - Expired poll badge with results view
  - Real-time update of poll counts

---

## 🛠️ Tech Stack
- **Framework**: React.js (Create React App / Vite)
- **UI**: Bootstrap / Tailwind CSS
- **State Management**: React Context / Hooks
- **HTTP Client**: Axios / Fetch API
- **Authentication**: JWT stored in browser
- **Backend**: [Nest.js API](https://github.com/Rahmathullaaiman/polling_backend.git)

---

#### NOTE -

This frontend was developed manually.  
ChatGPT was only used for **UI/UX structure suggestions**.  
also helped to fix some bugs.
All code and logic (API integration, state management, UI) were written manually.

---

## 📂 Project Structure
src/
├── components/ # Reusable UI components (PollCard, Forms, Navbar)
├── pages/ # Login, Register, Dashboard, Poll Details
├── context/ # User context (auth state, permissions)
├── services/ # API calls (auth, polls)
├── App.js # Main routing
└── index.js # Entry point


---

## ⚙️ Setup

### Prerequisites
- Node.js v18+
- npm or yarn
- Backend running → [polling_backend](https://github.com/Rahmathullaaiman/polling_backend.git)

### Installation
```bash
# Clone repo
git clone https://github.com/Rahmathullaaiman/polling_frontend.git
cd polling_frontend

# Install dependencies
npm install

📩 Submission

GitHub Repo: https://github.com/Rahmathullaaiman/polling_frontend.git
