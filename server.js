
// Bronnen:
// - https://stackoverflow.com/questions/4833651/javascript-array-sort-and-unique
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
// - ChatGPT (gebruikt voor een deel van de GET-route code)



// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')


// GET routes
app.get('/', async (req, res) => {
  try {
    // Data ophalen van API
    const response = await fetch('https://efm-student-case-proxy-api.vercel.app/overview');
    const boekenRuw = await response.json();

    // Boeken omzetten naar simpele objecten
    const boeken = boekenRuw.map(boek => {
      const info = {};
      boek.metadata.forEach(item => {
        info[item.field] = Array.isArray(item.value) ? item.value[0] : item.value;
      });
    
      return {
        id: boek.id,
        titel: info.titel || '',
        auteur: info.auteur || '',
        jaar: info.jaar || '',
        plaats: info.plaats_van_uitgave || '',
        redacteur: info.redacteur || '',
        trefwoorden: info.trefwoorden || '',
        signatuur: info.signatuur || '',
        asset: boek.asset // afbeelding
      };
      
    });
    
    // Filters uit de URL pakken
    const filters = {
      auteur: (req.query.auteur || '').toLowerCase(),
      jaar: req.query.jaar || '',
      plaats: (req.query.plaats || '').toLowerCase(),
      q: (req.query.q || '').toLowerCase()
    };

    // Boeken filteren op basis van filters
    const gefilterd = boeken.filter(boek => {
      return (
        (!filters.auteur || boek.auteur.toLowerCase().includes(filters.auteur)) &&
        (!filters.jaar || boek.jaar.includes(filters.jaar)) &&
        (!filters.plaats || boek.plaats.toLowerCase().includes(filters.plaats)) &&
        (!filters.q || boek.titel.toLowerCase().includes(filters.q))
      );
    });

    // Detailweergave:  specifiek boek ophalen 
    const geselecteerdBoek = req.query.boek_id
      ? boeken.find(b => b.id === req.query.boek_id)
      : null;

    // Unieke lijsten maken voor dropdowns
    const unieke = veld => {
      return [...new Set(boeken.map(b => b[veld]).filter(Boolean))].sort();
    };

    // Pagina renderen met alle data
    res.render('index.liquid', {
      boeken: gefilterd,
      filters,
      totaalAantal: boeken.length,
      gefilterdAantal: gefilterd.length,
      auteurs: unieke('auteur'),
      jaren: unieke('jaar'),
      plaatsen: unieke('plaats'),
      geselecteerdBoek
    });

  } catch (err) {
    console.error('Fout bij ophalen boeken:', err);
    res.status(500).send('Er ging iets mis.');
  }
});


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\nSucces deze sprint. En maak mooie dingen! 🙂`)
})
