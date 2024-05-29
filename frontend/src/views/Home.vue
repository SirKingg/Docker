<template>
    <div class="fr-container">
        <div class="fr-grid-row fr-grid-row--center">
            <h2>Liste des ressources : </h2>
        </div>
        <div class="fr-grid-row">
            <div v-for="(item, index) in all_ressource" :key="index" class="fr-col-12 fr-col-xl-4 fr-col-lg-4 fr-col-md-6 fr-col-sm-12">
                <RessourceCard :text="item.text" :titre="item.nomRessource" :datePublication="item.datePublication" :ressourceId=item.id :utilisateur="item.utilisateur"></RessourceCard>
            </div>
        </div>
    </div>

</template>
    
<script>
import store from '@/store'
import RessourceCard from '@/components/RessourceCard.vue'

    export default {
        name: 'HomePage',
        components: {RessourceCard},
        data(){
            return {
                all_ressource: []
            }
        },
        mounted(){
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
            const options = {
                method: 'GET'
            };
            fetch(this.api_path + this.get_all_ressources,options)
            .then(res=>{
               if(res.status == 200){
                    return res.json()
                }
            }).then(data => {
                this.all_ressource = data
            }).catch(err =>{
                console.log(err)
            })

        }
    }
</script>