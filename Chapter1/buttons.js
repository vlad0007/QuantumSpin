// buttons.js
var btn_measurement;

var lbl_spin_az, lbl_spin_polar, lbl_device_az, lbl_device_polar;

var btn_spin_az_0, btn_spin_az_30, btn_spin_az_45, btn_spin_az_60,
    btn_spin_az_90, btn_spin_az_120, btn_spin_az_150, 
	btn_spin_az_180, btn_spin_az_270;
	
var btn_spin_polar_0, btn_spin_polar_30, btn_spin_polar_45,
    btn_spin_polar_60, btn_spin_polar_90, btn_spin_polar_120, 
	btn_spin_polar_150, btn_spin_polar_180;
	
var btn_device_az_0, btn_device_az_30, btn_device_az_45, btn_device_az_60,
    btn_device_az_90, btn_device_az_120, btn_device_az_150, 
	btn_device_az_180, btn_device_az_270;
	
var btn_device_polar_0, btn_device_polar_30, btn_device_polar_45,
    btn_device_polar_60, btn_device_polar_90, btn_device_polar_120,
	btn_device_polar_150, btn_device_polar_180;

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
	this.id.style.width = "55px";
	this.id.style.font = '10px  "Times New Roman"';
	this.id.disabled = true;
	//this.id.style.cursor = "pointer";
}	

function AddLabels()
{
	lbl_spin_az = new Lbl("Spin Azim.", "5px", "195px" );
	lbl_spin_az.id.style.background='#ffcccc';
	lbl_spin_az.id.style.color='#000000';
	
	lbl_spin_polar = new Lbl("Spin polar", "65px", "195px" );
	lbl_spin_polar.id.style.background='#ffcccc';
	lbl_spin_polar.id.style.color='#000000';
	
	lbl_device_az = new Lbl("Dev. Azim.", "132px", "195px" );
	lbl_device_az.id.style.background='#ccccff';	
	lbl_device_az.id.style.color='#000000';
	
	lbl_device_polar = new Lbl("Dev. polar", "190px", "195px" );
	lbl_device_polar.id.style.background='#ccccff';	
	lbl_device_polar.id.style.color='#000000';
}

function Btn (name, left, top )
{
	this.name = name;
	this.name = document.createElement('input');
	this.name.type = 'button';
	this.name.value = name;
	this.id = gui_container.appendChild(this.name);
	this.id.style = "position: absolute";
	this.id.style.background='#ffcccc';
	this.id.style.color='#000000';
	this.id.style.top = top;
	this.id.style.left = left;
	this.id.style.width = "40px";
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
	this.id.style.background='#ccccff';
	this.id.style.color='#000000';
	this.id.style.top = top;
	this.id.style.left = left;
	this.id.style.width = "40px";
	this.id.style.cursor = "pointer";
}	

function AddButtons()
{
	btn_spin_az_0 = new Btn("0°", "15px", "220px" );
	btn_spin_az_30 = new Btn("30°", "15px", "240px" );
	btn_spin_az_45 = new Btn("45°", "15px", "260px" );
	btn_spin_az_60 = new Btn("60°", "15px", "280px" );
	btn_spin_az_90 = new Btn("90°", "15px", "300px" );
	btn_spin_az_120 = new Btn("120°", "15px", "320px" );
	btn_spin_az_150 = new Btn("150°", "15px", "340px" );
	btn_spin_az_180 = new Btn("180°", "15px", "360px" );
	btn_spin_az_270 = new Btn("270°", "15px", "380px" );
	
	btn_spin_az_0.name.addEventListener("click", spin_az_0);
	btn_spin_az_30.name.addEventListener("click", spin_az_30);
	btn_spin_az_45.name.addEventListener("click", spin_az_45);
	btn_spin_az_60.name.addEventListener("click", spin_az_60);
	btn_spin_az_90.name.addEventListener("click", spin_az_90);
	btn_spin_az_120.name.addEventListener("click", spin_az_120);
	btn_spin_az_150.name.addEventListener("click", spin_az_150);
	btn_spin_az_180.name.addEventListener("click", spin_az_180);
	btn_spin_az_270.name.addEventListener("click", spin_az_270);	
	//////////////////////////////////////////////////////////
	btn_spin_polar_0 = new Btn("0°", "70px", "220px" );
	btn_spin_polar_30 = new Btn("30°", "70px", "240px" );
	btn_spin_polar_45 = new Btn("45°", "70px", "260px" );
	btn_spin_polar_60 = new Btn("60°", "70px", "280px" );
	btn_spin_polar_90 = new Btn("90°", "70px", "300px" );
	btn_spin_polar_120 = new Btn("120°", "70px", "320px" );
	btn_spin_polar_150 = new Btn("150°", "70px", "340px" );
	btn_spin_polar_180 = new Btn("180°", "70px", "360px" );	

	btn_spin_polar_0.name.addEventListener("click", spin_polar_0);
	btn_spin_polar_30.name.addEventListener("click", spin_polar_30);
	btn_spin_polar_45.name.addEventListener("click", spin_polar_45);
	btn_spin_polar_60.name.addEventListener("click", spin_polar_60);
	btn_spin_polar_90.name.addEventListener("click", spin_polar_90);
	btn_spin_polar_120.name.addEventListener("click", spin_polar_120);
	btn_spin_polar_150.name.addEventListener("click", spin_polar_150);
	btn_spin_polar_180.name.addEventListener("click", spin_polar_180);
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	btn_device_az_0 = new Btn2("0°", "140px", "220px" );
	btn_device_az_30 = new Btn2("30°", "140px", "240px" );
	btn_device_az_45 = new Btn2("45°", "140px", "260px" );
	btn_device_az_60 = new Btn2("60°", "140px", "280px" );
	btn_device_az_90 = new Btn2("90°", "140px", "300px" );
	btn_device_az_120 = new Btn2("120°", "140px", "320px" );
	btn_device_az_150 = new Btn2("150°", "140px", "340px" );
	btn_device_az_180 = new Btn2("180°", "140px", "360px" );
	btn_device_az_270 = new Btn2("270°", "140px", "380px" );
	
	btn_device_az_0.name.addEventListener("click", device_az_0);
	btn_device_az_30.name.addEventListener("click", device_az_30);
	btn_device_az_45.name.addEventListener("click", device_az_45);
	btn_device_az_60.name.addEventListener("click", device_az_60);
	btn_device_az_90.name.addEventListener("click", device_az_90);5
	btn_device_az_120.name.addEventListener("click", device_az_120);
	btn_device_az_150.name.addEventListener("click", device_az_150);
	btn_device_az_180.name.addEventListener("click", device_az_180);
	btn_device_az_270.name.addEventListener("click", device_az_270);
	
	btn_device_polar_0 = new Btn2("0°", "195px", "220px" );
	btn_device_polar_30 = new Btn2("30°", "195px", "240px" );
	btn_device_polar_45 = new Btn2("45°", "195px", "260px" );
	btn_device_polar_60 = new Btn2("60°", "195px", "280px" );
	btn_device_polar_90 = new Btn2("90°", "195px", "300px" );
	btn_device_polar_120 = new Btn2("120°", "195px", "320px" );
	btn_device_polar_150 = new Btn2("150°", "195px", "340px" );
	btn_device_polar_180 = new Btn2("180°", "195px", "360px" );
	
	btn_device_polar_0.name.addEventListener("click", device_polar_0);
	btn_device_polar_30.name.addEventListener("click", device_polar_30);
	btn_device_polar_45.name.addEventListener("click", device_polar_45);
	btn_device_polar_60.name.addEventListener("click", device_polar_60);
	btn_device_polar_90.name.addEventListener("click", device_polar_90);
	btn_device_polar_120.name.addEventListener("click", device_polar_120);
	btn_device_polar_150.name.addEventListener("click", device_polar_150);
	btn_device_polar_180.name.addEventListener("click", device_polar_180);
}

function spin_az_0() 
{ 
   azimuth_spin = 0 * DEGREE;
   recalc();
   controller.azimuth_spin = 0;
   gui.updateDisplay();
}
function spin_az_30() 
{ 
   azimuth_spin = 30 * DEGREE;
   recalc();
   controller.azimuth_spin = 30;
   gui.updateDisplay();
}
function spin_az_45() 
{ 
   azimuth_spin = 45 * DEGREE;
   recalc();
   controller.azimuth_spin = 45;
   gui.updateDisplay();
}
function spin_az_60() 
{ 
   azimuth_spin = 60 * DEGREE;
   recalc();
   controller.azimuth_spin = 60;
   gui.updateDisplay();
}
function spin_az_90() 
{ 
   azimuth_spin = 90 * DEGREE;
   recalc();
   controller.azimuth_spin = 90;
   gui.updateDisplay();
}
function spin_az_120() 
{ 
   azimuth_spin = 120 * DEGREE;
   recalc();
   controller.azimuth_spin = 120;
   gui.updateDisplay();
}
function spin_az_150() 
{ 
   azimuth_spin = 150 * DEGREE;
   recalc();
   controller.azimuth_spin = 150;
   gui.updateDisplay();
}
function spin_az_180() 
{ 
   azimuth_spin = 180 * DEGREE;
   recalc();
   controller.azimuth_spin = 180;
   gui.updateDisplay();
}
function spin_az_270() 
{ 
   azimuth_spin = 270 * DEGREE;
   recalc();
   controller.azimuth_spin = 270;
   gui.updateDisplay();
}

////////////////////////////////
////////////////////////////////

function spin_polar_0() 
{ 
   polar_spin = 0 * DEGREE;
   recalc();
   controller.polar_spin = 0;
   gui.updateDisplay();
}
function spin_polar_30() 
{ 
   polar_spin = 30 * DEGREE;
   recalc();
   controller.polar_spin = 30;
   gui.updateDisplay();
}
function spin_polar_45() 
{ 
   polar_spin = 45 * DEGREE;
   recalc();
   controller.polar_spin = 45;
   gui.updateDisplay();
}
function spin_polar_60() 
{ 
   polar_spin = 60 * DEGREE;
   recalc();
   controller.polar_spin = 60;
   gui.updateDisplay();
}
function spin_polar_90() 
{ 
   polar_spin = 90 * DEGREE;
   recalc();
   controller.polar_spin = 90;
   gui.updateDisplay();
}
function spin_polar_120() 
{ 
   polar_spin = 120 * DEGREE;
   recalc();
   controller.polar_spin = 120;
   gui.updateDisplay();
}
function spin_polar_150() 
{ 
   polar_spin = 150 * DEGREE;
   recalc();
   controller.polar_spin = 150;
   gui.updateDisplay();
}
function spin_polar_180() 
{ 
   polar_spin = 180 * DEGREE;
   recalc();
   controller.polar_spin = 180;
   gui.updateDisplay();
}

//////////////////////////////
//////////////////////////////

function device_az_0() 
{ 
   azimuth_device = 0 * DEGREE;
   recalc();
   controller.azimuth_device = 0;
   gui.updateDisplay();
}
function device_az_30() 
{ 
   azimuth_device = 30 * DEGREE;
   recalc();
   controller.azimuth_device = 30;
   gui.updateDisplay();
}
function device_az_45() 
{ 
   azimuth_device = 45 * DEGREE;
   recalc();
   controller.azimuth_device = 45;
   gui.updateDisplay();
}
function device_az_60() 
{ 
   azimuth_device = 60 * DEGREE;
   recalc();
   controller.azimuth_device = 60;
   gui.updateDisplay();
}
function device_az_90() 
{ 
   azimuth_device = 90 * DEGREE;
   recalc();
   controller.azimuth_device = 90;
   gui.updateDisplay();
}
function device_az_120() 
{ 
   azimuth_device = 120 * DEGREE;
   recalc();
   controller.azimuth_device = 120;
   gui.updateDisplay();
}
function device_az_150() 
{ 
   azimuth_device = 150 * DEGREE;
   recalc();
   controller.azimuth_device = 150;
   gui.updateDisplay();
}
function device_az_180() 
{ 
   azimuth_device = 180 * DEGREE;
   recalc();
   controller.azimuth_device = 180;
   gui.updateDisplay();
}
function device_az_270() 
{ 
   azimuth_device = 270 * DEGREE;
   recalc();
   controller.azimuth_device = 270;
   gui.updateDisplay();
}
///////////////////////////////////
function device_polar_0() 
{ 
   polar_device = 0 * DEGREE;
   recalc();
   controller.polar_device = 0;
   gui.updateDisplay();
}
function device_polar_30() 
{ 
   polar_device = 30 * DEGREE;
   recalc();
   controller.polar_device = 30;
   gui.updateDisplay();
}
function device_polar_45() 
{ 
   polar_device = 45 * DEGREE;
   recalc();
   controller.polar_device = 45;
   gui.updateDisplay();
}
function device_polar_60() 
{ 
   polar_device = 60 * DEGREE;
   recalc();
   controller.polar_device = 60;
   gui.updateDisplay();
}
function device_polar_90() 
{ 
   polar_device = 90 * DEGREE;
   recalc();
   controller.polar_device = 90;
   gui.updateDisplay();
}
function device_polar_120() 
{ 
   polar_device = 120 * DEGREE;
   recalc();
   controller.polar_device = 120;
   gui.updateDisplay();
}
function device_polar_150() 
{ 
   polar_device = 150 * DEGREE;
   recalc();
   controller.polar_device = 150;
   gui.updateDisplay();
}
function device_polar_180() 
{ 
   polar_device = 180 * DEGREE;
   recalc();
   controller.polar_device = 180;
   gui.updateDisplay();
}
