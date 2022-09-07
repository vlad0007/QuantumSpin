// buttons.js
var btn_measurement;

var lbl_electron_az, lbl_electron_polar, lbl_electron_az, lbl_electron_polar;

var btn_electron_azim_0, btn_electron_azim_30, btn_electron_azim_45, btn_electron_azim_60,
    btn_electron_azim_90, btn_electron_azim_120, btn_electron_azim_150, 
	btn_electron_azim_180, btn_electron_azim_270;
	
var btn_electron_polar_0, btn_electron_polar_30, btn_electron_polar_45,
    btn_electron_polar_60, btn_electron_polar_90, btn_electron_polar_120, 
	btn_electron_polar_150, btn_electron_polar_180;

function Lbl (name, left, top )
{
	this.name = name;
	this.name = document.createElement('input');
	this.name.type = 'button';
	this.name.value = name;
	this.id = gui_container.appendChild(this.name);
	this.id.style = "position: absolute";
	this.id.style.background='#aaaaaa';
	this.id.style.color='#440000';
	this.id.style.top = top;
	this.id.style.left = left;
	this.id.style.width = "80px";
	this.id.style.font = '10px  "Times New Roman"';
	this.id.disabled = true;
	//this.id.style.cursor = "pointer";
}	

function AddLabels()
{
	lbl_electron_az = new Lbl("El./Spinor polar", "20px", "115px" );
	lbl_electron_az.id.style.background='#ccffcc';
	lbl_electron_az.id.style.color='#000000';
	
	lbl_electron_az = new Lbl("Electron azim.", "150px", "115px" );
	lbl_electron_az.id.style.background='#ccccff';	
	lbl_electron_az.id.style.color='#000000';
}

function Btn (name, left, top )
{
	this.name = name;
	this.name = document.createElement('input');
	this.name.type = 'button';
	this.name.value = name;
	this.id = gui_container.appendChild(this.name);
	this.id.style = "position: absolute";
	this.id.style.background='#aaffaa';
	this.id.style.color='#000000';
	this.id.style.top = top;
	this.id.style.left = left;
	this.id.style.width = "80px";
	this.id.style.cursor = "pointer";
}	

function Btn2 (name, left, top )
{
	this.name = name;
	this.name = document.createElement('input');
	this.name.type = 'button';
	this.name.value = name;
	this.id = gui_container.appendChild(this.name);
	this.id.style = "position: absolute";
	this.id.style.background='#bbbbff';
	this.id.style.color='#000000';
	this.id.style.top = top;
	this.id.style.left = left;
	this.id.style.width = "80px";
	this.id.style.cursor = "pointer";
}	

function AddButtons()
{
	btn_electron_polar_0 = new Btn("0°/0°", "20px", "140px" );
	btn_electron_polar_30 = new Btn("30°/15°", "20px", "160px" );
	btn_electron_polar_60 = new Btn("60°/30°", "20px", "180px" );
	btn_electron_polar_90 = new Btn("90°/45°", "20px", "200px" );
	btn_electron_polar_120 = new Btn("120°/60°", "20px", "220px" );
	btn_electron_polar_150 = new Btn("150°/75°", "20px", "240px" );	
	btn_electron_polar_180 = new Btn("180°/90°", "20px", "260px" );		

	btn_electron_polar_0.name.addEventListener("click", electron_polar_0);
	btn_electron_polar_30.name.addEventListener("click", electron_polar_30);
	btn_electron_polar_60.name.addEventListener("click", electron_polar_60);
	btn_electron_polar_90.name.addEventListener("click", electron_polar_90);
	btn_electron_polar_120.name.addEventListener("click", electron_polar_120);
	btn_electron_polar_150.name.addEventListener("click", electron_polar_150);
	btn_electron_polar_180.name.addEventListener("click", electron_polar_180);
	

	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	
	btn_electron_azim_0 = new Btn2("0°", "150px", "140px" );
	btn_electron_azim_30 = new Btn2("30°", "150px", "160px" );
	btn_electron_azim_60 = new Btn2("60°", "150px", "180px" );
	btn_electron_azim_90 = new Btn2("90°", "150px", "200px" );
	btn_electron_azim_120 = new Btn2("120°", "150px", "220px" );
	btn_electron_azim_150 = new Btn2("150°", "150px", "240px" );
	btn_electron_azim_180 = new Btn2("180°", "150px", "260px" );
	btn_electron_azim_210 = new Btn2("210°", "150px", "280px" );
	btn_electron_azim_240 = new Btn2("240°", "150px", "300px" );
	btn_electron_azim_270 = new Btn2("270°", "150px", "320px" );
	btn_electron_azim_300 = new Btn2("300°", "150px", "340px" );
	btn_electron_azim_330 = new Btn2("330°", "150px", "360px" );
	btn_electron_azim_360 = new Btn2("360°", "150px", "380px" );

	btn_electron_azim_0.name.addEventListener("click", electron_azim_0);
	btn_electron_azim_30.name.addEventListener("click", electron_azim_30);
	btn_electron_azim_60.name.addEventListener("click", electron_azim_60);
	btn_electron_azim_90.name.addEventListener("click", electron_azim_90);5
	btn_electron_azim_120.name.addEventListener("click", electron_azim_120);
	btn_electron_azim_150.name.addEventListener("click", electron_azim_150);
	btn_electron_azim_180.name.addEventListener("click", electron_azim_180);
	btn_electron_azim_210.name.addEventListener("click", electron_azim_210);
	btn_electron_azim_240.name.addEventListener("click", electron_azim_240);
	btn_electron_azim_270.name.addEventListener("click", electron_azim_270);
	btn_electron_azim_300.name.addEventListener("click", electron_azim_300);
	btn_electron_azim_330.name.addEventListener("click", electron_azim_330);
	btn_electron_azim_360.name.addEventListener("click", electron_azim_360);
}

// Азимуты
function electron_azim_0() 
{ 
   azimuth_electron = 0 * DEGREE;
   recalc();
   controller.azimuth_electron = 0;
   gui.updateDisplay();
}
function electron_azim_30() 
{ 
   azimuth_electron = 30 * DEGREE;
   recalc();
   controller.azimuth_electron = 30;
   gui.updateDisplay();
}
function electron_azim_60() 
{ 
   azimuth_electron = 60 * DEGREE;
   recalc();
   controller.azimuth_electron = 60;
   gui.updateDisplay();
}
function electron_azim_90() 
{ 
   azimuth_electron = 90 * DEGREE;
   recalc();
   controller.azimuth_electron = 90;
   gui.updateDisplay();
}
function electron_azim_120() 
{ 
   azimuth_electron = 120 * DEGREE;
   recalc();
   controller.azimuth_electron = 120;
   gui.updateDisplay();
}
function electron_azim_150() 
{ 
   azimuth_electron = 150 * DEGREE;
   recalc();
   controller.azimuth_electron = 150;
   gui.updateDisplay();
}
function electron_azim_180() 
{ 
   azimuth_electron = 180 * DEGREE;
   recalc();
   controller.azimuth_electron = 180;
   gui.updateDisplay();
}
function electron_azim_210() 
{ 
   azimuth_electron = 210 * DEGREE;
   recalc();
   controller.azimuth_electron = 210;
   gui.updateDisplay();
}
function electron_azim_240() 
{ 
   azimuth_electron = 240 * DEGREE;
   recalc();
   controller.azimuth_electron = 240;
   gui.updateDisplay();
}
function electron_azim_270() 
{ 
   azimuth_electron = 270 * DEGREE;
   recalc();
   controller.azimuth_electron = 270;
   gui.updateDisplay();
}
function electron_azim_300() 
{ 
   azimuth_electron = 300 * DEGREE;
   recalc();
   controller.azimuth_electron = 300;
   gui.updateDisplay();
}
function electron_azim_330() 
{ 
   azimuth_electron = 330 * DEGREE;
   recalc();
   controller.azimuth_electron = 330;
   gui.updateDisplay();
}
function electron_azim_360() 
{ 
   azimuth_electron = 360 * DEGREE;
   recalc();
   controller.azimuth_electron = 360;
   gui.updateDisplay();
}

////////////////////////////////
// Наклоны

function electron_polar_0() 
{ 
   polar_electron = 0 * DEGREE;
   recalc();
   controller.polar_electron = 0;
   gui.updateDisplay();
}
function electron_polar_30() 
{ 
   polar_electron = 30 * DEGREE;
   recalc();
   controller.polar_electron = 30;
   gui.updateDisplay();
}
function electron_polar_60() 
{ 
   polar_electron = 60 * DEGREE;
   recalc();
   controller.polar_electron = 60;
   gui.updateDisplay();
}
function electron_polar_90() 
{ 
   polar_electron = 90 * DEGREE;
   recalc();
   controller.polar_electron = 90;
   gui.updateDisplay();
}
function electron_polar_120() 
{ 
   polar_electron = 120 * DEGREE;
   recalc();
   controller.polar_electron = 120;
   gui.updateDisplay();
}
function electron_polar_150() 
{ 
   polar_electron = 150 * DEGREE;
   recalc();
   controller.polar_electron = 150;
   gui.updateDisplay();
}
function electron_polar_180() 
{ 
   polar_electron = 180 * DEGREE;
   recalc();
   controller.polar_electron = 180;
   gui.updateDisplay();
}

