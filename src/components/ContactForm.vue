<template>
  <div class="glass-card p-8 rounded-2xl">
    <h3 class="text-h3 font-semibold text-white mb-6">
      Send me a message
    </h3>
    
    <form 
      name="contact" 
      method="POST" 
      data-netlify="true" 
      data-netlify-honeypot="bot-field"
      class="space-y-6" 
      @submit.prevent="submitForm"
    >
      <!-- Honeypot field for spam protection -->
      <input type="hidden" name="form-name" value="contact" />
      <div style="display: none;">
        <label>
          Don't fill this out if you're human: 
          <input name="bot-field" />
        </label>
      </div>

      <!-- Name Input -->
      <div>
        <label class="block text-caption text-gray-300 font-medium mb-2">
          Your Name *
        </label>
        <input
          v-model="form.name"
          name="name"
          type="text"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-primary-green-400 focus:outline-none focus:ring-2 focus:ring-primary-green-400/20 transition-all duration-200"
          placeholder="Enter your full name"
        />
      </div>

      <!-- Email Input -->
      <div>
        <label class="block text-caption text-gray-300 font-medium mb-2">
          Email Address *
        </label>
        <input
          v-model="form.email"
          name="email"
          type="email"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-primary-green-400 focus:outline-none focus:ring-2 focus:ring-primary-green-400/20 transition-all duration-200"
          placeholder="your.email@example.com"
        />
      </div>

      <!-- Subject Input -->
      <div>
        <label class="block text-caption text-gray-300 font-medium mb-2">
          Subject *
        </label>
        <input
          v-model="form.subject"
          name="subject"
          type="text"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-primary-green-400 focus:outline-none focus:ring-2 focus:ring-primary-green-400/20 transition-all duration-200"
          placeholder="What's this about?"
        />
      </div>

      <!-- Message Input -->
      <div>
        <label class="block text-caption text-gray-300 font-medium mb-2">
          Message *
        </label>
        <textarea
          v-model="form.message"
          name="message"
          required
          rows="5"
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-primary-green-400 focus:outline-none focus:ring-2 focus:ring-primary-green-400/20 transition-all duration-200 resize-none"
          placeholder="Tell me about your project or inquiry..."
        ></textarea>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccess" class="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
            <n-icon :component="CheckmarkOutline" size="16" class="text-white" />
          </div>
          <div>
            <h4 class="text-emerald-400 font-medium">Message sent successfully!</h4>
            <p class="text-emerald-300 text-sm">Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="showError" class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <n-icon :component="CloseOutline" size="16" class="text-white" />
          </div>
          <div>
            <h4 class="text-red-400 font-medium">Something went wrong</h4>
            <p class="text-red-300 text-sm">Please try again or contact me directly.</p>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium rounded-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
          <n-icon :component="RefreshOutline" size="20" class="animate-spin" />
          Sending...
        </span>
        <span v-else class="flex items-center gap-2">
          <n-icon :component="PaperPlaneOutline" size="20" />
          Send Message
        </span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { NIcon } from 'naive-ui'
import { 
  CheckmarkOutline, 
  CloseOutline, 
  RefreshOutline, 
  PaperPlaneOutline 
} from '@vicons/ionicons5'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const submitForm = async () => {
  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...form
      })
    })

    if (response.ok) {
      showSuccess.value = true
      // Reset form
      Object.keys(form).forEach(key => {
        form[key] = ''
      })
    } else {
      throw new Error('Form submission failed')
    }
  } catch (error) {
    console.error('Error:', error)
    showError.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>