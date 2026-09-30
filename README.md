# Smart Campus Complaint & Service Management System

A full-stack in-house project that helps students report campus issues and allows administrators to track complaints from submission to resolution.

## Features
- Student complaint submission
- Complaint categories and priority
- MySQL database storage
- Admin dashboard
- Pending / In Progress / Resolved workflow
- Complaint statistics
- Delete complaint
- Responsive UI
- REST API

## Tech Stack
- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MySQL

## Project Structure
```text
smart-campus-complaint-system/
├── database/schema.sql
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Requirements
Install:
- Node.js
- MySQL Server

## Setup

### 1. Create database
Open MySQL Workbench and run:

```sql
source database/schema.sql;
```

Or open `database/schema.sql`, copy its contents, and run it in MySQL Workbench.

### 2. Configure database
Create a `.env` file using `.env.example`.

Example:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_campus
PORT=3000
```

### 3. Install packages
```bash
npm install
```

### 4. Start
```bash
npm start
```

Open:
`http://localhost:3000`

## Demo Flow
1. Submit a complaint.
2. Show that it appears in the admin dashboard.
3. Change it to In Progress.
4. Change it to Resolved.
5. Show the statistics changing automatically.

## Future Enhancements
- Student/admin login
- Image upload
- Email notifications
- Complaint assignment
- Search and filtering
- Role-based access control

## Academic Use
This project can be presented as an in-house campus service automation system.
