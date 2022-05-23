video = "";
status1 = "";
objects = [];

function preload(){
    video = createCapture();
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0 , 0 , 480 , 380 );

    if(status1 != ""){
        objectDetector.detect(video, gotResults);
        for(i= 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke("blue");
            Rect(objects[i].x, objects[i].y, object[i].width, object[i].height);

            if( objects[i].label == objectName ){
                video.stop();
                document.getElementById("status").innerHTML = "Status : OBJECT FOUND";
            }
            else{
                document.getElementById("status").innerHTML = "Status : Object not found";
            }
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status :  Detecting Objects";
    objectName = document.getElementById("name").value;
}

function modelLoaded(){
    console.log("Model is Loaded");
    status1 = true;
    video.loop();
    video.speed(1) ;
    video.volume(0);
}

function gotResults(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}