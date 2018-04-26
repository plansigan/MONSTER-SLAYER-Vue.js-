new Vue({
    el:'#app',
    data:{
        Title:"Monster Slayer!",
        players:['You','Monster'],
        Game: false,
        healthBars:{
            You:100,
            Monster:100
        },
        skills:{
            attack:{
                name: 'Attack',
                effect(){
                    this.healthBars.Monster -= 2
                }
            },
            specialAttack:{
                name: 'Special Attack'
            },
            heal:{
                name:'Heal'
            },
            giveUp:{
                name:'Give Up'
            }
        },
    },
    computed:{
    }
})