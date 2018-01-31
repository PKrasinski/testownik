<template>
    <sign-in v-if="!auth" />
	<div v-else>
		<h1>Jesteś zalogowany</h1>
	</div>
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