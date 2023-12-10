var returnInterval;
var night = "off"
var starThrottle = "off"
function expandSun(){
    varRays = $("#raysContainer .rays");
    $(varRays).each((id, value)=>{
        setTimeout(() => {
            let deg=id*22.5
            // console.log(value);
            // console.log(id)
            $(value).css("transform","rotate("+deg+"deg)"
            )
        }, id*90);


})
varRays2 = $("#raysContainer2 .rays");
// console.log(varRays2)
$(varRays2).each((id, value)=>{
    setTimeout(() => {
        let deg=id*22.5+10
        // console.log(value);
        // console.log(id)
        $(value).css("transform","rotate("+deg+"deg)"
        )
    }, id*70);


})

}

var dragTrigger= "off"
expandSun()

$("#sunFace").mousedown(()=>{
    console.log("mouseDown")
    if(dragTrigger=="off"&&night=="off"){
        dragTrigger="on"
        // console.log(dragTrigger)
    }
    // console.log(dragTrigger)


})
$("#sunFace").click(()=>{
    // console.log("click")
    if(dragTrigger=="off"&&night=="off"){
        dragTrigger="on"
        // console.log(dragTrigger)
    }
    console.log(dragTrigger)


})

$("body").mouseup(()=>{
    
    if(dragTrigger=="on"&&night=="off"){
        dragTrigger="off"
        console.log(dragTrigger)
        nightReturn()
    }
    // console.log(dragTrigger)


})


function nightStart(){

    console.log("night start")

    night="on";
    $("#sunDial").addClass("fadeSun");
    setTimeout(() => {
        $("#sunDial").css("display","none")
        $("#fool").css("display","unset")
        setTimeout(() => {
            $("#princess").css("opacity",1)

        }, 1000);
        
    }, 1000);


}

function nightGrow(){
    var sunDial = $("#sunDial");
    var sundialRotation = $(sunDial).attr("style");
    // console.log(sundialRotation)
    sundialRotation= sundialRotation.split("transform:rotate(")[1]
    // console.log(sundialRotation)
    sundialRotation=sundialRotation.split("deg)")[0]
    var newAngle = sundialRotation-.4;

 if (newAngle <= -25) {
 $("#towerNight").css("animation", "flipUp 1s both");

  }
    if(newAngle<=-40){
        nightStart()
    }
    else{

        if(starThrottle=="off"){
            console.log("creating stars")
            createStars(newAngle)
            starThrottle="on"
            setTimeout(() => {
                starThrottle="off"
    
            }, 100);
        }
    $(sunDial).attr("style","transform:rotate("+parseFloat(newAngle)+"deg)")
    // console.log(parseFloat(sundialRotation))
    let reverseAngel = parseFloat(newAngle)*-1
    // console.log(reverseAngel)
    $("#sunFace").attr("style","transform:rotate("+reverseAngel+"deg)scale(.6)")

    var nightOpacity = $("#night").css("opacity");
    nightOpacity=parseFloat(nightOpacity)
    nightOpacity+=.003;
    $("#night").css("opacity",nightOpacity)
    $("#raysContainer2").css("animation","rotateSun 3s linear infinite")
 
    }
}

function nightReturn(){
    var sunDial = $("#sunDial");

    $(sunDial).attr("style","transform:rotate(20deg)")
    // console.log(parseInt(sundialRotation))
    $("#sunFace").attr("style","transform:rotate(-20deg)scale(.6")

    $("#night").css("opacity",".0")
    $("#raysContainer2").css("animation","")


}



function nightReturnGradual(){
 

   var sunDial = $("#sunDial");
    var sundialRotation = $(sunDial).attr("style");
    // console.log(sundialRotation)
    sundialRotation= sundialRotation.split("transform:rotate(")[1]
    sundialRotation=sundialRotation.split("deg)")[0]
    var newAngle = sundialRotation-.3;
    // if(newAngle<=-30){

    // }
    $(sunDial).attr("style","transform:rotate("+parseFloat(newAngle)+"deg)")

    // console.log(parseInt(sundialRotation))
    $("#sunFace").attr("style","transform:rotate("+(-1*parseFloat(newAngle))+"deg)scale(.6")

    var nightOpacity = $("#night").css("opacity");
    nightOpacity=parseFloat(nightOpacity)
    nightOpacity+=.005;
    $("#night").css("opacity",nightOpacity)
}
$("body").mousemove(()=>{
    if(dragTrigger=="on"&&night=="off"){
        // console.log("dragging")
        nightGrow()


    }
})

function createStars(rotation){
    console.log(rotation)
    difference = -45 - rotation;
    // if(difference<=-5){
        console.log("difference")
        console.log(difference);
        var percentage = (Math.abs(difference) / 65)*100
        for(let i=0; i<1; i++){
            let randtop = Math.random()*60+2;
            let randsize = Math.random()+.1
            let randRotation = Math.random()*65 - 45
            let randLeft = Math.random()*5-4 
            let starContainer = $("<div>")
            // console.log("rotation("+
            // parseInt(randRotation)+"deg)"
            // // "scale(" +randsize+")"
            // )
            starContainer.addClass("starContainer")
            starContainer.css("transform",
            "scale(" +randsize+")"+
            "rotate("+parseInt(randRotation)+"deg)"
            )
            console.log(starContainer.css("transform"))
            starContainer.css("top", randtop+"%");
            starContainer.css("left", (percentage+randLeft)+"%");
            $("#sky").append(starContainer)


        // }
        

    }
}