import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import echarts from 'echarts'
import axios from 'axios'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import '../src/assets/css/font.css'


import {
    Row,
    Col,
    Tabs,
    Table,
    TableColumn
} from 'element-ui'

import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(CollapseTransition);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(echarts);
Vue.prototype.$echarts = echarts;
Vue.prototype.$ajax = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
