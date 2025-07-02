export interface AdaptationRequest {
text: string;
targetLevel: string;
purpose: string;
}

export interface AdaptationResponse {
originalText: string;
adaptedText: string;
readingLevelAnalysis: string;
keyInformationPreservation: string;
}