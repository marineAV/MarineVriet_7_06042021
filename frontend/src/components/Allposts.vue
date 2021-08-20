<template>
    <div class="postBox">
        <div v-for="item in customItems" :key="item" class="posts">
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
                    <div><i class="far fa-heart"></i></div>
                    <div><i class="far fa-thumbs-down"></i></div>
                    <div><i class="far fa-comments"></i></div>
                    <div class="logoPencil" @click="formComment=!formComment"><i class="fas fa-pencil-alt" @click="showComments(item.id)"></i></div>
                </div>
                <div class="time">
                    <div>Le {{ item.updatedAt }} à {{ item.hour }}</div>
                </div>
            </div>
            <form method="POST" class="boxComment" v-show="formComment">
                <textarea name="comment" id="commentPost" v-model="comment" cols="" rows=""></textarea>
                <div class="boxButton">
                    <button @click="sendComments()">Commentez !</button>
                </div>
            </form>
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
            subTime:"",
            formComment: false,
            comment:""
        }
    },
    computed: {
        customItems(){
            return this.allPosts.map(item => {
                return {
                    id: item.id,
                    gifs: item.gifs,
                    file: item.file,
                    name: item.User.name,
                    firstName: item.User.firstName,
                    comment: item.comment,
                    updatedAt: item.updatedAt.substring(0, 10),
                    hour: item.updatedAt.substring(12, 19),
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
    },
    methods: {
        showComments(n){
            console.log(n)
            localStorage.setItem('commentId', n)
        },

        sendComments(){
            let token = JSON.parse(localStorage.getItem('token'))
            let id = JSON.parse(localStorage.getItem('userId'))
            let commentId = JSON.parse(localStorage.getItem('commentId'))

            let fd = new FormData()
            fd.append('id', id)
            fd.append('commentId', commentId)
            fd.append('comment', this.comment)

            console.log(this.comment)

            if(commentId == undefined || this.comment == ""){
                alert('Votre commentaire est vide!')
                }else{
                    axios.post('http://localhost:3000/api/comment', fd, {
                        headers: {
                            'Authorization': "Bearer" + " " + token,
                        }
                    })
                    .then((res) => { localStorage.removeItem('commentId')
                        if(res){
                            console.log("comment is registered !")
                            window.location.reload()
                        }
                    })
                    .catch(error => { console.log(error) })
                }
        }

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
    margin-top: 10px;
    margin-bottom: 10px;
}
.commentAndFiles{
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: rgb(231, 229, 229);
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
.far, .fas{
    font-size: 20px;
    margin-left: 15px;
}
.fa-comments{
    margin-left: 30px;
}
.logoAndTime{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #a5b6c9;
}
.logoPencil{
    cursor: pointer;
}
/* comment part */
.boxComment{
    margin-top: 10px;
    width: 100%;
}
.boxButton{
    display: flex;
    justify-content: flex-end;
}
button{
    text-align: center;
    cursor: pointer;
    font-family: 'Lubalin', serif;
    width: 120px;
    height: 30px;
    border: none;
    border-radius: 30px;
    color: white;
    background: linear-gradient(#2c3e50, #141f2b);
    font-size: 12px;
}
#commentPost{
    width: 100%;
    height: 50px;
}
</style>
