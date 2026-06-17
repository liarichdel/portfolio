document.addEventListener("DOMContentLoaded", () => {

  const phrases = [
    "Interested in AI, ML and Blockchain",
    "I do graphic design on the side",
    "Archery as a hobby",
    "I love exploring some new things"
  ];
  let pIdx = 0, cIdx = 0, deleting = false;
  const typeEl = document.querySelector(".text-animation span");

  if (typeEl) {
    // disable CSS pseudo animation so JS takes over
    const noAnim = document.createElement("style");
    noAnim.textContent = `.text-animation span::before{content:none!important;animation:none!important;}`;
    document.head.appendChild(noAnim);

    // real text node and cursor
    const textNode = document.createTextNode("");
    const cur = document.createElement("span");
    cur.textContent = "|";
    cur.style.cssText = "animation:blink .65s step-end infinite;margin-left:1px;";
    const blinkCSS = document.createElement("style");
    blinkCSS.textContent = `@keyframes blink{50%{opacity:0}}`;
    document.head.appendChild(blinkCSS);
    typeEl.appendChild(textNode);
    typeEl.appendChild(cur);

    function tick() {
      const current = phrases[pIdx];
      if (!deleting) {
        textNode.textContent = current.slice(0, ++cIdx);
        if (cIdx === current.length) { deleting = true; setTimeout(tick, 1800); return; }
      } else {
        textNode.textContent = current.slice(0, --cIdx);
        if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
      }
      setTimeout(tick, deleting ? 40 : 70);
    }
    tick();
  }


  // Hamburger 
  const header  = document.querySelector("header");
  const navbar  = document.querySelector(".navbar");

  // burger button
  const burger = document.createElement("button");
  burger.className = "burger";
  burger.setAttribute("aria-label", "Toggle menu");
  burger.innerHTML = "<span></span><span></span><span></span>";
  header.appendChild(burger);

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.querySelector(".container").appendChild(overlay);

  function closeMenu() {
    navbar.classList.remove("open");
    burger.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");
    burger.classList.toggle("open", isOpen);
    overlay.classList.toggle("show", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  overlay.addEventListener("click", closeMenu);
  document.querySelectorAll(".navbar a").forEach(a =>
    a.addEventListener("click", closeMenu)
  );


  // Header glass on scroll 
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });


  // Smooth scroll
  document.querySelectorAll(".navbar a[href^='#']").forEach(a => {
    const href = a.getAttribute("href");
    if (href.length > 1) {
      a.addEventListener("click", e => {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
      });
    }
  });


  //Social icon hover lift
  document.querySelectorAll(".download-social a").forEach(a => {
    a.addEventListener("mouseenter", () => a.style.transform = "translateY(-4px)");
    a.addEventListener("mouseleave", () => a.style.transform = "");
  });


  //Scroll-reveal elements 
  const revealCSS = document.createElement("style");
  revealCSS.textContent = `
    .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease;}
    .reveal.visible{opacity:1;transform:translateY(0);}
  `;
  document.head.appendChild(revealCSS);

  const revealTargets = document.querySelectorAll(
    ".home-detail, .home-img, .page-heading, .about-grid, .timeline-item, .project-card, .empty-state"
  );
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); ro.unobserve(e.target); }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i * 0.1, 0.5)}s`;
    ro.observe(el);
  });


  // Back-to-top button
  const topBtn = document.createElement("button");
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = `<i class="ri-arrow-up-s-line"></i>`;
  topBtn.style.cssText = `
    position:fixed;bottom:28px;right:28px;
    width:44px;height:44px;border-radius:50%;
    background:#9dc7f0;color:#000;border:none;
    font-size:22px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 4px 16px rgba(157,199,240,.5);
    opacity:0;transform:translateY(14px);pointer-events:none;
    transition:opacity .3s,transform .3s,background .3s;z-index:300;
  `;
  topBtn.addEventListener("mouseenter", () => topBtn.style.background = "#7ab3e8");
  topBtn.addEventListener("mouseleave", () => topBtn.style.background = "#9dc7f0");
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 300;
    topBtn.style.opacity = show ? "1" : "0";
    topBtn.style.transform = show ? "translateY(0)" : "translateY(14px)";
    topBtn.style.pointerEvents = show ? "all" : "none";
  }, { passive: true });

});
