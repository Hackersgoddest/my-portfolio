<template>
  <div>
    <h3 class="mb-6 font-mono text-sm uppercase tracking-widest text-fg-faint">Send a message</h3>

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

      <div v-for="field in textFields" :key="field.name">
        <label :for="field.name" class="mb-2 flex items-center gap-2 font-mono text-xs text-fg-faint">
          <span class="text-primary-green">&gt;</span> {{ field.label }}
        </label>
        <input
          :id="field.name"
          v-model="form[field.name]"
          :name="field.name"
          :type="field.type"
          required
          class="w-full border-b border-border/25 bg-transparent py-2 font-mono text-sm text-fg placeholder-fg-faint transition-colors duration-200 focus:border-primary-green focus:outline-none sm:text-base"
          :placeholder="field.placeholder"
        />
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="mb-2 flex items-center gap-2 font-mono text-xs text-fg-faint">
          <span class="text-primary-green">&gt;</span> message
        </label>
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          required
          rows="4"
          class="w-full resize-none border-b border-border/25 bg-transparent py-2 font-mono text-sm text-fg placeholder-fg-faint transition-colors duration-200 focus:border-primary-green focus:outline-none sm:text-base"
          placeholder="Tell me about your project or inquiry..."
        ></textarea>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccess" class="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
        <div class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
          <Check :size="16" class="text-white" />
        </div>
        <div>
          <h4 class="font-medium text-emerald-700 dark:text-emerald-400">Message sent successfully!</h4>
          <p class="text-sm text-emerald-600 dark:text-emerald-300">Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="showError" class="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
        <div class="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
          <X :size="16" class="text-white" />
        </div>
        <div>
          <h4 class="font-medium text-red-700 dark:text-red-400">Something went wrong</h4>
          <p class="text-sm text-red-600 dark:text-red-300">Please try again or contact me directly.</p>
        </div>
      </div>

      <!-- Submit Button -->
      <AppButton type="submit" variant="primary" block :disabled="isSubmitting">
        <template #icon>
          <Loader2 v-if="isSubmitting" :size="18" class="animate-spin" />
          <Send v-else :size="18" />
        </template>
        {{ isSubmitting ? "Sending..." : "Send Message" }}
      </AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Check, X, Loader2, Send } from '@lucide/vue'
import AppButton from './AppButton.vue'

interface ContactFormState {
  name: string
  email: string
  subject: string
  message: string
}

interface TextField {
  name: 'name' | 'email' | 'subject'
  label: string
  type: string
  placeholder: string
}

const textFields: TextField[] = [
  { name: 'name', label: 'name', type: 'text', placeholder: 'Jane Doe' },
  { name: 'email', label: 'email', type: 'email', placeholder: 'jane@example.com' },
  { name: 'subject', label: 'subject', type: 'text', placeholder: "What's this about?" },
]

const form = reactive<ContactFormState>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const encode = (data: Record<string, string>) => {
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
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
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
