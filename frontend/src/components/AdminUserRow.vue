<template>
    <td><img v-if='this.cheminPhotoProfil != ""' class="profil-picture" :src="this.cheminPhotoProfil" alt="photo de profil"></td>
    <td>[{{ this.id }}]</td> 
    <td>{{ this.nom }}</td>
    <td>{{ this.prenom }}</td> 
    <td>{{ this.adresseMail }}</td> 
    <td>{{ this.dateDesactivation }}</td>
    <td>{{ this.status }}</td>
    <td><button class="fr-btn" @click="this.showModal()">{{ this.buttonDisplay }}</button></td>

    <div v-if="showModalDisable" class="modal">
        <div class="fr-modal__body modal-content">
            <div class="fr-modal__header">
                <button class="fr-btn--close fr-btn" aria-controls="fr-modal-2" @click="this.closeModal()">Fermer</button>
            </div>
            <div class="fr-modal__content">
                <h1 id="fr-modal-2-title" class="fr-modal__title">
                    <span class="fr-icon-arrow-right-line fr-icon--lg"></span>
                    Combien de temps souhaitez-vous désactiver le compte de {{  this.nom }} - {{ this.prenom }} <span> {{ this.adresseMail }}</span> ?
                </h1>
                <label class="fr-label" for="text-input-text">Choisir le nombre de jour à désactiver le compte :</label>
                <input class="fr-input" type="number" id="number-input" name="number-input" v-model="this.timeEnable" placeholder="Temps de désactivation en jour">
            </div>
            <div class="fr-modal__footer">
                <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">

                    <button class="fr-btn fr-btn--icon-left fr-icon-delete-fill color-red-fr" @click="this.switchUserStatus()">Désactiver le compte</button>
                    <button class="fr-btn fr-btn--icon-left fr-icon-close-circle-fill" @click="this.closeModal()">Annuler</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showModalEnable" class="modal">
        <div class="fr-modal__body modal-content">
            <div class="fr-modal__header">
                <button class="fr-btn--close fr-btn" aria-controls="fr-modal-2" @click="this.closeModal()">Fermer</button>
            </div>
            <div class="fr-modal__content">
                <h1 id="fr-modal-2-title" class="fr-modal__title">
                    <span class="fr-icon-arrow-right-line fr-icon--lg"></span>
                    Voulez-vous vraiment réactiver le compte ?
                </h1>
            </div>
            <div class="fr-modal__footer">
                <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">

                    <button class="fr-btn fr-btn--icon-left fr-icon-checkbox-fill" @click="this.switchUserStatus()">Réactiver le compte</button>
                    <button class="fr-btn fr-btn--icon-left fr-icon-close-circle-fill" @click="this.closeModal()">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>
        
    <script>
        import store from '@/store'
        import router from '@/router'
    
        export default {
            name: 'AdminUserRow',
            data(){
                return{
                    showModalDisable:false,
                    showModalEnable:false,
                    timeEnable:7
                }
            },
            props:{
                id:Number,
                nom: String,
                prenom : String,
                adresseMail: String,
                cheminPhotoProfil:String,
                dateDesactivation:String
            },
            computed:{
                status(){
                    let now = new Date();
                    let parties = this.dateDesactivation.split(/[-T:+]/);
                    let dateDesa = new Date(parties[0], parties[1] - 1, parties[2], parties[3], parties[4], parties[5]);
                    console.log(now)
                    console.log(dateDesa)
                    if( dateDesa < now){
                        return "ACTIF"
                    }else{
                        return "INACTIF"
                    }
                },
                buttonDisplay(){
                    if(this.status == "ACTIF"){
                        return "DESACTIVER"
                    }else{
                        return "ACTIVER"
                    }
                }
            },
            methods:{
                switchUserStatus(){
                    if(this.status == "ACTIF"){
                        let form = new FormData()
                        form.append("nbJour",this.timeEnable)
                        const options = {
                                method: 'POST',
                                headers: {
                                    "Authorization": "Bearer " + store.state.token
                                },
                                body:form
                        };
                        fetch(this.api_path + this.route_admin_disable + "/"+ this.id ,options)
                        .then(res=>{
                            if(res.status == 401){
                                router.push("/")
                            }else if(res.status == 200){
                                location.reload()
                            }

                        })
                        .catch(err=>{
                            console.log(err)
                        })

                    }else{
                        const options = {
                                method: 'POST',
                                headers: {
                                    "Authorization": "Bearer " + store.state.token
                                }
                        };
                        fetch(this.api_path + this.route_admin_enable + "/"+ this.id ,options)
                        .then(res=>{
                            if(res.status == 401){
                                router.push("/")
                            }else if(res.status == 200){
                                location.reload()
                            }

                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                },
                closeModal(){
                    this.showModalDisable = false
                    this.showModalEnable = false
                },
                showModal(){
                    if(this.status == "ACTIF"){
                        this.showModalDisable = true
                    }else{
                        this.showModalEnable = true
                    }
                }
            },
            mounted(){
                if(store.state.token == null || store.state.email == null || store.state.role == null){
                    if(sessionStorage.getItem('token') || sessionStorage.getItem("email") || sessionStorage.getItem("role")){
                        store.commit("setConnectionStatus", true)
                        store.state.token = sessionStorage.getItem('token');
                        store.state.email = sessionStorage.getItem('email');
                        store.state.role = sessionStorage.getItem('role');
                    }else{
                        router.push("/")
                    }
                }
            }
        }
    </script>

<style>
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
    