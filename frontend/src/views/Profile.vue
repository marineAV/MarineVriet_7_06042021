<template>
<div>
   <Nav/>
    <div class="profile">
        <h1>Votre profil</h1>

        <div class="profileContent">
            <div class="buttonPictureBox">
                <div class="boxPicture" v-if="yourfile == ''">
                    <div class="textPicture">Votre photo ici...</div>
                </div>
                <div class="boxPicture" v-else>
                    <img v-bind:src="yourfile" alt="photo de profil">
                </div>

                <form method="post" class="form" enctype="multipart/form-data">
                    <input type="file" id="file" @change="onFileSelected" name="file" accept=".png, .jpg, .jpeg">
                    <button type="submit" class="label" @click="onUpload()">Envoyer</button>
                </form>
            </div>

            <hr>

            <div class="boxAllIdentities">
                <div class="titleAndIdentity">
                    <div class="titledIdentity">Nom : </div>
                    <div class="identity">{{ user.name }}</div>
                </div>
                <hr>
                <div class="titleAndIdentity">
                    <div class="titledIdentity">Prénom : </div>
                    <div class="identity">{{ user.firstName }}</div>
                </div>
                <hr>
                <hr>
                <div class="titleAndIdentity">
                    <div class="titledIdentity">Centres d'intérêts : </div>
                    <div>
                        <div class="identity">{{ profile }}</div>
                        <div class="boxButton">
                            <button class="button" @click="showFormInterests = !showFormInterests">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Displayed form -->
    <div class="boxBio" v-show="showFormInterests">
        <form method="post" class="formBio">
            <div class="crossLogo"><i class="fas fa-times" @click="showFormInterests = !showFormInterests"></i></div>
            <label for="bio" class="labelBio">Quels sont vos centres d'intérêts?</label>
            <textarea class="inputBio" name="interests" rows="10" cols="50" v-model="interests"></textarea>
            <div class="buttonBioBox">
                <button type="submit" class="buttonBio" @click="sendProfile()">Envoyez</button>
            </div>
        </form>
    </div>

</div>
</template>

<script>
const axios = require('axios')
import Nav from '../components/Nav'

export default {
    name : 'Profile',
    components: {
        Nav
    },
    data() {
        return {
            user: {},
            profile: "",
            yourfile: "",
            bio: "",
            job: "",
            interests: "",
            file: "",
            showFormInterests: false
        }
    },
    methods : {
        onFileSelected(event){
            this.file = event.target.files[0]
            console.log(this.file)
        },

        // Envoi de la photo de profil et modification
        onUpload(){
            let token = JSON.parse(localStorage.getItem('token'))
            let id = JSON.parse(localStorage.getItem('userId'))

            let fd = new FormData()
            fd.append('file', this.file)
            fd.append('id', id)

            if(this.yourfile == ""){
                axios.post("http://localhost:3000/api/user/photo", fd, {
                    headers: {
                        'Authorization': "Bearer" + " " + token,
                    }
                })
                .then(() => { console.log("You have a picture now!") }) 
                .catch(error => { console.log(error) })
            }else{
                axios.put("http://localhost:3000/api/user/photo/" +id, fd, {
                    headers: {
                        'Authorization': "Bearer" + " " + token,
                    }
                })
                .then((res) => { 
                    console.log("Your picture have been updated!")
                    window.location.reload()
                    this.yourfile = res.data.file 
                    }) 
                .catch(error => { console.log(error) })
            }    
        },
        // Envoi des éléments du profil
        sendProfile(){
            console.log(this.interests)
            console.log(this.profile)

            let id = JSON.parse(localStorage.getItem('userId'))
            let token = JSON.parse(localStorage.getItem('token'))

            let pdata = new FormData()
            pdata.append('id', id)
            pdata.append('interests', this.interests)
            
            if(this.profile == ""){
                axios.post("http://localhost:3000/api/profile", pdata, {
                    headers: {
                        'Authorization': "Bearer" + " " + token,
                    }
                })
                .then(() => console.log("Vos infos ont bien été envoyé!"))
                .catch( err => console.log(err))
            } else if ( this.profile !== ""){
                axios.put("http://localhost:3000/api/profile/" + id, pdata, {
                   headers: {
                        'Authorization': "Bearer" + " " + token,
                    }
                })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => console.log(err))

            }
        }
    }, 

    mounted() {
        let id = JSON.parse(localStorage.getItem('userId'))
        let token = JSON.parse(localStorage.getItem('token'))

        axios.get('http://localhost:3000/api/profile/'+ id, {
            headers: {
                  Authorization: "Bearer" + " " + token
              }
            })
        .then(res => {
            this.profile = res.data.interests
            console.log(res.data)
            
        })
        .catch(error => console.log(error))

        axios.get('http://localhost:3000/api/user/photo/'+ id, {
            headers: {
                  Authorization: "Bearer" + " " + token
              }
            })
        .then(res => {
            if(res.data.file !== null){
                this.yourfile = res.data.file
                console.log(res.data)
            }
        })
        .catch(error => console.log(error))

        axios.get('http://localhost:3000/api/user/' + id,{
              headers: {
                  Authorization: "Bearer" + " " + token
              }
          })
        .then(res => {
            console.log("It worked!")
            this.user = res.data
        })
        .catch(err => console.log(err.status))
    }
}
</script>

<style scoped>
.profile{
    display: flex;
    flex-direction: column;
    font-family: 'Lubalin';
    margin-top: 50px;
    margin-left: 30px;
}
h1{
    color: #141f2b;
}
.form{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}
/* .inputPhoto{
    display: none;
} */
.label{
    margin-top: 30px;
    cursor: pointer;
    width: 150px;
    height: 30px;
    border-radius: 30px;
    color: white;
    background: linear-gradient(#2c3e50, #141f2b);
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.button{
    text-align: center;
    cursor: pointer;
    font-family: 'Lubalin', serif;
    width: 150px;
    height: 30px;
    border: none;
    border-radius: 30px;
    color: white;
    background: linear-gradient(#2c3e50, #141f2b);
    margin-left: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 12px;
}
/* Côté photo */
.profileContent{
    display: flex;
    margin-top: 30px;
}
.boxPicture{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgb(172, 172, 172);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}
.buttonPictureBox{
    margin-right: 30px;
    margin-top: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
img{
    width: 200px;
}
.textPicture{
    color: white;
    font-size: 20px;
}
/* côté identité */
.boxAllIdentities{
    margin-left: 30px;
    margin-right: 30px;
    flex-grow: 2;
}
.titledIdentity{
    font-weight: bold;
    font-size: 20px;
}
.titleAndIdentity{
    margin-top: 20px;
    margin-bottom: 20px;
}
.identity{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 40px;
}
.boxButton{
    display: flex;
    justify-content: flex-end;
}
/* form bio */
.boxBio{
    /* display: none; */
    z-index: 2;
    width: 500px;
    height: 300px;
    position: absolute;
    bottom: 10px;
    left: 30%;
    background-color: white;
    border: 1px solid #2c3e50;
    border-radius: 30px;
    box-shadow: 2px 2px 12px #141f2b;
    font-family: 'Lubalin';
}
.formBio{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}
.inputBio{
    margin-top: 20px;
    font-family: 'Lubalin';
}
.buttonBio{
    text-align: center;
    cursor: pointer;
    font-family: 'Lubalin', serif;
    width: 150px;
    height: 30px;
    border: none;
    border-radius: 30px;
    color: white;
    background: linear-gradient(#2c3e50, #141f2b);
    font-size: 12px;
    margin-top: 10px;
}
.crossLogo{
    display: flex;
    justify-content: flex-end;
    width: 450px;
}
.fa-times{
    cursor: pointer;
}
</style>