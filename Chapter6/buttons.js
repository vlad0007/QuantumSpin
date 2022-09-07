// buttons.js
var DEGREE = 0.01745329251994; // величина углового градуса в радианах

var btn_measurement;

var lbl_electron_az, lbl_electron_polar, lbl_electron_az, lbl_electron_polar;

var btn_electron_azim_0, btn_electron_azim_30, btn_electron_azim_45, btn_electron_azim_60,
    btn_electron_azim_90, btn_electron_azim_120, btn_electron_azim_150, 
	btn_electron_azim_180, btn_electron_azim_270;
	
var btn_electron_polar_0, btn_electron_polar_30, btn_electron_polar_45,
    btn_electron_polar_60, btn_electron_polar_90, btn_electron_polar_120, 
	btn_electron_polar_150, btn_electron_polar_180;
	
var btn_X, btn_Y, btn_Z, btn_H;
	
var btn_rotX_plus, btn_rotX_minus, 
	btn_rotY_plus, btn_rotY_minus, 
	btn_rotZ_plus, btn_rotZ_minus;
	
var btn_clear_rotation;

var btn_Deg2, btn_Deg5, btn_Deg10;
	
var X_plus, X_minus, Y_plus, Y_minus;

var clear_rotation;

var delta_rot = 10 * DEGREE;

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
	btn_X = new Btn("X", "35px", "290px" );
	btn_X.id.style.width = "30px";
	btn_X.id.style.height = "30px";
	btn_X.id.style.color='#ff0000';
	btn_X.id.style.background='#dddddd';
	btn_X.id.style.font = 'bold 18px "Times New Roman"';
	
	btn_Y = new Btn("Y", "85px", "290px" );
	btn_Y.id.style.width = "30px";
	btn_Y.id.style.height = "30px";
	btn_Y.id.style.color='#ff0000';
	btn_Y.id.style.background='#dddddd';
	btn_Y.id.style.font = 'bold 18px "Times New Roman"';

	btn_Z = new Btn("Z", "135px", "290px" );
	btn_Z.id.style.width = "30px";
	btn_Z.id.style.height = "30px";
	btn_Z.id.style.color='#ff0000';
	btn_Z.id.style.background='#dddddd';
	btn_Z.id.style.font = 'bold 18px "Times New Roman"';

	btn_H = new Btn("H", "185px", "290px" );
	btn_H.id.style.width = "30px";
	btn_H.id.style.height = "30px";
	btn_H.id.style.color='#ff0000';
	btn_H.id.style.background='#dddddd';
	btn_H.id.style.font = 'bold 18px "Times New Roman"';	
	
	
	btn_Deg2 = new Btn("2°", "10px", "390px" );
	btn_Deg2.id.style.width = "30px";
	btn_Deg2.id.style.height = "20px";
	btn_Deg2.id.style.color='#ff0000';
	btn_Deg2.id.style.background='#dddddd';
	btn_Deg2.id.style.font = 'bold 12px "Times New Roman"';
	
	btn_Deg5 = new Btn("5°", "45px", "390px" );
	btn_Deg5.id.style.width = "30px";
	btn_Deg5.id.style.height = "20px";
	btn_Deg5.id.style.color='#ff0000';
	btn_Deg5.id.style.background='#dddddd';
	btn_Deg5.id.style.font = 'bold 12px "Times New Roman"';
	
	btn_Deg10 = new Btn("10°", "80px", "390px" );
	btn_Deg10.id.style.width = "30px";
	btn_Deg10.id.style.height = "20px";
	btn_Deg10.id.style.color='#ff0000';
	btn_Deg10.id.style.background='#dddddd';
	btn_Deg10.id.style.font = 'bold 12px "Times New Roman"';
	
	btn_Deg2.id.style.background='#aaaaaa';
	btn_Deg5.id.style.background='#aaaaaa';
	btn_Deg10.id.style.background='#ffffff';
	
	btn_Deg2.name.addEventListener("click", Deg2);
	btn_Deg5.name.addEventListener("click", Deg5);
	btn_Deg10.name.addEventListener("click", Deg10);
	
	
	btn_rotX_plus = new Btn("R(X+)", "20px", "330px" );
	btn_rotX_minus = new Btn("R(X-)", "20px", "360px" );
	btn_rotX_plus.id.style.width = "50px";
	btn_rotX_minus.id.style.width = "50px";
	
	btn_rotY_plus = new Btn("R(Y+)", "100px", "330px" );
	btn_rotY_minus = new Btn("R(Y-)", "100px", "360px" );
	btn_rotY_plus.id.style.width = "50px";
	btn_rotY_minus.id.style.width = "50px";
	
	btn_rotZ_plus = new Btn("R(Z+)", "180px", "330px" );
	btn_rotZ_minus = new Btn("R(Z-)", "180px", "360px" );
	btn_rotZ_plus.id.style.width = "50px";
	btn_rotZ_minus.id.style.width = "50px";
	
	btn_rotX_plus.id.style.background='#ffff44';
	btn_rotX_minus.id.style.background='#ffff88';
		
	btn_rotY_plus.id.style.background='#ffff44';
	btn_rotY_minus.id.style.background='#ffff88';
	
	btn_rotZ_plus.id.style.background='#ffff44';
	btn_rotZ_minus.id.style.background='#ffff88';
	
	btn_rotX_plus.name.addEventListener("click", X_plus);
	btn_rotX_minus.name.addEventListener("click", X_minus);
	btn_rotY_plus.name.addEventListener("click", Y_plus);
	btn_rotY_minus.name.addEventListener("click", Y_minus);
	btn_rotZ_plus.name.addEventListener("click", Z_plus);
	btn_rotZ_minus.name.addEventListener("click", Z_minus);
	
	btn_clear_rotation = new Btn("Erase rotation points", "120px", "390px" );
	btn_clear_rotation.id.style.background='#dddddd';
	btn_clear_rotation.id.style.color='#ff0000';
	btn_clear_rotation.id.style.width = "125px";
	btn_clear_rotation.id.style.font = 'bold 12px "Times New Roman"';
	btn_clear_rotation.name.addEventListener("click", clear_rotation);
	
	btn_X.name.addEventListener("click", X_Pauli);
	btn_Y.name.addEventListener("click", Y_Pauli);
	btn_Z.name.addEventListener("click", Z_Pauli);
	btn_H.name.addEventListener("click", Hadamard);
	
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
	
/*	
	btn_electron_azim_210 = new Btn2("210°", "150px", "280px" );
	btn_electron_azim_240 = new Btn2("240°", "150px", "300px" );
	btn_electron_azim_270 = new Btn2("270°", "150px", "320px" );
	btn_electron_azim_300 = new Btn2("300°", "150px", "340px" );
	btn_electron_azim_330 = new Btn2("330°", "150px", "360px" );
	btn_electron_azim_360 = new Btn2("360°", "150px", "380px" );
*/

	btn_electron_azim_0.name.addEventListener("click", electron_azim_0);
	btn_electron_azim_30.name.addEventListener("click", electron_azim_30);
	btn_electron_azim_60.name.addEventListener("click", electron_azim_60);
	btn_electron_azim_90.name.addEventListener("click", electron_azim_90);5
	btn_electron_azim_120.name.addEventListener("click", electron_azim_120);
	btn_electron_azim_150.name.addEventListener("click", electron_azim_150);
	btn_electron_azim_180.name.addEventListener("click", electron_azim_180);
	
/*
	btn_electron_azim_210.name.addEventListener("click", electron_azim_210);
	btn_electron_azim_240.name.addEventListener("click", electron_azim_240);
	btn_electron_azim_270.name.addEventListener("click", electron_azim_270);
	btn_electron_azim_300.name.addEventListener("click", electron_azim_300);
	btn_electron_azim_330.name.addEventListener("click", electron_azim_330);
	btn_electron_azim_360.name.addEventListener("click", electron_azim_360);
*/
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

function X_plus()
{
	var theta = polar_electron; // географическая широта
	var fi = azimuth_electron;  // географическая долгота
	var alpha = delta_rot;      // угол на который надо совершить поворот
	
	//   Находим произведение квадратной  матрицы (4x4) [a, b/i, c, d] 
	//          на матрицу столбец (2x1) [c, d/exp(i*fi) ]
	//
	//  a    b/i                c
	//            умножаем на 
	//  b/i   a                 d/exp(i*fi)
	
	var a =   Math.cos(alpha/2);
	var b = - Math.sin(alpha/2);
	
	var c =   Math.cos(theta/2);
	var d =   Math.sin(theta/2);
	
	var real_1 = a*c - b*d*Math.sin(fi); // действительная часть верхнего элемента результ. матрицы
	var imag_1 = b*d*Math.cos(fi);       // мнимая часть верхнего элемента результ. матрицы
	
	var real_2 = a*d*Math.cos(fi);       // действительная часть нижнего элемента результ. матрицы
	var imag_2 = b*c + a*d*Math.sin(fi); // мнимая часть нижнего элемента результ. матрицы
	
	// верхний элемент в показат. форме
	var r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	var fi_1 = Math.atan2(imag_1, real_1);
	
	// нижний элемент в показат. форме
	var r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	var fi_2 = Math.atan2(imag_2, real_2);	
	
	// приращение угла
	var ang_fi = (fi_2 - fi_1);
	
	// ang2 = Math.acos(r1);
	ang1 = Math.asin(r2);
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	var r = 14; // радиус сферы Блоха
	var spinor_x = r * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	var spinor_y = r * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	var spinor_z = r * Math.cos(polar_electron);

	// вообщем-то лишние переменные (потом можно убрать)
	var X = spinor_y;
	var Y = spinor_z;
	var Z = spinor_x;
	
	// запоминаем для последующего стирания
	obs.push(new THREE.Vector3(X, Y, Z ));

	// перерисовываем и обновляем данные
	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	controller.azimuth_electron = ang_fi / DEGREE;
	
	gui.updateDisplay();
}

function X_minus()
{
	var theta = polar_electron;
	var fi = azimuth_electron;
	var alpha = - delta_rot;
	
	var a =   Math.cos(alpha/2);
	var b = - Math.sin(alpha/2);
	
	var c =   Math.cos(theta/2);
	var d =   Math.sin(theta/2);
	
	var real_1 = a*c - b*d*Math.sin(fi);
	var imag_1 = b*d*Math.cos(fi);
	
	var real_2 = a*d*Math.cos(fi);
	var imag_2 = b*c + a*d*Math.sin(fi);	
	
	var r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	var fi_1 = Math.atan2(imag_1, real_1);
	
	var r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	var fi_2 = Math.atan2(imag_2, real_2);	
	
	var ang_fi = (fi_2 - fi_1);
	
	ang2 = Math.acos(r1);
	ang1 = Math.asin(r2);
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	var r = 14;
	var spinor_x = r * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	var spinor_y = r * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	var spinor_z = r * Math.cos(polar_electron);

	var X = spinor_y;
	var Y = spinor_z;
	var Z = spinor_x;
	
	obs.push(new THREE.Vector3(X, Y, Z ));

	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	controller.azimuth_electron = ang_fi / DEGREE;
	
	gui.updateDisplay();
}


function Y_plus()
{
	var theta = polar_electron;
	var fi = azimuth_electron;
	var alpha = delta_rot;
	
	var a =   Math.cos(alpha/2);
	var b =   Math.sin(alpha/2);
	
	var c =   Math.cos(theta/2);
	var d =   Math.sin(theta/2);
	
	var real_1 = a*c - b*d*Math.cos(fi);
	var imag_1 = - b*d*Math.sin(fi); // !!!!!
	
	var real_2 = b*c + a*d*Math.cos(fi);
	var imag_2 = a*d*Math.sin(fi);
	
	
	var r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	var fi_1 = Math.atan2(imag_1, real_1);
	
	var r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	var fi_2 = Math.atan2(imag_2, real_2);	
	
	var ang_fi = fi_2 - fi_1;
	
	ang1 = Math.acos(r1);
	ang2 = Math.asin(r2);
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	var r = 14;
	var spinor_x = r * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	var spinor_y = r * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	var spinor_z = r * Math.cos(polar_electron);

	var X = spinor_y;
	var Y = spinor_z;
	var Z = spinor_x;
	
	obs.push(new THREE.Vector3(X, Y, Z ));

	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	controller.azimuth_electron = ang_fi / DEGREE;
	
	gui.updateDisplay();
}


function Y_minus()
{
	var theta = polar_electron;
	var fi = azimuth_electron;
	var alpha = - delta_rot;
	
	var a =   Math.cos(alpha/2);
	var b =   Math.sin(alpha/2);
	
	var c =   Math.cos(theta/2);
	var d =   Math.sin(theta/2);
	
	var real_1 = a*c - b*d*Math.cos(fi);
	var imag_1 = b*d*Math.sin(fi);
	
	var real_2 = b*c + a*d*Math.cos(fi);
	var imag_2 = a*d*Math.sin(fi);
	
	var r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	var fi_1 = Math.atan2(imag_1, real_1);
	
	var r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	var fi_2 = Math.atan2(imag_2, real_2);	
	
	var ang_fi = fi_2 - fi_1;
	
	ang1 = Math.acos(r1);
	ang2 = Math.asin(r2);
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	var r = 14;
	var spinor_x = r * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	var spinor_y = r * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	var spinor_z = r * Math.cos(polar_electron);

	var X = spinor_y;
	var Y = spinor_z;
	var Z = spinor_x;
	
	obs.push(new THREE.Vector3(X, Y, Z ));

	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	controller.azimuth_electron = ang_fi / DEGREE;
	
	gui.updateDisplay();
}

function Z_plus()
{
   azimuth_electron = azimuth_electron + delta_rot;
   
	var r = 14;
	var spinor_x = r * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	var spinor_y = r * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	var spinor_z = r * Math.cos(polar_electron);

	var X = spinor_y;
	var Y = spinor_z;
	var Z = spinor_x;
	
	obs.push(new THREE.Vector3(X, Y, Z ));   
   
   recalc();
   controller.azimuth_electron = azimuth_electron/DEGREE;
   gui.updateDisplay();		
}

function Z_minus()
{
   azimuth_electron = azimuth_electron - delta_rot;
   
	var r = 14;
	var spinor_x = r * Math.sin(polar_electron) * Math.cos(azimuth_electron + Math.PI/2);
	var spinor_y = r * Math.sin(polar_electron) * Math.sin(azimuth_electron + Math.PI/2);
	var spinor_z = r * Math.cos(polar_electron);

	var X = spinor_y;
	var Y = spinor_z;
	var Z = spinor_x;
	
	obs.push(new THREE.Vector3(X, Y, Z ));   
   
   recalc();
   controller.azimuth_electron = azimuth_electron/DEGREE;
   gui.updateDisplay();		
}

function Deg2()
{	
	btn_Deg2.id.style.background='#ffffff';
	btn_Deg5.id.style.background='#aaaaaa';
	btn_Deg10.id.style.background='#aaaaaa';
	delta_rot = DEGREE*2;
	recalc();
	
//	btn_rotX_plus.id.disabled = true;
}

function Deg5()
{	
	btn_Deg2.id.style.background='#aaaaaa';
	btn_Deg5.id.style.background='#ffffff';
	btn_Deg10.id.style.background='#aaaaaa';
	delta_rot = DEGREE*5;
	recalc();
	
//	btn_rotX_plus.id.disabled = true;
}

function Deg10()
{	
	btn_Deg2.id.style.background='#aaaaaa';
	btn_Deg5.id.style.background='#aaaaaa';
	btn_Deg10.id.style.background='#ffffff';
	delta_rot = DEGREE*10;
	recalc();
	
//	btn_rotX_plus.id.disabled = true;
}

function clear_rotation()
{	
	var i = 0;
	var yyy = sphere_rotation.length;
	var rrr = obs.length;
	for (i = 0; i < sphere_rotation.length; i++)
	{
		scene.remove(sphere_rotation[i]);
		scene.remove(sphere_rotation_XY[i]);
	}
	
	obs.length = 0;
	sphere_rotation.length = 0;
	obs_XY.length = 0;
	sphere_rotation_XY.length = 0;
	recalc();
	
//	btn_rotX_plus.id.disabled = true;
}

function X_Pauli()
{
	polar_electron = Math.PI - polar_electron;
	azimuth_electron = -azimuth_electron;
	
	recalc();
	controller.polar_electron = polar_electron / DEGREE;
	controller.azimuth_electron = azimuth_electron/DEGREE;
	gui.updateDisplay();		
}

function Y_Pauli()
{
	polar_electron = Math.PI - polar_electron;
	azimuth_electron = Math.PI - azimuth_electron;

	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	controller.azimuth_electron = azimuth_electron/DEGREE;
	gui.updateDisplay();		
}

function Z_Pauli()
{
	polar_electron = polar_electron;
	azimuth_electron = Math.PI + azimuth_electron;	

	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	controller.azimuth_electron = azimuth_electron/DEGREE;
	gui.updateDisplay();		
}

function Hadamard()
{
	var theta = polar_electron;
	var fi = azimuth_electron;
	
	var k = 1 / Math.sqrt(2);
	// после умножения на матрицу Адамара получаем вектор из одного столбца и двух строк в нем
	var real_1 = k * Math.cos(theta/2) + k * Math.sin(theta/2) * Math.cos(fi);  // real первая строка
	var imag_1 = k * Math.sin(theta/2) * Math.sin(fi);                          // imgine  первая строка
	var real_2 = k * Math.cos(theta/2) - k * Math.sin(theta/2) * Math.cos(fi);  // real вторая строка
	var imag_2 = - k * Math.sin(theta/2) * Math.sin(fi);                        // imgine вторая строка
	
	// переводим в экспоненциальную форму обе строки
	var r1 = Math.sqrt(Math.abs(real_1)*Math.abs(real_1) +
					   Math.abs(imag_1)*Math.abs(imag_1));
					   
	var fi_1 = Math.atan2(imag_1, real_1);
	
	var r2 = Math.sqrt(Math.abs(real_2)*Math.abs(real_2) +
					   Math.abs(imag_2)*Math.abs(imag_2));
					   
	var fi_2 = Math.atan2(imag_2, real_2);	
	
	var ang_fi = fi_2 - fi_1;  // находим азимут вектора Блоха
	
	ang1 = Math.acos(r1); // находим половину угла наклона (географическая широта) 
	ang2 = Math.asin(r2); // находим ang2, для того чтобы 
	                      // проверить, что ang1 = ang2
	
	polar_electron = 2*ang1;
	azimuth_electron = ang_fi;
	
	recalc();
	controller.polar_electron = 2 * ang1 / DEGREE;
	controller.azimuth_electron = azimuth_electron/DEGREE;
	gui.updateDisplay();		
}