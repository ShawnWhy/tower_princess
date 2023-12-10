var returnInterval;
var night = "off"

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
    }, 400);


}

function nightGrow(){
    var sunDial = $("#sunDial");
    var sundialRotation = $(sunDial).attr("style");
    // console.log(sundialRotation)
    sundialRotation= sundialRotation.split("transform:rotate(")[1]
    console.log(sundialRotation)
    sundialRotation=sundialRotation.split("deg)")[0]
    var newAngle = sundialRotation-.2;
    if(newAngle<=-30){
        nightStart()
    }
    else{
    $(sunDial).attr("style","transform:rotate("+parseFloat(newAngle)+"deg)")
    // console.log(parseInt(sundialRotation))
    $("#sunFace").attr("style","transform:rotate(-"+parseFloat(newAngle)+"deg)scale(.6")

    var nightOpacity = $("#night").css("opacity");
    nightOpacity=parseFloat(nightOpacity)
    nightOpacity+=.005;
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
    var newAngle = sundialRotation-.2;
    // if(newAngle<=-30){

    // }
    $(sunDial).attr("style","transform:rotate("+parseFloat(newAngle)+"deg)")

    // console.log(parseInt(sundialRotation))
    $("#sunFace").attr("style","transform:rotate(-"+parseFloat(newAngle)+"deg)scale(.6")

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