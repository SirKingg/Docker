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
                                            <h3 class="fr-alert__title">Erreur : Erreur lors de l'edition</h3>
                                            <p>Veuillez saisir des valeurs sur tous les champs ou réssayer plus tard...</p>
                                        </div>
                                    </legend>
                                    <figure class="fr-content-media fr-content-media--sm" role="group" aria-label="photo de profil">
                                        <div class="fr-content-media__img">
                                            <img class="fr-responsive-img fr-ratio-16x9" :src="this.imagePath" alt="photo de profil" />
                                        </div>
                                    </figure>
                                    <div class="fr-fieldset__element">
                                        <fieldset class="fr-fieldset" id="credentials" aria-labelledby="credentials-messages">
                                            <div class="fr-fieldset__element">
                                                <div class="fr-input-group">
                                                    <label class="fr-label" for="username-1757">
                                                        Identifiant
                                                        <span class="fr-hint-text">Format attendu : nom@domaine.fr</span>
                                                    </label>
                                                    <input class="fr-input" autocomplete="username" aria-required="true" aria-describedby="username-1757-messages" name="username" id="username-1757" type="text" v-model="this.email" @keypress.enter="this.edit()">
                                                    <div class="fr-messages-group" id="username-1757-messages" aria-live="assertive">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fr-fieldset__element">
                                                <div class="fr-input-group">
                                                    <label class="fr-label" for="username-1757">
                                                        Nom
                                                    </label>
                                                    <input class="fr-input" autocomplete="username" aria-required="true" aria-describedby="username-1757-messages" name="username" id="username-1757" type="text" v-model="this.nom" @keypress.enter="this.edit()">
                                                    <div class="fr-messages-group" id="username-1757-messages" aria-live="assertive">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fr-fieldset__element">
                                                <div class="fr-input-group">
                                                    <label class="fr-label" for="username-1757">
                                                        Prénom
                                                    </label>
                                                    <input class="fr-input" autocomplete="username" aria-required="true" aria-describedby="username-1757-messages" name="username" id="username-1757" type="text" v-model="this.prenom" @keypress.enter="this.edit()">
                                                    <div class="fr-messages-group" id="username-1757-messages" aria-live="assertive">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fr-fieldset__element">
                                                <div class="fr-password" id="password-1758">
                                                    <label class="fr-label" for="password-1758-input">
                                                       Insérer une photo de profil
                                                    </label>
                                                    <div class="fr-input-wrap">
                                                        <input class="fr-upload" type="file" id="file-commentaire" name="text-input-text" @change="this.handleFileUpload" placeholder="Photo de profil">
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="fr-fieldset__element">
                                        <ul class="fr-btns-group">
                                            <li>
                                                <button class="fr-mt-2v fr-btn" @click="this.edit">
                                                    Modifier
                                                </button>
                                            </li>
                                            <li>
                                                <button class="fr-mt-2v fr-btn" @click="this.goToChangePassword">
                                                    Changer de mot de passe
                                                </button>
                                            </li>
                                            <li>
                                                <button class="fr-mt-2v fr-btn color-red-fr" @click="this.showModalDelete = true">
                                                    Suppression du profil
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
<div v-if="showModalDelete" class="modal">
        <div class="fr-modal__body modal-content">
            <div class="fr-modal__header">
                <button class="fr-btn--close fr-btn" aria-controls="fr-modal-2" @click="this.closeModalDelete()">Fermer</button>
            </div>
            <div class="fr-modal__content">
                <h1 id="fr-modal-2-title" class="fr-modal__title">
                    <span class="fr-icon-arrow-right-line fr-icon--lg"></span>
                    Êtes-vous sur de vouloir supprimer votre compte ?
                </h1>
                <p>La suppression de votre compte supprimera toutes vos ressources, commentaires, images, et réponses de façon définitive.</p>
            </div>
            <div class="fr-modal__footer">
                <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                    <button class="fr-btn fr-btn--icon-left fr-icon-delete-fill color-red-fr" @click="this.delete">Supprimer votre compte</button>
                    <button class="fr-btn fr-btn--icon-left fr-icon-close-circle-fill" @click="this.closeModalDelete()">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router'
import store from '@/store'

export default {
    name:"ProfilePage",
    data() {
        return {
            id:null,
            nom:null,
            prenom:null,
            email:null,
            imagePath:null,
            file:[],
            show_error:false,
            showModalDelete:false
        };
    },
    methods: {
        goToChangePassword(){
            router.push("/change-password")
        },
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        edit(){
            let form = new FormData()

            form.append("nom",this.nom)
            form.append("prenom",this.prenom)
            form.append("adresseMail",this.email)

            if(this.file.length != 0){
                form.append("file",this.file)
            }else{
                let emptyFile = new Blob([], { type: 'application/octet-stream' });
                form.append("file",emptyFile)
            }
            form.append("deleteOldFile", false)
            const options = {
                method: 'PUT',
                headers: {
                    "Authorization": "Bearer " + store.state.token
                },
                body:form
            };
            fetch(this.api_path + this.route_utilisateur + "/" + this.id ,options)
            .then(response=>{
                if(response.status == 200){
                    router.push("/")
                }
            })
            .catch(err=>{
                console.log(err)
            })
            
        },
        delete(){
            // send delete
            const options = {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + store.state.token
                }
            };
            fetch(this.api_path + this.route_utilisateur + "/" + this.id ,options)
            .then(response=>{
                if(response.status == 200){
                    // if okay 
                    sessionStorage.clear()
                    store.state.token = null
                    store.state.email = null
                    store.commit("setConnectionStatus",false)
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                    router.push("/")
                }else{
                    this.show_error = true
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        closeModalDelete() {
            this.showModalDelete = false;
        }
    },
    mounted(){
        if(store.state.token == null){
            if(sessionStorage.getItem('token')){
                store.state.token = sessionStorage.getItem('token');
            }
        }
        const options =  {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + store.state.token
            },
        }
        fetch(this.api_path + this.route_utilisateur,options)
        .then(response=>{
            if(response.status == 401){
                sessionStorage.clear()
                store.state.token = null
                store.state.email = null
                store.commit("setConnectionStatus",false)
                router.push("/")
            }
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }else{
                return response.json()
            }

        }).then(data=>{
            this.id = data.id
            this.email = data.adresseMail
            this.prenom = data.prenom
            this.nom = data.nom
            this.imagePath = data.cheminPhotoProfil
        }).catch(erreur=>{
            console.log(erreur)
        })
    }
};
</script>
<style scoped>
  .modal {
    display: block;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    position: fixed; /* Positionnement fixe par rapport à la fenêtre du navigateur */
    top: 50%; /* Positionnement à 50% du haut de la page */
    left: 50%; /* Positionnement à 50% de la gauche de la page */
    transform: translate(-50%, -50%); /* Déplace l'élément vers le haut et vers la gauche de 50% de sa propre taille */
    padding: 20px;
    width: 80%;
    }
  .get-full-height{
    height: 100%!important;
    /* width: 90% !important; */
  }
</style>