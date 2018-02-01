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
							<v-progress-linear :value="parseInt(stats.correct  / stats.to_learn * 100)" height="10" color="success"/>
						</v-flex>
						<v-flex xs4 sm1 offset-sm1 class="text-xs-center">
							<v-badge color="green" left overlay overlap>
								<span slot="badge">{{stats.correct}}</span>
								<v-icon large color="grey lighten-1">check</v-icon>
							</v-badge>
						</v-flex>
						<v-flex xs4 sm1 class="text-xs-center">
							<v-badge color="red" left overlay overlap>
								<span slot="badge">{{stats.wrong}}</span>
								<v-icon large color="grey lighten-1">highlight_off</v-icon>
							</v-badge>
						</v-flex>
						<v-flex xs4 sm1 class="text-xs-center">
							<v-badge color="orange" left overlay overlap>
								<span slot="badge">{{stats.to_learn}}</span>
								<v-icon large color="grey lighten-1">schedule</v-icon>
							</v-badge>
						</v-flex>
					</v-card-title>
					<v-card-text>
						<h4>{{question.question}}</h4>
						<v-list>
							<v-list-tile 
								v-for="(answer, index) in question.answers" 
								:key="index" 
								:class="{
									'error': check && checkboxes[index] != answer.correct,
									'success': check && checkboxes[index] && checkboxes[index] == answer.correct
								}"
								@click="checkboxes = checkboxes.map((el, i) => !check && i == index ? !el : el)"
								style="min-height: 60px; height: auto;"
							>
								<v-list-tile-action>
									
									<v-icon color="orange">{{ checkboxes[index] ? 'check_circle' : 'crop_din' }}</v-icon>
								</v-list-tile-action>
								<v-list-tile-content>
									{{answer.answer}}
								</v-list-tile-content>
							</v-list-tile>
						</v-list>
					</v-card-text>
					<v-card-actions right>
						<v-spacer></v-spacer>
						<v-btn v-if="!check" flat color="orange" @click="check = true">Sprawdź</v-btn>
						<v-btn v-else flat color="orange" @click="next">Następne pytanie</v-btn>
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
			checkboxes:[false, false, false, false, false],
			check: false
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
		},
		correct () {
			return this.checkboxes.filter((val, index) => val != this.question.answers[index].correct).length == 0;
		}
	},
	methods: {
		next() {
			if(this.correct)
				this.$store.commit('correct');
			else
				this.$store.commit('incorrect')
		}
	}
}
</script>

<style>
.list__tile.list__tile--link {
	min-height: 60px; 
	height: auto;
}
li:nth-child(2n) .list__tile.list__tile--link {
	background: rgba(0,0,0,.08)
}
li:nth-child(2n) .list__tile.list__tile--link:hover {
	background: rgba(0,0,0,.16)
}
</style>
