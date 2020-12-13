    const main = document.getElementById('grid');
    
    
    // Create Dino Constructor
    function Dino(species, weight, height, diet, where, when, fact, image) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.image = image
    }

    
    // Fetching Dino data from JSON file
    const getDinoData = async () => {
        const fetchedData = await fetch("./dino.json");
        const data = await fetchedData.json();
        return data.Dinos;
      };
    
    const dinos = [];  
    // run when document loads
        window.onload = async () => {
        const dinoArray = await getDinoData();
        
    
    
        dinoArray.forEach(item => {
         const dino = new Dino(
            item.species,
            item.weight,
            item.height,
            item.diet,
            item.where,
            item.when,
            item.fact,
            item.image
        );
        dinos.push(dino);
    });
     
    };


   
    

    // Create Human Constructor
    function Human(name, weight, height, diet, image){
        this.name = document.getElementById('name').value;
        this.weight = document.getElementById('weight').value;
        this.height = Number(document.getElementById('feet').value) + Number(document.getElementById('inches').value);
        this.diet = document.getElementById('diet').value;
        this.fact = '';
        this.image = './images/human.png';
        
    }

    // Create Human Object
    let human = null;

    // Use IIFE to get human data from form
    (function getDataFromForm(){
        document.getElementById('btn').addEventListener('click', function(){
             human = new Human();
            addTiles(dinos);
                
        })
    }())
    

    // To storing facts from all three comparing methods and JSON file facts
    let allFacts = {};
   
    function randomFact(species){
        
        const dinoFacts = allFacts[species];
        return dinoFacts[Math.floor(Math.random() * dinoFacts.length)];
        
    }
    
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    function compareWeight(human){
        const weightResults = dinos.map(function(element){
            allFacts[element.species] = new Array();
            if(element.weight > human.weight){
                allFacts[element.species].push(`${element.species} is ${element.weight} lbs. It's heavier than ${human.name}`);
                } else {
                    allFacts[element.species].push(`${element.species} is ${element.weight} lbs. It's thinner than ${human.name}`);
                    }
                    
        });
        
       
        
    }
        
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareHeight(human){
        const heightResults = dinos.map(function(element){
            if(element.height > human.height){
                allFacts[element.species].push(`${element.species} is ${element.height} inches. It's taller than ${human.name}`);
            } else {
                allFacts[element.species].push(`${element.species} is ${element.height} inches. It's shorter than ${human.name}`);
            }
        })
     
   
    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareDiet(human){
        const dietResults = dinos.map(function(element){
            if(element.diet === human.diet.toLowerCase()){
                allFacts[element.species].push(`${element.species} had a ${element.diet} diet. It's the same diet of ${human.name}`);
            } else {
                allFacts[element.species].push(`${element.species} had a ${element.diet} diet. It's different than ${human.name}'s diet.`);
            }
})

      

    }

    // collect facts from json file
    function collectDinosFacts(){
        const dinoFacts = dinos.map(function(element){
            allFacts[element.species].push(element.fact);
        })
       
    }
    
    // Add tiles to DOM
    function addTiles(array){

        compareWeight(human);
        compareHeight(human);
        compareDiet(human);
        collectDinosFacts();
        
        
        for(let i = 0; i < array.length; i++){
           
            let matchFact = randomFact(array[i].species);
            
            // Putting human object in the middle of infographic
            if(i == 4){
                const humanTile = document.createElement('div');
                humanTile.classList.add('grid-item');
                humanTile.innerHTML = `<h3>${human.name}</h3> <img src=" ${human.image}">`;
                main.appendChild(humanTile);
            }
            
                const dinoTile = document.createElement('div');
                dinoTile.classList.add('grid-item');
                dinoTile.innerHTML = `<h3>${array[i].species}</h3> <img src="./images/${array[i].image}"><p>${matchFact}</p>`;
                main.appendChild(dinoTile);
        }
       

    }
    


// On button click, prepare and display infographic
// Remove form from screen
document.getElementById('btn').addEventListener('click', function(){
        const form = document.getElementById('dino-compare');
        form.style.display = 'none';
        
    });