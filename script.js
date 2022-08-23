const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');
selectImage.addEventListener('click', function () {
	inputFile.click();
})
async function loadModel(){
    model = undefined;
    model = await tf.loadLayersModel('https://raw.githubusercontent.com/Chitkara-University-Pb/Innovators/main/model%20(1).json');
    console.log("model loaded")
}
loadModel();    

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');  
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');     
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;   

            var predictedClass= model.predict(img);
            console.log(predictedClass);
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");    
	}
})
