<template>
  <!-- The page ends at the door: a brass nameplate catching the lantern's
       light, with everything on it - name, how to reach me, where else to
       find me. No slab of colour behind it: the night (or, after a message,
       the morning) is the background. Plain HTML links throughout, so it all
       works with no WebGL and no JavaScript. -->
  <footer class="pt-40 pb-12 sm:pt-56">
    <div class="container-custom flex flex-col items-center gap-6">
      <!-- After a message is sent, the night ends. -->
      <p role="status" class="on-scene font-mono text-xs text-amber-200 empty:hidden"><template v-if="morning">It's morning now. Thank you for writing - I'll be in touch.</template></p>

      <div class="nameplate tilt3d">
        <span class="nameplate__screw" aria-hidden="true"></span>
        <span class="nameplate__screw" aria-hidden="true"></span>
        <span class="nameplate__screw" aria-hidden="true"></span>
        <span class="nameplate__screw" aria-hidden="true"></span>

        <a href="#home" class="nameplate__name">hackersgoddest</a>
        <p class="nameplate__line">Frank Konadu Oppong &middot; Full-stack developer</p>
        <p class="nameplate__line nameplate__line--small">Accra, Ghana &middot; {{ localTime || "--:--" }}</p>

        <hr class="nameplate__rule" />

        <div class="nameplate__contact">
          <a href="mailto:frankoppongkonadu930@gmail.com">frankoppongkonadu930@gmail.com</a>
          <a href="tel:+233256287192">+233 256 287 192</a>
        </div>

        <div class="nameplate__row">
          <ul class="flex gap-2" aria-label="Elsewhere">
            <li v-for="social in socialLinks" :key="social.name">
              <a :href="social.url" target="_blank" rel="noopener noreferrer" :aria-label="social.name" :title="social.name" class="nameplate__stud">
                <component :is="social.icon" class="h-4 w-4" />
              </a>
            </li>
          </ul>
          <div class="nameplate__controls">
            <a href="#home"><Sunrise :size="13" /> Back to dawn</a>
            <button type="button" :aria-pressed="still" @click="toggleStill">{{ still ? "Motion off" : "Still mode" }}</button>
          </div>
        </div>
      </div>

      <p class="on-scene flex max-w-md flex-wrap justify-center gap-x-3 gap-y-1 text-center font-mono text-[11px] text-fg-faint">
        <span>&copy; {{ currentYear }} Frank Konadu Oppong</span>
        <span aria-hidden="true">&middot;</span>
        <span>Scene textures: Poly Haven (CC0)</span>
        <span aria-hidden="true">&middot;</span>
        <span>Built with Astro &amp; Vue</span>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Component } from "vue";
import { Sunrise } from "@lucide/vue";
import LogoGithub from "~icons/ri/github-fill";
import LogoLinkedin from "~icons/ri/linkedin-box-fill";
import LogoInstagram from "~icons/ri/instagram-fill";
import LogoX from "~icons/ri/twitter-x-fill";
import { isStill, onMotionPreferenceChange, setStill } from "../lib/preferences";

interface SocialLink {
  name: string;
  url: string;
  icon: Component;
}

const currentYear = computed(() => new Date().getFullYear());

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Africa/Accra",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

// Empty until mounted: the page is rendered at build time, so any time
// computed then would be stale (and mismatch on hydration).
const localTime = ref("");
const morning = ref(false);
const still = ref(false);
let timeInterval: ReturnType<typeof setInterval> | undefined;
let unsubscribe: (() => void) | undefined;

const onMessageSent = () => (morning.value = true);
const toggleStill = () => setStill(!isStill());

onMounted(() => {
  localTime.value = timeFormatter.format(new Date());
  timeInterval = setInterval(() => {
    localTime.value = timeFormatter.format(new Date());
  }, 30_000);
  still.value = isStill();
  unsubscribe = onMotionPreferenceChange(() => (still.value = isStill()));
  addEventListener("portfolio:message-sent", onMessageSent);
});

onUnmounted(() => {
  clearInterval(timeInterval);
  unsubscribe?.();
  removeEventListener("portfolio:message-sent", onMessageSent);
});

const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/Hackersgoddest", icon: LogoGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/frank-oppong-9286b523b/", icon: LogoLinkedin },
  { name: "X", url: "https://x.com/_hackersgoddest", icon: LogoX },
  { name: "Instagram", url: "https://www.instagram.com/hackersgoddest/", icon: LogoInstagram },
];
</script>
