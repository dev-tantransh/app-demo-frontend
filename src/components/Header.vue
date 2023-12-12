<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">{{ props.pageTitle }}</span>
    </div>
  </nav>
</template>

<script setup>
  const props = defineProps(['pageTitle'])
</script>