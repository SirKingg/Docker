<template>
    <main role="main" id="content">
    <div class="fr-container">
        <div class="fr-my-7w fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--center">
            <div class="fr-py-0 fr-col-12 fr-col-md-6">
                <h1>Page non trouvée</h1>
                <p class="fr-text--sm fr-mb-3w">Erreur 404</p>
                <p class="fr-text--lead fr-mb-3w">La page que vous cherchez est introuvable. Vous allez être redirigé.</p>
                <ul class="fr-btns-group fr-btns-group--inline-md">
                    <li>
                        <a class="fr-btn" href="/">
                            Page d'accueil
                        </a>
                    </li>
                </ul>
            </div>
            <div class="fr-col-12 fr-col-md-3 fr-col-offset-md-1 fr-px-6w fr-px-md-0 fr-py-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="fr-responsive-img fr-artwork" aria-hidden="true" width="160" height="200" viewBox="0 0 160 200">
                    <use class="fr-artwork-motif" href="[path]/ovoid.svg#artwork-motif"></use>
                    <use class="fr-artwork-background" href="[path]/ovoid.svg#artwork-background"></use>
                    <g transform="translate(40, 60)">
                        <use class="fr-artwork-decorative" href="[path]/technical-error.svg#artwork-decorative"></use>
                        <use class="fr-artwork-minor" href="[path]/technical-error.svg#artwork-minor"></use>
                        <use class="fr-artwork-major" href="[path]/technical-error.svg#artwork-major"></use>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</main>
</template>
    
<script>
import router from '@/router';

export default {
    name : "NotFound",
    mounted(){
        // laisser la page quelque seconde puis retourne sur la page de login
        setTimeout(function(){
            router.push("/") 
        },5000) 
    }
}
</script>