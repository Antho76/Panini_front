<template>
  <div class="category-grid">
    <h2>Catégories</h2>
    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat.code"
        :class="{ active: selected === cat.code }"
        class="category-btn"
        @click="$emit('select', cat.code)"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({ selected: String })
defineEmits(['select'])

const categories = [
  { code: 'FWC', name: 'FWC', icon: '🏆' },
  { code: 'COUNTRY', name: 'Pays', icon: '🌍' },
  { code: 'COCA', name: 'Coca-Cola', icon: '🥤' }
]
</script>

<style scoped>
.category-grid {
  margin-bottom: 24px;
}

.category-grid h2 {
  margin: 0 0 16px;
  font-size: 18px;
}

.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 2px solid #d9d2c8;
  background: #fff;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover {
  border-color: #0c6b66;
  background: #f9f8f6;
}

.category-btn.active {
  border-color: #0c6b66;
  background: #0c6b66;
  color: #fff;
}

.cat-icon {
  font-size: 28px;
}

.cat-name {
  font-weight: 500;
  font-size: 14px;
}

.category-btn.active .cat-name {
  color: #fff;
}
</style>
