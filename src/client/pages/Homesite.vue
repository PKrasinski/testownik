<template>
    <sign-in v-if="!auth" />
	<div v-else>
		<v-layout>
			<v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
				<div class="my-4 text-xs-center">
					<h1>Witaj {{user.username}}!</h1>
				</div>
				<v-card>
					<v-card-title>
						<v-flex xs12 sm8 mb-2>
							<v-progress-linear value="75" height="10" color="success"/>
						</v-flex>
						<v-flex xs4 sm1 offset-sm1 class="text-xs-center">
							<v-badge color="green" left overlay overlap>
								<span slot="badge">6</span>
								<v-icon large color="grey lighten-1">check</v-icon>
							</v-badge>
						</v-flex>
						<v-flex xs4 sm1 class="text-xs-center">
							<v-badge color="red" left overlay overlap>
								<span slot="badge">6</span>
								<v-icon large color="grey lighten-1">highlight_off</v-icon>
							</v-badge>
						</v-flex>
						<v-flex xs4 sm1 class="text-xs-center">
							<v-badge color="orange" left overlay overlap>
								<span slot="badge">176</span>
								<v-icon large color="grey lighten-1">schedule</v-icon>
							</v-badge>
						</v-flex>
					</v-card-title>
					<v-card-text>
						<h4>{{question.question}}</h4>
						<v-checkbox v-for="(answer, index) in question.answers" :key="index" :label="answer.answer" v-model="checkboxes[index]" ></v-checkbox>
					</v-card-text>
					<v-card-actions right>
						<v-spacer></v-spacer>
						<v-btn flat color="orange">Następne</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
		<navbar/>
	</div>
</template>

<script>
import SignIn from '../components/SignIn'
import Navbar from '../components/Navbar'

export default {
	data () {
		return {
			checkboxes:[false, false, false, false, false]
		}
	},
	components: {
		SignIn,
		Navbar
	},
	computed: {
		auth () {
			return this.$store.getters.is_auth;
		},
		user () {
			return this.$store.getters.user;
		},
		question () {
			return this.$store.getters.question;
		},
		stats () {
			return this.$store.getters.stats;
		}
	}
}
</script>