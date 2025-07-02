export const createAdaptationPrompt = (
originalText: string,
targetLevel: string,
purpose: string
): string => {
return `
You are an expert in adapting complex text for different reading levels while preserving all key information and meaning. You will work in three steps:

STEP 1 - ADAPTATION:
Given the text below, adapt it to a ${targetLevel} reading level for ${purpose} purposes. Make it more accessible by simplifying vocabulary, shortening sentences, and clarifying concepts, but ensure ALL key information is preserved.

Original text:
${originalText}

STEP 2 - SELF-CRITIQUE:
Review your adaptation and identify any:
1. Key information from the original that was lost
2. Meaning changes or inaccuracies introduced
3. Areas where the reading level might still be too complex

STEP 3 - REFINEMENT:
Based on your critique, provide a final version that addresses any issues identified while maintaining the target reading level.

OUTPUT FORMAT:
Adapted Text: [Your final adapted text]
Reading Level Analysis: [Brief analysis of the adaptation's reading level]
Key Information Preservation: [Confirmation that all key points were maintained]

It is critical that you follow the exact output format specified above with these three sections clearly labeled.
`;
};