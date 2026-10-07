(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealSelector = [
    ".city-card.photo-city-card",
    ".hotel-card",
    ".activity-card",
    ".ticket",
    ".ticket-import-box",
    ".food-section-link",
    ".food-card",
    ".place-ticket",
    ".restaurant-ticket",
    ".city-accordion",
    ".program-item",
    ".program-transfer-row"
  ].join(",");

  let revealObserver = null;
  let mutationObserver = null;
  let parallaxTicking = false;

  function revealImmediately(root = document) {
    const nodes = [];
    if (root.nodeType === 1 && root.matches?.(revealSelector)) nodes.push(root);
    root.querySelectorAll?.(revealSelector).forEach((el) => nodes.push(el));
    nodes.forEach((el) => {
      el.classList.add("motion-reveal", "motion-visible");
      el.dataset.motionReveal = "1";
    });
  }

  function registerReveal(root = document) {
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealImmediately(root);
      return;
    }

    const nodes = [];
    if (root.nodeType === 1 && root.matches?.(revealSelector)) nodes.push(root);
    root.querySelectorAll?.(revealSelector).forEach((el) => nodes.push(el));

    nodes.forEach((el, index) => {
      if (el.dataset.motionReveal === "1") return;
      el.dataset.motionReveal = "1";
      el.classList.add("motion-reveal");
      el.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 45}ms`);
      revealObserver.observe(el);
    });
  }

  function updateHeroParallax() {
    parallaxTicking = false;
    const hero = document.querySelector("#screen-city-detail.active .city-header.photo-city-header");
    if (!hero) return;

    if (reducedMotion.matches) {
      hero.style.setProperty("--hero-parallax-y", "0px");
      return;
    }

    const rect = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.bottom < -40 || rect.top > viewportHeight + 40) return;

    const offset = Math.max(-18, Math.min(18, (-rect.top + 22) * 0.075));
    hero.style.setProperty("--hero-parallax-y", `${offset.toFixed(1)}px`);
  }

  function requestParallax() {
    if (parallaxTicking) return;
    parallaxTicking = true;
    requestAnimationFrame(updateHeroParallax);
  }

  function initObservers() {
    revealObserver?.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("motion-visible");
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -24px 0px"
    });

    registerReveal(document);

    mutationObserver?.disconnect();
    mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === 1) registerReveal(node);
        });
      });
      requestParallax();
    });

    const app = document.getElementById("app");
    if (app) mutationObserver.observe(app, { childList: true, subtree: true });
  }

  reducedMotion.addEventListener?.("change", () => {
    if (reducedMotion.matches) revealImmediately(document);
    else initObservers();
    requestParallax();
  });

  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax, { passive: true });
  window.addEventListener("hashchange", () => requestAnimationFrame(requestParallax));

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initObservers();
      requestParallax();
    }, { once: true });
  } else {
    initObservers();
    requestParallax();
  }
})();

/* V31 · shared city transition + bottom-nav polish */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let sharedBusy = false;

  function syncTabPill(){
    const nav = document.querySelector("nav.tabbar");
    if(!nav) return;
    nav.classList.add("motion-nav");
    const active = Array.from(nav.querySelectorAll("button.active"))
      .find(btn => !btn.hidden && btn.getClientRects().length);
    if(!active) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = active.getBoundingClientRect();
    nav.style.setProperty("--motion-pill-left", `${(btnRect.left-navRect.left).toFixed(1)}px`);
    nav.style.setProperty("--motion-pill-width", `${btnRect.width.toFixed(1)}px`);
    nav.classList.add("motion-nav-ready");
  }

  function initTabPill(){
    const nav = document.querySelector("nav.tabbar");
    if(!nav) return;
    syncTabPill();
    const observer = new MutationObserver(() => requestAnimationFrame(syncTabPill));
    observer.observe(nav,{subtree:true,attributes:true,attributeFilter:["class","hidden"]});
    nav.addEventListener("click",() => requestAnimationFrame(syncTabPill),{passive:true});
    window.addEventListener("resize",syncTabPill,{passive:true});
  }

  document.addEventListener("click", (event) => {
    const card = event.target.closest?.(".city-card.photo-city-card");
    if(!card || !card.dataset.leg) return;
    if(event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if(reduced.matches || typeof document.startViewTransition !== "function" || typeof window.openCity !== "function") return;

    event.preventDefault();
    event.stopImmediatePropagation();
    if(sharedBusy) return;
    sharedBusy = true;

    let hero = null;
    const cleanup = () => {
      card.style.removeProperty("view-transition-name");
      hero?.style.removeProperty("view-transition-name");
      document.documentElement.classList.remove("city-shared-transition");
      sharedBusy = false;
      requestAnimationFrame(syncTabPill);
    };

    card.style.viewTransitionName = "city-card-shared";
    document.documentElement.classList.add("city-shared-transition");

    try{
      const transition = document.startViewTransition(() => {
        window.openCity(card.dataset.leg);
        hero = document.querySelector("#screen-city-detail.active .city-header.photo-city-header");
        if(hero) hero.style.viewTransitionName = "city-card-shared";
      });
      transition.finished.catch(() => {}).finally(cleanup);
    }catch(_){
      cleanup();
      window.openCity(card.dataset.leg);
    }
  }, true);

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",initTabPill,{once:true});
  }else{
    initTabPill();
  }
})();
