window.onload = function () {
  //generall-------------------------------------------------------------------------------
  let slider = document.querySelector(".slider");

  let homeButton = document.querySelector(".home-button"); //Home button, return to slider start
  homeButton.addEventListener("touchstart", function (e) {
    slider.scroll(0, 0);
  });

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  //Slide-1-------------------------------------------------------------------------------
  let nextButton = document.querySelector(".next"); //Next button, go to the next slide
  nextButton.addEventListener("touchstart", function (e) {
    slider.scroll(window.innerWidth, 0);
  });

  //Slide-2-------------------------------------------------------------------------------
  let AnimImages = document.querySelectorAll(".slide-2 .anim"); // Animate background image

  //   Animate bg when you are in slide-2
  slider.addEventListener("scroll", function () {
    if (slider.scrollLeft == window.innerWidth) {
      AnimImages.forEach((img) => {
        img.style.WebkitTransition = `all ${getRandomArbitrary(2, 9)}s`;
        img.style.transform = "translate(-100px, -100px)";
        img.style.opacity = 1;
      });
    } else if (slider.scrollLeft < window.innerWidth) {
      AnimImages.forEach((img) => {
        img.style.WebkitTransition = `all 1s`;
        img.style.transform = "translate(100px, 100px)";
        img.style.opacity = 0;
      });
    }
    resetScroll();
  });

  // Custome scroll for text area
  let textArea = document.querySelector(".text-area");
  let sliderRangeInput = document.querySelector(".range-slider input");
  let sliderContainer = document.querySelector(".range-slider");
  initAndSetupTheSliders();


  sliderContainer.addEventListener("touchmove", function () {
    updateSlider(sliderRangeInput);
  });


  function initAndSetupTheSliders() {
    let sliderRangeInput = document.querySelector(".range-slider input");
    sliderRangeInput.setAttribute("value", "0");
    updateSlider(sliderRangeInput);
  }

  
  function updateSlider(element) {
    let parent = element.parentElement,
      lastValue = parent.getAttribute("data-slider-value");
    if (lastValue === element.value) {
      return; // No value change, no need to update then
    }
    parent.setAttribute("data-slider-value", element.value);
    let thumb = parent.querySelector(".range-slider__thumb"),
      pct =
        element.value *
        ((parent.clientHeight - thumb.clientHeight) / parent.clientHeight);
    thumb.style.top = pct + "%";
    let y =
      ((textArea.scrollHeight - textArea.clientHeight) / 100) * element.value;
    textArea.scrollTo(0, y);
  }


  textArea.addEventListener("touchend", function () {
    sliderRangeInput.value =
      textArea.scrollTop /
      ((textArea.scrollHeight - textArea.clientHeight) / 100);
    updateSlider(sliderRangeInput);
  });


  function resetScroll() {
    textArea.scrollTo(0, 0);
    sliderRangeInput.value = 0;
    updateSlider(sliderRangeInput);
  }

  //Slide-3-------------------------------------------------------------------------------
  //Button more, show popup
  let title = document.querySelector(".slide-3 .title");
  let buttonMore = document.querySelector(".more");
  let popup = document.querySelector(".popup");
  let popupElements = popup.querySelectorAll(".opacity"); // BG, Popup container, Close button
  let popupClose = popup.querySelector(".close"); //Close button X
  let paginatePanel = popup.querySelector(".paginate-panel");
  let arrowPrevious = paginatePanel.querySelector(".arrow-left");
  let arrowNext = paginatePanel.querySelector(".arrow-right");
  let points = paginatePanel
    .querySelector(".points")
    .querySelectorAll(".point");
  let popupContentSections = popup
    .querySelector(".sections")
    .querySelectorAll(".items-section");
  let indexActiveSection = getIndexActiveItem(popupContentSections);

  buttonMore.addEventListener("touchstart", function (e) {
    if (popup.getAttribute("data-active") == "false") {
      slider.style.overflowX = "hidden";
      slider.scrollTo(slider.scrollWidth, 0);
      popup.style.visibility = "visible";
      popupElements[0].style.opacity = "0.5";
      popupElements[1].style.opacity = "1";
      popupElements[2].style.opacity = "1";
      popupContentSections[0].style.opacity = 1; //Show first section
      popup.setAttribute("data-active", "true");
    }
  });

  //Popup close
  popupClose.addEventListener("touchstart", function () {
    // Close by tap on close button
    closePopup();
  });

  popupElements[0].addEventListener("touchstart", function () {
    //Close popip by tap on bg element
    closePopup();
  });

  function closePopup() {
    for (i = 0; i < popupElements.length; i++) {
      popupElements[i].style.opacity = "0";
    }
    popup.style.visibility = "hidden";
    popup.setAttribute("data-active", "false");
    resetPopup();
    slider.style.overflowX = "scroll";
  }

  // Popup paginate
  arrowPrevious.addEventListener("touchstart", function (e) {
    if (indexActiveSection > 0) {
      doPaginate(indexActiveSection, -1);
    }
  });

  arrowNext.addEventListener("touchstart", function (e) {
    if (indexActiveSection < popupContentSections.length - 1) {
      doPaginate(indexActiveSection, 1);
    }
  });

  function doPaginate(i, paginateDirection) {
    let curentActiveItem = popupContentSections[i];
    curentActiveItem.setAttribute("data-active", "false");
    points[i].classList.remove("active");
    curentActiveItem.style.zIndex = "0";
    curentActiveItem.style.opacity = "0";

    let newActiveItem = popupContentSections[i + paginateDirection];
    newActiveItem.setAttribute("data-active", "true");
    points[i + paginateDirection].classList.add("active");
    newActiveItem.style.zIndex = "2";
    newActiveItem.style.opacity = "1";
    indexActiveSection = indexActiveSection + paginateDirection;
  }

  function getIndexActiveItem(element) {
    for (i = 0; i < element.length; i++) {
      if (element[i].getAttribute("data-active") == "true") {
        return i;
      }
    }
  }

  function resetPopup() {
    popupContentSections.forEach((item) => {
      indexActiveSection = 0;
      item.style.zIndex = 0;
      item.style.opacity = 0;
    });
    points.forEach((item) => item.classList.remove("active"));
    points[0].classList.add("active");
  }
};


//  Hello bro, upload by console!