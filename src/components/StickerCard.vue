<template>
  <article class="card" :class="{ 'card-owned': owned }">
    <div class="card-top">
      <span class="badge">{{ sticker.code }}</span>
      <span v-if="sticker.specialSticker" class="badge badge-special">✨ Spécial</span>
      <span v-if="owned" class="badge badge-owned">✓ Possédé</span>
    </div>
    <h3>{{ sticker.name }}</h3>
    <p class="sticker-meta">
      <span v-if="sticker.countryCode" class="meta-item">{{ sticker.countryCode }}</span>
               <span v-if="sticker.type" class="meta-item">{{ sticker.type }}</span>
    </p>
    <div class="actions">
      <button class="btn-missing" @click="$emit('set-qty', 0)" title="Marquer comme manquant">❌</button>
      <button class="btn-owned" @click="$emit('set-qty', 1)" title="Marquer comme possédé">✅</button>
      <button class="btn-duplicate" @click="$emit('set-qty', 2)" title="Marquer comme doublon">📋</button>
    </div>
  </article>
</template>
<script setup>
defineProps({ 
  sticker: { type: Object, required: true },
  owned: { type: Boolean, default: false }
})
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0c6b66, #0c9b95);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.card:hover::before {
  opacity: 1;
}

.card-top {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #ece8df;
  color: #1f1b16;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.badge-special {
  background: #fef3c7;
  color: #92400e;
}

.badge-owned {
  background: #d1fae5;
  color: #065f46;
}

.card-owned {
  border-color: #10b981;
  background: #f0fdf4;
}

.card-owned::before {
  background: linear-gradient(90deg, #10b981, #34d399) !important;
  opacity: 1;
}

h3 {
  margin: 12px 0 6px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
}

.sticker-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 12px;
  font-size: 12px;
  color: #999;
}

.meta-item {
  display: inline-block;
  padding: 2px 6px;
  background: #f5f3ef;
  border-radius: 4px;
}

.actions {
  display: flex;
  gap: 6px;
  width: 100%;
}

.actions button {
  flex: 1;
  padding: 10px 8px;
  border: 1px solid #d9d2c8;
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.actions button:hover {
  transform: scale(1.05);
}

.btn-missing:hover {
  background: #fee2e2;
  border-color: #fca5a5;
}

.btn-owned:hover {
  background: #dcfce7;
  border-color: #86efac;
}

.btn-duplicate:hover {
  background: #e0e7ff;
  border-color: #a5b4fc;
}

.actions button:active {
  transform: scale(0.95);
}
</style>
