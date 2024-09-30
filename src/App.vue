<template>
  <div class="min-h-screen bg-gray-900 text-white font-sans">
    <header class="bg-gray-800 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="text-2xl font-bold mr-4">COP</div>
          <h1 class="text-xl">COP for Landslide Emergency Management</h1>
        </div>
        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input type="checkbox" v-model="showMajorCases" class="mr-2" />
            Show Major Cases Only
          </label>
          <label class="flex items-center">
            <input type="checkbox" v-model="showActiveCases" class="mr-2" />
            Show Active Cases Only
          </label>
          <select v-model="reportingPeriod" class="bg-gray-700 p-1 rounded">
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>
    </header>

    <nav class="bg-gray-800 p-4">
      <button class="text-white mr-4 border-b-2 border-white">WORKS DEPTS</button>
      <button class="text-gray-400 mr-4">FSD/HKPF</button>
      <button class="text-gray-400">TRAFFIC</button>
    </nav>

    <div class="flex min-h-screen">
      <div class="w-1/4 p-4 ">
        <div class="mb-6">
          <h3 class="text-lg font-bold mb-2">Emergency Control Centre</h3>
          <ul class="space-y-2">
            <li v-for="dept in departments" :key="dept.name" class="flex items-center justify-between bg-gray-800 p-2 rounded">
              <div class="flex items-center">
                <img :src="dept.icon" :alt="dept.name" class="w-6 h-6 mr-2" />
                {{ dept.name }}
              </div>
              <span class="text-gray-400">{{ dept.status }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-2">Incident Summary List</h3>
          <ul class="space-y-4">
            <li v-for="incident in incidents" :key="incident.id" class="bg-gray-800 p-2 rounded">
              <strong>{{ incident.id }} ({{ incident.type }})</strong>
              <p class="text-sm text-gray-400">Created Date: {{ incident.date }}</p>
              <p class="text-sm text-gray-400">Location: {{ incident.location }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-1/2 p-4 h-full">
        <div class="mb-4">
          <h3 class="text-lg font-bold mb-2">Reported Incident Overview Map</h3>
          <div class="bg-gray-800 h-176 relative">
            <!-- Placeholder for the map -->
            <div class="absolute bottom-2 right-2 space-x-2">
              <button class="bg-white text-black p-1 rounded">+</button>
              <button class="bg-white text-black p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </button>
              <button class="bg-white text-black p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="dept in departments" :key="dept.name" class="bg-gray-800 p-2 rounded text-center">
            <img :src="dept.icon" :alt="dept.name" class="w-8 h-8 mx-auto mb-2" />
            <span class="text-lg font-bold">{{ dept.incidents }}</span>
          </div>
        </div>
      </div>

      <div class="w-1/4 p-4">
        <div class="mb-4">
          <h3 class="text-lg font-bold mb-2">GIS Map Platform</h3>
          <div class="space-x-2 mb-2">
            <button class="bg-blue-500 text-white px-4 py-2 rounded">FULL FUNCTION MODE</button>
            <button class="bg-green-500 text-white px-4 py-2 rounded">QUICK PREVIEW MODE</button>
          </div>
          <div class="bg-gray-800 h-92 rounded mt-4">
            <!-- Placeholder for the GIS map -->
            <div class="flex">
              <img src="/GISmap/rainfall_map.png" alt="Rainfall Map" class="mt-2">
            </div>

          </div>
        </div>
        <div>
          <div class="bg-gray-800 h-118 flex items-center justify-center relative mt-6 rounded">
            <!-- 使用饼图组件 -->
            <PieChart :data="chartData" />
            <!-- <span class="text-4xl font-bold absolute">75%</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PieChart from './components/PieChart.vue'


export default {
  components: {
    PieChart
  },
  name: 'DashboardView',
  data() {
    return {
      showMajorCases: false,
      showActiveCases: false,
      reportingPeriod: 'custom',
      departments: [
        { name: 'ArchSD', icon: './favicon.ico', status: 'Inactive', incidents: 0 },
        { name: 'BD', icon: './favicon.ico', status: 'Inactive', incidents: 0 },
        { name: 'CEDD', icon: './favicon.ico', status: 'Inactive', incidents: 4 },
        { name: 'DSD', icon: '/./favicon.ico', status: 'Inactive', incidents: 5 },
        { name: 'HyD', icon: './favicon.ico', status: 'Inactive', incidents: 1 },
        { name: 'HD', icon: './favicon.ico', status: 'Inactive', incidents: 0 },
        { name: 'LandsD', icon: './favicon.ico', status: 'Inactive', incidents: 1 },
        { name: 'WSD', icon: './favicon.ico', status: 'Inactive', incidents: 87 },
      ],
      incidents: [
        { id: '2022/06/3137', type: 'Minor', date: '09/06/2022 11:24:18', location: 'Feature No.8SW-B/C137, Hous...' },
        { id: '202206093503', type: 'Emergency', date: '09/06/2022 11:10:00', location: '茂羅街近遊社34607' },
        { id: '202206093501', type: 'Emergency', date: '09/06/2022 10:35:00', location: 'Pending...' },
        { id: '202206093502', type: 'Emergency', date: '09/06/2022 10:35:00', location: 'Pending...' },
        { id: '202206093503', type: 'Emergency', date: '09/06/2022 10:35:00', location: 'Pending...' },
      ],
      chartData: {
        labels: ['主要', '次要', '紧急'],
        datasets: [
          {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            data: [10, 20, 30]
          }
        ]
      }
    }
  },
}
</script>


