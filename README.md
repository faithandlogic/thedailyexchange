# Project Name: The Daily Exchange

## High-Level Description of Features
The aim of the web app will be a responsive web-based digital tool that provides users with
stock market insights for the day in an engaging and informative format with some
personalization. Using a stock market API, the app will retrieve live data on daily stock
movements that identify the most significant trends, and generate easy-to-read, tailored articles
that offer insights into the day’s market activity using generative AI. By integrating real-time data
with generative AI, this digital assistant will deliver a unique experience that helps users
understand stock trends, company performance, and broader economic impacts in a narrative
format.

---

### Key features will include:
- Live Data Retrieval: Connect to Alpha Vantage’s stock market data API to display key
data on stock performance, including top gainers and losers, trading volumes, and sector
movements. And save these data to send to the AI API.
- AI-Generated Market Articles: Generate daily articles that highlight notable market
events, offering explanations behind significant changes, potential causes, and
implications for investors by sending the Live data retrieval from the first feature to the
OpenAI GPT Chat Completions Endpoint to write an article that can be understood by
novice investors or enthusiasts. This article will be displayed below the stock data.
- User Interactivity: Allow users to add articles to a "Saved List,
" where users can go
back to their favorite articles and notable days to keep track of the past. (Maybe add a
notepad feature with open-source react components like MilkDown)
- Data Persistence: Use local storage to retain user data, such as their saved articles,
even after browser refreshes.
- Responsive Design: Ensure the app works seamlessly across desktop and mobile
devices, adapting to different screen sizes for optimal user access.
Target User Group & Context
This project is designed primarily for novice to intermediate investors and finance enthusiasts
who seek a digestible overview of daily market changes without expertise on market trends. The
context for using this assistant would likely be part of a user’s daily routine—checking stock
updates in the morning or evening to stay informed about the latest market developments.
Student(s) Working on the Project

## How to start

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Authors
- Fatih Sen, Bowen Yang
