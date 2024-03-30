document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.querySelector("#carouselExampleIndicators");
  var accordion = document.querySelector("#accordionFlushExample");
  var carouselInstance = new bootstrap.Carousel(carousel);

  function updateActiveCount(activeIndex) {
    // Reset all
    accordion.querySelectorAll(".count").forEach(function (count, index) {
      count.classList.remove("activeCount");
      count.style.backgroundColor = "#002050"; // Default background color
    });

    // Set active
    var activeCount = accordion.querySelectorAll(".count")[activeIndex];
    if (activeCount) {
      activeCount.classList.add("activeCount");
      activeCount.style.backgroundColor = "#fc6668";
    }
  }

  // Carousel controls accordion and update count
  carousel.addEventListener("slid.bs.carousel", function (e) {
    var activeIndex = [...carousel.querySelectorAll(".carousel-item")].indexOf(
      e.relatedTarget
    );

    // Show corresponding accordion item
    var newActiveAccordionItem =
      accordion.querySelectorAll(".accordion-item")[activeIndex];
    new bootstrap.Collapse(newActiveAccordionItem.querySelector(".collapse"), {
      toggle: false,
    }).show();

    // Update counts based on active carousel item
    updateActiveCount(activeIndex);
  });

  // Accordion controls carousel
  accordion
    .querySelectorAll(".accordion-button")
    .forEach(function (button, index) {
      button.addEventListener("click", function () {
        // Move carousel to the corresponding index
        carouselInstance.to(index);
        // Update counts based on active accordion item
        updateActiveCount(index);
      });
    });

  // Set the first count as active by default
  updateActiveCount(0);
  var firstAccordionItemCollapse = accordion.querySelector(
    ".accordion-collapse"
  );
  if (firstAccordionItemCollapse) {
    var collapseInstance = new bootstrap.Collapse(firstAccordionItemCollapse, {
      toggle: false, // This ensures it doesn't toggle but explicitly opens
    });
    collapseInstance.show(); // Show the first accordion item
  }
  document.getElementById("scrollTopButton").onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top smoothly
  };
  document.addEventListener("DOMContentLoaded", function () {
    var accordionFlushExample = document.getElementById(
      "accordionFlushExample"
    );
    accordionFlushExample.addEventListener(
      "show.bs.collapse",
      function (event) {
        // Show current item
        var itemToShow = event.target.parentElement;
        itemToShow.style.display = "block";

        // Hide other items
        var itemsToHide =
          accordionFlushExample.querySelectorAll(".accordion-item");
        itemsToHide.forEach(function (item) {
          if (item !== itemToShow) {
            item.style.display = "none";
          }
        });
      }
    );

    accordionFlushExample.addEventListener("hidden.bs.collapse", function () {
      // On smaller screens, when an item is hidden, check if there are any others open. If not, show all.
      if (window.innerWidth <= 992) {
        var allItems =
          accordionFlushExample.querySelectorAll(".accordion-item");
        var anyActive = Array.from(allItems).some(function (item) {
          return item.querySelector(".collapse.show");
        });

        if (!anyActive) {
          allItems.forEach(function (item) {
            item.style.display = "block";
          });
        }
      }
    });
  });
});
