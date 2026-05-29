<template>
  <div class="app-shell" v-if="!user">
    <section class="auth-card">
      <div>
        <p class="eyebrow">Panini World Cup 2026</p>
        <h1>Connexion</h1>
        <p class="lead">Crée un compte ou connecte-toi pour retrouver ta collection sur plusieurs appareils.</p>
      </div>
      <form class="auth-form" @submit.prevent="submitAuth">
        <input v-model="auth.username" placeholder="Nom d'utilisateur" />
        <input v-model="auth.displayName" placeholder="Nom affiché" v-if="mode === 'register'" />
        <input v-model="auth.password" type="password" placeholder="Mot de passe" />
        <div class="auth-actions">
          <button type="submit">{{ mode === 'login' ? 'Se connecter' : 'Créer le compte' }}</button>
          <button type="button" class="secondary" @click="toggleMode">{{ mode === 'login' ? 'Créer un compte' : 'J’ai déjà un compte' }}</button>
        </div>
      </form>
      <p class="error" v-if="error">{{ error }}</p>
    </section>
  </div>
  <div class="app-shell" v-else>
    <header class="hero">
      <div>
        <p class="eyebrow">Panini World Cup 2026</p>
        <h1>Bonjour {{ user.displayName }}</h1>
        <p class="lead">Ton dashboard personnel pour suivre la collection, les doublons et les manquants.</p>
      </div>
      <div class="stats-grid">
        <div class="stat-card"><span>% complété</span><strong>{{ dashboard.completionRate ?? 0 }}%</strong></div>
        <div class="stat-card"><span>Cartes obtenues</span><strong>{{ dashboard.ownedStickers ?? 0 }}</strong></div>
        <div class="stat-card"><span>Doublons</span><strong>{{ dashboard.duplicateStickers ?? 0 }}</strong></div>
        <div class="stat-card"><span>Manquants</span><strong>{{ dashboard.missingStickers ?? 0 }}</strong></div>
      </div>
    </header>
    <nav class="tabs">
      <button :class="{active: view === 'dashboard'}" @click="view='dashboard'">Dashboard</button>
      <button :class="{active: view === 'collection'}" @click="view='collection'">Collection par catégorie</button>
      <button :class="{active: view === 'countries'}" @click="view='countries'">Par pays</button>
      <button class="secondary" @click="logout">Déconnexion</button>
    </nav>
    <section v-if="view === 'dashboard'" class="panel-grid">
      <article class="panel">
        <h2>Résumé</h2>
        <ul class="summary-list">
          <li>Utilisateur : {{ dashboard.displayName || user.displayName }}</li>
          <li>Total stickers : {{ dashboard.totalStickers ?? 0 }}</li>
          <li>Cartes possédées : {{ dashboard.ownedStickers ?? 0 }}</li>
          <li>Cartes manquantes : {{ dashboard.missingStickers ?? 0 }}</li>
        </ul>
      </article>
    </section>
    <section v-if="view === 'collection'" class="toolbar">
      <input v-model="search" placeholder="Recherche" />
      <select v-model="category"><option value="">Toutes catégories</option><option value="FWC">FWC</option><option value="COUNTRY">Pays</option><option value="COCA">Coca-Cola</option></select>
      <button @click="loadStickers">Filtrer</button>
    </section>
    <section v-if="view === 'countries'" class="toolbar">
      <input v-model="country" placeholder="Code pays (ex: FRA)" />
      <button @click="loadStickers">Voir le pays</button>
    </section>
    <section v-if="view !== 'dashboard'" class="content">
      <StickerCard v-for="sticker in stickers" :key="sticker.code" :sticker="sticker" @set-qty="qty => saveSticker(sticker.code, qty)" />
    </section>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import StickerCard from './components/StickerCard.vue'
import { api, clearSession, getSessionUser, setSession } from './services/api'
const user = ref(getSessionUser())
const dashboard = ref({})
const stickers = ref([])
const view = ref('dashboard')
const mode = ref('login')
const error = ref('')
const search = ref('')
const category = ref('')
const country = ref('')
const auth = ref({ username: '', displayName: '', password: '' })
async function loadDashboard(){ dashboard.value = await api.dashboard() }
async function loadStickers(){ stickers.value = await api.stickers({ search: search.value, category: category.value, country: country.value }) }
async function saveSticker(code, quantityOwned){ await api.saveSticker({ stickerCode: code, quantityOwned, favorite: false }); await loadDashboard() }
function toggleMode(){ mode.value = mode.value === 'login' ? 'register' : 'login'; error.value = '' }
async function submitAuth(){ try { error.value = ''; const payload = { ...auth.value }; const res = mode.value === 'login' ? await api.login(payload) : await api.register(payload); setSession(res.token, { username: res.username, displayName: res.displayName }); user.value = getSessionUser(); auth.value = { username: '', displayName: '', password: '' }; await loadDashboard(); await loadStickers(); view.value = 'dashboard'; } catch (e) { error.value = 'Connexion impossible'; } }
function logout(){ clearSession(); user.value = null; dashboard.value = {}; stickers.value = [] }
onMounted(async () => { if (user.value) { await loadDashboard(); await loadStickers() } })
</script>
