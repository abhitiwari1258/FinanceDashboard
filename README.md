# 📊 Finance Dashboard UI

A responsive and interactive Finance Dashboard built using React.  
It helps users track financial activity, analyze spending, and manage transactions efficiently.

---

## 🚀 Features

- 📈 Dashboard with total balance, income, and expenses
- 📊 Data visualization (Line Chart & Pie Chart)
- 📋 Transactions table with search & filter
- 🔐 Role-based UI (Viewer & Admin)
- 💡 Insights section (spending analysis)
- 🌗 Dark / Light mode toggle
- 📱 Fully responsive (mobile + desktop)
- ⚠️ Empty state handling

---

## 🛠️ Tech Stack

- React
- Tailwind CSS
- React Router
- Recharts
- Context API (State Management)

---

## 📁 Folder Structure

src/
├── components/
├── pages/
├── context/
├── data/
├── App.jsx
└── main.jsx

---

## ⚙️ Setup Instructions

1. Extract the ZIP file

2. Open the project folder in terminal

3. Install dependencies  (including Tailwind CSS)

npm install

4. Run the project

npm run dev

5. Open in browser

http://localhost:5173

---

## 🧠 Approach

The project is built using a component-based architecture:

- Reusable components for UI (cards, charts, tables)
- Context API for global state management
- Separation of logic and UI
- Dynamic updates based on transaction data

All financial data is stored in global state, so when transactions are added or edited, the dashboard updates automatically.

---

## 🎯 Key Functionalities

### 1. Dashboard
- Shows total balance, income, and expenses
- Updates dynamically when data changes

### 2. Transactions
- Displays all transactions
- Supports search, filter, and sorting
- Admin can add/edit transactions

### 3. Role-Based UI
- Viewer → read-only access
- Admin → can modify data

### 4. Insights
- Highest spending category
- Monthly comparison
- Expense trends

### 5. Dark Mode
- Toggle between light and dark theme
- Improves user experience

### 6. Responsive Design
- Works on mobile, tablet, and desktop
- Built using Tailwind responsive utilities

### 7. Empty State Handling
- Displays message when no data is available
- Improves UX and prevents blank screens

---

## ✨ Future Improvements

- Backend integration (Node.js + MongoDB)
- Data persistence
- Export data (CSV)
- Advanced analytics

---

## 👨‍💻 Author

Abhishek Tiwari