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
        // console.log(dinos);
    
    
           dinoArray.forEach(item => {
        const dino = new Dino(
            item.species,
            item.weight,
            item.height,
            item.diet,
            item.where,
            item.when,
            item.fact    
        );
        dinos.push(dino);
    });
     // console.log(dinos);
    };

    // Create Dino Objects
    

    // Create Human Object
    function Human(name, weight, height, diet){
        this.name = document.getElementById('name').value;
        this.weight = document.getElementById('weight').value;
        this.height = Number(document.getElementById('feet').value) + Number(document.getElementById('inches').value);
        this.diet = document.getElementById('diet').value;
        this.fact = '';
        
    }
    // Use IIFE to get human data from form
    (function getDataFromForm(){
        document.getElementById('btn').addEventListener('click', function(){
            let human = new Human();
            console.log(compareWeight(human));
        })
    }())
    
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    function compareWeight(human){
        dinos.forEach((element) => {
            if(element.weight > human.weight){
                return `${element.species} is ${element.weight} lbs. It's heavey than ${human.name}`;
            } else {
                return `${element.species} is ${element.weight} lbs. It's light than ${human.name}`;
            }
        });
    }
        
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareHeight(){
        dinos.forEach((element) => {
            if(element.height > human.height){
                return `${element.species} is ${element.height} inches. It's taller than ${human.name}`;
            } else {
                return `${element.species} is ${element.height} inches. It's shorter than ${human.name}`;
            }
        })
    }


    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareDiet(){
        dinos.forEach((element) => {
            if(element.diet === human.diet.toLowerCase()){
                return `${element.species} had a ${element.diet} diet. It's the same diet of ${human.name}`;
            } else {
                return `${element.species} had a ${element.diet} diet. It's different than ${human.name} diet.`;
            }
    })
}
       

    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', function(){
        const form = document.getElementById('dino-compare');
        form.style.display = 'none';
        
    });