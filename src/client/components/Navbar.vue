<template>
    <v-bottom-nav :value="true" color="orange">
        <v-btn dark @click="$router.push({name: 'homesite'})">
            <span>Ucz się</span>
            <v-icon>ondemand_video</v-icon>
        </v-btn>
        <v-btn dark @click="$router.push({name: 'settings'})">
            <span>Ustawienia</span>
            <v-icon>settings</v-icon>
        </v-btn>
        <v-btn dark @click="$store.commit('logout')">
            <span>Wyloguj się</span>
            <v-icon>power_settings_new</v-icon>
        </v-btn>
    </v-bottom-nav>
</template>
<script>
export default {
  
}
</script>
