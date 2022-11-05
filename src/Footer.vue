<template>
  <n-grid cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
    <n-gi class="is-end menu" :span="20">
      <div class="footer">
        <span class="name">Oppong Frank Konadu</span>
        <span class="copyright"><span class="at">&copy;</span>2022. All Rights Reserved</span>
      </div>
    </n-gi>
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
  </n-grid>

</template>

<script setup>
import { NGi, NGrid } from 'naive-ui';
</script>

<style scoped>
.n-grid {
  background-color: rgba(125, 125, 125, 0.4);
}

.footer {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 60px;
}

.name {
  font-size: 18px;
  margin-right: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.copyright {
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.at {
  font-size: 21px;
}

@media only screen and (max-width: 420px) {
  .name {
    font-size: 15px;
    margin-right: 5px;
  }

  .copyright {
    font-size: 13px;
    margin: 0;
  }

  .at {
    font-size: 18px;
  }
}

@media only screen and (max-width: 340px) {
  .name {
    font-size: 14px;
    margin-right: 5px;
  }

  .copyright {
    font-size: 12px;
    margin: 0;
  }

  .at {
    font-size: 18px;
  }
}
</style>