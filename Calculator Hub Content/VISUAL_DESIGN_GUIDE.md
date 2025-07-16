# 🎨 Calculator App - Visual Design & Color Guide

## 🏠 Home Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    🧮 CALCULATOR HUB                         │
│                   Discover Your Personality                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Welcome Message Box (Dark theme)                           │
│  "Hey! Ready to dive into some fun personality tests?"      │
│  "Choose your adventure below 👇"                          │
└─────────────────────────────────────────────────────────────┘

┌────────────────┬────────────────┬────────────────┬───────────────┐
│  💕 LOVE       │  👫 FRIENDSHIP │  💼 CAREER     │  🧠 PERSONALITY│
│  Calculator    │  Calculator    │  Calculator    │  Calculator    │
│                │                │                │                │
│  Find your     │  Test your     │  Discover      │  Uncover your  │
│  compatibility │  friendship    │  your work     │  true self     │
│                │  level         │  personality   │                │
│                │                │                │                │
│  [Start Test]  │  [Start Test]  │  [Start Test]  │  [Start Test]  │
└────────────────┴────────────────┴────────────────┴───────────────┘

Mobile View (Stacked):
┌─────────────────┐
│  💕 LOVE       │
│  Calculator    │
│  [Start Test]  │
├─────────────────┤
│  👫 FRIENDSHIP │
│  Calculator    │
│  [Start Test]  │
├─────────────────┤
│  💼 CAREER     │
│  Calculator    │
│  [Start Test]  │
├─────────────────┤
│  🧠 PERSONALITY│
│  Calculator    │
│  [Start Test]  │
└─────────────────┘
```

## 🎨 Color Theme System

### Dark Theme Base Colors:
```css
Background: #0f0f0f (Pure black)
Surface: #1a1a1a (Card backgrounds)
Border: #333333 (Subtle borders)
Text Primary: #ffffff (Main text)
Text Secondary: #a3a3a3 (Descriptions)
```

### Calculator-Specific Colors:

#### 💕 Love Calculator:
```css
Primary: #ff1493 (Deep pink)
Secondary: #ff69b4 (Hot pink)
Gradient: from-pink-600 to-rose-500
Hover: #ff6b9d (Lighter pink)
```

#### 👫 Friendship Calculator:
```css
Primary: #20b2aa (Light sea green)
Secondary: #40e0d0 (Turquoise)
Gradient: from-teal-600 to-cyan-500
Hover: #4ecdc4 (Light teal)
```

#### 💼 Career Calculator:
```css
Primary: #6a5acd (Slate blue)
Secondary: #9370db (Medium purple)
Gradient: from-purple-600 to-violet-500
Hover: #7b68ee (Medium slate blue)
```

#### 🧠 Personality Calculator:
```css
Primary: #ffa500 (Orange)
Secondary: #ff8c00 (Dark orange)
Gradient: from-orange-500 to-amber-500
Hover: #ffb347 (Light orange)
```

## 📱 Question Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [← Back] 💕 Love Calculator    🔊 Audio  🌙 Theme  [2/6]   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Progress Bar: ████████████░░░░░░ 66%                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     Question 2 of 6                         │
│                                                             │
│  Hey [Name]! When it comes to family introduction...        │
│  Jab ghar walon se introduce karna ho, you...              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ A) Wait for 2 years minimum, dar lagta hai 😅     │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ B) Introduce as 'just a friend' forever 🤐       │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ C) Proudly introduce when ready                    │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ D) Let them figure out themselves, main kya karu 🤷│    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│                    [Previous] [Next]                        │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Result Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│                  🎉 Your Results Are In! 🎉                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        💕 85%                               │
│                 "Relationship Goals 😍"                     │
│                                                             │
│  Hey [Name], you're definitely relationship material!       │
│  You handle family introductions like a pro and your       │
│  communication style shows maturity.                       │
│                                                             │
│  Strengths:                                                 │
│  ✅ Great communication                                     │
│  ✅ Family-oriented approach                               │
│  ✅ Balanced social media presence                         │
│                                                             │
│  Areas to work on:                                         │
│  💭 Maybe be more spontaneous sometimes                    │
│                                                             │
│  [Share Result] [Try Another Calculator] [Take Again]      │
└─────────────────────────────────────────────────────────────┘
```

## 📱 Responsive Breakpoints

### Mobile (320px - 768px):
- Single column layout
- Cards stack vertically
- Larger touch targets (min 44px)
- Simplified navigation

### Tablet (768px - 1024px):
- Two-column grid for calculators
- Larger question cards
- Side-by-side options

### Desktop (1024px+):
- Four-column grid for home page
- Maximum width container (1200px)
- Hover effects enabled

## 🎵 Audio Visual Indicators

### Audio Controls:
```
┌──────────────────────────────────────┐
│ 🔊 [Volume Slider] 🎵 Background On │
│ 🔇 Mute  🎶 Effects On              │
└──────────────────────────────────────┘
```

### Audio States:
- 🔊 Volume on
- 🔇 Muted
- 🎵 Background music playing
- 🎶 Sound effects enabled
- ⏸️ Paused
- ▶️ Playing

## 🌙 Theme Toggle

### Light/Dark Toggle:
```
☀️ Light  |  🌙 Dark
    ○           ●     (Dark active)
```

### Theme Switching:
- Smooth transition (0.3s ease)
- Affects all components
- Saves preference in localStorage

## 🔄 State Flow for User Experience

### Name Collection Flow:
```
Home Page → Click Calculator → 
Modal: "What's your name?" → 
Store name in state → 
Use name throughout questions
```

### Gender Selection (Love Calculator):
```
Love Calculator Start → 
"Are you looking for?" → 
Options: Male/Female/Anyone → 
Adjust pronouns in questions
```

### Progress Tracking:
```
Question 1 → Save answer → Update progress → 
Question 2 → Save answer → Update progress → 
... → Calculate result → Show result
```
