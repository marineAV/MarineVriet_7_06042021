<template>
    <div class="box">
        <div class="boxMessage">
            <div class="text">Votre inscription a bien été prise en compte, vous pouvez dorénavant, vous connecter!</div>
            <router-link to="/api/login"><button>Se connecter</button></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignupWorked'
}
</script>

<style scoped>
.box{
    background-color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lubalin', serif; 
    height: 630px;
}
.boxMessage{
    background-color: white;
    border-radius: 30px;
    box-shadow: 2px 2px 12px #0e1720;
    color: #2c3e50;
    height: 400px;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-size: 25px;
}
.text{
    text-align: center;
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
    margin-top: 70px;
    cursor: pointer;
    font-size: 15px;
}
</style>