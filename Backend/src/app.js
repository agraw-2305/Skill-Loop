const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

const allowedOrigins = [
    "http://localhost:5173",
    "https://rylo-frontend.onrender.com"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests without an origin
            // e.g. Postman, server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true
    })
);

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;