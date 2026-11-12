import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduzir) {
  document.documentElement.classList.add("anim");

  // Rolagem suave, sincronizada com o GSAP
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

  // Hero: entrada + parallax ao rolar
  const foto = document.querySelector("[data-hero-foto] img");
  gsap.from(foto, { scale: 1.15, opacity: 0, duration: 1.6, ease: "power3.out" });
  gsap.from(".hero__linha", { y: 40, opacity: 0, duration: 1.1, stagger: 0.12, delay: 0.3, ease: "power3.out" });
  gsap.to(foto, {
    yPercent: 12, scale: 1.06, ease: "none",
    scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to("[data-hero-texto]", {
    yPercent: -40, opacity: 0, ease: "none",
    scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "70% top", scrub: true },
  });

  // Convite: palavras acendem conforme a rolagem
  gsap.fromTo("[data-palavras] .palavra",
    { opacity: 0.12 },
    {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: "[data-palavras]", start: "top 80%", end: "bottom 45%", scrub: true },
    },
  );

  // Trajetória: trilho horizontal fixado
  const trilho = document.querySelector<HTMLElement>("[data-traj-trilho]");
  if (trilho) {
    const distancia = () => trilho.scrollWidth - window.innerWidth;
    const horizontal = gsap.to(trilho, {
      x: () => -distancia(), ease: "none",
      scrollTrigger: {
        trigger: "[data-traj]", start: "top top", end: () => `+=${distancia() * 1.4}`,
        pin: true, scrub: 1, invalidateOnRefresh: true,
      },
    });
    // Parallax das fotos dentro das molduras
    gsap.utils.toArray<HTMLElement>("[data-traj-img]").forEach((img) => {
      gsap.fromTo(img, { xPercent: -15 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: {
          trigger: img.closest(".traj__card"), containerAnimation: horizontal,
          start: "left right", end: "right left", scrub: true,
        },
      });
    });
  }

  // Entradas suaves
  gsap.utils.toArray<HTMLElement>("[data-revela]").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
