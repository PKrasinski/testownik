import Vue from 'vue'
import Vuetify from 'vuetify'
import http from 'vue-resource'
import Router from 'vue-router'
import store from './store'
import VueCookie from 'vue-cookie'

import App from './App'
import Homesite from './pages/Homesite'
import SignUp from './pages/SignUp'

Vue.config.debug = true
Vue.use(Router)
Vue.use(Vuetify)
Vue.use(http)
Vue.use(VueCookie);

const router = new Router({
	mode: 'history',
	routes: [
		{ name: 'homesite', path: '/', component: Homesite },
		{ name: 'sign-up', path: '/zarejestruj-sie', component: SignUp },

	]
})

new Vue({
    el: '#app',
	router,
	store,
    render (createElement) {
      	return createElement(App)
    }
})
