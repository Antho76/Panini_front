<template>
  <div class="country-grid">
    <h2>Pays</h2>
    <input
      v-model="search"
      type="text"
      placeholder="Rechercher un pays..."
      class="search-input"
    />
    <div class="countries">
      <button
        v-for="country in filteredCountries"
        :key="country.code"
        :class="{ active: selected === country.code }"
        class="country-btn"
        @click="$emit('select', country.code)"
        :title="country.name"
      >
        <span class="flag">{{ country.flag }}</span>
        <span class="code">{{ country.code }}</span>
        <span class="percentage">
          {{ stats[country.code]?.percentage ?? 0 }}%
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onMounted } from 'vue'
import { api } from '../services/api'

defineProps({ selected: String })
defineEmits(['select'])

const search = ref('')
const stats = ref({})

const countries = [
  { code: 'ALG', name: 'Algérie', flag: '🇩🇿' },
  { code: 'ARG', name: 'Argentine', flag: '🇦🇷' },
  { code: 'AUS', name: 'Australie', flag: '🇦🇺' },
  { code: 'AUT', name: 'Autriche', flag: '🇦🇹' },
  { code: 'BEL', name: 'Belgique', flag: '🇧🇪' },
  { code: 'BIH', name: 'Bosnie-Herzégovine', flag: '🇧🇦' },
  { code: 'BRA', name: 'Brésil', flag: '🇧🇷' },
  { code: 'CAN', name: 'Canada', flag: '🇨🇦' },
  { code: 'COL', name: 'Colombie', flag: '🇨🇴' },
  { code: 'COD', name: 'RD Congo', flag: '🇨🇩' },
  { code: 'CPV', name: 'Cap-Vert', flag: '🇨🇻' },
  { code: 'CIV', name: "Côte d'Ivoire", flag: '🇨🇮' },
  { code: 'CRO', name: 'Croatie', flag: '🇭🇷' },
  { code: 'CUW', name: 'Curaçao', flag: '🇨🇼' },
  { code: 'CZE', name: 'Tchéquie', flag: '🇨🇿' },
  { code: 'ECU', name: 'Équateur', flag: '🇪🇨' },
  { code: 'EGY', name: 'Égypte', flag: '🇪🇬' },
  { code: 'ENG', name: 'Angleterre', flag: '🏴' },
  { code: 'ESP', name: 'Espagne', flag: '🇪🇸' },
  { code: 'FRA', name: 'France', flag: '🇫🇷' },
  { code: 'GER', name: 'Allemagne', flag: '🇩🇪' },
  { code: 'GHA', name: 'Ghana', flag: '🇬🇭' },
  { code: 'HAI', name: 'Haïti', flag: '🇭🇹' },
  { code: 'IRN', name: 'Iran', flag: '🇮🇷' },
  { code: 'IRQ', name: 'Irak', flag: '🇮🇶' },
  { code: 'JPN', name: 'Japon', flag: '🇯🇵' },
  { code: 'JOR', name: 'Jordanie', flag: '🇯🇴' },
  { code: 'KOR', name: 'Corée du Sud', flag: '🇰🇷' },
  { code: 'KSA', name: 'Arabie saoudite', flag: '🇸🇦' },
  { code: 'MAR', name: 'Maroc', flag: '🇲🇦' },
  { code: 'MEX', name: 'Mexique', flag: '🇲🇽' },
  { code: 'NED', name: 'Pays-Bas', flag: '🇳🇱' },
  { code: 'NOR', name: 'Norvège', flag: '🇳🇴' },
  { code: 'NZL', name: 'Nouvelle-Zélande', flag: '🇳🇿' },
  { code: 'PAN', name: 'Panama', flag: '🇵🇦' },
  { code: 'PAR', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'POR', name: 'Portugal', flag: '🇵🇹' },
  { code: 'QAT', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RSA', name: 'Afrique du Sud', flag: '🇿🇦' },
  { code: 'SCO', name: 'Écosse', flag: '🏴' },
  { code: 'SEN', name: 'Sénégal', flag: '🇸🇳' },
  { code: 'SUI', name: 'Suisse', flag: '🇨🇭' },
  { code: 'SWE', name: 'Suède', flag: '🇸🇪' },
  { code: 'TUN', name: 'Tunisie', flag: '🇹🇳' },
  { code: 'TUR', name: 'Turquie', flag: '🇹🇷' },
  { code: 'URU', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'USA', name: 'États-Unis', flag: '🇺🇸' },
  { code: 'UZB', name: 'Ouzbékistan', flag: '🇺🇿' }
]

const filteredCountries = computed(() => {
  const q = search.value.toLowerCase()
  return countries.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.code.toLowerCase().includes(q)
  )
})

onMounted(async () => {
  await loadStats()
})

async function loadStats() {
  try {
    const data = await api.countryStats()
    stats.value = data
  } catch (e) {
    console.error('Erreur lors du chargement des statistiques:', e)
  }
}

defineExpose({ loadStats })
</script>

<style scoped>
.country-grid {
  margin-bottom: 24px;
}

.country-grid h2 {
  margin: 0 0 16px;
  font-size: 18px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d9d2c8;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #0c6b66;
  box-shadow: 0 0 0 2px rgba(12, 107, 102, 0.1);
}

.countries {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 10px;
}

.country-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border: 2px solid #d9d2c8;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  font-weight: 500;
  position: relative;
}

.country-btn:hover {
  border-color: #0c6b66;
  background: #f9f8f6;
}

.country-btn.active {
  border-color: #0c6b66;
  background: #0c6b66;
  color: #fff;
}

.flag {
  font-size: 24px;
  line-height: 1;
}

.code {
  text-transform: uppercase;
  white-space: nowrap;
}

.country-btn.active .code {
  color: #fff;
}

.percentage {
  font-size: 11px;
  font-weight: 700;
  color: #0c6b66;
  background: #f0fffe;
  padding: 2px 4px;
  border-radius: 4px;
  width: 100%;
  text-align: center;
}

.country-btn.active .percentage {
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}
</style>
