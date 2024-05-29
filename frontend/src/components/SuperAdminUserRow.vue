<template>
    <td><img v-if='this.cheminPhotoProfil != ""' class="profil-picture" :src="this.cheminPhotoProfil" alt="photo de profil"></td>
    <td>[{{ this.id }}]</td> 
    <td>{{ this.nom }}</td>
    <td>{{ this.prenom }}</td> 
    <td>{{ this.adresseMail }}</td> 
    <td>{{ this.dateDesactivation }}</td>
    <td>{{ this.role }}</td>
    <td>{{ this.status }}</td>
</template>
        
    <script>
        import store from '@/store'
        import router from '@/router'
    
        export default {
            name: 'SuperAdminUserRow',
            data(){
                return{
                }
            },
            props:{
                id:Number,
                nom: String,
                prenom : String,
                adresseMail: String,
                cheminPhotoProfil:String,
                dateDesactivation:String,
                role:String
            },
            computed:{
                status(){
                    let now = new Date();
                    let date = new Date(this.dateDesactivation)
                    if( date < now){
                        return "ACTIF"
                    }else{
                        return "INACTIF"
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
    