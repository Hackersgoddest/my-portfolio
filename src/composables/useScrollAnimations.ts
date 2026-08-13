import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  delay?: number
  duration?: number
  y?: number
  opacity?: number
  scale?: number
  rotation?: number
  ease?: string
  stagger?: number
}

// GSAP's tween-target API is intentionally dynamic (selector string, element,
// array of elements, or a live NodeList from gsap.utils.toArray) - typed loosely
// here rather than fighting GSAP's own type surface for animation glue code.
type AnimationTarget = any

export function useScrollAnimations() {
  const isLoaded = ref(false)
  let lenis: Lenis | null = null

  const initSmoothScrolling = () => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as ConstructorParameters<typeof Lenis>[0])

    function raf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)
  }

  const createRevealAnimation = (element: AnimationTarget, options: RevealOptions = {}) => {
    const {
      delay = 0,
      duration = 1.2,
      y = 80,
      opacity = 0,
      scale = 0.95,
      rotation = 0,
      ease = "power2.out",
      stagger = 0,
    } = options

    return gsap.fromTo(element,
      {
        opacity,
        y,
        scale,
        rotation,
        transformOrigin: "center center"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration,
        delay,
        ease,
        stagger,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }

  const initHeroAnimations = () => {
    // Wait for elements to be rendered
    const waitForElements = () => {
      const heroElements = [
        '.hero-kicker',
        '.hero-name',
        '.hero-tagline',
        '.hero-description',
        '.hero-buttons'
      ]

      const elementsExist = heroElements.every(selector =>
        document.querySelector(selector) !== null
      )

      if (!elementsExist) {
        setTimeout(waitForElements, 100)
        return
      }

      const tl = gsap.timeline({ delay: 0.3 })

      // Clean hero entrance without excessive bounce
      tl.fromTo('.hero-kicker',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
      .fromTo('.hero-name',
        { x: -30 },
        { x: 0, duration: 0.6, ease: "power2.out" }, "-=0.2"
      )
      .fromTo('.hero-tagline',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3"
      )
      .fromTo('.hero-description',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3"
      )
      .fromTo('.hero-buttons',
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.2"
      )
    }

    waitForElements()
  }

  const initSectionAnimations = () => {
    // Enhanced header animations
    gsap.utils.toArray('.section-header').forEach((header: AnimationTarget) => {
      createRevealAnimation(header, {
        y: 60,
        duration: 1,
        ease: "power3.out"
      })
    })

    // Service rows - simple reveal, hover handled in CSS
    gsap.utils.toArray('.service-row').forEach((row: AnimationTarget, index: number) => {
      createRevealAnimation(row, {
        y: 40,
        duration: 0.8,
        delay: index * 0.08,
        ease: "power2.out"
      })
    })

    // Project rows - simple reveal, hover handled in CSS
    gsap.utils.toArray('.project-row').forEach((row: AnimationTarget, index: number) => {
      createRevealAnimation(row, {
        y: 60,
        duration: 0.9,
        delay: index * 0.1,
        ease: "power2.out"
      })
    })

    // Skills with subtle stagger animation - NO BOUNCING
    gsap.utils.toArray('.skill-item').forEach((skill: AnimationTarget, index: number) => {
      createRevealAnimation(skill, {
        y: 30,
        scale: 0.95,
        duration: 0.6,
        delay: index * 0.02,
        ease: "power2.out"
      })
    })

    // Contact items with subtle entrance
    gsap.utils.toArray('.contact-item').forEach((item: AnimationTarget, index: number) => {
      createRevealAnimation(item, {
        y: 40,
        scale: 0.95,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out"
      })
    })
  }

  const initNavbarAnimation = () => {
    const navbar = document.querySelector('.navbar')
    if (!navbar) return

    gsap.fromTo(navbar,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
    )
  }

  onMounted(() => {
    setTimeout(() => {
      initSmoothScrolling()
      initHeroAnimations()
      initSectionAnimations()
      initNavbarAnimation()
      isLoaded.value = true
    }, 100)
  })

  onUnmounted(() => {
    lenis?.destroy()
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })

  return {
    isLoaded
  }
}
