<template>
    <main class="fr-pt-md-14v" role="main" id="content">
        <div class="fr-container fr-container--fluid fr-mb-md-14v">
            <div class="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
                    <div class="fr-container fr-background-alt--grey fr-px-md-0 fr-py-10v fr-py-md-14v">
                        <div class="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                            <div class="fr-col-12 fr-col-md-9 fr-col-lg-8">
                                <h1>Edition du profil (Re)ssources Relationnelles</h1>
                                <div>
                                    <fieldset class="fr-fieldset" id="login-1760-fieldset" aria-labelledby="login-1760-fieldset-legend login-1760-fieldset-messages">
                                        <legend class="fr-fieldset__legend" id="login-1760-fieldset-legend" v-if="this.show_error">
                                            <div class="fr-alert fr-alert--error">
                                                <h3 class="fr-alert__title">Erreur : Erreur lors de l'édition</h3>
                                                <p>Veuillez saisir des valeurs sur tous les champs ou réessayer plus tard...</p>
                                            </div>
                                        </legend>
                                        <div class="fr-fieldset__element">
                                            <fieldset class="fr-fieldset" id="credentials" aria-labelledby="credentials-messages">
                                                <div class="fr-fieldset__element">
                                                    <div class="fr-password" id="last-password-1758">
                                                        <label class="fr-label" for="last-password-1758-input">
                                                            Ancien mot de passe
                                                        </label>
                                                        <div v-if="!this.showPassword" class="fr-input-wrap">
                                                            <input class="fr-password__input fr-input" aria-describedby="last-password-1758-input-messages" aria-required="true" name="last-password" autocomplete="current-last-password" id="last-password-1758-input" type="password" v-model="lastPassword" @keypress.enter="this.changePassword()">
                                                        </div>
                                                        <div v-if="this.showPassword" class="fr-input-wrap">
                                                            <input class="fr-password__input fr-input" aria-describedby="password-1758-input-messages" aria-required="true" name="last-password" autocomplete="current-last-password" id="last-password-1758-input" type="text" v-model="lastPassword" @keypress.enter="this.changePassword()">
                                                        </div>
                                                        <div class="fr-password__checkbox fr-checkbox-group fr-checkbox-group--sm">
                                                            <input aria-label="Afficher le mot de passe" id="last-password-1758-show" type="checkbox" aria-describedby="password-1758-show-messages" v-model="this.showPassword">
                                                            <label class="fr-password__checkbox fr-label" for="last-password-1758-show">
                                                                Afficher
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="fr-fieldset__element">
                                                    <div class="fr-password" id="password-1758">
                                                        <label class="fr-label" for="password-1758-input">
                                                            Nouveau mot de passe
                                                        </label>
                                                        <div v-if="!this.showPasswordNew" class="fr-input-wrap">
                                                            <input class="fr-password__input fr-input" aria-describedby="password-1758-input-messages" aria-required="true" name="password" autocomplete="current-password" id="password-1758-input" type="password" v-model="newPasswod" @keypress.enter="this.changePassword()">
                                                        </div>
                                                        <div v-if="this.showPasswordNew" class="fr-input-wrap">
                                                            <input class="fr-password__input fr-input" aria-describedby="password-1758-input-messages" aria-required="true" name="password" autocomplete="current-password" id="password-1758-input" type="text" v-model="newPasswod" @keypress.enter="this.changePassword()">
                                                        </div>
                                                        <div class="fr-password__checkbox fr-checkbox-group fr-checkbox-group--sm">
                                                            <input aria-label="Afficher le mot de passe" id="password-1758-show" type="checkbox" aria-describedby="password-1758-show-messages" v-model="this.showPasswordNew">
                                                            <label class="fr-password__checkbox fr-label" for="password-1758-show">
                                                                Afficher
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="fr-fieldset__element">
                                                    <div class="fr-password" id="password-validator-1758">
                                                        <label class="fr-label" for="password-validator-1758-input">
                                                            Validation du nouveau mot de passe
                                                        </label>
                                                        <div class="fr-input-wrap">
                                                            <input class="fr-password__input fr-input" aria-describedby="password-validator-1758-input-messages" aria-required="true" name="password" autocomplete="password-validator" id="password-validator-1758-input" type="password" v-model="validationPassword"  @keypress.enter="this.register()">
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
                                                    <button class="fr-mt-2v fr-btn" @click="this.changePassword()">
                                                        Modifier
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="fr-mt-2v fr-btn" @click="this.gotToEdit()">
                                                        Changer les informations utilisateur
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </template>
    
    <script>
    import router from '@/router'
    import store from '@/store'
    
    export default {
        name:"ProfilePage",
        data() {
            return {
                newPasswod:null,
                lastPassword:null,
                validationPassword:null,
                showPassword:false,
                showPasswordNew:false,
                show_error:false
            };
        },
        methods: {
            gotToEdit(){
                router.push("/profil-page")
            },
            checkForm(){
                if(this.newPasswod == "" || this.newPasswod == null){
                    return false
                }
                if(this.lastPassword == "" || this.lastPassword == null){
                    return false
                }
                if(this.validationPassword == "" || this.validationPassword == null){
                    return false
                }
                if(this.newPasswod != this.validationPassword){
                    return false
                }
                if(this.newPasswod == this.lastPassword){
                    return false
                }
                return true

            },
            changePassword(){
                if(this.checkForm()){
                    let form = new FormData()
    
                    form.append("newPassword",this.newPasswod)
                    form.append("lastPassword",this.lastPassword)

                    const options = {
                        method: 'PUT',
                        headers: {
                            "Authorization": "Bearer " + store.state.token
                        },
                        body:form
                    };
                    fetch(this.api_path + this.route_utilisateur + "/update-password" ,options)
                    .then(response=>{
                        if(response.status == 200){
                            router.push("/home")
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.show_error = true
                }
            }
        },
        mounted(){
            if(store.state.token == null){
                if(sessionStorage.getItem('token')){
                    store.state.token = sessionStorage.getItem('token');
                }else{
                    sessionStorage.clear()
                    store.state.token = null
                    store.state.username = null
                    store.commit("setConnectionStatus",false)
                    router.push("/")
                }
            }
        }
    };
    </script>