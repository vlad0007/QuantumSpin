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

var azimuth_spin = 0 * DEGREE;
var polar_spin = 40 * DEGREE;

var azimuth_device = 0; //Math.PI/2;
var polar_device = 0;

var sphere;
var rs = 14; 	// Sphere radius

var electron;	// Электрон
var re = 4;		// радиус электрона

var group_device; // две измерительные пластины

var mesh_spin_arrow;
var mesh_device_arrow;
var cube_measurement; // включается по нажатию кнопки "Measurement"

var prb;
var up_down = 1;

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
		this.azimuth_spin = azimuth_spin / DEGREE;
		this.polar_spin = polar_spin / DEGREE;
		
		this.azimuth_device = azimuth_device / DEGREE;
		this.polar_device = polar_device / DEGREE;
    }();	
	
	// Создаем новый объект dat.GUI.
	gui = new dat.GUI({ autoPlace: false });
	gui.domElement.id = 'gui';
	gui_container.appendChild(gui.domElement);  // id = "gui_container"
	
    var f1 = gui.addFolder('Angles spin (°)');
    f1.add(controller, 'azimuth_spin', 0.0, 360.0).onChange( function() 
	{
	   orbitControl.enabled = false;
       azimuth_spin = (controller.azimuth_spin) * DEGREE;
	   recalc();
	   gui.updateDisplay();
    });	
	f1.add(controller, 'polar_spin', 0.0, 180.0).onChange( function() 
	{
	   orbitControl.enabled = false;
       polar_spin = (controller.polar_spin)* DEGREE;
	   recalc();
	   gui.updateDisplay();
    });		
	f1.open();
	
    var f2 = gui.addFolder('Angles measurement (°)');
    f2.add(controller, 'azimuth_device', 0.0, 360.0).onChange( function() 
	{
	   orbitControl.enabled = false;
       azimuth_device = (controller.azimuth_device)* DEGREE;
	   recalc();
	   gui.updateDisplay();
    });	
	f2.add(controller, 'polar_device', 0.0, 180.0).onChange( function() 
	{
	   orbitControl.enabled = false;
       polar_device = (controller.polar_device)* DEGREE;
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
	
	camera.position.x = 50;
	camera.position.y = 100;
	camera.position.z = 200;
	
	camera.lookAt(new THREE.Vector3(0, 0, 0));	
	scene.add(camera);
	
	// Создаем renderer
	renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
	renderer.setSize(canvas.width, canvas.height);

	// Элемент управления дающий возможность осматривать модели со всех сторон.
	orbitControl = new THREE.OrbitControls(camera, canvas);	

/*
	//////// Истинные оси координат /////
	var axes = new THREE.AxesHelper(10);
	axes.position.set(14, 14, -5);
	scene.add(axes);
*/
	create_scene();
	
	// Большая кнопка Measurement
	btn_measurment.disabled = false;
	btn_measurment.addEventListener("click", spin_measurement);
	
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
	var sphereMaterial = new THREE.MeshPhongMaterial({color: 0xaabbff, opacity: 0.7, transparent: true });
	sphereMaterial.side = THREE.FrontSide;
	sphereMaterial.shading = THREE.FlatShading;
	sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	// position the sphere
	sphere.position.x = 0;
	sphere.position.y = 0;
	sphere.position.z = 0;
	
	//////////////////////////
	// Electron sphere
	var electronGeometry = new THREE.SphereGeometry(re, 32, 12);
	var electronMaterial = new THREE.MeshPhongMaterial({color: 0x22ff22, opacity: 0.7, transparent: false });
	electronMaterial.side = THREE.FrontSide;
	electronMaterial.shading = THREE.FlatShading;
	electron = new THREE.Mesh(electronGeometry, electronMaterial);

	// position the sphere
	electron.position.x = 0;
	electron.position.y = 0;
	electron.position.z = 0;
	
	// Circles
	const curve = new THREE.EllipseCurve(
		0,  0,            // ax, aY
		rs, rs,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false,            // aClockwise
		0                 // aRotation
	);

	const points_ellipse = curve.getPoints( 50 );
	const geometry_ellipse = new THREE.BufferGeometry().setFromPoints( points_ellipse );

	const material_ellipse_1 = new THREE.LineBasicMaterial( { color : 0x0000ff } );
	const ellipse_1 = new THREE.Line( geometry_ellipse, material_ellipse_1 );
	
	ellipse_1.position.x = 0;
	ellipse_1.position.y = 0;
	ellipse_1.position.z = 0;
	
	ellipse_1.rotation.x = Math.PI/2;
	
	const material_ellipse_2 = new THREE.LineBasicMaterial( { color : 0x0000ff } );
	const ellipse_2 = new THREE.Line( geometry_ellipse, material_ellipse_2 );
	
	ellipse_2.position.x = 0;
	ellipse_2.position.y = 0;
	ellipse_2.position.z = 0;
	
	ellipse_2.rotation.y = Math.PI/2;
	
	const material_ellipse_3 = new THREE.LineBasicMaterial( { color : 0x0000ff } );
	const ellipse_3 = new THREE.Line( geometry_ellipse, material_ellipse_3 );
	
	ellipse_3.position.x = 0;
	ellipse_3.position.y = 0;
	ellipse_3.position.z = 0;
	ellipse_3.rotation.z = Math.PI/2;
	
	// Axes x, y, z
	const axis_length = 20;
	var points = [];
	
	const material_axis_X = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const material_axis_Y = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const material_axis_Z = new THREE.LineBasicMaterial( { color: 0x000000 } );
	
	points = [];
	points.push( new THREE.Vector3(-axis_length + 5 , 0, 0 ) );
	points.push( new THREE.Vector3( axis_length - 4.5, 0, 0 ) );
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

	// Cones
	const cone_dist = 20;
	const geometry_cone = new THREE.ConeGeometry( 0.3, 1, 10 );
	const material_cone = new THREE.MeshBasicMaterial( {color: 0x000000} );
	const cone_X = new THREE.Mesh( geometry_cone, material_cone );
	const cone_Y = new THREE.Mesh( geometry_cone, material_cone );
	const cone_Z = new THREE.Mesh( geometry_cone, material_cone );
	
	const cone_dist_X = 16.0;
	cone_X.position.set(cone_dist_X, 0, 0);
	cone_X.rotation.x = Math.PI / 2;
	cone_X.rotation.z = Math.PI * 3 / 2;
	
	cone_Y.position.set(0, cone_dist, 0);
	
	cone_Z.position.set(0, 0, cone_dist);
	cone_Z.rotation.x = Math.PI / 2;
	
	// Наименование осей координат
	// X
	const meshText_X = new THREE.Object3D();
	meshText_X.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_X.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_X, "X" );
	meshText_X.scale.set(0.2, 0.2, 0.2);	
	var x = 0;
	var y = 0; 
	var z = axis_length + 2;
	meshText_X.position.set(x, y, z);
	
	// Y
	const meshText_Y = new THREE.Object3D();
	meshText_Y.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_Y.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_Y, "Y" );
	meshText_Y.scale.set(0.2, 0.2, 0.2);	
	var x = axis_length - 3;
	var y = 0; 
	var z = 0;
	meshText_Y.position.set(x, y, z);
	
	// Z
	const meshText_Z = new THREE.Object3D();
	meshText_Z.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_Z.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_Z, "Z" );
	meshText_Z.scale.set(0.2, 0.2, 0.2);	
	var x = 0;
	var y = axis_length + 2;
	var z = 0;
	meshText_Z.position.set(x, y, z);


	// Спин spin_arrow 
	var diam1 = 0.3;
	var diam2 = 1;
	var length_1 = 10;
	var length_2 = rs;

	const spin_arrow = new THREE.Shape();
	spin_arrow.moveTo( 0, diam1 );
	spin_arrow.lineTo( length_1, diam1 );
	spin_arrow.lineTo( length_1, diam2 );
	spin_arrow.lineTo( length_2, 0 );
	spin_arrow.lineTo( length_1, -diam2 );
	spin_arrow.lineTo( length_1, -diam1 );
	spin_arrow.lineTo( 0, -diam1 );
	spin_arrow.lineTo( 0, diam1 );
	
	var extrudeSettings = {
	  depth: 0.2,
	  bevelEnabled: false
	};

	const geometry_spin_arrow = new THREE.ExtrudeGeometry( spin_arrow, extrudeSettings );
	const material_spin_arrow = new THREE.MeshBasicMaterial( { color: 0x00aa00 } );
	mesh_spin_arrow = new THREE.Mesh( geometry_spin_arrow, material_spin_arrow ) ;
	mesh_spin_arrow.position.set(0, 0, 0);	
	mesh_spin_arrow.rotation.y = azimuth_spin + Math.PI/2;
	mesh_spin_arrow.rotation.z = polar_spin + Math.PI/2;
	
	///////////////////////////////////////////////////////////////////////
	// Отображаем текст "Spin" на 3D-холсте
	///////////////////////////////////////////////////////////////////////
	meshText_S = new THREE.Object3D();
	meshText_S.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x00aa00, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_S.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_S, "Spin" );
	meshText_S.scale.set(0.2, 0.2, 0.2);	
	var x = 15.01;
	var y = 0;
	var z = 0;
	meshText_S.rotation.z = -Math.PI/2;
	meshText_S.position.set(x, y, z);	
	
	// device_arrow
	diam_1 = 0.5;
	diam_2 = 2;

	const device_arrow = new THREE.Shape();

	device_arrow.moveTo( -length_2/2, diam_1 );
	device_arrow.lineTo( length_1/2, diam_1 );
	device_arrow.lineTo( length_1/2, diam_2 );
	device_arrow.lineTo( length_2/2, 0 );
	device_arrow.lineTo( length_1/2, -diam_2 );
	device_arrow.lineTo( length_1/2, -diam_1 );
	device_arrow.lineTo( -length_2/2, -diam_1 );
	device_arrow.lineTo( -length_2/2, diam_1 );

	const geometry_device_arrow = new THREE.ExtrudeGeometry( device_arrow, extrudeSettings );
	const material_device_arrow = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
	mesh_device_arrow = new THREE.Mesh( geometry_device_arrow, material_device_arrow ) ;
	mesh_device_arrow.position.set(0, 0, 0);	
	mesh_device_arrow.rotation.y = azimuth_device + Math.PI/2;
	mesh_device_arrow.rotation.z = polar_device + Math.PI/2;
	
	scene.add(sphere);
	scene.add(electron);
	
	scene.add(ellipse_1);
	scene.add(ellipse_2);
	scene.add(ellipse_3);
	
	scene.add(axis_X);
	scene.add(axis_Y); 
	scene.add(axis_Z);	
	
	scene.add(cone_X );
	scene.add(cone_Y);
	scene.add(cone_Z);
	
	scene.add( mesh_spin_arrow );
	scene.add( mesh_device_arrow );
	
	scene.add(meshText_X); 
	scene.add(meshText_Y); 
	scene.add(meshText_Z);
	
	// Измерительный прибор (device) состоит из двух пластин (cube_A и cube_B)
	cube_A = createMesh(new THREE.BoxGeometry(0.5, 8, 8), "n.png");
	cube_B = createMesh(new THREE.BoxGeometry(0.5, 8, 8), "s.png");
	
	cube_A.position.set( 16, 0, 0);
	cube_B.position.set( -16, 0, 0);
	
	group_device = new THREE.Group();
	group_device.add(cube_A);
	group_device.add(cube_B);
	group_device.position.set(0, 0, 0);
	
	group_device.rotation.y = azimuth_device + Math.PI/2;
	group_device.rotation.z = polar_device + Math.PI/2;		
	
	scene.add(group_device);
	
	// Куб используемый для отображения процесса измерения
	const geometry_cube_measurement = new THREE.BoxGeometry( 25.5, 3, 3 );
	const material_cube_measurement = new THREE.MeshPhongMaterial( {color: 0xffff00, opacity: 0.6, transparent: false} );	
	cube_measurement = new THREE.Mesh( geometry_cube_measurement, material_cube_measurement );
	cube_measurement.position.set( 0, 0, 0);
	
	cube_measurement.rotation.y = azimuth_device + Math.PI/2;
	cube_measurement.rotation.z = polar_device + Math.PI/2;
	
	// свет
	const light_1 = new THREE.PointLight( 0xffffff, 1, 0 );
	light_1.position.set( 100, 200, 100 );
	scene.add( light_1 );

	const light_2 = new THREE.PointLight( 0xffffff, 1, 0 );
	light_2.position.set( - 100, - 200, - 100 );
	scene.add( light_2 );
	
	/////////////////////////////////////////
	// u, d, l, f, b, f
	// Сферы
	// sp_num1 & sp_num2
	var spGeometry = new THREE.SphereGeometry(0.4, 32, 12);
	var spMaterial_1 = new THREE.MeshBasicMaterial({color: 0xff00ff, opacity: 0.5, transparent: false });
	spMaterial_1.side = THREE.FrontSide;
	spMaterial_1.shading = THREE.FlatShading;
	var spMaterial_2 = new THREE.MeshPhongMaterial({color: 0xff00ff, opacity: 0.5, transparent: false });
	spMaterial_2.side = THREE.FrontSide;
	spMaterial_2.shading = THREE.FlatShading;	
	
	var up = new THREE.Mesh(spGeometry, spMaterial_1);
	var down = new THREE.Mesh(spGeometry, spMaterial_1);
	var left = new THREE.Mesh(spGeometry, spMaterial_1);
	var right = new THREE.Mesh(spGeometry, spMaterial_1);
	var back = new THREE.Mesh(spGeometry, spMaterial_1);
	var forward = new THREE.Mesh(spGeometry, spMaterial_1);	
	
	up.position.set(    0,   rs,  0);
	down.position.set(  0,   -rs, 0);
	left.position.set(  -rs, 0,   0);	
	right.position.set( rs,  0,   0);
	back.position.set(  0,   0,   -rs); 
	forward.position.set(0,  0,   rs);
	
	scene.add(up);
	scene.add(down);
	scene.add(left);
	scene.add(right);
	scene.add(back);
	scene.add(forward);

	
	// Наименование u, d, ...... "〈σ〉 = ";
	// up
	const meshText_up = new THREE.Object3D();
	meshText_up.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0xaa0000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_up.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_up, "Up" );
	meshText_up.scale.set(0.2, 0.2, 0.2);	
	var x = 0;
	var y = rs + 1; 
	var z = 0;
	meshText_up.position.set(x, y, z);
	scene.add(meshText_up);
	
	// down
	const meshText_down = new THREE.Object3D();
	meshText_down.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0xaa0000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_down.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_down, "Down" );
	meshText_down.scale.set(0.2, 0.2, 0.2);	
	var x = 0;
	var y = -rs - 1; 
	var z = 0;
	meshText_down.position.set(x, y, z);
	scene.add(meshText_down);
	
	// back
	const meshText_back = new THREE.Object3D();
	meshText_back.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0xaa0000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_back.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_back, "Back" );
	meshText_back.scale.set(0.2, 0.2, 0.2);	
	var x = -rs - 2.5;
	var y = 0; 
	var z = 0;
	meshText_back.position.set(x, y, z);
	scene.add(meshText_back);
	
	// forward
	const meshText_forward = new THREE.Object3D();
	meshText_forward.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0xaa0000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_forward.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_forward, "Forward" );
	meshText_forward.scale.set(0.2, 0.2, 0.2);	
	var x = rs + 7.0;
	var y = 0; 
	var z = 0;
	meshText_forward.position.set(x, y, z);
	scene.add(meshText_forward);
	
	// right
	const meshText_right = new THREE.Object3D();
	meshText_right.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0xaa0000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_right.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_right, "Right" );
	meshText_right.scale.set(0.2, 0.2, 0.2);	
	var x = 0;
	var y = 0; 
	var z = rs + 1;
	meshText_right.position.set(x, y, z);
	scene.add(meshText_right);
	
	// left
	const meshText_left = new THREE.Object3D();
	meshText_left.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0xaa0000, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_left.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_left, "Left" );
	meshText_left.scale.set(0.2, 0.2, 0.2);	
	var x = 0;
	var y = 0; 
	var z = -rs - 1;
	meshText_left.position.set(x, y, z);
	scene.add(meshText_left);
	
	draw_angles() ;
}

function recalc()
{
	mesh_spin_arrow.rotation.y = azimuth_spin + Math.PI/2;
	mesh_spin_arrow.rotation.z = polar_spin + Math.PI/2;
	
	mesh_device_arrow.rotation.y = azimuth_device + Math.PI/2;
	mesh_device_arrow.rotation.z = polar_device + Math.PI/2;	
	
	group_device.rotation.y = azimuth_device + Math.PI/2;
	group_device.rotation.z = polar_device + Math.PI/2;	
	
	cube_measurement.rotation.y = azimuth_device + Math.PI/2;
	cube_measurement.rotation.z = polar_device + Math.PI/2;

	var elem2 = document.getElementById('hud_2');
	ctx_hud_2.clearRect(0, 0, elem2.width, elem2.height);
	draw_angles() ;
}

// данная функция используется для создания прибора состоящего из cube_A и cube_B
function createMesh(geom, imageFile) 
{
	var texture = THREE.ImageUtils.loadTexture(imageFile);
	var mat = new THREE.MeshBasicMaterial();
	mat.map = texture;
	var mesh = new THREE.Mesh(geom, mat);
	return mesh;
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

//////////////////////////////////////////
// 2D-Text
//////////////////////////////////////////
function print_spin_measurment()
{
	//statistical spin measurement
	// 'Statistical spin measurement'
	//ctx_hud_1.font = '18px "Times New Roman"';
	
	ctx_hud_1.font = 'italic bold 24px Georgia,serif';
	ctx_hud_1.fillStyle = 'rgba(250, 10, 0, 1)'; // 88aa00
	ctx_hud_1.fillText("    Statistical", 5, 22);
	ctx_hud_1.fillText("\n", 5, 22);
	ctx_hud_1.font = 'italic bold 18px Georgia,serif';
	ctx_hud_1.fillStyle = 'rgba(50, 50, 0, 1)';
	ctx_hud_1.fillText("spin measurement", 5, 40);
}

function spin_measurement() 
{ 
	var probab = "〈σ〉 = ";   // |di〉 =       |u〉 =      |d〉 =

	btn_measurment.disabled = true;
	scene.add(cube_measurement);
	print_spin_measurment();	
	function mesurement() 
	{
		var elem = document.getElementById('canvas_draw');
		ctx_hud_1.clearRect(0, 0, elem.width, elem.height);
		scene.remove(cube_measurement);
		btn_measurment.disabled = false;
		
		// Изменяем направление стрелки спина
		controller.azimuth_spin = azimuth_device / DEGREE;
		controller.polar_spin = polar_device / DEGREE;
		
		// Только для спина с вероятностью от 40% до 60%
		// запускаем генератор случайных чисел
		// Используем ранее полученное значение up_down
		if ( (prb > 40) && (prb < 60) )
		{
			if (up_down == 1)
			{
				polar_spin = polar_device;
				azimuth_spin = azimuth_device;
			
				mesh_spin_arrow.rotation.y = azimuth_device + Math.PI/2;
				mesh_spin_arrow.rotation.z = polar_device + Math.PI/2;
			}
			else
			{
				polar_spin = Math.PI - polar_device;
				azimuth_spin = azimuth_device + Math.PI;
				if (azimuth_spin > 2 * Math.PI)
				{
					azimuth_spin = azimuth_spin - 2 * Math.PI;
				}
				
				//mesh_spin_arrow.rotation.y = azimuth_device + Math.PI/2 + Math.PI;
				//mesh_spin_arrow.rotation.z = polar_device + Math.PI/2 + Math.PI;
				
				mesh_spin_arrow.rotation.y = azimuth_spin + Math.PI/2;
				mesh_spin_arrow.rotation.z = polar_spin + Math.PI/2;
			}
		}
		else
		{
			// ранее отсеяли случай когда спин с вероятностью от 40% до 60%
			// теперь просто когда вероятность больше 50% (на самом деле больше 60%)
			if (prb > 50)
			{
				// спин и прибор смотрят в одну сторону
				polar_spin = polar_device;
				azimuth_spin = azimuth_device;
			
				mesh_spin_arrow.rotation.y = azimuth_device + Math.PI/2;
				mesh_spin_arrow.rotation.z = polar_device + Math.PI/2;
			}
			else
			{
				// теперь просто когда вероятность меньше 50% (на самом деле меньше 40%)
				// спин и прибор смотрят в противоположные стороны
				polar_spin = Math.PI - polar_device;
				azimuth_spin = azimuth_device + Math.PI;
				
				///////////////////////////////////////////////////
				if (polar_device == 0)
				{
					azimuth_spin = 0
				}
				if ( (polar_device < (Math.PI + 0.00001)) && (polar_device > (Math.PI - 0.00001)) )
				{
					azimuth_spin = 0
				}
				///////////////////////////////////////////////////
				
				if (azimuth_spin > 2 * Math.PI)
				{
					azimuth_spin = azimuth_spin - 2 * Math.PI;
				}
				
				//mesh_spin_arrow.rotation.y = azimuth_device + Math.PI/2 + Math.PI;
				//mesh_spin_arrow.rotation.z = polar_device + Math.PI/2 + Math.PI;
				
				mesh_spin_arrow.rotation.y = azimuth_spin + Math.PI/2;
				mesh_spin_arrow.rotation.z = polar_spin + Math.PI/2;
			}		
		}
		controller.azimuth_spin = azimuth_spin / DEGREE;
		controller.polar_spin = polar_spin / DEGREE;
	/*	
		// выводим значение вероятности
		var p1_text = roundNumber(prb, 0);
		ctx_hud_2.font = '10px "Times New Roman"';
		ctx_hud_2.fillText(p1_text, 10, 110);
	*/
		gui.updateDisplay();
	}
	var spin_teta = polar_spin;
	var spin_fi = azimuth_spin;
	var spin_x = Math.sin(spin_teta) * Math.cos(spin_fi);
	var spin_y = Math.sin(spin_teta) * Math.sin(spin_fi);
	var spin_z = Math.cos(spin_teta);	
	var spin_r = Math.sqrt(Math.pow(spin_x, 2) + Math.pow(spin_y, 2) + Math.pow(spin_z, 2));
	console.log("spin r = ", spin_r);
	
	var device_teta = polar_device;
	var device_fi = azimuth_device;
	var device_x = Math.sin(device_teta) * Math.cos(device_fi);
	var device_y = Math.sin(device_teta) * Math.sin(device_fi);
	var device_z = Math.cos(device_teta);
	var device_r = Math.sqrt(Math.pow(device_x, 2) + Math.pow(device_y, 2) + Math.pow(device_z, 2));
	console.log("device r = ", device_r);
	
	// Cosinus угла между осью прибора и направлением спина 
	var cos_alpha = spin_x * device_x + spin_y * device_y + spin_z * device_z;
	// Угол между осью прибора и направлением спина 
	var alpha = Math.acos(cos_alpha);
	console.log("alpha = ", alpha);
	
	var elem2 = document.getElementById('hud_2');
	ctx_hud_2.clearRect(0, 0, elem2.width, elem2.height);
	
	// Выводим значение угла между осью прибора и направлением спина
	ctx_hud_2.font = '12px "Times New Roman"';
	ctx_hud_2.fillStyle = "#550055";	
	ctx_hud_2.fillText("Input Angles", 70, 90);
	var text1 = "Angle between spin and device";
	ctx_hud_2.fillText(text1, 30, 150);	
	
	text1 = roundNumber(alpha/DEGREE, 0) + "°";
	ctx_hud_2.font = '14px "Times New Roman"';
	ctx_hud_2.fillStyle = "#0000ff";
	ctx_hud_2.fillText(text1, 90, 170);
	
	// Выводим значение косинуса угла между осью прибора и направлением спина
	var text2 = "Сos angle between spin and device";
	ctx_hud_2.font = '12px "Times New Roman"';
	ctx_hud_2.fillStyle = "#550055";
	ctx_hud_2.fillText(text2, 20, 185);	
	
	text2 = probab + roundNumber(cos_alpha, 3);
	ctx_hud_2.font = '14px "Times New Roman"';
	ctx_hud_2.fillStyle = "#0000ff";
	ctx_hud_2.fillText(text2, 75, 205);
	
	// var alpha_2 = alpha/2;
	prb = (Math.cos(alpha/2) * Math.cos(alpha/2)) * 100;
	
	// Построение диаграммы
	add_chart(prb);
	
	////////////////////////////////////////////////////////////
	// Получить вверх или вниз направлен спин
	// Только для спина с вероятностью от 40% до 60%
	// запускаем генератор случайных чисел
	if ( (prb > 40) && (prb < 60) )
	{
		var ttt = getRandomInt(101);
		console.log(ttt);
		if (ttt > 50)
		{
			up_down = 1;
			console.log("up");
		}
		else
		{
			up_down = 0;
			console.log("down");
		}
	}
	
	// Углы которые мы ЗАДАЛИ выводим на canvas
	draw_angles();
	
	setTimeout(mesurement, 1000);
}	
	
function add_chart(num) 
{
	var elem2 = document.getElementById('hud_2');
	var w = elem2.width/2;
	var h = 300;

	// рисуем окружность
	ctx_hud_2.fillStyle = "#00ff00";//"#ddd";
	ctx_hud_2.strokeStyle = "#ddd";
	ctx_hud_2.beginPath();
	ctx_hud_2.arc(w, h, 86, 0,Math.PI*2,true);
	ctx_hud_2.closePath();
	ctx_hud_2.fill();

	// рисуем сектор окружности num%
	ctx_hud_2.fillStyle = "#5555ff";//"#ffb549";
	ctx_hud_2.beginPath();
	ctx_hud_2.moveTo(w, h);

	//координаты старта определяем так чтоб закрашенная область всегда была снизу
	var start = (Math.PI/180)*90 - ((Math.PI/180) * (100 - num) * 360/100)/2; 
	ctx_hud_2.arc(w, h, 86, start, start + (Math.PI/180)*(100 - num)*360/100, false);
	ctx_hud_2.closePath();
	ctx_hud_2.fill();

	// закрашиваем внутреннюю окружность меньшего радиуса
	ctx_hud_2.fillStyle = "#F8F8F8";
	ctx_hud_2.beginPath();
	ctx_hud_2.arc(w, h, 54, 0, Math.PI*2, true);
	ctx_hud_2.closePath();
	ctx_hud_2.fill();

	// пишем текст
	ctx_hud_2.fillStyle = "#00aa00";
	ctx_hud_2.font = '18px "Times New Roman"';
	var x = w - 40;
	var y = h - 15;
	var num1 = roundNumber(num, 1);
	var num2 = roundNumber(100 - num, 1);
	
	var s1 = "(+1)  " + num1;
	ctx_hud_2.fillText(s1 + "%", x, y);
	
	y = y + 30;
	ctx_hud_2.fillStyle = "#0000ff";
	
	var s2 = "(-1)  " + num2;
	ctx_hud_2.fillText(s2 + "%", x, y);
}

function draw_angles() 
{
	var text_polar_spin = roundNumber(polar_spin/DEGREE, 0) + "°";
	text_polar_spin = "Spin θ = " + text_polar_spin; 
	
	var text_azimuth_spin = roundNumber(azimuth_spin/DEGREE, 0) + "°";
	text_azimuth_spin = "Spin φ = " + text_azimuth_spin;
	
	var text_polar_device = roundNumber(polar_device/DEGREE, 0) + "°";
	text_polar_device = "Device θ = " + text_polar_device;
	
	var text_azimuth_device = roundNumber(azimuth_device/DEGREE, 0) + "°";
	text_azimuth_device = "Device φ = " + text_azimuth_device;
	
	ctx_hud_2.font = '12px "Times New Roman"';
	
	ctx_hud_2.fillStyle = "#550055";	
	ctx_hud_2.fillText("Input Angles", 70, 90);
	
	ctx_hud_2.fillStyle = "#0000ff";
	ctx_hud_2.fillText(text_polar_spin, 10, 110);
	ctx_hud_2.fillText(text_azimuth_spin, 10, 130);
	
	ctx_hud_2.fillStyle = "#000055";
	ctx_hud_2.fillText(text_polar_device, 140, 110);
	ctx_hud_2.fillText(text_azimuth_device, 140, 130);	
}
	
function roundNumber(num, places) 
{
	return ( Math.round(num * Math.pow(10, places)) / Math.pow(10, places) );
}	
	
function getRandomInt(max) 
{
  return Math.floor(Math.random() * max);
}

function render() 
{
	orbitControl.enabled = true;
	renderer.render(scene, camera);		
	requestAnimationFrame(render);
}

window.onload = init;
