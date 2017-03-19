
//*****************         页面打开       **************************
window.onload=function(){
    ID_timeText = document.getElementById("timeText");
	ID_start = document.getElementById("start");
	randow_s();
	
}
//###################################################################



//******************       打开主页         **************************
function hello(){
	window.open("http://www.helloworld.com");
}
//###################################################################



//****************         显示信息         *************************
var me = {};
function Me(inname, inschool, incountry, inEmail){
	this.name = inname;
	this.country = incountry;
	this.school = inschool;
	this.Email = inEmail;
}
me = new Me("L.Z", "Soochow University", "R.P.China", "zzy123zzy123zzy@163.com");


function contact_me(){
	alert("Name: " + me.name + "\n" + "Country: " + me.country + "\n" +"School: " + me.school  + "\n" + "E-mail: " + me.Email);
}
//###################################################################

var ID_timeText ;
var ID_start ;
var time_c = 0;
var stop = true;
var set_timer;
var time_min;
var time_sec;
//******************         定时器与控制部分       ******************
function timer(){

	time_c = time_c + 1;
	time_min = parseInt(time_c/60);
	time_sec = time_c % 60;

	ID_timeText.innerHTML = "总用时: " + time_min + "分" + time_sec + "秒";
}

function start(){

	if(stop == true){
		stop = false;
		set_timer = setInterval(timer,1000);
		ID_start.innerHTML = "PAUSE";
	}
	else if(stop == false){
		stop = true;
		clearInterval(set_timer);
		ID_start.innerHTML = "START";
	}

}

function restart(){
	stop = true;
	ID_timeText.innerHTML = "总用时: " + 0 + "分" + 0 + "秒";
	time_c = 0;
	clearInterval(set_timer);
	ID_start.innerHTML = "开始";
	randow_s();
	over_flag = false;
}

//###################################################################

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//************************************重点控制代码区域********************************************************
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


//***************************First 随机分配方块 *******************************
var region = new Array;     //方块区域位置


region[0] = [0,0];
region[1] = [150,0];
region[2] = [300,0];
region[3] = [0,150];
region[4] = [150,150];
region[5] = [300,150];
region[6] = [0,300];
region[7] = [150,300];
region[8] = [300,300];


var idenx = [0,1,2,3,4,5,6,7,8];


function randow_s(){
	//var a;
	for (var i = 0; i <= 8; i++) {

		idenx[i] = Math.round(Math.random() * 8) ;	 //math.randow四舍五入？对      //

		for(var j = 0; j<i; j++){
			if(idenx[i] == idenx[j]){
				idenx[i] = Math.round(Math.random() * 8) ;
				j = -1;
			}
		}
	}

	for(var k=1; k<=8; k++)
	{
		document.getElementById("move_"+k).style.left=region[idenx[k-1]][0]+"px";
	    document.getElementById("move_"+k).style.top=region[idenx[k-1]][1]+"px";
	}
}
//#######################################################################################

//**************************        游戏控制           ********************************************
var tran_i = new Array(
	[2,4],
	[1,3,5],
	[2,6],
	[1,5,7],
	[2,4,6,8],
	[3,5,9],
	[4,8],
	[5,7,9],
	[6,8]
	);

var move_flag = false;
var over_flag = false;
function move(num_in){        //主控函数
	move_flag = false;
	var congratulation ;       //只恭喜一次
	congratulation = false;
	if(stop == false && over_flag == false){    //没暂停，没结束
		
			
		for(var j = 0; j<= 4; j++){      //看选择的数字能否移动
			if (idenx[num_in-1] == tran_i[idenx[8]][j] - 1){
				move_flag = true;
				break;
			}
		}
			

		

		if(move_flag == true){     //移动能移动的
			document.getElementById("move_"+num_in).style.left=region[idenx[8]][0]+"px";
			document.getElementById("move_"+num_in).style.top=region[idenx[8]][1]+"px";
			congratulation = true;
			var a = idenx[8];
			idenx[8] = idenx[num_in-1];  //注意要减1
			idenx[num_in-1] = a;
			move_flag = false;
		}
	}

	else{      //没开始游戏弹警告
		if(over_flag == false){
			alert("Please Start Game!");
		}
	}


//*******下面是如果结束*****//
	over_flag = true;
	for(var x=0; x<=8; x++){ //每个数字及空格对应相应的位置
		if(idenx[x] != x){
			over_flag = false;
		}
	}

	if(over_flag == true){      //弹出结束时的窗口
		move_flag = false;
		stop = true;
		
		clearInterval(set_timer);
		
		if(congratulation){
			alert("Congratulation!!!!!" + "\n" +"总用时: " + time_min + "分" + time_sec + "秒");
			var newgame = confirm("Shall we play a new game???");
			congratulation = false;
		}
		
		

		if(newgame){
			restart();
			over_flag = false;
			
		}

	}
}






















