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
            if(this.healthBars.Monster >= 0){
                this.healthBars.You -= 5
            } else {
                this.Title = 'You Win!'
            }
        },
        You(){
            if (this.healthBars.You <= 0){
                this.Title = 'You Lose'
            }
        }
    },
    methods:{
        wew(skillName) {
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
        }
    },
    computed:{
        //for watching Monster nad You variable from data object
        Monster(){
            return this.healthBars.Monster;
        },
        You() {
            return this.healthBars.You;
        }
    }
})