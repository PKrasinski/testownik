<template>
	<v-layout>
		<v-flex xs12 sm4 offset-sm4>
			<div class="my-4 text-xs-center">
				<h1>TESTOWNIK</h1>
			</div>
			<v-card>
				<v-card-title>
					<v-form class="w-100">
						<v-text-field label="Nazwa użytkownika" v-model="login" required></v-text-field>
						<v-text-field label="Hasło" v-model="password" type="password" required></v-text-field>
					</v-form>
				</v-card-title>
				<v-card-actions>
					<v-btn flat color="orange">Zaloguj się</v-btn>
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
				login: '',
				password: ''
			}
		}
	}
</script>