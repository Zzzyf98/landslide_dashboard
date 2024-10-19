<template>
  <div class="min-h-screen bg-gray-900 text-white font-sans">
    <header class="bg-gray-800 p-4 h-20">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="text-4xl font-bold mr-4">COP</div>
          <h1 class="text-3xl">COP for Landslide Emergency Management</h1>
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
      <button @click="showPage('worksDepts')" :class="{'text-white border-b-2 border-white': currentPage === 'worksDepts', 'text-gray-400': currentPage !== 'worksDepts'}" class="mr-4">Main Page</button>
      <button @click="showPage('fsdHkpf')" :class="{'text-white border-b-2 border-white': currentPage === 'fsdHkpf', 'text-gray-400': currentPage !== 'fsdHkpf'}" class="mr-4">Arcgis Map</button>
      <button @click="showPage('traffic')" :class="{'text-white border-b-2 border-white': currentPage === 'traffic', 'text-gray-400': currentPage !== 'traffic'}">PDF Report</button>
    </nav>

    <div v-show="currentPage === 'worksDepts'" class="flex min-h-screen">
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
            <div id="player" class=" h-176 relative"></div>
            <!-- <div class="absolute bottom-2 right-2 space-x-2">
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
            </div> -->
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
          <div class="bg-gray-800 h-118 rounded mt-4">
            <!-- Placeholder for the GIS map -->
            <div class="flex">
              <img :src="require('./GISmap/rainfall_map.png')" alt="Rainfall Map" class="mt-5"/>
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

    <div v-show="currentPage === 'fsdHkpf'" ref="viewDiv" class="flex min-h-screen"></div>

    <div v-show="currentPage === 'traffic'" class="flex min-h-screen ">
      <div class="h-full mx-auto mt-4">
            <canvas ref="pdfCanvas"></canvas>
      </div>
    </div>
    

  </div>
</template>

<script>

import PieChart from './components/PieChart.vue'
import { loadModules } from 'esri-loader';
import * as pdfjsLib from 'pdfjs-dist';

// 设置 worker 路径
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


export default {
  components: {
    PieChart
  },
  name: 'DashboardView',
  data() {
    return {
      api:null,
      showMajorCases: false,
      showActiveCases: false,
      loadmapflag: false,
      loadpdfflag: false,
      reportingPeriod: 'custom',
      currentPage: 'worksDepts', // 默认显示的页面
      departments: [
        { name: 'ArchSD', icon: './logo/ASD.jpg', status: 'Inactive', incidents: 0 },
        { name: 'BD', icon: './logo/BD.jpg', status: 'Inactive', incidents: 0 },
        { name: 'CEDD', icon: './logo/CEDD.jpg', status: 'Inactive', incidents: 4 },
        { name: 'DSD', icon: '/./logo/DSD.jpg', status: 'Inactive', incidents: 5 },
        { name: 'HyD', icon: './logo/HyD.jpg', status: 'Inactive', incidents: 1 },
        { name: 'HD', icon: './logo/HD.jpg', status: 'Inactive', incidents: 0 },
        { name: 'LandsD', icon: './logo/LD.jpg', status: 'Inactive', incidents: 1 },
        { name: 'WSD', icon: './logo/WSD.jpg', status: 'Inactive', incidents: 87 },
      ],
      incidents: [
        { id: '2022/06/3137', type: 'Minor', date: '09/06/2022 11:24:18', location: 'Feature No.8SW-B/C137, Hous...' },
        { id: '202206093503', type: 'Emergency', date: '09/06/2022 11:10:00', location: 'Clear Water Bay No.9' },
        { id: '202206093501', type: 'Emergency', date: '09/06/2022 10:35:00', location: 'Pending...' },
        { id: '202206093502', type: 'Emergency', date: '09/06/2022 10:36:00', location: 'Pending...' },
        { id: '202206093503', type: 'Emergency', date: '09/06/2022 10:37:00', location: 'Pending...' },
      ],
      chartData: {
        labels: ['Crucial', 'Minor', 'Emergency'],
        datasets: [
          {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            data: [10, 20, 30]
          }
        ]
      }
    }
  },
  mounted(){
      //初始化API实例并启动渲染，DigitalTwinPlayer对象的构造参数请参考API开发文档
      this.api = new window.acapi.DigitalTwinPlayer("143.89.22.7:8080", { "domId": "player",'apiOptions': {
            //必选参数，与云渲染主机通信成功后的回调函数
            //注意：只有在onReady之后才可以调用DigitalTwinAPI接口
            onReady: this._onReady,//api调用入口，必选回调函数
            onLog: this._onLog,      //可选参数，日志输出回调函数
            onEvent: this._onEvent,   //可选参数，三维场景交互事件回调函数
            // useHttps:true
          },
          ui: {
              startupInfo: true,   //可选参数，是否显示页面加载详细信息，默认值false
              statusButton: true,  //可选参数，是否显示状态按钮，默认false
          },

          // events: {
          //     onVideoLoaded: _onLoaded,   //可选参数，视频流加载成功回调函数
          //     onConnClose: _onClose,      //可选参数，连接断开回调函数
          // },     

        //可选参数，设置三维交互的键盘事件接收者
        //注意：接收类型有视频标签(video)，网页文档(document)，空(none)
        keyEventTarget: 'none',
       }).getAPI();

     
  },

  unmounted() {
    //关闭云渲染并释放资源
    if (this.api) {
      this.api.destroy();
    }
  },
  methods: {
    _onReady() {
      console.info('此时可以调API了');
      this.api.settingsPanel.setControlMode(0.5, 0.2, true, true);
    },

    _onLog(s, nnl) {
      console.info('输出接口调用日志：');
      var logStr = (s + (nnl ? "" : '\n'));
      console.info(logStr);
    },

    _onEvent(event) {
      console.info('监听各类交互事件');
      if (event.eventtype == 'LeftMouseButtonClick' && event.Type == 'TileLayer') {
        console.info('监听图层点击事件');
      }
    },

    showPage(page) {
      this.currentPage = page;
      if(this.currentPage === 'fsdHkpf' && !this.loadmapflag){
        this.loadMap();
        this.loadmapflag = true;
      }
       if(this.currentPage === 'traffic' && !this.loadpdfflag){
        this.loadPDF();
        this.loadpdfflag = true;
       }
    },

    loadMap() {
        loadModules(['esri/Map', 'esri/views/MapView'], {
            css: true
          })
          .then(([ArcGISMap, MapView]) => {
            // create map with the given options
            const map = new ArcGISMap({
              basemap: 'topo-vector'
            });
            // assign map to this view
            this.view = new MapView({
              container: this.$refs.viewDiv,
              map: map,
              center: [114.1694, 22.3193],
              zoom: 12
            });
          });
      },

      async loadPDF() {
      const url = '/Report.pdf'; // 确保你的 PDF 文件路径正确
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const scale = 2.5;
      const viewport = page.getViewport({ scale: scale });
      const canvas = this.$refs.pdfCanvas;
      const context = canvas.getContext('2d');

      // 设置 canvas 的高度和宽度为视口的高度和宽度
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // 定义渲染上下文，包括 canvas 的上下文和视口
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      // 渲染 PDF 页面到 canvas 上
      await page.render(renderContext).promise;

      // // 设置 canvas 样式以保持比例并居中
      // canvas.style.display = 'block';
      // canvas.style.margin = '0 auto';
      // canvas.style.maxWidth = '100%';
      // canvas.style.height = 'auto';
    }


  }
      
}



</script>


<style>
.pdf-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>


