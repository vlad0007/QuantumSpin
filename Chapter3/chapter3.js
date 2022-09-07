//rotate.js
var PI = Math.PI;
var DEGREE = 0.01745329251994; // величина углового градуса в радианах

var xC, yC, SCALE;

var elem; // ссылка на элемент canvas_draw
var ctx; // контекст рисования на холсте

var gui;
var controller;

var theta_1 = 60*DEGREE;
var theta_2 = 70*DEGREE;

var teta = 0;

// SCALE задает ИСХОДНЫЙ масштаб при рисовании проекции модели на плоскость OXY,
// Представим, что значения координат модели в WebGeometry по X и Y
// находятся в пределах от -3.0 до + 3.0, а холст имеет размеры 770 x 400.
// Для приведения в соответствии значений в этих двух системах координат 
// используется коэффициент масштабирования SCALE. 
SCALE = 1;
// xC и yC задают координаты точки на на холсте в пикселах 
// имеющую координаты (0, 0) в системе координат WebGeometry
/*
xC = 23; // 23 пиксела вправо по холсту
yC = 400 - 15;	// 400 - 15  - пикселов вниз по холсту 
				// 400 - размер холста по вертикали в пикселах
*/
xC = 2;
yC = 400 - 2;

var x_coord = -1000; //   Значения координат (в единицах WebGeometry) 
var y_coord = -1000; //     положения курсора мыши на холсте.

// Mouse
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

var image_load = false;
var image_data;

function addHandler(object, event, handler) 
{
	// object — элемент к которому относится обработчик
	// event — событие, к которому относится обработчик
	// handler — функция обработчик
	if (object.addEventListener) 
	{
		object.addEventListener(event, handler, false);
	}
	else if (object.attachEvent) 
	{
		object.attachEvent('on' + event, handler);
	}
	else alert("Обработчик не поддерживается");
}

function rotate()
{
	elem = document.getElementById('canvas_draw'); // получаем ссылку на элемент canvas_draw 
	elem.style.position = "relative";
	elem.style.border = "1px solid";
	ctx = elem.getContext("2d"); // получаем 2D-контекст рисования на холсте
	
	ctx.font = "italic 10pt Arial";
	ctx.fillStyle = '#0000ff';	

	// Установка первоначальных значений в dat.GUI.
    controller = new function() 
	{
		this.theta_1 = theta_1 / DEGREE;
		this.theta_2 = theta_2 / DEGREE;
    }();
	
	// Создаем новый объект dat.GUI с правой стороны от canvas.
	// В dat.GUI будут отображаться значения параметров модели, углы поворота модели и т.д.
	gui = new dat.GUI({ autoPlace: false });
	gui.domElement.id = 'gui';
	gui_container.appendChild(gui.domElement);
	
	var f1 = gui.addFolder('Angles (°)');
	f1.add( controller, 'theta_1', 0.0, 720 ).onChange( function() 
	{
		theta_1 = (controller.theta_1)* DEGREE;
		draw();
	});
	
	f1.add( controller, 'theta_2', 0.0, 720 ).onChange( function() 
	{
		theta_2 = (controller.theta_2)* DEGREE;
		draw();
	});
	f1.open();
	//////////////////////////////////////////////////////////////////////						
	// Регистрация событий для мыши
	elem.onmousedown = handleMouseDown;
	document.onmouseup = handleMouseUp;
	elem.onmousemove = handleMouseMove;

	
	// Для обработки вращения колеса мыши используем функцию wheel
//		addHandler(window, 'DOMMouseScroll', wheel);
//		addHandler(window, 'mousewheel', wheel);
//		addHandler(document, 'mousewheel', wheel);	

	addHandler(elem, 'DOMMouseScroll', wheel);
	addHandler(elem, 'mousewheel', wheel);
	addHandler(elem, 'mousewheel', wheel);	

	draw();
}

function draw()
{
	// очистка канваса от ранее нанесенных на него линий, отрезков, текстов и т.п.
	ctx.clearRect(0, 0, 820, 500);	// 720 x 500 - размеры холста
	
	// Рисуем координатные оси черным цветом и толщиной 1 пиксель
	// с размером по осям (WG) равным 20 (и влево/вниз и вправо/вверх)
	axes(ctx, 20, 20, 1.0, "Black");
	
	var point;
	var r = 150; // радиус большой окружности
	
	// Центр левой окружности
	var point_center_left = new Point2D(200, 200);
	csp(ctx, point_center_left, 6, "B");
	// Левая окружность
	drawEllipse2(ctx, point_center_left, r, r, 2, "B");
	
	// Рисуем углы на левой окружности
	var x = r * Math.sin(theta_1/2) + point_center_left[0];
	var y = r * Math.cos(theta_1/2) + point_center_left[1];
	point = new Point2D(x, y);
	csp(ctx, point, 5, "B");
	segment_arrow(ctx, point_center_left, point, 2, 0.3, "G");
	draw_angle_2(ctx, point_center_left, +PI/2, -theta_1/2 + PI/2, r, 4, "G");
	
	// Два оборота на левой
	var temp_angle_left = 0;
	if (theta_1 < 2*PI)
	{
		// первый оборот
		draw_angle_2(ctx, point_center_left, PI/2, (-theta_1 + PI/2), 50, 1, "B");
	}
	else
	{
		// второй оборот
		drawEllipse2(ctx, point_center_left, 50, 50, 1, "B");
		temp_angle_left = theta_1 - 2*PI;
		draw_angle_2(ctx, point_center_left, PI/2, (-temp_angle_left + PI/2), 70, 1, "B")
	}

	// Левая маленькая окружность
	var r1 = 100;
	var x1 = Math.sin(theta_1) + point_center_left[0];
	var y1 = Math.cos(theta_1) + point_center_left[1];
	point = new Point2D(x1, y1);
	if (theta_1 < 2*PI)
	{
		var x1 = 50 * Math.sin(theta_1) + point_center_left[0];
		var y1 = 50 * Math.cos(theta_1) + point_center_left[1];
		point = new Point2D(x1, y1);
		segment_arrow(ctx, point_center_left, point, 1, 0.2, "B");
	}
	else
	{
		var x1 = 70  *Math.sin(theta_1) + point_center_left[0];
		var y1 = 70 * Math.cos(theta_1) + point_center_left[1];
		point = new Point2D(x1, y1);
		segment_arrow(ctx, point_center_left, point, 1, 0.2, "B");		
	}

	// Точки на левой окружности
	// |u〉 // !!
	point = new Point2D(point_center_left[0], point_center_left[1] + r);		
	csp(ctx, point, 8, "B");	
	text1(ctx, "|u〉", point, "rt", "up", "B", "bold 14px Courier New");
	text1(ctx, "1.0", point, "lt", "up", "B", "14px Ariel");
	
	// |r〉
	point = new Point2D(point_center_left[0] + r * 0.707, point_center_left[1] + r * 0.707);		
	csp(ctx, point, 8, "B");
	text1(ctx, "|r〉", point, "rt", "up", "B", "bold 14px Courier New");
	
	// |d〉
	point = new Point2D(point_center_left[0] + r, point_center_left[1]);		
	csp(ctx, point, 8, "B");
	text1(ctx, "|d〉", point, "rt", "up", "B", "bold 14px Courier New");
	text1(ctx, "1.0", point, "rt", "dn", "B", "14px Ariel");
	
	// |l〉
	point = new Point2D(point_center_left[0] + r * 0.707, point_center_left[1] - r * 0.707);		
	csp(ctx, point, 8, "B");
	text1(ctx, "|l〉", point, "rt", "mid", "B", "bold 14px Courier New");
	
	// -|u〉    // !!
	point = new Point2D(point_center_left[0], point_center_left[1] - r);		
	csp(ctx, point, 8, "B");	
	text1(ctx, "-|u〉", point, "rt", "dn", "B", "bold 14px Courier New");
	text1(ctx, "-1.0", point, "lt", "dn", "B", "14px Ariel");
	
	// -|r〉
	point = new Point2D(point_center_left[0] - r * 0.707, point_center_left[1] - r * 0.707);		
	csp(ctx, point, 8, "B");
	text1(ctx, "-|r〉", point, "lt", "dn", "B", "bold 14px Courier New");
	
	// -|d〉
	point = new Point2D(point_center_left[0] - r, point_center_left[1]);		
	csp(ctx, point, 8, "B");
	text1(ctx, "-|d〉", point, "lt", "up", "B", "bold 14px Courier New");
	text1(ctx, "-1.0", point, "lt", "dn", "B", "14px Ariel");
	
	// -|l〉
	point = new Point2D(point_center_left[0] - r * 0.707, point_center_left[1] + r * 0.707);		
	csp(ctx, point, 8, "B");
	text1(ctx, "-|l〉", point, "lt", "up", "B", "bold 14px Courier New");
	
	// Оси
	pt_b = new Point2D(point_center_left[0], point_center_left[1] + 1.1 * r);
	pt_e = new Point2D(point_center_left[0], point_center_left[1] - 1.1 * r);
	line_segment(ctx, pt_b, pt_e, 0.5, "Black");

	pt_b = new Point2D(point_center_left[0] - 1.1 * r, point_center_left[1]);
	pt_e = new Point2D(point_center_left[0] + 1.1 * r, point_center_left[1]);
	line_segment(ctx, pt_b, pt_e, 0.5, "Black");
	
	pt_b = new Point2D(point_center_left[0] - 1.05 * r * 0.707, point_center_left[1] - 1.05 * r * 0.707);
	pt_e = new Point2D(point_center_left[0] + 1.05 * r * 0.707, point_center_left[1] + 1.05 * r * 0.707);
	line_segment(ctx, pt_b, pt_e, 0.5, "Black");
	
	pt_b = new Point2D(point_center_left[0] - 1.05 * r * 0.707, point_center_left[1] + 1.05 * r * 0.707);
	pt_e = new Point2D(point_center_left[0] + 1.05 * r * 0.707, point_center_left[1] - 1.05 * r * 0.707);
	line_segment(ctx, pt_b, pt_e, 0.5, "Black");	
	
	// Проекции на оси
	pt_b = new Point2D(x, y);
	pt_e = new Point2D(x, 200);	
	line_segment(ctx, pt_b, pt_e, 0.5, "B");
	csp(ctx, pt_e, 8, "B");
	
	pt_b = new Point2D(x, y);
	pt_e = new Point2D(200, y);	
	line_segment(ctx, pt_b, pt_e, 0.5, "B");
	csp(ctx, pt_e, 8, "B");
	
	
	var a = Math.cos(theta_1/2);
	var b = Math.sin(theta_1/2);
	var point_left = new Point2D(10, 200);
	
	//////////////////////////////////////////////////////////////
	var a_left = roundNumber(a, 3);
	var b_left = roundNumber(b, 3);
	var text_a_left = "a = " + a_left;
	var text_b_left = "b = " + b_left;
	var point = new Point2D(230, -20);
	text1(ctx, text_a_left, point, "rt", "mid", "B", "italic bold 14px Courier New");
	point = new Point2D(230, -40);
	text1(ctx, text_b_left, point, "rt", "mid", "B", "italic bold 14px Courier New");
	
	
	var text_ang_teta = roundNumber(theta_1/DEGREE, 0) + "°";
	text_ang_teta = "θ = " + text_ang_teta;
	point = new Point2D(100, -20);
	text1(ctx, text_ang_teta, point, "rt", "mid", "B", "italic bold 14px Courier New");
	
	text_ang_teta = roundNumber((theta_1/2)/DEGREE, 0) + "°";
	text_ang_teta = "θ/2 = " + text_ang_teta;
	point = new Point2D(100, -40);
	text1(ctx, text_ang_teta, point, "rt", "mid", "B", "italic bold 14px Courier New");
	
	
	////////////////////////////////////////////////////////////////////////
	//                       RIGHT
	////////////////////////////////////////////////////////////////////////
	// Центр правой окружности
	var point_center_right = new Point2D(600, 200);
	csp(ctx, point_center_right, 6, "B");
	// Правая окружность
	drawEllipse2(ctx, point_center_right, r, r, 2, "B");
	
	// Рисуем углы на правой окружности
	var x = r * Math.sin(theta_2/2) + point_center_right[0];
	var y = r * Math.cos(theta_2/2) + point_center_right[1];
	point = new Point2D(x, y);
	csp(ctx, point, 5, "B");
	segment_arrow(ctx, point_center_right, point, 2, 0.3, "R");
	draw_angle_2(ctx, point_center_right, +PI/2, -theta_2/2 + PI/2, r, 4, "G");
	
	// Два оборота на правой
	var temp_angle_right = 0;
	if (theta_2 < 2*PI)
	{
		// первый оборот
		draw_angle_2(ctx, point_center_right, PI/2, (-theta_2 + PI/2), 50, 1, "B");
	}
	else
	{
		// второй оборот
		drawEllipse2(ctx, point_center_right, 50, 50, 1, "B");
		temp_angle_right = theta_2 - 2*PI;
		draw_angle_2(ctx, point_center_right, PI/2, (-temp_angle_right + PI/2), 70, 1, "B")
	}

	// Правая маленькая окружность
	var r1 = 100;
	var x1 = Math.sin(theta_2) + point_center_right[0];
	var y1 = Math.cos(theta_2) + point_center_right[1];
	point = new Point2D(x1, y1);
	if (theta_2 < 2*PI)
	{
		var x1 = 50 * Math.sin(theta_2) + point_center_right[0];
		var y1 = 50 * Math.cos(theta_2) + point_center_right[1];
		point = new Point2D(x1, y1);
		segment_arrow(ctx, point_center_right, point, 1, 0.2, "B");
	}
	else
	{
		var x1 = 70  *Math.sin(theta_2) + point_center_right[0];
		var y1 = 70 * Math.cos(theta_2) + point_center_right[1];
		point = new Point2D(x1, y1);
		segment_arrow(ctx, point_center_right, point, 1, 0.2, "B");		
	}

	// Точки на правой окружности
	// |u〉
	point = new Point2D(point_center_right[0], point_center_right[1] + r);		
	csp(ctx, point, 8, "B");	
	text1(ctx, "|u〉", point, "rt", "up", "B", "bold 14px Courier New");
	text1(ctx, "1.0", point, "lt", "up", "B", "bold 14px Courier New");
	
	// |f〉
	point = new Point2D(point_center_right[0] + r * 0.707, point_center_right[1] + r * 0.707);		
	csp(ctx, point, 8, "B");
	text1(ctx, "|f〉", point, "rt", "up", "B", "bold 14px Courier New");
	
	// |di〉
	point = new Point2D(point_center_right[0] + r, point_center_right[1]);		
	csp(ctx, point, 8, "B");
	text1(ctx, "|di〉", point, "rt", "up", "R", "bold 14px Courier New");
	text1(ctx, "+i", point, "rt", "dn", "R", "bold 16px Courier New");
	
	// |b〉
	point = new Point2D(point_center_right[0] + r * 0.707, point_center_right[1] - r * 0.707);		
	csp(ctx, point, 8, "B");
	text1(ctx, "|b〉", point, "rt", "mid", "B", "bold 14px Courier New");
	
	// -|u〉
	point = new Point2D(point_center_right[0], point_center_right[1] - r);		
	csp(ctx, point, 8, "B");	
	text1(ctx, "-|u〉", point, "rt", "dn", "B", "bold 14px Courier New");
	text1(ctx, "-1.0", point, "lt", "dn", "B", "14px Ariel");
	
	// -|f〉
	point = new Point2D(point_center_right[0] - r * 0.707, point_center_right[1] - r * 0.707);		
	csp(ctx, point, 8, "B");
	text1(ctx, "-|f〉", point, "lt", "dn", "B", "bold 14px Courier New");
	
	// -|u〉
	point = new Point2D(point_center_right[0] - r, point_center_right[1]);		
	csp(ctx, point, 8, "B");
	text1(ctx, "-|di〉", point, "lt", "up", "R", "bold 14px Courier New");
	text1(ctx, "-i", point, "lt", "dn", "R", "bold 16px Courier New");
	
	// -|b〉
	point = new Point2D(point_center_right[0] - r * 0.707, point_center_right[1] + r * 0.707);		
	csp(ctx, point, 8, "B");
	text1(ctx, "-|b〉", point, "lt", "up", "B", "bold 14px Courier New");
	
	// Оси
	pt_b = new Point2D(point_center_right[0], point_center_right[1] + 1.1 * r);
	pt_e = new Point2D(point_center_right[0], point_center_right[1] - 1.1 * r);
	line_segment(ctx, pt_b, pt_e, 0.5, "Black");

	pt_b = new Point2D(point_center_right[0] - 1.1 * r, point_center_right[1]);
	pt_e = new Point2D(point_center_right[0] + 1.1 * r, point_center_right[1]);
	line_segment(ctx, pt_b, pt_e, 0.5, "Black");
	
	pt_b = new Point2D(point_center_right[0] - 1.05 * r * 0.707, point_center_right[1] - 1.05 * r * 0.707);
	pt_e = new Point2D(point_center_right[0] + 1.05 * r * 0.707, point_center_right[1] + 1.05 * r * 0.707);
	line_segment(ctx, pt_b, pt_e, 0.5, "Black");
	
	pt_b = new Point2D(point_center_right[0] - 1.05 * r * 0.707, point_center_right[1] + 1.05 * r * 0.707);
	pt_e = new Point2D(point_center_right[0] + 1.05 * r * 0.707, point_center_right[1] - 1.05 * r * 0.707);
	line_segment(ctx, pt_b, pt_e, 0.5, "Black");	
	
	// Проекции на оси
	pt_b = new Point2D(x, y);
	pt_e = new Point2D(x, 200);	
	line_segment(ctx, pt_b, pt_e, 0.5, "B");
	csp(ctx, pt_e, 8, "R");
	
	pt_b = new Point2D(x, y);
	pt_e = new Point2D(600, y);	
	line_segment(ctx, pt_b, pt_e, 0.5, "R");
	csp(ctx, pt_e, 8, "B");
	
	
	a = Math.cos(theta_2/2);
	b = Math.sin(theta_2/2);
	
	var a_right = roundNumber(a, 3);
	var b_right = roundNumber(b, 3)+"i";
	var text_a_right = "a = " + a_right;
	var text_b_right = "b = " + b_right;
	point = new Point2D(650, -20);
	text1(ctx, text_a_right, point, "rt", "mid", "B", "italic bold 14px Courier New");
	point = new Point2D(650, -40);
	text1(ctx, text_b_right, point, "rt", "mid", "R", "italic bold 14px Courier New");
	

	var text_ang_teta = roundNumber(theta_2/DEGREE, 0) + "°";
	text_ang_teta = "θ = " + text_ang_teta;
	point = new Point2D(500, -20);
	text1(ctx, text_ang_teta, point, "rt", "mid", "B", "italic bold 14px Courier New");
	
	text_ang_teta = roundNumber((theta_2/2)/DEGREE, 0) + "°";
	text_ang_teta = "θ/2 = " + text_ang_teta;
	point = new Point2D(500, -40);
	text1(ctx, text_ang_teta, point, "rt", "mid", "B", "italic bold 14px Courier New");

	
}

document.addEventListener('keydown', function(event)
{
	var code = event.keyCode;
	
	//  Передвижение поля отображения по холсту
	if (code == 37) 
	{   // left - движение поля отображения на холсте влево
		xC = xC - 5; draw();
	}
	if (code == 38) 
	{   // up - движение поля отображения на холсте вверх     
		yC = yC - 5; draw();
	}
	if (code == 39) 
	{   // right - движение поля отображения на холсте вправо
	  xC = xC + 5; draw()
	}
	if (code == 40) 
	{   // down - движение поля отображения на холсте вниз
	  yC = yC + 5; draw();
	}
	
	// Изменение масштаба отображения на холсте
	if (code == 188) // <
	{
		SCALE = SCALE - 5; draw();
	}
	if (code == 190) // >
	{
		SCALE = SCALE + 5; draw();
	}
});

document.addEventListener('keyup', function(event) 
{
	var code = event.keyCode;
});
  
function handleMouseDown(event) 
{
	mouseDown = true;
	lastMouseX = event.clientX;
	lastMouseY = event.clientY;
}

function handleMouseUp(event) {
	mouseDown = false;
}	  
  
// При движении мыши происходит отображение координат WebGeometry 
// которые соответствуют курсору мыши (в правой верхней части холста).
function handleMouseMove(event) 
{
	if (mouseDown) 
	{
		// если клавиша мыши нажата то двигаем изображения на холсте
		var newX = event.clientX;
		var newY = event.clientY;
		
		var d = 7.0; 

		var deltaX = newX - lastMouseX;
		if (deltaX < 0)
		{
			xC = xC - d;
		}
		if (deltaX > 0)
		{
			xC = xC + d;
		}
		
		var deltaY = newY - lastMouseY;
		if (deltaY < 0)
		{
			yC = yC - d;
		}
		if (deltaY > 0)
		{
			yC = yC + d;
		}

		lastMouseX = newX
		lastMouseY = newY;
		draw();		
	}
	else
	{
		// если клавиша мыши НЕ нажата то выводим координаты (WG) точки 
		// на которой находится курсор мыши
		event.preventDefault();
		elem = document.getElementById('canvas_draw');
		coords = elem.getBoundingClientRect();	

		// координаты мыши 	
		var x_mouse, y_mouse;

		// координаты мыши на холсте (canvas_draw)
		x_mouse = event.clientX - coords.left;
		y_mouse = event.clientY - coords.top;	

		// приводим координаты мыши к WebGeometry (WG)
		x_coord = (x_mouse - xC)/SCALE;
		y_coord = (yC - y_mouse)/SCALE;

		draw();
	}
}

// При вращении колесика мыши меняется масштаб изображения на холсте
function wheel(event) 
{
	if (event.preventDefault) 
		event.preventDefault();
	event.returnValue = false;
	
	var delta; // значение поворота колёсика мыши
	event = event || window.event;
	// Opera и IE работают со свойством wheelDelta
	if (event.wheelDelta) 
	{ // В Opera и IE
		delta = event.wheelDelta / 10000;
		// В Опере значение wheelDelta такое же, но с противоположным знаком
		if (window.opera) 
			delta = -delta; // Дополнительно для Opera
	}
	else if (event.detail) 
	{ // Для Gecko
		delta = -event.detail / 3;
	}
	
	SCALE = SCALE + 5 * delta; // меняем масштаб
	draw(); // перерисовываем
}

function roundNumber(num, places) 
{
	return ( Math.round(num * Math.pow(10, places)) / Math.pow(10, places) );
}

// Этой функции нет в файле canvas2D.js
function draw_angle_2(ctx, point, ang_b, ang_e, radius, width, color)
{
	ctx.save();
	
	if (color == "R")
		ctx.strokeStyle = '#f00';
	else if (color == "G")
		ctx.strokeStyle = '#0f0';
	else if (color == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color == "Brown") 
		ctx.strokeStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color;

	ctx.beginPath();
	ctx.arc(fx(point[0]), fy(point[1]), radius*SCALE, -ang_b, -ang_e, false);
	ctx.lineWidth = width;
	ctx.stroke();
	
	ctx.restore();	
}

// *********************************************************************
// Отображает эллипс с центром в точке point
// a и b - размеры полуосей эллипса
function drawEllipse2(ctx, point, a, b, width, color)
{
	ctx.save();
	
	// Запоминаем положение системы координат (CК) и масштаб
	if (color == "R")
		ctx.strokeStyle = '#f00';
	else if (color == "G")
		ctx.strokeStyle = '#0f0';
	else if (color == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color == "Brown") 
		ctx.strokeStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color == "Black") 
		ctx.strokeStyle = '#000';	
	else if (color == "Maroon")
		ctx.strokeStyle = '#800000';
	else if (color == "Purple")
		ctx.strokeStyle = '#800080';
	else
		ctx.strokeStyle = color;	
	
	ctx.lineWidth = width;
	
	ctx.beginPath();

	// Переносим СК в центр будущего эллипса
	ctx.translate(fx(point[0]), fy(point[1]));

	/*
	* Масштабируем по х.
	* Теперь нарисованная окружность вытянется в a / b раз
	* и станет эллипсом
	*/

	ctx.scale(a / b, 1);

	// Рисуем окружность, которая благодаря масштабированию станет эллипсом
	ctx.arc(0, 0, b*SCALE, 0, Math.PI * 2, true);

	ctx.closePath();
	ctx.stroke();
	// Восстанавливаем СК и масштаб
	ctx.restore();
}			
