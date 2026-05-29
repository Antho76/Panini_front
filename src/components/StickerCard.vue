<template>
  <article class="card">
    <div class="card-top">
      <span class="badge">{{ sticker.code }}</span>
      <span v-if="sticker.specialSticker" class="badge badge-special">Spécial</span>
    </div>
    <h3>{{ sticker.name }}</h3>
    <p>{{ sticker.countryCode }} · {{ sticker.categoryCode }} · {{ sticker.type }}</p>
    <div class="actions">
      <button @click="$emit('set-qty', 0)">Manquant</button>
      <button @click="$emit('set-qty', 1)">Je l'ai</button>
      <button @click="$emit('set-qty', 2)">Doublon</button>
    </div>
  </article>
</template>
<script setup>
defineProps({ sticker: { type: Object, required: true } })
</script>
