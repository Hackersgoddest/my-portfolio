<template>
    <n-flex justify="center" size="large" align="baseline">
        <div class="lg:hidden flex gap-4 flex-wrap justify-center items-center">
            <div v-for="item in skillName" :key="item.name" class="flex flex-col justify-center items-center">
                <n-tag round :bordered="false" strong>
                    {{ item.name }}
                    <template #icon>
                        <n-icon v-html="item.svg"></n-icon>
                    </template>
                </n-tag>
            </div>
        </div>
        <div class="hidden lg:flex gap-8 flex-wrap justify-center items-center">
            <div v-for="item in skillName" :key="item.name" class="flex">
                <n-tooltip trigger="hover" :raw="true" :show-arrow="false">
                    <template #trigger>
                        <n-button quaternary circle>
                            <template #icon>
                                <n-icon size="40" v-html="item.svg"></n-icon>
                            </template>
                        </n-button>
                    </template>
                    <n-tag :bordered="false" strong>
                        {{ item.name }}
                        <template #icon>
                            <n-icon v-html="item.svg"></n-icon>
                        </template>
                    </n-tag>
                </n-tooltip>
            </div>
        </div>
    </n-flex>
</template>
<script setup>
import { NIcon, NFlex, NText, NTooltip, NButton, NTag } from "naive-ui";

defineProps(["skillName"]);
</script>