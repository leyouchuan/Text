<template>
  <div class="container">
    <div class="chat" ref="chatRef">{{ displayedText }}</div>
    <input
      type="text"
      v-model="inputValue"
      @keydown.enter="onEnter"
      autocomplete="off"
      spellcheck="false"
      placeholder="Start typing..."
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';

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

const inputValue = ref('');
const displayedText = ref('');
const chatRef = ref<HTMLDivElement | null>(null);

async function generateAIResponse(userMessage: string): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  })
  const data = await res.json()
  return data.reply
}

// 用户按回车后触发
async function onEnter() {
  if (!inputValue.value.trim()) return;

  // 先用诗句替代输入显示一定长度文本，同时你也可以想要调用后端替代这里
  const len = inputValue.value.length;
  displayedText.value += '\n' + replacementText.slice(0, len); 
  console.log('用户输入:', inputValue.value);
  // 调用后端API获取回复
  const aiReply = await generateAIResponse(inputValue.value);

  // 将AI回复追加到显示内容
  displayedText.value += '\nAI: ' + aiReply + '\n';

  inputValue.value = ''; // 清空输入框

  await nextTick();
  if (chatRef.value) {
    chatRef.value.scrollTop = chatRef.value.scrollHeight;
  }
  console.log('AI回复:', aiReply);
}
</script>

<style scoped>
.container {
  max-width: 320px;
  margin: 2rem auto;
  font-family: 'Courier New', monospace;
  background: #16213e;
  color: #eee;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 15px #0f3460AA;
}
.chat {
  height: 250px;
  overflow-y: auto;
  white-space: pre-wrap;
  border: 1px solid #0f3460;
  padding: 10px;
  margin-bottom: 1rem;
  background: #0f3460;
  border-radius: 6px;
  user-select: none;
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
</style>a