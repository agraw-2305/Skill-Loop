import React, { useState, useRef } from "react";
import "../style/Home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";

const Home = () => {
    const { loading, generateReport, reports } = useInterview();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFileName, setResumeFileName] = useState("");

    const resumeInputRef = useRef(null);
    const navigate = useNavigate();

    const particles = Array.from({ length: 28 });

    // ============================================================
    // RESUME UPLOAD
    // ============================================================

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setResumeFileName(file.name);
        }
    };

    // ============================================================
    // GENERATE INTERVIEW REPORT
    // ============================================================

    const handleGenerateReport = async () => {
        console.log("1. Generate button clicked");

        const resumeFile = resumeInputRef.current?.files?.[0];

        console.log("2. Resume:", resumeFile);

        try {
            const data = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile,
            });

            console.log("3. API Response:", data);

            if (data?._id) {
                navigate(`/interview/${data._id}`);
            }
        } catch (err) {
            console.error("4. Error:", err);
        }
    };

    // ============================================================
    // LOADING SCREEN
    // ============================================================

    if (loading) {
        return (
            <main className="loading-screen">

                <div className="loading-bg-orb loading-bg-orb--one" />
                <div className="loading-bg-orb loading-bg-orb--two" />

                <div className="loading-container">

                    <div className="loading-logo">
                        <span>✦</span>
                    </div>

                    <div className="loading-rings">
                        <span />
                        <span />
                        <span />
                    </div>

                    <div className="loading-text">

                        <p className="loading-eyebrow">
                            Skill-Loop • AI INTERVIEW COMPANION
                        </p>

                        <h1>
                            Building your
                            <span> interview strategy</span>
                        </h1>

                        <p>
                            Analyzing your profile, skills and target role...
                        </p>

                    </div>

                    <div className="loading-dots">
                        <span />
                        <span />
                        <span />
                    </div>

                </div>

            </main>
        );
    }

    // ============================================================
    // MAIN PAGE
    // ============================================================

    return (
        <main className="home-page">

            {/* =====================================================
                AMBIENT BACKGROUND
            ====================================================== */}

            <div className="ambient-background">

                <div className="ambient-grid" />

                <div className="ambient-orb ambient-orb--pink" />
                <div className="ambient-orb ambient-orb--purple" />
                <div className="ambient-orb ambient-orb--blue" />

                <div className="particles">

                    {particles.map((_, index) => (
                        <span
                            key={index}
                            className="particle"
                            style={{
                                left: `${(index * 37) % 100}%`,
                                top: `${(index * 61) % 100}%`,
                                animationDelay: `${index * -0.4}s`,
                                animationDuration: `${5 + index * 0.22}s`,
                            }}
                        />
                    ))}

                </div>

            </div>


            {/* =====================================================
                NAVBAR
            ====================================================== */}

            <header className="home-navbar">

                <div
                    className="brand"
                    onClick={() => navigate("/")}
                >

                    <div className="brand__icon">
                        ✦
                    </div>

                    <span className="brand__name">
                        Skill-Loop
                    </span>

                </div>


                <div className="navbar-status">

                    <span className="navbar-status__dot" />

                    Skill-Loop • AI INTERVIEW COMPANION

                </div>

            </header>


            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="page-header">

                <div className="hero-badge">

                    <span className="hero-badge__spark">
                        ✦
                    </span>

                    YOUR INTERVIEW COMPANION

                    <span className="hero-badge__dot" />

                </div>


                <h1>
                    Build Your

                    <span className="highlight">
                        Interview Advantage
                    </span>
                </h1>


                <p>
                    Tell Skill-Loop where you're headed and where you stand.
                    We'll turn your role, resume, and experience into a
                    personalized interview strategy built for you.
                </p>


                <div className="hero-pills">

                    <span>
                        ✦ Personalized
                    </span>

                    <span>
                        ◇ Role-specific
                    </span>

                    <span>
                        ✓ AI-powered
                    </span>

                </div>

            </section>


            {/* =====================================================
                MAIN INTERVIEW CARD
            ====================================================== */}

            <section className="interview-card">

                <div className="card-top-glow" />

                <div className="card-corner card-corner--tl" />
                <div className="card-corner card-corner--tr" />
                <div className="card-corner card-corner--bl" />
                <div className="card-corner card-corner--br" />


                <div className="interview-card__body">

                    {/* =================================================
                        LEFT PANEL — JOB DESCRIPTION
                    ================================================= */}

                    <div className="panel panel--left">

                        <div className="panel__header">

                            <span className="panel__icon">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <rect
                                        x="2"
                                        y="7"
                                        width="20"
                                        height="14"
                                        rx="2"
                                    />

                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />

                                </svg>

                            </span>

                            <div>

                                <h2>
                                    Target Job Description
                                </h2>

                                <p>
                                    Tell us what you're applying for
                                </p>

                            </div>

                            <span className="badge badge--required">
                                Required
                            </span>

                        </div>


                        <div className="textarea-wrapper">

                            <textarea
                                value={jobDescription}
                                onChange={(e) =>
                                    setJobDescription(e.target.value)
                                }
                                className="panel__textarea"
                                placeholder={`Paste the full job description here...

e.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
                                maxLength={5000}
                            />

                            <div className="textarea-glow" />

                            <div className="char-counter">

                                <span>
                                    {jobDescription.length}
                                </span>

                                / 5000

                            </div>

                        </div>


                        <div className="panel-tip">

                            <span>
                                ✦
                            </span>

                            <p>
                                The more detailed the job description,
                                the more tailored your interview plan.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        CENTER DIVIDER
                    ================================================= */}

                    <div className="panel-divider">

                        <span className="divider-or">
                            OR
                        </span>

                    </div>


                    {/* =================================================
                        RIGHT PANEL — CANDIDATE PROFILE
                    ================================================= */}

                    <div className="panel panel--right">

                        {/* =================================================
                            RESUME UPLOAD
                        ================================================= */}

                        <div className="upload-section">

                            <label className="section-label">

                                <span>
                                    Upload Resume
                                </span>

                                <span className="badge badge--best">
                                    Best Results
                                </span>

                            </label>


                            <div
                                className={`dropzone ${
                                    resumeFileName
                                        ? "dropzone--uploaded"
                                        : ""
                                }`}
                                onClick={() =>
                                    resumeInputRef.current?.click()
                                }
                            >

                                {!resumeFileName ? (

                                    <>

                                        <div className="dropzone__icon-wrapper">

                                            <span className="dropzone__icon">

                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >

                                                    <polyline points="16 16 12 12 8 16" />

                                                    <line
                                                        x1="12"
                                                        y1="12"
                                                        x2="12"
                                                        y2="21"
                                                    />

                                                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />

                                                </svg>

                                            </span>

                                        </div>


                                        <p className="dropzone__title">

                                            Click to upload

                                            <span>
                                                {" "}or drag & drop
                                            </span>

                                        </p>


                                        <p className="dropzone__subtitle">

                                            <span>
                                                PDF or DOCX
                                            </span>

                                            <span>
                                                •
                                            </span>

                                            <span>
                                                Max 5MB
                                            </span>

                                        </p>


                                        <div className="upload-shine" />

                                    </>

                                ) : (

                                    <div className="uploaded-file">

                                        <div className="uploaded-file__icon">
                                            ✓
                                        </div>

                                        <div className="uploaded-file__info">

                                            <strong>
                                                Resume uploaded
                                            </strong>

                                            <span>
                                                {resumeFileName}
                                            </span>

                                        </div>

                                        <div className="uploaded-file__check">
                                            ✓
                                        </div>

                                    </div>

                                )}


                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleResumeChange}
                                />

                            </div>


                            {resumeFileName && (

                                <div className="upload-success">

                                    <span>
                                        ✓
                                    </span>

                                    Resume uploaded successfully

                                </div>

                            )}

                        </div>


                        {/* =================================================
                            OR DIVIDER
                        ================================================= */}

                        <div className="or-divider">
                            <span>
                                OR
                            </span>
                        </div>


                        {/* =================================================
                            SELF DESCRIPTION
                        ================================================= */}

                        <div className="self-description">

                            <label
                                className="section-label"
                                htmlFor="selfDescription"
                            >
                                Quick Self-Description
                            </label>

                            <div className="textarea-wrapper textarea-wrapper--small">

                                <textarea
                                    value={selfDescription}
                                    onChange={(e) =>
                                        setSelfDescription(e.target.value)
                                    }
                                    id="selfDescription"
                                    name="selfDescription"
                                    className="panel__textarea panel__textarea--short"
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />

                                <div className="textarea-glow" />

                            </div>

                        </div>


                        {/* =================================================
                            INFO BOX
                        ================================================= */}

                        <div className="info-box">

                            <div className="info-box__icon">
                                ✦
                            </div>

                            <p>

                                Either a

                                <strong>
                                    Resume
                                </strong>

                                or a

                                <strong>
                                    Self Description
                                </strong>

                                is required to generate your
                                personalized plan.

                            </p>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    CARD FOOTER
                ====================================================== */}

                <div className="interview-card__footer">

                    <div className="footer-info">

                        <span className="footer-info__spark">
                            ✦
                        </span>

                        <span>
                            Skill-Loop AI Strategy Generation
                        </span>

                        <span className="footer-dot">
                            •
                        </span>

                        <span>
                            Approx 30s
                        </span>

                    </div>


                    <button
                        type="button"
                        onClick={handleGenerateReport}
                        className="generate-btn"
                    >

                        <span className="generate-btn__shine" />

                        <span className="generate-btn__icon">
                            ✦
                        </span>

                        <span>
                            Generate My Interview Strategy
                        </span>

                        <span className="generate-btn__arrow">
                            →
                        </span>

                    </button>

                </div>

            </section>


            {/* =====================================================
                RECENT REPORTS
            ====================================================== */}

            {reports.length > 0 && (

                <section className="recent-reports">

                    <div className="recent-heading">

                        <div>

                            <span className="recent-heading__eyebrow">
                                YOUR HISTORY
                            </span>

                            <h2>
                                Recent Interview Plans
                            </h2>

                        </div>

                        <span className="recent-count">
                            {reports.length} plans
                        </span>

                    </div>


                    <div className="reports-list">

                        {reports.map((report, index) => (

                            <article
                                key={report._id}
                                className="report-item"
                                style={{
                                    "--delay": `${index * 80}ms`,
                                }}
                                onClick={() =>
                                    navigate(
                                        `/interview/${report._id}`
                                    )
                                }
                            >

                                <div className="report-item__shine" />


                                <div className="report-item__top">

                                    <span className="report-item__number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="report-item__arrow">
                                        ↗
                                    </span>

                                </div>


                                <h3>
                                    {report.title ||
                                        "Untitled Position"}
                                </h3>


                                <p className="report-meta">

                                    Generated on{" "}

                                    {new Date(
                                        report.createdAt
                                    ).toLocaleDateString()}

                                </p>


                                <div className="report-score">

                                    <span>
                                        Match Score
                                    </span>

                                    <strong
                                        className={
                                            report.matchScore >= 80
                                                ? "score--high"
                                                : report.matchScore >= 60
                                                    ? "score--mid"
                                                    : "score--low"
                                        }
                                    >
                                        {report.matchScore}%
                                    </strong>

                                </div>


                                <div className="report-progress">

                                    <span
                                        style={{
                                            width: `${Math.min(
                                                report.matchScore || 0,
                                                100
                                            )}%`,
                                        }}
                                    />

                                </div>

                            </article>

                        ))}

                    </div>

                </section>

            )}


            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer className="page-footer">

                <div className="page-footer__brand">

                    <span>
                        ✦ Skill-Loop
                    </span>

                    <small>
                        Your AI interview companion
                    </small>

                </div>


                <div>

                    <a href="#privacy">
                        Privacy
                    </a>

                    <a href="#terms">
                        Terms
                    </a>

                    <a href="#help">
                        Help
                    </a>

                </div>

            </footer>

        </main>
    );
};

export default Home;