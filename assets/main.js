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
                color:'Blue'
            },
            specialAttack:{
                name: 'Special Attack',
                Used:0,
                color:'Red'
            },
            heal:{
                name:'Heal',
                color:'Green'
            },
            giveUp:{
                name:'Give Up',
                color:'Yellow'
            }
        }
    },
    watch:{
        Monster(){
            var vr = this;
            var health = vr.healthBars
            setTimeout(function(){
                if (health.Monster >= 0) {
                    health.You -= vr.getRandomNumber(5,10)
                } else {
                    this.Title = 'You Win!'
                    vr.startAgain()
                    
                }
            },1000)
        },
        You(){
            if (this.healthBars.You <= 0){
                this.Title = 'You Lose'
                this.startAgain()
            }
        }
    },
    methods:{
        skillEffect(skillName) {
            var specialAttack = this.skills.specialAttack.Used,
                healthBars = this.healthBars,
                skills = this.skills
            if (skillName == 'Attack'){
                if (healthBars.Monster >= 0) { 
                    healthBars.Monster -= this.getRandomNumber(1,5)
                }
            }
            if (skillName == 'Special Attack' && specialAttack == 0){
                if (healthBars.Monster >= 0) {
                    healthBars.Monster -= this.getRandomNumber(20,50);
                    skills.specialAttack.Used = 1
                }
            }
            if(skillName == 'Heal'){
                healthBars.You += this.getRandomNumber(7,10);
            }
            if (skillName == 'Give Up'){
                var data =this;
                this.Title = 'You Lose!'
                this.startAgain()
            }
        },
        startAgain(){
            var specialAttack = this.skills.specialAttack.Used,
                healthBars = this.healthBars,
                skills = this.skills,
                confirm = window.confirm('Do you wanna restart the game?');
                if(confirm){
                    healthBars.Monster = 100;
                    healthBars.You = 100;
                    skills.specialAttack.Used = 0
                    this.Title = 'Monster Slayer!'
                }
        },
        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
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