const { GoogleGenAI } = require("@google/genai");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// =====================================================
// MODELS
// =====================================================

// Primary model
const PRIMARY_MODEL = "gemini-3.6-flash";

// Fallback model
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

// =====================================================
// RETRY HELPER
// =====================================================

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getStatusCode(error) {
    return (
        error?.status ||
        error?.code ||
        error?.error?.code ||
        error?.response?.status ||
        null
    );
}

function isRetryableError(error) {
    const status = getStatusCode(error);

    return (
        status === 503 ||
        status === 500 ||
        status === 502 ||
        status === 504
    );
}

function isQuotaError(error) {
    const status = getStatusCode(error);

    return status === 429;
}

// =====================================================
// GEMINI REQUEST WITH RETRY + FALLBACK
// =====================================================

async function generateWithFallback(prompt, schema) {

    const models = [
        PRIMARY_MODEL,
        FALLBACK_MODEL
    ];

    let lastError = null;

    for (const model of models) {

        // Only retry 503/5xx a small number of times.
        const maxRetries = 2;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {

            try {

                console.log(
                    `Gemini request → model=${model}, attempt=${attempt + 1}`
                );

                const response = await ai.models.generateContent({

                    model,

                    contents: prompt,

                    config: {
                        responseMimeType: "application/json",
                        responseJsonSchema: schema
                    }

                });

                console.log(
                    `Gemini success → model=${model}`
                );

                return response;

            } catch (error) {

                lastError = error;

                const status = getStatusCode(error);

                console.error(
                    `Gemini error → model=${model}, status=${status}`
                );

                // ==========================================
                // QUOTA ERROR
                // ==========================================

                if (isQuotaError(error)) {

                    console.error(
                        "Gemini quota/rate limit reached."
                    );

                    // DO NOT repeatedly retry 429.
                    throw error;
                }

                // ==========================================
                // TEMPORARY SERVER ERROR
                // ==========================================

                if (isRetryableError(error)) {

                    if (attempt < maxRetries) {

                        const delay =
                            Math.pow(2, attempt) * 2000 +
                            Math.random() * 1000;

                        console.log(
                            `Retrying Gemini in ${Math.round(delay)}ms...`
                        );

                        await sleep(delay);

                        continue;
                    }

                    console.log(
                        `Model ${model} failed after retries. Trying fallback...`
                    );

                    break;
                }

                // ==========================================
                // OTHER ERROR
                // ==========================================

                throw error;
            }
        }
    }

    throw lastError;
}

// =====================================================
// INTERVIEW REPORT SCHEMA
// =====================================================

const interviewReportJsonSchema = {

    type: "object",

    properties: {

        title: {
            type: "string",
            description: "The job title extracted from the job description."
        },

        matchScore: {
            type: "number",
            description: "Candidate match score between 0 and 100."
        },

        technicalQuestions: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    question: {
                        type: "string"
                    },

                    intention: {
                        type: "string"
                    },

                    answer: {
                        type: "string"
                    }

                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]

            }

        },

        behavioralQuestions: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    question: {
                        type: "string"
                    },

                    intention: {
                        type: "string"
                    },

                    answer: {
                        type: "string"
                    }

                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]

            }

        },

        skillGaps: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    skill: {
                        type: "string"
                    },

                    severity: {
                        type: "string",

                        enum: [
                            "low",
                            "medium",
                            "high"
                        ]

                    }

                },

                required: [
                    "skill",
                    "severity"
                ]

            }

        },

        preparationPlan: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    day: {
                        type: "integer"
                    },

                    focus: {
                        type: "string"
                    },

                    tasks: {

                        type: "array",

                        items: {
                            type: "string"
                        }

                    }

                },

                required: [
                    "day",
                    "focus",
                    "tasks"
                ]

            }

        }

    },

    required: [
        "title",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan"
    ]

};

// =====================================================
// GENERATE INTERVIEW REPORT
// =====================================================

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `

You are an expert technical recruiter and interview preparation coach.

Generate a complete interview preparation report for this candidate.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

IMPORTANT OUTPUT REQUIREMENTS:

1. Extract the exact job title from the job description.

2. Calculate a realistic match score from 0 to 100.

3. Generate EXACTLY 8 technical interview questions.

Each technical question MUST contain:

question
intention
answer

4. Generate EXACTLY 6 behavioral interview questions.

Each behavioral question MUST contain:

question
intention
answer

5. Generate EXACTLY 4 skill gaps.

Each skill gap MUST contain:

skill
severity

severity must be:

low
medium
high

6. Generate EXACTLY 7 preparation-plan days.

Each day MUST contain:

day
focus
tasks

tasks MUST be an array of strings.

VERY IMPORTANT:

technicalQuestions MUST be an array of objects.

behavioralQuestions MUST be an array of objects.

skillGaps MUST be an array of objects.

preparationPlan MUST be an array of objects.

NEVER return null.

NEVER return numbers instead of objects.

NEVER return strings instead of objects.

Do not leave arrays empty.

Use the candidate's actual resume and job description.

Return ONLY JSON matching the schema.
`;

    const response = await generateWithFallback(
        prompt,
        interviewReportJsonSchema
    );

    const result = JSON.parse(response.text);

    console.log(
        "AI GENERATED REPORT:",
        JSON.stringify(result, null, 2)
    );

    return result;
}

// =====================================================
// PDF GENERATOR
// =====================================================

async function generatePdfFromHtml(htmlContent) {

    console.log("Launching Puppeteer...");

    const browser = await puppeteer.launch({

        headless: true,

        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ]

    });

    try {

        const page = await browser.newPage();

        await page.setContent(
            htmlContent,
            {
                waitUntil: "networkidle0"
            }
        );

        const pdfBuffer = await page.pdf({

            format: "A4",

            printBackground: true,

            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }

        });

        return pdfBuffer;

    } finally {

        await browser.close();

    }
}

// =====================================================
// GENERATE RESUME PDF
// =====================================================

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription
}) {

    const resumePdfJsonSchema = {

        type: "object",

        properties: {

            html: {
                type: "string",
                description:
                    "Complete HTML content of the resume."
            }

        },

        required: [
            "html"
        ]

    };

    const prompt = `

Generate a professional ATS-friendly resume.

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Requirements:

- Tailor the resume to the job description.
- Highlight relevant skills.
- Highlight relevant projects and experience.
- Do not invent experience.
- Keep it professional.
- Keep it 1-2 pages.
- Make it ATS friendly.
- Use clean HTML.
- Use simple professional styling.
- The resume should sound human-written.
- Use only information present in the candidate data.
- Return ONLY JSON matching the provided schema.

The JSON must contain exactly one field:

html

The html field must contain the complete resume HTML.
`;

    console.log(
        "Generating resume HTML using Gemini..."
    );

    const response = await generateWithFallback(
        prompt,
        resumePdfJsonSchema
    );

    const jsonContent = JSON.parse(response.text);

    console.log(
        "Resume HTML generated successfully."
    );

    const pdfBuffer = await generatePdfFromHtml(
        jsonContent.html
    );

    console.log(
        "Resume PDF generated successfully."
    );

    return pdfBuffer;
}

// =====================================================
// EXPORT
// =====================================================

module.exports = {
    generateInterviewReport,
    generateResumePdf
};