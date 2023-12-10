// let audioContext;
// $("body").click(()=>{
//     audioContext= new AudioContext();
//     const lute = new Audio("./sounds/luteplay.mp3");
//     const source = audioContext.createMediaElementSource(lute)
//     source.connect(audioContext.destination);
//     console.log(audioContext)

// }
// )


// async function getFile(filePAth){
//     const response = await fetch(filePAth);
//     const arrayBuffer = await response.arrayBuffer();
//     const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
// }

// async function setupSamples(paths){


// }
var pageSoundTrigger = "on";
var clinkSoundTrigger = "on"
var returnInterval;
var night = "off"
var starThrottle = "off"
function expandSun() {
    // console.log($("#clink"))
    varRays = $("#raysContainer .rays");
    $(varRays).each((id, value) => {
        setTimeout(() => {
            let deg = id * 22.5
            // console.log(value);
            // console.log(id)
            $(value).css("transform", "rotate(" + deg + "deg)"
            )
            if (clinkSoundTrigger == "on") {
                document.querySelector("#clink").currentTime = .45;
                if (document.querySelector("#clink").paused) {
                    document.querySelector("#clink").play()
                }
            }
            // $("#clink").play();
            if (id >= 7) {
                setTimeout(() => {
                    clinkSoundTrigger = "off"
                    // console.log("clinkoff")
                }, 500);

            }

        }, id * 120);




    })
    varRays2 = $("#raysContainer2 .rays");
    // console.log(varRays2)
    $(varRays2).each((id, value) => {
        setTimeout(() => {
            let deg = id * 22.5 + 10
            // console.log(value);
            // console.log(id)
            $(value).css("transform", "rotate(" + deg + "deg)"
            )
        }, id * 70);


    })

}

var dragTrigger = "off"
$('body').click(() => {
    $('#cover').css("display", "none")
    expandSun()

    $("#instructions").html(
      "Please click on the sun and then move your mouse to make it go across the sky"
    );

})

$("#sunFace").mousedown(() => {
    // console.log("mouseDown")
    if (dragTrigger == "off" && night == "off") {
        dragTrigger = "on"
        // console.log(dragTrigger)
    }
    // console.log(dragTrigger)


})
$("#sunFace").click(() => {
    // console.log("click")
    if (dragTrigger == "off" && night == "off") {
        dragTrigger = "on"
        // console.log(dragTrigger)
    }
    // console.log(dragTrigger)


})

$("body").mouseup(() => {

    if (dragTrigger == "on" && night == "off") {
        dragTrigger = "off"
        // console.log(dragTrigger)
        nightReturn()
    }
    // console.log(dragTrigger)


})


function nightStart() {

    // console.log("night start")

    night = "on";
    $("#sunDial").addClass("fadeSun");
    setTimeout(() => {
        $("#sunDial").css("display", "none")
        $("#fool").css("display", "unset")

        setTimeout(() => {
            $("#fool2").addClass("foolAnimated")

            document.querySelector("#lutePlay").play()
            playStarMusic()
              $("#instructions").html(
                "Please click on a heart in the night sky to read your message"
              );

            setTimeout(() => {
                $("#princess").css("opacity", 1)

            }, 1000);



        }, 1000);

    }, 1000);


}


function nightGrow() {
    var sunDial = $("#sunDial");
    var sundialRotation = $(sunDial).attr("style");
    // console.log(sundialRotation)
    sundialRotation = sundialRotation.split("transform:rotate(")[1]
    // console.log(sundialRotation)
    sundialRotation = sundialRotation.split("deg)")[0]
    var newAngle = sundialRotation - .4;

    if (newAngle <= -25) {
        $("#towerNight").css("animation", "flipUp 1s both");
        if (pageSoundTrigger == "on") {
            document.querySelector("#page").play();
            pageSoundTrigger = "off"
            // console.log("pagesoundoff")
        }
    }
    if (newAngle <= -40) {
        nightStart()
    }
    else {

        if (starThrottle == "off") {
            // console.log("creating stars")
            createStars(newAngle)
            starThrottle = "on"
            setTimeout(() => {
                starThrottle = "off"

            }, 100);
        }
        $(sunDial).attr("style", "transform:rotate(" + parseFloat(newAngle) + "deg)")
        // console.log(parseFloat(sundialRotation))
        let reverseAngel = parseFloat(newAngle) * -1
        // console.log(reverseAngel)
        $("#sunFace").attr("style", "transform:rotate(" + reverseAngel + "deg)scale(.6)")

        var nightOpacity = $("#night").css("opacity");
        nightOpacity = parseFloat(nightOpacity)
        if (nightOpacity <= .8) {
            nightOpacity += .005;
            $("#night").css("opacity", nightOpacity)
        }
        $("#raysContainer2").css("animation", "rotateSun 3s linear infinite")

    }
}

function nightReturn() {
    var sunDial = $("#sunDial");

    $(sunDial).attr("style", "transform:rotate(20deg)")
    // console.log(parseInt(sundialRotation))
    $("#sunFace").attr("style", "transform:rotate(-20deg)scale(.6")

    $("#night").css("opacity", ".0")
    $("#raysContainer2").css("animation", "")


}



function nightReturnGradual() {


    var sunDial = $("#sunDial");
    var sundialRotation = $(sunDial).attr("style");
    // console.log(sundialRotation)
    sundialRotation = sundialRotation.split("transform:rotate(")[1]
    sundialRotation = sundialRotation.split("deg)")[0]
    var newAngle = sundialRotation - .3;
    // if(newAngle<=-30){

    // }
    $(sunDial).attr("style", "transform:rotate(" + parseFloat(newAngle) + "deg)")

    // console.log(parseInt(sundialRotation))
    $("#sunFace").attr("style", "transform:rotate(" + (-1 * parseFloat(newAngle)) + "deg)scale(.6")

    var nightOpacity = $("#night").css("opacity");
    nightOpacity = parseFloat(nightOpacity)
    nightOpacity += .02;
    $("#night").css("opacity", nightOpacity)
}
$("body").mousemove(() => {
    if (dragTrigger == "on" && night == "off") {
        // console.log("dragging")
        nightGrow()


    }
})
var musicWave = 0;
var wave = "down";
var starMusicInterval;
var starMusicInterval2;
function playStarMusic() {
starMusicInterval = setInterval(() => {

     var stars = $(".starContainer, .heartContainer")
     $(stars).each((id, value) => {

        let left=$(value).css("left")
        
        left = parseFloat(left.split("px")[0])
        if(left<=0){
            $(value).remove()
        }
        else{
        left-=3;
        // console.log(left);
        $(value).css("left",left+"px")
        }
        
     });
    }, 50);

     starMusicInterval2 = setInterval(() => {
    for (let i = 0; i < 1; i++) {
        var heartTrigger = "off";

        let randSelect = Math.random();
        if(randSelect>=.8){
            heartTrigger="on"
        }
        let randtop = Math.random() * 10-5;
        let randsize = Math.random() + .1
        let randRotation = Math.random() * 65 - 45
        let randLeft = Math.random() * 15 - 8
        let starContainer = $("<div>")
        // console.log("rotation("+
        // parseInt(randRotation)+"deg)"
        // // "scale(" +randsize+")"
        // )
        if(heartTrigger=="on"){
        starContainer.addClass("heartContainer");    
        }
        else{
         starContainer.addClass("starContainer");
        }
       
        starContainer.css("transform",
            "scale(" + randsize + ")" +
            "rotate(" + parseInt(randRotation) + "deg)"
        )
        // console.log(starContainer.css("transform"))
        starContainer.css("top", (randtop+musicWave) + "%");
        starContainer.css("left", 100+randLeft + "%");
        $("#sky").append(starContainer)
    }
   
    if(musicWave>=60){
        wave = "down"
    }
    else if(
        musicWave<=0
    ){
        wave="up"
    }

    if(wave=="down"){
        musicWave--
    }
    else if(wave="up"){
        musicWave++
    }
}, 250);


}
function createStars(rotation) {
    // console.log(rotation)
    difference = -45 - rotation;
    // if(difference<=-5){
    // console.log("difference")
    // console.log(difference);
    var percentage = (Math.abs(difference) / 65) * 100
    for (let i = 0; i < 1; i++) {
        let randtop = Math.random() * 60 + 2;
        let randsize = Math.random() + .1
        let randRotation = Math.random() * 65 - 45
        let randLeft = Math.random() * 5 - 4
        let starContainer = $("<div>")
        // console.log("rotation("+
        // parseInt(randRotation)+"deg)"
        // // "scale(" +randsize+")"
        // )
        starContainer.addClass("starContainer")
        starContainer.css("transform",
            "scale(" + randsize + ")" +
            "rotate(" + parseInt(randRotation) + "deg)"
        )
        // console.log(starContainer.css("transform"))
        starContainer.css("top", randtop + "%");
        starContainer.css("left", (percentage + randLeft) + "%");
        $("#sky").append(starContainer)

    }
}

$("#sky").on("click",".heartContainer", ()=>{

    console.log("clicking star")
    $("#letter").css("display","unset")
    $("#letterA").css("display","unset")

    setTimeout(() => {
        $("#letterB").css("display","unset")
        setTimeout(() => {
               $("#letterB").css("animation", "letterFlip1 .5s both"); 

        }, 200);
        document.querySelector("#page").currentTime=0;
        document.querySelector("#page").play();
    }, 400);
    setTimeout(() => {
         document.querySelector("#page").currentTime = 0;
         document.querySelector("#page").play();
        $("#letterC").css("display","unset")
        setTimeout(() => {
               $("#letterC").css("animation", "letterFlip2 .5s both");
         }, 200);
         $("#Message").css("opacity", 1);
    }, 800);
})

$("#letter").click(()=>{
    $("#letter").css("display","none");
})