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
						<h2>Ustawienia</h2>
					</v-card-title>
					<v-card-text>
						<v-form class="w-100">
							<v-text-field :label="`Powtórz ${settings.multiplyAfterMistake} razy po pomyłce`" type="number" v-model="settings.multiplyAfterMistake" required></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-btn flat color="orange" @click="reset">Rozpocznij od nowa</v-btn>
						<v-spacer></v-spacer>
						<v-btn flat color="orange" @click="save">Zapisz</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>

export default {
	data () {
		return {
			settings: {
				repeat: 0
			}
		}
	},
	computed: {
		auth () {
			return this.$store.getters.is_auth;
		},
		user () {
			return this.$store.getters.user;
		}
	},
	created () {
		this.settings = this.$store.getters.settings;
	},
	methods: {
		save() {
			if(this.settings.multiplyAfterMistake > 10)
				this.settings.multiplyAfterMistake = 10;
			this.$store.dispatch('set_settings', this.settings);
			this.$router.push({name:'homesite'})
		},
		reset() {
			this.$store.dispatch('reset')
			this.$router.push({name:'homesite'})
		}
	}
}
</script>

