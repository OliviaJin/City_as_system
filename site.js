let boxList = document.querySelectorAll('.box_1');
const buttonOne = document.getElementById('r1');
const buttonTwo = document.getElementById('r2');
const buttonThree = document.getElementById('r3');
const buttonFour = document.getElementById('r4');

const houseImage = document.getElementById('house');
const productImage = document.getElementById('product');
const bbqImage = document.getElementById('BBQ');
const smokeImage = document.getElementById('smoke');
const boatImage = document.getElementById('boat');
const vehicleImage = document.getElementById('vehicle');
const subwayImage = document.getElementById('subway');

const commercialExplain = document.getElementById('r_commercial');
const personalExplain = document.getElementById('r_personal');
const transportExplain = document.getElementById('r_transport');
const houseExplain = document.getElementById('r_house');

boxList.forEach((item) => {
    item.addEventListener('mouseover',function(){
        item.style.top = '-10px'
        item.style.left = '-10px'
    })

    item.addEventListener('mouseleave', function(){
        item.style.top = '0px'
        item.style.left = '0px'
    })
})
// Add click event listeners to the buttons
buttonOne.addEventListener('click', () => {
    // Hide all images
    hideAllImages();
    hideAllTexts();
    // Show the "house" image
    // Show the explain of Fuel oils and Natural gas
    houseImage.style.display = 'block';
    houseExplain.style.display = 'block';
});

buttonTwo.addEventListener('click', () => {
    hideAllImages();
    hideAllTexts();
    // Show the "product" and "BBQ" images
    productImage.style.display = 'block';
    bbqImage.style.display = 'block';
    commercialExplain.style.display = 'block';
});
buttonThree.addEventListener('click', () => {
    hideAllImages();
    hideAllTexts();
    // Show the "smoke" image
    smokeImage.style.display = 'block';
    houseImage.style.display = 'block';
    personalExplain.style.display = 'block';
});

buttonFour.addEventListener('click', () => {
    hideAllImages();
    hideAllTexts();
    // Show the "boat", "vehicle", and "subway" images
    boatImage.style.display = 'block';
    vehicleImage.style.display = 'block';
    subwayImage.style.display = 'block';
    transportExplain.style.display = 'block';
});

background.addEventListener('click', () => {
    // Hide all images
    hideAllImages();
    hideAllTexts();
});

function hideAllImages() {
    // Hide all images
    houseImage.style.display = 'none';
    productImage.style.display = 'none';
    bbqImage.style.display = 'none';
    smokeImage.style.display = 'none';
    boatImage.style.display = 'none';
    vehicleImage.style.display = 'none';
    subwayImage.style.display = 'none';
}

function hideAllTexts() {
    // Hide all texts
    houseExplain.style.display = 'none';
    commercialExplain.style.display = 'none';
    personalExplain.style.display = 'none';
    transportExplain.style.display = 'none';
}
