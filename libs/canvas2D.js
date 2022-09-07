//	canvas2D.js
	
var DEGREE = 0.01745329251994; // значение углового градуса
var M_PI = 3.14159265358979323846;	// значение числа пи

// *********************************************************************
// функции fx(val) и fy(val) используются для преобразования координат 
// в функциях приведенных далее (координаты WebGeometry - WG)
// в координаты холста (HTML5 canvas)
// значения SCALE, xC и yC задаются программистом
function fx(x)
{
	var res = x * SCALE + xC;
	return res;
}

function fy(y)
{
	var res = - y * SCALE + yC;
	return res;
}	

// *********************************************************************
//   Во всех функциях:
// width - толщина линии
// color - цвет линии или текста
//  R - красный цвет
//  G - зеленый цвет
//  B - синий цвет
//
//    В некоторых функциях:
//  Black - черный цвет
//  Gray - серый цвет
//  DarkOrchid - пурпурный цвет
//  Также цвет можно задавать явно. Например: "#A2BC89"

// *********************************************************************
// Функция отображает оси OX и OY на холсте 
// dx и dy - размеры осей по X и Y
function axes(ctx, dx, dy, width, color)	
{
	ctx.save();
	
	if (color == "R") // красный
		ctx.strokeStyle = '#f00'; 
	else if (color == "G") // зеленый
		ctx.strokeStyle = '#0f0';
	else if (color == "B") // синий
		ctx.strokeStyle = '#00f';	
	else if (color == "Brown") // коричневый
		ctx.strokeStyle = '#A52A2A';
	else if (color == "DarkOrchid") // фиолетовый (пурпурный ??)
		ctx.strokeStyle = '#9932CC';
	else if (color == "Gray") // серый
		ctx.strokeStyle = '#808080';
	else if (color == "Black") // черный
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color; // любой цвет из палитры в виде строки		
	
	ctx.lineWidth = width;
	ctx.beginPath();	
	ctx.moveTo(fx(-dx), fy(0));
	ctx.lineTo(fx(dx), fy(0));
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(fx(0), fy(-dy));
	ctx.lineTo(fx(0), fy(dy));
	ctx.stroke();
	ctx.restore();
}

// *********************************************************************
// Функция отображает сетку на холсте
// n_hor - количество делений сетки по горизонтали
// n_vert - количество делений сетки по вертикали
// d - шаг сетки
function grid(ctx, n_hor, n_vert, step, width, color)
{
	var i;
	var pt1, pt2;
	var x_text, y_text;
	
	// вертикальные линии
	for (i = - n_vert; i <= n_vert; i++)
	{
		pt1 = new Point3D(-i*step, -step*n_vert);
		pt2 = new Point3D(-i*step,  step*n_vert);
		line_segment(ctx, pt1, pt2, width, color);
		x_text = roundNumber(-i*step, 2);
		text1(ctx, x_text, new Point2D(pt1[0], 0), "center", "dn", color, "9px Courier New");
	}
	
	// горизонтальные линии
	for (i = - n_hor; i <= n_hor; i++)
	{
		pt1 = new Point3D(-step*n_hor, i*step);
		pt2 = new Point3D( step*n_hor, i*step);
		line_segment(ctx, pt1, pt2, width, color);
		y_text = roundNumber(i*step, 2);
		text1(ctx, y_text, new Point2D(0, pt1[1]), "lt", "mid", color, "9px Courier New");
	}
	
}

// *********************************************************************
// Отображение точки в виде квадрата
// point - координаты точки в формате Point2D (система координат WG)
// size - размер точки (квадрата) в пикселах
function rsp(ctx, point, size, color)
{
	ctx.save();
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';	
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = color;	
	ctx.fillRect( fx(point[0]) - size/2, fy(point[1]) - size/2, size, size);
	ctx.restore();
}	

// *********************************************************************
// Отображение точки в виде окружности
// point - координаты точки в формате Point2D (система координат WG)
// size - размер точки в пикселах
function csp(ctx, point, size, color)
{
	ctx.save();
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "W")
		ctx.fillStyle = '#fff';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = color;	

	ctx.beginPath();
	ctx.arc(fx(point[0]), fy(point[1]), size/2, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = '#000000';
	ctx.stroke();
	ctx.restore();
}		

// *********************************************************************
// Отображение текстовой строки.
// Координаты point задают положение текстовой строки str.
// Расстояние (смещение) задается при помощи параметров align и baseline.
// Это смещение совпадает со смещением текста в функции fillText HTML5 Canvas.
// В отличие от функций text1 и text2 в этой функции нет дополнительного
// смещения положения текста относительно положения point. 
// Параметр align может принимать значения "lt", "center", "rt".
// Параметр baseline может принимать значения "up", "mid", "dn".
function text(ctx, str, point, align, baseline, color, font)
{
	ctx.save();
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = '#000';	

	if (font == null)
	{	
		ctx.font = "12px Arial";
	}
	else
	{
		ctx.font = font;
	}
	
	if (baseline == "dn")
	{
		ctx.textBaseline = "top";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}				
	}
	else if (baseline == "up")
	{
		ctx.textBaseline = "bottom";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}					
	}
	else
	{
		ctx.textBaseline = "mid";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}
		else if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}				
	}
	ctx.restore();
	return;
}

// *********************************************************************
// Отображение текстовой строки.
// Координаты точки point задают положение текстовой строки str.
// Расстояние (смещение) задается при помощи параметров align и baseline.
// В отличие от функции text в данной функции text1 введено дополнительное
// смещение положения текста относительно положения задаваемого point.
// Параметр align может принимать значения "lt", "center", "rt".
// Параметр baseline может принимать значения "up", "mid", "dn".
function text1(ctx, str, point, align, baseline, color, font)
{
	ctx.save();
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = color;

	if (font == undefined)
	{	
		ctx.font = "12px Arial";
	}
	else
	{
		ctx.font = font;
	}
	
	if (baseline == "dn")
	{
		ctx.textBaseline = "top";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 3, fy(point[1]) + 2);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 5, fy(point[1]) + 2);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]) + 2);
			ctx.restore();
			return;
		}				
	}
	else if (baseline == "up")
	{
		ctx.textBaseline = "bottom";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 3, fy(point[1]) - 2);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 5, fy(point[1]) - 2);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]) - 2);
			ctx.restore();
			return;
		}					
	}
	else
	{
		ctx.textBaseline = "middle";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 3, fy(point[1]));
			ctx.restore();
			return;
		}
		else if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 5, fy(point[1]));
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}				
	}
	ctx.restore();
	return;
}		

// *********************************************************************
// Отображение текстовой строки.
// Координаты точки point задают положение текстовой строки str.
// Расстояние (смещение) задается при помощи параметров align и baseline.
// В отличие от функций text в данной функции text2 введено дополнительное
// смещение положения текста относительно положения задаваемого point.
// Однако величина этого смещения больше, чем величина смещения
// в функции text1.
// Параметр align может принимать значения "lt", "center", "rt".
// Параметр baseline может принимать значения "up", "mid", "dn".
function text2(ctx, str, point, align, baseline, color, font)
{
	ctx.save();
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else 
		ctx.fillStyle = color;		
	
	if (font == undefined)
	{	
		ctx.font = "12px Arial";
	}
	else
	{
		ctx.font = font;
	}
	
	if (baseline == "dn")
	{
		ctx.textBaseline = "top";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 5, fy(point[1]) + 5);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 8, fy(point[1]) + 5);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]) + 5);
			ctx.restore();
			return;
		}				
	}
	else if (baseline == "up")
	{
		ctx.textBaseline = "bottom";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 5, fy(point[1]) - 5);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 8, fy(point[1]) - 5);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]) - 5);
			ctx.restore();
			return;
		}					
	}
	else
	{
		ctx.textBaseline = "middle";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(point[0]) + 5, fy(point[1]));
			ctx.restore();
			return;
		}
		else if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(point[0]) - 8, fy(point[1]));
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(point[0]), fy(point[1]));
			ctx.restore();
			return;
		}				
	}
	ctx.restore();
	return;
}		

// *********************************************************************
// Форрмирование заданного числового представления.
// Используется для вывода чисел на экран.
function roundNumber(num, places) 
{
	var t =  Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
	return t;
}

// *********************************************************************
// Отображение прямой проходящей через точки pt1 и pt2.
// Отображение прямой начинается с точки имеющей значение координаты X равное x_begin
// и заканчивается в точке имеющей значение координаты X равное x_end.
function line_ext(ctx, pt1, pt2, x_begin, x_end, width, color)
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
	
	var k = (pt2[1] - pt1[1])/(pt2[0] - pt1[0]);
	var point1 = [x_begin, pt1[1] + k * (x_begin - pt1[0])];
	var point2 = [x_end,   pt1[1] + k * (x_end - pt1[0])];

	ctx.beginPath();
	ctx.moveTo( fx(point1[0]), fy(point1[1]) );
	ctx.lineTo( fx(point2[0]), fy(point2[1]) );	
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.restore();
}

// *********************************************************************
// Отображение прямой проходящей через точки pt1 и pt2.
// Прямая простирается дальше точек pt1 и pt2 в обе стороны.
// Параметр kf определяет величину протяженности прямой за точки pt1 и pt2.
function line_ext2(ctx, pt1, pt2, kf, width, color)
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

	kf = -kf;
	var x = (pt1[0] + kf * pt2[0]) / (1 + kf);
	var y = (pt1[1] + kf * pt2[1]) / (1 + kf);
	
	var point1 = [x, y];
	
	var x = (pt2[0] + kf * pt1[0]) / (1 + kf);
	var y = (pt2[1] + kf * pt1[1]) / (1 + kf);
	
	var point2 = [x, y];
	
	ctx.beginPath();
	ctx.moveTo( fx(point1[0]), fy(point1[1]) );
	ctx.lineTo( fx(point2[0]), fy(point2[1]) );		
	
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.restore();
}

// *********************************************************************
// Отображает прямую проходящую через точки pt1 и pt2
// Отображение прямой начинается с точки имеющей значение координаты X равное x_begin
// и заканчивается в точке имеющей значение координаты X равное x_end
//          ВНИМАНИЕ !!!
//  ДАННУЮ ФУНКЦИЮ line ИСПОЛЬЗОВАТЬ НЕ СЛЕДУЕТ 
//   !!! она работает не всегда правильно !!!
//    Следует использовать вместо нее функцию line_ext
//   Функция line оставлена только для совместимости со старыми программами !!!
function line(ctx, pt1, pt2, x_begin, x_end, width, color_line)
{
	ctx.save();
		
	if (color_line == "R")
		ctx.strokeStyle = '#f00';
	else if (color_line == "G")
		ctx.strokeStyle = '#0f0';
	else if (color_line == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color_line == "Brown") 
		ctx.strokeStyle = '#A52A2A';
	else if (color_line == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color_line == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color_line == "Black") 
		ctx.strokeStyle = '#000';	
	else
		ctx.strokeStyle = color_line;	
	
	var point1 = lnx(pt1, pt2, x_begin);
	var point2 = lnx(pt1, pt2, x_end);

	ctx.beginPath();
	ctx.moveTo( fx(point1[0]), fy(point1[1]) );
	ctx.lineTo( fx(point2[0]), fy(point2[1]) );	
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.restore();
}

// Используется только в функции line (!-имеет баг-!))
function lnx(pt1, pt2, x)
{
	var k = (pt2[1] - pt1[1])/(pt2[0] - pt1[0]);
	if (x > 0)
	{
		var pt = [pt1[0] + x, pt1[1] + k*x];
		return pt;
	}
	else
	{
		var pt = [pt1[0] + x, pt1[1] + k*x];
		return pt;				
	}
}

// *********************************************************************
// Вспомогательная функция для удлинения отрезка pt1 - pt2.
// Возвращает точку pt имеющую заданную координату x.
// Точка pt лежит на прямой проходящей через точки pt1 и pt2.
function lnx(pt1, pt2, x)
{
	var k = (pt2[1] - pt1[1])/(pt2[0] - pt1[0]);
	y = pt1[1] + k * (x - pt1[0]);
	var pt = [x, y];
	return pt;
}

// *********************************************************************
// Отображение отрезка прямой от точки pt1 до точки pt2 сплошной линией
function line_segment(ctx, pt1, pt2, width, color)
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
	ctx.moveTo(fx(pt1[0]), fy(pt1[1]));
	ctx.lineTo(fx(pt2[0]), fy(pt2[1]));
	ctx.closePath();
	ctx.lineWidth = width;
	ctx.stroke();
	
	ctx.restore();	
}

// *********************************************************************
// Отображение отрезка прямой от точки pt1 до точки pt2 пунктирной линией
function line_segment_dash(ctx, pt1, pt2, width, color)
{
	ctx.setLineDash([0, 0]);
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
	ctx.moveTo(fx(pt1[0]), fy(pt1[1]));
	ctx.lineTo(fx(pt2[0]), fy(pt2[1]));
	ctx.closePath();
	ctx.setLineDash([8, 16]);
	ctx.lineWidth = width;
	ctx.stroke();
	
	ctx.restore();	
}

// *********************************************************************
// Отображение треугольника (стрелки) в точке point 
// с углом наклона треугольника (стрелки) равным  величине ang и размером scale.
// Параметр scale просто определяет некоторый масштаб. При значении scale = 1.0
// треугольник (стрелка) не масштабируется по величине.
// Угол ang отсчитывается от оси OY по часовой стрелке, если 
//  direction = true или direction = undefined
//  и против часовой стрелки если direction = false
function arrow(ctx, point, ang, scale, color, direction) 
{
	ctx.save();
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "W")
		ctx.fillStyle = '#fff';		
	else
		ctx.fillStyle = color;		

	if (direction == true)
		ang = ang;
	else if (direction == false)
		ang = - ang;
	else if (direction == undefined)
		ang = ang;
	ctx.translate(fx(point[0]), fy(point[1]));
	ctx.scale(scale, scale);
	ctx.rotate(ang);
	ctx.beginPath();
	ctx.moveTo(-15, 50);
	ctx.lineTo(15, 50);
	ctx.lineTo(0, 0);
	ctx.lineTo(-15, 50);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}
																
// *********************************************************************
// Отображение отрезка прямой от точки pt1 до точки pt2 сплошной линией 
//  со стрелкой в точке pt2
function segment_arrow(ctx, pt1, pt2, width, scale, color)
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
	ctx.moveTo(fx(pt1[0]), fy(pt1[1]));
	ctx.lineTo(fx(pt2[0]), fy(pt2[1]));
	ctx.closePath();
	ctx.lineWidth = width;
	ctx.stroke();
	
	var ang = Math.atan2(pt1[0] - pt2[0], pt1[1] - pt2[1]);
	ang = ang + M_PI;
	//ctx.fillStyle = '#000';
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = color;	
	
	arr(ctx, pt2, ang, scale) ;
	
	ctx.restore();	
}

// *********************************************************************
// Отображение отрезка прямой от точки pt1 до точки pt2 сплошной линией
//  со стрелками в точках pt1 и pt2
function segment_two_arrow(ctx, pt1, pt2, width, scale, color)
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
	ctx.moveTo(fx(pt1[0]), fy(pt1[1]));
	ctx.lineTo(fx(pt2[0]), fy(pt2[1]));
	ctx.closePath();
	ctx.lineWidth = width;
	ctx.stroke();
	
	var ang1 = Math.atan2(pt1[0] - pt2[0], pt1[1] - pt2[1]);
	var ang2 = ang1 + M_PI;
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = '#000';	
	
	arr(ctx, pt1, ang1, scale) ;
	arr(ctx, pt2, ang2, scale) ;
	
	ctx.restore();	
}

// *********************************************************************
// Вспомогательная функция для отрисовки острия стрелки.
// ang - наклон острия стрелки
// scale - размер острия стрелки
function arr(ctx, point, ang, scale) 
{
	ctx.save();
	ctx.translate(fx(point[0]), fy(point[1]));
	ctx.scale(scale, scale);
	ctx.rotate(ang);
	ctx.beginPath();
	ctx.moveTo(-15, 50);
	ctx.lineTo(15, 50);
	ctx.lineTo(0, 0);
	ctx.lineTo(-15, 50);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

// *********************************************************************
// Отображает окружность с центром в точке point с радиусом radius 
function circle(ctx, point, radius, width, color)
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
	ctx.arc(fx(point[0]), fy(point[1]), radius * SCALE, 0, 2 * Math.PI, false);
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.restore();
}

// *********************************************************************
// Отображает эллипс с центром в точке с координатами (x, y) в системе WG
// a и b - размеры полуосей эллипса
function drawEllipse(ctx, x, y, a, b, width, color)
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
	ctx.translate(fx(x), fy(y));

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

// *********************************************************************
// Отображает отрезок дуги с радиусом заданным  
//  с учетом величины значения масштабирования SCALE
// point - точка задающая центр дуги
// ang_b - начальный угол дуги
// ang_e - конечный угол дуги
// вращение (отсчет углов) осуществляется против часовой стрелки
function draw_angle(ctx, point, ang_b, ang_e, radius, width, color)
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
	ctx.arc(fx(point[0]), fy(point[1]), radius*SCALE, -ang_b, -ang_e, true);
	ctx.lineWidth = width;
	ctx.stroke();
	
	ctx.restore();	
}

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
// Отображает отрезок дуги с радиусом заданным   
//  с учетом величины значения масштабирования SCALE.
// str - текст с названием дуги
// point -  точка задающая центр дуги
// ang_b - начальный угол дуги
// ang_e - конечный угол дуги
// вращение (отсет углов) осуществляется против часовой стрелки
function draw_angle_txt(ctx, point, ang_b, ang_e, radius, str, align, baseline, width, color, font)
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
	
	if (font == undefined)
	{	
		ctx.font = "12px Arial";
	}
	else
	{
		ctx.font = font;
	}

	ctx.beginPath();
	ctx.arc(fx(point[0]), fy(point[1]), radius*SCALE, -ang_b, -ang_e, true);
	ctx.lineWidth = width;
	ctx.stroke();
	
	//ang_b + (ang_e - ang_b)/2
	var p_mid = new Point2D(point[0] + radius * Math.cos(ang_b + (ang_e - ang_b)/2), point[1] + radius * Math.sin(ang_b + (ang_e - ang_b)/2));
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = color;	
	
	if (baseline == "dn")
	{
		ctx.textBaseline = "top";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(p_mid[0]) + 5, fy(p_mid[1]) + 5);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(p_mid[0]) - 8, fy(p_mid[1]) + 5);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(p_mid[0]), fy(p_mid[1]) + 5);
			ctx.restore();
			return;
		}				
	}
	else if (baseline == "up")
	{
		ctx.textBaseline = "bottom";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(p_mid[0]) + 5, fy(p_mid[1]) - 5);
			ctx.restore();
			return;
		}
		if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(p_mid[0]) - 8, fy(p_mid[1]) - 5);
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(p_mid[0]), fy(p_mid[1]) - 5);
			ctx.restore();
			return;
		}					
	}
	else
	{
		ctx.textBaseline = "middle";
		if (align == "rt")
		{
			ctx.textAlign = "start";
			ctx.fillText( str, fx(p_mid[0]) + 5, fy(p_mid[1]));
			ctx.restore();
			return;
		}
		else if (align == "lt")
		{
			ctx.textAlign = "end";
			ctx.fillText( str, fx(p_mid[0]) - 8, fy(p_mid[1]));
			ctx.restore();
			return;
		}
		else
		{
			ctx.textAlign = "center";
			ctx.fillText( str, fx(p_mid[0]), fy(p_mid[1]));
			ctx.restore();
			return;
		}				
	}
	
	ctx.restore();	
}
/*
// *********************************************************************
// Отображает отрезок дуги с радиусом заданным   
//  с учетом величины значения масштабирования SCALE.
// point -  точка задающая центр дуги
// ang_b - начальный угол дуги
// ang_e - конечный угол дуги
// вращение (отсет углов) осуществляется против часовой стрелки
function arc(ctx, point, radius, width, color_line, angle_begin, angle_end)
{
	ctx.save();

	if (color_line == "R")
		ctx.strokeStyle = '#f00';
	else if (color_line == "G")
		ctx.strokeStyle = '#0f0';
	else if (color_line == "B")
		ctx.strokeStyle = '#00f';		
	
	else if (color_line == "Brown") 
		ctx.strokeStyle = '#A52A2A';
	else if (color_line == "DarkOrchid") 
		ctx.strokeStyle = '#9932CC';
	else if (color_line == "Gray") 
		ctx.strokeStyle = '#808080';
	else if (color_line == "Black") 
		ctx.strokeStyle = '#000';	
	else if (color_line == "Maroon")
		ctx.strokeStyle = '#800000';
	else if (color_line == "Purple")
		ctx.strokeStyle = '#800080';
	else
		ctx.strokeStyle = '#000';	

	ctx.beginPath();
	var begin = angle_begin * DEGREE;
	var end = angle_end * DEGREE;
	ctx.arc(fx(point[0]), fy(point[1]), radius * SCALE, -begin, -end, true);
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.restore();
}
*/

// *********************************************************************
//  Отображает отрезок со стрелкой имеющий длину равную величине radius.
//  Отрезок начинается в точке point и располагается под углом ang к оси OX.
//  scale - задает размер стрелки на конце отрезка.
function radius_arrow(ctx, center, radius, ang, width, scale, color)
{
	ctx.save();
	
	var pt = new Point2D(center[0] + radius*Math.cos(ang), center[1] + radius*Math.sin(ang));
	
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
	ctx.moveTo(fx(center[0]), fy(center[1]));
	ctx.lineTo(fx(pt[0]), fy(pt[1]));
	ctx.closePath();
	ctx.lineWidth = width;
	ctx.stroke();
	
	var ang1 = Math.atan2(center[0] - pt[0], center[1] - pt[1]);
	ang1 = ang1 + M_PI;
	//ctx.fillStyle = '#000';
	
	if (color == "R")
		ctx.fillStyle = '#f00';
	else if (color == "G")
		ctx.fillStyle = '#0f0';
	else if (color == "B")
		ctx.fillStyle = '#00f';		
	else if (color == "Brown") 
		ctx.fillStyle = '#A52A2A';	
	else if (color == "DarkOrchid") 
		ctx.fillStyle = '#9932CC';
	else if (color == "Gray") 
		ctx.fillStyle = '#808080';
	else if (color == "Black") 
		ctx.fillStyle = '#000';	
	else
		ctx.fillStyle = '#000';	
	
	arr(ctx, pt, ang1, scale) ;
	
	ctx.restore();	
	
	return pt;
}

// *********************************************************************
// рисует контур проходящий через массив точек points пунктирными линиями
function draw_polygon_line_dash(ctx, points, width, color)
{
	ctx.setLineDash([0, 0]);
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
	
	var i;
	var n = points.length - 1;
	
	//ctx.setLineDash([4, 16]);
	ctx.setLineDash([12, 16]);
	
	ctx.beginPath();
	ctx.moveTo(fx(points[0][0]), fy(points[0][1]));
	for (i = 0; i < n; i++)
	{
		ctx.lineTo(fx(points[i][0]), fy(points[i][1]));
	}
	ctx.closePath();
	ctx.lineWidth = width;
	ctx.stroke();
	
	ctx.restore();	
}

// *********************************************************************
// Рисует контур проходящий через массив точек points
function draw_polygon_line(ctx, points, width, color, facet_color)
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
	
	var i;
	var n = points.length - 1;
	//ctx.setLineDash([0, 0]);
	ctx.beginPath();
	ctx.moveTo(fx(points[0][0]), fy(points[0][1]));
	for (i = 0; i < n; i++)
	{
		ctx.lineTo(fx(points[i][0]), fy(points[i][1]));
	}
	ctx.closePath();

	ctx.lineWidth = width;
	ctx.stroke();
	
	ctx.restore();	
}


// *********************************************************************
// Рисует закрашенный контур проходящий через массив точек points.
// Если width > 0, то рисуется окантовка полигона.
function draw_polygon(ctx, points, width, color, facet_color)
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
	
	var i;
	var n = points.length - 1;
	//ctx.setLineDash([0, 0]);
	ctx.beginPath();
	ctx.moveTo(fx(points[0][0]), fy(points[0][1]));
	for (i = 0; i < n; i++)
	{
		ctx.lineTo(fx(points[i][0]), fy(points[i][1]));
	}
	ctx.closePath();
	ctx.fillStyle = facet_color;
	ctx.fill();
	if (width > 0)
	{
		ctx.lineWidth = width;
		ctx.stroke();
	}
	
	ctx.restore();	
}


// *********************************************************************
// Отображение закрашенного многоугольника имеющего n вершин в массиве points.
// Эта функция подобна функции draw_polygon, но без закраски контура.
function fill_polygon(ctx, points, n, color)
{
	// закраска области внутри рундиста
	
	ctx.save();
	
	ctx.beginPath();
	ctx.moveTo(fx(points[0][0]), fy(points[0][1]));
	for (i = 0; i < (n - 1); i++)
	{
		ctx.lineTo(fx(points[i][0]), fy(points[i][1]));
	}
	ctx.closePath();
	ctx.lineWidth = 0.1;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.fill();
	ctx.stroke();
	
	ctx.restore();
}
