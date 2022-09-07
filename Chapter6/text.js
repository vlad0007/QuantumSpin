// text.js
function spinor_text()
{
	// Сферы
	// sp_num1 & sp_num2
	var spGeometry = new THREE.SphereGeometry(0.4, 32, 12);
	var spMaterial_1 = new THREE.MeshPhongMaterial({color: 0x0000ff, opacity: 0.5, transparent: false });
	spMaterial_1.side = THREE.FrontSide;
	spMaterial_1.shading = THREE.FlatShading;
	var spMaterial_2 = new THREE.MeshPhongMaterial({color: 0x0000ff, opacity: 0.5, transparent: false });
	spMaterial_2.side = THREE.FrontSide;
	spMaterial_2.shading = THREE.FlatShading;	
	var spMaterial_3 = new THREE.MeshBasicMaterial({color: 0x0000ff, opacity: 0.8, transparent: false });
	spMaterial_3.side = THREE.FrontSide;
	spMaterial_3.shading = THREE.FlatShading;
	
	var sp_num1 = new THREE.Mesh(spGeometry, spMaterial_1);
	var sp_num2 = new THREE.Mesh(spGeometry, spMaterial_1);
	var sp_num3 = new THREE.Mesh(spGeometry, spMaterial_1);
	var sp_num4 = new THREE.Mesh(spGeometry, spMaterial_1);
	var sp_num5 = new THREE.Mesh(spGeometry, spMaterial_1);
	var sp_num6 = new THREE.Mesh(spGeometry, spMaterial_1);	
	var sp_num7 = new THREE.Mesh(spGeometry, spMaterial_1);
	var sp_num8 = new THREE.Mesh(spGeometry, spMaterial_1);
	
	sp_num1.position.set( rs,  0,   0); //  1>
	sp_num2.position.set(-rs,  0,   0); // -1>
	sp_num3.position.set( 0,  rs,   0); //  0>
	sp_num4.position.set( 0, -rs,   0); // -0>	
	sp_num5.position.set( 0.707 * rs,  0.707 * rs, 0); // +>
	sp_num6.position.set(-0.707 * rs, -0.707 * rs, 0); // ->
	sp_num7.position.set( 0.707 * rs, -0.707 * rs, 0); //  ->
	sp_num8.position.set(-0.707 * rs,  0.707 * rs, 0); // -->

	var sp_num9 =  new THREE.Mesh(spGeometry, spMaterial_3);
	var sp_num10 = new THREE.Mesh(spGeometry, spMaterial_3);
	var sp_num11 =  new THREE.Mesh(spGeometry, spMaterial_3);
	var sp_num12 = new THREE.Mesh(spGeometry, spMaterial_3);
	var sp_num13 =  new THREE.Mesh(spGeometry, spMaterial_3);
	var sp_num14 = new THREE.Mesh(spGeometry, spMaterial_3);
	sp_num9.position.set( 0,  0.707 * rs,  0.707 * rs); //  1>
	sp_num10.position.set(0, -0.707 * rs, -0.707 * rs); // -1>
	sp_num11.position.set(0, -0.707 * rs,  0.707 * rs); //  1>
	sp_num12.position.set(0, 0.707 * rs,  -0.707 * rs); // -1>
	sp_num13.position.set(0,  0,  rs); //  1>
	sp_num14.position.set(0,  0,  -rs); // -1>
	
	
	scene.add(sp_num1);
	scene.add(sp_num2);
	scene.add(sp_num3);
	scene.add(sp_num4);
	scene.add(sp_num5);
	scene.add(sp_num6);
	scene.add(sp_num7);
	scene.add(sp_num8);
	scene.add(sp_num9);
	scene.add(sp_num10);
	scene.add(sp_num11);
	scene.add(sp_num12);
	scene.add(sp_num13);
	scene.add(sp_num14);
	
	// Текст

	/////////////////////////////////////////////////////
	// |0>
	/////////////////////////////////////////////////////
	const meshText_Spin_up = new THREE.Object3D();
	meshText_Spin_up.add(
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_Spin_up.children[0].visible = true; // делаем видимой

	generateGeometry( meshText_Spin_up, "|0>" ); // 〈  ‹ ›        > < ➝
	meshText_Spin_up.scale.set(0.2, 0.2, 0.05);
		meshText_Spin_up.rotation.y = 2 * Math.PI / 3;
	meshText_Spin_up.position.set(1, rs + 2, 0);
	scene.add(meshText_Spin_up);
	
	///////////////////////////////////////////
	// |1>
	///////////////////////////////////////////
	const meshText_Spin_down = new THREE.Object3D();
	meshText_Spin_down.add(
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_Spin_down.children[0].visible = true; // делаем видимой

	generateGeometry( meshText_Spin_down, "|1>" ); // 〈  ‹ ›        > < ➝
	meshText_Spin_down.scale.set(0.2, 0.2, 0.05);	
		meshText_Spin_down.rotation.y = 2 * Math.PI / 3;
	meshText_Spin_down.position.set(1, -rs - 2, 0);
	scene.add(meshText_Spin_down);

	
	///////////////////////////////////////////
	// -i
	///////////////////////////////////////////
	const meshText_minus_i = new THREE.Object3D();
	meshText_minus_i.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_minus_i.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_minus_i, "- i" );
	meshText_minus_i.scale.set(0.2, 0.2, 0.05);	
	meshText_minus_i.rotation.y = Math.PI / 2;
	meshText_minus_i.position.set(0, 1, rs * 1.1);
	scene.add(meshText_minus_i);
	
	////////////////////////////////////////////////
	// +i
	////////////////////////////////////////////////
	const meshText_plus_i = new THREE.Object3D();
	meshText_plus_i.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_plus_i.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_plus_i, "+ i" );
	meshText_plus_i.scale.set(0.2, 0.2, 0.05);	
	meshText_plus_i.rotation.y = Math.PI / 2;
	meshText_plus_i.position.set(0, 1, -rs * 1.1);
	scene.add(meshText_plus_i);

	///////////////////////////////////////////
	// -1
	///////////////////////////////////////////
	const meshText_minus = new THREE.Object3D();
	meshText_minus.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_minus.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_minus, "- 1" );
	meshText_minus.scale.set(0.2, 0.2, 0.05);	
	meshText_minus.position.set(-rs * 1.1, 1, 0);
	meshText_minus.rotation.y = Math.PI / 2;
	scene.add(meshText_minus);
	
	////////////////////////////////////////////////
	// +1
	////////////////////////////////////////////////
	const meshText_plus = new THREE.Object3D();
	meshText_plus.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_plus.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_plus, "+ 1" );
	meshText_plus.scale.set(0.2, 0.2, 0.05);	
	meshText_plus.position.set(rs * 1.1, 1, 0);
	meshText_plus.rotation.y = Math.PI / 2;
	scene.add(meshText_plus);

	
	// Прямые
	const material_line_5_6 = new THREE.LineBasicMaterial( { color: 0x000000 } );
	points = [];
	points.push( new THREE.Vector3(rs * 0.707, -rs * 0.707, 0 ) );
	points.push( new THREE.Vector3( -rs * 0.707,  rs * 0.707, 0 ) );
	const geometry_line_5_6 = new THREE.BufferGeometry().setFromPoints( points );
	const line_5_6 = new THREE.Line(geometry_line_5_6, material_line_5_6);
	scene.add(line_5_6);
	
	const material_line_7_8 = new THREE.LineBasicMaterial( { color: 0x000000 } );
	points = [];
	points.push( new THREE.Vector3(-rs * 0.707, -rs * 0.707, 0 ) );
	points.push( new THREE.Vector3( rs * 0.707,  rs * 0.707, 0 ) );
	const geometry_line_7_8 = new THREE.BufferGeometry().setFromPoints( points );
	const line_7_8 = new THREE.Line(geometry_line_7_8, material_line_7_8);
	scene.add(line_7_8);
	
	const material_line_9_10 = new THREE.LineBasicMaterial( { color: 0x000000 } );
	points = [];
	points.push( new THREE.Vector3(  0,  0.707 * rs,  0.707 * rs ) );
	points.push( new THREE.Vector3(  0,  -0.707 * rs,  -0.707 * rs ) );
	const geometry_line_9_10 = new THREE.BufferGeometry().setFromPoints( points );
	const line_9_10 = new THREE.Line(geometry_line_9_10, material_line_7_8);
	scene.add(line_9_10);


	// Наименование осей координат
	var axis_length = 20;
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
	var x = axis_length;
	var y = 0; 
	var z = 0;
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
	var x = 0;
	var y = 0; 
	var z = -axis_length;
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
	var y = axis_length;
	var z = 0;
	meshText_Z.position.set(x, y, z);

	scene.add(meshText_X); 
	scene.add(meshText_Y); 
	scene.add(meshText_Z);
}