var getRandomNumber = function(size) {
    return Math.floor(Math.random() * size);
};

var getDistance = function(event, target) {
    var diffx = event.offsetX - target.x;
    var diffy = event.offsetY - target.y;
    return Math.sqrt((diffx * diffx) + (diffy * diffy));
};

var width = 400;
var height = 400;
var clicks = 0;
var target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
};

$("#map").click(function(event) {
    clicks++;
    var distance = getDistance(event, target);
    $("#distance").text("");

    if (distance < 160) {
        $("#output").html("在古老的图书馆里找到了第一个线索...");
        showImage("images/library.jpg");

        if (distance > 90 && distance < 100) {
            $("#output").append("<p>解码成功!宝藏在一座古老的神庙中...(点击神庙图片)</p>");
            showImage("images/temple.jpg");
        } else {
            $("#output").append("<p>没有线索可以解码，再找找吧!</p>");
            return; // 回到地图
        }

        // 点击神庙图片
        $("#imageContainer").off('click').on('click', function() {
            var random = Math.random();
            if (random < 0.5) {
                $("#output").append("<p>糟糕!遇到了神庙守卫!</p>");
                alert("游戏结束，回到地图");
                resetGame();
            } else {
                $("#output").append("<p>找到了一个神秘的箱子...</p>");
                setTimeout(function() {
                    showImage("images/box.jpg");
                    var puzzleRandom = Math.random();
                    if (puzzleRandom < 0.5) {
                        $("#output").append("<p>糟糕!谜题没有解开!</p>");
                    } else {
                        $("#output").append("<p>谜题解开了!恭喜!你找到了传说中的宝藏!</p>");
                        setTimeout(function() {
                            showImage("images/treasure.jpg");
                        }, 1000);
                    }
                }, 3000);
            }
        });
    }else {
        $("#output").append("<p>附件没有宝藏!去远处找找吧!</p>");
    }
});

function showImage(src) {
    const img = document.createElement("img");
    img.src = src;
    img.className = "game-image";
    document.getElementById('imageContainer').innerHTML = ""; // Clear previous images
    document.getElementById('imageContainer').appendChild(img);
}

function resetGame() {
    $("#output").empty();
    $("#imageContainer").empty();
    clicks = 0;
    target = {
        x: getRandomNumber(width),
        y: getRandomNumber(height)
    };
    $("#distance").text("");
    alert("点击地图来寻找宝藏!");
}

document.getElementById('startButton').addEventListener('click', function() {
    resetGame();
});
