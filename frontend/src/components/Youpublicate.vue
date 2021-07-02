<template>
    <div class="boxPublication">
        <form method="POST" enctype="multipart/form-data">
            <!-- Preview de la photo ou vidéo choisi + click annuler la photo -->
            <div class="inputPlusImgBox">
                <textarea name="comment" v-model="comment" rows="12" placeholder="Hey! Quoi de neuf aujourd'hui? Dites-nous tout..."></textarea>
                <div class="previewImages">
                    <div class="boxCrossImg">
                        <span v-if="img !== ''" @click="deletePreview()" class="crossLogo"><i class="far fa-times-circle"></i></span>
                        <img v-if="img !== ''" :src="img" id="preview" style="margin-right:5px;">
                    </div>
                    <div class="boxCrossImg">
                        <span v-if="gifSent !== ''" @click="deletePreviewGif()" class="crossLogo"><i class="far fa-times-circle"></i></span>
                        <img v-if="gifSent !== ''" :src="gifSent" class="previewGif">
                    </div>
                </div>
            </div>
            
            <!-- logo camera -->
            <div class="boxSpanButton">
                <div>
                    <label class="filebutton">
                        <span class="cameraLogo"><i class="fas fa-camera"></i></span>
                        <span><input type="file" id="myfile" @change="handleFiles" name="file"></span>
                    </label>         
                    <span class="gifLogo" @click="showGifBox = !showGifBox"><i class="fas fa-film"></i></span>
                </div>
                <div>
                    <button type="submit" @click="onUploadPosts()">Envoyez</button>
                </div>
            </div>
            <!-- gifs library -->
            <div class="gifBox" v-show="showGifBox">
                <img class="allGifs" v-for="(gif, index) in gifs" :key=index :src="gif" @click="handleGif(gif)">
            </div>
        </form>
    </div>
</template>

<script>
const axios = require('axios')

export default {
    name: 'Youpublicate',
    data() {
        return {
            file: "",
            img:"",
            comment:"",
            gifSent:"",
            gifs: this.$store.state.gifs,
            showGifBox: false
        }
    },
    methods: { // preview img before upload
        handleFiles(e) {
            this.file = e.target.files[0]

                    this.img = URL.createObjectURL(this.file) //lecture du fichier
                    console.log(this.file)
                    console.log(this.img)
        },
        deletePreview() { //Supprime la prévisualisation et les fichiers dans le tableau urls
            this.file = ""
            console.log(this.file.length);
        },   
        handleGif(gif){
            this.gifSent = gif
            console.log(gif)
        },
        deletePreviewGif(){ // Supprime le preview du gif
            this.gifSent = ""
            console.log("Le gif a été supprimé!")
        },
        onUploadPosts(){
            console.log(this.gifSent)
            console.log(this.comment)
            console.log(this.file)

            let token = JSON.parse(localStorage.getItem('token'))
            let id = JSON.parse(localStorage.getItem('userId'))

            if(this.gifSent == "" && this.comment == "" && this.file == ""){
                alert("Votre post est vide!")
            } else {

                let formd = new FormData()
                formd.append('file', this.file)
                formd.append('comment', this.comment)
                formd.append('gifs', this.gifSent)
                formd.append('id', id)
                console.log(formd)

                axios.post('http://localhost:3000/api/article', formd, {
                    headers: {
                        'Authorization': "Bearer" + " " + token,
                    }
                })
                .then((res) => { console.log("You have a post now!")
                if(res){
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
.boxPublication{
    width: 35%;
    margin: 20px;
    margin-top: 50px;
}
form{
    display: flex;
    flex-direction: column;
}
textarea{
    background-color: rgb(237, 239, 252);
    border: none;
    width: 100%;
    font-family: 'Lubalin';
    padding: 5px;
}
.inputPlusImgBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    background-color: rgb(237, 239, 252);
}
/* span and button */
.boxSpanButton{
    display: flex;
    justify-content: space-between;
}
button{
    text-align: center;
    cursor: pointer;
    font-family: 'Lubalin', serif;
    width: 100px;
    height: 20px;
    border: none;
    border-radius: 30px;
    color: white;
    background: linear-gradient(#2c3e50, #141f2b);
    font-size: 12px;
    margin-top: 10px;
}
.filebutton{
    cursor: pointer;
}
.cameraLogo, .gifLogo{
    font-size: 20px;
    color: rgb(158, 163, 192);
    margin-right: 10px;
    cursor: pointer;
}
.crossLogo{
    cursor: pointer;
    color: #141f2b;
}
.previewImages{
    display: flex;
}
.boxCrossImg{
    display: flex;
    flex-direction: column;
}
 #myfile{
    z-index: 999;    
    line-height: 0;
    position: absolute;
    top: -2px;
    left: -700px;
    opacity: 0;
    filter: alpha(opacity = 0);
    -ms-filter: "alpha(opacity=0)";
    margin: 0;
    padding:0;
} 
#preview, .previewGif{
    max-height: 90px;
}
/* section gifs */
.gifBox{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 1px solid black;
    padding: 5px;
    max-height: 450px;
    width: 530px;
    z-index: 1;
    position: relative;
    right: 240px;
}
.allGifs{
    max-width: 100px;
    max-height: 100px;
    margin-bottom: 5px;
    cursor: pointer;
}
.closeGifs{
    cursor: pointer;
}
@media screen and (max-width: 600px){
    .boxPublication{
        margin-top: 0;
        width: 90%;
    }
    .gifBox{
        margin-top: 10px;
        width: 350px;
        height: 200px;
        right: 0;
        overflow: auto;
        flex-direction: row;
        /* flex-wrap: nowrap; */
    }
    .allGifs{
        max-height: 70px;
        width: 90px;
        margin-right: 5px;
    }
    .closeGifs{
        margin-right: 5px;
    }

}
@media screen and (min-width: 600px) and (max-width: 924px){
    .boxPublication{
        margin-top: 0;
        width: 90%;
    }
    
    .gifBox{
        right: 0;
    }
}
</style>