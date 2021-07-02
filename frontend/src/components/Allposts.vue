<template>
    <div v-if="allposts == []" class="postsBox">
        <div>Pas de publications pour le moment.</div>
    </div>
    <div v-else >
        <div v-for="post in allposts" :key="post.id" class="posts">
            <div>{{ post.User.firstName}} {{ post.User.name }}</div>
            <div>{{ post.comment}}</div>
            <div>{{ post.gifs}}</div>
            <div>{{ post.file}}</div>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
    name: 'Allposts',
    data() {
        return {
            allPosts: [],
            fromUsers: []
        }
    },
    mounted() {
        let token = JSON.parse(localStorage.getItem('token'))

        axios.get("http://localhost:3000/api/article", { 
            headers: {
                  Authorization: "Bearer" + " " + token
            }
        })
        .then(res => {
            this.allPosts = res.data,
            this.fromUsers = res.data.User
            console.log(res.data.comment)
            console.log(res.data)
            })
        .catch(err => console.log(err.status))
    }
}
</script>

<style scoped>
.postsBox{
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.posts{
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
