const byId = (selector) => document.getElementById(selector);
const $ = (selector) => document.querySelector(selector);
const cube = byId("cube");
const range = byId("range");
const font = byId("transparencia");
let isMoving = false,
  inicioX,
  finalX,
  inicioY,
  finalY,
  moveX,
  moveY,
  rotate = false,
  rotateX,
  rotateY,
  opacityValue = range.value;
font.innerText = opacityValue + "%";
for (lateral in cube.children) {
  if (!isNaN(lateral)) {
    cube.children[lateral].setAttribute(
      "style",
      `opacity: ${opacityValue / 100}`
    );
  }
}
range.addEventListener("mousemove", (e) => {
  opacityValue = range.value;
  font.innerText = opacityValue + "%";
  for (lateral in cube.children) {
    if (!isNaN(lateral)) {
      cube.children[lateral].setAttribute(
        "style",
        `opacity: ${opacityValue / 100}`
      );
    }
  }
});
addEventListener("mousedown", (e) => {
  isMoving = true;
  inicioX = e.clientX;
  inicioY = e.clientY;
  byId("1").innerText = `InicioX = ${inicioX}\rInicioY = ${inicioY}`;
});

addEventListener("mousemove", (e) => {
  if (isMoving) {
    finalX = e.clientX;
    finalY = e.clientY;
    byId("2").innerText = `ActualY = ${finalY}\rActualX = ${finalX}`;
    moveX = inicioX - finalX;
    moveY = inicioY - finalY;
    if (rotate) {
      byId("3").innerText = `MoverY = ${moveY}°\rMoverX = ${moveX}°`;
      let calcX = rotateX + moveX;
      let calcY = rotateY + moveY;
      while (calcX > 360) calcX -= 360;
      while (calcX < -360) calcX += 360;
      while (calcY > 360) calcY -= 360;
      while (calcY < -360) calcY += 360;
      cube.style.transform = `rotateY(${calcY}deg) rotateX(${calcX}deg)`;
    } else {
      byId("3").innerText = `moverY = ${moveY}°\rmoverX = ${moveX}°`;
      cube.style.transform = `rotateY(${moveY}deg) rotateX(${moveX}deg)`;
    }
  }
});

addEventListener("mouseup", (e) => {
  isMoving = false;
  rotateX = cube.style.transform.match(/X\(-?\d+deg\)/g);
  rotateX = Number(rotateX[0].match(/-?\d+/g));
  rotateY = cube.style.transform.match(/Y\(-?\d+deg\)/g);
  rotateY = Number(rotateY[0].match(/-?\d+/g));
  while (rotateX > 360) {
    rotateX -= 360;
  }
  while (rotateX < -360) {
    rotateX += 360;
  }
  while (rotateY > 360) {
    rotateY -= 360;
    console.log("rotateY:", rotateY);
  }
  while (rotateY < -360) {
    rotateY += 360;
  }
  rotate = true;
});
