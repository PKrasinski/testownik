<template>
    <sign-in v-if="!auth" />
</template>

<script>
import SignIn from '../components/SignIn'

export default {
	components: {
		SignIn
	},
	computed: {
		auth () {
			return this.$store.getters.is_auth;
		}
	}
}
</script>