import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'

// 1. 最早调用 dotenv 载入环境变量
dotenv.config()

const openai = new OpenAI({
  apiKey: "process.env.OPENAI_API_KEY",
})

const app = express()
app.use(cors())
app.use(express.json())

// 2. 路由里调用openai
app.post('/api/chat', async (req, res) => {
  const userMsg = req.body.message
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: userMsg }
      ]
    })
    const reply = completion.choices[0].message.content
    res.json({ reply })
  } catch (error) {
    console.error('OpenAI调用出错:', error)
    res.status(500).json({ error: 'AI服务出错' })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})