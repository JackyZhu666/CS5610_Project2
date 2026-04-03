# CS5610 — Project 2

A single-page Sudoku web application built with **React**, **React Router**, and the **Context API**.  
This project extends the mock website from Project 1 into a functional browser game with randomized Sudoku boards, timer support, validation feedback, and responsive design.

---

## Overview

This project includes:

- A **Home page**
- A **Game Selection page**
- An **Easy Sudoku page** with a 6×6 board
- A **Normal Sudoku page** with a 9×9 board
- A **Rules page**
- A **High Scores page**
- A **Login page**
- A **Register page**

The app is built as a React single-page application and uses:

- **React Router** for navigation
- **Context API** for shared game state
- **Reusable components** for layout, board rendering, toolbar, timer, and page sections
- **Responsive CSS** for mobile and desktop layouts

---

## Features

### Core game features
- Easy mode with a **6×6 Sudoku board**
- Normal mode with a **9×9 Sudoku board**
- Random board generation for both game modes
- Easy mode starts with approximately **half of the cells filled**
- Normal mode starts with approximately **28–30 cells filled**
- Prefilled cells are **locked**
- Editable cells accept only valid numeric input within the allowed range
- Incorrect placements are **highlighted in red**
- Timer starts when a game begins
- **Reset** button restores the puzzle to its original state
- **New Game** button generates a fresh board
- When the puzzle is solved correctly:
  - a **congratulations message** appears
  - the board becomes **locked**

### Additional features
- Shared state managed with **Context API**
- Page navigation with **React Router**
- Responsive layout for desktop and mobile
- Local storage persistence support for in-progress games
- Hint button included in the toolbar

---

## Tech Stack

- **React**
- **Vite**
- **React Router DOM**
- **Context API**
- **CSS**

---

## Project Structure

```text
jackie-zhu-project2/
├── package.json
├── vite.config.js
├── index.html
├── public/
│   └── logo.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── mockGames.js
    ├── utils/
    │   └── sudoku.js
    ├── context/
    │   └── SudokuContext.jsx
    ├── components/
    │   ├── Layout.jsx
    │   ├── NavBar.jsx
    │   ├── PageHero.jsx
    │   ├── SudokuBoard.jsx
    │   ├── SudokuCell.jsx
    │   ├── GameToolbar.jsx
    │   ├── Timer.jsx
    │   └── StatusBanner.jsx
    └── pages/
        ├── HomePage.jsx
        ├── GamesPage.jsx
        ├── GameEasyPage.jsx
        ├── GameNormalPage.jsx
        ├── RulesPage.jsx
        ├── ScoresPage.jsx
        ├── LoginPage.jsx
        ├── RegisterPage.jsx
        └── NotFoundPage.jsx
```

---

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app

Open the URL shown in terminal (usually):

```text
http://localhost:5173
```

---

## Available Scripts

```bash
npm run dev      # start development server
npm run build    # build production version
npm run preview  # preview production build
```

---

## Routes

- `/` → Home page
- `/games` → Game selection
- `/games/easy` → Easy Sudoku
- `/games/normal` → Normal Sudoku
- `/rules` → Rules page
- `/scores` → High Scores
- `/login` → Login
- `/register` → Register

---

## Game Rules

### Easy Mode

- 6×6 board
- Values: 1–6
- About half cells prefilled

### Normal Mode

- 9×9 board
- Values: 1–9
- About 28–30 cells prefilled

### General Rules

- Each row must contain unique numbers
- Each column must contain unique numbers
- Each sub-grid must contain unique numbers
- Invalid inputs are highlighted
- The game is complete only when the board is fully and correctly solved

---

## Component Design

### Shared Components

- `Layout.jsx` – page layout
- `NavBar.jsx` – navigation
- `PageHero.jsx` – page header
- `Timer.jsx` – timer
- `StatusBanner.jsx` – success message
- `GameToolbar.jsx` – buttons

### Game Components

- `SudokuBoard.jsx` – board
- `SudokuCell.jsx` – cell

---

## State Management

Uses **React Context API** instead of prop drilling.

Manages:

- current puzzle
- board state
- solution
- timer
- selected cell
- invalid cells
- completion state

---

## Styling

- Dark theme
- Neon accent colors
- Responsive layout
- Fixed navigation
- Hover & focus effects

### Visual feedback includes:

- selected cells
- invalid cells
- prefilled cells
- hint cells

---

## Notes

- Selection, scores, login, and register pages are mock pages
- Sudoku gameplay is implemented only in Easy and Normal pages
- Code is modular and reusable for future extensions

---

## Future Improvements

- Stronger puzzle generator (guaranteed unique solution)
- More difficulty levels
- Pencil/notes mode
- Persistent score tracking
- User authentication
- Backend integration
- Accessibility improvements
- Animations and sound effects

---

## Author

**Jiayi Zhu**
