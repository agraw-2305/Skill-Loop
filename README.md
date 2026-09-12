<div align="center">

# ✦ Skill-Loop

### Your AI-Powered Interview Companion

**Prepare smarter. Walk in confident.**

Skill-Loop transforms your **job description, resume, and experience** into a fully personalized interview strategy — not generic question banks.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Google AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=flat-square&logo=google&logoColor=white)

</div>

---

## 🎯 What is Skill-Loop?

Most interview prep tools give you the same generic questions. Skill-Loop is different.

You paste in the job description you're targeting, upload your resume or describe your background, and Skill-Loop's AI analyzes both to output a strategy built specifically for **you** — covering role-specific technical and behavioral questions, skill gap analysis, a match score, and a day-by-day preparation roadmap.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Role Match Score** | See how aligned you are with the target role at a glance |
| 💻 **Technical Questions** | Role-specific questions with interviewer intent & model answers |
| 🔍 **Skill Gap Analysis** | Know exactly what to strengthen before the interview |
| 🗺️ **Preparation Roadmap** | Structured day-by-day study plan for focused prep |
| 📄 **Resume-Aware Analysis** | Upload your resume for deeply personalized insights |
| 📚 **Interview History** | Revisit and review any previously generated plan |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, React Router v7, SCSS, Context API, Custom Hooks |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT, Multer |
| **AI** | Google Gemini API — questions, skill gaps, roadmap & match score |

---

## 🏗️ Architecture

```
Skill-Loop/
├── Frontend/                    ← React + Vite SPA
│   └── src/
│       ├── features/
│       │   ├── auth/
│       │   │   ├── pages/        (Landing, Login, Register)
│       │   │   ├── services/     (auth.api.js)
│       │   │   └── auth.context.jsx
│       │   └── interview/
│       │       ├── hooks/        (useInterview.js)
│       │       ├── pages/        (Home.jsx, Interview.jsx)
│       │       ├── services/     (interview.api.js)
│       │       └── style/        (Home.scss, interview.scss)
│       ├── App.jsx
│       ├── app.routes.jsx
│       └── main.jsx
│
└── Backend/                     ← Node.js + Express REST API
    └── src/
        ├── controllers/         (auth, interview)
        ├── routes/              (auth, interview)
        ├── models/              (User, Interview)
        ├── middlewares/         (auth guard, file validation)
        ├── services/            (AI generation logic)
        └── app.js
```

---

## 🌐 Routes

| Route | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/login` | User Login | Public |
| `/register` | User Registration | Public |
| `/home` | Interview Builder Dashboard | Protected |
| `/interview/:interviewId` | Generated Interview Report | Protected |

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create a new user account |
| `POST` | `/api/auth/login` | Authenticate an existing user |
| `GET` | `/api/auth/me` | Get the currently authenticated user |

### Interview
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/interview/` | Generate a personalized interview report |
| `GET` | `/api/interview/:interviewId` | Retrieve a specific interview report |

---

## 📦 Interview Report Schema

```json
{
  "matchScore": 92,
  "technicalQuestions": [{ "question": "...", "intention": "...", "answer": "..." }],
  "behavioralQuestions": [{ "question": "...", "intention": "...", "answer": "..." }],
  "skillGaps": [{ "skill": "Docker", "severity": "medium" }],
  "preparationPlan": [{ "day": 1, "focus": "Backend Fundamentals", "tasks": ["..."] }]
}
```

---

## 💻 Running Locally

### Prerequisites
- Node.js ≥ 18 & npm
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google Gemini API key](https://aistudio.google.com/)

### 1. Clone the repo
```bash
git clone https://github.com/agraw-2305/Skill-Loop.git
cd Skill-Loop
```

### 2. Frontend
```bash
cd Frontend
npm install
npm run dev        # → http://localhost:5173
```

### 3. Backend
```bash
cd Backend
npm install
```

Create `.env` in `Backend/`:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```
```bash
npm run dev        # → http://localhost:3000
```

---

## ✅ Current Scope

- [x] User authentication (Register / Login / JWT)
- [x] Job description input with character counter
- [x] Resume upload (PDF / DOCX, max 5 MB)
- [x] Quick self-description as a resume alternative
- [x] Technical questions with intent & model answers
- [x] Behavioral questions
- [x] Role match score
- [x] Skill gap analysis
- [x] Personalized day-by-day preparation roadmap
- [x] Interview history dashboard

---

## 🔮 Roadmap

- [ ] 🎙️ **AI Mock Interviews** — Simulated interviewer with follow-up questions
- [ ] 🗣️ **Voice Mode** — Answer questions with your voice
- [ ] 🧠 **Answer Evaluation** — Score answers on accuracy, clarity & structure
- [ ] 📈 **Performance Analytics** — Track scores across multiple sessions
- [ ] 🏢 **Company-Specific Prep** — Tailor strategy to a specific company
- [ ] 🔄 **Adaptive Difficulty** — Roadmap evolves based on your performance

---

## 🛡️ Security

- JWT-based stateless authentication with protected route middleware
- File upload validation — type & size enforced server-side
- All secrets managed via environment variables — **never commit `.env`**
- CORS configuration and server-side input validation

---

## 🤝 Contributing

```bash
# Fork the repository, then:
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
# Open a Pull Request
```

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute it.

