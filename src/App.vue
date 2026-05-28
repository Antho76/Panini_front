<template>
  <div class="app-shell">
    <header class="hero">
      <div>
        <p class="eyebrow">Panini World Cup 2026</p>
        <h1>Gère ta collection de stickers</h1>
        <p class="lead">
          Recherche un sticker, marque-le comme possédé ou en doublon, et suis ta progression.
        </p>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <span>Possédés</span>
          <strong>{{ stats.owned ?? 0 }}</strong>
        </div>
        <div class="stat-card">
          <span>Doublons</span>
          <strong>{{ stats.duplicates ?? 0 }}</strong>
        </div>
        <div class="stat-card">
          <span>Suivis</span>
          <strong>{{ stats.tracked ?? 0 }}</strong>
        </div>
      </div>
    </header>

    <section class="toolbar">
      <input v-model="ownerName" placeholder="Ton prénom" @change="loadStats" />
      <input v-model="search" placeholder="Recherche par nom ou code" />
      <select v-model="team">
        <option value="">Toutes les équipes</option>
        <option value="FRA">France</option>
      </select>
      <button @click="loadStickers">Rechercher</button>
    </section>

    <section class="content">
      <StickerCard
        v-for="sticker in stickers"
        :key="sticker.code"
        :sticker="sticker"
        @set-qty="qty => saveSticker(sticker.code, qty)"
      />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import StickerCard from './components/StickerCard.vue'
import { fetchStats, fetchStickers, updateCollection } from './services/api'

const ownerName = ref('Anthonin')
const search = ref('')
const team = ref('FRA')
const stickers = ref([])
const stats = ref({})

async function loadStickers() {
  stickers.value = await fetchStickers(search.value, team.value)
}

async function loadStats() {
  stats.value = await fetchStats(ownerName.value)
}

async function saveSticker(code, quantityOwned) {
  await updateCollection({ ownerName: ownerName.value, stickerCode: code, quantityOwned })
  await loadStats()
}

onMounted(async () => {
  await loadStickers()
  await loadStats()
})
</script>
