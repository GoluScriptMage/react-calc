/**
 * Scoring and result calculation utilities for Calculator Hub
 */

/**
 * Calculate final score based on user answers
 * @param {Array} answers - Array of answer objects with points
 * @returns {number} Final score percentage (0-100)
 */
export const calculateScore = (answers) => {
  if (!answers || answers.length === 0) return 0
  
  const totalPoints = answers.reduce((sum, answer) => sum + answer.points, 0)
  const maxPossiblePoints = answers.length * 4 // Maximum 4 points per question
  const percentage = Math.round((totalPoints / maxPossiblePoints) * 100)
  
  return Math.min(100, Math.max(0, percentage))
}

/**
 * Get result message and category based on score and calculator type
 * @param {number} score - Score percentage (0-100)
 * @param {string} calculatorType - Type of calculator
 * @param {string} userName - User's name for personalization
 * @returns {Object} Result object with title, message, category, strengths, improvements
 */
export const getResultMessage = (score, calculatorType, userName = 'friend') => {
  const results = {
    love: {
      excellent: {
        title: "Relationship Goals! 😍",
        category: "True Love Material",
        message: `Wow ${userName}! You're definitely relationship material! You handle communication like a pro, respect boundaries, and show genuine care. Your approach to love is mature and balanced.`,
        strengths: [
          "Great communication skills",
          "Respects boundaries and timing", 
          "Shows genuine care and interest",
          "Balanced approach to relationships"
        ],
        improvements: [
          "Keep being your authentic self",
          "Continue building emotional intelligence"
        ],
        advice: "You're ready for a meaningful relationship. Trust your instincts and don't settle for less than you deserve!"
      },
      good: {
        title: "Romance Ready! 💕",
        category: "Love Learner",
        message: `Hey ${userName}! You're on the right track with love! You understand the basics but there's room to grow. Your heart is in the right place.`,
        strengths: [
          "Good emotional awareness",
          "Willing to make effort",
          "Understands relationship basics"
        ],
        improvements: [
          "Work on communication timing",
          "Be more confident in your worth",
          "Practice active listening"
        ],
        advice: "Focus on building self-confidence and communication skills. Love starts with loving yourself!"
      },
      average: {
        title: "Getting There! 🌱",
        category: "Love Student", 
        message: `${userName}, you're learning about love! Some areas are strong, others need attention. Don't worry, everyone's journey is different.`,
        strengths: [
          "Open to learning",
          "Recognizes room for growth"
        ],
        improvements: [
          "Improve emotional communication",
          "Build confidence and self-worth",
          "Learn healthy relationship patterns",
          "Practice patience and understanding"
        ],
        advice: "Take time to understand yourself better. Read about healthy relationships and practice self-love first."
      },
      poor: {
        title: "Work in Progress 💪",
        category: "Love Beginner",
        message: `${userName}, love is a journey of learning! You might be overthinking or need to work on some relationship skills. That's totally okay - everyone starts somewhere.`,
        strengths: [
          "Honest about your feelings",
          "Willing to take the test (shows self-awareness)"
        ],
        improvements: [
          "Build self-confidence first",
          "Learn healthy communication",
          "Understand relationship boundaries",
          "Practice emotional regulation",
          "Work on trust and vulnerability"
        ],
        advice: "Focus on personal growth first. Consider talking to friends, reading books, or even therapy to build relationship skills."
      }
    },
    
    friendship: {
      excellent: {
        title: "Friendship Champion! 👑",
        category: "BFF Material",
        message: `${userName}, you're the friend everyone needs! Loyal, supportive, and always there when it matters. Your friends are lucky to have you.`,
        strengths: [
          "Extremely loyal and supportive",
          "Available during emergencies",
          "Great at planning and organizing",
          "Trustworthy with secrets"
        ],
        improvements: [
          "Don't forget to take care of yourself too",
          "Set healthy boundaries when needed"
        ],
        advice: "You're an amazing friend! Just remember that it's okay to prioritize yourself sometimes too."
      },
      good: {
        title: "Solid Friend! 🤝",
        category: "Reliable Buddy",
        message: `Hey ${userName}! You're a good friend who tries to be there for others. You understand friendship values and make effort to maintain relationships.`,
        strengths: [
          "Generally reliable",
          "Makes effort in friendships",
          "Good intentions"
        ],
        improvements: [
          "Be more proactive in reaching out",
          "Improve response time to friends",
          "Show more initiative in planning"
        ],
        advice: "You're doing well! Try to be more proactive and consistent in your friendships."
      },
      average: {
        title: "Learning Friend! 📚",
        category: "Casual Companion",
        message: `${userName}, you're somewhere in the middle with friendships. Sometimes you're great, sometimes you could do better. Balance is key!`,
        strengths: [
          "Capable of good friendships",
          "Understands basic friendship needs"
        ],
        improvements: [
          "Be more consistent and reliable",
          "Improve communication frequency",
          "Show more emotional support",
          "Take more initiative in planning"
        ],
        advice: "Focus on being more consistent. Small gestures and regular check-ins make a big difference!"
      },
      poor: {
        title: "Friendship in Training! 🎓",
        category: "Solo Traveler",
        message: `${userName}, friendships might not be your strongest area right now. That's okay! Maybe you're more focused on other things or just learning how to be a good friend.`,
        strengths: [
          "Honest about your limitations",
          "Potential for growth"
        ],
        improvements: [
          "Learn to prioritize friends occasionally",
          "Improve response time and availability",
          "Practice active listening",
          "Show more interest in others' lives",
          "Make effort to maintain connections"
        ],
        advice: "Start small - reply to messages promptly, remember birthdays, ask how friends are doing. Friendship is a skill that improves with practice!"
      }
    },
    
    career: {
      excellent: {
        title: "Career Superstar! ⭐",
        category: "Leadership Material",
        message: `${userName}, you've got the career game figured out! Organized, proactive, and professional. You're destined for success and leadership roles.`,
        strengths: [
          "Excellent planning and organization",
          "Takes initiative and leadership",
          "Handles feedback professionally",
          "Strong work-life balance"
        ],
        improvements: [
          "Continue mentoring others",
          "Stay humble while achieving success"
        ],
        advice: "You're on the right track! Consider taking on mentorship roles and leading bigger projects."
      },
      good: {
        title: "Rising Professional! 📈",
        category: "Career Climber",
        message: `Great job ${userName}! You understand professional dynamics and make good career choices. You're building a solid foundation for success.`,
        strengths: [
          "Good professional instincts",
          "Willing to learn and adapt",
          "Decent planning skills"
        ],
        improvements: [
          "Be more confident in presentations",
          "Take on more leadership opportunities",
          "Improve networking skills"
        ],
        advice: "Keep building your skills and confidence. Don't be afraid to take on challenging projects!"
      },
      average: {
        title: "Career Explorer! 🧭",
        category: "Professional Student",
        message: `${userName}, you're figuring out your career path! Some professional instincts are there, but there's room to grow and develop your work personality.`,
        strengths: [
          "Willing to learn and improve",
          "Basic professional understanding"
        ],
        improvements: [
          "Build more confidence in work settings",
          "Improve time management and planning",
          "Practice professional communication",
          "Seek feedback and act on it"
        ],
        advice: "Focus on building professional skills. Ask for mentorship and don't be afraid to take on new challenges!"
      },
      poor: {
        title: "Career Starter! 🌱",
        category: "Professional Beginner",
        message: `${userName}, everyone starts somewhere in their career journey! You might be new to professional environments or still figuring out your work style.`,
        strengths: [
          "Honest about current abilities",
          "Potential for significant growth"
        ],
        improvements: [
          "Build basic professional skills",
          "Improve time management",
          "Practice handling feedback positively",
          "Develop confidence in work settings",
          "Learn workplace communication"
        ],
        advice: "Start with the basics - punctuality, communication, and a positive attitude. Consider finding a mentor or taking professional development courses."
      }
    },
    
    personality: {
      excellent: {
        title: "Personality Plus! ✨",
        category: "Well-Rounded Individual",
        message: `${userName}, you've got a fantastic personality! Organized, socially confident, emotionally balanced, and proactive. People probably love being around you!`,
        strengths: [
          "Great planning and organization",
          "Socially confident and outgoing",
          "Emotionally stable and balanced",
          "Proactive and decisive"
        ],
        improvements: [
          "Continue being your awesome self",
          "Help others develop similar skills"
        ],
        advice: "You're doing great! Consider sharing your positive energy and helping others develop similar confidence."
      },
      good: {
        title: "Personality Power! 💪",
        category: "Positive Individual",
        message: `Nice ${userName}! You've got a solid personality with good social skills and emotional awareness. You handle life's challenges pretty well.`,
        strengths: [
          "Good social instincts",
          "Decent emotional regulation",
          "Generally positive approach"
        ],
        improvements: [
          "Be more organized and planned",
          "Build confidence in new situations",
          "Practice stress management"
        ],
        advice: "You're doing well! Work on planning skills and stepping out of your comfort zone more often."
      },
      average: {
        title: "Personality in Progress! 🔄",
        category: "Balanced Individual",
        message: `${userName}, you're a pretty balanced person! Some areas are strong, others could use work. You're on a good path of personal development.`,
        strengths: [
          "Self-aware and willing to improve",
          "Balanced approach to life"
        ],
        improvements: [
          "Improve planning and organization",
          "Build social confidence",
          "Work on stress management",
          "Be more proactive in new situations"
        ],
        advice: "Focus on one area at a time. Maybe start with organization or social confidence - small improvements make big differences!"
      },
      poor: {
        title: "Personality Development! 🌱",
        category: "Growth-Focused Individual",
        message: `${userName}, you might be in a transitional phase or prefer a more low-key lifestyle. There's lots of room for personal growth and that's exciting!`,
        strengths: [
          "Honest about personal areas for growth",
          "Potential for significant development"
        ],
        improvements: [
          "Build basic organization skills",
          "Practice social interactions",
          "Learn stress management techniques",
          "Develop planning habits",
          "Work on emotional regulation"
        ],
        advice: "Start small - try planning your week, practice one social interaction, or learn one stress management technique. Personal growth is a journey!"
      }
    }
  }

  // Determine score category
  let category
  if (score >= 85) category = 'excellent'
  else if (score >= 70) category = 'good'
  else if (score >= 50) category = 'average'
  else category = 'poor'

  return results[calculatorType]?.[category] || results.personality.average
}

/**
 * Get detailed breakdown of answers for review
 * @param {Array} answers - User's answers
 * @param {Array} questions - Original questions
 * @returns {Array} Detailed breakdown
 */
export const getAnswerBreakdown = (answers, questions) => {
  return answers.map((answer, index) => {
    const question = questions[index]
    const selectedOption = question.options.find(opt => opt.id === answer.selectedOption.id)
    
    return {
      questionText: question.question,
      selectedAnswer: selectedOption.text,
      pointsEarned: answer.points,
      maxPoints: 4,
      percentage: Math.round((answer.points / 4) * 100)
    }
  })
}

/**
 * Get suggestions for improvement based on low-scoring areas
 * @param {Array} answers - User's answers  
 * @param {Array} questions - Original questions
 * @returns {Array} Improvement suggestions
 */
export const getImprovementSuggestions = (answers, questions) => {
  const lowScoring = answers
    .map((answer, index) => ({ ...answer, questionIndex: index }))
    .filter(answer => answer.points <= 2)
    .map(answer => questions[answer.questionIndex])

  const suggestions = lowScoring.map(question => ({
    area: question.question,
    suggestion: "Consider reflecting on this scenario and how you might handle it differently"
  }))

  return suggestions
}

/**
 * Generate shareable result text for social media
 * @param {Object} result - Result object from getResultMessage
 * @param {number} score - Score percentage
 * @param {string} calculatorType - Calculator type
 * @returns {string} Shareable text
 */
export const generateShareText = (result, score, calculatorType) => {
  const calculatorNames = {
    love: 'Love Calculator',
    friendship: 'Friendship Calculator', 
    career: 'Career Calculator',
    personality: 'Personality Calculator'
  }

  return `I just took the ${calculatorNames[calculatorType]} and scored ${score}%! 
${result.title} ${result.category}

Try it yourself at Calculator Hub! 🧮✨

#PersonalityTest #CalculatorHub #SelfDiscovery`
}

export default {
  calculateScore,
  getResultMessage,
  getAnswerBreakdown,
  getImprovementSuggestions,
  generateShareText
}
