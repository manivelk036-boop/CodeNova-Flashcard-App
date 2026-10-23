# Recall — Smart Flashcard Learning App 🧠⚡

A modern, high-performance, SaaS-style flashcard learning application built with **HTML5, Vanilla CSS, and Vanilla JavaScript** for the **CodeNova Internship Project**.

Recall helps developers master complex technical topics (preloaded with a comprehensive Java Programming curriculum) through active recall and spaced repetition principles.

---

## 🌟 Key Features

### 1. 🎴 Active Study Mode & 3D Flip Interface
- **Smooth 3D Flip Animation**: Realistic card perspective (`transform-style: preserve-3d`) between Question and Answer faces.
- **Reveal Answer / Hide Answer Button**: Instant feedback with spacebar and click triggers.
- **Dynamic Card Counters & Progress Bar**: Tracks card position (e.g., `Card 1 of 12`) and percentage progress.
- **Full Keyboard Navigation**:
  - <kbd>Space</kbd> / <kbd>Enter</kbd> : Flip card to reveal or hide answer.
  - <kbd>→</kbd> / <kbd>N</kbd> : Next card in deck.
  - <kbd>←</kbd> / <kbd>P</kbd> : Previous card in deck.
  - <kbd>M</kbd> : Mark card as reviewed in this session.
  - <kbd>Esc</kbd> : Close open modals.
- **Category Filter & Shuffle**: Study specific topics (e.g. `JVM & Memory`, `Collections`, `OOP`) or randomize cards with a single click.

### 2. 📊 Real-Time Interactive Dashboard
- **Total Flashcards Count**: Displays real-time cards in the active deck.
- **Unique Card ID Review Tracker**: Cards reviewed are logged accurately using unique card identifiers (`card-java-01`, etc.) to prevent duplicate counts.
- **Mastery & Progress Percentage**: Calculated dynamically based on reviewed cards.
- **Topic Breakdown Bars**: Visual representation of cards across categories.
- **Deck Preview Grid**: Quick jump directly from dashboard to study any concept.

### 3. 📚 Card Deck Library (CRUD Management)
- **Create Flashcards**: Modern modal form with validation (minimum length checks, required fields) and a **Live Card Preview** before saving.
- **Edit Flashcards**: In-place editing of question, answer, and category.
- **Delete Confirmation Modal**: Prevents accidental deletions with a safety confirmation dialog.
- **Real-Time Search**: Search instantly across questions and answers.
- **Sort Options**: Sort by newest, oldest, or alphabetically (A → Z).

### 4. 💾 Persistent LocalStorage
- All flashcards, edited cards, custom categories, and study session progress are automatically saved to browser `LocalStorage`.
- State persists across page refreshes and browser restarts.
- **Reset Options**:
  - `Reset Session Stats`: Clear reviewed flags to start a fresh study run.
  - `Restore Java Defaults`: Instantly reload the 12 original Java interview questions.

### 5. 🎨 Modern SaaS Visual Design
- **Color Palette**: Clean white & light lavender background (`#f8f9fe`) with indigo and purple accents (`#6366f1` / `#7c3aed`).
- **Typography**: Google Fonts *Plus Jakarta Sans* with *JetBrains Mono* for code tags.
- **Sound Feedback**: Built-in Web Audio API synthesizer for tactile flip, click, and success chimes (toggleable with on/off switch).
- **Toast Notifications**: Non-intrusive floating toasts for all user actions (create, update, delete, reset).
- **Fully Responsive**: Mobile drawer navigation with backdrop, optimized touch targets, and flexible grid layouts.

---

## 📁 Project Structure

```
CodeNova-Flashcard-App/
├── index.html        # Semantic HTML5 layout (Dashboard, Study Mode, Library, Modals)
├── style.css         # Modern SaaS CSS design system, 3D flip transform, responsive queries
├── script.js         # Vanilla JavaScript application logic, state, audio, LocalStorage
└── README.md         # Comprehensive project documentation and guide
```

---

## 🚀 How to Run the Project

This is a pure frontend web application. It requires **no backend APIs, no build tools, and no npm packages**.

### Method 1: Using VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**:
   - `File` > `Open Folder...` > Select `CodeNova-Flashcard-App`
2. Install the **Live Server** extension (by *Ritwick Dey*) from the Extensions marketplace (`Ctrl+Shift+X`).
3. Right-click on `index.html` in the file explorer.
4. Click **"Open with Live Server"** (or click **Go Live** in the bottom status bar).
5. The application will open automatically in your default browser at `http://127.0.0.1:5500/index.html`.

### Method 2: Open Directly in Any Browser
Double-click `index.html` or drag and drop it into Google Chrome, Microsoft Edge, Firefox, or Safari.

### Method 3: Using Python Built-in Server
Open your terminal in the project directory and run:
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your browser.

---

## ☕ Preloaded Java Curriculum Flashcards

The default deck includes 12 real-world Java engineering questions:
1. **JVM & Memory**: Stack vs Heap memory model.
2. **OOP & Design**: Compile-time vs Runtime Polymorphism.
3. **Core Java**: String Immutability and the String Constant Pool.
4. **Collections**: `HashMap` internal mechanism, bucket treeification in Java 8.
5. **Collections**: `ArrayList` vs `LinkedList` architecture and performance.
6. **OOP & Design**: Abstract Class vs Interface in modern Java (default/static methods).
7. **Core Java**: Checked vs Unchecked Exceptions.
8. **Concurrency**: `Runnable` vs `Callable<V>` interfaces and `Future`.
9. **JVM & Memory**: Java Garbage Collection Generations (Eden, Survivor, Tenured, Metaspace).
10. **Java 8+ Features**: Intermediate vs Terminal operations in the Streams API.
11. **Core Java**: `final`, `finally`, and `finalize()`.
12. **Collections**: `Comparable` vs `Comparator`.

---

## 🛠️ Browser Compatibility

Tested and optimized for:
- Google Chrome (Desktop & Mobile)
- Microsoft Edge
- Mozilla Firefox
- Apple Safari (macOS & iOS)

---

## 📜 License
Developed as part of the **CodeNova Internship Program**. All rights reserved.
