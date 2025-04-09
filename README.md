# Node.js nettisivu
Tässä työssä on Node.js nettisivu, Fragile Forum, jossa ilmenee yleisimpiä web-kehityksen tietoturvaongelmia, kuten SQL injection ja XSS. 

### Vuln-frontend
Kansiossa on palvelin, joka jakaa käyttäjälle näkyvän sovelluksen koodia.

### Vuln-backend
vuln-backendissä on palvelin, joka toimii API:na MySQL tietokannalle.

### Vuln-forum (react)
vuln-forum oli alkuperäinen frontend palvelin, mutta vaihdoin suunnitelmaani huomatessani, että Reactissa on vähennetty hyökkäyksien mahdollisuksia. 

### Vuln-database
Kansiosta löytyy SQL komennot, joilla luodaan tietokanta. Kansiossa on myös komentoja, joilla tietokannan tilaa hallitaan. Esimerkkinä postauksien haku kommentteineen.

### Testing
Testaus kansiossa on koodia erilaisten haavoittuvuuksien kokeiluun. Koodit ovat pääosin HTML:ää ja pythonia.