<template>
	<v-layout>
		<v-flex xs12 sm4 offset-sm4>
			<div class="my-4 text-xs-center">
				<h1>TESTOWNIK</h1>
			</div>
			<v-card>
				<v-card-title>
                    <v-alert color="error" icon="warning" value="true" dismissible v-model="alert">
                        Pan mnie chciał oszukać! Podane dane są nieprawidłowe albo użytkownik o takiej nazwie już istnieje. 
                    </v-alert>
					<v-form class="w-100">
						<v-text-field label="Nazwa użytkownika" v-model="form.username" required></v-text-field>
						<v-text-field label="Hasło" v-model="form.password" type="password" required></v-text-field>
						<v-text-field label="Powtórz hasło" v-model="form.repeat_password" type="password" required></v-text-field>
					</v-form>
				</v-card-title>
				<v-card-actions>
					<v-btn flat color="orange" @click="submit">Zarejestruj się</v-btn>
				</v-card-actions>
			</v-card>
			<div class="my-3 text-xs-center">
				<p>
					lub <router-link :to="{name: 'homesite'}">zaloguj się!</router-link>
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
                    password: '',
                    repeat_password: ''
                },
                alert: false
            }
        },
        methods: {
            submit() {
                this.$http.post('/api/user', JSON.stringify(this.form)).then(({ body }) => {
                    this.$store.commit('set_user', body);
                    this.$router.push({name: 'homesite'})
                }).catch(err => {
                    this.alert = true;  
                });
            }
        }
	}
</script>
