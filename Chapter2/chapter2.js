//rotate.js
var PI = Math.PI;
var DEGREE = 0.01745329251994; // величина углового градуса в радианах

var xC, yC, SCALE;

var elem; // ссылка на элемент canvas_draw
var ctx; // контекст рисования на холсте

var gui;
var controller;

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
		this.teta = teta / DEGREE;
    }();
	
	// Создаем новый объект dat.GUI с правой стороны от canvas.
	// В dat.GUI будут отображаться значения параметров модели, углы поворота модели и т.д.
	gui = new dat.GUI({ autoPlace: false });
	gui.domElement.id = 'gui';
	gui_container.appendChild(gui.domElement);
	
	var f1 = gui.addFolder('Angle θ (°)');
	f1.add( controller, 'teta', 0.0, 720 ).onChange( function() 
	{
		teta = (controller.teta)* DEGREE;
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
	ctx.clearRect(0, 0, 620, 400);	// 770 x 400 - размеры холста
	
	// Рисуем координатные оси черным цветом и толщиной 1 пиксель
	// с размером по осям (WG) равным 20 (и влево/вниз и вправо/вверх)
	axes(ctx, 20, 20, 1.0, "Black");
	

	///////////////////////////////////////////////

	// Левый заголовок
	var point = new Point2D(100, 375);
	text1(ctx, "Physical space", point, "rt", "up", "B", "bold 16px Courier New");
	point = new Point2D(40, 355);
	text1(ctx, '"Up" and "Down" 180° apart', point, "rt", "up", "B", "bold 16px Courier New");
	
	// Центр левой окружности
	var point_center = new Point2D(150, 230);
	csp(ctx, point_center, 6, "B");
	// Левая окружность
	point = new Point2D(150, 230);
	drawEllipse2(ctx, point, 100, 100, 1, "B");

	// Верхняя и нижняя точки на левой окружности
	point = new Point2D(150, 330);		
	csp(ctx, point, 6, "B");
	point = new Point2D(150, 130);		
	csp(ctx, point, 6, "B");

	// Обозначения "|🠕〉" и "|🠗〉"
	point = new Point2D(150, 335);
	text1(ctx, "Up", point, "mid", "up", "B", "bold 16px Courier New");
	
	point = new Point2D(150, 120);
	text1(ctx, "Down", point, "mid", "dn", "B", "bold 16px Courier New");
	
	// Рисуем углы на левой окружности
	var x = 100 * Math.sin(teta) + 150;
	var y = 100 * Math.cos(teta) + 230;
	point = new Point2D(x, y);
	csp(ctx, point, 5, "B");
	segment_arrow(ctx, point_center, point, 2, 0.4, "B")
	
	var temp_angle = 0;
	point = new Point2D(150, 230);
	if (teta < 2*PI)
	{
		// первый оборот
		draw_angle_2(ctx, point, PI/2, (-teta + PI/2), 100, 4, "B");
	}
	else
	{
		// второй оборот
		drawEllipse(ctx, 150, 230, 100, 100, 4, "B");
		temp_angle = teta - 2*PI;
		draw_angle_2(ctx, point, PI/2, (-temp_angle + PI/2), 105, 4, '#8800ff')
	}
	
	// Правый заголовок
	point = new Point2D(360, 375);
	text1(ctx, "Mathematical (spinor) space", point, "rt", "up", "R", "bold 16px Ariel");
	point = new Point2D(335, 355);
	text1(ctx, '"Up" and "Down" 90° apart', point, "rt", "up", "R", "bold 16px Courier New");
	
	// Центр правой окружности
	var point_center = new Point2D(450, 230);
	csp(ctx, point_center, 6, "R");
	// Правая окружность
	point = new Point2D(450, 230);
	drawEllipse2(ctx, point, 100, 100, 1, "R");
	
	// Обозначения "|🠕〉", "|🠗〉", "-|🠕〉" и "-|🠗〉"
	point = new Point2D(450, 335);
	text1(ctx, "Up", point, "mid", "up", "R", "bold 16px Courier New");
	
	point = new Point2D(550, 230);
	text1(ctx, "Down", point, "rt", "mid", "R", "bold 16px Courier New");	
	
	point = new Point2D(450, 120);
	text1(ctx, "-Up", point, "mid", "dn", "R", "bold 16px Courier New")
	
	point = new Point2D(350, 230);
	text1(ctx, "-Down", point, "lt", "mid", "R", "bold 16px Courier New");	
	
	// Точки на правой окружности
	point = new Point2D(450, 330);		
	csp(ctx, point, 6, "R");
	point = new Point2D(450, 130);		
	csp(ctx, point, 6, "R");
	
	point = new Point2D(550, 230);		
	csp(ctx, point, 6, "R");
	point = new Point2D(350, 230);		
	csp(ctx, point, 6, "R");
	
	// Рисуем углы на правой окружности
	x = 100 * Math.sin(teta/2) + 450;
	y = 100 * Math.cos(teta/2) + 230;
	point = new Point2D(x, y);
	csp(ctx, point, 5, "R");
	segment_arrow(ctx, point_center, point, 2, 0.4, "R");
	
	point = new Point2D(450, 230);
	draw_angle_2(ctx, point, +PI/2, -teta/2 + PI/2, 100, 4, "R");
	
	
	//////////////////////////////////////////////////////////////
	var text_ang_teta = roundNumber(teta/DEGREE, 0) + "°";
	text_ang_teta = "θ = " + text_ang_teta;
	point = new Point2D(100, 50);
	text1(ctx, text_ang_teta, point, "rt", "mid", "B", "italic bold 30px Courier New");
	
	text_ang_teta = roundNumber((teta/2)/DEGREE, 0) + "°";
	text_ang_teta = "θ/2 = " + text_ang_teta;
	point = new Point2D(370, 50);
	text1(ctx, text_ang_teta, point, "rt", "mid", "R", "italic bold 30px Courier New");

//	point = new Point2D(100, 10);
//	text1(ctx, "1/√2", point, "rt", "mid", "Black", "12px monospace");
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
