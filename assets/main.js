new Vue({
    el:'#app',
    data:{
        Title:"Monster Slayer!",
        players:['You','Monster'],
        Game: false,
        histories:[],
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
                    var damage = vr.getRandomNumber(5,10)
                    health.You -= damage
                    vr.histories.push(vr.pushToHistory(damage,'Monster','Attack'))
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
                    var damage = this.getRandomNumber(1,5)
                    healthBars.Monster -= damage
                    this.histories.push(this.pushToHistory(damage,'Player',skillName))
                }
            }
            if (skillName == 'Special Attack' && specialAttack == 0){
                if (healthBars.Monster >= 0) {
                    var damage = this.getRandomNumber(20,50);
                    healthBars.Monster -= damage
                    skills.specialAttack.Used = 1
                    this.histories.push(this.pushToHistory(damage,'Player',skillName))
                }
            }
            if(skillName == 'Heal'){
                var heal = this.getRandomNumber(20,50);
                healthBars.You += heal
                this.histories.push(this.pushToHistory(heal,'Player',skillName))
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
        },
        pushToHistory(num,char,skill){
            //PLAYER
            if(char == 'Player' && skill == 'Attack'){
                return 'Player hits Monster for ' + num + ' damage'
            }
            if(char == 'Player' && skill == 'Special Attack'){
                return "Player used 'Special Attack' and hits Monster for " + num + " damage"
            }
            if(char == 'Player' && skill == 'Heal'){
                return 'Player Heals for    ' + num + ' health'
            }
            //MONSTER
            if(char == 'Monster'){
                return 'Monster hits Player for ' + num + ' damage'
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