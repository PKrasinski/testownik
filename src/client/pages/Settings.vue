<template>
    <sign-in v-if="!auth" />
	<div v-else>
		<v-layout> 
			<v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
				<div class="my-4 text-xs-center">
					<h1>Witaj {{user.username}}!</h1>
				</div>
				<v-card>
					<v-card-title>
						
					</v-card-title>
					<v-card-text>
						<h4></h4>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		<navbar/>
	</div>
</template>

<script>

export default {
	computed: {
		auth () {
			return this.$store.getters.is_auth;
		},
		user () {
			return this.$store.getters.user;
		}
	},
}
</script>

