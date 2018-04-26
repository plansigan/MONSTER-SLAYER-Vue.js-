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
                name: 'Attack'
            },
            specialAttack:{
                name: 'Special Attack',
                Used:0
            },
            heal:{
                name:'Heal'
            },
            giveUp:{
                name:'Give Up'
            }
        }
    },
    watch:{
        Monster(){
            var health = this.healthBars
            setTimeout(function(){
                if (health.Monster >= 0) {
                    health.You -= 5
                } else {
                    this.Title = 'You Win!'
                }
            },2000)
        },
        You(){
            if (this.healthBars.You <= 0){
                this.Title = 'You Lose'
            }
        }
    },
    methods:{
        skillEffect(skillName) {
            var specialAttack = this.skills.specialAttack.Used; 
            if (skillName == 'Attack'){
                if (this.healthBars.Monster >= 0) { 
                    this.healthBars.Monster -= 3;
                }
            }
            if (skillName == 'Special Attack' && specialAttack == 0){
                if (this.healthBars.Monster >= 0) {
                    this.healthBars.Monster -= 20;
                    this.skills.specialAttack.Used = 1
                }
            }
            if(skillName == 'Heal'){
                this.healthBars.You += 7;
            }
            if (skillName == 'Give Up'){
                this.Title = 'You Lose!'
            }
        }
    },
    computed:{
        //for watching Monster and You variable from data object
        Monster(){
            return this.healthBars.Monster;
        },
        You() {
            return this.healthBars.You;
        }
    }
})