
# Titel

Boekzoeker  Embassy of the Free Mind  
Een makkelijke manier om boeken te zoeken in de collectie van de Embassy of the Free Mind.

## Inhoudsopgave

[label](http://localhost:8000/assets/images/art.avif)

[Beschrijving](#beschrijving)
  
[Gebruik](#gebruik)
  
[Kenmerken](#kenmerken)
  
[Installatie](#installatie)
  
[Bronnen](#bronnen)
  
[Licentie](#licentie)

## Beschrijving

Dit project is een interactieve webapplicatie waarmee gebruikers door de digitale boekencollectie van de Embassy of the Free Mind kunnen zoeken en filteren.
Het concept is  ontwikkeld met Liquid templates, Node.js en een externe API.

 [Live demo bekijken](https://proof-of-concept-zr3g.onrender.com)

 [Bekijk de demo-video (MP4)](./public/assets/images/video.mp4)

## Gebruik

Gebruikers kunnen:

- **Zoeken** op titel, auteur, plaats of jaar

- **Boekdetails** bekijken in een overlay

- **Wissele**n tussen verschillende weergaven (lijst/tabel)

## Kenmerken

- **HTML**: Semantische opbouw met ondersteuning voor screenreaders
- **CSS**: Responsieve layout met CSS Grid en subtiele animaties  
- **JavaScript**: Niet gebruikt  het project volgt het *progressive enhancement*-principe  
- **Node.js + Express**: Server side rendering met Liquid  
- **API**: Alle boekdata wordt opgehaald via een externe proxy API

## Installatie

Volg deze stappen om het project lokaal te draaien:

### 1️⃣ Clone de repository

Open je terminal en voer het volgende commando uit:

```bash
git clone https://github.com/fatimahilali/proof-of-concept.git
cd pleasurable-ui

```

2️⃣ Installeer de afhankelijkheden

Installeer alle benodigde packages met:

```bash
npm install
```

3️⃣ Start de applicatie

```bash
npm start
```

4️⃣ Open in je browser

Ga in je browser naar:

```bash
http://localhost:8000
```

Nu draait je project lokaal!

---

## Bronnen

-Liquid templating

-MDN Web Docs

-FontAwesome voor SVG-iconen

-Proxy API van de Embassy of the Free Mind
-oude project code

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
