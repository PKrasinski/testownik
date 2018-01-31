<template>
	<v-layout>
		<v-flex xs12 sm4 offset-sm4>
			<div class="my-4 text-xs-center">
				<h1>TESTOWNIK</h1>
			</div>
			<v-card>
				<v-card-title>
					<v-alert color="error" icon="warning" value="true" dismissible v-model="alert">
                        Pan mnie chciał oszukać! Podane dane są nieprawidłowe. 
                    </v-alert>
					<v-form class="w-100">
						<v-text-field label="Nazwa użytkownika" v-model="form.username" required></v-text-field>
						<v-text-field label="Hasło" v-model="form.password" type="password" required></v-text-field>
					</v-form>
				</v-card-title>
				<v-card-actions>
					<v-btn flat color="orange" @click="submit">Zaloguj się</v-btn>
				</v-card-actions>
			</v-card>
			<div class="my-3 text-xs-center">
				<p>
					lub <router-link :to="{name: 'sign-up'}">zarejestruj się!</router-link>
				</p>
			</div>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
                alert: false
			}
		},
		methods: {
			submit () {
				this.$http.post('/api/auth', JSON.stringify(this.form)).then(({ body }) => {
                    this.$store.commit('set_user', body);
                }).catch(err => {
                    this.alert = true;  
                });
			}
		}
	}
</script>