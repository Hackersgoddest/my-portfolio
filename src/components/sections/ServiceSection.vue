<template>
  <section class="py-section">
    <!-- Over the father's corner: the work, on hand-painted wooden signboards
         like the ones on every roadside workshop in Ghana - nailed up and
         hanging a little askew, paint over real wood grain. -->
    <div class="container-custom">
      <div class="on-scene max-w-2xl">
        <SectionHeader
          index="02"
          eyebrow="What I Do"
          title="Services"
          description="Comprehensive solutions from web applications to mobile apps and desktop software"
          :center="false"
        />
      </div>

      <!-- Side by side on wide screens, like signs nailed along a wall. -->
      <ol class="signboards lg:grid-cols-3 lg:items-start lg:gap-8">
        <li v-for="(service, i) in services" :key="service.title" class="service-row signboard" :class="`signboard--${i}`">
          <div class="signboard__board">
            <span class="signboard__nail signboard__nail--left" aria-hidden="true"></span>
            <span class="signboard__nail signboard__nail--right" aria-hidden="true"></span>
            <p class="signboard__number" aria-hidden="true">No. {{ i + 1 }}</p>
            <h3 class="signboard__title">
              <component :is="service.icon" :size="22" aria-hidden="true" />
              {{ service.title }}
            </h3>
            <p class="signboard__text">{{ service.description }}</p>
            <p class="signboard__tools">{{ service.tools.join("  ·  ") }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from "../SectionHeader.vue";
import services from "../../data/services";
</script>
