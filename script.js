const PHOTO_COUNT = 36;

const PHOTO_EXTENSIONS = [
  "jpg", "jpeg", "png", "webp",
  "JPG", "JPEG", "PNG", "WEBP"
];

const photoNotes = [
  "Hayatımın dönüm noktası, seninle tanıştığım o gündü.",
  "Her hikâyenin bir ana karakteri olur. Bizim hikâyemizin hem yönetmeni hem de başrolü sensin.",
  "Hikâyemizin her satırında, bana güç veren o güzel gülüşün vardı.",
  "Karanlığımı aydınlatan o gülüşün, hikâyeme en güzel anlamı kattı.",
  "Baharın ilk çiçekleri gibi, hayatıma umut ve renk getirdin.",
  "En soğuk günlerimde bile, içimi ısıtan hep sen oldun.",
  "Seven sevdiğine benzer derler; senin sevdiğin şeyleri seninle paylaşmak en güzel mutluluklarımdan biri oldu.",
  "Bazı sürprizler hiç beklemediğimiz anda gelir; hayatımıza birlikte nice güzel sürprizler katalım.",
  "O gün “evet” demiştin... Bugün sorsam, yine benimle aynı geleceğe “evet” der misin?",
  "O gün sadece bir soruya değil, birlikte kuracağımız geleceğe de “evet” demiştin.",
  "Mor bir balon, güzel bir şehir ve sen… Daha güzel bir kare düşünemedim.",
  "Evlenmeden önce düşlediğimiz bu manzarada, birlikte yürümek nasip olan en güzel anlardan biri oldu.",
  "Sen yanımdayken sıradan bir mangal bile unutulmaz bir anıya dönüştü.",
  "Papatyalardan yaptığım o tacı sana takmak, hayalini kurduğum en güzel anlardan biriydi.",
  "O gün yaptığın yemeğin tadından önce, verdiğin emeği ve gözlerindeki mutluluğu hatırlıyorum. Yeni evimizde kurduğumuz o ilk sofra, seninle paylaşacağımız ömrün en sıcak ve en kıymetli başlangıçlarından biriydi.",
  "Ailenle tanışacağım gün heyecandan ayaklarımın bağı çözülmüştü. Sevdiğin mor çiçeklerden hazırlattığım o buketle yanına gelirken, belki de hikâyemizin en heyecanlı anlarından birini yaşıyordum.",
  "Bir davetiyede yazabilecek en güzel şeyin ikimizin ismi olması, benim için dünyalara bedeldi.",
  "“İçinizden kendileriyle huzur bulacağınız eşler yaratıp, aranızda muhabbet ve rahmet var etmesi, O’nun varlığının delillerindendir.”\n(Rum Suresi, 21)\n\nBizim kalplerimizi birleştiren Allah’a hamdolsun.",
  "Her baktığımda yüzümde aynı tebessüm oluşuyor.",
  "Seninle geçen zaman, en güzel yolculuğum oldu.",
  "Bazen mutluluk yalnızca yan yana durmaktır.",
  "Birlikte kurduğumuz hayal; Türkiye’nin her köşesini güzel anılarımızla doldurmaktı.",
  "Birlikte olduğumuz her gün yeni bir sayfa açıldı.",
  "Hikâyemizin en güzel yanı, hâlâ devam ediyor olması.",
  "Bir fotoğraf, binlerce güzel ayrıntı...",
  "Yüzümüzdeki gülüş, hayatımızdan hiç eksik olmasın.",
  "Rabbim, bizi bu mübarek yerde yan yana getirdiğin gibi, ömrümüz boyunca da birbirimize hayırlı birer eş eyle.",
  "Allah’ım, bizi bu mübarek topraklara yeniden kavuşmayı ve Kâbe’nin huzurunda tekrar yan yana dua etmeyi nasip eyle. Âmin.",
  "Biz hazırız; sıra Kahve Dünyası’nın Sivas’a gelmesinde.",
  "Bazı anlar hiç eskimez.",
  "O günün heyecanı hâlâ içimde.",
  "Hayatımıza attığımız en güzel imzalardan biri...",
  "Bütün yollar sonunda bizi birbirimize getirdi.",
  "Geçmişe baktığımda en çok bizi seviyorum.",
  "Birlikte büyüyen bir hikâyenin içindeyiz.",
  "Ve şimdi, yeni anılara doğru..."
];

const intro = document.getElementById("intro");
const experience = document.getElementById("experience");
const startBtn = document.getElementById("startBtn");
const gallery = document.getElementById("gallery");
const progressBar = document.getElementById("progressBar");
const memoryVideo = document.getElementById("memoryVideo");
const videoCover = document.getElementById("videoCover");
const watchVideoBtn = document.getElementById("watchVideoBtn");
const firstDance = document.getElementById("firstDance");
const musicBtn = document.getElementById("musicBtn");

function loadPhoto(image, index, card) {
  const fileName = String(index).padStart(2, "0");
  let attempt = 0;

  function tryNextExtension() {
    if (attempt >= PHOTO_EXTENSIONS.length) {
      card.style.display = "none";
      console.warn(`Fotoğraf bulunamadı: ${fileName}`);
      return;
    }

    const extension = PHOTO_EXTENSIONS[attempt];
    attempt += 1;
    image.src = `./assets/photos/${fileName}.${extension}`;
  }

  image.onerror = tryNextExtension;
  tryNextExtension();
}

function buildGallery() {
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= PHOTO_COUNT; i += 1) {
    const card = document.createElement("figure");
    card.className = "memory-card reveal";

    const image = document.createElement("img");
    image.alt = `Birlikte biriktirdiğimiz anı ${i}`;
    image.loading = i <= 4 ? "eager" : "lazy";
    image.decoding = "async";

    const caption = document.createElement("figcaption");
    caption.className = "memory-caption";

    const number = document.createElement("span");
    number.className = "memory-number";
    number.textContent = String(i).padStart(2, "0");

    const note = document.createElement("p");
    note.className = "memory-note";
    note.textContent = photoNotes[i - 1] || "";

    caption.append(number, note);
    card.append(image, caption);
    fragment.appendChild(card);

    loadPhoto(image, i, card);
  }

  gallery.innerHTML = "";
  gallery.appendChild(fragment);
}

function activateRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
}

function startExperience() {
  if (navigator.vibrate) navigator.vibrate(55);

  intro.classList.add("is-hidden");
  experience.classList.remove("is-locked");

  setTimeout(() => {
    document.querySelector(".quote-screen").scrollIntoView({ behavior: "smooth" });
  }, 500);
}

async function startVideo() {
  try {
    videoCover.classList.add("is-hidden");
    await memoryVideo.play();
  } catch (error) {
    videoCover.classList.remove("is-hidden");
  }
}

async function toggleMusic() {
  try {
    if (firstDance.paused) {
      await firstDance.play();
      musicBtn.textContent = "Müziği durdur";
    } else {
      firstDance.pause();
      musicBtn.textContent = "İlk dansımızı başlat";
    }
  } catch (error) {
    musicBtn.textContent = "Tekrar dokun ve müziği başlat";
  }
}

memoryVideo.addEventListener("play", () => {
  videoCover.classList.add("is-hidden");

  if (!firstDance.paused) {
    firstDance.pause();
    musicBtn.textContent = "İlk dansımızı başlat";
  }
});

memoryVideo.addEventListener("ended", () => {
  videoCover.classList.remove("is-hidden");
});

startBtn.addEventListener("click", startExperience);
watchVideoBtn.addEventListener("click", startVideo);
musicBtn.addEventListener("click", toggleMusic);
window.addEventListener("scroll", updateProgress, { passive: true });

buildGallery();
activateRevealObserver();
updateProgress();
