# 🧠 WikiAI

### AI-Powered Knowledge & Encyclopedia Platform

WikiAI is a full-stack web application that uses **Artificial Intelligence to generate structured, Wikipedia-style knowledge articles** from user searches.

🔎 Search any topic → 🤖 AI generates content → 🖼️ Relevant image → 📚 Structured article



## ✨ Features

* 🤖 **AI-Powered Search** — Generate informative content for any topic
* 📖 **Wikipedia-Style Articles** — Structured headings, summaries and sections
* 🖼️ **Smart Images** — Fetches relevant images from Wikipedia API
* 🔐 **Firebase Authentication** — Email/Password & Google Sign-In
* ⚡ **Dynamic Content Generation** — No page reload required
* 📱 **Responsive UI** — Desktop and mobile friendly
* 🌐 **Full-Stack Architecture** — Separate frontend and backend
* 🚀 **Cloud Deployment** — Firebase + Render



## 🛠️ Tech Stack

**Frontend:** HTML • CSS • JavaScript • Firebase

**Backend:** Node.js • Express.js • Axios • CORS

**AI:** OpenRouter API

**API:** Wikipedia API

**Deployment:** Firebase Hosting • Render


## 🔄 How It Works

```text
User Search
     ↓
Frontend
     ↓
Express.js Backend
     ↓
OpenRouter AI
     ↓
AI-Generated Content
     ↓
Wikipedia Image API
     ↓
📖 Final Knowledge Article
```



## 🚀 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Abinaya191004/wikiAI.git
cd wikiAI
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Add your API key

Create a `.env` file inside the `backend` folder:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 4. Start the backend

```bash
node server.js
```

Backend:

```text
http://localhost:5000
```

### 5. Run the frontend

Open the frontend folder in **VS Code** and use:

**Right Click → Open with Live Server**

Frontend will run at something like:

```text
http://127.0.0.1:5500/
```

> Make sure the frontend API URL points to your backend `/search` endpoint.



## 🌐 Live Demo

🚀 **WikiAI:** https://wikiai-f51a1.web.app/



## 🔒 Important

> ⚠️ **Never expose your OpenRouter API key in frontend code or GitHub.**

Keep your API key inside the backend `.env` file and add `.env` to `.gitignore`.



## 📌 Project Highlights

* Built a complete **AI-integrated full-stack application**
* Implemented **REST API communication**
* Integrated **Firebase Authentication**
* Integrated **OpenRouter LLM API**
* Integrated **Wikipedia API for dynamic images**
* Deployed frontend and backend separately


