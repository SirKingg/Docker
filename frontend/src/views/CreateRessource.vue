<template>

<main class="fr-pt-md-14v" role="main" id="content">
    <div class="fr-container fr-container--fluid fr-mb-md-14v">
        <div class="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
            <div class="fr-container fr-background-alt--grey fr-px-md-0 fr-py-10v fr-py-md-14v">
                <div class="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                    <div class="fr-col-12 fr-col-md-9 fr-col-lg-8">
                        <h1>Création d'une ressource</h1>
                        <div>
                            <fieldset class="fr-fieldset" id="login-1760-fieldset" aria-labelledby="login-1760-fieldset-legend login-1760-fieldset-messages">
                                
                                <div class="fr-fieldset__element">
                                    <fieldset class="fr-fieldset" id="ressource" aria-labelledby="credentials-messages">
                                        <div class="fr-fieldset__element">
                                            <div class="fr-input-group">
                                                <label class="fr-label" for="titre-1757">
                                                    Titre de la ressource
                                                    <span class="fr-hint-text">Définition claire et conscise de la ressource</span>
                                                </label>
                                                <input v-model="this.titre" class="fr-input" autocomplete="titre" aria-required="true" aria-describedby="titre-1757-messages" name="titre" id="titre-1757" type="text">
                                            </div>
                                        </div>
                                        <div class="fr-fieldset__element">
                                            <div class="fr-password" id="password-1758">
                                                <label class="fr-label" for="text-1758-input">
                                                   Texte de la ressource
                                                </label>
                                                <div class="fr-input-wrap">
                                                    <textarea class="fr-input" aria-describedby="text-1758-input-messages" aria-required="true" name="text" id="text-1758-input" v-model="this.text"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="fr-fieldset__element">
                                            <div class="fr-password" id="password-1758">
                                                <label class="fr-label" for="password-1758-input">
                                                   Insérer un fichier
                                                </label>
                                                <div class="fr-input-wrap">
                                                    <input class="fr-upload" type="file" id="file-commentaire" name="text-input-text" @change="handleFileUpload" placeholder="Fichier de la ressource">
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="fr-fieldset__element">
                                    <ul class="fr-btns-group">
                                        <li>
                                            <button class="fr-mt-2v fr-btn" @click="createRessource">
                                                Créer la ressource
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
</main>

</template>
    
<script>
    import store from "@/store"
    import router from "@/router"
    export default {
        name: 'ViewRessource',
        data(){
            return {
                token: null,
                text:null,
                titre:null,
                file:[]

            }
        },
        methods:{
            handleFileUpload(event) {
                this.file = event.target.files[0];
            },
            createRessource(){
                let form = new FormData()
                if(this.file.length != 0){
                    form.append('file', this.file)
                }else{
                    let emptyFile = new Blob([], { type: 'application/octet-stream' });
                    form.append("file",emptyFile)
                }
                form.append('texte', this.text)
                form.append("nomRessource", this.titre)
                const options = {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + this.token
                    },
                    body:form
                };
                fetch(this.api_path + this.route_ressources,options)
                .then(res =>{
                    if(res.status == 201){
                        router.push("/")
                    }else if(res.status == 401){
                        sessionStorage.clear()
                        store.state.token = null
                        store.state.email = null
                        store.commit("setConnectionStatus",false)
                        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                        router.push("/login")
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        mounted(){
            if(store.state.token == null){
                if(sessionStorage.getItem('token')){
                    store.state.token = sessionStorage.getItem('token');
                }else{
                    sessionStorage.clear()
                    store.state.token = null
                    store.state.email = null
                    store.commit("setConnectionStatus",false)
                    router.push("/")
                }
            }
            this.token = store.state.token
        }
    }
</script>