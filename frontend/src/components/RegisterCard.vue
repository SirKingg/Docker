<template>
    <main class="fr-pt-md-14v" role="main" id="content">
    <div class="fr-container fr-container--fluid fr-mb-md-14v">
    <div class="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
    <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
        <div class="fr-container fr-background-alt--grey fr-px-md-0 fr-py-10v fr-py-md-14v">
            <div class="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                <div class="fr-col-12 fr-col-md-9 fr-col-lg-8">
                    <h1>Créer un compte (Re)Sources Relationnelles</h1>
                    <h2>{{ this.displayh2 }}</h2>
                    <div>
                        <fieldset class="fr-fieldset" id="login-1760-fieldset" aria-labelledby="login-1760-fieldset-legend login-1760-fieldset-messages">
                            <legend class="fr-fieldset__legend" id="login-1760-fieldset-legend" v-if="display_error">
                                <div class="fr-alert fr-alert--error">
                                    <h3 class="fr-alert__title">Erreur : Erreur de connexion</h3>
                                    <p>Veuillez saisir un identifiant et mot de passe valide</p>
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
                                            <input class="fr-input" autocomplete="username" aria-required="true" aria-describedby="username-1757-messages" name="username" id="username-1757" type="text" v-model="user" @keypress.enter="this.register()">
                                            <div class="fr-messages-group" id="username-1757-messages" aria-live="assertive">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fr-fieldset__element">
                                        <div class="fr-input-group">
                                            <label class="fr-label" for="nom-1757">
                                                Nom
                                            </label>
                                            <input class="fr-input" autocomplete="nom" aria-required="true" aria-describedby="nom-1757-messages" name="nom" id="nom-1757" type="text" v-model="nom" @keypress.enter="this.register()">
                                            <div class="fr-messages-group" id="nom-1757-messages" aria-live="assertive">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fr-fieldset__element">
                                        <div class="fr-input-group">
                                            <label class="fr-label" for="prenom-1757">
                                                Prénom
                                            </label>
                                            <input class="fr-input" autocomplete="prenom" aria-required="true" aria-describedby="prenom-1757-messages" name="prenom" id="prenom-1757" type="text" v-model="prenom" @keypress.enter="this.register()">
                                            <div class="fr-messages-group" id="prenom-1757-messages" aria-live="assertive">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fr-fieldset__element">
                                        <div class="fr-password" id="password-1758">
                                            <label class="fr-label" for="password-1758-input">
                                                Mot de passe
                                            </label>
                                            <div class="fr-input-wrap">
                                                <input v-if="!this.showPassword" class="fr-password__input fr-input" aria-describedby="password-1758-input-messages" aria-required="true" name="password" autocomplete="current-password" id="password-1758-input" type="password" v-model="password" @keypress.enter="this.register()">
                                                <input v-if="this.showPassword" class="fr-password__input fr-input" aria-describedby="password-1758-input-messages" aria-required="true" name="password" autocomplete="current-password" id="password-1758-input" type="text" v-model="password" @keypress.enter="this.register()">
                                            </div>
                                            <div class="fr-messages-group" id="password-1758-input-messages" aria-live="assertive">
                                            </div>
                                            <div class="fr-password__checkbox fr-checkbox-group fr-checkbox-group--sm">
                                                <input aria-label="Afficher le mot de passe" id="password-1758-show" type="checkbox" aria-describedby="password-1758-show-messages" v-model="this.showPassword">
                                                <label class="fr-password__checkbox fr-label" for="password-1758-show">
                                                    Afficher
                                                </label>
                                                <div class="fr-messages-group" id="password-1758-show-messages" aria-live="assertive">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fr-fieldset__element">
                                        <div class="fr-password" id="password-validator-1758">
                                            <label class="fr-label" for="password-validator-1758-input">
                                                Validation du mot de passe
                                            </label>
                                            <div class="fr-input-wrap">
                                                <input class="fr-password__input fr-input" aria-describedby="password-validator-1758-input-messages" aria-required="true" name="password" autocomplete="password-validator" id="password-validator-1758-input" type="password" v-model="password_validator"  @keypress.enter="this.register()">
                                            </div>
                                            <div class="fr-messages-group" id="password-validator-1758-input-messages" aria-live="assertive">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fr-messages-group" id="credentials-messages" aria-live="assertive">
                                    </div>
                                </fieldset>
                            </div>
                           
                            <div class="fr-fieldset__element">
                                <ul class="fr-btns-group">
                                    <li>
                                        <button class="fr-mt-2v fr-btn" @click="this.register()">
                                            Créer un compte
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div class="fr-messages-group" id="login-1760-fieldset-messages" aria-live="assertive">
                            </div>
                        </fieldset>
                    </div>
                    <div v-if="this.citoyensCreation">
                        <hr>
                        <h2>Vous avez déjà un compte ?</h2>
                        <ul class="fr-btns-group">
                            <li>
                                <button class="fr-btn fr-btn--secondary" @click="this.goToLogin()">
                                    Se connecter
                                </button>
                            </li>
                        </ul>
                    </div>
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
            name : "RegisterCard",
            data(){
                return{
                    user:null,
                    password:null,
                    nom:null,
                    prenom:null,
                    display_error:false,
                    password_validator:null,
                    showPassword:false

                }
            },
            props:{
                roleCreation:String
            },
            computed:{
                adminCreation(){
                    return this.roleCreation == "ADMIN"
                },
                moderateurCreation(){
                    return this.roleCreation == "MODERATEUR"
                },
                superAdminCreation(){
                    return this.roleCreation == "SUPER_ADMIN"
                },
                citoyensCreation(){
                    return this.roleCreation == "CITIZEN"
                },
                displayh2(){
                    if (this.roleCreation === "MODERATEUR") {
                        return "Création d'un modérateur";
                    } else if (this.roleCreation === "SUPER_ADMIN") {
                        return "Création d'un super admin";
                    } else if (this.roleCreation === "ADMIN") {
                        return "Création d'un admin";
                    } else {
                        return "Création d'un citoyen";
                    }
                }
            },
            methods:{
                register(){
                    if(this.checkform()){
                        let header = {
                            "Content-Type": "application/json",
                        }
                        console.log(this.citoyensCreation)
                        console.log(this.roleCreation)
                        if(!this.citoyensCreation){
                            header = {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + store.state.token
                            }
                        }
                        const options = {
                            method: 'POST',
                            headers: header,
                            body: JSON.stringify({
                                "adresseMail":this.user,
                                "password":this.password,
                                "nom":this.nom,
                                "prenom":this.prenom,
                                "cheminPhotoProfil": ""
                            })
                        };
                        let routes = this.api_path + this.route_register
                        if(this.moderateurCreation){
                            routes = this.api_path + this.route_super_admin_register_moderateur
                        }else if(this.adminCreation){
                            routes = this.api_path + this.route_super_admin_register_admin
                        }else if(this.superAdminCreation){
                            routes = this.api_path + this.route_super_admin_register_super_admin
                        }
                        console.log(options)
                        console.log(routes)
                        fetch(routes, options)
                        .then(res =>{

                            if(res.status == 201){
                                return res.json()
                            }else{
                                this.display_error = true
                                throw new Error("Not created")
                            }
                        })
                        .then(data =>{
                            if(this.citoyensCreation){
                                // TODO: Rajouter également dans les cookies 
                                // stockage dans le store vue
                                store.state.token = data.token
                                store.state.email = data.username
                                // stockage dans le session storage
                                sessionStorage.setItem("token",data.token) 
                                sessionStorage.setItem("email",data.username)
                                store.commit("setConnectionStatus", true) 
                                router.push("/")
                            }else{
                                router.push("/super-admin")
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                },
                checkform(){
                    // TODO : check this.user format adresse mail
                    // Vérification du format de l'adresse e-mail
                    let re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(this.user == null || this.user == "" || !re.test(this.user.toLowerCase())){
                        this.display_error = true
                        console.log("test mail")
                        return false
                    }
                    if(this.password != this.password_validator){
                        console.log("test mdp bis")
                        return false
                    }
                    if(this.nom == "" || this.nom == null){
                        console.log("test nom")
                        return false
                    }
                    if(this.prenom == "" || this.prenom == null){
                        console.log("test prenom")
                        return false
                    }
                    if(this.password == "" || this.password == null){
                        return false
                    }
                    if (this.password.match( /[0-9]/g) && this.password.match( /[A-Z]/g) && this.password.match(/[a-z]/g) && this.password.match( /[^a-zA-Z\d]/g) && this.password.length >= 6){
                        return true
                    } else {
                        this.display_error = true
                        console.log("test mdp")
                        return false
                    }
                },
                goToLogin(){
                    router.push("/login")
                }
            },
            mounted(){
                // TODO: Rajouter la vérification dans les cookies
                if(store.state.token == null || store.state.email == null || store.state.role == null ){
                    if(sessionStorage.getItem('token') && sessionStorage.getItem('role') && sessionStorage.getItem('email')){
                        store.state.token = sessionStorage.getItem('token');
                        store.state.role = sessionStorage.getItem('role');
                        store.state.email = sessionStorage.getItem('email');
                    }
                }
            }
        }
</script>