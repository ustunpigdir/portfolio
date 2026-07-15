/*
 * Before publishing, replace the placeholder below with the public WhatsApp
 * number in international format: country code + number, without + or spaces.
 * Example format only: 34XXXXXXXXX
 */
const WHATSAPP_NUMBER = "34627485580";

const groupSizeInput = document.querySelector("#group-size");
const durationInputs = [...document.querySelectorAll('input[name="duration"]')];
const groupCountOutput = document.querySelector("#group-count");
const totalPriceOutput = document.querySelector("#total-price");
const perPersonOutput = document.querySelector("#per-person-price");
const whatsappLinks = [...document.querySelectorAll(".js-whatsapp")];
const configNotice = document.querySelector("#config-notice");
const floatingWhatsapp = document.querySelector(".floating-whatsapp");
const heroWhatsapp = document.querySelector(".hero-actions .js-whatsapp");

const numberIsConfigured = /^\d{8,15}$/.test(WHATSAPP_NUMBER);

function calculatePrice(groupSize, duration) {
  if (groupSize <= 4) return duration === 8 ? 250 : 150;
  if (groupSize <= 12) return duration === 8 ? 300 : 200;
  return null;
}

function selectedDuration() {
  return Number(durationInputs.find((input) => input.checked)?.value || 4);
}

function formatEuro(amount) {
  const hasDecimals = Math.abs(amount - Math.round(amount)) > 0.001;
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(amount);
}

function genericMessage() {
  return [
    "Merhaba Üstün, Barselona Türkçe turuyla ilgileniyorum.",
    "",
    "Tarih:",
    "Kişi sayısı:",
    "Görmek istediğim yerler:",
    "Çocuk varsa yaşları:",
    "Konaklayacağımız bölge:",
    "Eklemek istediğim not:",
  ].join("\n");
}

function routeMessage(route) {
  return [
    "Merhaba Üstün, Barselona turu hakkında bilgi almak istiyorum.",
    "",
    `İlgilendiğim rota: ${route}`,
    "Tarih:",
    "Kişi sayısı:",
    "Çocuk varsa yaşları:",
    "Konaklayacağımız bölge:",
  ].join("\n");
}

function placeMessage(place) {
  return [
    "Merhaba Üstün, Barselona turu hakkında bilgi almak istiyorum.",
    "",
    `İlgilendiğim yer: ${place}`,
    "Tarih:",
    "Kişi sayısı:",
    "Çocuk varsa yaşları:",
    "Konaklayacağımız bölge:",
  ].join("\n");
}

function calculatorMessage() {
  const groupSize = Number(groupSizeInput?.value || 4);
  const duration = selectedDuration();
  const totalPrice = calculatePrice(groupSize, duration);
  const displayedPrice =
    totalPrice === null
      ? "Sayfada gördüğüm fiyat: Lütfen iletişime geçin"
      : `Sayfada gördüğüm toplam fiyat: ${formatEuro(totalPrice)}`;

  return [
    "Merhaba Üstün, Barselona Türkçe turuyla ilgileniyorum.",
    "",
    `Kişi sayısı: ${groupSize >= 13 ? "13+" : groupSize}`,
    `Süre: ${duration} saat`,
    displayedPrice,
    "Tarih:",
    "Görmek istediğim yerler:",
    "Çocuk varsa yaşları:",
    "Konaklayacağımız bölge:",
  ].join("\n");
}

function messageForLink(link) {
  if (link.dataset.messageType === "calculator") {
    return calculatorMessage();
  }

  if (link.dataset.place) {
    return placeMessage(link.dataset.place);
  }

  if (link.dataset.route) {
    return routeMessage(link.dataset.route);
  }

  return genericMessage();
}

function updateWhatsappLinks() {
  whatsappLinks.forEach((link) => {
    const encodedMessage = encodeURIComponent(messageForLink(link));
    link.href = numberIsConfigured
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function updateCalculator() {
  const groupSize = Number(groupSizeInput.value);
  const duration = selectedDuration();
  const totalPrice = calculatePrice(groupSize, duration);

  groupCountOutput.textContent = groupSize >= 13 ? "13+" : String(groupSize);
  totalPriceOutput.textContent =
    totalPrice === null ? "İletişime geçin" : formatEuro(totalPrice);
  perPersonOutput.textContent =
    totalPrice === null ? "—" : formatEuro(totalPrice / groupSize);

  const progress = ((groupSize - 1) / 12) * 100;
  groupSizeInput.style.background = `linear-gradient(to right, #128c4a 0%, #128c4a ${progress}%, rgba(255,255,255,.18) ${progress}%, rgba(255,255,255,.18) 100%)`;

  updateWhatsappLinks();
}

if (groupSizeInput) {
  groupSizeInput.addEventListener("input", updateCalculator);
  durationInputs.forEach((input) => input.addEventListener("change", updateCalculator));
  updateCalculator();
} else {
  updateWhatsappLinks();
}

if (!numberIsConfigured) {
  whatsappLinks.forEach((link) => {
    link.addEventListener("click", () => {
      configNotice.hidden = false;
      window.setTimeout(() => {
        configNotice.hidden = true;
      }, 4200);
    });
  });
}

if (floatingWhatsapp && heroWhatsapp && "IntersectionObserver" in window) {
  const heroButtonObserver = new IntersectionObserver(
    ([entry]) => {
      floatingWhatsapp.classList.toggle("is-visible", !entry.isIntersecting);
    },
    { threshold: 0.15 },
  );

  heroButtonObserver.observe(heroWhatsapp);
} else if (floatingWhatsapp) {
  floatingWhatsapp.classList.add("is-visible");
}
