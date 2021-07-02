<template>
    <nav>
        <img src="../assets/white-icon.png" alt="logo">
        <div class="disconnectBox">
            <div class="research">
                <input type="text">
                <button class="logoSearch"><i class="fas fa-search"></i></button>
            </div>
            <div class="session">
              <ul>
                  <li class="link"><a><i class="fas fa-align-justify"></i></a>
                      <ul class="list">
                          <router-link to="/api/session"><li><a class="listBlock">Accueil</a></li></router-link>
                          <router-link to="/api/profile"><li class="listBlock">Votre profil</li></router-link>
                          <hr>
                          <router-link to="/"><li class="listBlock white">Déconnexion</li></router-link>
                      </ul>
                  </li>
              </ul>
            </div>
        </div>
      </nav>

</template>

<script>
export default {
    name: 'Nav',
}
</script>

<style scoped>
nav{
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    padding-left: 20px;
    background-color: #2c3e50;
    font-family: 'Lubalin', serif; 
} 
img{
    width: 250px;
    height: 60px
}
.disconnectBox{
    display: flex;
}
.research{
    display: flex;
    align-items: center;
    margin-right: 20px;
}
input{
    height: 30px;
    width: 250px;
    border-radius: 10px;
    border: 0;
    padding-left: 10px;
}
.logoSearch{
    font-size: 20px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #7895b3;
    background-color: #2c3e50;
    color: #7895b3;
    border-radius: 5px;
    width: 35px;
    height: 30px;
    cursor: pointer;
} 
.link{
    height: 50px;
    color: white;
    display: block;
    text-align: center;
    width: 200px;
    padding: 10px;
    cursor: pointer;
}
.fa-align-justify{
    font-size: 20px;
    margin-left: 20px;
}
ul{
    list-style: none;
}
.list{
    background-color: #a5b6c9;
    color: #2c3e50;
    line-height: 40px;
    padding-right: 5px;
    width: 200px;
    display: none;
    text-align: end;
}
hr{
    width: 200px;
}
.listBlock{
    display: block;
    padding-right: 10px;
    color: #2c3e50;
    list-style: none;
    width: 200px;
    cursor: pointer;
}
.white{
  color: white;
}
.listBlock:hover{
    background-color: #2c3e50;
    opacity: 0.96;
    color: white;
}
.link:hover .list{
    display: block;
}
@media screen and (max-width: 420px){
    img{
        width: 180px;
        height: 40px
    }
    .listBlock, .list{
        width: 150px;
    }
    .research{
        display: none;
    }
    hr{
        width: 150px;
    }
}
@media screen and (min-width: 420px) and (max-width: 830px){
    img{
        width: 180px;
        height: 40px
    }
    .research{
        display: none;
    }
}
</style>
