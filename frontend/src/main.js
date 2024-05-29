import { createApp } from 'vue'
import App from './App.vue'
import './assets/part1.css';
import './assets/part2.css';
import './assets/part3.css';
import './assets/part4.css';
import './assets/part5.css';
import './assets/part6.css';

import store from './store'
import router from './router'


const app = createApp(App).use(store).use(router)

app.config.globalProperties.api_path = "http://ressources.local/"
// PUBLIC
app.config.globalProperties.route_login = "api/public/login"
app.config.globalProperties.route_register = "api/public/register"
app.config.globalProperties.get_all_ressources = "api/public/ressources"
// CITOYENS
app.config.globalProperties.route_ressources = "api/citoyens/ressources"
app.config.globalProperties.route_commentaire = "api/citoyens/commentaire"
app.config.globalProperties.route_utilisateur = "api/citoyens/utilisateur"
app.config.globalProperties.route_reponse = "api/citoyens/reponse"
// SUPER ADMIN
app.config.globalProperties.route_super_admin_get_all_user = "api/super-admin/all-user"
app.config.globalProperties.route_super_admin_register_admin = "api/super-admin/register-admin"
app.config.globalProperties.route_super_admin_register_super_admin = "api/super-admin/register-super-admin"
app.config.globalProperties.route_super_admin_register_moderateur = "api/super-admin/register-moderateur"
// ADMIN
app.config.globalProperties.route_admin_disable = "api/admin/utilisateur/disable"
app.config.globalProperties.route_admin_enable = "api/admin/utilisateur/enable"
app.config.globalProperties.route_admin_get_all_user = "api/admin/utilisateur/all-user"


app.config.globalProperties.expire_cookies = (7 * 24 * 60 * 60 * 1000)

app.mount('#app')
