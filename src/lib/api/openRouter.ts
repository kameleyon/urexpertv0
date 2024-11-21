const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const generateUMReview = async (chartData: string) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://urexpert.ai',
        'X-Title': 'URExpert'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-90b-vision-instruct',
        messages: [{
          role: 'user',
          content: `Generate a concise patient review based on the following data:
Follow these guidelines strictly:
  
  Generate a title for the review with patient age, gender, and the main admission diagnosis. ex. 79M NSTEMI.

  Provide a brief history of the present illness, including the chief complaint and any relevant patient history. ER Care (if applicable): Summarize the initial findings in the Emergency Room, including initial vitals, findings, and care provided. Include amount of PRN IV meds given in ER such as antiemetics, pain meds, benzo, antiarrhythmic, etc. (one paragraph)

  Assessment: Give the admission diagnoses (In one paragraph with each diagnoses separated by a comma)

  Daily Progress: Always include. Start with the date (MM/DD) and provide a concise, one-line update on the patient's progress for that day. Include amount of PRN IV meds given such as antiemetics, pain meds, benzo, antiarrhythmic, etc. (one line each, repeat for each day of progress notes given, in ascending order)

  Vital Signs (VS): Include temperature (Temp), respiratory rate (Resp), heart rate (HR), blood pressure (BP), and oxygen saturation (SPo2). Mention the level of FiO2 and the delivery system (e.g., NC, BiPAP, HHFNC) if applicable. (on one line. NEVER BULLET POINTS. )

  EKG: Include if available in one line

  Abnormal Labs: if available Include abnormal lab results only, and add baseline values if available. (on one line. NEVER BULLET POINTS. )

  Imaging: if available Report imaging results, each in one line.

  Surgery/Procedure Details: Only if available. Start with Date MM/DD and Procedure Name and CPT code if known or provided

  Plan: Provide a summarized plan for that day. (ONE PARAGRAPH NEVER BULLET POINTS. )

  Summary of hospital stay: Provide a comprehensive explanation of why the chosen status (IP, OSV, Outpatient, PA) is appropriate based on the patient's condition, symptoms, initial treatment and response, and progression and anticipation of treatment based on consultation, patient commorbidities and other aspect that may affect their prognosis. (short paragraph)

  Recommendation for status: Specify either Inpatient (IP), Observation (OSV), Outpatient, or Send to PA based on the clinical information provided.

  InterQual Subset: Indicate the most appropriate InterQual Subset relevant to the case.

  1. Format the report exactly as provided in the input data.
  2. ONLY INCLUDE SECTIONS WHERE INFORMATION IS PROVIDED.
  3. Be concise and straight to the point.
  4. DO NOT mention patient names, family names, or MD names for HIPAA purposes.
  5. Do not include sections or data if the information is not provided.
  6. Do not be creative or add information not provided in the patient data.
  7. Use the exact section titles as given in the input.
  8. Maintain the order of sections as they appear in the input data.
  9. Do not add any additional sections or commentary.
  10. Summary of status: Provide a brief explanation of why the chosen status (IP, OSV, Outpatient, PA) is appropriate based on the patient's condition and progression. (short paragraph)
  11. Plan is always one paragraph - NEVER BULLET POINTS. 
  12. For vital sign: Include temperature (Temp), respiratory rate (Resp), heart rate (HR), blood pressure (BP), and oxygen saturation (SPo2). Mention the level of FiO2 and the delivery system (e.g., NC, BiPAP, HHFNC) if applicable. (on one line)
  13. Do not write thing like "Based on the information provided" or "Based on the patient's condition and progression" or "Here is a concise patient review based on the provided data:" start directly with the report.
  
  Ensure the output follows this exact format:

  [Title]

  Brief HPI: [content]
  
  Assessment: [content]

  [Date]: [content]
  [Additional dates if provided]

  Vital signs: [content]

  EKG: [content]

  Abnormal labs: [content]

  Imaging: [content]

  Surgery/procedure details: [content]

  Plan: [content]

  Summary of status: [content]

  Recommendation for status: [MUST BE ONLY ONE OF: Inpatient, Observation, Outpatient, or Send to PA for secondary review]

  InterQual subset: [Specify the exact InterQual subset name, do not use generic terms like "Inpatient"]

..........................................................
  Chart data to review:
${chartData}`
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', response.status, errorText);
      throw new Error(`API request failed with status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content;
  } catch (error) {
    console.error('Error in generateUMReview:', error);
    throw error;
  }
};