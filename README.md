# Lumina Dental Care: multi-page clinic website

A static site that runs without any build step. Open `index.html` in a browser, or serve the folder with any static server (for example `python3 -m http.server`).

## Pages
| Page | What it does |
|---|---|
| `index.html` | Hero with a quick availability check, services, why us, stats, first-visit steps, before/after slider, team, testimonial carousel, insurance, blog preview |
| `about.html` | Story timeline, values, office tour tabs, memberships |
| `services.html` | 18 services with search and category filters, a detail popup for each (link straight to one with `services.html#veneers`), and a pricing table |
| `team.html` | Dentist filter, profile popups (`team.html#marcus-chen`), care team, careers CTA |
| `patients.html` | First visit, printable forms, insurance checker, financing calculator, membership plans, policies |
| `gallery.html` | Before/after comparison sliders with treatment filters |
| `reviews.html` | Rating summary, filter, sort and load more, plus a write-a-review form |
| `blog.html`, `post.html?id=…` | Searchable articles with topic filter; article page with share, copy-link, previous/next and related posts |
| `faq.html` | Search with highlighted matches, topic filter, expand or collapse all |
| `contact.html` | Validated form (prefill with `?subject=`), live open/closed hours, map, copy address |
| `book.html` | Five-step booking: treatment → dentist → date and time → details → confirm. Gives a reference number and a calendar (.ics) download. Accepts `?service=`, `?dentist=`, `?date=` |
| `emergency.html` | Urgency triage questions, first-aid tabs, after-hours info |
| `privacy.html`, `404.html`, `forms/*.html` | Legal/accessibility page, not-found page, printable patient forms |

## Customizing
- **Business details, services, team, posts, reviews, FAQs, insurers and plans:** all live in `assets/js/data.js`.
- **Colors and fonts:** the CSS variables at the top of `assets/css/styles.css`.
- All names, addresses, phone numbers and reviews are placeholders.

## Notes
- There is no backend. Form submissions, bookings, reviews and newsletter sign-ups are saved in the browser's `localStorage`. To receive them for real, connect a form or booking service.
- The illustrations (avatars and smiles) are generated SVG, so no image files are needed. Swap in real photos when you have them.
