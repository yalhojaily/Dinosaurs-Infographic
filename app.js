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
             renderImage(dinos);        
        })
    }())
    

    // To storing facts from all three comparing methods and JSON file facts
    let allFacts = [];

    // concat and shuffle facts
    function randomFact(){
        //concat facts
        allFacts = [].concat.apply([], allFacts);

        // return one fact randomly
         return allFacts[Math.floor(Math.random() * allFacts.length)];
        
    }
    
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    function compareWeight(human){
        const weightResults = dinos.map(function(element){
            if(element.weight > human.weight){
                      return `${element.species} is ${element.weight} lbs. It's heavier than ${human.name}`;
                } else {
                        return `${element.species} is ${element.weight} lbs. It's thinner than ${human.name}`;
                    }
        });
        
        allFacts.push(weightResults);
        
    }
        
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareHeight(human){
        const heightResults = dinos.map(function(element){
            if(element.height > human.height){
                return `${element.species} is ${element.height} inches. It's taller than ${human.name}`;
            } else {
                return `${element.species} is ${element.height} inches. It's shorter than ${human.name}`;
            }
        })
        allFacts.push(heightResults);
   
    }
    // collect facts from json file
    function collectDinosFacts(){
        const dinoFacts = dinos.map(function(element){
            return element.fact;
        })
        allFacts.push(dinoFacts);
    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareDiet(human){
        const dietResults = dinos.map(function(element){
            if(element.diet === human.diet.toLowerCase()){
                return `${element.species} had a ${element.diet} diet. It's the same diet of ${human.name}`;
            } else {
                return `${element.species} had a ${element.diet} diet. It's different than ${human.name}'s diet.`;
            }
})

        allFacts.push(dietResults);

    }

    // Add tiles to DOM
    function renderImage(array){

        compareWeight(human);
        compareHeight(human);
        compareDiet(human);
        collectDinosFacts();
        
        
        for(let i = 0; i < array.length; i++){
           
            let matchFact = randomFact();
            console.log(matchFact);
            if(i == 4){
                const humanTile = document.createElement('div');
                humanTile.classList.add('grid-item');
                humanTile.innerHTML = `<h3>${human.name}</h3> <img src=" ${human.image}">`;
                main.appendChild(humanTile);
            }
            
                const dinoTile = document.createElement('div');
                dinoTile.classList.add('grid-item');
                dinoTile.innerHTML = `<h3>${array[i].species}</h3> <img src="./images/${array[i].image}"> `;
                
                if((matchFact.includes(array[i].species))){
                    dinoTile.innerHTML += `<p>${matchFact}</p>`;
                    main.appendChild(dinoTile);
                    
                 } else {
                     dinoTile.innerHTML += `<p>${array[i].fact}</p>`;
                     main.appendChild(dinoTile);
                     
                }
                matchFact = '';
                
        }
       

    }
    


// On button click, prepare and display infographic
// Remove form from screen
document.getElementById('btn').addEventListener('click', function(){
        const form = document.getElementById('dino-compare');
        form.style.display = 'none';
        
    });