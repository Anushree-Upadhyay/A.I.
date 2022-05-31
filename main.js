function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas(){
    background("white");
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw(){
     stroke("black");
     strokeWeight(5);
     if (mouseIsPressed){
         line(pmouseX, pmouseY, mouseX, mouseY);
     }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, result){
if (error){
    console.log(error);
}
else {
    console.log(result);
    document.getElementById("label").innerHTML = 'label: ' + result[0].label;
    document.getElementById("confidence").innerHTML = 'confidense: ' + Math.round(result[0].confidence * 100) + '%';
    utterthis = new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterthis);
}
}