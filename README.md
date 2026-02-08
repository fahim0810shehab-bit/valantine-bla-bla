# Be My Valentine? 🌹

A playful and interactive Valentine's Day proposal app built with React, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd be-my-valentine
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

Start the development server:
```bash
npm run dev
```
Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

### Building for Production

To build the app for deployment:
```bash
npm run build
```

## ⚠️ Important: Adding Photos

For your photos to appear in the app (both locally and when deployed), you **must** create a `public` folder in the root directory and place your images there.

1.  Create a folder named `public` at the project root.
2.  Add your photo files inside it with these exact names:
    - `photo_hacked.jpg`
    - `photo_sunny.jpg`
    - `photo_bookstore.jpg`

Do **not** put them in the `src` or `components` folder. They must be in `public` to be included in the final website build.

## Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS (via CDN for simplicity)
