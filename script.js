"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const PHOTO_FILES = ['01.jpg', '02.JPEG', '03.JPEG', '04.JPEG', '05.JPEG', '06.JPEG', '07.JPEG', '08.JPEG', '09.JPEG', '10.jpg', '11.JPEG', '12.JPEG', '13.JPEG', '14.JPEG', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.JPEG', '20.JPEG', '21.JPEG', '22.JPEG', '23.JPEG', '24.JPEG', '25.JPG', '26.JPG', '27.jpg', '28.jpg', '29.jpg', '30.JPG', '31.JPG', '32.JPG', '33.JPG', '34.JPG', '35.JPG', '36.JPG'];

  const photoNotes = [
  'Hayatımın dönüm noktası, seninle tanıştığım o gündü.',
  'Her hikâyenin bir ana karakteri olur. Bizim hikâyemizin hem yönetmeni hem de başrolü sensin.',
  'Hikâyemizin her satırında, bana güç veren o güzel gülüşün vardı.',
  'Karanlığımı aydınlatan o gülüşün, hikâyeme en güzel anlamı kattı.',
  'Baharın ilk çiçekleri gibi, hayatıma umut ve renk getirdin.',
  'En soğuk günlerimde bile, içimi ısıtan hep sen oldun.',
  'Seven sevdiğine benzer derler; senin sevdiğin şeyleri seninle paylaşmak en güzel mutluluklarımdan biri oldu.',
  'Bazı sürprizler hiç beklemediğimiz anda gelir; hayatımıza birlikte nice güzel sürprizler katalım.',
  'O gün “evet” demiştin... Bugün sorsam, yine benimle aynı geleceğe “evet” der misin?',
  'O gün sadece bir soruya değil, birlikte kuracağımız geleceğe de “evet” demiştin.',
  'Mor bir balon, güzel bir şehir ve sen… Daha güzel bir kare düşünemedim.',
  'Evlenmeden önce düşlediğimiz bu manzarada, birlikte yürümek nasip olan en güzel anlardan biri oldu.',
  'Sen yanımdayken sıradan bir mangal bile unutulmaz bir anıya dönüştü.',
  'Papatyalardan yaptığım o tacı sana takmak, hayalini kurduğum en güzel anlardan biriydi.',
  'O gün yaptığın yemeğin tadından önce, verdiğin emeği ve gözlerindeki mutluluğu hatırlıyorum. Yeni evimizde kurduğumuz o ilk sofra, seninle paylaşacağımız ömrün en sıcak ve en kıymetli başlangıçlarından biriydi.',
  'Ailenle tanışacağım gün heyecandan ayaklarımın bağı çözülmüştü. Sevdiğin mor çiçeklerden hazırlattığım o buketle yanına gelirken, belki de hikâyemizin en heyecanlı anlarından birini yaşıyordum.',
  'Bir davetiyede yazabilecek en güzel şeyin ikimizin ismi olması, benim için dünyalara bedeldi.',
  '“İçinizden kendileriyle huzur bulacağınız eşler yaratıp, aranızda muhabbet ve rahmet var etmesi, O’nun varlığının delillerindendir.”\n(Rum Suresi, 21)\n\nBizim kalplerimizi birleştiren Allah’a hamdolsun.',
  'Her baktığımda yüzümde aynı tebessüm oluşuyor.',
  'Seninle geçen zaman, en güzel yolculuğum oldu.',
  'Bazen mutluluk yalnızca yan yana durmaktır.',
  'Birlikte kurduğumuz hayal; Türkiye’nin her köşesini güzel anılarımızla doldurmaktı.',
  'Birlikte olduğumuz her gün yeni bir sayfa açıldı.',
  'Hikâyemizin en güzel yanı, hâlâ devam ediyor olması.',
  'Bir fotoğraf, binlerce güzel ayrıntı...',
  'Yüzümüzdeki gülüş, hayatımızdan hiç eksik olmasın.',
  'Rabbim, bizi bu mübarek yerde yan yana getirdiğin gibi, ömrümüz boyunca da birbirimize hayırlı birer eş eyle.',
  'Allah’ım, bizi bu mübarek topraklara yeniden kavuşmayı ve Kâbe’nin huzurunda tekrar yan yana dua etmeyi nasip eyle. Âmin.',
  'Biz hazırız; sıra Kahve Dünyası’nın Sivas’a gelmesinde.',
  'Bazı anlar hiç eskimez.',
  'O günün heyecanı hâlâ içimde.',
  'Hayatımıza attığımız en güzel imzalardan biri...',
  'Bütün yollar sonunda bizi birbirimize getirdi.',
  'Geçmişe baktığımda en çok bizi seviyorum.',
  'Birlikte büyüyen bir hikâyenin içindeyiz.',
  'Ve şimdi, yeni anılara doğru...'
  ];

  const intro = document.getElementById("intro");
  const startButton = document.getElementById("startButton");
  const mainContent = document.getElementById("mainContent");
  const gallery = document.getElementById("gallery");

  const backgroundMusic = document.getElementById("backgroundMusic");
  const firstDanceMusic = document.getElementById("firstDanceMusic");
  const soundButton = document.getElementById("soundButton");
  const soundIcon = document.getElementById("soundIcon");
  const memoryVideo = document.getElementById("memoryVideo");
  const danceButton = document.getElementById("danceButton");

  const finalSection = document.getElementById("finalSection");
  const heartRain = document.getElementById("heartRain");
  const secretHeart = document.getElementById("secretHeart");
  const secretMessage = document.getElementById("secretMessage");
  const closeSecret = document.getElementById("closeSecret");

  let currentPhotoIndex = 0;
  let musicEnabled = true;
  let musicWasPlayingBeforeVideo = false;
  let secretTapCount = 0;
  let secretTapTimer = null;
  let lightbox = null;

  function fadeAudio(audio, targetVolume, duration = 700) {
    if (!audio) return;
    const startVolume = audio.volume;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      audio.volume = startVolume + (targetVolume - startVolume) * progress;
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  async function beginExperience() {
    if (!intro || !mainContent) return;

    mainContent.classList.remove("hidden");
    intro.classList.add("is-leaving");

    setTimeout(() => {
      intro.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);

    if (backgroundMusic) {
      backgroundMusic.volume = 0;
      try {
        await backgroundMusic.play();
        fadeAudio(backgroundMusic, 0.72, 1200);
        musicEnabled = true;
        if (soundIcon) soundIcon.textContent = "♫";
      } catch (error) {
        musicEnabled = false;
        if (soundIcon) soundIcon.textContent = "♩";
        console.info("Arka plan müziği tarayıcı tarafından başlatılmadı.", error);
      }
    }
  }

  if (startButton) startButton.addEventListener("click", beginExperience);

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

  function createLightbox() {
    lightbox = document.createElement("div");
    lightbox.className = "lightbox is-dynamic";
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML = `
      <button class="close-lightbox" type="button" aria-label="Fotoğrafı kapat">×</button>
      <button class="lightbox-arrow lightbox-prev" type="button" aria-label="Önceki fotoğraf">‹</button>
      <div class="dynamic-lightbox-content">
        <img class="dynamic-lightbox-image" src="" alt="">
        <div class="dynamic-lightbox-info">
          <span class="dynamic-lightbox-counter"></span>
          <p class="dynamic-lightbox-caption"></p>
        </div>
      </div>
      <button class="lightbox-arrow lightbox-next" type="button" aria-label="Sonraki fotoğraf">›</button>
    `;

    document.body.appendChild(lightbox);

    lightbox.querySelector(".close-lightbox").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", showPreviousPhoto);
    lightbox.querySelector(".lightbox-next").addEventListener("click", showNextPhoto);

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  function updateLightbox() {
    if (!lightbox) return;

    const image = lightbox.querySelector(".dynamic-lightbox-image");
    const caption = lightbox.querySelector(".dynamic-lightbox-caption");
    const counter = lightbox.querySelector(".dynamic-lightbox-counter");

    image.src = `assets/photos/${PHOTO_FILES[currentPhotoIndex]}`;
    image.alt = `T&K anısı ${currentPhotoIndex + 1}`;
    caption.textContent = photoNotes[currentPhotoIndex] || "";
    counter.textContent = `${String(currentPhotoIndex + 1).padStart(2, "0")} / ${PHOTO_FILES.length}`;
  }

  function openLightbox(index) {
    if (!lightbox) createLightbox();
    currentPhotoIndex = index;
    updateLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showPreviousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + PHOTO_FILES.length) % PHOTO_FILES.length;
    updateLightbox();
  }

  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % PHOTO_FILES.length;
    updateLightbox();
  }

  function buildGallery() {
    if (!gallery) {
      console.error('HTML içinde id="gallery" alanı bulunamadı.');
      return;
    }

    gallery.innerHTML = "";

    PHOTO_FILES.forEach((fileName, index) => {
      const card = document.createElement("figure");
      card.className = "memory-card reveal";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${index + 1}. fotoğrafı tam ekran görüntüle`);

      const image = document.createElement("img");
      image.src = `assets/photos/${fileName}`;
      image.alt = `T&K anısı ${index + 1}`;
      image.loading = index < 4 ? "eager" : "lazy";
      image.decoding = "async";

      const caption = document.createElement("figcaption");
      caption.className = "memory-caption";

      const number = document.createElement("span");
      number.className = "memory-number";
      number.textContent = String(index + 1).padStart(2, "0");

      const note = document.createElement("p");
      note.className = "memory-note";
      note.textContent = photoNotes[index] || "";

      caption.append(number, note);
      card.append(image, caption);
      gallery.appendChild(card);

      image.addEventListener("error", () => {
        console.error("Fotoğraf bulunamadı:", image.src);
        card.style.display = "none";
      });

      card.addEventListener("click", () => openLightbox(index));
      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(index);
        }
      });

      revealObserver.observe(card);
    });
  }

  buildGallery();

  if (soundButton && backgroundMusic) {
    soundButton.addEventListener("click", async () => {
      if (backgroundMusic.paused) {
        backgroundMusic.volume = 0;
        try {
          await backgroundMusic.play();
          fadeAudio(backgroundMusic, 0.72);
          musicEnabled = true;
          if (soundIcon) soundIcon.textContent = "♫";
        } catch (error) {
          console.error("Müzik başlatılamadı:", error);
        }
      } else {
        fadeAudio(backgroundMusic, 0, 350);
        setTimeout(() => backgroundMusic.pause(), 380);
        musicEnabled = false;
        if (soundIcon) soundIcon.textContent = "♩";
      }
    });
  }

  if (memoryVideo && backgroundMusic) {
    memoryVideo.addEventListener("play", () => {
      musicWasPlayingBeforeVideo = !backgroundMusic.paused;
      if (musicWasPlayingBeforeVideo) {
        fadeAudio(backgroundMusic, 0, 300);
        setTimeout(() => backgroundMusic.pause(), 330);
      }
    });

    ["pause", "ended"].forEach(eventName => {
      memoryVideo.addEventListener(eventName, async () => {
        if (musicWasPlayingBeforeVideo && musicEnabled && (!firstDanceMusic || firstDanceMusic.paused)) {
          backgroundMusic.volume = 0;
          try {
            await backgroundMusic.play();
            fadeAudio(backgroundMusic, 0.72);
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
        fadeAudio(backgroundMusic, 0, 350);
        setTimeout(() => backgroundMusic.pause(), 380);
      }

      firstDanceMusic.currentTime = 0;
      firstDanceMusic.volume = 0;

      try {
        await firstDanceMusic.play();
        fadeAudio(firstDanceMusic, 0.9, 900);
        danceButton.textContent = "İlk Dansımız Başladı ♥";
      } catch (error) {
        danceButton.textContent = "İlk dans müziği bulunamadı";
        console.error(error);
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
      heartRain.appendChild(heart);
    }
  }

  if (finalSection) {
    const finalObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          createHeartRain();
          finalObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

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
      clearTimeout(secretTapTimer);
      secretTapTimer = setTimeout(() => secretTapCount = 0, 900);

      if (secretTapCount >= 3) {
        secretTapCount = 0;
        openSecretMessage();
      }
    });
  }

  if (closeSecret) closeSecret.addEventListener("click", closeSecretMessage);

  if (secretMessage) {
    secretMessage.addEventListener("click", event => {
      if (event.target === secretMessage) closeSecretMessage();
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeLightbox();
      closeSecretMessage();
    }

    if (lightbox?.classList.contains("is-open")) {
      if (event.key === "ArrowLeft") showPreviousPhoto();
      if (event.key === "ArrowRight") showNextPhoto();
    }
  });
});
