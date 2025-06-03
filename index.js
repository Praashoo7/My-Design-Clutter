/* THEME */

const toggleSwitchsecond = document.querySelector('.theme-switch-second input[type="checkbox"]');

toggleSwitchsecond.addEventListener('change', () => {
  document.getElementById('bgTexture').style.opacity = 0
  setTimeout(() => {
    document.getElementById('bgTexture').style.opacity = 1
  }, 200);
})
toggleSwitchsecond.addEventListener('change', switchTheme, false);
function switchTheme(e) {
  if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
  }
  else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
  }    
}
const currentThemeSecond = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentThemeSecond) {
    document.documentElement.setAttribute('data-theme', currentThemeSecond);

    if (currentThemeSecond === 'dark') {
        toggleSwitchsecond.checked = true;
    }
    else if (currentThemeSecond === 'light') {
    }
}



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
  const muteCheck = document.getElementById('muteCheck');
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
            if (videoLoad.id === "nfsVideoLoad") {
              muteCheck.style.zIndex = 10;
            }
          }, 800);

          setTimeout(() => {
            videoLoad.style.display = 'none';
          }, 1200);

          video.play();
        }
      }, { once: true });
    } else {
      video.style.width = "100.1%"
      video.style.height = "100.1%"
      videoLoad.style.width = "100.1%"
      videoLoad.style.height = "100.1%"
      videoLoad.style.opacity = '0';

      if (videoLoad.id === "nfsVideoLoad") {
        muteCheck.style.zIndex = 10;
      }

      setTimeout(() => {
        videoLoad.style.display = 'none';
      }, 800);

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
    videoLoad.style.display = 'flex';

    if (videoLoad.id === "nfsVideoLoad") {
      muteCheck.style.zIndex = 1;
    }

    setTimeout(() => {
      videoLoad.style.opacity = 1;
    }, 800);
  });
});

document.getElementById("checkboxMute").addEventListener("change", function() {
  let video = document.getElementById("nfsMute");

  if (this.checked) {
    if(window.innerWidth > 690){
      document.querySelector('.line').style.minHeight = '1.25em'
    } else {
      document.querySelector('.line').style.minHeight = '0.65em'
    }
      video.muted = true;
  } else {
      document.querySelector('.line').style.minHeight = '0em'
      video.muted = false;
  }
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



/* NOTE */

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if(isTouchDevice){
  document.getElementById('note').innerHTML = 'PS : Tap on the Images to see the Actual site Design!'
} else {
  document.getElementById('note').innerHTML = 'PS : Hover over the Images to see the Actual site Design!'
}