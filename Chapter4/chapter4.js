// sphere.js
var DEGREE = 0.01745329251994; // величина углового градуса в радианах

var canvas; 	// Ссылка на элемент по его идентификатору (id = "canvas_draw") для отображения 3D-модели.

var hud_1; 		// Ссылка на элемент id = "hud_1". Двумерный канвас для отображения текста в левой части окна.
var ctx_hud_1;	// контекст для рисования на холсте в левой части окна	

var hud_2; 		// Ссылка на элемент id = "hud_2". Двумерный канвас для отображения текста в средней части окна.
var ctx_hud_2; 	// контекст для рисования на холсте в средней части окна

var gui; 		// объект dat.GUI
var controller; // В объекте controller определяем свойства для параметров модели и их начальные значения.
				
var scene, camera, renderer, orbitControl;

var azimuth_spinor = 0 * DEGREE;
var polar_spinor = 0 * DEGREE;

var azimuth_electron = 0; 
var polar_electron = 0;

var polar_electron = 3*Math.PI/10;
var azimuth_electron = 4*Math.PI/12; 


var sphere;
var rs = 14; 	// Sphere radius

var particle;	// Электрон
var re = 2;		// радиус электрона

var group_spinor_text; // Слово Spin
var mesh_spinor_arrow;
var mesh_electron_arrow;

var line_1, line_2, line_3, line_0, line_4;
var circle_1, circle_2, circle_3;
var line_XZ, line_XZ_2;
var sp1, sp2;

function init()
{	
	canvas = document.getElementById("canvas_draw");
	hud_1 = document.getElementById("hud_1");
	ctx_hud_1 = hud_1.getContext('2d');
	if (!ctx_hud_1) 
	{
		console.log('Failed to get rendering context');
		return;
	}	
	
	hud_2 = document.getElementById("hud_2");
	ctx_hud_2 = hud_2.getContext('2d');
	if (!ctx_hud_2) 
	{
		console.log('Failed to get rendering context');
		return;
	}		
	
	/////////////////////////////////////////////////////////////////////////
	// Для задания значений параметров будем использовать библиотеку dat.GUI
	// В объекте controller определяем свойства для параметров модели и их
	// начальные значения.
	/////////////////////////////////////////////////////////////////////////
    controller = new function() 
	{
//		this.azimuth_spinor = azimuth_spinor / DEGREE;
//		this.polar_spinor = polar_spinor / DEGREE;
		
		this.azimuth_electron = azimuth_electron / DEGREE;
		this.polar_electron = polar_electron / DEGREE;
    }();	
	
	// Создаем новый объект dat.GUI.
	gui = new dat.GUI({ autoPlace: false });
	gui.domElement.id = 'gui';
	gui_container.appendChild(gui.domElement);  // id = "gui_container"
/*	
    var f1 = gui.addFolder('Angles spinor (°)');
    f1.add(controller, 'azimuth_spinor', 0.0, 360.0).onChange( function() 
	{
	   orbitControl.enabled = false;
       azimuth_spinor = (controller.azimuth_spinor) * DEGREE;
	   recalc();
	   gui.updateDisplay();
    });	
	f1.add(controller, 'polar_spinor', 0, 360.0).onChange( function() 
	{
	   orbitControl.enabled = false;
       polar_spinor = (controller.polar_spinor)* DEGREE;
	   recalc();
	   gui.updateDisplay();
    });		
*/	
    var f2 = gui.addFolder('    Angles electron (°)');
    f2.add(controller, 'azimuth_electron', 0.0, 360.0).onChange( function() 
	{
	   orbitControl.enabled = false;
       azimuth_electron = (controller.azimuth_electron)* DEGREE;
	   recalc();
	   gui.updateDisplay();
    });	
	f2.add(controller, 'polar_electron', 0.0, 720.0).onChange( function() 
	{
	   orbitControl.enabled = false;
       polar_electron = (controller.polar_electron)* DEGREE;
	   recalc();
	   gui.updateDisplay();
    });
	f2.open();
	
	///////////////////////////////////////////////	
	// Создаем трехмерную сцену, камеру и рендерер
	///////////////////////////////////////////////
	scene = new THREE.Scene();

	var width = canvas.width;
	var height = canvas.height;
	var aspect = width / height;
	
	camera = new THREE.OrthographicCamera( -20, 20, 20/aspect, -20/aspect, 1, 2000 ); 
/*	
	camera.position.x = 200;
	camera.position.y = 200;
	camera.position.z = 200;
*/

	camera.position.x = 70;
	camera.position.y = 100;
	camera.position.z = 200;
	
	camera.lookAt(new THREE.Vector3(0, 0, 0));	
	scene.add(camera);
	
	// Создаем renderer
	renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
	renderer.setSize(canvas.width, canvas.height);

	// Элемент управления дающий возможность осматривать модель пирамиды со всех сторон.
	orbitControl = new THREE.OrbitControls(camera, canvas);	
		
	//////// Истинные оси координат /////
//	var axes = new THREE.AxesHelper(5);
//	axes.position.set(14, 14, -5);
//	scene.add(axes);
	create_scene();
	
	AddLabels();
	AddButtons();	
	
	// Отображение на экран.
	render();
}	

function create_scene()
{	
	/////////////////////////////
	// Sphere
	var rs = 14; // Sphere radius
	var sphereGeometry = new THREE.SphereGeometry(rs, 32, 12);
	var sphereMaterial = new THREE.MeshPhongMaterial({color: 0xaabbff, opacity: 0.5, transparent: true });

	sphereMaterial.side = THREE.FrontSide;
	sphereMaterial.shading = THREE.FlatShading;
	sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	// position the sphere
	sphere.position.x = 0;
	sphere.position.y = 0;
	sphere.position.z = 0;
	
	//////////////////////////
	// Electron (particle) sphere
	var particleGeometry = new THREE.SphereGeometry(re, 32, 12);
//	var particleMaterial = new THREE.MeshPhongMaterial({color: 0x00aa00, opacity: 1.0, transparent: false });
	var particleMaterial = new THREE.MeshPhongMaterial({color: 0x00aaff, opacity: 1.0, transparent: false });

	particleMaterial.side = THREE.FrontSide;
	particleMaterial.shading = THREE.FlatShading;
	particle = new THREE.Mesh(particleGeometry, particleMaterial);

	// position the sphere
	particle.position.x = 0;
	particle.position.y = 0;
	particle.position.z = 0;

	// plane_OXY
	const geometry_plane = new THREE.PlaneGeometry( 39, 48 );
	const material_plane = new THREE.MeshPhongMaterial( {color: 0x444444, side: THREE.DoubleSide, opacity: 0.2, transparent: true } );
	const plane_OXY = new THREE.Mesh( geometry_plane, material_plane );
	
	plane_OXY.position.x = 0;
	plane_OXY.position.y = 0;
	plane_OXY.position.z = 0;
	
	plane_OXY.rotation.x = Math.PI/2;
	
	// Axes x, y, z
	const axis_length = rs;
	var points = [];
	
	const material_axis_X = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const material_axis_Y = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const material_axis_Z = new THREE.LineBasicMaterial( { color: 0x000000 } );
	
	points = [];
	points.push( new THREE.Vector3(-axis_length, 0, 0 ) );
	points.push( new THREE.Vector3( axis_length, 0, 0 ) );
	const geometry_axis_X = new THREE.BufferGeometry().setFromPoints( points );
	const axis_X = new THREE.Line( geometry_axis_X, material_axis_X  );
	
	points = [];
	points.push( new THREE.Vector3(0,  axis_length, 0 ) );
	points.push( new THREE.Vector3(0, -axis_length, 0 ) );
	const geometry_axis_Y = new THREE.BufferGeometry().setFromPoints( points );
	const axis_Y = new THREE.Line( geometry_axis_Y, material_axis_Y  );

	points = [];
	points.push( new THREE.Vector3(0, 0,  axis_length ) );
	points.push( new THREE.Vector3(0, 0, -axis_length ) );
	const geometry_axis_Z = new THREE.BufferGeometry().setFromPoints( points );
	const axis_Z = new THREE.Line( geometry_axis_Z, material_axis_Z  );

	// Спин spinor_arrow 
	var diam1 = 0.1;
	var diam2 = 0.4;
	var length_1 = rs - 2;
	var length_2 = rs;

	const spinor_arrow = new THREE.Shape();
	spinor_arrow.moveTo( 0, diam1 );
	spinor_arrow.lineTo( length_1, diam1 );
	spinor_arrow.lineTo( length_1, diam2 );
	spinor_arrow.lineTo( length_2, 0 );
	spinor_arrow.lineTo( length_1, -diam2 );
	spinor_arrow.lineTo( length_1, -diam1 );
	spinor_arrow.lineTo( 0, -diam1 );
	spinor_arrow.lineTo( 0, diam1 );
	
	var extrudeSettings = {
	  depth: 0.3,
	  bevelEnabled: false
	};

	const geometry_spinor_arrow = new THREE.ExtrudeGeometry( spinor_arrow, extrudeSettings );
	const material_spinor_arrow = new THREE.MeshBasicMaterial( { color: 0x00aa00 } );
	mesh_spinor_arrow = new THREE.Mesh( geometry_spinor_arrow, material_spinor_arrow ) ;
	mesh_spinor_arrow.position.set(0, 0, 0);	
	
	mesh_spinor_arrow.rotation.z = polar_spinor + Math.PI/2;
	mesh_spinor_arrow.rotation.y = azimuth_spinor + Math.PI/2;//!!!
	
	scene.add(mesh_spinor_arrow);
	scene.add(sphere);
	scene.add(particle);
	
	// *************************************************************
	
		// electron_arrow
	diam_1 = 0.1;
	diam_2 = 1;

	const electron_arrow = new THREE.Shape();

	electron_arrow.moveTo( -length_2/2, diam_1 );
	electron_arrow.lineTo( length_1/2, diam_1 );
	electron_arrow.lineTo( length_1/2, diam_2/2 );
	electron_arrow.lineTo( length_2/2, 0 );
	electron_arrow.lineTo( length_1/2, -diam_2/2 );
	electron_arrow.lineTo( length_1/2, -diam_1 );
	electron_arrow.lineTo( -length_2/2, -diam_1 );
	electron_arrow.lineTo( -length_2/2, diam_1 );

	const geometry_electron_arrow = new THREE.ExtrudeGeometry( electron_arrow, extrudeSettings );
	const material_electron_arrow = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
	mesh_electron_arrow = new THREE.Mesh( geometry_electron_arrow, material_electron_arrow ) ;
	mesh_electron_arrow.position.set(0, 0, 0);	
	mesh_electron_arrow.rotation.y = azimuth_electron + Math.PI/2;
	mesh_electron_arrow.rotation.z = polar_electron + Math.PI/2;
	
	scene.add(mesh_electron_arrow);
	
	// *************************************************************
	
	//scene.add( plane_OXY );	
	
	scene.add(axis_X);
	scene.add(axis_Y); 
	scene.add(axis_Z);	
	
	// три кольца
	const geometry_torus = new THREE.TorusGeometry( 14, 0.1, 16, 100 );
	const material_torus_1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const material_torus_2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	const material_torus_3 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const torus_1 = new THREE.Mesh( geometry_torus, material_torus_1 );
	const torus_2 = new THREE.Mesh( geometry_torus, material_torus_2 );
	const torus_3 = new THREE.Mesh( geometry_torus, material_torus_3 );
				//			torus_2.rotation.x = Math.PI/2;
	torus_3.rotation.y = Math.PI/2;
	scene.add(torus_1);
				//			scene.add(torus_2);
	scene.add(torus_3);
	
	///////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	spinor_text();


	// свет
	const light_1 = new THREE.PointLight( 0xffffff, 1, 0 );
	light_1.position.set( 100, 200, 100 );
	scene.add( light_1 );

	const light_2 = new THREE.PointLight( 0xffffff, 1, 0 );
	light_2.position.set( - 100, - 200, - 100 );
	scene.add( light_2 );
	
	print_spin_1();
	print_spin_2();
}

function recalc()
{	
	mesh_electron_arrow.rotation.y = azimuth_electron + Math.PI;
	mesh_electron_arrow.rotation.z = polar_electron + Math.PI/2;	
	
	var spinor_teta = 0.5 * polar_electron;
	var spinor_fi = azimuth_electron + Math.PI/2;
	
//	var spinor_teta = polar_spinor;
//	var spinor_fi = azimuth_spinor;
	
	var r = 14;
	
	var spinor_x = r * Math.sin(spinor_teta) * Math.cos(spinor_fi);
	var spinor_y = r * Math.sin(spinor_teta) * Math.sin(spinor_fi);
	var spinor_z = r * Math.cos(spinor_teta);
	console.log("****SPIN x = ", spinor_x);
	console.log("****SPIN y = ", spinor_y);
	console.log("****SPIN z = ", spinor_z);	
	console.log("******");	
	
	var X = spinor_y;
	var Y = spinor_z;
	var Z = spinor_x;
	
	mesh_spinor_arrow.position.set(0, 0, 0);
	
	mesh_spinor_arrow.rotation.z = spinor_teta + Math.PI/2;
	mesh_spinor_arrow.rotation.y = spinor_fi + Math.PI/2;//!!!
	
	
	var SPIN = new THREE.Vector3(X, Y, Z);
	var proj_OXY = new THREE.Vector3(X, Y, 0);
	var proj_OXZ = new THREE.Vector3(X, 0, Z);
	var proj_OYZ = new THREE.Vector3(0, Y, Z);
	var CENTER = new THREE.Vector3(0, 0, 0);
	
	scene.remove( line_0 );
	var points = [];
	points.push(SPIN);
	points.push(CENTER);
	var geometry_line_0 = new THREE.BufferGeometry().setFromPoints( points );
	var material_line_0 = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
	line_0 = new THREE.Line( geometry_line_0, material_line_0 );
	scene.add( line_0 );
	
	scene.remove( line_1 );
	var points = [];
	points.push(SPIN);
	points.push(proj_OXY);
	var geometry_line_1 = new THREE.BufferGeometry().setFromPoints( points );
	var material_line_1 = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	line_1 = new THREE.Line( geometry_line_1, material_line_1 );
	//scene.add( line_1 );
	
	scene.remove( line_2 );
	points = [];
	points.push(SPIN);
	points.push(proj_OXZ);
	var geometry_line_2 = new THREE.BufferGeometry().setFromPoints( points );
	var material_line_2 = new THREE.LineBasicMaterial( {color: 0x00aa00} );
	line_2 = new THREE.Line( geometry_line_2, material_line_2 );
	scene.add( line_2 );
	
	scene.remove( line_3 );
	points = [];
	points.push(SPIN);
	points.push(proj_OYZ);
	var geometry_line_3 = new THREE.BufferGeometry().setFromPoints( points );
	var material_line_3 = new THREE.LineBasicMaterial( { color: 0xff00ff } );
	line_3 = new THREE.Line( geometry_line_3, material_line_3 );
	//scene.add( line_3 );

	scene.remove( line_4 );
	points = [];
	points.push(CENTER);
	points.push(proj_OXZ);
	var geometry_line_4 = new THREE.BufferGeometry().setFromPoints( points );
	var material_line_4 = new THREE.LineBasicMaterial( { color: 0xff00ff } );
	line_4 = new THREE.Line( geometry_line_4, material_line_4 );
	scene.add( line_4 );
	
	var X1 = r * Math.sin(spinor_fi);
	var Z1 = r * Math.cos(spinor_fi);
	var pt1 = new THREE.Vector3(X1, 0, Z1);
	
	var X2 = r * Math.sin(spinor_fi + Math.PI);
	var Z2 = r * Math.cos(spinor_fi + Math.PI);
	var pt2 = new THREE.Vector3(X2, 0, Z2);
	
	scene.remove( line_XZ );
	var points = [];
	points.push(pt1);
	points.push(pt2);
	var geometry_line_XZ = new THREE.BufferGeometry().setFromPoints( points );
	var material_line_XZ = new THREE.LineBasicMaterial( { color: 0x00aa00 } );
	line_XZ = new THREE.Line( geometry_line_XZ, material_line_XZ );
	scene.add( line_XZ );
	
	scene.remove( line_XZ_2 );
	var points = [];
	points.push(new THREE.Vector3(X, Y, Z));
	points.push(new THREE.Vector3(0, Y, 0));
	var geometry_line_XZ_2 = new THREE.BufferGeometry().setFromPoints( points );
	var material_line_XZ_2 = new THREE.LineBasicMaterial( { color: 0x00aa00 } );
	line_XZ_2 = new THREE.Line( geometry_line_XZ_2, material_line_XZ_2 );
	scene.add( line_XZ_2 );
	
	// sphere1 & sphere2
	scene.remove(sp1);
	scene.remove(sp2);
	//var spGeometry = new THREE.SphereGeometry(0.5, 32, 12);
	var spGeometry = new THREE.CubeGeometry(0.5, 0.5, 0.5);
//	var spMaterial_1 = new THREE.MeshPhongMaterial({color: 0x000000, opacity: 1.0, transparent: false });
//	var spMaterial_2 = new THREE.MeshPhongMaterial({color: 0x000000, opacity: 1.0, transparent: false });
	var spMaterial_1 = new THREE.MeshBasicMaterial({color: 0xff00ff});
	var spMaterial_2 = new THREE.MeshBasicMaterial({color: 0xff00ff});
	spMaterial_1.side = THREE.FrontSide;
	spMaterial_1.FlatShading = true;
	spMaterial_2.side = THREE.FrontSide;
	spMaterial_2.FlatShading = true;
	sp1 = new THREE.Mesh(spGeometry, spMaterial_1);
	sp2 = new THREE.Mesh(spGeometry, spMaterial_2);

//	sp1.position.set(0, Z, 0);
//	sp2.position.set(Y, 0, X);

	sp1.position.set(0, Y, 0);
	sp2.position.set(X, 0, Z);
	
	console.log("spinor x = ", spinor_x);
	console.log("spinor y = ", spinor_y);
	console.log("spinor z = ", spinor_z);
	
	console.log("X = ", spinor_x);
	console.log("Y = ", spinor_y);
	console.log("Z = ", spinor_z);
	
	scene.add(sp1);
	scene.add(sp2);
	
	///////////////////////////////
	
	print_spin_1();
	print_spin_2();
}

function print_spin_2() 
{ 
	var probab = "〈σ〉 = ";
	
	var elem2 = document.getElementById('hud_2');
	ctx_hud_2.clearRect(0, 0, elem2.width, elem2.height);
	
	ctx_hud_2.font = 'bold italic 22px "Times New Roman"';
	ctx_hud_2.fillStyle = "#0000aa";
	ctx_hud_2.fillText("Visualization of quantum spin", 10, 50);
	
	var d = 30;
	ctx_hud_2.font = 'bold 12px "Times New Roman"';
	ctx_hud_2.fillStyle = "#0000aa";
	ctx_hud_2.fillText("Electron", 20+d, 100);
	ctx_hud_2.fillStyle = "#000000";
	ctx_hud_2.fillText(" / ", 65+d, 100);
	ctx_hud_2.fillStyle = "#008800";
	ctx_hud_2.fillText("Spinor ", 75+d, 100);	
	ctx_hud_2.fillStyle = "#000000";
	ctx_hud_2.fillText("polar angles : ", 115+d, 100);		
	
	ctx_hud_2.fillStyle = "#000000";
	var text_ang = roundNumber(polar_electron/DEGREE, 0) + "°" + "/ " +
				roundNumber(0.5 * polar_electron/DEGREE, 0) + "°";
				
	var polar_degree = polar_electron/DEGREE;
				
	ctx_hud_2.fillText(text_ang, 190+d, 100);	
	
	ctx_hud_2.fillStyle = "#0000aa";
	ctx_hud_2.fillText("Electron ", 20+d, 130);	
	ctx_hud_2.fillStyle = "#000000";
	text_ang = "azimuzh angle : ";
	ctx_hud_2.fillText(text_ang, 70+d, 130);	
	
	text_ang = roundNumber(azimuth_electron/DEGREE, 0) + "°";
	ctx_hud_2.fillText(text_ang, 160+d, 130);
	
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	
	var fi = roundNumber(azimuth_electron/DEGREE, 0) + "°)";
	
	var cos_teta = Math.cos(polar_electron/2);
	var sin_teta = Math.sin(polar_electron/2);
	
	var text_cos_teta = roundNumber(cos_teta, 3);
	var text_sin_teta = roundNumber(sin_teta, 3);
	
	//ctx_hud_2.font = '12px "Times New Roman"';
	ctx_hud_2.font = '14px "Arial"';
	var text_color = "#00F";
	var value_color = "#00f";
	ctx_hud_2.fillStyle = text_color;
	
	var rez1 = "|ψ〉 = " + "(" + text_cos_teta + ") " + " + " + " (" + text_sin_teta + ") ";
	var rez = rez1 + "·exp(i·" + fi;
//	ctx_hud_2.fillText(rez, 10, 160);
	
	fi = roundNumber(azimuth_electron/DEGREE, 0) + "°) · |d〉";
	var rez = "|ψ〉 = " + 
				"(" + text_cos_teta + ")·|u〉 " + " + " +
			" (" + text_sin_teta + ") ";
	var rez = rez + "·exp(i·" + fi;
	
	ctx_hud_2.fillText(rez, 10, 160);	
	
	/////////////////////////////////////////////
	///////////////////////////////////////////////
	/////////////////////////////////////////////////////

	var a = Math.sin(polar_electron/2) * Math.cos(azimuth_electron);
	var b = Math.sin(polar_electron/2) * Math.sin(azimuth_electron);
	text_a = roundNumber(a, 3);
	text_b = roundNumber(b, 3);	
	
	var rez;
	var rez1, rez2;
	
	if ( (cos_teta > -0.0000001) && (cos_teta < 0.0000001) )
	{
		rez1 = "|ψ〉 = " + "(0)·" + "|u〉";
	}
	else 
	{
		rez1 = "|ψ〉 = " + "(" + roundNumber(cos_teta, 3) + ")·" + "|u〉 ";
	}
	
	////////////////////////////////////////////////////////////////////
	
	if ( (Math.abs(a) < 0.00001) && (Math.abs(b) < 0.00001) )
	{
		rez2 = " + (0)·" + "|d〉";
	}
	else if ( (Math.abs(a) < 0.00001) && (Math.abs(b) > 0.00001) )
	{
		rez2 = " + " + "i·(" + roundNumber(b, 3) + ")" + "·" + "|d〉";
	}
	else if ( (Math.abs(a) > 0.00001) && (Math.abs(b) < 0.00001) )
	{
		rez2 = " + " + "(" + roundNumber(a, 3) + ")" + "·" + "|d〉";
	}
	else if ( (Math.abs(a) > 0.00001) && (Math.abs(b) > 0.00001) )
	{
	rez2 = " + [ (" + roundNumber(a, 3) + ") + " + "i·(" + roundNumber(b, 3) + ")]" + "·" + "|d〉";
	}
	
	rez = rez1 + rez2;
/*
	if (b == 0)
	{
		//text_b = roundNumber(b, 3);	
		text_b = "|1〉";
		rez = "|ψ〉 = " + 
				"( " + text_cos_teta + " )·|0〉 " + " + " + text_b;
	}
	else if (b > 0.0000001)
	{
		text_b = roundNumber(b, 3);	
		text_b = "+ i * " + text_b + ")·|1〉";
		rez = "|ψ〉 = " + 
				"( " + text_cos_teta + " )·|0〉 " + " + " +
				" ("  + text_a + " " + " " + text_b;
	}
	else if (b < 0.0000001)
	{
		if (b > -0.00000001)
		{
			text_b = roundNumber(Math.sin(polar_electron/2), 3);	
			text_b = b + "|1〉";
			rez = "|ψ〉 = " + 
				"( " + text_cos_teta + " )·|0〉 " + " + " + text_b;		
		}
		b = Math.abs(b);
		text_b = roundNumber(b, 3);	
		text_b = "- i * " + text_b + ")·|1〉";
		rez = "|ψ〉 = " + 
				"( " + text_cos_teta + " )·|0〉 " + " + " +
				" ("  + text_a + " " + " " + text_b;		
	}
*/	
	ctx_hud_2.fillText(rez, 10, 180);		

	
	
	/////////////////////////////////////////////
	// Probability
	var p0 = cos_teta * cos_teta * 100;
	var p1 = sin_teta * sin_teta * 100;
	var text_p0 = roundNumber(p0, 3);
	var text_p1 = roundNumber(p1, 3);
	
	ctx_hud_2.font = 'bold 12px "Times New Roman"';
	ctx_hud_2.fillStyle = "#000000";
	ctx_hud_2.fillText("|ψ〉 = a0·|u〉 + a1·|d〉", 60, 220);
	
	ctx_hud_2.font = '14px "Times New Roman"';
	ctx_hud_2.fillStyle = "#0000aa";
	ctx_hud_2.fillText("P(0) = " + text_p0 + "%" + "  (a0 = " + text_cos_teta +")", 60, 250);	
	ctx_hud_2.fillText("P(1) = " + text_p1 + "%" + "  (a1 = " + text_sin_teta +")", 60, 270);	

//	var index = 1234567890;
//	ctx_hud_2.fillText("N" + index, 0, 300);
//	ctx_hud_2.fillText("N" + toSub(index), 0, 340);

	
}	

function print_spin_1()
{
	var elem = document.getElementById('canvas_draw');
	ctx_hud_1.clearRect(0, 0, elem.width, elem.height);
	
	var fi = roundNumber(azimuth_electron/DEGREE, 0) + "°) · |d〉";
	
	var cos_teta = Math.cos(polar_electron/2);
	var sin_teta = Math.sin(polar_electron/2);
	var b = Math.sin(polar_electron/2) * Math.cos(azimuth_electron);
	var c = Math.sin(polar_electron/2) * Math.sin(azimuth_electron);
	
	var text_cos_teta = roundNumber(cos_teta, 3);
	var text_sin_teta = roundNumber(sin_teta, 3);
	text_b = roundNumber(b, 3);
	text_c = roundNumber(c, 3);	
	
	//ctx_hud_1.font = '16px "Times New Roman"';
	ctx_hud_1.font = 'bold 17px "Times New Roman"';
	var text_color = "#000";
	var value_color = "#00f";
	ctx_hud_1.fillStyle = text_color;
//	ctx_hud_1.fillText(text_cos_teta, 10, 100);	
//	ctx_hud_1.fillText(text_sin_teta, 10, 120);	
	
	var rez = "|ψ〉  =  " + 
				"(" + text_cos_teta + ") · |u〉 " + " + " +
			" (" + text_sin_teta + ") ";
	var rez = rez + "· exp(i·" + fi;
	
	ctx_hud_1.fillText(rez, 90, 417);	
	
	
/*
	ctx_hud_1.font = 'bold 12px "Times New Roman"';
	ctx_hud_1.fillStyle = "#0000aa";
	ctx_hud_1.fillText("Electron", 20, 410);
	ctx_hud_1.fillStyle = "#000000";
	ctx_hud_1.fillText(" / ", 65, 410);
	ctx_hud_1.fillStyle = "#008800";
	ctx_hud_1.fillText("Spinor ", 75, 410);	
	ctx_hud_1.fillStyle = "#000000";
	ctx_hud_1.fillText("angles :     ", 115, 410);		
	
	ctx_hud_1.fillStyle = "#000000";
	var text = roundNumber(polar_electron/DEGREE, 0) + "°" + "/ " +
				roundNumber(0.5 * polar_electron/DEGREE, 0) + "°";
	ctx_hud_1.fillText(text, 155, 410);	
	
	ctx_hud_1.fillStyle = "#0000aa";
	ctx_hud_1.fillText("Electron ", 330, 410);	
	ctx_hud_1.fillStyle = "#000000";
	text = "azimuzh angle : ";
	ctx_hud_1.fillText(text, 380, 410);	
	
	text = roundNumber(azimuth_electron/DEGREE, 0) + "°";
	ctx_hud_1.fillText(text, 465, 410);
*/
}

//////////////////////////////////////////////////////////////
// 3D-Text
//////////////////////////////////////////////////////////////
var loaderText = new THREE.FontLoader(); // загрузчик шрифтов

// характеристики создаваемого 3D текста
function create_text(txt)
{
	var t =
	{
		text : txt,          // текст номера, который небходимо отобразить
		size : 6,            // размер текста (высота символа)
		height : 1,          // толщина текста
		curveSegments : 12,  // количество точек (сегментов) 
              // кривой при рисовании буквы, отвечающие за качество изображения
		//     font : "gentilis",   // название шрифта
		bevelEnabled : false // включение фаски (при true)
	};	
	return t;
}
	
// Создание текста для оцифровки вершин огранки.			
function generateGeometry(meshText, text)
{
	var data = create_text(text);
	loaderText.load
	( 
		//'../libs/helvetiker_regular.typeface.js', // шрифт
		//'../libs/optimer_regular.typeface.js',
		//'../libs/bitstream_vera_sans_mono_roman.typeface.js',
		'../libs/gentilis_regular.typeface.js',
		function ( font ) 
		{
			var geometryText = new THREE.TextGeometry
			( 
				data.text, 
				{
					font: font,
					size: data.size,
					height: data.height,
					curveSegments: data.curveSegments,
					bevelEnabled: data.bevelEnabled
				} 
			);
			geometryText.center();
			meshText.children[ 0 ].geometry.dispose(); 
			meshText.children[ 0 ].geometry = geometryText;			
		}
	);
}

function roundNumber(num, places) 
{
	return ( Math.round(num * Math.pow(10, places)) / Math.pow(10, places) );
}
	
	
function toSub(value)
{
  var str = "";
  //  Get the number of digits, with a minimum at 0 in case the value itself is 0
  var mag = Math.max(0, Math.floor(Math.log10(value)));
  //  Loop through all digits
  while (mag >= 0)
  {
    //  Current digit's value
    var digit = Math.floor(value/Math.pow(10, mag))%10;
    //  Append as subscript character
    str += String.fromCharCode(8320 + digit);
    mag--;
  }
  return str;
}

function render() 
{
	orbitControl.enabled = true;
	renderer.render(scene, camera);		
	requestAnimationFrame(render);
}

window.onload = init;
