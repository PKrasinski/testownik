<template>
    <v-app :dark="dark" v-if="ready">
		<v-fab-transition>
			<v-btn
				fab
				fixed
				top
				right
				small
				color="orange"
				v-model="dark"
				@click="dark = !dark"
			>
				<v-icon>code</v-icon>
				<v-icon>person</v-icon>
			</v-btn>
    	</v-fab-transition>
		<router-view></router-view>
  	</v-app>
</template>

<script>
export default {
	data () {
		return {
			dark: false
		}
	},
	computed: {
		ready () {
			return this.$store.getters.auth_component_ready;
		}
	},
	beforeCreate() {
		this.$store.dispatch('auth')
	}
}
</script>

<style>
.w-100 {
	width: 100%;
}
</style>

<style src="../../node_modules/vuetify/dist/vuetify.min.css"></style>
