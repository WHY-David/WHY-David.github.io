/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){
  // Sticky footer
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);
  // FitVids init
  $("#main").fitVids();

  // init sticky sidebar
  $(".sticky").Stickyfill();

  var stickySideBar = function(){
    const MINIMUM_WIDTH = 1024;

    // Adjust if the follow button is shown based upon screen size
    var width = $(window).width();
    var show = $(".author__urls-wrapper button").length === 0 ? width > MINIMUM_WIDTH : !$(".author__urls-wrapper button").is(":visible");

    // Don't show the follow button if there is no content for it
    var count = $('.author__urls.social-icons li').length - $('li[class="author__desktop"]').length;
    if (width <= MINIMUM_WIDTH && count === 0) {
      $(".author__urls-wrapper button").hide();
      show = false;
    }

    if (show) {
      // fix
      Stickyfill.rebuild();
      Stickyfill.init();
      $(".author__urls").show();
    } else {
      // unfix
      Stickyfill.stop();
      $(".author__urls").hide();
    }
  };

  stickySideBar();

  $(window).resize(function(){
    stickySideBar();
  });

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").fadeToggle("fast", function() {});
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({offset: -65});

  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  var layoutPhotographyGallery = function(gallery) {
    var gap = 2;
    var width = gallery.clientWidth;
    var figcaption = null;
    var children = Array.prototype.slice.call(gallery.children);

    children.forEach(function(child) {
      if (child.tagName && child.tagName.toLowerCase() === "figcaption") {
        figcaption = child;
      }
    });

    children.forEach(function(child) {
      if (child.classList && child.classList.contains("photography-gallery__row")) {
        while (child.firstChild) {
          gallery.insertBefore(child.firstChild, child);
        }
        child.remove();
      }
    });

    if (!width) {
      return;
    }

    var items = Array.prototype.filter.call(gallery.children, function(child) {
      return child.classList && child.classList.contains("gallery__item");
    });

    if (!items.length) {
      return;
    }

    var options;
    if (width >= 1200) {
      options = { targetHeight: 220, minPerRow: 3, maxPerRow: 6 };
    } else if (width >= 900) {
      options = { targetHeight: 200, minPerRow: 3, maxPerRow: 5 };
    } else if (width >= 640) {
      options = { targetHeight: 170, minPerRow: 2, maxPerRow: 4 };
    } else {
      options = { targetHeight: 140, minPerRow: 2, maxPerRow: 3 };
    }

    var measureRowHeight = function(row) {
      var aspectSum = row.reduce(function(total, entry) {
        return total + entry.aspect;
      }, 0);

      return (width - gap * Math.max(0, row.length - 1)) / aspectSum;
    };

    var rows = [];
    var currentRow = [];
    var aspectSum = 0;

    items.forEach(function(item) {
      var image = item.querySelector(".gallery__image");
      if (!image || !image.naturalWidth || !image.naturalHeight) {
        return;
      }

      var aspect = image.naturalWidth / image.naturalHeight;
      currentRow.push({ item: item, aspect: aspect });
      aspectSum += aspect;

      var estimatedWidth = aspectSum * options.targetHeight + gap * Math.max(0, currentRow.length - 1);
      if ((currentRow.length >= options.minPerRow && estimatedWidth >= width) || currentRow.length >= options.maxPerRow) {
        rows.push(currentRow);
        currentRow = [];
        aspectSum = 0;
      }
    });

    if (currentRow.length) {
      rows.push(currentRow);
    }

    if (rows.length > 1) {
      var lastRow = rows[rows.length - 1];
      var previousRow = rows[rows.length - 2];
      var rebalancedHeight = measureRowHeight(lastRow);

      while (previousRow.length > options.minPerRow &&
             (lastRow.length < options.minPerRow || rebalancedHeight > options.targetHeight * 1.35)) {
        lastRow.unshift(previousRow.pop());
        rebalancedHeight = measureRowHeight(lastRow);
      }
    }

    rows.forEach(function(row) {
      var rowElement = document.createElement("div");
      rowElement.className = "photography-gallery__row";

      var rowHeight = Math.max(110, measureRowHeight(row));
      var widths = row.map(function(entry) {
        return Math.round(rowHeight * entry.aspect);
      });
      var usedWidth = widths.reduce(function(total, itemWidth) {
        return total + itemWidth;
      }, 0) + gap * Math.max(0, row.length - 1);
      widths[widths.length - 1] += width - usedWidth;

      row.forEach(function(entry, index) {
        entry.item.style.width = Math.max(40, widths[index]) + "px";
        entry.item.style.height = Math.round(rowHeight) + "px";
        rowElement.appendChild(entry.item);
      });

      if (figcaption) {
        gallery.insertBefore(rowElement, figcaption);
      } else {
        gallery.appendChild(rowElement);
      }
    });
  };

  var initializePhotographyGalleries = function() {
    var galleries = Array.prototype.slice.call(document.querySelectorAll(".photography-gallery"));
    if (!galleries.length) {
      return;
    }

    galleries.forEach(function(gallery) {
      var items = Array.prototype.filter.call(gallery.children, function(child) {
        return child.classList && child.classList.contains("gallery__item");
      });

      if (!items.length) {
        return;
      }

      var pending = 0;
      var ready = false;
      var relayout = function() {
        if (ready) {
          layoutPhotographyGallery(gallery);
        }
      };

      items.forEach(function(item) {
        var image = item.querySelector(".gallery__image");
        if (!image) {
          return;
        }

        if (!image.complete || !image.naturalWidth) {
          pending += 1;
          var onImageReady = function() {
            pending -= 1;
            if (pending <= 0) {
              ready = true;
              layoutPhotographyGallery(gallery);
            }
          };

          image.addEventListener("load", onImageReady, { once: true });
          image.addEventListener("error", onImageReady, { once: true });
        }
      });

      if (!pending) {
        ready = true;
        layoutPhotographyGallery(gallery);
      }

      var resizeTimer;
      window.addEventListener("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(relayout, 120);
      });
    });
  };

  initializePhotographyGalleries();

});
