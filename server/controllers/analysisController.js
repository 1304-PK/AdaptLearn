const { GoogleGenerativeAI } = require("@google/generative-ai");
const { trySimpleExtraction, formatForGemini } = require("../helpers/pdfHelpers");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAnalysis = async (req, res) => {
    try {
        const resumeFile = req.files?.resume?.[0];
        const jdFile = req.files?.jobDescription?.[0];

        if (!resumeFile || !jdFile) {
            return res.status(400).json({ error: "Missing files" });
        }

        // 1. Try Simple Extraction first
        const resumeText = await trySimpleExtraction(resumeFile.buffer);
        const jdText = await trySimpleExtraction(jdFile.buffer);

        // 2. Prepare Gemini Input
        // If text exists, we send the text. If not, we send the buffer (multimodal OCR).
        const resumeInput = resumeText ? resumeText : formatForGemini(resumeFile.buffer, resumeFile.mimetype);
        const jdInput = jdText ? jdText : formatForGemini(jdFile.buffer, jdFile.mimetype);

        // 3. Call Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
            You are an expert resume and job description analyzer.

You will receive:

1. A resume
2. A job description

Your task is to compare them and return ONLY structured JSON in the exact format.

Do NOT output explanations.
Do NOT output markdown.
Do NOT output comments.
Return ONLY valid JSON.

---

OBJECTIVE

You must:

1. Extract required skills from job description
2. Extract skills from resume
3. Compare overlap
4. Estimate proficiency
5. Estimate experience relevance
6. Extract critical keywords
7. Create domain/category strength scores (dynamic)
8. Identify missing critical skills
9. Identify extra valuable skills
10. Estimate transferability score

---

SPIDER GRAPH RULES (DYNAMIC)

You MUST dynamically create 4–8 categories based on job description domains.

Examples:

Software Role:

* Frontend
* Backend
* DevOps
* Database
* Architecture
* Testing

Mechanical Role:

* CAD
* Manufacturing
* Thermal
* Materials
* Simulation
* Design

Data Science Role:

* ML
* Statistics
* Data Engineering
* Visualization
* Python
* Deployment

Rules:

* Categories must come from JD domains
* Categories must group related skills
* Each category scored 0–1
* Max 8 categories
* Min 4 categories

Scoring:

0 = none
0.25 = weak
0.5 = moderate
0.75 = strong
1 = expert

---

SKILL BAR RULES

Extract RELEVANT AND IMPORTANT skills from job description.
If two or more skills have very high similarity then group them together in one skill.
Keep the maximum number of skill to 12.


For each:

skill_name:
normalized skill

is_in_resume:
true if present

actual_proficiency:

0 missing
0.2 weak
0.4 basic
0.6 intermediate
0.8 strong
1 expert

jd_priority:

Critical:

* required
* must have
* core responsibilities

Normal:

* preferred
* optional
* supporting tools

---

SUMMARY METRICS RULES

skills.total_skills_required_in_jd
count unique required skills

skills.total_relevant_skills_found_in_resume
count matched skills

---

EXPERIENCE RULES

years_required_by_jd
Extract numeric years required

relevant_years_in_resume_to_jd
Estimate relevant experience only

---

KEYWORD RULES

Extract critical domain keywords:

Examples:

* methodologies
* processes
* responsibilities
* architecture
* tools
* domain knowledge

Count:

total_critical_keywords_in_jd
total_matched_keywords_in_resume

---

TRANSFERABILITY SCORE

Estimate ability to learn missing skills using related ones.

Examples:

SolidWorks → CATIA
AWS → GCP
React → Vue
MATLAB → Python
ANSYS → Abaqus

Score:

0 none
0.25 weak
0.5 moderate
0.75 strong
1 very strong

Provide explanation.

---

DELTA ANALYSIS

critical_skills_missing:
Required + critical but missing

extra_value_skills_not_in_jd:
Resume skills not in JD but useful

---

OUTPUT FORMAT (STRICT)

{
"summary_metrics": {
"skills": {
"total_skills_required_in_jd": number,
"total_relevant_skills_found_in_resume": number
},
"experience": {
"years_required_by_jd": number,
"relevant_years_in_resume_to_jd": number
},
"keywords": {
"total_critical_keywords_in_jd": number,
"total_matched_keywords_in_resume": number
},
"global_transferability_score": number,
"transferability_logic": string
},
"spider_graph": {
"CATEGORY_NAME": number
},
"skill_bars": [
{
"skill_name": string,
"is_in_resume": boolean,
"actual_proficiency": number,
"jd_priority": string
}
],
"delta_analysis": {
"critical_skills_missing": [],
"extra_value_skills_not_in_jd": []
}
}

NOTE:
spider_graph keys must be dynamically generated.

---

INPUT

RESUME:
{{resume}}

JOB DESCRIPTION:
{{job_description}}

Return ONLY JSON in the given format

{
  "summary_metrics": {
    "skills": {
      "total_skills_required_in_jd": "number",
      "total_relevant_skills_found_in_resume": "number"
    },
    "experience": {
      "years_required_by_jd": "number",
      "relevant_years_in_resume_to_jd": "number"
    },
    "keywords": {
      "total_critical_keywords_in_jd": "number",
      "total_matched_keywords_in_resume": "number"
    },
    "global_transferability_score": "number (0-1)",
    "transferability_logic": "string (A brief explanation of why the score was given)"
  },
  "spider_graph": {
    "Frontend": "number (0-1)",
    "Backend": "number (0-1)",
    "DevOps_Cloud": "number (0-1)",
    "System_Design": "number (0-1)",
    "Data_Database": "number (0-1)",
    "Soft_Skills": "number (0-1)"
  },
  "skill_bars": [
    {
      "skill_name": "string",
      "is_in_resume": "boolean",
      "actual_proficiency": "number (0-1)",
      "jd_priority": "string (Critical | Normal)"
    }
  ],
  "delta_analysis": {
    "critical_skills_missing": ["list"],
    "extra_value_skills_not_in_jd": ["list"]
  }
}

this is how the final json should look like and avoid using /n or anything like in json file

            Resume Content: ${typeof resumeInput === 'string' ? resumeInput : "See attached file"}
            Job Description Content: ${typeof jdInput === 'string' ? jdInput : "See attached file"}
        `;

        // We build an array of inputs for Gemini
        const contentPayload = [{ text: prompt }];

        // Handle the inputs correctly
        if (typeof resumeInput === 'string') {
            contentPayload.push({ text: resumeInput });
        } else {
            // If it's a file/buffer, it must be an object like { inlineData: { ... } }
            contentPayload.push(resumeInput);
        }

        if (typeof jdInput === 'string') {
            contentPayload.push({ text: jdInput });
        } else {
            contentPayload.push(jdInput);
        }

        const result = await model.generateContent({
            contents: [{ role: "user", parts: contentPayload }],
            generationConfig: {
                responseMimeType: "application/json"
            }
        });
        const response = await result.response;
        const rawText = JSON.parse(response.text());
        console.log(rawText);
        console.log(rawText.summary_metrics);
        console.log(rawText.spider_graph);

        const skillScore = (rawText.summary_metrics.skills.total_relevant_skills_found_in_resume / rawText.summary_metrics.skills.total_skills_required_in_jd) * 100;
        const experienceScore = (rawText.summary_metrics.experience.relevant_years_in_resume_to_jd / rawText.summary_metrics.experience.years_required_by_jd) * 100;
        const keywordsScore = (rawText.summary_metrics.keywords.total_matched_keywords_in_resume / rawText.summary_metrics.keywords.total_critical_keywords_in_jd) * 100;
        const overallScore = (0.5 * skillScore) + (0.3 * experienceScore) + (0.2 * keywordsScore);

        res.json({
            skillScore,
            experienceScore,
            keywordsScore,
            overallScore,
            transferabilityScore: rawText.summary_metrics.global_transferability_score,
            transferabilityLogic: rawText.summary_metrics.transferability_logic,
            spiderGraph: rawText.spider_graph,
            skillBars: rawText.skill_bars,
            missingCriticalSkills: rawText.delta_analysis.critical_skills_missing,
            extraSkills: rawText.delta_analysis.extra_value_skills_not_in_jd
        });

    } catch (error) {
        console.error("Processing Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAnalysis };
