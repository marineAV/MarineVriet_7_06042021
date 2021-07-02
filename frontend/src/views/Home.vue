<template>
  <div class="home">
    <div class="logos">
        <img class="earth" src="../assets/logoEarth.png" alt="groupomania logo">
        <img class="letters" src="../assets/newLogo.png" alt="groupomania">
    </div>
    <div class="form-container">
        <div class="buttons">
            <router-link to="/api/login"><button class="buttonSignIn" type="button">Se connecter</button></router-link>
            <router-link to="/api/signup"><button class="buttonSignUp" type="button">S'inscrire</button></router-link>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style scoped>
.home{
    display: flex;
    justify-content: space-around;
    background-color: #2c3e50;
    height: 660px;
}
.logos{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.earth{
    position: relative;
    bottom: 50px;
    width: 38%;
}
.letters{
    width: 40%;
    position: absolute;
    bottom: 120px;
}


.form-container{
    margin-top: 120px;
    margin-right: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
}
.buttonSignIn{
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: 'Lubalin', serif;
    width: 200px;
    height: 50px;
    background-color: #85a7ac;
    color: #2c3e50;
    border: none;
    border-radius: 30px;
    margin-left: 10px;
    box-shadow: 2px 2px 12px #141f2b;
}
.buttonSignUp{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: 'Lubalin', serif;
    width: 200px;
    height: 50px;
    background-color: #2c3e50;
    color: #85a7ac;
    border: 2px solid #85a7ac;
    border-radius: 30px;
    margin-left: 10px;
    box-shadow: 2px 2px 12px #141f2b;
}
@media screen and (max-width: 650px){
    .home{
        flex-direction: column-reverse;
    }
    .form-container{
        margin-right: 0;
        margin-top: 20px;
    }
    .earth{
        position: relative;
        bottom: 80px;
        width: 50%;
    }
    .letters{
        width: 70%;
    }
}
@media screen and (min-width: 650px) and (max-width: 870px){
    .home{
        flex-direction: column-reverse;
    }
    .form-container{
        margin-right: 0;
        margin-top: 20px;
    }

    .earth{
        position: relative;
        bottom: 10px;
    }
    .letters{
        position: relative;
        bottom: 90px;
        width: 65%;
    }
}
@media screen and (min-width: 870px) and (max-width: 1125px){
    .home{
    flex-direction: column-reverse;
    }
    .form-container{
        margin-right: 0;
        margin-top: 20px;
    }
    .earth{
        position: relative;
        top: 30px;
    }
    .letters{
        position: relative;
        bottom: 70px;
        width: 60%;
    }
}
</style>

