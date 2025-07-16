# 🚀 Calculator Hub - Complete Implementation Guide

## 📋 **Project Overview**
Building a 4-calculator personality app with React, Tailwind CSS, and Framer Motion
- **Timeline**: 3-4 weeks (can be adjusted based on your pace)
- **Tech Stack**: React 18+, Tailwind CSS, Framer Motion, React Router
- **Design**: Dark theme with calculator-specific colors

---

## 🎯 **PHASE 1: PROJECT SETUP (Days 1-2)**

### Step 1.1: Initialize React Project
```bash
# Create new Vite React project
npm create vite@latest calculator-hub -- --template react
cd calculator-hub
npm install

# Install required dependencies
npm install react-router-dom framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 1.2: Configure Tailwind CSS
**File**: `tailwind.config.js`
**Reference**: Lines 61-120 in `COLOR_SYSTEM_GUIDE.md`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom dark theme colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        // Calculator-specific colors (from COLOR_SYSTEM_GUIDE.md)
        love: {
          50: '#fdf2f8',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          900: '#831843'
        },
        friendship: {
          50: '#f0fdfa',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          900: '#134e4a'
        },
        career: {
          50: '#faf5ff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          900: '#581c87'
        },
        personality: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#92400e'
        }
      },
      backgroundImage: {
        'love-gradient': 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
        'friendship-gradient': 'linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)',
        'career-gradient': 'linear-gradient(135deg, #9333ea 0%, #8b5cf6 100%)',
        'personality-gradient': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-love': 'pulseLove 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseLove: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(236, 72, 153, 0.7)' },
          '50%': { boxShadow: '0 0 0 20px rgba(236, 72, 153, 0)' },
        }
      }
    },
  },
  plugins: [],
}
```

### Step 1.3: Setup Base CSS
**File**: `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply dark; /* Enable dark mode by default */
  }
  
  body {
    @apply bg-gray-900 text-white font-sans;
  }
}

@layer components {
  .btn-primary {
    @apply px-6 py-3 rounded-lg font-medium transition-all duration-200 
           hover:scale-105 active:scale-95;
  }
  
  .btn-love {
    @apply btn-primary bg-love-gradient hover:shadow-lg hover:shadow-love-500/25;
  }
  
  .btn-friendship {
    @apply btn-primary bg-friendship-gradient hover:shadow-lg hover:shadow-friendship-500/25;
  }
  
  .btn-career {
    @apply btn-primary bg-career-gradient hover:shadow-lg hover:shadow-career-500/25;
  }
  
  .btn-personality {
    @apply btn-primary bg-personality-gradient hover:shadow-lg hover:shadow-personality-500/25;
  }
  
  .card {
    @apply bg-gray-800 border border-gray-700 rounded-xl p-6 
           shadow-lg hover:shadow-xl transition-shadow duration-300;
  }
  
  .calculator-card {
    @apply card hover:scale-105 transition-transform duration-300 
           cursor-pointer group;
  }
}
```

### Step 1.4: Create Project Structure
```bash
mkdir -p src/components src/pages src/contexts src/hooks src/data src/utils
```

**Project Structure**:
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Layout.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Modal.jsx
│   ├── calculator/
│   │   ├── CalculatorCard.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── ProgressBar.jsx
│   │   └── ResultDisplay.jsx
│   └── audio/
│       └── AudioControls.jsx
├── pages/
│   ├── Home.jsx
│   ├── Calculator.jsx
│   └── Result.jsx
├── contexts/
│   ├── ThemeContext.jsx
│   └── AudioContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useCalculator.js
├── data/
│   └── questions.js
└── utils/
    └── scoring.js
```

---

## 🎯 **PHASE 2: CORE COMPONENTS (Days 3-7)**

### Step 2.1: Theme Context Setup
**File**: `src/contexts/ThemeContext.jsx`
**Reference**: Lines 250-290 in `COLOR_SYSTEM_GUIDE.md`

```jsx
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true)
  const [calculatorTheme, setCalculatorTheme] = useState('love')

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme')
    const savedCalculatorTheme = localStorage.getItem('calculatorTheme')
    
    if (savedTheme) setIsDark(savedTheme === 'dark')
    if (savedCalculatorTheme) setCalculatorTheme(savedCalculatorTheme)
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    // Save calculator theme
    localStorage.setItem('calculatorTheme', calculatorTheme)
  }, [calculatorTheme])

  const getThemeClasses = (type) => {
    const themes = {
      love: {
        background: 'bg-gray-900',
        card: 'bg-gray-800 border-love-500/20',
        accent: 'bg-love-gradient',
        text: 'text-love-300',
        button: 'btn-love'
      },
      friendship: {
        background: 'bg-gray-900',
        card: 'bg-gray-800 border-friendship-500/20',
        accent: 'bg-friendship-gradient',
        text: 'text-friendship-300',
        button: 'btn-friendship'
      },
      career: {
        background: 'bg-gray-900',
        card: 'bg-gray-800 border-career-500/20',
        accent: 'bg-career-gradient',
        text: 'text-career-300',
        button: 'btn-career'
      },
      personality: {
        background: 'bg-gray-900',
        card: 'bg-gray-800 border-personality-500/20',
        accent: 'bg-personality-gradient',
        text: 'text-personality-300',
        button: 'btn-personality'
      }
    }
    return themes[type] || themes.love
  }

  return (
    <ThemeContext.Provider value={{
      isDark,
      setIsDark,
      calculatorTheme,
      setCalculatorTheme,
      getThemeClasses
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

### Step 2.2: Questions Data Structure
**File**: `src/data/questions.js` (Updated with name/gender personalization)
**Reference**: Complete questions data in `src/data/questions.json`

```javascript
import questionsData from './questions.json'
import { personalizeText, GENDER_OPTIONS } from './questions'

// Import the complete questions utility
export const getQuestions = (calculatorType, userName = 'friend', targetGender = 'anyone') => {
  const questions = questionsData[calculatorType] || []
  
  return questions.map(question => ({
    ...question,
    question: personalizeText(question.question, userName, targetGender),
    englishHint: personalizeText(question.englishHint, userName, targetGender)
  }))
}

// Gender options for love calculator
export { GENDER_OPTIONS, personalizeText }
```

**Key Features:**
- **Name Personalization**: `{name}` placeholder gets replaced with user's name
- **Gender Pronouns**: `{targetPronoun}` becomes he/she/they based on preference
- **Complete Dataset**: 6 questions per calculator with Hinglish text
- **Scoring System**: Each option has 1-4 points for accurate results

### Step 2.3: Calculator Hook
**File**: `src/hooks/useCalculator.js`

```javascript
import { useState, useCallback } from 'react'
import { getQuestions } from '../data/questions'
import { calculateScore, getResultMessage } from '../utils/scoring'

export const useCalculator = (calculatorType) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [userName, setUserName] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  
  const questions = getQuestions(calculatorType)
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const answerQuestion = useCallback((selectedOption) => {
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedOption,
      points: selectedOption.points
    }
    
    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)
    
    // Check if this was the last question
    if (currentQuestionIndex === questions.length - 1) {
      const finalScore = calculateScore(updatedAnswers)
      setScore(finalScore)
      setIsCompleted(true)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }, [currentQuestion, currentQuestionIndex, answers, questions.length])

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setAnswers(prev => prev.slice(0, -1))
    }
  }, [currentQuestionIndex])

  const resetCalculator = useCallback(() => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setIsCompleted(false)
    setScore(0)
  }, [])

  return {
    currentQuestion,
    currentQuestionIndex,
    answers,
    userName,
    setUserName,
    progress,
    isCompleted,
    score,
    answerQuestion,
    goToPreviousQuestion,
    resetCalculator,
    totalQuestions: questions.length
  }
}
```

---

## 🎯 **PHASE 3: UI COMPONENTS (Days 8-14)**

### Step 3.1: Layout Components
**File**: `src/components/layout/Header.jsx`
**Reference**: Lines 49-74 in `COPILOT_STYLING_PROMPTS.md`

```jsx
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { SunIcon, MoonIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const { isDark, setIsDark } = useTheme()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">🧮</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Calculator Hub
            </h1>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>

            {/* Audio Toggle */}
            <motion.button
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SpeakerWaveIcon className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
```

### Step 3.2: Calculator Card Component
**File**: `src/components/calculator/CalculatorCard.jsx`
**Reference**: Lines 75-102 in `COPILOT_STYLING_PROMPTS.md`

```jsx
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const CalculatorCard = ({ calculator, index }) => {
  const navigate = useNavigate()

  const handleStartTest = () => {
    navigate(`/calculator/${calculator.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 20px 40px ${calculator.shadowColor}`,
      }}
      className="calculator-card group"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${calculator.gradient} opacity-10 rounded-xl`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-4 group-hover:animate-bounce">
          {calculator.icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-white">
          {calculator.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
          {calculator.description}
        </p>
        
        {/* Start Button */}
        <motion.button
          onClick={handleStartTest}
          className={`w-full ${calculator.buttonClass} text-white font-medium`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Test
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CalculatorCard
```

### Step 3.3: Question Card Component
**File**: `src/components/calculator/QuestionCard.jsx`
**Reference**: Lines 134-167 in `COPILOT_STYLING_PROMPTS.md`

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const QuestionCard = ({ question, onAnswer, userName, calculatorTheme }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    // Add slight delay for animation
    setTimeout(() => {
      onAnswer(option)
      setSelectedOption(null)
    }, 300)
  }

  // Replace {name} placeholder in question
  const questionText = question.question.replace('{name}', userName || 'friend')

  return (
    <motion.div
      key={question.id}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className="card max-w-2xl mx-auto"
    >
      {/* Question */}
      <div className="mb-8">
        <motion.h2 
          className="text-2xl font-bold mb-2 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {questionText}
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {question.englishHint}
        </motion.p>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full p-4 text-left rounded-lg border transition-all duration-200
              ${selectedOption?.id === option.id
                ? `bg-${calculatorTheme}-600 border-${calculatorTheme}-500 text-white`
                : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
              }
            `}
          >
            <span className="font-medium">{option.id.toUpperCase()})</span>
            <span className="ml-2">{option.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default QuestionCard
```

### Step 3.4: Progress Bar Component
**File**: `src/components/calculator/ProgressBar.jsx`
**Reference**: Lines 168-189 in `COPILOT_STYLING_PROMPTS.md`

```jsx
import { motion } from 'framer-motion'

const ProgressBar = ({ progress, currentQuestion, totalQuestions, calculatorTheme }) => {
  const progressColors = {
    love: 'bg-love-gradient',
    friendship: 'bg-friendship-gradient',
    career: 'bg-career-gradient',
    personality: 'bg-personality-gradient'
  }

  return (
    <div className="mb-8">
      {/* Progress Info */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <motion.span 
          className="text-sm font-medium text-white"
          key={progress}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${progressColors[calculatorTheme]}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
```

---

## 🎯 **PHASE 4: PAGES & ROUTING (Days 15-18)**

### Step 4.1: App.jsx Setup
**File**: `src/App.jsx`

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Result from './pages/Result'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator/:type" element={<Calculator />} />
            <Route path="/result/:type" element={<Result />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
```

### Step 4.2: Home Page
**File**: `src/pages/Home.jsx`
**Reference**: Lines 10-48 in `VISUAL_DESIGN_GUIDE.md`

```jsx
import { motion } from 'framer-motion'
import CalculatorCard from '../components/calculator/CalculatorCard'

const calculators = [
  {
    id: 'love',
    name: 'Love Calculator',
    icon: '💕',
    description: 'Find your compatibility and discover your relationship style',
    gradient: 'bg-love-gradient',
    buttonClass: 'btn-love',
    shadowColor: 'rgba(236, 72, 153, 0.3)'
  },
  {
    id: 'friendship',
    name: 'Friendship Calculator', 
    icon: '👫',
    description: 'Test your friendship level and see how good a friend you are',
    gradient: 'bg-friendship-gradient',
    buttonClass: 'btn-friendship',
    shadowColor: 'rgba(20, 184, 166, 0.3)'
  },
  {
    id: 'career',
    name: 'Career Calculator',
    icon: '💼', 
    description: 'Discover your work personality and career strengths',
    gradient: 'bg-career-gradient',
    buttonClass: 'btn-career',
    shadowColor: 'rgba(168, 85, 247, 0.3)'
  },
  {
    id: 'personality',
    name: 'Personality Calculator',
    icon: '🧠',
    description: 'Uncover your true self and personality traits',
    gradient: 'bg-personality-gradient', 
    buttonClass: 'btn-personality',
    shadowColor: 'rgba(245, 158, 11, 0.3)'
  }
]

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Calculator Hub
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Discover Your Personality
          </p>
        </motion.div>

        {/* Welcome Message */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-lg text-gray-300 mb-2">
            Hey! Ready to dive into some fun personality tests?
          </p>
          <p className="text-gray-400">
            Choose your adventure below 👇
          </p>
        </motion.div>

        {/* Calculator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calculator, index) => (
            <CalculatorCard 
              key={calculator.id}
              calculator={calculator}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
```

### Step 4.3: Calculator Page
**File**: `src/pages/Calculator.jsx`
**Reference**: Lines 83-129 in `VISUAL_DESIGN_GUIDE.md`

```jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCalculator } from '../hooks/useCalculator'
import { useTheme } from '../contexts/ThemeContext'
import QuestionCard from '../components/calculator/QuestionCard'
import ProgressBar from '../components/calculator/ProgressBar'
import Modal from '../components/ui/Modal'

const Calculator = () => {
  const { type } = useParams()
  const navigate = useNavigate()
  const { getThemeClasses } = useTheme()
  const [showNameModal, setShowNameModal] = useState(true)
  const [tempUserName, setTempUserName] = useState('')

  const {
    currentQuestion,
    currentQuestionIndex,
    userName,
    setUserName,
    progress,
    isCompleted,
    score,
    answerQuestion,
    goToPreviousQuestion,
    totalQuestions
  } = useCalculator(type)

  const theme = getThemeClasses(type)

  // Handle name submission
  const handleNameSubmit = () => {
    if (tempUserName.trim()) {
      setUserName(tempUserName.trim())
      setShowNameModal(false)
    }
  }

  // Redirect to result when completed
  useEffect(() => {
    if (isCompleted) {
      navigate(`/result/${type}`, { 
        state: { score, userName, calculatorType: type }
      })
    }
  }, [isCompleted, navigate, type, score, userName])

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  return (
    <div className={`min-h-screen ${theme.background} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          
          <h1 className={`text-xl font-bold capitalize ${theme.text}`}>
            {type} Calculator
          </h1>
          
          <div className="text-sm text-gray-400">
            {currentQuestionIndex + 1}/{totalQuestions}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <ProgressBar 
          progress={progress}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          calculatorTheme={type}
        />

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          onAnswer={answerQuestion}
          userName={userName}
          calculatorTheme={type}
        />

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between mt-8"
        >
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="btn-primary bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="text-sm text-gray-400">
            Swipe or click to continue
          </div>
        </motion.div>
      </div>

      {/* Name Collection Modal */}
      <Modal isOpen={showNameModal} onClose={() => {}}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">What's your name?</h2>
          <p className="text-gray-400 mb-6">
            We'll personalize the questions for you!
          </p>
          <input
            type="text"
            value={tempUserName}
            onChange={(e) => setTempUserName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white mb-4 focus:border-blue-500 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
          />
          <button
            onClick={handleNameSubmit}
            disabled={!tempUserName.trim()}
            className={`w-full ${theme.button} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Start Test
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Calculator
```

---

## 🎯 **PHASE 5: FINAL TOUCHES (Days 19-21)**

### Step 5.1: Result Page
**File**: `src/pages/Result.jsx`
**Reference**: Lines 131-148 in `VISUAL_DESIGN_GUIDE.md`

### Step 5.2: Scoring Logic
**File**: `src/utils/scoring.js`
**Reference**: Lines 100-150 in `CALCULATOR_PROJECTS_DETAILED.md`

### Step 5.3: Audio Integration
**File**: `src/contexts/AudioContext.jsx`

### Step 5.4: Mobile Optimizations
- Touch gestures for question navigation
- Improved mobile animations
- Better mobile modal handling

---

## 🚀 **DAILY IMPLEMENTATION SCHEDULE**

### **Week 1: Foundation**
- **Day 1**: Project setup + Tailwind config
- **Day 2**: Folder structure + base components
- **Day 3**: Theme context + basic styling
- **Day 4**: Questions data structure
- **Day 5**: Calculator hook logic
- **Day 6**: Home page layout
- **Day 7**: Testing & debugging foundation

### **Week 2: Core Features**
- **Day 8**: Header + navigation
- **Day 9**: Calculator cards with animations
- **Day 10**: Question card component
- **Day 11**: Progress bar + transitions
- **Day 12**: Calculator page logic
- **Day 13**: Name modal + user flow
- **Day 14**: Testing & refinements

### **Week 3: Polish & Deploy**
- **Day 15**: Result page + scoring
- **Day 16**: Audio integration
- **Day 17**: Mobile optimizations
- **Day 18**: Animations polish
- **Day 19**: Testing & bug fixes
- **Day 20**: Performance optimization
- **Day 21**: Deployment

---

## 🎯 **Key Learning Focus Areas**

### **React Concepts to Master:**
1. **useState & useEffect**: Question flow, progress tracking
2. **useContext**: Theme switching, global state
3. **Custom Hooks**: Calculator logic, localStorage
4. **React Router**: Navigation between calculators
5. **Conditional Rendering**: Modals, different calculator themes

### **Tailwind CSS Skills:**
1. **Responsive Design**: `sm:`, `md:`, `lg:` breakpoints
2. **Dark Mode**: `dark:` variants
3. **Custom Colors**: Calculator-specific color schemes
4. **Animations**: Custom keyframes, transition classes
5. **Component Classes**: Reusable button and card styles

### **Framer Motion Features:**
1. **Basic Animations**: `initial`, `animate`, `exit`
2. **Page Transitions**: Router-based animations
3. **Gesture Handling**: Hover, tap, drag animations
4. **Stagger Effects**: Sequential card animations
5. **Layout Animations**: Smooth layout changes

This guide will take you from zero to a fully functional, beautiful calculator app! Each step builds on the previous one, ensuring you understand the logic behind every feature. 🚀✨
