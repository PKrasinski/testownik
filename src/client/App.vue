<template>
    <v-app light v-if="ready">
		<router-view></router-view>
  	</v-app>
</template>

<script>
export default {
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
