import questionsData from './questions.json'

/**
 * Utility for handling name and gender personalization in calculator questions
 */

// Gender options for love calculator
export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
  NON_BINARY: 'non-binary',
  ANYONE: 'anyone'
}

// Pronoun mappings for different genders
export const PRONOUNS = {
  [GENDER_OPTIONS.MALE]: {
    subjective: 'he',      // He is nice
    objective: 'him',      // I like him
    possessive: 'his',     // His car
    reflexive: 'himself'   // He did it himself
  },
  [GENDER_OPTIONS.FEMALE]: {
    subjective: 'she',
    objective: 'her', 
    possessive: 'her',
    reflexive: 'herself'
  },
  [GENDER_OPTIONS.NON_BINARY]: {
    subjective: 'they',
    objective: 'them',
    possessive: 'their',
    reflexive: 'themselves'
  },
  [GENDER_OPTIONS.ANYONE]: {
    subjective: 'they',
    objective: 'them',
    possessive: 'their',
    reflexive: 'themselves'
  }
}

/**
 * Replace placeholders in question text with personalized content
 * @param {string} text - Question text with placeholders
 * @param {string} userName - User's name
 * @param {string} targetGender - Gender preference for love calculator
 * @returns {string} Personalized question text
 */
export const personalizeText = (text, userName = 'friend', targetGender = GENDER_OPTIONS.ANYONE) => {
  const pronouns = PRONOUNS[targetGender] || PRONOUNS[GENDER_OPTIONS.ANYONE]
  
  return text
    .replace(/{name}/g, userName)
    .replace(/{targetPronoun}/g, pronouns.subjective)
    .replace(/{targetObjective}/g, pronouns.objective)
    .replace(/{targetPossessive}/g, pronouns.possessive)
    .replace(/{targetReflexive}/g, pronouns.reflexive)
}

/**
 * Get questions for a specific calculator type with personalization
 * @param {string} calculatorType - Type of calculator (love, friendship, career, personality)
 * @param {string} userName - User's name
 * @param {string} targetGender - Gender preference (for love calculator only)
 * @returns {Array} Array of personalized questions
 */
export const getQuestions = (calculatorType, userName = 'friend', targetGender = GENDER_OPTIONS.ANYONE) => {
  const questions = questionsData[calculatorType] || []
  
  return questions.map(question => ({
    ...question,
    question: personalizeText(question.question, userName, targetGender),
    englishHint: personalizeText(question.englishHint, userName, targetGender)
  }))
}

/**
 * Get a random question from any calculator (for preview/demo)
 * @returns {Object} Random question
 */
export const getRandomQuestion = () => {
  const allTypes = Object.keys(questionsData)
  const randomType = allTypes[Math.floor(Math.random() * allTypes.length)]
  const questions = questionsData[randomType]
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
  
  return {
    ...randomQuestion,
    calculatorType: randomType,
    question: personalizeText(randomQuestion.question, 'friend'),
    englishHint: personalizeText(randomQuestion.englishHint, 'friend')
  }
}

/**
 * Get question count for a calculator type
 * @param {string} calculatorType - Type of calculator
 * @returns {number} Number of questions
 */
export const getQuestionCount = (calculatorType) => {
  return questionsData[calculatorType]?.length || 0
}

/**
 * Validate if calculator type exists
 * @param {string} calculatorType - Type to validate
 * @returns {boolean} True if valid type
 */
export const isValidCalculatorType = (calculatorType) => {
  return Object.keys(questionsData).includes(calculatorType)
}

/**
 * Get all available calculator types
 * @returns {Array} Array of calculator type strings
 */
export const getCalculatorTypes = () => {
  return Object.keys(questionsData)
}

// Export the raw data as well
export { questionsData }
export default { getQuestions, personalizeText, GENDER_OPTIONS, PRONOUNS }
