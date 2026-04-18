# Al-Quran Web Application

A modern, premium-quality Quran reading web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Browse all 114 Surahs, read Arabic text with English translations, search by surah name or verse meaning, and customize your reading experience.

🔗 **Live Demo:** [https://quran-web-app-ivory.vercel.app/](https://quran-web-app-ivory.vercel.app/)

---

## 📖 Purpose

This application is designed to provide a beautiful, accessible, and spiritually focused Quran reading experience. Key goals:

- Present the full Quran with authentic Arabic text (Uthmani script) and Saheeh International translations
- Enable fast, intuitive search across all surah names and verse meanings
- Offer a customizable reading interface (Arabic font size, translation size, and font family)
- Maintain bookmarks for quick access to important verses
- Provide a performant, mobile-friendly experience via server-side rendering and API-driven data

---

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.x | React framework with App Router & SSR |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first styling |
| React | 19.x | UI components |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js / Express | 5.x | REST API server |
| MongoDB | 7.x | Quran data storage |
| Vercel | — | Serverless deployment |

---

## 🛠️ Start Guide

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A running instance of the **Quran API backend** (see below)
- A MongoDB Atlas connection string (for the backend)

---

### 1. Clone the Repository

```bash
git clone https://github.com/oliullahakib/quran-web-app.git
cd quran-web-app
```

---

### 2. Set Up the Backend API

```bash
cd quran-app-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your MongoDB URI to .env:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/quran

# Start the backend server (runs on port 5500)
npm run dev
```

The API will be available at `http://localhost:5500`

---

### 3. Set Up the Frontend

```bash
cd quran-web-app

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5500" > .env

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 4. Production Build (Optional)

```bash
npm run build
npm start
```

---

## ✨ Features

- 📚 **114 Surahs** — Full Quran index with Arabic names and English translations
- 🔍 **Smart Search** — Search by surah name, transliteration, or verse meaning
- 🔖 **Bookmarks** — Save and revisit your favourite ayahs (stored locally)
- ⚙️ **Reading Settings** — Adjust Arabic font size, translation size, and choose between Amiri or Scheherazade fonts
- 📱 **Responsive** — Optimised for mobile, tablet, and desktop
- ⚡ **Fast** — API-driven data with in-memory caching and Next.js SSR

---

## 🌐 Deployment

The frontend is deployed on **Vercel**. The backend API is also deployed on Vercel using `@vercel/node`.

To deploy your own instance:

1. Push both repos to GitHub
2. Import each into [Vercel](https://vercel.com)
3. Set the required environment variables in the Vercel dashboard:
   - **Backend:** `MONGODB_URI`
   - **Frontend:** `NEXT_PUBLIC_API_URL` (set to your deployed backend URL)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
