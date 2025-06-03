<template>
    <n-grid
      cols="5 s:6 m:8 l:10 xl:12 2xl:14"
      responsive="screen"
      :x-gap="32"
      :y-gap="32"
      :item-responsive="true"
      class="mt-4"
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
</template>
<script setup>
import {
  NIcon,
  NGrid,
  NGridItem,
  NTooltip,
  NButton,
  NTag,
} from "naive-ui";

defineProps(["skillName"]);
</script>
