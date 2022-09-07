// text.js
function spinor_text()
{
	// Сферы
	// sp_num1 & sp_num2
	var spGeometry = new THREE.SphereGeometry(0.4, 32, 12);
	var spMaterial_1 = new THREE.MeshPhongMaterial({color: 0x0000ff, opacity: 0.5, transparent: false });
	spMaterial_1.side = THREE.FrontSide;
	spMaterial_1.shading = THREE.FlatShading;
	var spMaterial_2 = new THREE.MeshPhongMaterial({color: 0xff00ff, opacity: 0.5, transparent: false });
	spMaterial_2.side = THREE.FrontSide;
	spMaterial_2.shading = THREE.FlatShading;	
	var spMaterial_3 = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.8, transparent: false });
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
	// 1>
	const meshText_1 = new THREE.Object3D();
	meshText_1.add(
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_1.children[0].visible = true; // делаем видимой

	generateGeometry( meshText_1, "|d>" ); // 〈  ‹ ›        > < ➝
	meshText_1.scale.set(0.2, 0.2, 0.05);	
	meshText_1.position.set(rs + 2, 0, 0);
	scene.add(meshText_1);	
	
	// -1>
	const meshText_2 = new THREE.Object3D();
	meshText_2.add(
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_2.children[0].visible = true; // делаем видимой

	generateGeometry( meshText_2, "-|d>" ); // 〈  ‹ ›        > < ➝
	meshText_2.scale.set(0.2, 0.2, 0.05);	
	meshText_2.position.set(-rs - 2, 0, 0);
	scene.add(meshText_2);
	
	// |u>
	const meshText_3 = new THREE.Object3D();
	meshText_3.add(
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_3.children[0].visible = true; // делаем видимой

	generateGeometry( meshText_3, "|u>" ); // 〈  ‹ ›        > < ➝
	meshText_3.scale.set(0.2, 0.2, 0.05);	
	meshText_3.position.set(0, rs + 2, 0);
	scene.add(meshText_3);
	
	// -|u>
	const meshText_4 = new THREE.Object3D();
	meshText_4.add(
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_4.children[0].visible = true; // делаем видимой

	generateGeometry( meshText_4, "-|u>" ); // 〈  ‹ ›        > < ➝
	meshText_4.scale.set(0.2, 0.2, 0.05);	
	meshText_4.position.set(0, -rs - 2, 0);
	scene.add(meshText_4);

	
	// |r> 
	const meshText_5 = new THREE.Object3D();
	meshText_5.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_5.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_5, "|r>" );
	meshText_5.scale.set(0.2, 0.2, 0.05);	
	meshText_5.position.set(0.707 * rs * 1.1,  0.707 * rs * 1.1, 0);
	scene.add(meshText_5);

	// -|r>
	const meshText_6 = new THREE.Object3D();
	meshText_6.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_6.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_6, "-|r>" );
	meshText_6.scale.set(0.2, 0.2, 0.05);	
	meshText_6.position.set(-0.707 * rs * 1.1,  -0.707 * rs * 1.1, 0);
	scene.add(meshText_6);	

	// |l>
	const meshText_7 = new THREE.Object3D();
	meshText_7.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_7.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_7, "|L>" );
	meshText_7.scale.set(0.2, 0.2, 0.05);	
	meshText_7.position.set(0.707 * rs * 1.1,  -0.707 * rs * 1.1, 0);
	scene.add(meshText_7);

	// -|l>
	const meshText_8 = new THREE.Object3D();
	meshText_8.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x000077, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_8.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_8, "-|L>" );
	meshText_8.scale.set(0.2, 0.2, 0.05);	
	meshText_8.position.set(-0.707 * rs * 1.1,  0.707 * rs * 1.1, 0);
	scene.add(meshText_8);	
	
	// -i
	const meshText_9 = new THREE.Object3D();
	meshText_9.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_9.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_9, "- i" );
	meshText_9.scale.set(0.2, 0.2, 0.05);	
	meshText_9.position.set(0, 0, rs * 1.1);
	scene.add(meshText_9);
	
	// +i
	const meshText_10 = new THREE.Object3D();
	meshText_10.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_10.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_10, "+ i" );
	meshText_10.scale.set(0.2, 0.2, 0.05);	
	meshText_10.position.set(0, 0, -rs * 1.1);
	scene.add(meshText_10);

	// |f>
	const meshText_11 = new THREE.Object3D();
	meshText_11.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_11.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_11, "|F>" );
	meshText_11.scale.set(0.2, 0.2, 0.05);	
	meshText_11.position.set(0, 0.707 * rs, -0.707 * rs * 1.1);
	scene.add(meshText_11);

	// |b>
	const meshText_12 = new THREE.Object3D();
	meshText_12.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_12.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_12, "|B>" );
	meshText_12.scale.set(0.2, 0.2, 0.05);	
	meshText_12.position.set(0, -0.707 * rs *1.1, -0.707 * rs * 1.1);
	scene.add(meshText_12);
	
	// -|f>
	const meshText_13 = new THREE.Object3D();
	meshText_13.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_13.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_13, "-|F>" );
	meshText_13.scale.set(0.2, 0.2, 0.05);	
	meshText_13.position.set(0, -0.707 * rs, 0.707 * rs * 1.1);
	scene.add(meshText_13);
	
	// -|b>
	const meshText_14 = new THREE.Object3D();
	meshText_14.add(
		// присоединяем к объекту meshText
		// модель "номера грани" с закрашенными гранями и делаем ее видимой
		new THREE.Mesh(
			new THREE.Geometry(),
			new THREE.MeshBasicMaterial({color: 0x0000aa, 
										 side: THREE.DoubleSide, 
										 shading: THREE.FlatShading})));
	meshText_14.children[0].visible = true; // делаем видимой
	
	generateGeometry( meshText_14, "-|B>" );
	meshText_14.scale.set(0.2, 0.2, 0.05);	
	meshText_14.position.set(0, 0.707 * rs *1.1, 0.707 * rs * 1.1);
	scene.add(meshText_14);
	
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

	
	// Circles
	const curve = new THREE.EllipseCurve(
		0,  0,            // ax, aY
		rs, rs,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false,            // aClockwise
		0                 // aRotation
	);
	const points_circle_OXZ = curve.getPoints( 50 );
	const geometry_circle_OXZ = new THREE.BufferGeometry().setFromPoints( points_circle_OXZ );

	const material_circle_OXZ = new THREE.LineBasicMaterial( { color : 0x000000 } );
	const circle_OXZ = new THREE.Line( geometry_circle_OXZ, material_circle_OXZ );	
	circle_OXZ.position.x = 0;
	circle_OXZ.position.y = 0;
	circle_OXZ.position.z = 0;
	
	circle_OXZ.rotation.x = Math.PI/2;	
	scene.add(circle_OXZ);




}