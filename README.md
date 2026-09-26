# Infoziant MERN Stack Practice & Solutions

A structured repository implementing end-to-end solutions for the **Infoziant MERN Stack curriculum**, divided into two practical sections:

* **MongoDB Database Queries & Aggregations**
* **Interactive React Functional Components**

---

## 📂 Repository Layout

```text
Infoziant-MERN/
├── README.md
├── .gitignore
│
├── MongoDB-Practice-problems/      # MongoDB queries and operations
│   ├── solution-1.mongodb.js       # Database setup & basic collection inserts
│   ├── solution-2.mongodb.js       # Field comparisons ($gt, $lt, $gte, $lte)
│   ├── solution-3.mongodb.js       # Logical filters ($and, $or, $in, $nin)
│   ├── solution-4.mongodb.js       # Sorting, limits, and record skipping
│   ├── solution-5.mongodb.js       # Dynamic record pagination
│   ├── solution-6.mongodb.js       # Document updates ($set, $inc, $rename)
│   ├── solution-7.mongodb.js       # Deletion criteria (deleteOne, deleteMany)
│   ├── solution-8.mongodb.js       # Array operations ($push, $pull, $addToSet)
│   ├── solution-9.mongodb.js       # Nested documents & dot notation
│   ├── solution-10.mongodb.js      # Array matching with $elemMatch
│   ├── solution-11.mongodb.js      # Department aggregations ($group, $match)
│   ├── solution-12.mongodb.js      # Calculated projections ($project, $multiply)
│   ├── solution-13.mongodb.js      # Sales analytics & revenue calculations
│   ├── solution-14.mongodb.js      # Relational joins using $lookup & $unwind
│   ├── solution-15.mongodb.js      # Food Delivery multi-collection design
│   └── solution-16.mongodb.js      # E-Commerce management capstone
│
└── React-Practice-problems/        # React practice exercises
    ├── index.html                  # Single-page HTML container
    ├── main.jsx                    # Dynamic solution selector & renderer
    ├── vite.config.js              # Vite React build configuration
    ├── package.json                # Project dependencies and scripts
    ├── solution-1.jsx              # Reusable functional components & JSX
    ├── solution-2.jsx              # Counter application using useState
    ├── solution-3.jsx              # Props passing and array mapping
    ├── solution-4.jsx              # Controlled registration forms & reset
    ├── solution-5.jsx              # Real-time search filter and fallbacks
    ├── solution-6.jsx              # Timer lifecycle and cleanup with useEffect
    ├── solution-7.jsx              # DOM autofocus handling via useRef
    ├── solution-8.jsx              # Render tracking using useRef
    ├── solution-9.jsx              # Multi-page navigation via React Router
    ├── solution-10.jsx             # Theme switching using Context API
    ├── solution-11.jsx             # REST API consumption via Axios GET
    ├── solution-12.jsx             # Complete Axios CRUD implementation
    ├── solution-13.jsx             # State management via Redux Toolkit
    ├── solution-14.jsx             # Async state handling via Redux + Axios
    └── capstone-solution.jsx       # Full Employee Management System
```

---

## 🛠️ Tech Stack & Dependencies

### Database

* **MongoDB Server**
* **MongoDB Shell (`mongosh`)**
* **MongoDB for VS Code**
* MongoDB Playground

### Frontend

* **React 18 / 19**
* **Vite**
* **JavaScript / JSX**

### State Management & Architecture

* **Redux Toolkit**
* **React Redux**
* **Context API**
* React Hooks

### Navigation

* **React Router DOM**

### HTTP Client

* **Axios**

### API

* **JSONPlaceholder** for mock REST API operations

---

## 🚀 Execution Guide

## 1. Running MongoDB Practice Solutions

### Prerequisites

Make sure MongoDB is installed and running locally.

Default connection:

```text
mongodb://localhost:27017
```

### Steps

1. Open the project root in **Visual Studio Code**.
2. Make sure the **MongoDB for VS Code** extension is installed.
3. Navigate to:

```text
MongoDB-Practice-problems/
```

4. Open any MongoDB solution, for example:

```text
solution-1.mongodb.js
```

5. Run the MongoDB Playground using the **Play** button in the editor.

You can also use:

```text
Ctrl + Alt + E
```

to execute the MongoDB Playground.

---

## 2. Running React Practice Solutions

The React project includes a dynamic solution selector in `main.jsx`, allowing you to switch between individual exercises without manually changing imports.

### Step 1 — Navigate to the React directory

Open PowerShell or a terminal:

```powershell
cd React-Practice-problems
```

### Step 2 — Install dependencies

```powershell
npm install
```

### Step 3 — Start the Vite development server

```powershell
npm run dev
```

Alternatively:

```powershell
npx vite
```

### Step 4 — Open the application

Vite will display a local URL similar to:

```text
http://localhost:5173
```

Open the URL in your browser.

### Step 5 — Select a solution

Use the navigation toolbar to switch between:

```text
P1 → P2 → P3 → ... → P14 → Capstone
```

---

## 📚 Practice Coverage

### MongoDB

The MongoDB section covers:

* Database and collection creation
* Document insertion
* Comparison operators
* Logical operators
* Sorting and pagination
* Document updates
* Document deletion
* Array operations
* Nested documents
* `$elemMatch`
* Aggregation pipelines
* `$group`
* `$match`
* `$project`
* Calculated fields
* `$lookup`
* `$unwind`
* Multi-collection database design
* E-Commerce database operations

### React

The React section covers:

* Functional components
* JSX
* Props
* `useState`
* `useEffect`
* `useRef`
* Controlled forms
* Search and filtering
* React Router
* Context API
* Axios
* REST API integration
* CRUD operations
* Redux Toolkit
* Asynchronous state management
* Employee Management System

---

## 🎯 Complete Project

The repository concludes with a **Full Employee Management System** that combines the concepts practiced throughout the React section.

Key concepts include:

* Component-based architecture
* State management
* Forms
* CRUD operations
* API integration
* Routing
* Redux Toolkit
* Reusable React components

---

## 📌 Learning Objective

This repository is designed to provide hands-on practice with the core technologies used in the **MERN stack**, progressing from individual MongoDB and React concepts to complete application-level implementations.

The exercises are organized progressively so that each solution builds practical understanding before moving toward the final capstone application.

---

## 👨‍💻 Author

**Rayapati Ravi Theja**

* GitHub: `rayapatiravitheja`
* LinkedIn: `rayapati-ravi-theja`
* B.Tech – Computer Science & Engineering
* Kalasalingam Academy of Research and Education

---

## ⭐ Repository

If this repository helps you understand MongoDB, React, or MERN development, consider giving it a ⭐ on GitHub.
