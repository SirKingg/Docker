<template>
    <header role="banner" class="fr-header">
        <div class="fr-header__body">
            <div class="fr-container">
                <div class="fr-header__body-row">
                    <div class="fr-header__brand fr-enlarge-link">
                        <div class="fr-header__brand-top">
                            <div class="fr-header__logo">
                                <p class="fr-logo">
                                    MINISTÈRE
                                    <br>DES SOLIDARITÉS
                                    <br>ET DE LA SANTÉ
                                </p>
                            </div>
                            <div class="fr-header__navbar">
                                <button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-499" aria-haspopup="menu" id="button-500" title="Menu" @click="this.showMenu = !this.showMenu">Menu</button>
                            </div>
                        </div>
                        <div class="fr-header__service">
                            <a href="/" title="Accueil - (Re)Source Relationnelles">
                                <p class="fr-header__service-title">
                                    (Re)Sources Relationnelles
                                </p>
                            </a>
                            <p class="fr-header__service-tagline">Plateforme de partage de ressources entre citoyens</p>
                        </div>
                    </div>
                    <div class="fr-header__tools">
                        <div class="fr-header__tools-links">
                            <ul class="fr-btns-group">
                                <li v-if="this.userConnect">
                                    <a class="fr-btn fr-icon-add-circle-line" href="#" @click="this.goToCreate()">
                                        Ajouter une ressource
                                    </a>
                                </li>
                                <li v-if="!this.userConnect">
                                    <a class="fr-btn fr-icon-lock-line" href="#" @click="this.gologin()">
                                        Se connecter
                                    </a>
                                </li>
                                <li v-if="!this.userConnect">
                                    <a class="fr-btn fr-icon-account-line" href="#"  @click="this.gotoRegister()">
                                        S’enregistrer
                                    </a>
                                </li>
                                <li v-if="this.userConnect">
                                    <a class="fr-btn fr-icon-edit-box-fill" href="#" @click="this.gotoProfilePage()">
                                        Edition profil
                                    </a>
                                </li>
                                <li v-if="this.isAdmin">
                                    <a class="fr-btn fr-icon-user-search-fill" href="#" @click="this.goToAdminUser()">
                                        Administration utilisateur
                                    </a>
                                </li>
                                <li v-if="this.isSuperAdmin">
                                    <a class="fr-btn fr-icon-information-fill" href="#" @click="this.goToSuperAdmin()">
                                        Role Création
                                    </a>
                                </li>
                                <li v-if="this.userConnect">
                                    <a class="fr-btn fr-icon-logout-box-r-fill" href="#" @click="this.unconnected()">
                                        Se déconnecter
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fr-header__menu fr-modal" id="modal-499" aria-labelledby="button-500">
            <div class="fr-container">
                <button class="fr-btn--close fr-btn" aria-controls="modal-499" title="Fermer">
                    Fermer
                </button>
            </div>
        </div>
    </header>

<div v-if="this.showMenu" class=".fr-menu-collapsed">
    <div class="fr-container">
        <!-- <button class="fr-btn--close fr-btn" aria-controls="modal-499" title="Fermer" @click="this.showMenu = false">
            Fermer
        </button> -->
        <div class="fr-header__menu-links">
            <nav class="fr-nav" id="navigation-499" role="navigation" aria-label="Menu principal">
                <ul class="fr-nav__list">
                    <li v-if="this.userConnect" class="fr-nav__item">
                        <a class="fr-nav__link fr-icon-add-circle-line color-blue-fr" href="#" @click="this.goToCreate()">
                            Ajouter une ressource
                        </a>
                    </li>
                    <li v-if="!this.userConnect" class="fr-nav__item">
                        <a class="fr-nav__link fr-icon-lock-line color-blue-fr" href="#" @click="this.gologin()">
                            Se connecter
                        </a>
                    </li>
                    <li v-if="!this.userConnect" class="fr-nav__item">
                        <a class="fr-nav__link fr-icon-account-line color-blue-fr" href="#"  @click="this.gotoRegister()">
                            S’enregistrer
                        </a>
                    </li>
                    <li v-if="this.userConnect" class="fr-nav__item">
                        <a class="fr-nav__link fr-icon-edit-box-fill color-blue-fr" href="#" @click="this.gotoProfilePage()">
                            Edition profil
                        </a>
                    </li>
                    <li v-if="this.userConnect" class="fr-nav__item">
                        <a class="fr-nav__link fr-icon-user-search-fill color-blue-fr" href="#" @click="this.goToAdminUser()">
                            Administration utilisateur
                        </a>
                    </li>
                    <li v-if="this.userConnect" class="fr-nav__item">
                        <a class="fr-nav__link fr-icon-information-fill color-blue-fr" href="#" @click="this.goToSuperAdmin()">
                            Role Création
                        </a>
                    </li>
                    <li v-if="this.userConnect" class="fr-nav__item">
                        <a class="fr-nav__link fr-icon-logout-box-r-fill color-blue-fr" href="#" @click="this.unconnected()">
                            Se déconnecter
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
</template>


<script>
import router from '@/router'
import store from '@/store'
export default {
    name: 'AppHeader',
    data(){
        return {
            token: null,
            showMenu:false
        }
    },
    methods:{
        goToAdminUser(){
            this.showMenu = false
            router.push("/admin-user")
        },
        goToSuperAdmin(){
            this.showMenu = false
            router.push("/super-admin")
        },
        gologin(){
            this.showMenu = false
            router.push("/login")
        },
        unconnected(){
            this.showMenu = false
            sessionStorage.clear()
            store.state.token = null
            store.state.email = null
            store.state.role = null
            store.commit("setConnectionStatus",false)
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            router.push("/")
        },
        goToCreate(){
            this.showMenu = false
            router.push("/create-ressource")
        },
        gotoRegister(){
            this.showMenu = false
            router.push("/register")
        },
        gotoProfilePage(){
            this.showMenu = false
            router.push("/profil-page")
        }
    },
    computed:{
        userConnect(){
            return store.state.isConnected
        },
        isSuperAdmin(){
            if(store.state.role == "SUPER_ADMIN"){
                return true
            }else{
                return false
            }
        },
        isAdmin(){
            if(store.state.role == "SUPER_ADMIN" || store.state.role=="ADMIN"){
                return true
            }else{
                return false
            }
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
        this.token = store.state.token
        if(this.token != null){
            store.commit("setConnectionStatus",true)
        }
        this.showMenu = false
    }
}
</script>

<style scoped>
    @keyframes slideDown {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(0);
        }
    }
  .fr-menu-collapsed {
        position: fixed; /* Fixe la div sur l'écran */
        top: 0; /* Positionne la div en haut de la page */
        left: 0; /* Positionne la div à gauche de la page */
        width: 100%; /* Largeur de la div à 100% de la largeur de la page */
        height: 100%; /* Hauteur de la div à 100% de la hauteur de la page */
        z-index: 9999; /* Met la div au premier plan */
        background-color: white;
        animation: slideDown 0.1s ease-out;
    }
    .color-blue-fr{
        color:#000091;
    }
</style>