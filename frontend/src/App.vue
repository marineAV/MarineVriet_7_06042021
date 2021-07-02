<template>
  <router-view/>
</template>

<style lang="scss">
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-decoration: none;    
}
@font-face{
    font-family: 'Lubalin';
    src: url(assets/LubalinGraph.otf);
}
.home{
    display: flex;
    justify-content: space-around;
    background-color: #2c3e50;
    height: 660px;
}
#nav {
  padding: 30px;
  position: absolute;
  box-shadow: 2px 2px 10px #17222e;
  width: 100%;
  background-color: #3e556b;
  a {
    font-weight: bold;
    color: #7895b3;

    &.router-link-exact-active {
      color: #9ab4cf;
    }
  }
}
</style>
