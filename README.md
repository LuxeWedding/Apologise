# I Owe You An Apology

A romantic, responsive, Netlify-ready apology website built with React and Vite.

## Project Structure

```text
.
├── index.html
├── netlify.toml
├── package.json
├── public
│   ├── favicon.svg
│   ├── og-preview.svg
│   └── images
│       └── README.md
├── src
│   ├── config.js
│   ├── main.jsx
│   └── styles.css
└── vite.config.js
```

## Local Development

```bash
npm install
npm run dev
```

The dev command builds the site and serves the same production output that Netlify will use. Vite will print a local URL, usually `http://localhost:4173` or `http://localhost:5173`.

After edits, stop the server with `Ctrl+C` and run `npm run dev` again.

## Production Build

```bash
npm run build
```

The deployable site will be generated in `dist/`.

## Netlify Deployment

### Drag-and-drop

1. Run `npm install`.
2. Run `npm run build`.
3. Drag the generated `dist/` folder into Netlify's manual deploy area.

### GitHub to Netlify

1. Push this project to a GitHub repository.
2. In Netlify, create a new site from Git.
3. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`

The included `netlify.toml` already declares those settings.

## Personalization

Most editable content lives in `src/config.js`.

Change:

- Girlfriend's name: `LOVE_CONFIG.girlfriendName` and `CONTACT_CONFIG.girlfriendName`
- Your name: `LOVE_CONFIG.yourName`
- Main apology text: `heroText`, `yesterdayText`, and `letterParagraphs`
- Reasons you love her: `reasonsILoveYou`
- Promises: `promises`
- Memories: `memories`
- Smile messages: `smileMessages`
- Phone number: `CONTACT_CONFIG.phone`
- WhatsApp number: `CONTACT_CONFIG.whatsapp`

Use international format for WhatsApp without symbols, for example `919876543210`.

## Photos

Place your own images in:

```text
public/images/
```

Default expected filenames:

```text
memory1.jpg
memory2.jpg
memory3.jpg
memory4.jpg
```

If those images are missing, the website shows elegant placeholders instead of broken image icons.

## Music

Music never auto-plays. The visitor has to click the music button.

To add a song, place an audio file at:

```text
public/assets/our-song.mp3
```

If you want a different path, update `LOVE_CONFIG.music.src` in `src/config.js`.

## Before Sending It

Replace:

- `Her Name`
- `Your Name`
- `YOUR_PHONE_NUMBER`
- `YOUR_WHATSAPP_NUMBER`
- `YOUR_MEMORY_HERE`
- Placeholder photos in `public/images/`
- The letter text if you want it to sound more specifically like you
- Optional song file at `public/assets/our-song.mp3`

## Notes

- The "Maybe Later" button works normally and allows her to decline.
- The call and WhatsApp links only appear after valid contact numbers are configured.
- The site respects `prefers-reduced-motion`.
- The layout is designed mobile-first enough for a phone, while still feeling polished on desktop.
