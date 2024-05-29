<template>
    <div class="fr-container" v-if="!this.isRemoved">
        
        <div class="fr-grid-row fr-mb-3w remove-bottom-margin">
            <div class="fr-col-1">
                <img class="profil-picture" :src="this.user.cheminPhotoProfil" alt="photo de profil">
            </div>
            <div class="fr-col-11">
                <span class="fr-quote__author">[{{ this.user.nom }} {{  this.user.prenom }}]</span>
            </div>
        </div>
        <div class="fr-grid-row fr-mb-3w remove-bottom-margin">
            <div class="fr-col-10">
                <p>{{ this.commentaire.contenu }}</p>
            </div>
            <div class="fr-col-2">
                <div v-if="this.isMyComment">
                    <button class="fr-btn fr-btn--icon-left fr-icon-delete-fill color-red-fr" @click="this.showModalDelete = true"></button>
                </div>
            </div>
        </div>
        <div class="fr-grid-row fr-mb-3w">
            <div class="fr-col-6" v-if="this.userConnect">
                <button class="fr-btn--icon-left fr-icon-add-circle-fill color-blue-fr" @click="this.showModal = true">Ajouter une réponse</button>
            </div>
            <div class="fr-col-6">
                <a v-if="this.fileIsPresent" :href="this.commentaire.pieceJointe.cheminPieceJointe" class="fr-btn--icon-left fr-icon-file-download-fill color-blue-fr" :alt="this.ressourceFilename">Télécharger la ressource</a>
            </div>
            
        </div>
        <button v-if="!this.showReponse && this.commentHaveReponse" class="fr-btn fr-btn--icon-left fr-icon-add-circle-fill" @click="this.showReponse = true">afficher les réponses</button>
        <button v-if="this.showReponse && this.commentHaveReponse" class="fr-btn fr-btn--icon-left fr-icon-subtract-line" @click="this.showReponse = false">masquer les réponses</button>
        <div v-if="this.showReponse">
            <br>
            <hr>
            <div  v-for="(item, index) in this.commentaire.reponses" :key="index">
                <ReponseView :reponse="item"></ReponseView>
            </div>
        </div>
    </div>
    <div v-if="showModal" class="modal">
        <div class="fr-modal__body modal-content">
            <div class="fr-modal__header">
                <button class="fr-btn--close fr-btn" aria-controls="fr-modal-2" @click="this.closeModal()">Fermer</button>
            </div>
            <div class="fr-modal__content">
                <h1 id="fr-modal-2-title" class="fr-modal__title">
                    <span class="fr-icon-arrow-right-line fr-icon--lg"></span>
                    Saisir une réponse
                </h1>
                <input class="fr-input" type="text" id="reponse" name="text-input-text" v-model="this.reponse" @keypress.enter="this.sendReponse()" placeholder="Saisir une réponse">
                <input class="fr-upload" type="file" id="file-commentaire" name="text-input-text" @change="handleFileUpload" placeholder="Fichier de la ressource">
            </div>
            <div class="fr-modal__footer">
                <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                    <button class="fr-btn fr-btn--icon-left fr-icon-chat-2-fill" @click="this.sendReponse()">Envoyer une reponse</button>
                </div>
            </div>
        </div>
    </div>

    <div v-if="showModalDelete" class="modal">
        <div class="fr-modal__body modal-content">
            <div class="fr-modal__header">
                <button class="fr-btn--close fr-btn" aria-controls="fr-modal-2" @click="this.closeModalDelete()">Fermer</button>
            </div>
            <div class="fr-modal__content">
                <h1 id="fr-modal-2-title" class="fr-modal__title">
                    <span class="fr-icon-arrow-right-line fr-icon--lg"></span>
                    Voulez-vous supprimer le commentaire ?
                </h1>
            </div>
            <div class="fr-modal__footer">
                <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                    <button class="fr-btn fr-btn--icon-left fr-icon-delete-fill color-red-fr" @click="this.deleteCommentaire()">Supprimer le commentaire</button>
                    <button class="fr-btn fr-btn--icon-left fr-icon-close-circle-fill" @click="this.closeModalDelete()">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from "@/store"
    import ReponseView from '@/components/Reponse.vue'
    // Permet de gérer le composant Vue
    export default{
        // Paramètres
        name : "CommentaireView",
        // Appel le composant utilisé dans cette Vue
        components:{ReponseView},
        // Paramètres que l'on peut mettre quand on crée le composant, ici "CommentaireView"
        props:{
            commentaire:Object
        },
        // Toutes les variables liées au composant
        data(){
            return{
                isRemoved:false,
                reponse:null,
                file:[],
                showModal:false,
                showReponse:false,
                showModalDelete:false,
                user:this.commentaire.utilisateur
            }
        },
        // Variables calculées => 
        computed:{
            isMyComment(){
                if(this.commentaire.utilisateur.adresseMail == store.state.email || store.state.role == "MODERATEUR" || store.state.role == "ADMIN" || store.state.role == "SUPER_ADMIN"){
                    return true
                }else{
                    return false
                }
            },
            commentHaveReponse(){
                if(this.commentaire.reponses.length == 0){
                    return false
                }else{
                    return true
                }
            },
            fileIsPresent(){
                if(this.commentaire.pieceJointe != null && this.commentaire.pieceJointe != "null"){
                    return true
                }else{
                    return false
                }
            },
            ressourceFilename(){
                if(this.commentaire.pieceJointe != null && this.commentaire.pieceJointe != "null"){
                    let segments = this.commentaire.pieceJointe.cheminPieceJointe.split("/")
                    let filename = segments[segments.length - 1]
                    return filename
                }else{
                    return ""
                }
            },
            userConnect(){
                return store.state.isConnected
            }
        },
        // Méthodes/Fonctions du composant
        methods:{
            handleFileUpload(event) {
                this.file = event.target.files[0];
            },
            checkreponse(){
                if(this.reponse == null || this.reponse == ""){
                    return false
                }
                return true
            },
            closeModal() {
                this.showModal = false;
            },
            closeModalDelete() {
                this.showModalDelete = false;
            },
            sendReponse(){
                if(this.checkreponse()){
                    let form = new FormData()
                    form.append("text",this.reponse)
                    form.append("idCommentaire", this.commentaire.id)
                    if(this.file.length != 0){
                        form.append('file', this.file)
                    }else{
                        let emptyFile = new Blob([], { type: 'application/octet-stream' });
                        form.append("file",emptyFile)
                    }
                    const options = {
                        method: 'POST',
                        headers: {
                            "Authorization": "Bearer " + store.state.token
                        },
                        body:form
                    };
                    fetch(this.api_path + this.route_reponse ,options)
                    .then(res=>{
                        if(res.status != 201){
                            throw new Error("No reponse send")
                        }else{
                            location.reload()
                            // return res.json()
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }else{
                    console.log("no reponse, create modal")
                }
                
            },
            deleteCommentaire(){
                const options = {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + store.state.token
                    }
                };
                fetch(this.api_path + this.route_commentaire + "/" + this.commentaire.id ,options)
                .then(res=>{
                    if(res.status != 200){
                        throw new Error("is not deleted")
                    }else{
                        this.isRemoved = true
                        this.showModalDelete = false;
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        // Ce qu'il se passe au moment de la création du DOM
        mounted(){
            if(store.state.token == null || store.state.email == null || store.state.role == null){
                if(sessionStorage.getItem('token') && sessionStorage.getItem('email') && sessionStorage.getItem('role')){
                    store.state.token = sessionStorage.getItem('token');
                    store.state.email = sessionStorage.getItem('email');
                    store.state.role = sessionStorage.getItem('role');
                }
            }
        }

    }

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
  .remove-bottom-margin{
    margin-bottom: 0px !important;
  }
  .color-blue-fr{
    color:#000091;
  }

  .profil-picture {
    position: relative;
    display: inline-block;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    border: 1px solid #deebff;
    text-align: center;
    margin-right: 6px;
    margin-left: 10px;
    object-fit: cover;
  }

</style>