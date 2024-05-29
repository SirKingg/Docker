<template>
    
    <ul class="fr-btns-group">
        <li>
            <button class="fr-btn" @click="this.createSuperAdmin()">Création d'un super admin</button>
        </li>
        <li>
            <button class="fr-btn" @click="this.createAdmin()">Création d'un admin</button>
        </li>
        <li>
            <button class="fr-btn" @click="this.createModerateur()">Création d'un modérateur</button>
        </li>
    </ul>
    <div class="fr-table">
        <table>
            <caption>Liste des utilisateurs</caption>
            <thead>
                <tr>
                    <th scope="col">image</th>
                    <th scope="col">ID</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Addresse Mail</th>
                    <th scope="col">Date de désactivation</th>
                    <th scope="col">Rôle</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(item, index) in this.all_user" :key="index">
                    <SuperAdminUserRow 
                                :id="item.id"
                                :nom="item.nom"
                                :prenom="item.prenom"
                                :adresseMail="item.adresseMail"
                                :cheminPhotoProfil="item.cheminPhotoProfil"
                                :dateDesactivation=item.dateDesactive
                                :role="item.role.nom"
                                ></SuperAdminUserRow>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<script>
    import store from '@/store'
    import router from '@/router'
    import SuperAdminUserRow from '@/components/SuperAdminUserRow.vue'
    export default {
        name: 'SuperAdminCard',
        components:{SuperAdminUserRow},
        data(){
            return{
                all_user:[]
            }
        },
        methods:{
            createAdmin(){
                router.push("/register-admin/ADMIN")
            },
            createSuperAdmin(){
                router.push("/register-admin/SUPER_ADMIN")
            },
            createModerateur(){
                router.push("/register-admin/MODERATEUR")
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

            const options = {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + store.state.token
                    }
            };
            fetch(this.api_path + this.route_super_admin_get_all_user ,options)
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
           
        }
    }
</script>

<style scoped>
    .fr-btns-group>li{
        width: 50%;
        padding: 10px;
    }

    .fr-table{
        margin-left: 1rem;
    }
</style>