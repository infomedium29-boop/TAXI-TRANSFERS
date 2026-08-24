(() => {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const html = document.documentElement;
  const lang = html.lang || "en";

  const messages = {
    hr: {
      missing: "Kontakt podaci još nisu uneseni. Sažetak upita kopiran je u međuspremnik.",
      copied: "Upit je kopiran. Pošaljite ga putem telefona, poruke ili e-maila.",
      sent: "Hvala! Vaš upit je uspješno poslan.",
      error: "Slanje trenutno nije uspjelo. Pokušajte ponovno ili nas kontaktirajte izravno.",
      required: "Molimo ispunite obavezna polja.",
      call: "Nazovi",
      whatsapp: "WhatsApp",
      whatsappOpened: "Otvaramo WhatsApp s pripremljenim podacima rezervacije."
    },
    en: {
      missing: "Contact details have not been configured yet. Your booking summary was copied to the clipboard.",
      copied: "Your request was copied. Send it by phone, message or email.",
      sent: "Thank you! Your request was sent successfully.",
      error: "The request could not be sent. Please try again or contact us directly.",
      required: "Please complete the required fields.",
      call: "Call",
      whatsapp: "WhatsApp",
      whatsappOpened: "Opening WhatsApp with your booking details."
    },
    de: {
      missing: "Die Kontaktdaten sind noch nicht eingerichtet. Ihre Anfrage wurde in die Zwischenablage kopiert.",
      copied: "Ihre Anfrage wurde kopiert. Senden Sie sie per Telefon, Nachricht oder E-Mail.",
      sent: "Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.",
      error: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
      required: "Bitte füllen Sie alle Pflichtfelder aus.",
      call: "Anrufen",
      whatsapp: "WhatsApp",
      whatsappOpened: "WhatsApp wird mit Ihren Buchungsdaten geöffnet."
    },
    sk: {
      missing: "Kontaktné údaje ešte nie sú nastavené. Súhrn objednávky bol skopírovaný do schránky.",
      copied: "Vaša požiadavka bola skopírovaná. Odošlite ju telefonicky, správou alebo e-mailom.",
      sent: "Ďakujeme! Vaša požiadavka bola úspešne odoslaná.",
      error: "Požiadavku sa nepodarilo odoslať. Skúste to znova alebo nás kontaktujte priamo.",
      required: "Vyplňte, prosím, povinné polia.",
      call: "Zavolať",
      whatsapp: "WhatsApp",
      whatsappOpened: "Otvárame WhatsApp s údajmi vašej rezervácie."
    },
    pl: {
      missing: "Dane kontaktowe nie zostały jeszcze skonfigurowane. Podsumowanie rezerwacji skopiowano do schowka.",
      copied: "Zapytanie zostało skopiowane. Wyślij je telefonicznie, wiadomością lub e-mailem.",
      sent: "Dziękujemy! Zapytanie zostało wysłane.",
      error: "Nie udało się wysłać zapytania. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.",
      required: "Uzupełnij wymagane pola.",
      call: "Zadzwoń",
      whatsapp: "WhatsApp",
      whatsappOpened: "Otwieramy WhatsApp z danymi rezerwacji."
    }
  };
  const msg = messages[lang] || messages.en;

  const siteHeader = document.querySelector(".site-header");
  const updateFloatingHeader = () => {
    if (siteHeader) siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  updateFloatingHeader();
  window.addEventListener("scroll", updateFloatingHeader, { passive: true });

  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  };
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const langBox = document.querySelector(".lang");
  const langButton = document.querySelector(".lang-button");
  if (langBox && langButton) {
    langButton.addEventListener("click", (event) => {
      event.stopPropagation();
      langBox.classList.toggle("open");
      langButton.setAttribute("aria-expanded", langBox.classList.contains("open"));
    });
    document.addEventListener("click", () => {
      langBox.classList.remove("open");
      langButton.setAttribute("aria-expanded", "false");
    });
  }

  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", isOpen);
      answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : "0px";
    });
  });

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }), { threshold: .12 })
    : null;
  document.querySelectorAll(".reveal").forEach(el => observer ? observer.observe(el) : el.classList.add("visible"));

  function normalizePhone(value) {
    return String(value || "").replace(/[^0-9+]/g, "");
  }

  function hydrateContacts() {
    const phoneText = cfg.phoneDisplay || "—";
    document.querySelectorAll("[data-contact-phone-text]").forEach(el => el.textContent = phoneText);
    document.querySelectorAll("[data-contact-email-text]").forEach(el => el.textContent = cfg.email || "—");

    document.querySelectorAll("[data-contact-phone]").forEach(el => {
      if (cfg.phoneLink) el.href = `tel:${normalizePhone(cfg.phoneLink)}`;
      else el.href = "#booking";
    });
    document.querySelectorAll("[data-contact-email]").forEach(el => {
      if (cfg.email) el.href = `mailto:${cfg.email}`;
      else el.href = "#booking";
    });
    document.querySelectorAll("[data-contact-whatsapp]").forEach(el => {
      if (cfg.whatsappNumber) {
        el.href = `https://wa.me/${String(cfg.whatsappNumber).replace(/\D/g, "")}`;
        el.target = "_blank";
        el.rel = "noopener";
      } else {
        el.href = "#booking";
      }
    });
  }
  hydrateContacts();

  function isSmartphone() {
    if (navigator.userAgentData && typeof navigator.userAgentData.mobile === "boolean") {
      return navigator.userAgentData.mobile;
    }
    return /Android.*Mobile|iPhone|iPod|Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || "");
  }

  function buildSummary(form) {
    const fd = new FormData(form);
    const labels = {
      pickup: form.querySelector('[name="pickup"]')?.closest('.field')?.querySelector('label')?.textContent || "Pickup",
      destination: form.querySelector('[name="destination"]')?.closest('.field')?.querySelector('label')?.textContent || "Destination",
      date: form.querySelector('[name="date"]')?.closest('.field')?.querySelector('label')?.textContent || "Date",
      time: form.querySelector('[name="time"]')?.closest('.field')?.querySelector('label')?.textContent || "Time",
      passengers: form.querySelector('[name="passengers"]')?.closest('.field')?.querySelector('label')?.textContent || "Passengers",
      payment: form.querySelector('[name="payment"]')?.closest('.field')?.querySelector('label')?.textContent || "Payment method",
      name: form.querySelector('[name="name"]')?.closest('.field')?.querySelector('label')?.textContent || "Name",
      phone: form.querySelector('[name="phone"]')?.closest('.field')?.querySelector('label')?.textContent || "Phone",
      email: form.querySelector('[name="email"]')?.closest('.field')?.querySelector('label')?.textContent || "Email",
      message: form.querySelector('[name="message"]')?.closest('.field')?.querySelector('label')?.textContent || "Message"
    };
    const lines = [`${cfg.companyName || "Taxi & Transfers Krk"} — booking request`];
    Object.keys(labels).forEach(key => {
      const value = fd.get(key);
      if (value) lines.push(`${labels[key]}: ${value}`);
    });
    return lines.join("\n");
  }

  function setStatus(form, text, type = "success") {
    const status = form.querySelector(".form-status");
    if (!status) return;
    status.textContent = text;
    status.className = `form-status show ${type}`;
  }

  document.querySelectorAll("form[data-booking-form]").forEach(form => {
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) dateInput.min = new Date().toISOString().slice(0,10);

    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (!form.reportValidity()) {
        setStatus(form, msg.required, "error");
        return;
      }
      const summary = buildSummary(form);
      const submitButton = form.querySelector('[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        // On smartphones keep the existing WhatsApp booking flow.
        if (isSmartphone() && cfg.whatsappNumber) {
          window.open(`https://wa.me/${String(cfg.whatsappNumber).replace(/\D/g, "")}?text=${encodeURIComponent(summary)}`, "_blank", "noopener");
          setStatus(form, msg.whatsappOpened || msg.copied, "success");
        // On desktop / PC (and tablets) submit directly to the owner's email via Web3Forms.
        } else if (cfg.web3formsAccessKey) {
          const data = new FormData(form);
          data.append("access_key", cfg.web3formsAccessKey);
          data.append("subject", cfg.bookingEmailSubject || "Nova rezervacija – Taxi Krk");
          data.append("from_name", cfg.bookingEmailSender || "Taxi Krk – Rezervacije");
          data.append("booking_summary", summary);
          const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
          const result = await response.json();
          if (!result.success) throw new Error("web3forms_error");
          form.reset();
          setStatus(form, msg.sent, "success");
        } else if (cfg.email) {
          window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(cfg.bookingEmailSubject || "Nova rezervacija – Taxi Krk")}&body=${encodeURIComponent(summary)}`;
          setStatus(form, msg.copied, "success");
        } else if (cfg.whatsappNumber) {
          window.open(`https://wa.me/${String(cfg.whatsappNumber).replace(/\D/g, "")}?text=${encodeURIComponent(summary)}`, "_blank", "noopener");
          setStatus(form, msg.whatsappOpened || msg.copied, "success");
        } else {
          await navigator.clipboard.writeText(summary);
          setStatus(form, msg.missing, "success");
        }
      } catch (error) {
        try { await navigator.clipboard.writeText(summary); } catch (_) {}
        setStatus(form, msg.error, "error");
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  });

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
