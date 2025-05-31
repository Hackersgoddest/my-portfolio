<template>
  <div class="lg:hidden">
    <n-flex justify="center" size="large" align="baseline">
      <n-tag
        v-for="item in skillName"
        :key="item.name"
        :bordered="false"
        strong
      >
        {{ item.name }}
        <template #icon>
          <n-icon v-html="item.svg"></n-icon>
        </template>
      </n-tag>
    </n-flex>
  </div>
  <div class="hidden lg:grid">
    <n-grid
      cols="8 l:10 xl:12 2xl:14"
      responsive="screen"
      :x-gap="32"
      :y-gap="32"
      :item-responsive="true"
    >
      <n-grid-item v-for="item in skillName" :key="item.name">
        <n-tooltip trigger="hover" :raw="true" :show-arrow="false">
          <template #trigger>
            <n-button quaternary circle>
              <template #icon>
                <n-icon size="40" v-html="item.svg" />
              </template>
            </n-button>
          </template>
          <n-tag :bordered="false" strong>
            {{ item.name }}
            <template #icon>
              <n-icon v-html="item.svg" />
            </template>
          </n-tag>
        </n-tooltip>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script setup>
import {
  NIcon,
  NGrid,
  NGridItem,
  NTooltip,
  NButton,
  NTag,
  NFlex,
} from "naive-ui";

defineProps(["skillName"]);
</script>
