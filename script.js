var container = document.getElementById("array");
var containerty = document.getElementById("arrayty");
var container1 = document.getElementById("array1");
var container2 = document.getElementById("array2");
var container3 = document.getElementById("array3");


// Function to generate the array of blocks
function generatearray() {
	container.innerHTML = '';
	containerty.innerHTML = '';
	container1.innerHTML = '';
	container2.innerHTML = '';
	container3.innerHTML = '';
	for (var i = 0; i < 20; i++) {

		// Return a value from 1 to 100 (both inclusive)
		var value = Math.ceil(Math.random() * 100);

		// Creating element div
		var array_ele = document.createElement("div");
		var array_elety = document.createElement("div");
		

		// Adding class 'block' to div
		array_ele.classList.add("block");
		array_elety.classList.add("blockty");		
		
		
		// Creating label element for displaying
		// size of particular block
		var array_ele_label = document.createElement("label");
		array_ele_label.classList.add("block_id");
		array_ele_label.innerText = value;
		
		
		var array_elety_label = document.createElement("label");
		array_elety_label.classList.add("block_id");
		array_elety_label.innerText = value;
		
		// Appending created elements to index.html
		array_ele.appendChild(array_ele_label);
		container.appendChild(array_ele);
		
		array_elety.appendChild(array_elety_label);
		containerty.appendChild(array_elety);

		// Adding style to div
		array_ele.style.height = `${value * 3}px`;
		array_ele.style.transform = `translate(${i * 30}px)`;
		
		array_elety.style.height = `${value * 3}px`;
		array_elety.style.transform = `translate(${i * 30}px)`;	
		
	}
}

function divideArray(){
	var blocks = document.querySelectorAll(".blockty");
	for (var i = 0; i < 20; i++) {
		var array_ele1 = document.createElement("div");
		var array_ele2 = document.createElement("div");
		
		array_ele1.classList.add("block1");
		array_ele2.classList.add("block2");
		
		var value = Number(blocks[i].childNodes[0].innerHTML);
		
		if(i<10){		
		array_ele1.style.height = `${value * 3}px`;
		array_ele1.style.transform = `translate(${i * 30}px)`;
		
		var array_ele1_label = document.createElement("label");
		array_ele1_label.classList.add("block_id");
		array_ele1_label.innerText = value;
		
		array_ele1.appendChild(array_ele1_label);
		container1.appendChild(array_ele1);		 
		
		}
		if(i>=10){	
		array_ele2.style.height = `${value * 3}px`;
		array_ele2.style.transform = `translate(${(i-10) * 30}px)`;
		
		var array_ele2_label = document.createElement("label");
		array_ele2_label.classList.add("block_id");
		array_ele2_label.innerText = value;
		
		array_ele2.appendChild(array_ele2_label);
		container2.appendChild(array_ele2);
		}
	}
	
	
	
	
	
}

// Promise to swap two blocks
function swap(el1, el2) {
	return new Promise((resolve) => {

		// For exchanging styles of two blocks
		var temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;

		window.requestAnimationFrame(function() {

			// For waiting for .25 sec
			setTimeout(() => {
				container.insertBefore(el2, el1);
				resolve();
			}, 250);
		});
	});
}

function swap1(el1, el2) {
	return new Promise((resolve) => {

		// For exchanging styles of two blocks
		var temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;

		window.requestAnimationFrame(function() {

			// For waiting for .25 sec
			setTimeout(() => {
				container1.insertBefore(el2, el1);
				resolve();
			}, 250);
		});
	});
}

function swap2(el1, el2) {
	return new Promise((resolve) => {

		// For exchanging styles of two blocks
		var temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;

		window.requestAnimationFrame(function() {

			// For waiting for .25 sec
			setTimeout(() => {
				container2.insertBefore(el2, el1);
				resolve();
			}, 250);
		});
	});
}

// Asynchronous BubbleSort function
async function BubbleSort1(delay = 100) {
	var blocks = document.querySelectorAll(".block");

	// BubbleSort Algorithm
	for (var i = 0; i < blocks.length; i += 1) {
		for (var j = 0; j < blocks.length - i - 1; j += 1) {

			// To change background-color of the
			// blocks to be compared
			blocks[j].style.backgroundColor = "#FF4949";
			blocks[j + 1].style.backgroundColor = "#FF4949";

			// To wait for .1 sec
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			//console.log("run");
			var value1 = Number(blocks[j].childNodes[0].innerHTML);
			var value2 = Number(blocks[j + 1]
						.childNodes[0].innerHTML);

			// To compare value of two blocks
			if (value1 > value2) {
				await swap(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block");
			}

			// Changing the color to the previous one
			blocks[j].style.backgroundColor = "#6b5b95";
			blocks[j + 1].style.backgroundColor = "#6b5b95";
		}

		//changing the color of greatest element
		//found in the above traversal
		blocks[blocks.length - i - 1]
				.style.backgroundColor = "#13CE66";
	}
}

async function BubbleSort2(delay = 100) {
	var blocks = document.querySelectorAll(".block1");

	// BubbleSort Algorithm
	for (var i = 0; i < blocks.length; i += 1) {
		for (var j = 0; j < blocks.length - i - 1; j += 1) {

			// To change background-color of the
			// blocks to be compared
			blocks[j].style.backgroundColor = "#FF4949";
			blocks[j + 1].style.backgroundColor = "#FF4949";

			// To wait for .1 sec
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			//console.log("run");
			var value1 = Number(blocks[j].childNodes[0].innerHTML);
			var value2 = Number(blocks[j + 1]
						.childNodes[0].innerHTML);

			// To compare value of two blocks
			if (value1 > value2) {
				await swap1(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block1");
			}

			// Changing the color to the previous one
			blocks[j].style.backgroundColor = "#6b5b95";
			blocks[j + 1].style.backgroundColor = "#6b5b95";
		}

		//changing the color of greatest element
		//found in the above traversal
		blocks[blocks.length - i - 1]
				.style.backgroundColor = "yellow";
	}
}

async function BubbleSort3(delay = 100) {
	var blocks = document.querySelectorAll(".block2");

	// BubbleSort Algorithm
	for (var i = 0; i < blocks.length; i += 1) {
		for (var j = 0; j < blocks.length - i - 1; j += 1) {

			// To change background-color of the
			// blocks to be compared
			blocks[j].style.backgroundColor = "#FF4949";
			blocks[j + 1].style.backgroundColor = "#FF4949";

			// To wait for .1 sec
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			//console.log("run");
			var value1 = Number(blocks[j].childNodes[0].innerHTML);
			var value2 = Number(blocks[j + 1]
						.childNodes[0].innerHTML);

			// To compare value of two blocks
			if (value1 > value2) {
				await swap2(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block2");
			}

			// Changing the color to the previous one
			blocks[j].style.backgroundColor = "#6b5b95";
			blocks[j + 1].style.backgroundColor = "#6b5b95";
		}

		//changing the color of greatest element
		//found in the above traversal
		blocks[blocks.length - i - 1]
				.style.backgroundColor = "yellow";
	}
	
}

function addBlock(value,k){
		var array_ele3 = document.createElement("div");
		array_ele3.classList.add("block3");
		// Creating label element for displaying
		// size of particular block
		var array_ele3_label = document.createElement("label");
		array_ele3_label.classList.add("block_id");
		array_ele3_label.innerText = value;
		
		// Adding style to div 
		array_ele3.style.height = `${value * 3}px`;
		array_ele3.style.transform = `translate(${k * 30}px)`;
		
		
		// Appending created elements to index.html
		array_ele3.appendChild(array_ele3_label);
		container3.appendChild(array_ele3);
		
		//console.log("value:" + value + "k:" + k);		

		
}

async function tysort_final_sort(){
	container3.innerHTML = '';
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
		
	    //console.log("bo:" + bo + ",bt:" + bt);
		//console.log("i:" + i + ",j:" + j);		
		
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
	await Promise.all([divideArray(),BubbleSort2(),BubbleSort3()]);
	await tysort_final_sort();
}

async function BubbleSort(){
	BubbleSort1();
	tysort();
}

// Calling generatearray function
//generatearray();

// Calling BubbleSort function
//BubbleSort();
