<template>

    <div class="fr-search-bar" id="header-search" role="search">
    <label class="fr-label" for="search-784-input">
        Recherche
    </label>
    <input class="fr-input" placeholder="Rechercher" type="search" id="search-784-input" name="search-784-input" v-model="this.findUser">
    </div>
    <div class="fr-table">
        <table>
            <caption>Liste des utilisateur</caption>
            <thead>
                <tr>
                    <th scope="col">image</th>
                    <th scope="col">ID</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Addresse Mail</th>
                    <th scope="col">Date de désactivation</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(item, index) in this.filter_user" :key="index">
                    <AdminUserRow 
                                :id="item.id"
                                :nom="item.nom"
                                :prenom="item.prenom"
                                :adresseMail="item.adresseMail"
                                :cheminPhotoProfil="item.cheminPhotoProfil"
                                :dateDesactivation=item.dateDesactive
                                ></AdminUserRow>
                </tr>
            </tbody>
        </table>
    </div>
    
</template>
    
<script>
    import store from '@/store';
    import AdminUserRow from '@/components/AdminUserRow.vue'
    import router from '@/router'
    export default {
        name: 'AdminUser',
        components:{AdminUserRow},
        data(){
            return{
                all_user:[],
                findUser:""
            }
        },
        computed:{
            filter_user(){
                let filtre = []
                for(let user of this.all_user){
                    if(user.role.nom == "CITIZEN"){
                        if(this.findUser!=null && this.findUser != ""){
                            if(user.nom.includes(this.findUser) || user.prenom.includes(this.findUser) || user.adresseMail.includes(this.findUser)){
                                filtre.push(user)
                            }
                        }else{
                            filtre.push(user)
                        }
                    }
                }
                return filtre
            }
        },
        mounted(){
            if(store.state.token == null || store.state.email == null || store.state.role == null ){
                if(sessionStorage.getItem('token') && sessionStorage.getItem('role') && sessionStorage.getItem('email')){
                    store.state.token = sessionStorage.getItem('token');
                    store.state.role = sessionStorage.getItem('role');
                    store.state.email = sessionStorage.getItem('email');
                }
            }
            if(store.state.role == "ADMIN" || store.state.role == "SUPER_ADMIN"){
                const options = {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + store.state.token
                    }
                };
                fetch(this.api_path + this.route_admin_get_all_user ,options)
                .then(res=>{
                    if(res.status == 401){
                        router.push("/")
                    }else if(res.status == 200){
                        return res.json()
                    }

                })
                .then(data=>{
                    this.all_user = data
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                router.push("/")
            }
        }
    }
</script>
