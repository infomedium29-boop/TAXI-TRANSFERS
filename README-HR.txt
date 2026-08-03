TAXI & TRANSFERS KRK — UPUTE ZA OBJAVU
========================================

Sajt je spreman za statički hosting na GitHubu i Cloudflare Pages.

1. KONTAKT PODACI
Otvorite: assets/js/config.js
Unesite:
- phoneDisplay: broj koji se prikazuje na sajtu
- phoneLink: broj u međunarodnom formatu, npr. +385...
- whatsappNumber: samo znamenke, npr. 385...
- email: e-mail za rezervacije

2. SLANJE FORME
Najjednostavnije je dodati Web3Forms ključ u:
web3formsAccessKey: "VAŠ_ACCESS_KEY"

Ako ključ nije unesen, forma će koristiti WhatsApp ili e-mail iz konfiguracije.
Ako nisu uneseni ni kontakt podaci, forma kopira sadržaj upita u međuspremnik.

3. DOMENA I SEO
U svim datotekama trenutačno je postavljen placeholder:
https://your-domain.com

Prije indeksiranja zamijenite ga stvarnom domenom u svim HTML datotekama,
robots.txt i sitemap.xml. Najbrže je koristiti Find & Replace u VS Codeu.

4. JEZICI
- /hr/ hrvatski
- /en/ engleski
- /de/ njemački
- /sk/ slovački
- /pl/ poljski

5. FOTOGRAFIJE
Svi uključeni vizuali su u AVIF formatu u assets/images/.
To su premium generirani vizuali usklađeni s bojama logotipa.
Kasnije ih možete zamijeniti stvarnim fotografijama vozila pod istim nazivima datoteka.

6. CLOUDFLARE PAGES
Build command: ostavite prazno
Build output directory: /
Ako povezujete GitHub repozitorij, Cloudflare automatski objavljuje statičke datoteke.

7. VAŽNO PRIJE PREDAJE KLIJENTU
- unesite pravi broj telefona, WhatsApp i e-mail
- unesite Web3Forms ključ ili testirajte WhatsApp/e-mail fallback
- zamijenite your-domain.com stvarnom domenom
- testirajte svih 5 jezika i kontakt formu
- po potrebi zamijenite generirane vizuale stvarnim fotografijama vozila


AŽURIRANJE SADRŽAJA:
- Integrirane su vlasnikove ključne riječi i sadržaj na HR/EN/DE/SK/PL.
- Ažurirano je 11 SEO podstranica s jedinstvenim tekstom, naslovima, meta opisima i internim poveznicama.
- Početna stranica sadrži sve dostavljene destinacije, zračne luke, mjesta na Krku i prednosti usluge.
