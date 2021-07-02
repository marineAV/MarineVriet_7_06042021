<template>
    <div class="signinBox">
        <form action="/login" method="post" id="signIn" @submit.prevent="login">
            <div class="connect">Bienvenue!</div>
            <label for="email">Email :</label>
            <input type="email" v-model="email">
            <label for="password">Mot de passe :</label>
            <input type="password" v-model="password">
            <div class="errorMessage">{{ messageError }}</div>
            <button class="connectButton">Je me connecte!</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios')

export default {
    name: 'Login',
    data() {
    return {
        email: "",
        password: "",
        messageError: "",
       } 
    },
    methods: {
        login() {
            if(this.email == "" || this.password == ""){
                this.messageError = "Vous devez renseigner votre email et votre mot de passe"
            }else{
                axios
                .post('http://localhost:3000/api/login', {
                    email: this.email,
                    password: this.password
                })  
                .then((res) => {
                    console.log(res.data)
                    let token = JSON.stringify(res.data.token)
                    localStorage.setItem('token', token)
                    let userId = JSON.stringify(res.data.userId)
                    localStorage.setItem('userId', userId)
                    this.$router.replace({name: "Session"})
                })
                .catch((err) => {
                    console.log(err.response.status)
                    if(err.response.status === 401){
                        console.log(err)
                        this.messageError = "Ce compte n'existe pas"
                    }else if(err.response.status === 400){
                        this.messageError = "Le mot de passe est incorrect"
                    }
                })
            }    
        }
    }
}
</script>

<style scoped>
.errorMessage{
    color: red;
    padding: 5px;
    text-align: center;
}
.signinBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 660px;
    font-family: 'Lubalin', serif; 
    background-color: #2c3e50; 
}

    #signIn{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 150px;  
        margin-bottom: 80px;  
        width: 500px;
        color: #2c3e50;
        background-color: white;
        border-radius: 30px;
        box-shadow: 2px 2px 12px #0e1720;    
    }
    .connect{
        font-size: 40px;
    }
    .connectButton{
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
</style>