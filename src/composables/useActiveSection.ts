import { onMounted, onUnmounted, ref } from "vue";

/**
 * Tracks scroll-derived UI state shared by the nav, command palette and
 * progress indicator: which section is in view, whether the page has
 * scrolled past the top, and how far through the page the user is.
 */
export function useActiveSection(sectionKeys: string[]) {
  const activeKey = ref(sectionKeys[0]);
  const isScrolled = ref(false);
  const scrollProgress = ref(0);

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;

    const scrollPosition = window.scrollY + 150;
    const allSections = document.querySelectorAll<HTMLElement>("section");

    let currentSection = sectionKeys[0];
    allSections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom && sectionKeys[index]) {
        currentSection = sectionKeys[index];
      }
    });

    if (activeKey.value !== currentSection) {
      activeKey.value = currentSection;
    }
  };

  onMounted(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("touchmove", handleScroll);
  });

  return { activeKey, isScrolled, scrollProgress };
}
