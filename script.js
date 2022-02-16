var array_bubblesort = document.getElementById("array_bubblesort");
var array_tysort = document.getElementById("array_tysort");
var tysort_groups = document.getElementById("tysort_groups");
var array_tysort_grup1 = document.getElementById("array_tysort_grup1");
var array_tysort_grup2 = document.getElementById("array_tysort_grup2");
var array_tysort_sonuc = document.getElementById("array_tysort_sonuc");

var gecensure_bubblesort_container = document.getElementById("gecensure_bubblesort_container");
var buttonStart = document.getElementById("buttonStart");

var bubblesort_start = null;
var bubblesort_end = null;

var tysort_start = null;
var tysort_end = null;


function swap(container, el1, el2) {
	return new Promise((resolve) => {
		var temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;

		window.requestAnimationFrame(function() {

			setTimeout(() => {
				container.insertBefore(el2, el1);
				resolve();
			}, 250);
		});
	});
}

function addBlock(value,k){
	var array_ele3 = document.createElement("div");
	array_ele3.classList.add("block3");
	
	var array_ele3_label = document.createElement("label");
	array_ele3_label.classList.add("block_id");
	array_ele3_label.innerText = value;

	array_ele3.style.height = `${value * 2}px`;
	array_ele3.style.transform = `translate(${k * 30}px)`;

	array_ele3.appendChild(array_ele3_label);
	array_tysort_sonuc.appendChild(array_ele3);		
}

function set_mode(mode) {
	var initialScreen = document.getElementById("initialScreen");
	var sortScreen = document.getElementById("sortScreen");

	switch(mode) {
		case 1:
			setElementVisibility(initialScreen, true);
			setElementVisibility(sortScreen, false);
			setElementVisibility(buttonStart, false);
		break;

		case 2:			
			setElementVisibility(sortScreen, true);
			setElementVisibility(initialScreen, false);
			
			setElementVisibility(buttonStart, false);
			setElementVisibility(tysort_groups, false);
			setElementVisibility(array_tysort_sonuc, false);
		break;
	}
}

function setElementVisibility(element, show) {
	if (show) {		
		element.classList.add("show-me");	
		element.classList.remove("hide-me");
	} else {
		element.classList.add("hide-me");
		element.classList.remove("show-me");
	}
}

function yuvarla(sayi) {
	return Math.round(sayi * 10)/10;
}

function gecenSurayiGetir(sortAdi) {
	var baslangic = new Date();
	var bitis = new Date();

	switch(sortAdi) {
		case 'bubblesort':
			baslangic = bubblesort_start;
			bitis = bubblesort_end;
			break;

		case 'tysort':
			baslangic = tysort_start;	
			bitis = tysort_end;
			break;
	}

	if (bitis == null) {
		bitis = new Date()
	}

	var gecenSure = (bitis.getTime() - baslangic.getTime()) / 1000;
	return gecenSure;
}

function gecenSureyiGuncelle(sortAdi) {
	var gecenSure = gecenSurayiGetir(sortAdi);
	var div = document.getElementById('gecensure_' + sortAdi);
	if (div) {
		div.innerHTML = yuvarla(gecenSure) + ' sn';
	}
}

function sonucGoster() {
	var gecenSure1 = gecenSurayiGetir('tysort');
	var gecenSure2 = gecenSurayiGetir('bubblesort');	
	var yuzdeKar = 100 - ((gecenSure1/gecenSure2)*100);
	var div = document.getElementById('sonuc');
	setElementVisibility(div, true)
	if (div) {
		div.innerHTML = `TY-SORT sıralamayı BubleSort'a göre %${yuvarla(yuzdeKar)} daha hızlı bir şekilde tamamladı!`;
	}
}

async function hastalari_kabul_et() {
	array_tysort_grup1.innerHTML = '';
	array_tysort_grup2.innerHTML = '';
	array_tysort_sonuc.innerHTML = '';

	setElementVisibility(gecensure_tysort_container, false);
	setElementVisibility(gecensure_bubblesort_container, false);
	setElementVisibility(buttonStart, false);

	var liste = hastalari_olustur();
	await Promise.all([
		hastalari_kabul_et_sortgrup(array_bubblesort, 'block', liste),
		hastalari_kabul_et_sortgrup(array_tysort, 'blockty', liste)
	]);

	setElementVisibility(buttonStart, true);
}

function hastalari_olustur() {
	var liste = [];
	for (var i = 0; i < 20; i++) {
		var eleman = 10 + Math.ceil(Math.random() * 80);
		liste.push(eleman);
	}
	return liste;
}

async function hastalari_kabul_et_sortgrup(container, className, liste, delay = 100) {
	set_mode(2);

	container.innerHTML = '';
	
	for (var i = 0; i < liste.length; i++) {
		var value = liste[i];

		var block = document.createElement("div");
		block.classList.add(className)
		
		var label = document.createElement("label");
		label.classList.add("block_id");
		label.innerText = value;

		var block_img = document.createElement("img");
		block_img.src='./images/patient.png';
		block_img.classList.add("block_img");
		block.appendChild(label);
		// block.appendChild(block_img);

		container.appendChild(block);
		
		block.style.height = `${value * 2}px`;
		block.style.transform = `translate(${i * 30}px)`;

		await new Promise((resolve) =>
			setTimeout(() => {
				resolve();
			}, delay)
		);
		
	}
}

async function bubbleSort(delay = 100) {
	bubblesort_start = new Date();

	var blocks = document.querySelectorAll(".block");
	for (var i = 0; i < blocks.length; i += 1) {
		for (var j = 0; j < blocks.length - i - 1; j += 1) {

			blocks[j].style.backgroundColor = "#FF4949";
			blocks[j + 1].style.backgroundColor = "#FF4949";

			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			var value1 = Number(blocks[j].childNodes[0].innerHTML);
			var value2 = Number(blocks[j + 1]
						.childNodes[0].innerHTML);

			if (value1 > value2) {
				await swap(array_bubblesort, blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block");
			}

			blocks[j].style.backgroundColor = "#ffffff";
			blocks[j + 1].style.backgroundColor = "#ffffff";
		}

		blocks[blocks.length - i - 1]
				.style.backgroundColor = "#13CE66";
	}

	bubblesort_end = new Date();
}

function tysort_gruplara_ayir(){
	var blocks = document.querySelectorAll(".blockty");
	for (var i = 0; i < 20; i++) {
		var array_ele1 = document.createElement("div");
		var array_ele2 = document.createElement("div");
		
		array_ele1.classList.add("block1");
		array_ele2.classList.add("block2");
		
		var value = Number(blocks[i].childNodes[0].innerHTML);
		
		if(i<10){		
		array_ele1.style.height = `${value * 2}px`;
		array_ele1.style.transform = `translate(${i * 30}px)`;
		
		var array_ele1_label = document.createElement("label");
		array_ele1_label.classList.add("block_id");
		array_ele1_label.innerText = value;
		
		array_ele1.appendChild(array_ele1_label);
		array_tysort_grup1.appendChild(array_ele1);		 		
		}

		if(i>=10){	
			array_ele2.style.height = `${value * 2}px`;
			array_ele2.style.transform = `translate(${(i-10) * 30}px)`;
			
			var array_ele2_label = document.createElement("label");
			array_ele2_label.classList.add("block_id");
			array_ele2_label.innerText = value;
			
			array_ele2.appendChild(array_ele2_label);
			array_tysort_grup2.appendChild(array_ele2);
		}
	}	
}

async function tysort_group1_sirala(delay = 100) {
	var blocks = document.querySelectorAll(".block1");

	for (var i = 0; i < blocks.length; i += 1) {
		for (var j = 0; j < blocks.length - i - 1; j += 1) {

			blocks[j].style.backgroundColor = "#FF4949";
			blocks[j + 1].style.backgroundColor = "#FF4949";

			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			var value1 = Number(blocks[j].childNodes[0].innerHTML);
			var value2 = Number(blocks[j + 1]
						.childNodes[0].innerHTML);

			if (value1 > value2) {
				await swap(array_tysort_grup1, blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block1");
			}

			blocks[j].style.backgroundColor = "#ffffff";
			blocks[j + 1].style.backgroundColor = "#ffffff";
		}

		blocks[blocks.length - i - 1]
				.style.backgroundColor = "yellow";
	}
}

async function tysort_group2_sirala(delay = 100) {
	var blocks = document.querySelectorAll(".block2");

	for (var i = 0; i < blocks.length; i += 1) {
		for (var j = 0; j < blocks.length - i - 1; j += 1) {

			blocks[j].style.backgroundColor = "#FF4949";
			blocks[j + 1].style.backgroundColor = "#FF4949";

			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			var value1 = Number(blocks[j].childNodes[0].innerHTML);
			var value2 = Number(blocks[j + 1]
						.childNodes[0].innerHTML);

			if (value1 > value2) {
				await swap(array_tysort_grup2, blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block2");
			}

			blocks[j].style.backgroundColor = "#ffffff";
			blocks[j + 1].style.backgroundColor = "#ffffff";
		}

		blocks[blocks.length - i - 1]
				.style.backgroundColor = "yellow";
	}
	
}

async function tysort_final_sort(){
	array_tysort_sonuc.innerHTML = '';
	var blocks1 = document.querySelectorAll(".block1");
	var blocks2 = document.querySelectorAll(".block2");
	
	var i=0;
	var j=0;
	var k=0;
	
	var bo,bon,bt,btn;
		
	var lastIdx=((blocks1.length + blocks2.length)/2);
	console.log(lastIdx);
	
	while(i+j<20){
		if(i<10) {
			bo=blocks1[i];			
		}else{
			bo=blocks2[lastIdx-1];			
		}
		
		if(j<10){ 
			bt=blocks2[j] ;			
		}else{
			bt=blocks1[lastIdx-1];			 
		}
		bon=Number(bo.childNodes[0].innerHTML);
		bo.style.backgroundColor = "#FF4949";
		
		btn=Number(bt.childNodes[0].innerHTML);
		bt.style.backgroundColor = "#FF4949";
		
		
		await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				},500)
			);	
		
		if(bon<btn){		
			addBlock(bon,k);
			i++;			
			bo.style.backgroundColor = "gray";			
		}else{	
			addBlock(btn,k);
			j++;	
			bt.style.backgroundColor = "gray";				
		}

		k++;
		await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				},200)
			);
	}
}

async function tysort() {
	tysort_start = new Date();
	setElementVisibility(array_tysort, false);
	setElementVisibility(tysort_groups, true);
	setElementVisibility(array_tysort_sonuc, false);

	await Promise.all([
		tysort_gruplara_ayir(),
		tysort_group1_sirala(),
		tysort_group2_sirala()
	]);

	setElementVisibility(array_tysort_sonuc, true);
	await tysort_final_sort();


	setElementVisibility(tysort_groups, false);

	tysort_end = new Date();
}

async function baslat(){
	set_mode(3);

	setElementVisibility(gecensure_tysort_container, true);
	setElementVisibility(gecensure_bubblesort_container, true);
	setElementVisibility(buttonStart, false);
		
	var timer = setInterval(() => {
		gecenSureyiGuncelle('bubblesort');
		gecenSureyiGuncelle('tysort');		
	}, 100);

	await Promise.all([
		bubbleSort(),
		tysort()
	]);

	clearInterval(timer);
	sonucGoster();
}

document.addEventListener("DOMContentLoaded", function() { 
	set_mode(1);
});