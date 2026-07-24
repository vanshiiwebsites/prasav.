/* =========================================================
   PRASAV — LUXURY FASHION WEBSITE
   Main JavaScript

   Created and designed by Vanshika
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";


  /* =======================================================
     1. CORE ELEMENTS
     ======================================================= */

  const body = document.body;

  const introScreen = document.getElementById("introScreen");
  const siteHeader = document.getElementById("siteHeader");
  const currentYear = document.getElementById("currentYear");

  let lastScrollPosition = window.scrollY;
  let introHasClosed = false;


  /* =======================================================
     2. CURRENT YEAR
     ======================================================= */

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }


  /* =======================================================
     3. OPENING INTRO SCREEN
     ======================================================= */

  function closeIntroScreen() {
    if (!introScreen || introHasClosed) {
      return;
    }

    introHasClosed = true;

    introScreen.classList.add("is-hidden");
    introScreen.setAttribute("aria-hidden", "true");

    body.classList.remove("intro-active");

    window.setTimeout(() => {
      introScreen.hidden = true;
    }, 750);
  }


  if (introScreen) {
    body.classList.add("intro-active");
    introScreen.hidden = false;

    window.setTimeout(closeIntroScreen, 2200);

    window.addEventListener(
      "load",
      () => {
        window.setTimeout(closeIntroScreen, 300);
      },
      { once: true }
    );
  } else {
    body.classList.remove("intro-active");
  }


  /* =======================================================
     4. HEADER SCROLL STATE
     ======================================================= */

  function updateHeaderState() {
    if (!siteHeader) {
      return;
    }

    const currentScrollPosition = Math.max(window.scrollY, 0);

    siteHeader.classList.toggle(
      "is-scrolled",
      currentScrollPosition > 24
    );

    const isScrollingDown =
      currentScrollPosition > lastScrollPosition;

    const shouldHideHeader =
      isScrollingDown &&
      currentScrollPosition > 260 &&
      !body.classList.contains("menu-open") &&
      !body.classList.contains("search-open");

    siteHeader.classList.toggle(
      "is-hidden",
      shouldHideHeader
    );

    lastScrollPosition = currentScrollPosition;
  }


  updateHeaderState();

  window.addEventListener(
    "scroll",
    updateHeaderState,
    { passive: true }
  );


  /* =======================================================
     5. RESTORE HEADER WHEN POINTER MOVES TO TOP
     ======================================================= */

  document.addEventListener("mousemove", (event) => {
    if (!siteHeader) {
      return;
    }

    if (event.clientY <= 40) {
      siteHeader.classList.remove("is-hidden");
    }
  });


  /* =======================================================
     6. RESTORE HEADER WHEN WINDOW REGAINS FOCUS
     ======================================================= */

  window.addEventListener("focus", () => {
    if (siteHeader) {
      siteHeader.classList.remove("is-hidden");
    }
  });
    /* =======================================================
     7. MOBILE MENU ELEMENTS
     ======================================================= */

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const menuOverlay = document.getElementById("menuOverlay");

  const mobileMenuLinks = document.querySelectorAll(
    ".mobile-menu__link"
  );

  let lastFocusedElement = null;


  /* =======================================================
     8. MOBILE MENU FUNCTIONS
     ======================================================= */

  function openMobileMenu() {
    if (!mobileMenu || !menuOverlay || !menuButton) {
      return;
    }

    lastFocusedElement = document.activeElement;

    body.classList.add("menu-open");

    mobileMenu.classList.add("is-open");
    menuOverlay.classList.add("is-visible");

    mobileMenu.setAttribute("aria-hidden", "false");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");

    if (mobileMenuClose) {
      window.setTimeout(() => {
        mobileMenuClose.focus();
      }, 100);
    }
  }


  function closeMobileMenu(options = {}) {
    const { restoreFocus = true } = options;

    if (!mobileMenu || !menuOverlay || !menuButton) {
      return;
    }

    body.classList.remove("menu-open");

    mobileMenu.classList.remove("is-open");
    menuOverlay.classList.remove("is-visible");

    mobileMenu.setAttribute("aria-hidden", "true");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");

    if (
      restoreFocus &&
      lastFocusedElement instanceof HTMLElement
    ) {
      lastFocusedElement.focus();
    }

    lastFocusedElement = null;
  }


  function toggleMobileMenu() {
    if (!mobileMenu) {
      return;
    }

    const menuIsOpen =
      mobileMenu.classList.contains("is-open");

    if (menuIsOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }


  if (menuButton) {
    menuButton.addEventListener(
      "click",
      toggleMobileMenu
    );
  }


  if (mobileMenuClose) {
    mobileMenuClose.addEventListener(
      "click",
      () => {
        closeMobileMenu();
      }
    );
  }


  if (menuOverlay) {
    menuOverlay.addEventListener(
      "click",
      () => {
        closeMobileMenu();
      }
    );
  }


  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu({
        restoreFocus: false
      });
    });
  });


  /* =======================================================
     9. SEARCH PANEL ELEMENTS
     ======================================================= */

  const searchOpenButton =
    document.getElementById("searchOpenButton");

  const searchPanel =
    document.getElementById("searchPanel");

  const searchBackdrop =
    document.getElementById("searchBackdrop");

  const searchCloseButton =
    document.getElementById("searchCloseButton");

  const searchInput =
    document.getElementById("searchInput");


  /* =======================================================
     10. SEARCH PANEL FUNCTIONS
     ======================================================= */

  function openSearchPanel() {
    if (!searchPanel || !searchOpenButton) {
      return;
    }

    if (
      mobileMenu &&
      mobileMenu.classList.contains("is-open")
    ) {
      closeMobileMenu({
        restoreFocus: false
      });
    }

    lastFocusedElement = document.activeElement;

    body.classList.add("search-open");
    searchPanel.classList.add("is-open");

    searchPanel.setAttribute("aria-hidden", "false");
    searchOpenButton.setAttribute(
      "aria-expanded",
      "true"
    );

    window.setTimeout(() => {
      if (searchInput) {
        searchInput.focus();
      } else if (searchCloseButton) {
        searchCloseButton.focus();
      }
    }, 150);
  }


  function closeSearchPanel(options = {}) {
    const { restoreFocus = true } = options;

    if (!searchPanel || !searchOpenButton) {
      return;
    }

    body.classList.remove("search-open");
    searchPanel.classList.remove("is-open");

    searchPanel.setAttribute("aria-hidden", "true");
    searchOpenButton.setAttribute(
      "aria-expanded",
      "false"
    );

    if (
      restoreFocus &&
      lastFocusedElement instanceof HTMLElement
    ) {
      lastFocusedElement.focus();
    }

    lastFocusedElement = null;
  }


  if (searchOpenButton) {
    searchOpenButton.addEventListener(
      "click",
      openSearchPanel
    );
  }


  if (searchCloseButton) {
    searchCloseButton.addEventListener(
      "click",
      () => {
        closeSearchPanel();
      }
    );
  }


  if (searchBackdrop) {
    searchBackdrop.addEventListener(
      "click",
      () => {
        closeSearchPanel();
      }
    );
  }


  /* =======================================================
     11. ESCAPE KEY CONTROLS
     ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (
      searchPanel &&
      searchPanel.classList.contains("is-open")
    ) {
      closeSearchPanel();
      return;
    }

    if (
      mobileMenu &&
      mobileMenu.classList.contains("is-open")
    ) {
      closeMobileMenu();
    }
  });


  /* =======================================================
     12. KEYBOARD FOCUS CONTROL
     ======================================================= */

  function trapKeyboardFocus(container, event) {
    if (!container || event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      container.querySelectorAll(
        [
          "a[href]",
          "button:not([disabled])",
          "input:not([disabled])",
          "textarea:not([disabled])",
          "select:not([disabled])",
          '[tabindex]:not([tabindex="-1"])'
        ].join(",")
      )
    ).filter((element) => {
      return (
        element instanceof HTMLElement &&
        !element.hasAttribute("hidden") &&
        element.offsetParent !== null
      );
    });

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement =
      focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }


  document.addEventListener("keydown", (event) => {
    if (
      searchPanel &&
      searchPanel.classList.contains("is-open")
    ) {
      trapKeyboardFocus(searchPanel, event);
      return;
    }

    if (
      mobileMenu &&
      mobileMenu.classList.contains("is-open")
    ) {
      trapKeyboardFocus(mobileMenu, event);
    }
  });


  /* =======================================================
     13. SMOOTH INTERNAL NAVIGATION
     ======================================================= */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
  );


  function scrollToSection(targetElement) {
    if (!targetElement) {
      return;
    }

    const headerOffset = siteHeader
      ? siteHeader.offsetHeight
      : 0;

    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: "smooth"
    });
  }


  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetSelector =
        link.getAttribute("href");

      if (
        !targetSelector ||
        !targetSelector.startsWith("#")
      ) {
        return;
      }

      const targetElement =
        document.querySelector(targetSelector);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      if (
        searchPanel &&
        searchPanel.classList.contains("is-open")
      ) {
        closeSearchPanel({
          restoreFocus: false
        });
      }

      if (
        mobileMenu &&
        mobileMenu.classList.contains("is-open")
      ) {
        closeMobileMenu({
          restoreFocus: false
        });
      }

      scrollToSection(targetElement);

      window.history.replaceState(
        null,
        "",
        targetSelector
      );
    });
  });


  /* =======================================================
     14. ACTIVE DESKTOP NAVIGATION
     ======================================================= */

  const desktopNavigationLinks =
    document.querySelectorAll(".desktop-nav__link");

  const navigationSections = Array.from(
    desktopNavigationLinks
  )
    .map((link) => {
      const selector = link.getAttribute("href");

      if (!selector || !selector.startsWith("#")) {
        return null;
      }

      const section = document.querySelector(selector);

      if (!section) {
        return null;
      }

      return {
        link,
        section
      };
    })
    .filter(Boolean);


  function updateActiveNavigation() {
    if (navigationSections.length === 0) {
      return;
    }

    const referencePosition =
      window.scrollY +
      window.innerHeight * 0.35;

    let activeItem = null;

    navigationSections.forEach((item) => {
      if (item.section.offsetTop <= referencePosition) {
        activeItem = item;
      }
    });

    desktopNavigationLinks.forEach((link) => {
      link.classList.remove("is-active");
    });

    if (activeItem) {
      activeItem.link.classList.add("is-active");
    }
  }


  updateActiveNavigation();

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );


  /* =======================================================
     15. WINDOW RESIZE SAFEGUARDS
     ======================================================= */

  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 1000 &&
      mobileMenu &&
      mobileMenu.classList.contains("is-open")
    ) {
      closeMobileMenu({
        restoreFocus: false
      });
    }
  });
    /* =======================================================
     16. NEWSLETTER ELEMENTS
     ======================================================= */

  const newsletterForm =
    document.getElementById("newsletterForm");

  const newsletterEmail =
    document.getElementById("newsletterEmail");

  const newsletterMessage =
    document.getElementById("newsletterMessage");


  /* =======================================================
     17. NEWSLETTER MESSAGE HELPER
     ======================================================= */

  function setNewsletterMessage(message, type = "") {
    if (!newsletterMessage) {
      return;
    }

    newsletterMessage.textContent = message;

    newsletterMessage.classList.remove(
      "is-error",
      "is-success"
    );

    if (type === "error") {
      newsletterMessage.classList.add("is-error");
    }

    if (type === "success") {
      newsletterMessage.classList.add("is-success");
    }
  }


  /* =======================================================
     18. EMAIL VALIDATION
     ======================================================= */

  function isValidEmail(emailAddress) {
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return emailPattern.test(emailAddress);
  }


  /* =======================================================
     19. NEWSLETTER FORM SUBMISSION
     ======================================================= */

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const emailAddress =
          newsletterEmail.value.trim();

        if (emailAddress === "") {
          setNewsletterMessage(
            "Please enter your email address.",
            "error"
          );

          newsletterEmail.focus();
          return;
        }

        if (!isValidEmail(emailAddress)) {
          setNewsletterMessage(
            "Please enter a valid email address.",
            "error"
          );

          newsletterEmail.focus();
          return;
        }

        setNewsletterMessage(
          "Thank you. You now have private access to the world of PRASAV.",
          "success"
        );

        newsletterForm.reset();
      }
    );


    newsletterEmail.addEventListener("input", () => {
      if (
        newsletterMessage &&
        newsletterMessage.textContent !== ""
      ) {
        setNewsletterMessage("");
      }
    });
  }


  /* =======================================================
     20. SEARCH FORM ELEMENTS
     ======================================================= */

  const searchForm =
    document.getElementById("searchForm");

  const searchMessage =
    document.getElementById("searchMessage");

  const searchSuggestions =
    document.querySelectorAll(".search-suggestion");


  /* =======================================================
     21. SEARCH MESSAGE HELPER
     ======================================================= */

  function setSearchMessage(message, type = "") {
    if (!searchMessage) {
      return;
    }

    searchMessage.textContent = message;

    searchMessage.classList.remove(
      "is-error",
      "is-success"
    );

    if (type === "error") {
      searchMessage.classList.add("is-error");
    }

    if (type === "success") {
      searchMessage.classList.add("is-success");
    }
  }


  /* =======================================================
     22. SEARCH DESTINATION MAP
     ======================================================= */

  const searchDestinations = [
    {
      keywords: [
        "new",
        "new arrival",
        "new arrivals",
        "latest",
        "latest collection",
        "products"
      ],
      selector: "#new-arrivals",
      label: "New Arrivals"
    },
    {
      keywords: [
        "woman",
        "women",
        "womens",
        "women collection",
        "dress",
        "dresses",
        "kurti",
        "kurtis",
        "lehenga",
        "tops"
      ],
      selector: "#women",
      label: "Women"
    },
    {
      keywords: [
        "man",
        "men",
        "mens",
        "men collection",
        "shirt",
        "shirts",
        "jacket",
        "jackets",
        "kurta",
        "jeans"
      ],
      selector: "#men",
      label: "Men"
    },
    {
      keywords: [
        "collection",
        "collections",
        "featured",
        "featured collection"
      ],
      selector: "#collections",
      label: "Featured Collections"
    },
    {
      keywords: [
        "editorial",
        "journal",
        "story",
        "stories",
        "craft",
        "craftsmanship"
      ],
      selector: "#editorial",
      label: "Editorial"
    },
    {
      keywords: [
        "about",
        "our story",
        "brand",
        "vanshika",
        "creator"
      ],
      selector: "#about",
      label: "Our Story"
    },
    {
      keywords: [
        "boutique",
        "styling",
        "appointment",
        "private styling",
        "store"
      ],
      selector: "#boutique",
      label: "Boutique"
    },
    {
      keywords: [
        "membership",
        "member",
        "newsletter",
        "subscribe",
        "private access",
        "gift"
      ],
      selector: "#newsletter",
      label: "Private Access"
    }
  ];


  /* =======================================================
     23. SEARCH MATCHING
     ======================================================= */

  function findSearchDestination(searchTerm) {
    const normalizedSearchTerm =
      searchTerm
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    if (normalizedSearchTerm === "") {
      return null;
    }

    return searchDestinations.find((destination) => {
      return destination.keywords.some((keyword) => {
        return (
          normalizedSearchTerm === keyword ||
          normalizedSearchTerm.includes(keyword) ||
          keyword.includes(normalizedSearchTerm)
        );
      });
    }) || null;
  }


  /* =======================================================
     24. OPEN SEARCH RESULT
     ======================================================= */

  function openSearchDestination(destination) {
    if (!destination) {
      return;
    }

    const targetElement =
      document.querySelector(destination.selector);

    if (!targetElement) {
      setSearchMessage(
        "This section is currently unavailable.",
        "error"
      );

      return;
    }

    setSearchMessage(
      `${destination.label} found. Opening section...`,
      "success"
    );

    window.setTimeout(() => {
      closeSearchPanel({
        restoreFocus: false
      });

      scrollToSection(targetElement);

      window.history.replaceState(
        null,
        "",
        destination.selector
      );

      if (searchForm) {
        searchForm.reset();
      }

      setSearchMessage("");
    }, 350);
  }


  /* =======================================================
     25. SEARCH FORM SUBMISSION
     ======================================================= */

  if (searchForm && searchInput) {
    searchForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const searchTerm =
          searchInput.value.trim();

        if (searchTerm === "") {
          setSearchMessage(
            "Please enter a collection, product or story.",
            "error"
          );

          searchInput.focus();
          return;
        }

        const destination =
          findSearchDestination(searchTerm);

        if (!destination) {
          setSearchMessage(
            "No matching section was found. Try Women, Men, New Arrivals, Editorial or Boutique.",
            "error"
          );

          return;
        }

        openSearchDestination(destination);
      }
    );


    searchInput.addEventListener("input", () => {
      if (
        searchMessage &&
        searchMessage.textContent !== ""
      ) {
        setSearchMessage("");
      }
    });
  }


  /* =======================================================
     26. SEARCH SUGGESTION BUTTONS
     ======================================================= */

  searchSuggestions.forEach((suggestionButton) => {
    suggestionButton.addEventListener(
      "click",
      () => {
        const targetSelector =
          suggestionButton.dataset.searchTarget;

        if (
          !targetSelector ||
          !targetSelector.startsWith("#")
        ) {
          return;
        }

        const targetElement =
          document.querySelector(targetSelector);

        if (!targetElement) {
          setSearchMessage(
            "This section is currently unavailable.",
            "error"
          );

          return;
        }

        closeSearchPanel({
          restoreFocus: false
        });

        scrollToSection(targetElement);

        window.history.replaceState(
          null,
          "",
          targetSelector
        );
      }
    );
  });


  /* =======================================================
     27. SCROLL REVEAL ELEMENTS
     ======================================================= */

  const revealElements = document.querySelectorAll(
    [
      ".section-heading",
      ".collection-card",
      ".category-feature-card",
      ".product-card",
      ".editorial-feature__content",
      ".editorial-card",
      ".split-campaign__content",
      ".about-section__content",
      ".value-card",
      ".boutique-section__content",
      ".boutique-service",
      ".service-card",
      ".accessory-card",
      ".newsletter-section__content",
      ".newsletter-form"
    ].join(",")
  );

  const revealImageElements = document.querySelectorAll(
    [
      ".editorial-feature__media",
      ".split-campaign__media",
      ".about-section__media",
      ".boutique-section__media",
      ".boutique-gallery__item"
    ].join(",")
  );


  revealElements.forEach((element) => {
    element.classList.add("js-reveal");
  });


  revealImageElements.forEach((element) => {
    element.classList.add(
      "js-reveal",
      "js-reveal-image"
    );
  });


  /* =======================================================
     28. SCROLL REVEAL OBSERVER
     ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  function revealAllElementsImmediately() {
    document
      .querySelectorAll(".js-reveal")
      .forEach((element) => {
        element.classList.add("is-revealed");
      });
  }


  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealAllElementsImmediately();
  } else {
    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-revealed"
            );

            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px"
        }
      );


    document
      .querySelectorAll(".js-reveal")
      .forEach((element) => {
        revealObserver.observe(element);
      });
  }


  /* =======================================================
     29. INITIAL URL HASH
     ======================================================= */

  function handleInitialHash() {
    const currentHash = window.location.hash;

    if (
      !currentHash ||
      currentHash === "#"
    ) {
      return;
    }

    let targetElement = null;

    try {
      targetElement =
        document.querySelector(currentHash);
    } catch (error) {
      return;
    }

    if (!targetElement) {
      return;
    }

    window.setTimeout(() => {
      scrollToSection(targetElement);
    }, 850);
  }


  handleInitialHash();


  /* =======================================================
     30. IMAGE LOADING SAFEGUARD
     ======================================================= */

  const websiteImages =
    document.querySelectorAll("img");


  websiteImages.forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add("image-load-error");

        console.warn(
          `PRASAV image could not be loaded: ${image.getAttribute("src")}`
        );
      },
      { once: true }
    );
  });


  /* =======================================================
     31. PAGE VISIBILITY SAFEGUARD
     ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        document.visibilityState === "visible" &&
        siteHeader
      ) {
        siteHeader.classList.remove("is-hidden");
        updateHeaderState();
      }
    }
  );


  /* =======================================================
     32. FINAL INITIALISATION
     ======================================================= */

  document.documentElement.classList.add("js-enabled");

});
