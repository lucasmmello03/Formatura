import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
// No celular, a barra de endereço aparece/some e muda a altura da tela:
// sem isso o ScrollTrigger recalcula tudo no meio da rolagem e a página "pula".
ScrollTrigger.config({ ignoreMobileResize: true });

const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mouse = window.matchMedia("(pointer: fine)").matches;

/* ---------- Carrossel da trajetória (celular): pontos indicadores ---------- */
const trilho = document.querySelector<HTMLElement>("[data-traj-trilho]");
const pontos = document.querySelectorAll<HTMLElement>("[data-traj-pontos] span");
if (trilho && pontos.length) {
  const cards = [...trilho.querySelectorAll<HTMLElement>(".traj__card")];
  let pendente = false;
  trilho.addEventListener(
    "scroll",
    () => {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(() => {
        pendente = false;
        const base = trilho.getBoundingClientRect().left;
        let ativo = 0;
        let menor = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.getBoundingClientRect().left - base);
          if (d < menor) { menor = d; ativo = i; }
        });
        pontos.forEach((p, i) => p.classList.toggle("ativo", i === ativo));
      });
    },
    { passive: true },
  );
}

/* ---------- Entradas suaves (nativo, não depende do GSAP) ---------- */
const revelar = document.querySelectorAll<HTMLElement>("[data-revela]");
if (!reduzir && "IntersectionObserver" in window) {
  document.documentElement.classList.add("anim");
  const io = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  revelar.forEach((el) => io.observe(el));
}

if (!reduzir) {
  /* ---------- Rolagem suave: só com mouse (no toque fica a rolagem nativa) ---------- */
  if (mouse) {
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        lenis.scrollTo(a.getAttribute("href")!);
      }),
    );
  }

  /* ---------- Abertura: entrada + parallax leve ---------- */
  const foto = document.querySelector("[data-hero-foto] img");
  gsap.from(foto, { scale: 1.12, opacity: 0, duration: 1.4, ease: "power3.out" });
  gsap.from(".hero__linha", { y: 32, opacity: 0, duration: 1, stagger: 0.1, delay: 0.25, ease: "power3.out" });
  gsap.to(foto, {
    yPercent: 10, ease: "none",
    scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to("[data-hero-texto]", {
    yPercent: -30, opacity: 0, ease: "none",
    scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "70% top", scrub: true },
  });

  /* ---------- Convite: palavras acendem conforme a rolagem ---------- */
  gsap.fromTo("[data-palavras] .palavra",
    { opacity: 0.15 },
    {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: "[data-palavras]", start: "top 80%", end: "bottom 45%", scrub: true },
    },
  );

  /* ---------- Trajetória fixada com rolagem horizontal: só no computador ---------- */
  const mm = gsap.matchMedia();
  mm.add("(min-width: 900px) and (pointer: fine)", () => {
    const faixa = document.querySelector<HTMLElement>("[data-traj-faixa]");
    if (!faixa) return;
    document.documentElement.classList.add("traj-pin");

    const distancia = () => faixa.scrollWidth - window.innerWidth;
    const horizontal = gsap.to(faixa, {
      x: () => -distancia(), ease: "none",
      scrollTrigger: {
        trigger: "[data-traj]", start: "top top", end: () => `+=${distancia() * 1.2}`,
        pin: true, scrub: 1, invalidateOnRefresh: true,
      },
    });
    gsap.utils.toArray<HTMLElement>("[data-traj-img]").forEach((img) => {
      gsap.fromTo(img, { xPercent: -15 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: {
          trigger: img.closest(".traj__card"), containerAnimation: horizontal,
          start: "left right", end: "right left", scrub: true,
        },
      });
    });
    ScrollTrigger.refresh();

    return () => document.documentElement.classList.remove("traj-pin");
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
