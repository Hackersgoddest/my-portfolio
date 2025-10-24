import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  const isLoaded = ref(false)
  let lenis = null

  const initSmoothScrolling = () => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)
  }

  const createRevealAnimation = (element, options = {}) => {
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
        '.hero-tag',
        '.hero-name', 
        '.hero-description',
        '.hero-location',
        '.hero-buttons',
        '.hero-experience'
      ]
      
      const elementsExist = heroElements.every(selector => 
        document.querySelector(selector) !== null
      )
      
      if (!elementsExist) {
        setTimeout(waitForElements, 100)
        return
      }
      
      const tl = gsap.timeline({ delay: 0.5 })
      
      // Clean hero entrance without excessive bounce
      tl.fromTo('.hero-tag', 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
      .fromTo('.hero-name', 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3"
      )
      .fromTo('.hero-description', 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4"
      )
      .fromTo('.hero-location', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3"
      )
      .fromTo('.hero-buttons', 
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.2"
      )
      .fromTo('.hero-experience', 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2"
      )
    }
    
    waitForElements()
  }

  const initSectionAnimations = () => {
    // Enhanced header animations
    gsap.utils.toArray('.section-header').forEach(header => {
      createRevealAnimation(header, {
        y: 60,
        duration: 1,
        ease: "power3.out"
      })
    })

    // Service cards with magnetic effect
    gsap.utils.toArray('.service-card').forEach((card, index) => {
      createRevealAnimation(card, {
        y: 100,
        scale: 0.8,
        duration: 1.2,
        delay: index * 0.15,
        ease: "power3.out"
      })

      // Magnetic hover effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          rotationY: 5,
          duration: 0.4,
          ease: "power2.out"
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out"
        })
      })
    })

    // Portfolio cards with 3D effect
    gsap.utils.toArray('.portfolio-card').forEach((card, index) => {
      createRevealAnimation(card, {
        y: 120,
        rotationX: 15,
        scale: 0.8,
        duration: 1.4,
        delay: index * 0.2,
        ease: "power3.out"
      })

      // 3D hover effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -15,
          scale: 1.03,
          rotationX: 0,
          rotationY: 2,
          duration: 0.5,
          ease: "power2.out"
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out"
        })
      })
    })

    // Skills with subtle stagger animation - NO BOUNCING
    gsap.utils.toArray('.skill-item').forEach((skill, index) => {
      createRevealAnimation(skill, {
        y: 30,
        scale: 0.95,
        duration: 0.6,
        delay: index * 0.02,
        ease: "power2.out"
      })
    })

    // Skills simple version with even subtler animation
    gsap.utils.toArray('.skill-item-simple').forEach((skill, index) => {
      createRevealAnimation(skill, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.03,
        ease: "power2.out"
      })
    })

    // Contact items with subtle entrance
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
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

    // Navbar hide/show on scroll - DISABLED to keep navbar always visible
    // let lastScrollY = 0
    // lenis?.on('scroll', ({ scroll }) => {
    //   if (scroll > lastScrollY && scroll > 100) {
    //     gsap.to(navbar, { y: -100, duration: 0.3, ease: "power2.out" })
    //   } else {
    //     gsap.to(navbar, { y: 0, duration: 0.3, ease: "power2.out" })
    //   }
    //   lastScrollY = scroll
    // })
  }

  const initTextAnimations = () => {
    // Split text reveal
    gsap.utils.toArray('.split-text').forEach(text => {
      const chars = text.textContent.split('')
      text.innerHTML = chars.map(char => 
        char === ' ' ? ' ' : `<span class="char" style="display: inline-block;">${char}</span>`
      ).join('')

      gsap.fromTo(text.querySelectorAll('.char'), 
        { opacity: 0, y: 100, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "back.out(1.2)",
          stagger: 0.03,
          scrollTrigger: {
            trigger: text,
            start: "top 80%"
          }
        }
      )
    })
  }

  const initParallaxEffects = () => {
    // Background parallax
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
      gsap.to(bg, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: bg,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    })

    // Element parallax
    gsap.utils.toArray('.parallax-element').forEach(element => {
      gsap.to(element, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })
    })
  }

  onMounted(() => {
    setTimeout(() => {
      initSmoothScrolling()
      initHeroAnimations()
      initSectionAnimations()
      initNavbarAnimation()
      initTextAnimations()
      initParallaxEffects()
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