<template>
  <div class="container">
    <div class="chat" ref="chatRef">
      <div
        v-for="(msg, idx) in history"
        :key="idx"
        class="bubble"
      >
        {{ msg }}
      </div>
      <!-- 当前文本用不同样式表示 -->
      <div class="bubble current">{{ tempText }}</div>
    </div>
    <input
      type="text"
      v-model="inputValue"
      @input="onInput"
      @keydown.enter.prevent="onEnter"
      autocomplete="off"
      spellcheck="false"
      placeholder="Type here..."
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'

const replacementText = `I tend the mobile now
like an injured bird

We text, text, text
our significant words.

I re-read your first,
your second, your third,

look for your small xx,
feeling absurd.

The codes we send
arrive with a broken chord.

I try to picture your hands,
their image is blurred.

Nothing my thumbs press
will ever be heard.`

// 聊天历史，以消息字符串形式存储
const history = ref<string[]>([])

// 当前未发送的临时文本
const tempText = ref('')
const inputValue = ref('')
const chatRef = ref<HTMLDivElement | null>(null)

// 当前游标，表示替代文本读取位置（全局）
let currentPos = 0

function onInput() {
  if (currentPos < replacementText.length) {
    tempText.value += replacementText[currentPos]
    currentPos++
  }
  inputValue.value = ''
  scrollToBottom()
}

function onEnter() {
  if (tempText.value.trim() !== '') {
    history.value.push(tempText.value)
    tempText.value = ''
  }
  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (chatRef.value) {
      chatRef.value.scrollTop = chatRef.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.container {
  max-width: 360px;
  margin: 2rem auto;
  font-family: 'Courier New', monospace;
  background: #16213e;
  color: #eee;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 15px #0f3460AA;
}
.chat {
  height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  border: 1px solid #0f3460;
  padding: 12px;
  margin-bottom: 1rem;
  background: #0f3460;
  border-radius: 10px;
  user-select: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bubble {
  max-width: 75%;
  padding: 10px 15px;
  background: #0f3460;
  border-radius: 18px;
  line-height: 1.4em;
  box-shadow: inset 0 0 5px #0a254f;
  word-break: break-word;
  /* 统一左侧气泡样式 */
  align-self: flex-start;
}
.bubble.current {
  background: #3066be;
  font-style: italic;
  opacity: 0.85;
  align-self: flex-start;
}
input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background: #0f3460;
  border: none;
  border-radius: 6px;
  color: #eee;
  outline: none;
}
input[type="text"]::placeholder {
  color: #555;
}
</style>