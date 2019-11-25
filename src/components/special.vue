<template>
    <div class="special-center">
        特效
        <img class="special1" src="../assets/img/special-effects.png"/>
        <img class="special2" src="../assets/img/special-effects2.png"/>
        <img class="special3" src="../assets/img/special-effects3.png"/>    
         <img class="special4" src="../assets/img/special-effects.png"/>
        <img class="special5" src="../assets/img/special-effects2.png"/>
        <img class="special6" src="../assets/img/special-effects3.png"/>   
    </div>
</template>
<script>
export default {
  name: "special"
};
</script>
<style lang="scss" scoped>
.special-center{
    position: fixed;
    right: 0.53333rem;
    top: 3.56667rem;
    font-size: 0.8rem;
    color: #000;
    z-index: 1000;
    width: 1rem;
    height: 1rem;
    font-size: 13px;
    background: #000;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    line-height: 14px;
    display: flex;
    align-items: center; 
    justify-content: center;
}
img {
  height: 75px;
  width: 75px;
  position: fixed;
  z-index: 998;
}
.special1 {
  left: 50px;
  animation: fall 7s linear infinite;
  animation-delay: -2s;
}
.special2 {
  left: 150px;
  width: 30px;
  height: 30px;
  animation: fall2 7s linear infinite;
  animation-delay: -1s;
}
.special3 {
  left: 300px;
  width: 55px;
  height: 55px;
  animation: fall3 7s linear infinite;
  animation-delay: -3s;
}
.special4 {
  left: 20px;
  animation: fall2 7s linear infinite;
  animation-delay: -5s;
}
.special5 {
  left: 170px;
  width: 40px;
  height: 40px;
  animation: fall2 7s linear infinite;
  animation-delay: -6s;
}
.special6 {
  left: 260px;
  width: 60px;
  height: 60px;
  animation: fall3 7s linear infinite;
  animation-delay: -7s;
}
@keyframes fall3 {
  0% {
    opacity: 1;
    top: -10%;
    transform: translateX(-60px) rotate(0deg);
  }
  20% {
    opacity: 0.5;
    transform: translateX(-20px) rotate(45deg);
  }
  40% {
    opacity: 0.8;
    transform: translateX(-40px) rotate(90deg);
  }
  60% {
    opacity: 1;
    transform: translateX(-160px) rotate(135deg);
  }
  80% {
    opacity: 0.8;
    transform: translateX(-100px) rotate(180deg);
  }
  100% {
    top: 110%;
  }
}
@keyframes fall2 {
  0% {
    opacity: 1;
    top: -10%;
    transform: translateX(60px) rotate(0deg);
  }
  20% {
    opacity: 0.5;
    transform: translateX(-20px) rotate(45deg);
  }
  40% {
    opacity: 0.8;
    transform: translateX(40px) rotate(90deg);
  }
  60% {
    opacity: 1;
    transform: translateX(60px) rotate(135deg);
  }
  80% {
    opacity: 0.8;
    transform: translateX(100px) rotate(180deg);
  }
  100% {
    top: 110%;
  }
}
@keyframes fall {
  0% {
    opacity: 1;
    top: -10%;
    transform: translateX(20px) rotate(0deg);
  }
  20% {
    opacity: 0.8;
    transform: translateX(40px) rotate(45deg);
  }
  40% {
    transform: translateX(60px) rotate(90deg);
  }
  60% {
    transform: translateX(80px) rotate(135deg);
  }
  100% {
    top: 110%;
  }
}
</style>
