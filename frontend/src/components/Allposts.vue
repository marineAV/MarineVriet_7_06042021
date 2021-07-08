<template>
    <div class="postBox">
        <div v-for="item in customItems" :key="item.id" class="posts">
            <div class="boxTitle">
                <div class="nameTitle">{{ item.firstName }} {{ item.name }} a écrit :</div>
            </div>
            <hr>
            <div class="commentAndFiles">
                <div v-show="item.comment!== null" class="comment">{{ item.comment }}</div>
                <div class="files">
                    <img v-show="item.gifs!== null" :src="item.gifs" alt="gifs">
                    <img v-show="item.file!== null" :src="item.file" alt="gifs">
                </div>
            </div>
            <div class="logoAndTime">
                <div class="boxLogo">
                    <div class="logo"><i class="far fa-heart"></i></div>
                    <div class="logo"><i class="far fa-thumbs-down"></i></div>
                    <div class="logo"><i class="far fa-comments"></i></div>
                </div>
                <div class="time">
                    <div>Le {{ item.updatedAt }} à {{ item.hour }}</div>
                </div>
            </div>
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
            substrTime:"",
            subTime:""
        }
    },
    computed: {
        customItems(){
            return this.allPosts.map(item => {
                return {
                    gifs: item.gifs,
                    file: item.file,
                    name: item.User.name,
                    firstName: item.User.firstName,
                    comment: item.comment,
                    updatedAt: item.updatedAt.substring(0, 10),
                    hour: item.updatedAt.substring(12, 19)
                }
            })
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
            this.substrTime = res.data.updatedAt,
            console.log(res.data)
            })
        .catch(err => console.log(err.status))
    }
}
</script>

<style scoped>
.postBox{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.posts{
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: rgb(231, 229, 229);
    margin-top: 10px;
    margin-bottom: 10px;
}
.commentAndFiles{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.comment{
    margin: 10px; 
    background-color: white; 
    padding: 20px;
}
img{
    width: 200px;
    margin: 10px;
    margin-bottom: 20px; 
}
.boxTitle{
    background-color: #a5b6c9;
}
.nameTitle{
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
}
.files{
    display: flex;
    justify-content: center;
    align-items: center;
}
.time{
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
}
/* Logos like/dislike */
.boxLogo{
    display: flex;
    justify-content: center;
}
.far{
    font-size: 20px;
    margin-left: 10px;
}
.logoAndTime{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #a5b6c9;
}
</style>
