# ⚡ Splitter - Tip Calculator

A modern, type-safe, and modular tip calculator built with **React**, **TypeScript**, and **Tailwind CSS**.

Inspired by Frontend Mentor challenges, this project focuses on clean architecture, separation of concerns, and a robust component-driven structure.

---

## 🚀 Key Features

- **Real-time Calculation**: Instant feedback as the user types or clicks, without needing a submit button.
- **Flexible Tip Selection**: Choose from preset percentage buttons ($5\%, 10\%, 15\%, 25\%, 50\%$) or enter a custom tip amount.
- **Smart Reset**: Clears all inputs and resets states cleanly via a dedicated callback prop.
- **Responsive Design**: Mobile-first layout seamlessly scaling into a clean desktop grid.

---

## 🏛️ Architecture & Technical Highlights

This project avoids common anti-patterns by adopting a "Senior" development approach:

1. **Single Source of Truth (SSOT)**:
   - Form inputs (`bill`, `people`) are centralized in a single `formData` object, while the selected tip is managed via `selectedTip`.
2. **Separation of Concerns (SoC)**:
   - Mathematical logic is completely isolated inside a pure utility function (`calculate.ts`), making it decoupled from UI and fully testable.
3. **Data-Driven UI**:
   - Uses configuration arrays (`inputMap`) and `.map()` loops to generate form elements dynamically, keeping the JSX clean and DRY (Don't Repeat Yourself).
4. **Strict TypeScript Typing**:
   - Custom types and interfaces explicitly define props and form states to ensure runtime safety and great DX (Developer Experience).

---

## 🛠️ Tech Stack

- **React** (Hooks: `useState`)
- **TypeScript**
- **Tailwind CSS**

---

## 📦 Getting Started

To run this project locally, follow these steps:

1. Install dependencies by running: npm install
2. Run the development server by running: npm run dev

---

## 💡 What I Learned

This project was a great playground to reinforce:

- Managing input states as strings for optimal UI/UX (handling empty states "" gracefully) while converting to numbers strictly for logic/calculations.
- Designing component hierarchies with clear parent-to-child data flow (Props) and child-to-parent actions (Callbacks).
