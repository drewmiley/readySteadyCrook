function Test1() {
    var b=document.createElement('canvas');
    b.width=320;
    b.height=160;
    c=b.getContext("2d");
    function draw(txt){
    c.font="20px Arial";
    var txtHeight=25;
    var offset=5;
    var w=Math.ceil(c.measureText(txt).width);
    var txt=new Array(w*2).join(txt+' ');
    for(var i=0;i<Math.ceil(b.height/txtHeight);i++){
    c.fillText(txt,-(i*offset),i*txtHeight);
    }
    }
    document.body.appendChild(b);
    draw('1234567');


    var root = document.getElementById('root');
    var canvas = document.createElement('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img1 = new Image();

        //drawing of the test image - img1
        img1.onload = function () {
            //draw background image
            ctx.drawImage(img1, 0, 0);
            //draw a box over the top
            ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
            ctx.fillRect(0, 0, 500, 500);

        };

        img1.src = './image.jpg';
        root.appendChild(canvas)
    }
}
