<template>
    <div class="signupBox">
        <form action="/signup" method="post" @submit.prevent="sendId" id="signUp">
            <div class="suscribe"> Inscrivez-vous!</div>
            <label for="name">Nom :</label>
            <input type="text" v-model="name">
            <div class="message">{{ messageName }}</div>
            <label for="firstName">Prénom</label>
            <input type="text" v-model="firstName">
             <div class="message">{{ messageFirstName }}</div>
            <label for="email">Email :</label>
            <input type="email" v-model="email">
            <div class="message">{{ messageEmail }}</div>
            <label for="password">Mot de passe :</label>
            <input type="password" v-model="password">
            <div class="message" id="passwordBackMessage">{{ messagePassword }}</div>
            <button type="submit">Je m'inscris!</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios')

export default {
    name: 'Signup',

    data(){
        return{
            name:"",
            firstName: "",
            email:"",
            password:"",
            messageName: "",
            messageFirstName: "",
            messageEmail: "",
            messagePassword: "",
        }
    },

    methods: {
        sendId: function() {
            if(this.name == ""){
                this.messageName = "Vous devez inscrire votre nom"
            }else if(this.firstName == ""){
                this.messageFirstName = "Vous devez inscrire votre prénom"
            }else if(this.email == ""){
                this.messageEmail = "Vous devez inscrire votre adresse email"
            }else if(this.password == ""){
                this.messagePassword = "Vous devez inscrire votre mot de passe" 
            }else{
            axios
                .post('http://localhost:3000/api/signup',{
                    name: this.name,
                    firstName: this.firstName,
                    email: this.email,
                    password: this.password
                })  
                .then((response) => {
                    console.log(response);
                    this.$router.replace({ name: "SignupWorked" })
                })
                .catch((err) => {
                    console.log(err.response.status)
                    if(err.response.status === 400){
                        this.messageEmail = "Cet adresse email existe déjà"
                    }else if(err.response.status === 500){
                        this.messagePassword = "Votre email n'est pas valide, ou votre mot de passe n'est pas valide et doit comporter au moins 7 caractères, dont 2 chiffres et au moins une majuscule. "

                    }
                })
            }        
        }
    }
}
</script>

<style scoped lang="scss">
.signupBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Lubalin', serif;  
    background-color: #2c3e50;
}
#signUp{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;  
    margin-bottom: 80px;  
    width: 500px;
    color: #2c3e50;
    background-color: white;
    border-radius: 30px;
    box-shadow: 2px 2px 12px #0e1720;
}
button{
    text-align: center;
    cursor: pointer;
    font-family: 'Lubalin', serif;
    width: 150px;
    height: 40px;
    background: linear-gradient(#90beab, #386c74);
    border: none;
    border-radius: 10px;
    color: white;
    margin-left: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    cursor: pointer;
    font-size: 15px;
}
.message{
    color: red;
    font-size: 13px;
    text-align: center;
    padding-left: 5px;
}
input{
    width: 300px;
    height: 40px;
    border-radius: 10px;
    border: 2px solid #2c3e50;
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
}
label{
    margin-top: 20px;
}
button{
    text-align: center;
    cursor: pointer;
    font-family: 'Lubalin', serif;
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 30px;
    color: white;
    background: linear-gradient(#2c3e50, #141f2b);
    box-shadow: 2px 2px 12px #141f2b;
    margin-left: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    cursor: pointer;
    font-size: 15px;
}
</style>
