<template>
    <div class="fr-container">
        <div class="fr-grid-row fr-grid-row--center">
            <h2 class="fr-callout__title">{{ this.ressource.nomRessource }}</h2>
        </div>
        <div class="fr-grid-row">
            <div v-html="this.designedText"></div>
            <!-- <p>{{ this.ressource.text }}</p> -->
        </div>
        <div class="fr-grid-row">
            <figure v-if="this.fileIsImage" class="fr-content-media fr-content-media--sm" role="group" :aria-label="this.nomRessource">
                <div class="fr-content-media__img">
                    <img class="fr-responsive-img fr-ratio-16x9" :src="this.ressource.pieceJointe.cheminPieceJointe" :alt="this.filename" />
                </div>
                <figcaption class="fr-content-media__caption">{{ this.filename }}</figcaption>
            </figure>
        
            
            <p v-if="this.fileIsPresent && !this.fileIsImage">{{ this.filename }}</p>
        </div>
        <div class="fr-grid-row fr-grid-row--center">
            <a v-if="this.fileIsPresent" :href="this.ressource.pieceJointe.cheminPieceJointe" class="fr-btn fr-btn--icon-left fr-icon-file-download-fill">Télécharger la ressource</a>
        </div>
            <br>    
            <hr> 
            <br>
            <div v-if="this.userConnect">
                <div class="fr-grid-row fr-mb-3w fr-grid-row--center">

                    <label class="fr-label" for="commentaire">Saisir un commentaire</label>
                    <input class="fr-input" type="text" id="commentaire" name="text-input-text" v-model="this.text" @keypress.enter="this.sendComment()">
                </div>
                <div class="fr-grid-row fr-mb-3w fr-grid-row--center">
                    <br>
                    <input class="fr-upload" type="file" id="file-commentaire" name="text-input-text" @change="handleFileUpload" placeholder="Fichier de la ressource">
                </div>
                <div class="fr-grid-row fr-mb-3w fr-grid-row--center">
                    <!-- <input class="fr-input" autocomplete="titre" aria-required="true" aria-describedby="titre-ressource" name="titre" id="username-1757" type="file" @change="handleFileUpload" placeholder="Fichier de la ressource"> -->
                    <button class="fr-btn fr-btn--icon-left fr-icon-chat-2-fill" @click="this.sendComment()">Envoyer un commentaire</button>
                </div>
            </div>
            <div v-for="(item, index) in ressource.commentaires" :key="index" class="fr-grid-row fr-mb-3w fr-grid-row--center">
                <CommentaireView :commentaire="item"></CommentaireView>
            </div>

        </div>
    
</template>
<script>
import store from '@/store'
import router from '@/router'
import CommentaireView from '@/components/Commentaire.vue'

    export default {
        name: 'ViewRessource',
        components:{CommentaireView},
        data(){
            return {
                token: null,
                ressourceId: null,
                ressource: Object,
                imagePath : "",
                utilisateur:null,
                text:null,
                file:[]
            }
        },
        computed:{
            fileIsPresent(){
                if(this.ressource.pieceJointe != null && this.ressource.pieceJointe != "null"){
                    return true
                }else{
                    return false
                }
            },
            fileIsImage(){
                if(this.fileIsPresent){
                    let segments = this.ressource.pieceJointe.cheminPieceJointe.split(".")
                    let extension = segments[segments.length - 1];
                    if(extension == "webp" || extension == "jpg" || extension == "png" || extension == "jpeg" || extension == "gif"){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            },
            filename(){
                if(this.fileIsPresent){
                    let segments = this.ressource.pieceJointe.cheminPieceJointe.split("/")
                    return segments[segments.length - 1];
                
                }else{
                    return "No name..."
                }
            },
            designedText(){
                // a securiser en remplaceant les balise, a voir si on le fait pas plutot dans le backend pour supprimer les balises
                if(this.ressource.text != null){
                    return this.ressource.text.replace(/\r\n/g, '<br>');
                }else{
                    return ""
                }
            },
            userConnect(){
                return store.state.isConnected
            }

        },
        methods:{
            handleFileUpload(event) {
                this.file = event.target.files[0];
            },
            checkCommentaire(){
                if(this.text == null || this.text == ""){
                    return false
                }

                return true
            },
            sendComment(){
                if(this.checkCommentaire()){
                    let form = new FormData()
                    form.append("contenu", this.text)
                    if(this.file.length != 0){
                        form.append("file",this.file)
                    }else{
                        let emptyFile = new Blob([], { type: 'application/octet-stream' });
                        form.append("file",emptyFile)
                    }
                    form.append("idRessource", this.ressourceId)
                    const options = {
                        method: 'POST',
                        headers: {
                            "Authorization": "Bearer " + store.state.token
                        },
                        body:form
                    };
                    fetch(this.api_path + this.route_commentaire ,options)
                    .then(res=>{
                        if(res.status != 201){
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }else{
                            // a voir pour faire mieux
                            location.reload()
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }else{
                    console.log("no text commentaire, create modal")
                }
                
            }
        },
        mounted(){
            // Récupérer les informations utilisateur
            if(sessionStorage.getItem('token') && sessionStorage.getItem('email') && sessionStorage.getItem('role')){
                store.commit("setConnectionStatus", true)
                store.state.token = sessionStorage.getItem('token');
                store.state.email = sessionStorage.getItem('email');
                store.state.role = sessionStorage.getItem('role');
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
                }
            }
            this.token = store.state.token
            this.ressourceId = this.$route.params.id
            if(this.token != null){
                const options = {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + store.state.token
                    }
                };
                fetch(this.api_path + this.route_utilisateur, options)
                .then(res=>{
                    if(res.status == 401){
                        sessionStorage.clear()
                        store.state.token = null
                        store.state.username = null
                        store.commit("setConnectionStatus",false)
                        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                        router.push("/")
                    }else if(res.status == 200){
                        return res.json()
                    }
                })
                .then(data=>{
                    this.utilisateur = data
                }).catch(err=>{
                    console.log(err)
                })
            }
            fetch(this.api_path + this.get_all_ressources + "/" +this.$route.params.id, {method: 'GET'})
            .then(res=>{
                if(res.status == 200){
                    return res.json()
                }
            }).then(data => {
                this.ressource = data
                // if(this.ressource.pieceJointe != null && this.ressource.pieceJointe != "null"){
                //     let segments = this.ressource.pieceJointe.cheminPieceJointe.split(".")
                //     let extension = segments[segments.length - 1];
                //     if(extension == "webp" || extension == "jpg" || extension == "png" || extension == "jpeg" || extension == "gif"){
                //         fetch(this.ressource.pieceJointe.cheminPieceJointe, options)
                //         .then(res =>{
                //             if(res.status == 200){
                //                 return res.blob();
                //             }else{
                //                 this.imagePath = ""
                //             }
                //         })
                //         .then(blob =>{
                //             this.imagePath = URL.createObjectURL(blob)
                //         }).catch(err=>{
                //             console.log(err)
                //         })
                //     }
                // }
            }).catch(err =>{
                console.log(err)
            })
        }
    }
</script>
<style>
.static-comment{
    position:fixed;
}
</style>