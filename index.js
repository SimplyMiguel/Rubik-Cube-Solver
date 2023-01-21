let canvas = document.getElementById("Canvas");
canvas.style.background = "rgb(255, 214, 205)";
canvas.parentElement.style.textAlign = "center";
let context = canvas.getContext("2d");

class cubelet {
  constructor(canvas, x, y, colorLetter) {
    this.size = 50; // size of the square
    this.canvas = canvas; // canvas element to draw the square on
    this.context = canvas.getContext('2d'); // canvas context
    this.x = x; // x position of the square on the canvas
    this.y = y; // y position of the square on the canvas
    this.colors = {
      "R": "blue",
      "U": "red",
      "F": "yellow", 
      "D": "orange",
      "L": "green",
      "B": "white",

      "blue": "R",
      "red": "U",
      "yellow": "F", 
      "orange": "D",
      "green": "L",
      "white": "B"
    };
    this.faceLetter = colorLetter
    this.color = this.colors[this.faceLetter]; // color of the square
    this.draw(); // draw the square on the canvas
    this.addClickListeners(); // add click event listeners to the square

  }
  // draws the square on the canvas
  draw() {
    // set the fill color and stroke color of the context
    this.context.fillStyle = this.color;
    this.context.strokeStyle = 'black';

    // draw the square on the canvas with a black border
    this.context.fillRect(this.x, this.y, this.size, this.size);
    this.context.lineWidth = 3
    this.context.strokeRect(this.x + 2, this.y + 2, this.size - 4, this.size - 4);
}
  // adds click event listeners to the square that allow the user to change its color
  addClickListeners() {
    $(this.canvas).click(function(event) {
      // get the position of the clicked point on the canvas
      const x = (event.pageX - this.canvas.offsetLeft) - 24
      const y = (event.pageY - this.canvas.offsetTop) - 26

      // check if the clicked point is within the bounds of the square
      if (x >= this.x && x <= this.x + this.size - 7 && y >= this.y && y <= this.y + this.size - 7) {
        // change the color of the square
        // change the color of the square 
        const temp = {
          "R": 0,
          "U": 1,
          "F": 2, 
          "D": 3,
          "L": 4,
          "B": 5,

          0: "R",
          1: "U",
          2: "F", 
          3: "D",
          4: "L",
          5: "B"
        };
        var tempNum = temp[this.faceLetter]
        tempNum = (tempNum + 1) % 6
        this.faceLetter = temp[tempNum]
        this.color = this.colors[this.faceLetter]
        this.draw();
      }
    }.bind(this)) // bind the correct value of `this` to the event listener function
  }


}

class face {
  constructor(faceLetter, x, y){
    this.letter = faceLetter;
    this.colors = {
      "R": "blue",
      "U": "red",
      "F": "yellow", 
      "D": "orange",
      "L": "green",
      "B": "white",

      "blue": "R",
      "red": "U",
      "yellow": "F", 
      "orange": "D",
      "green": "L",
      "white": "B"
    };
    this.faceCubelets = [];
    this.x = x;
    this.y = y;
    this.draw();    
  }
  draw(){
    this.faceCubelets = [
      new cubelet(canvas, this.x, this.y, this.letter),
      new cubelet(canvas, this.x + 50, this.y, this.letter),
      new cubelet(canvas, this.x + 100, this.y, this.letter),

      new cubelet(canvas, this.x, this.y + 50, this.letter),
      new cubelet(canvas, this.x + 50, this.y + 50, this.letter),
      new cubelet(canvas, this.x + 100, this.y + 50, this.letter),

      new cubelet(canvas, this.x, this.y + 100, this.letter),
      new cubelet(canvas, this.x + 50, this.y + 100, this.letter),
      new cubelet(canvas, this.x + 100, this.y + 100, this.letter)

    ]
  }
  stringForm(){
    var temp = "" + this.faceCubelets[0].faceLetter + this.faceCubelets[1].faceLetter + this.faceCubelets[2].faceLetter + this.faceCubelets[3].faceLetter + this.faceCubelets[4].faceLetter + this.faceCubelets[5].faceLetter + this.faceCubelets[6].faceLetter + this.faceCubelets[7].faceLetter + this.faceCubelets[8].faceLetter
    return temp
  }
}

class rubikCube {
  constructor(){
    this.faces = [];
    this.draw();
  }
  draw(){
    this.faces = [
      new face("U", 450, 50), // <<-- red
      new face("R", 600, 200), // <<-- blue
      new face("F", 450, 200), // <<-- yellow
      new face("D", 450, 350), // <<-- orange
      new face("L", 300, 200), // <<-- green
      new face("B", 750, 200) // <<-- white
    ]
  }
  isValid(){
    var colorCount = {
      "U": 0,
      "R": 0,
      "F": 0, 
      "D": 0,
      "L": 0,
      "B": 0
    }
    for(var i = 0; i < 6; i++){
      for(var x = 0; x < 9; x++){
        var currentColorfaceLetter = this.faces[i].faceCubelets[x].faceLetter
        colorCount[currentColorfaceLetter]++
      }
    }
    for(const colors in colorCount){
      if(colorCount[colors] != 9){
        return false
      }
    }
    return true

  }
  stringForm(){
    var cubeStringForm = ""
    for(var i = 0; i < 6; i++){
      cubeStringForm += this.faces[i].stringForm()
    }
    return cubeStringForm
  }
}

class parallelogram {
  constructor(canvas, faceLetter, color, x, y){
    this.color = color
    this.canvas = canvas
    this.x = x
    this.y = y
    this.faceLetter = faceLetter
    if(faceLetter == "U"){
      this.drawU(x, y, canvas)
    } else if (faceLetter == "F"){
      this.drawF(x, y, canvas)
    } else {
      this.drawR(x, y, canvas)
    }
  }
  drawF(x, y, canvas){
    var ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = "black"
    ctx.lineWidth = 4
    
    ctx.moveTo(x, y); 
    ctx.lineTo((x + 50), (y + 25));
    ctx.lineTo((x + 50), (y + 75));
    ctx.lineTo(x, (y + 50));
    ctx.closePath();
    
    ctx.fill();
    ctx.stroke();
  }
  drawU(x, y, canvas){
    var ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = "black"
    ctx.lineWidth = 4
    
    ctx.moveTo(x, y)
    ctx.lineTo((x + 50), (y - 25));
    ctx.lineTo((x + 100), y);
    ctx.lineTo((x + 50), (y + 25));
    ctx.closePath();
    
    ctx.fill();
    ctx.stroke();
  }
  drawR(x, y, canvas){
    var ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = "black"
    ctx.lineWidth = 4
    
    ctx.moveTo(x, y); 
    ctx.lineTo((x + 50), (y - 25));
    ctx.lineTo((x + 50), (y - 75));
    ctx.lineTo(x, (y - 50));
    ctx.closePath();
    
    ctx.fill();
    ctx.stroke();
  }
  addDirectionalArrow(direction, move){

  }
  
}

class solvedCube {
  constructor(x, y, canvas, cubeString){
    this.cubeString = cubeString
    this.stringAlgorithm = Cube.fromString(cubeString).solve().split(" ")
    this.algorithmPhases = []
    this.i = -1;
    this.sidePOV = []
    this.draw(canvas, x, y)
    this.drawArrows(canvas, x, y)
    this.addClickListeners(canvas, x, y)
  }
  draw(canvas, x, y){
    var tempColors = {
      "R": "blue",
      "U": "red",
      "F": "yellow", 
      "D": "orange",
      "L": "green",
      "B": "white",
    }
    this.sidePOV = [
      // face cubelets
      new parallelogram(canvas, "F", tempColors[this.cubeString[18]], x, y),
      new parallelogram(canvas, "F", tempColors[this.cubeString[19]], (x + 50), (y + 25)),
      new parallelogram(canvas, "F", tempColors[this.cubeString[20]], (x + 100), (y + 50)),
      new parallelogram(canvas, "F", tempColors[this.cubeString[21]], x, (y + 50)),
      new parallelogram(canvas, "F", tempColors[this.cubeString[22]], (x + 50), (y + 75)),
      new parallelogram(canvas, "F", tempColors[this.cubeString[23]], (x + 100), (y + 100)),
      new parallelogram(canvas, "F", tempColors[this.cubeString[24]], x, (y + 100)),
      new parallelogram(canvas, "F", tempColors[this.cubeString[25]], (x + 50), (y + 125)),
      new parallelogram(canvas, "F", tempColors[this.cubeString[26]], (x + 100), (y + 150)),
      
      
      //upper cubelets
      new parallelogram(canvas, "U", tempColors[this.cubeString[0]], (x + 100), (y - 50)),
      new parallelogram(canvas, "U", tempColors[this.cubeString[1]], (x + 150), (y - 25)),
      new parallelogram(canvas, "U", tempColors[this.cubeString[2]], (x + 200), y),
      new parallelogram(canvas, "U", tempColors[this.cubeString[3]], (x + 50), (y - 25)),
      new parallelogram(canvas, "U", tempColors[this.cubeString[4]], (x + 100), y),
      new parallelogram(canvas, "U", tempColors[this.cubeString[5]], (x + 150), (y + 25)),
      new parallelogram(canvas, "U", tempColors[this.cubeString[6]], x, y),
      new parallelogram(canvas, "U", tempColors[this.cubeString[7]], (x + 50), (y + 25)),
      new parallelogram(canvas, "U", tempColors[this.cubeString[8]], (x + 100), (y + 50)),
      
      // right-side cubelets
      new parallelogram(canvas, "R", tempColors[this.cubeString[9]], (x + 150), (y + 125)),
      new parallelogram(canvas, "R", tempColors[this.cubeString[10]], (x + 200), (y + 100)),
      new parallelogram(canvas, "R", tempColors[this.cubeString[11]], (x + 250), (y + 75)),
      new parallelogram(canvas, "R", tempColors[this.cubeString[12]], (x + 150), (y + 175)),
      new parallelogram(canvas, "R", tempColors[this.cubeString[13]], (x + 200), (y + 150)),
      new parallelogram(canvas, "R", tempColors[this.cubeString[14]], (x + 250), (y + 125)),
      new parallelogram(canvas, "R", tempColors[this.cubeString[15]], (x + 150), (y + 225)),
      new parallelogram(canvas, "R", tempColors[this.cubeString[16]], (x + 200), (y + 200)),
      new parallelogram(canvas, "R", tempColors[this.cubeString[17]], (x + 250), (y + 175))
    ]
    
  }
  drawArrows(canvas, x, y){
    let ctx = canvas.getContext("2d")
    //start a new path
    ctx.beginPath()
    ctx.fillStyle = "gray"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 4
    x = x - 100
    y = y + 300
    
    ctx.moveTo(x, y)
    ctx.lineTo(x + 25,y - 25)
    ctx.lineTo(x + 25,y - 12.5)
    ctx.lineTo(x + 100, y - 12.5)
    ctx.lineTo(x + 100, y + 12.5)
    ctx.lineTo(x + 25, y + 12.5)
    ctx.lineTo(x + 25, y + 25)
    ctx.closePath()
    
    x = x * 3
    ctx.moveTo(x,y)
    ctx.lineTo(x - 25, y + 25)
    ctx.lineTo(x - 25, y + 12.5)
    ctx.lineTo(x - 100, y + 12.5)
    ctx.lineTo(x - 100, y - 12.5)
    ctx.lineTo(x - 25, y - 12.5)
    ctx.lineTo(x - 25, y - 25)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    
    // How to store the algorithm-cube phases in an array; 
    // step 1) create a loop that will traverse all the elements in the stringAlgorithm list
    // step 2) create a list algorithmPhases that will store the string values of the cube starting from ([0]) <- the first move, all the way to ([-1]) <- the solved cube, AKA the last move.
  
    // How can 
    var tempCube = Cube.fromString(this.cubeString)
    this.algorithmPhases.push(this.cubeString)
    for(var i = 0; i < this.stringAlgorithm.length; i++){
      tempCube.move(this.stringAlgorithm[i])
      this.algorithmPhases.push(tempCube.asString())
    }

  }
  addClickListeners(canvas, x, y){
    $(canvas).click(function(event) {
      var arrowX = event.offsetX
      var arrowY = event.offsetY
      console.log("x: " + arrowX + "\nY: " + arrowY)
      
      //listening for leftArrow 
      if(arrowX > 255 && arrowX < 350 && arrowY > 488 && arrowY < 512){
        if(this.i > 0){
          this.i -= 1
          this.cubeString = this.algorithmPhases[this.i]
          this.draw(canvas, x, y)
          if(this.i != -1){
            this.drawDirection(canvas, x, y, this.stringAlgorithm[this.i])
          }
        } else {
          alert("cant go behing this point")
        }
        
      }
      //listening for rightArrow 
      else if(arrowX > 650 && arrowX < 745 && arrowY > 491 && arrowY < 516){
        // alert("right arrow clicked")
        if(this.i < this.stringAlgorithm.length){
          this.i += 1
          this.cubeString = this.algorithmPhases[this.i]
          this.draw(canvas, x, y)
          console.log("this.i: ", this.i)
          if(this.i != this.stringAlgorithm.length){
            this.drawDirection(canvas, x, y, this.stringAlgorithm[this.i])
          } else {
            let ctx = canvas.getContext("2d")
            ctx.clearRect(635, 120, 100, 60)
          }

        } else {
          alert("already solved")
        }
      }

    }.bind(this))
  }
  drawDirection(canvas, x, y, move){
    var ctx = canvas.getContext("2d")
    console.log("this.i: ", this.i)
    console.log("move: ", move)
    switch(move){
      case "U":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(650, 220)
        ctx.lineTo(500, 290)
        ctx.lineTo(380, 230)
        ctx.lineTo(380, 218)
        ctx.lineTo(355, 235)
        ctx.lineTo(380, 260)
        ctx.lineTo(380, 245)
        ctx.lineTo(500, 310)
        ctx.lineTo(650, 235)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break
        
      case "D":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4

        ctx.moveTo(350, 320)
        ctx.lineTo(500, 385)
        ctx.lineTo(625, 335)
        ctx.lineTo(625, 315)
        ctx.lineTo(650, 335)
        ctx.lineTo(630, 358)
        ctx.lineTo(625, 348)
        ctx.lineTo(500, 405)
        ctx.lineTo(350, 335)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break
          
      case "R":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4

        ctx.moveTo(485, 415)
        ctx.lineTo(485, 265)
        ctx.lineTo(600, 200)
        ctx.lineTo(608, 208)
        ctx.lineTo(616, 185)
        ctx.lineTo(583, 187)
        ctx.lineTo(590, 193)
        ctx.lineTo(465, 255)
        ctx.lineTo(470, 405)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break
            
      case "L":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4

        ctx.moveTo(530, 143)
        ctx.lineTo(385, 215)
        ctx.lineTo(385, 345)
        ctx.lineTo(395, 350)
        ctx.lineTo(380, 365)
        ctx.lineTo(360, 345)
        ctx.lineTo(370, 345)
        ctx.lineTo(365, 205)
        ctx.lineTo(515,  135)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break

      case "F":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(365, 193)
        ctx.lineTo(515, 265)
        ctx.lineTo(515, 395)
        ctx.lineTo(505, 400)
        ctx.lineTo(525, 410)
        ctx.lineTo(545, 390)
        ctx.lineTo(530, 392)
        ctx.lineTo(530, 255)
        ctx.lineTo(375, 188)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break

      case "B":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(635, 355)
        ctx.lineTo(635, 205)
        ctx.lineTo(510 ,145)
        ctx.lineTo(520, 136)
        ctx.lineTo(475, 135)
        ctx.lineTo(475 ,160)
        ctx.lineTo(493, 152)
        ctx.lineTo(620, 213)
        ctx.lineTo(620, 362)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break 
      
      case "U2":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(650, 220)
        ctx.lineTo(500, 290)
        ctx.lineTo(380, 230)
        ctx.lineTo(380, 218)
        ctx.lineTo(355, 235)
        ctx.lineTo(380, 260)
        ctx.lineTo(380, 245)
        ctx.lineTo(500, 310)
        ctx.lineTo(650, 235)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        // Drawing the image/number (X2) to signify 'times two' or 'twice'
        ctx.font = "60px Rubik"
        ctx.fillStyle = "red"
        ctx.fillText("x2", 650, 180)
        break

      case "D2":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(350, 320)
        ctx.lineTo(500, 385)
        ctx.lineTo(625, 335)
        ctx.lineTo(625, 315)
        ctx.lineTo(650, 335)
        ctx.lineTo(630, 358)
        ctx.lineTo(625, 348)
        ctx.lineTo(500, 405)
        ctx.lineTo(350, 335)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        // Drawing the image/number (X2) to signify 'times two' or 'twice'
        ctx.font = "60px Rubik"
        ctx.fillStyle = "red"
        ctx.fillText("x2", 650, 180)
        break

      case "R2":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4

        ctx.moveTo(485, 415)
        ctx.lineTo(485, 265)
        ctx.lineTo(600, 200)
        ctx.lineTo(608, 208)
        ctx.lineTo(616, 185)
        ctx.lineTo(583, 187)
        ctx.lineTo(590, 193)
        ctx.lineTo(465, 255)
        ctx.lineTo(470, 405)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        // Drawing the image/number (X2) to signify 'times two' or 'twice'
        ctx.font = "60px Rubik"
        ctx.fillStyle = "red"
        ctx.fillText("x2", 650, 180)
        break

      case "L2":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4

        ctx.moveTo(530, 143)
        ctx.lineTo(385, 215)
        ctx.lineTo(385, 345)
        ctx.lineTo(395, 350)
        ctx.lineTo(380, 365)
        ctx.lineTo(360, 345)
        ctx.lineTo(370, 345)
        ctx.lineTo(365, 205)
        ctx.lineTo(515,  135)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        // Drawing the image/number (X2) to signify 'times two' or 'twice'
        ctx.font = "60px Rubik"
        ctx.fillStyle = "red"
        ctx.fillText("x2", 650, 180)
        break

      case "F2":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(365, 193)
        ctx.lineTo(515, 265)
        ctx.lineTo(515, 395)
        ctx.lineTo(505, 400)
        ctx.lineTo(525, 410)
        ctx.lineTo(545, 390)
        ctx.lineTo(530, 392)
        ctx.lineTo(530, 255)
        ctx.lineTo(375, 188)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        // Drawing the image/number (X2) to signify 'times two' or 'twice'
        ctx.font = "60px Rubik"
        ctx.fillStyle = "red"
        ctx.fillText("x2", 650, 180)
        break
      
      case "B2":
        ctx.clearRect(635, 120, 100 , 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(635, 355)
        ctx.lineTo(635, 205)
        ctx.lineTo(510 ,145)
        ctx.lineTo(520, 136)
        ctx.lineTo(475, 135)
        ctx.lineTo(475 ,160)
        ctx.lineTo(493, 152)
        ctx.lineTo(620, 213)
        ctx.lineTo(620, 362)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        // Drawing the image/number (X2) to signify 'times two' or 'twice'
        ctx.font = "60px Rubik"
        ctx.fillStyle = "red"
        ctx.fillText("x2", 650, 180)
        break

      case "U'":
        ctx.clearRect(635, 120, 100 , 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4

        ctx.moveTo(350, 220)
        ctx.lineTo(500, 285)
        ctx.lineTo(625, 235)
        ctx.lineTo(625, 215)
        ctx.lineTo(650, 235)
        ctx.lineTo(630, 258)
        ctx.lineTo(625, 248)
        ctx.lineTo(500, 305)
        ctx.lineTo(350, 235)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break

      case "D'":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(650, 320)
        ctx.lineTo(500, 390)
        ctx.lineTo(380, 330)
        ctx.lineTo(380, 318)
        ctx.lineTo(355, 335)
        ctx.lineTo(380, 360)
        ctx.lineTo(380, 345)
        ctx.lineTo(500, 410)
        ctx.lineTo(650, 335)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break

      case "R'":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(630, 193)
        ctx.lineTo(485, 265)
        ctx.lineTo(485, 395)
        ctx.lineTo(495, 400)
        ctx.lineTo(480, 415)
        ctx.lineTo(460, 395)
        ctx.lineTo(470, 395)
        ctx.lineTo(465, 255)
        ctx.lineTo(615, 185)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break

      case "L'":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(385, 365)
        ctx.lineTo(385, 215)
        ctx.lineTo(500, 150)
        ctx.lineTo(508, 158)
        ctx.lineTo(516, 135)
        ctx.lineTo(483, 137)
        ctx.lineTo(490, 143)
        ctx.lineTo(365, 205)
        ctx.lineTo(370, 355)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break

      case "F'":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(535, 405)
        ctx.lineTo(535, 255)
        ctx.lineTo(410 ,195)
        ctx.lineTo(420, 186)
        ctx.lineTo(375, 185)
        ctx.lineTo(375 ,210)
        ctx.lineTo(393, 202)
        ctx.lineTo(520, 263)
        ctx.lineTo(520, 412)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break

      case "B'":
        ctx.clearRect(635, 120, 100, 60)
        ctx.beginPath()
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4
        ctx.moveTo(465, 143)
        ctx.lineTo(615, 215)
        ctx.lineTo(615, 345)
        ctx.lineTo(605, 350)
        ctx.lineTo(625, 360)
        ctx.lineTo(645, 340)
        ctx.lineTo(630, 342)
        ctx.lineTo(630, 205)
        ctx.lineTo(475, 138)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break

      

    }
  }
}

const test = new rubikCube()

Cube.initSolver()
function solve(){
  var cubeForm = Cube.fromString(test.stringForm())
  if(test.isValid()){
    if(cubeForm.isSolved() == false){
      var ansCanvas = document.createElement('canvas');
      let ansContext = ansCanvas.getContext('2d');
      ansCanvas.id = "ansCanvas";
      ansCanvas.setAttribute('width', 1000);
      ansCanvas.setAttribute('height', 600);
      ansCanvas.style.border = "20px solid black";
      ansCanvas.style.backgroundColor = "rgb(205, 235, 235)"
      document.getElementById("ansLocation").appendChild(ansCanvas);
      
      
      var cubeForm = Cube.fromString(test.stringForm())
      var testing = new solvedCube(350, 200, ansCanvas, cubeForm.asString())
      console.log("algorith: ", testing.stringAlgorithm)

      // disabling the solve() button so that a bunch of ansCanvas dont show up on the page
      document.getElementById("SolveBTN").disabled = true;
    } else {
      alert("your cube is already solved")
    }
  } else {
    alert("Your cube is not valid")
  }
}




