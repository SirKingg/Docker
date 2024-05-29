<template>
<main class="fr-pt-md-14v" role="main" id="content">
<div class="fr-container fr-container--fluid fr-mb-md-14v">
<div class="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
<div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
    <div class="fr-container fr-background-alt--grey fr-px-md-0 fr-py-10v fr-py-md-14v">
        <div class="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
            <div class="fr-col-12 fr-col-md-9 fr-col-lg-8">
                <h1>Connexion à (Re)Sources Relationnelles</h1>
                <div>
                    <fieldset class="fr-fieldset" id="login-1760-fieldset" aria-labelledby="login-1760-fieldset-legend login-1760-fieldset-messages">
                        <legend class="fr-fieldset__legend" id="login-1760-fieldset-legend" v-if="display_error">
                            <div class="fr-alert fr-alert--error">
                                <h3 class="fr-alert__title">Erreur : Erreur de connexion</h3>
                                <p>Veuillez saisir un identifiant et mot de passe valide</p>
                            </div>
                        </legend>
                        <legend class="fr-fieldset__legend" id="login-1760-fieldset-legend" v-if="display_error_server">
                            <div class="fr-alert fr-alert--error">
                                <h3 class="fr-alert__title">Erreur : Erreur serveur</h3>
                                <p>Veuillez essayer ultérieurement...</p>
                            </div>
                        </legend>
                        <legend class="fr-fieldset__legend" id="login-1760-fieldset-legend" v-if="display_error_inactif">
                            <div class="fr-alert fr-alert--error">
                                <h3 class="fr-alert__title">Erreur : Compte inactif</h3>
                                <p>Votre compte a été désactivé...</p>
                            </div>
                        </legend>
                        <div class="fr-fieldset__element">
                            <fieldset class="fr-fieldset" id="credentials" aria-labelledby="credentials-messages">
                                <div class="fr-fieldset__element">
                                    <div class="fr-input-group">
                                        <label class="fr-label" for="username-1757">
                                            Identifiant
                                            <span class="fr-hint-text">Format attendu : nom@domaine.fr</span>
                                        </label>
                                        <input class="fr-input" autocomplete="username" aria-required="true" aria-describedby="username-1757-messages" name="username" id="username-1757" type="text" v-model="this.user" @keypress.enter="login">
                                        <div class="fr-messages-group" id="username-1757-messages" aria-live="assertive">
                                        </div>
                                    </div>
                                </div>
                                <div class="fr-fieldset__element">
                                    <div class="fr-password" id="password-1758">
                                        <label class="fr-label" for="password-1758-input">
                                            Mot de passe
                                        </label>
                                        <div class="fr-input-wrap">
                                            <input v-if="!this.display_password" class="fr-password__input fr-input" aria-describedby="password-1758-input-messages" aria-required="true" name="password" autocomplete="current-password" id="password-1758-input" type="password" v-model="this.password" @keypress.enter="login">
                                            <input v-if="this.display_password" class="fr-password__input fr-input" aria-describedby="password-1758-input-messages" aria-required="true" name="password" autocomplete="current-password" id="password-1758-input" type="text" v-model="this.password" @keypress.enter="login">
                                        </div>
                                        <div class="fr-messages-group" id="password-1758-input-messages" aria-live="assertive">
                                        </div>
                                        <div class="fr-password__checkbox fr-checkbox-group fr-checkbox-group--sm">
                                            <input aria-label="Afficher le mot de passe" id="password-1758-show" type="checkbox" aria-describedby="password-1758-show-messages" v-model="this.display_password">
                                            <label class="fr-password__checkbox fr-label" for="password-1758-show">
                                                Afficher
                                            </label>
                                            <div class="fr-messages-group" id="password-1758-show-messages" aria-live="assertive">
                                            </div>
                                        </div>
                                        <!-- <p>
                                            <a href="[À MODIFIER - url de la page de récupération]" class="fr-link">Mot de passe oublié ?</a>
                                        </p> -->
                                    </div>
                                </div>
                                <div class="fr-messages-group" id="credentials-messages" aria-live="assertive">
                                </div>
                            </fieldset>
                        </div>
                        <div class="fr-fieldset__element">
                            <div class="fr-checkbox-group fr-checkbox-group--sm">
                                <input name="remember" id="remember-1759" type="checkbox" aria-describedby="remember-1759-messages" v-model="this.cookies_saver">
                                <label class="fr-label" for="remember-1759">
                                    Se souvenir de moi
                                </label>
                                <div class="fr-messages-group" id="remember-1759-messages" aria-live="assertive">
                                </div>
                            </div>
                        </div>
                        <div class="fr-fieldset__element">
                            <ul class="fr-btns-group">
                                <li>
                                    <button class="fr-mt-2v fr-btn" @click="login">
                                        Se connecter
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="fr-messages-group" id="login-1760-fieldset-messages" aria-live="assertive">
                        </div>
                    </fieldset>
                </div>
                <hr>
                <h2>Vous n’avez pas de compte ?</h2>
                <ul class="fr-btns-group">
                    <li>
                        <button class="fr-btn fr-btn--secondary" @click="this.goToRegister()">
                            Créer un compte
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</main>
</template>

<style>

</style>

<script>
    import store from '@/store'
    import router from '@/router'

    export default{
        name : "LoginCard",
        data(){
            return{
                user:null,
                password:null,
                display_error:false,
                cookies_saver:false,
                display_password:false,
                display_error_server:false,
                display_error_inactif:false
            }
        },
        methods:{
            login(){
                if(this.checkform()){
                    const options = {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        
                        body: JSON.stringify({"email":this.user,"password":this.password})
                    };
                    
                    fetch(this.api_path + this.route_login, options)
                    .then(res =>{
                        if(res.status == 200 || res.status == 401){
                            return res.json()
                        }else{
                            this.display_error_inactif = false
                            this.display_error = false
                            this.display_error_server = true
                            throw new Error("User disabled")
                        }
                    })
                    .then(data =>{
                        if(data.success != null){
                            console.log(data.success)
                            if(data.message == "user disabled"){
                                this.display_error_inactif = true
                                this.display_error = false
                                this.display_error_server = false
                                throw new Error("User disabled")
                            }else{
                                this.display_error_inactif = false
                                this.display_error = true
                                this.display_error_server = false
                            }
                           if(this.cookies_saver){
                                let date = new Date()
                                date.setTime(date.getTime() + this.expire_cookies);
                                let expires = "expires=" + date.toUTCString();
                                document.cookie = "token=" + data.token + ";" + expires + "; path=/";
                                document.cookie = "email=" + data.details.username + ";" + expires + "; path=/";
                                document.cookie = "role=" + data.details.role + ";" + expires + "; path=/";
                           }
                            // stockage dans le store vue
                            store.state.token = data.token
                            store.state.email = data.details.username
                            store.state.role = data.details.role
                            // stockage dans le session storage
                            sessionStorage.setItem("token",data.token) 
                            sessionStorage.setItem("email",data.details.username)
                            sessionStorage.setItem("role",data.details.role)
                            store.commit("setConnectionStatus", true) 
                            if(data.details.role === "SUPER_ADMIN"){
                                router.push("/super-admin")
                            }else{
                                router.push("/")
                            }
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            },
            checkform(){
                if(this.user == null || this.user == ""){
                    this.display_error = true
                    return false
                }
                if(this.password == "" || this.password == null){
                    this.display_error = true
                    return false
                }
                return true
            },
            goToRegister(){
                router.push("/register")
            }


        },
        mounted(){
            // TODO: Rajouter la vérification dans les cookies
            if(sessionStorage.getItem('token') && sessionStorage.getItem('email') && sessionStorage.getItem('role')){
                store.commit("setConnectionStatus", true)
                store.state.token = sessionStorage.getItem('token');
                store.state.email = sessionStorage.getItem('email');
                store.state.role = sessionStorage.getItem('role');
                router.push("/")
            }else{
                var allCookies = document.cookie;

                // Diviser les cookies en un tableau
                var cookiesArray = allCookies.split('; ');

                // Parcourir le tableau pour trouver le cookie souhaité
                var cookieFound = false
                for(var i = 0; i < cookiesArray.length; i++) {
                    var cookie = cookiesArray[i];
                    var cookieName = cookie.split('=')[0];
                    var cookieValue = cookie.split('=')[1];

                    if(cookieName === 'token') {
                        cookieFound = true
                        store.state.token = cookieValue
                        sessionStorage.setItem("token",cookieValue)
                    }
                    if(cookieName === "email"){
                        store.state.email = cookieValue
                        sessionStorage.setItem("email",cookieValue)
                    }
                    if(cookieName === "email"){
                        store.state.role = cookieValue
                        sessionStorage.setItem("role",cookieValue)
                    }
                }
                if(cookieFound){
                    store.commit("setConnectionStatus", true)
                    router.push("/")
                }
            }
            
        }

    }

</script>