<template>
    <div class="blockSession">
      <Nav/>
      
      <h2 class="helloUser">Bonjour {{ user.firstName }} ! </h2>
      
      <div class="allusersAndPosts">
          <Allusers/>
          
          <div class="publication-box">
            <div class="title-box">
                <p>Ce que vos Groupofriends ont publiés dernièrement...</p>
            </div>
            <Allposts/>
          </div>

          <Youpublicate/>
      </div>
    </div>
</template>

<script>
const axios = require('axios')

import Allposts from '../components/Allposts'
import Nav from '../components/Nav.vue'
import Allusers from '../components/Allusers.vue'
import Youpublicate from '../components/Youpublicate'

export default {
  name: 'Session',
  components : {
    Nav,
    Allposts,
    Allusers,
    Youpublicate,
  },
  data() {
        return{
            user: {}
        }
    },
  mounted() {
        let id = JSON.parse(localStorage.getItem('userId'))
        let token = JSON.parse(localStorage.getItem('token'))
        const url = 'http://localhost:3000/api/user' + '/'+ id          
        axios
          .get(url, {
              headers: {
                  Authorization: "Bearer" + " " + token
              }
          })
          .then((res) => {
              this.user = res.data
              console.log("Hello you!")
          })
          .catch((error) => console.log(error)) 
        },
}
</script>

<style scoped>
.blockSession{
  display: flex;
  flex-direction: column;
  height: 700px;
}
.helloUser{
  font-family: 'Lubalin', serif;
  width: 50%;
  margin: 20px;
}
.allusersAndPosts{
  display: flex;
  margin-top: 30px;
  margin-left: 20px;
  color: #2c3e50;
}
 /* block de tous les posts */
.publication-box{
    margin-top: 20px;
    width: 55%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 2px 20px #2c3e50;
    border-radius: 10px;
    overflow: hidden;
    font-family: 'Lubalin', serif; 
    background-color: white;
}
.title-box{
    border-bottom: 1px solid #2c3e50;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2c3e50;
}
p{
    font-size: 20px;
    color: white;
    text-align: center;
}

@media screen and (max-width: 420px){
    .allusersAndPosts{
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 70px;
    margin-left: 0;
  }
  p{
    font-size: 15px;
  }
  .publication-box{
    width: 80%;
    margin-bottom: 30px;
  }
  .helloUser{
    font-size: 20px;
  }
}
@media screen and (min-width: 420px) and (max-width: 924px){
  .allusersAndPosts{
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 70px;
    margin-left: 0;
  }
  
  .publication-box{
    width: 80%;
    margin-bottom: 30px;
  }
}
</style>