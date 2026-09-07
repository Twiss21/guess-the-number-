# Guess the Number

Moderní hra Guess the Number vytvořená v HTML, CSS a vanilla JavaScriptu.

## Testování online

Po zapnutí **GitHub Pages** bude aplikace dostupná na:

```text
https://TVE-JMENO.github.io/TVE-REPOSITORY/
```

V GitHubu:

1. Otevři repository a přejdi do `Settings` > `Pages`.
2. Jako zdroj vyber `Deploy from a branch`.
3. Vyber větev `main` a složku `/ (root)`.
4. Ulož nastavení a otevři vygenerovaný odkaz.

## Stažení aplikace

Aplikace funguje jako instalovatelná PWA. Online demo otevři v Chrome a použij nabídku instalace nebo tlačítko `Install app`.

Pro klasické stažení vytvoř na GitHubu nový **Release** a přilož ZIP soubor s těmito soubory:

- `index.html`
- `style.css`
- `script.js`
- `manifest.json`
- `service-worker.js`
- `icon.svg`

## Funkce

- náhodné číslo v nastavitelném rozsahu od 1 do 5000,
- nápověda vyšší / nižší,
- automaticky nové kolo po výhře,
- skóre uložené v `localStorage`,
- počet pokusů,
- odeslání tipu klávesou `Enter`,
- responzivní vzhled,
- instalace jako aplikace a offline režim.

## Licence

Projekt je dostupný pod vlastní licencí pro osobní, vzdělávací a testovací použití.
Komerční použití, prodej, monetizace a použití v placené službě nejsou povoleny.
Podrobnosti jsou v souboru [LICENSE](LICENSE).
