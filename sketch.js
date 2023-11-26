let pursuer;
let target;
let obstacles = [];
let Véhicules  = []
let debug = true
let wanders = true

function setup() {
  createCanvas(1700, 800);
  pursuer = new Vehicle(100, 100);
  Véhicules .push(pursuer)
  for(let i=0;i<3;i++)
  {
    let car = new Vehicle(random(width),random(height))
    Véhicules.push(car)
  }

  // On cree un obstalce au milieu de l'écran
  // un cercle de rayon 100px
  // TODO
  obstacle = new Obstacle(width/2, height/2, 100);
  obstacles.push(obstacle);
}

function draw() {
  background(0);
 
//   pursuer.applyBehaviors(obstacles,Véhicules )
 
  //let steering = Véhicules [0].applyBehaviors(target, obstacles,Véhicules );
  // Dessin de la cible qui suit la souris
  // Dessine un cercle de rayon 32px à la position de la souris
  target = createVector(mouseX, mouseY);
  fill(255, 0, 0);
  noStroke();
    circle(target.x, target.y, 32);

  // dessin des obstacles
  // TODO
  for(let i = 0; i< Véhicules.length;i++)
  {
    let v = Véhicules [i]
 
      let steering
      if(i==0)
      {
        if(wanders)
        {
        steering = v.wander()
        }
        else
        {
            steering = v.arrive(target)

        }
       
    }
      else
      {
        if(wanders)
        {
        steering = v.wander()
        }
        else
        {
            steering = v.arrive(Véhicules [i-1].pos)
        }
         
          
      }
      let avoidForce = v.avoidAmeliore(obstacles,Véhicules )
      avoidForce.mult(0.5);
      let TotalForce = p5.Vector.add(steering,avoidForce)

      v.applyForce(TotalForce)
      v.update();
      v.show();
      v.edges();
    
    
    }

  obstacles.forEach(o => {
    o.show();
  })
 
  pursuer.applyBehaviors(target, obstacles,Véhicules ) 

 

  
//   Véhicules .forEach(o => {
//     let steering = o.applyBehaviors(target, obstacles,Véhicules );
//     o.applyForce(steering)
//     o.update();
//     o.show();
//     o.edges();
    
//   })
 
  // pursuer = le véhicule poursuiveur, il vise un point devant la cible
 
//   pursuer.applyForce(steering);

//   // déplacement et dessin du véhicule et de la target
//   pursuer.update();
//   pursuer.show();
//   pursuer.edges();
}

function mousePressed() {
    obstacle = new Obstacle(mouseX, mouseY, random(5, 60));
    obstacles.push(obstacle);
  
}

function keyPressed() {
  if (key == "d") {
    debug = !debug;
  } 
  else if(key=="w")
  {
    wanders=!wanders;
  }
 
}