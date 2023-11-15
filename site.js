let boxList = document.querySelectorAll('.box_1');
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
var fadeDivs = document.querySelectorAll(".fade_div");
console.log(fadeDivs);

// console.log(fadeDivs) length: 39
const box = document.getElementById("intro");
const move = document.getElementById("move");
// get the original distance between scroll tag and top hegiht of screen
// || => or
var prevScrollTop = window.pageYOffset || document.documentElement.scrollTop;
// get the length of array
const dataLength = fadeDivs.length;
let index = 0; // 记录的是字母的字母（存储是一个数组），下标0开始
let data = 3;  // 定义的是记录滚动条的变化

// monitor the movement of mouse scroll
window.addEventListener("scroll", function () {
  // get the distance between scroll tag and top hegiht of screen
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Ternary expression: if scrollTop > preScrollTop => down. if scrollTop < pre ScrollTop => up
  var scrollDirection = scrollTop > prevScrollTop ? "down" : "up";
  if (scrollTop == 0) {
    data = 3;
    index = 0;
  }

  console.log(Math.ceil(move.clientHeight / 66));
  // determine the scroll direction
  if (scrollDirection === "down") {
    // 滚动大于 向上取整的main盒子的浏览器高度/66 * data
    // index 0 data 3  24 * 3
    // index 1 data 4  24 * 4
    if (
      scrollTop > Math.ceil(move.clientHeight / 66) * data &&
      index < dataLength
    ) {
      fadeDivs[index].style.opacity = "0.7";

      // ++ : add1
      data++;
      index++;
    }

    // Give a limit if scrollTop &gt; 500, transparency color uniform change.
    if (scrollTop > move.clientHeight * 0.65) {
      fadeDivs.forEach((item) => {
        item.style.opacity = "0.7";
      });
    }
  } else {
    if (scrollTop < Math.ceil(move.clientHeight / 66) * data && index >= 1) {
      if (fadeDivs[index]) {
        fadeDivs[index].style.opacity = "0.15";
      }
      index--;
      data--;
    }
    if (scrollTop < 15) {
      fadeDivs.forEach((item) => {
        item.style.opacity = "0.15";
      });
    }
  }

  prevScrollTop = scrollTop;
});
