/* MAINLOADER */

document.body.style.overflowY = 'hidden'
window.onload = function () {
    document.querySelector("#mainLoader").style.opacity = 0;
    setTimeout(() => {
        document.querySelector("#mainLoader").style.display = 'none';
        document.body.style.overflowY = 'auto'
    }, 400);
};



/* IMAGE-LOAD */

document.querySelectorAll(".imageData").forEach((imgWrap) => {
    const img = imgWrap.querySelector("img");

    if (img.complete) {
      imgWrap.style.setProperty("--before-opacity", "0");
    } else {
      img.addEventListener("load", () => {
        imgWrap.style.setProperty("--before-opacity", "0");
      });
      img.addEventListener("error", () => {
        console.error("Image failed to load:", img.src);
      });
    }
});



/* VIDEO-LOAD */

document.querySelectorAll('.imageData').forEach((imageData) => {
  const img = imageData.querySelector('img');
  const video = imageData.querySelector('.video');
  const videoLoad = imageData.querySelector('.videoLoad');
  let videoLoaded = false;

  imageData.addEventListener('mouseenter', () => {
    img.style.opacity = '0';

    if (!videoLoaded) {
      videoLoad.style.opacity = '1';
      video.load();
      video.addEventListener('canplay', () => {
        if (!videoLoaded) {
          videoLoaded = true;
          video.style.width = "100.1%"
          video.style.height = "100.1%"
          videoLoad.style.width = "100.1%"
          videoLoad.style.height = "100.1%"
          video.style.opacity = '1';
          setTimeout(() => {
            videoLoad.style.opacity = '0';
          }, 800);
          video.play();
        }
      }, { once: true });
    } else {
      video.style.width = "100.1%"
      video.style.height = "100.1%"
      videoLoad.style.width = "100.1%"
      videoLoad.style.height = "100.1%"
      videoLoad.style.opacity = '0';
      video.style.opacity = '1';
      video.play();
    }
  });

  imageData.addEventListener('mouseleave', () => {
    video.style.width = "99.5%"
    video.style.height = "99.5%"
    videoLoad.style.width = "99.5%"
    videoLoad.style.height = "99.5%"
    img.style.opacity = '1';
    video.pause();
    video.style.opacity = '0';
    videoLoad.style.opacity = '1';
  });
});



/* INTERCHANGING-DIVS */

document.addEventListener("DOMContentLoaded", function () {
  const wrappers = document.querySelectorAll(".wrapper");

  wrappers.forEach((wrapper, index) => {
      const textData = wrapper.querySelector(".textData");
      const imageData = wrapper.querySelector(".imageData");

      if (textData && imageData) {
          const textContentDiv = textData.querySelector("div");

          if (index % 2 === 0) {
              wrapper.appendChild(imageData);
              wrapper.appendChild(textData);

              if (textContentDiv) textContentDiv.className = "data";
          } else {
              wrapper.appendChild(textData);
              wrapper.appendChild(imageData);
              imageData.style.transform = 'rotateZ(-1deg)';

              if (textContentDiv) textContentDiv.className = "dataUD";
          }
      }
  });
});