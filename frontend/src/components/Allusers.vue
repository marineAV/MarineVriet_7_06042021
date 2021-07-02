<template>
    <div class="list">
        <div class="title">
            <h4>Voici tous vos Groupofriends</h4>
        </div>
        <div class="usersList" v-for="user in users" :key="user.id">{{ user.firstName }} {{ user.name }}</div>   
    </div>
</template>

<script>
const axios = require('axios')

export default {
    name : 'Allusers',
    data() {
        return {
            users: []
        }
    },
    mounted() {
        let token = JSON.parse(localStorage.getItem('token'))
            axios
            .get('http://localhost:3000/api/users', {
                headers: {
                  Authorization: "Bearer" + " " + token
              }
            })
            .then((res) => {
                this.users = res.data
                console.log(res.data)
            })
            .catch(() => console.log('mauvaise route!'))
    }
}
</script>

<style scoped>
@font-face{
    font-family: 'Lubalin';
    src: url(../assets/LubalinGraph.otf);
}
.list{
    display: flex;
    flex-direction: column;
    border: 1px solid #2c3e50;
    font-family: 'Lubalin';
    color: #2c3e50;
    margin-top: 20px;
    margin-right: 10px;
}
.usersList{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
.title{
    background-color: #a5b6c9;
    padding: 10px;
}
h4{
    text-align: center;
}
@media screen and (max-width: 924px){
    .list{
        display: none;
    }
}
</style>