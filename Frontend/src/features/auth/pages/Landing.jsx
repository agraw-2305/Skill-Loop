import React from "react";
import { Link } from "react-router-dom";
import "./Landing.scss";

const Landing = () => {
    return (
        <main className="landing-page">

            {/* =====================================================
                Ambient Background
            ====================================================== */}
            <div className="landing-bg" aria-hidden="true">
                <div className="landing-grid" />
                <div className="landing-orb landing-orb--pink" />
                <div className="landing-orb landing-orb--purple" />
                <div className="landing-orb landing-orb--blue" />
            </div>


            {/* =====================================================
                Navbar
            ====================================================== */}
            <nav className="landing-navbar">

                <Link to="/" className="landing-brand">
                    <span className="landing-brand__icon">
                        ✦
                    </span>

                    <span className="landing-brand__text">
                        Skill-Loop
                    </span>
                </Link>


                <div className="landing-navbar__actions">

                    <Link
                        to="/login"
                        className="landing-login"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="landing-nav-button"
                    >
                        Get Started
                        <span>→</span>
                    </Link>

                </div>

            </nav>


            {/* =====================================================
                Hero
            ====================================================== */}
            <section className="landing-hero">

                <div className="landing-badge">
                    <span className="landing-badge__dot" />
                    YOUR INTERVIEW COMPANION
                </div>


                <h1>
                    Your next interview
                    <span>starts here.</span>
                </h1>


                <p className="landing-hero__description">
                    Turn your resume and target job description into a
                    personalized interview strategy with AI-powered questions,
                    skill-gap analysis, and a focused preparation roadmap.
                </p>


                <div className="landing-hero__actions">

                    <Link
                        to="/register"
                        className="landing-primary-button"
                    >
                        <span>
                            Build My Interview Plan
                        </span>

                        <span className="landing-button-arrow">
                            →
                        </span>
                    </Link>


                    <Link
                        to="/login"
                        className="landing-secondary-button"
                    >
                        I already have an account
                    </Link>

                </div>


                <div className="landing-trust">

                    <span>
                        ✦ Personalized
                    </span>

                    <i />

                    <span>
                        ⚡ AI Generated
                    </span>

                    <i />

                    <span>
                        🎯 Job Specific
                    </span>

                </div>

            </section>


            {/* =====================================================
                Why Skill-Loop?
            ====================================================== */}
            <section className="landing-features">

                <div className="landing-section-heading">

                    <span>
                        WHY SKILL-LOOP?
                    </span>

                    <h2>
                        Prepare smarter.
                        <em> Not harder.</em>
                    </h2>

                </div>


                <div className="feature-grid">

                    {/* Card 01 */}
                    <article className="feature-card">

                        <div className="feature-card__number">
                            01
                        </div>

                        <div className="feature-card__icon">
                            ✦
                        </div>

                        <h3>
                            Questions that feel personal
                        </h3>

                        <p>
                            Get interview questions tailored to your
                            resume, skills, experience, and target role.
                        </p>

                    </article>


                    {/* Card 02 */}
                    <article className="feature-card">

                        <div className="feature-card__number">
                            02
                        </div>

                        <div className="feature-card__icon">
                            ◉
                        </div>

                        <h3>
                            Know what you're missing
                        </h3>

                        <p>
                            Identify the technical and behavioral areas
                            you should strengthen before your interview.
                        </p>

                    </article>


                    {/* Card 03 */}
                    <article className="feature-card">

                        <div className="feature-card__number">
                            03
                        </div>

                        <div className="feature-card__icon">
                            ⌁
                        </div>

                        <h3>
                            Know exactly what to prepare
                        </h3>

                        <p>
                            Follow a focused roadmap built around the role
                            you're actually interviewing for.
                        </p>

                    </article>

                </div>

            </section>


            {/* =====================================================
                How Does Skill-Loop Work?
            ====================================================== */}
            <section className="landing-process">

                <div className="landing-section-heading">

                    <span>
                        HOW DOES SKILL-LOOP WORK?
                    </span>

                    <h2>
                        From profile to
                        <em> interview-ready.</em>
                    </h2>

                </div>


                <div className="process-grid">

                    {/* Step 01 */}
                    <div className="process-step">

                        <span className="process-step__number">
                            01
                        </span>

                        <div>
                            <h3>
                                Tell Skill-Loop about the role
                            </h3>

                            <p>
                                Add the job description you're
                                preparing for.
                            </p>
                        </div>

                    </div>


                    <div className="process-line" />


                    {/* Step 02 */}
                    <div className="process-step">

                        <span className="process-step__number">
                            02
                        </span>

                        <div>
                            <h3>
                                Give Skill-Loop your profile
                            </h3>

                            <p>
                                Upload your resume or describe
                                your experience.
                            </p>
                        </div>

                    </div>


                    <div className="process-line" />


                    {/* Step 03 */}
                    <div className="process-step">

                        <span className="process-step__number">
                            03
                        </span>

                        <div>
                            <h3>
                                Get your interview strategy
                            </h3>

                            <p>
                                Let Skill-Loop build a personalized
                                interview plan for you.
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                Bottom CTA
            ====================================================== */}
            <section className="landing-bottom-cta">

                <div
                    className="landing-bottom-cta__glow"
                    aria-hidden="true"
                />

                <span>
                    READY WHEN YOU ARE
                </span>


                <h2>
                    Walk into your next interview
                    <br />
                    <strong>prepared.</strong>
                </h2>


                <p>
                    Your resume. Your target role. Your personalized strategy.
                </p>


                <Link
                    to="/register"
                    className="landing-primary-button landing-primary-button--large"
                >
                    <span>
                        Start Preparing
                    </span>

                    <span className="landing-button-arrow">
                        →
                    </span>
                </Link>

            </section>


            {/* =====================================================
                Footer
            ====================================================== */}
            <footer className="landing-footer">

                <div className="landing-footer__left">

                    <span className="landing-footer__brand">
                        ✦ Skill-Loop
                    </span>

                    <span>
                        Your Interview Companion
                    </span>

                </div>


                <span>
                    © {new Date().getFullYear()} Skill-Loop
                </span>

            </footer>

        </main>
    );
};

export default Landing;
