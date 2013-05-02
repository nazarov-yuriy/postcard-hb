/**
 * Created with JetBrains WebStorm.
 * User: firefish
 * Date: 02/05/13
 * Time: 13:41
 * To change this template use File | Settings | File Templates.
 */
var ctx;
var traps0 = {
    //H
    30:{40:2,48:1},
    32:{48:4,45:1,43:4,40:3},
    35:{48:1,45:2,43:3,40:2},
    37:{40:3,48:4},

    //A
    40:{44:1,48:4},
    41:{44:4,41:1},
    42:{41:4,40:1,46:2,48:3},
    45:{41:1,40:2,46:3,48:4},
    46:{44:1,41:2},
    47:{44:2,48:3},

    //P
    50:{40:2,48:1},
    52:{45:1,48:4},
    54:{40:3,41:4,44:1,45:4},
    55:{41:3,44:4},

    //P
    60:{40:2,48:1},
    62:{45:1,48:4},
    64:{40:3,41:4,44:1,45:4},
    65:{41:3,44:4},

    //Y
    70:{40:1,43:4},
    71:{40:2,42:1,43:3,44:4},
    72:{42:2,43:1,44:3,48:4},
    74:{42:1,43:4,44:2,48:3},
    75:{40:1,42:4,43:2,44:3},
    76:{40:2,43:3}
};

var traps1 = {
    //B
    30:{60:1,68:4},
    34:{60:2,61:1,63:2,65:1,67:2,68:3},
    35:{61:2,63:3,65:2,67:3},

    //I
    40:{60:1,62:4, 66:1,68:4},
    41:{62:3,66:4},
    43:{62:2,66:1},
    44:{60:2,62:3, 66:2,68:3},

    //R
    50:{60:1,68:4},
    51:{67:2,68:3},
    53:{64:2,65:1,67:3,68:4},
    54:{60:2,61:1,65:2,66:1},
    55:{61:2,64:3,66:2,68:3},

    //T
    60:{60:2,62:1},
    62:{62:2,68:1},
    64:{62:1,68:4},
    66:{60:3,62:4},

    //H
    70:{60:2,68:1},
    72:{68:4,65:1,63:4,60:3},
    75:{68:1,65:2,63:3,60:2},
    77:{60:3,68:4},

    //D
    80:{60:2,62:1,66:2,68:1},
    81:{62:2,66:3},
    85:{60:3,61:4,67:1,68:4},
    86:{61:3,67:4},

    //A
    90:{64:1,68:4},
    91:{64:4,61:1},
    92:{61:4,60:1,66:2,68:3},
    95:{61:1,60:2,66:3,68:4},
    96:{64:1,61:2},
    97:{64:2,68:3},

    //Y
    100:{60:1,63:4},
    101:{60:2,62:1,63:3,64:4},
    102:{62:2,63:1,64:3,68:4},
    104:{62:1,63:4,64:2,68:3},
    105:{60:1,62:4,63:2,64:3},
    106:{60:2,63:3}
};

function insRect(x,y){
    ctx.fillStyle="#FFFF00";
    ctx.fillRect(x*4,y*4,4,4);
}

function delRect(x,y){
    ctx.fillStyle="#000000";
    ctx.fillRect(x*4,y*4,4,4);
}
var snakes = {};
function generate_snake(x,y,len,dir){
    var res = {direction: dir, points: {}};
    var nx = x;
    var ny = y;
    for(var i = len-1; i>=0; i--){
        res.points[i] = {x: nx, y: ny};
        switch(dir){
            case 1: nx--; break;
            case 2: ny--; break;
            case 3: nx++; break;
            case 4: ny++; break;
        }
    }
    return res;
}

function snake(state){
    var keys = new Array();
    var nx;
    var ny;
    for (i in state.points)
        keys.push(parseInt(i));

    keys = keys.sort(function(a,b){return a-b});
    var todel = keys.shift();
    delRect(state.points[todel].x, state.points[todel].y);
    delete state.points[todel];
    if(state.direction == 0 && Math.random()<0.0){
        nx = state.points[keys[keys.length-1]].x+
                (Math.random()<0.5?1:-1)*
                (state.points[keys[keys.length-1]].y-
                state.points[keys[keys.length-2]].y);
        ny = state.points[keys[keys.length-1]].y+
                (Math.random()<0.5?1:-1)*
                (state.points[keys[keys.length-1]].x-
                state.points[keys[keys.length-2]].x);
    }else if(state.direction > 0){
        nx = state.points[keys[keys.length-1]].x;
        ny = state.points[keys[keys.length-1]].y;
        switch(state.direction){
            case 1: nx++; break;
            case 2: ny++; break;
            case 3: nx--; break;
            case 4: ny--; break;
        }

    }else{
            nx = 2*state.points[keys[keys.length-1]].x-state.points[keys[keys.length-2]].x;
            ny = 2*state.points[keys[keys.length-1]].y-state.points[keys[keys.length-2]].y;
    }

    state.points[1+keys[keys.length-1]] = {
        x: nx,
        y: ny
    };
    if(traps0[nx] && traps0[nx][ny]){
        state.direction = traps0[nx][ny];
    }
    if(traps1[nx] && traps1[nx][ny]){
        state.direction = traps1[nx][ny];
    }

    for(var i in keys){
        insRect(state.points[keys[i]].x, state.points[keys[i]].y);
    }
}
//                H   A   P   P   Y   B   I   R   T   H   D   A   Y
var x_coords   = [30, 40, 50, 60, 70, 30, 40, 50, 60, 70, 80, 90, 100];
var lengths    = [35, 30, 20, 22, 30, 25, 25, 30, 25, 35, 30, 30, 30];
var diections  = [2, 2, 2, 2, 2,      4, 4, 4, 4, 4, 4, 4, 4];

function load(){
    var c=document.getElementById("myCanvas");
    ctx=c.getContext("2d");
    for(var i =0; i<13; i++){
        snakes[i] = generate_snake(x_coords[i], diections[i]==2?lengths[i]:120-lengths[i], lengths[i], diections[i]);
        setInterval("snake(snakes["+i+"]);", 50);
    }
}