
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const startButton = document.getElementById("startButton");
  const mainContent = document.getElementById("mainContent");

  const backgroundMusic = document.getElementById("backgroundMusic");
  const firstDanceMusic = document.getElementById("firstDanceMusic");
  const soundButton = document.getElementById("soundButton");
  const soundIcon = document.getElementById("soundIcon");

  const gallery = document.getElementById("gallery");
  const memoryVideo = document.getElementById("memoryVideo");
  const danceButton = document.getElementById("danceButton");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeLightbox = document.getElementById("closeLightbox");

  const finalSection = document.getElementById("finalSection");
  const heartRain = document.getElementById("heartRain");

  const secretHeart = document.getElementById("secretHeart");
  const secretMessage = document.getElementById("secretMessage");
  const closeSecret = document.getElementById("closeSecret");

  const PHOTO_COUNT = 35;
  const PHOTO_EXTENSIONS = [
    "jpg", "jpeg", "png", "webp",
    "JPG", "JPEG", "PNG", "WEBP"
  ];

  let musicEnabled = true;
  let musicWasPlayingBeforeVideo = false;
  let secretTapCount = 0;
  let secretTapTimer = null;

  function fadeAudio(audio, targetVolume, duration = 800) {
    if (!audio) return;

    const initialVolume = Number.isFinite(audio.volume) ? audio.volume : 0;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      audio.volume = initialVolume + (targetVolume - initialVolume) * progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  async function startExperience() {
    if (!mainContent || !intro) return;

    mainContent.classList.remove("hidden");
    intro.classList.add("is-leaving");

    if (backgroundMusic) {
      backgroundMusic.volume = 0;

      try {
        await backgroundMusic.play();
        fadeAudio(backgroundMusic, 0.7, 1400);
        musicEnabled = true;

        if (soundIcon) soundIcon.textContent = "♫";
      } catch (error) {
        musicEnabled = false;
        if (soundIcon) soundIcon.textContent = "♩";
        console.info("Tarayıcı müziği otomatik başlatmadı.", error);
      }
    }

    window.setTimeout(() => {
      intro.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  }

  if (startButton) {
    startButton.addEventListener("click", startExperience);
  }

  if (soundButton && backgroundMusic) {
    soundButton.addEventListener("click", async () => {
      if (firstDanceMusic && !firstDanceMusic.paused) {
        firstDanceMusic.pause();
        firstDanceMusic.currentTime = 0;
      }

      if (backgroundMusic.paused) {
        backgroundMusic.volume = 0;

        try {
          await backgroundMusic.play();
          fadeAudio(backgroundMusic, 0.7, 600);
          musicEnabled = true;
          if (soundIcon) soundIcon.textContent = "♫";
        } catch (error) {
          console.error("Müzik başlatılamadı:", error);
        }
      } else {
        fadeAudio(backgroundMusic, 0, 400);

        window.setTimeout(() => {
          backgroundMusic.pause();
        }, 420);

        musicEnabled = false;
        if (soundIcon) soundIcon.textContent = "♩";
      }
    });
  }

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
  });

  function openLightbox(imageSource) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = imageSource;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightboxView() {
    if (!lightbox) return;

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  if (closeLightbox) {
    closeLightbox.addEventListener("click", closeLightboxView);
  }

  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) closeLightboxView();
    });
  }

  function addPhoto(index) {
    if (!gallery) return;

    const paddedNumber = String(index).padStart(2, "0");
    let extensionIndex = 0;

    const card = document.createElement("button");
    card.type = "button";
    card.className = "photo-card reveal";
    card.setAttribute("aria-label", `${index}. fotoğrafı büyüt`);

    if (index % 5 === 1) card.classList.add("tall");
    if (index % 7 === 0) card.classList.add("wide");

    const image = document.createElement("img");
    image.alt = `T&K anısı ${index}`;
    image.loading = "lazy";

    function tryNextExtension() {
      if (extensionIndex >= PHOTO_EXTENSIONS.length) {
        card.remove();
        return;
      }

      const extension = PHOTO_EXTENSIONS[extensionIndex];
      extensionIndex += 1;
      image.src = `assets/photos/${paddedNumber}.${extension}`;
    }

    image.addEventListener("load", () => {
      if (!card.isConnected) {
        card.appendChild(image);
        gallery.appendChild(card);
        revealObserver.observe(card);
      }
    });

    image.addEventListener("error", tryNextExtension);

    card.addEventListener("click", () => {
      openLightbox(image.src);
    });

    tryNextExtension();
  }

  for (let index = 1; index <= PHOTO_COUNT; index += 1) {
    addPhoto(index);
  }

  if (memoryVideo && backgroundMusic) {
    memoryVideo.addEventListener("play", () => {
      musicWasPlayingBeforeVideo = !backgroundMusic.paused;

      if (musicWasPlayingBeforeVideo) {
        fadeAudio(backgroundMusic, 0, 350);

        window.setTimeout(() => {
          backgroundMusic.pause();
        }, 380);
      }
    });

    ["pause", "ended"].forEach(eventName => {
      memoryVideo.addEventListener(eventName, async () => {
        if (
          musicWasPlayingBeforeVideo &&
          musicEnabled &&
          (!firstDanceMusic || firstDanceMusic.paused)
        ) {
          backgroundMusic.volume = 0;

          try {
            await backgroundMusic.play();
            fadeAudio(backgroundMusic, 0.7, 700);
          } catch (error) {
            console.info("Arka plan müziği devam ettirilemedi.", error);
          }
        }
      });
    });
  }

  if (danceButton && firstDanceMusic) {
    danceButton.addEventListener("click", async () => {
      if (backgroundMusic && !backgroundMusic.paused) {
        fadeAudio(backgroundMusic, 0, 400);

        window.setTimeout(() => {
          backgroundMusic.pause();
        }, 420);
      }

      firstDanceMusic.currentTime = 0;
      firstDanceMusic.volume = 0;

      try {
        await firstDanceMusic.play();
        fadeAudio(firstDanceMusic, 0.9, 900);
        danceButton.textContent = "İlk Dansımız Başladı ♥";
      } catch (error) {
        danceButton.textContent = "İlk dans müziği bulunamadı";
        console.error("İlk dans müziği başlatılamadı:", error);
      }
    });
  }

  function createHeartRain(amount = 55) {
    if (!heartRain) return;

    heartRain.innerHTML = "";

    for (let index = 0; index < amount; index += 1) {
      const heart = document.createElement("span");
      heart.className = "falling-heart";
      heart.textContent = Math.random() > 0.25 ? "♥" : "♡";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${12 + Math.random() * 22}px`;
      heart.style.animationDuration = `${3.5 + Math.random() * 4}s`;
      heart.style.animationDelay = `${Math.random() * 1.8}s`;
      heart.style.opacity = `${0.35 + Math.random() * 0.65}`;

      heartRain.appendChild(heart);
    }
  }

  if (finalSection) {
    const finalObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            createHeartRain();
            finalObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    finalObserver.observe(finalSection);
  }

  function openSecretMessage() {
    if (!secretMessage) return;

    secretMessage.classList.add("is-open");
    secretMessage.setAttribute("aria-hidden", "false");
    createHeartRain(80);
  }

  function closeSecretMessage() {
    if (!secretMessage) return;

    secretMessage.classList.remove("is-open");
    secretMessage.setAttribute("aria-hidden", "true");
  }

  if (secretHeart) {
    secretHeart.addEventListener("click", () => {
      secretTapCount += 1;

      window.clearTimeout(secretTapTimer);
      secretTapTimer = window.setTimeout(() => {
        secretTapCount = 0;
      }, 900);

      if (secretTapCount >= 3) {
        secretTapCount = 0;
        openSecretMessage();
      }
    });
  }

  if (closeSecret) {
    closeSecret.addEventListener("click", closeSecretMessage);
  }

  if (secretMessage) {
    secretMessage.addEventListener("click", event => {
      if (event.target === secretMessage) closeSecretMessage();
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeLightboxView();
      closeSecretMessage();
    }
  });
});
