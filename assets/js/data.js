/* Lumina Dental Care – site content (placeholder business details) */
window.DATA = (function () {
  'use strict';

  const clinic = {
    name: 'Lumina Dental Care',
    phone: '(555) 012-3456',
    phoneHref: 'tel:+15550123456',
    emergencyPhone: '(555) 012-9111',
    emergencyHref: 'tel:+15550129111',
    email: 'hello@luminadental.example',
    address: '1200 Harbor Avenue, Suite 200',
    city: 'Springfield, ST 01234',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=1200+Harbor+Avenue+Springfield',
    // index = JS day (0 = Sunday). null = closed
    hours: [null, ['08:00', '18:00'], ['08:00', '18:00'], ['08:00', '18:00'], ['08:00', '18:00'], ['08:00', '16:00'], ['09:00', '14:00']],
    social: {
      facebook: 'https://www.facebook.com/',
      instagram: 'https://www.instagram.com/',
      youtube: 'https://www.youtube.com/',
      linkedin: 'https://www.linkedin.com/'
    }
  };

  const categories = {
    general: 'General Dentistry',
    cosmetic: 'Cosmetic',
    restorative: 'Restorative',
    orthodontics: 'Orthodontics',
    pediatric: "Children's Dentistry",
    surgery: 'Oral Surgery',
    emergency: 'Emergency'
  };

  const services = [
    { id: 'checkup-cleaning', name: 'Check-ups & Cleanings', category: 'general', icon: 'smile', minutes: 60, price: 95, popular: true,
      short: 'Comprehensive exams and professional cleanings that keep problems small and smiles healthy.',
      description: 'Your routine visit includes a thorough exam of your teeth, gums and bite, a professional cleaning to remove plaque and tartar, polishing and an oral cancer screening. We take digital X-rays when needed and give you a personal plan for keeping your smile healthy between visits.',
      benefits: ['Catch cavities and gum disease early', "Remove tartar brushing can't reach", 'Oral cancer screening at every exam', 'Personalized home-care tips'] },
    { id: 'digital-xrays', name: 'Digital X-Rays & 3D Imaging', category: 'general', icon: 'scan', minutes: 30, price: 60,
      short: 'Low-radiation digital imaging for accurate diagnosis and precise treatment planning.',
      description: 'Digital radiographs use much less radiation than traditional film and appear instantly on screen, so we can review them with you chairside. For implants and complex cases, our 3D cone-beam scanner shows bone and nerve anatomy in detail.',
      benefits: ['Much lower radiation than film', 'Instant results reviewed with you', '3D CBCT for implant planning', 'Easy sharing with specialists'] },
    { id: 'fillings', name: 'Tooth-Colored Fillings', category: 'general', icon: 'tooth', minutes: 45, price: 150,
      short: 'Natural-looking composite fillings that repair cavities and blend in with your smile.',
      description: 'We remove decay and restore the tooth with a durable, mercury-free composite resin matched to your natural shade. Most fillings are completed in a single, comfortable visit.',
      benefits: ['Matches your natural tooth color', 'Mercury-free materials', 'Preserves healthy tooth structure', 'Completed in one visit'] },
    { id: 'gum-treatment', name: 'Gum Disease Treatment', category: 'general', icon: 'droplet', minutes: 90, price: 220,
      short: 'Deep cleanings and periodontal care to stop gum disease and protect your foundation.',
      description: 'Bleeding or receding gums can be early signs of periodontal disease. We offer scaling and root planing, antimicrobial therapy and ongoing periodontal maintenance to halt progression and help your gums heal.',
      benefits: ['Reduce bleeding and inflammation', 'Help prevent bone and tooth loss', 'Gentle, numbed deep cleaning', 'Ongoing maintenance plans'] },
    { id: 'teeth-whitening', name: 'Professional Teeth Whitening', category: 'cosmetic', icon: 'sun', minutes: 90, price: 299, popular: true,
      short: 'Brighten your smile by several shades with safe, dentist-supervised whitening.',
      description: 'Choose in-office whitening for dramatic results in about 90 minutes, or custom take-home trays for gradual whitening on your schedule. We protect your gums and minimize sensitivity throughout.',
      benefits: ['Visible results in a single visit', 'Custom take-home trays available', 'Low-sensitivity formula', 'Long-lasting with simple touch-ups'] },
    { id: 'veneers', name: 'Porcelain Veneers', category: 'cosmetic', icon: 'layers', minutes: 120, price: 950, priceNote: 'per tooth', popular: true,
      short: 'Ultra-thin porcelain shells that correct chips, gaps and discoloration.',
      description: 'Veneers are custom-crafted to cover the front surface of your teeth, transforming their shape, size and color. We design your smile digitally first, so you can preview the result before we begin.',
      benefits: ['Digital smile preview first', 'Stain-resistant porcelain', 'Corrects chips, gaps and uneven teeth', 'Natural translucency'] },
    { id: 'smile-makeover', name: 'Smile Makeover', category: 'cosmetic', icon: 'sparkle', minutes: 60, price: null, priceLabel: 'Free consult',
      short: 'A personalized combination of treatments designed around your goals.',
      description: 'A smile makeover combines treatments such as whitening, veneers, bonding, orthodontics or implants into one coordinated plan. We start with photos, scans and a conversation about what you would like to change.',
      benefits: ['Fully personalized plan', 'Digital mock-up of your new smile', 'Coordinated, efficient scheduling', 'Flexible financing'] },
    { id: 'dental-implants', name: 'Dental Implants', category: 'restorative', icon: 'implant', minutes: 90, price: 2400, priceNote: 'per implant', popular: true,
      short: 'Permanent, natural-looking replacements for missing teeth.',
      description: 'An implant is a small titanium post placed in the jawbone that supports a custom crown, bridge or denture. Implants help preserve bone, do not affect neighboring teeth and, with good care, can last for decades.',
      benefits: ['Looks and feels like a natural tooth', 'Helps prevent jawbone loss', 'No impact on neighboring teeth', '3D-guided placement'] },
    { id: 'crowns-bridges', name: 'Crowns & Bridges', category: 'restorative', icon: 'crown', minutes: 90, price: 1100,
      short: 'Durable restorations that protect weak teeth and replace missing ones.',
      description: 'Crowns cap and strengthen damaged teeth, while bridges fill gaps by anchoring replacement teeth to neighboring ones. Digital scans replace messy impressions, and every restoration is shade-matched to your smile.',
      benefits: ['Digital impressions, no goop', 'Strong, natural-looking ceramics', 'Restores chewing comfort', 'Protects cracked or worn teeth'] },
    { id: 'root-canal', name: 'Root Canal Therapy', category: 'restorative', icon: 'zap', minutes: 90, price: 750,
      short: 'Gentle, modern endodontic care that relieves pain and saves your tooth.',
      description: 'When the pulp inside a tooth becomes infected or inflamed, a root canal removes the damaged tissue, disinfects the canals and seals the tooth. With modern anesthesia, most patients say it feels similar to getting a filling.',
      benefits: ['Relieves toothache at the source', 'Saves your natural tooth', 'Comfortable with modern anesthesia', 'Often completed in one visit'] },
    { id: 'dentures', name: 'Dentures & Partials', category: 'restorative', icon: 'smile', minutes: 60, price: 1500,
      short: 'Comfortable full and partial dentures, including implant-supported options.',
      description: "Today's dentures are lighter, more natural-looking and more comfortable than ever. For extra stability, implant-supported dentures snap securely into place so you can eat and speak with confidence.",
      benefits: ['Custom-fit for comfort', 'Natural-looking teeth and gums', 'Implant-supported options', 'Adjustments included'] },
    { id: 'clear-aligners', name: 'Clear Aligners', category: 'orthodontics', icon: 'aligner', minutes: 60, price: 3200, popular: true,
      short: 'Straighten your teeth discreetly with nearly invisible, removable aligners.',
      description: 'Clear aligners gradually move teeth using a series of custom trays you change every one to two weeks. They are removable for eating and brushing, and our 3D scanner lets you preview the final result before you start.',
      benefits: ['Nearly invisible', 'Removable for meals and brushing', '3D preview of your results', 'Fewer office visits'] },
    { id: 'braces', name: 'Traditional Braces', category: 'orthodontics', icon: 'braces', minutes: 60, price: 2900,
      short: 'Metal or ceramic braces for precise correction of complex bite issues.',
      description: 'Braces remain one of the most effective ways to correct crowding, spacing and bite problems, especially in complex cases. Choose classic metal or tooth-colored ceramic brackets.',
      benefits: ['Effective for complex cases', 'Metal or ceramic options', 'No trays to remember', 'Great for teens and adults'] },
    { id: 'kids-dentistry', name: "Children's Dentistry", category: 'pediatric', icon: 'heart', minutes: 45, price: 75,
      short: 'Fun, gentle visits that help kids build healthy habits for life.',
      description: 'From first teeth to teenage years, we keep visits friendly and fun. Kid-sized rooms, a gentle approach and tell-show-do explanations help children feel safe and in control.',
      benefits: ['Kid-friendly rooms and team', 'First visit by age one', 'Gentle tell-show-do approach', 'Prizes for brave smiles'] },
    { id: 'sealants-fluoride', name: 'Sealants & Fluoride', category: 'pediatric', icon: 'shield', minutes: 30, price: 45, priceNote: 'per tooth',
      short: 'Quick, painless treatments that shield young teeth from cavities.',
      description: 'Sealants are thin protective coatings painted onto the chewing surfaces of back teeth, where most childhood cavities start. Combined with fluoride varnish, they are one of the simplest ways to prevent decay.',
      benefits: ['No drilling or numbing', 'Protects deep grooves from decay', 'Quick application', 'Can last for several years'] },
    { id: 'wisdom-teeth', name: 'Wisdom Teeth Removal', category: 'surgery', icon: 'activity', minutes: 90, price: 350, priceNote: 'per tooth',
      short: 'Safe, comfortable removal of impacted wisdom teeth with sedation options.',
      description: 'Impacted or crowding wisdom teeth can cause pain, infection and damage. Our oral surgeon plans each extraction with 3D imaging and offers local anesthesia, nitrous oxide or IV sedation.',
      benefits: ['3D imaging for precise planning', 'Sedation options available', 'Detailed aftercare guidance', 'Follow-up check included'] },
    { id: 'extractions', name: 'Tooth Extractions', category: 'surgery', icon: 'tooth', minutes: 45, price: 180,
      short: 'Gentle removal of badly damaged teeth, with replacement planned ahead.',
      description: "When a tooth can't be saved, we remove it as gently as possible and talk you through replacement options like implants or bridges so your smile stays healthy and complete.",
      benefits: ['Gentle technique', 'Bone grafting available', 'Replacement planning', 'Same-day emergency extractions'] },
    { id: 'emergency-care', name: 'Emergency Dental Care', category: 'emergency', icon: 'alert', minutes: 45, price: 120, priceNote: 'exam', popular: true,
      short: 'Same-day appointments for toothaches, broken or knocked-out teeth and infections.',
      description: 'Dental emergencies do not wait, and neither do we. We reserve time every day for urgent cases and run an after-hours line for patients. Call right away: the sooner you are seen, the better the outcome.',
      benefits: ['Same-day appointments', 'After-hours phone line', 'Fast pain relief', 'Walk-ins welcome during hours'] }
  ];

  const team = [
    { id: 'amelia-hart', name: 'Dr. Amelia Hart', credentials: 'DDS', role: 'Founder & General Dentist', specialty: 'general', years: 18,
      categories: ['general', 'cosmetic', 'restorative', 'emergency'], days: [1, 2, 3, 4, 5],
      education: ['DDS, State University School of Dentistry', 'Fellowship, Academy of General Dentistry'], languages: ['English', 'French'],
      bio: 'Dr. Hart opened Lumina in 2008 with a simple idea: dental visits should feel calm, unhurried and honest. She focuses on preventive and restorative care and is known for explaining every option clearly, without pressure.',
      fun: 'Runs the Springfield half-marathon every spring.',
      avatar: { skin: '#f2c9a8', hair: '#6b3e26', style: 'long', shirt: '#0d9488', bg: '#ccfbf1' } },
    { id: 'marcus-chen', name: 'Dr. Marcus Chen', credentials: 'DMD', role: 'Cosmetic Dentist', specialty: 'cosmetic', years: 12,
      categories: ['cosmetic', 'general', 'restorative'], days: [1, 2, 4, 5, 6],
      education: ['DMD, Coastal University College of Dental Medicine', 'Advanced training in digital smile design'], languages: ['English', 'Mandarin'],
      bio: 'Dr. Chen combines an artistic eye with digital smile design to create natural-looking veneers, bonding and whitening results. He loves the moment patients first see their new smile.',
      fun: 'Paints watercolor landscapes on weekends.',
      avatar: { skin: '#eac39c', hair: '#1f1a17', style: 'short', glasses: true, shirt: '#1e3a8a', bg: '#dbeafe' } },
    { id: 'priya-raman', name: 'Dr. Priya Raman', credentials: 'DDS, MS', role: 'Orthodontist', specialty: 'orthodontics', years: 10,
      categories: ['orthodontics'], days: [2, 3, 4, 6],
      education: ['DDS, Metro University', 'MS in Orthodontics, Lakeside University'], languages: ['English', 'Tamil', 'Hindi'],
      bio: 'Dr. Raman treats children, teens and adults with clear aligners and braces. She uses 3D scanning so patients can see their projected result before treatment even begins.',
      fun: 'Bakes elaborate birthday cakes for the whole team.',
      avatar: { skin: '#c68863', hair: '#1b1210', style: 'bun', shirt: '#9d174d', bg: '#fce7f3' } },
    { id: 'daniel-okafor', name: 'Dr. Daniel Okafor', credentials: 'DDS', role: 'Oral Surgeon & Implant Specialist', specialty: 'surgery', years: 15,
      categories: ['surgery', 'restorative', 'emergency'], days: [1, 3, 5],
      education: ['DDS, Northfield University', 'Residency in Oral & Maxillofacial Surgery'], languages: ['English', 'Igbo'],
      bio: 'Dr. Okafor performs implant placement, wisdom tooth removal and bone grafting with 3D-guided precision. Patients appreciate his calm manner and thorough aftercare.',
      fun: 'Coaches a youth soccer team.',
      avatar: { skin: '#8d5a3b', hair: '#1a1110', style: 'buzz', shirt: '#0f766e', bg: '#d1fae5' } },
    { id: 'sofia-alvarez', name: 'Dr. Sofia Alvarez', credentials: 'DDS', role: 'Pediatric Dentist', specialty: 'pediatric', years: 9,
      categories: ['pediatric', 'general'], days: [1, 2, 3, 5, 6],
      education: ['DDS, Riverside University', 'Pediatric Dentistry Residency, Children\'s Hospital'], languages: ['English', 'Spanish'],
      bio: 'Dr. Alvarez makes dentistry fun for kids, from first-tooth visits to teen check-ups. Her playful, patient approach helps anxious children leave with a smile (and a sticker).',
      fun: 'Has a rescue dog named Molar.',
      avatar: { skin: '#e0ac85', hair: '#4a2a1a', style: 'curly', shirt: '#f97316', bg: '#ffedd5' } },
    { id: 'james-whitaker', name: 'Dr. James Whitaker', credentials: 'DMD', role: 'Endodontist', specialty: 'restorative', years: 20,
      categories: ['restorative', 'emergency'], days: [2, 4, 5],
      education: ['DMD, Eastbrook University', 'Certificate in Endodontics'], languages: ['English'],
      bio: 'Dr. Whitaker specializes in saving teeth. Using microscopes and modern rotary instruments, he performs root canals that are precise, efficient and far more comfortable than most people expect.',
      fun: 'Restores vintage motorcycles.',
      avatar: { skin: '#f5d0b5', hair: '#c8a165', style: 'short', glasses: true, shirt: '#334155', bg: '#e2e8f0' } }
  ];

  const staff = [
    { name: 'Lena Brooks', role: 'Lead Dental Hygienist', avatar: { skin: '#f4cfb3', hair: '#b5562b', style: 'long', coat: '#5eead4', scrubs: true, bg: '#f0fdfa' } },
    { name: 'Tom Reyes', role: 'Dental Hygienist', avatar: { skin: '#d9a57c', hair: '#2b1d14', style: 'short', coat: '#93c5fd', scrubs: true, bg: '#eff6ff' } },
    { name: 'Grace Kim', role: 'Office Manager', avatar: { skin: '#f1d0b0', hair: '#141414', style: 'long', coat: '#334155', scrubs: true, bg: '#f1f5f9' } },
    { name: 'Nadia Petrova', role: 'Patient Coordinator', avatar: { skin: '#f6d5bf', hair: '#e3c27a', style: 'bun', coat: '#0f766e', scrubs: true, bg: '#ecfeff' } }
  ];

  const posts = [
    { id: 'how-often-visit-dentist', title: 'How Often Should You Really See the Dentist?', category: 'Prevention', date: '2026-10-15', read: 5, author: 'amelia-hart', icon: 'shield', colors: ['#0d9488', '#14b8a6'],
      excerpt: 'Twice a year is a good rule of thumb, but your ideal schedule depends on your health and risk factors.',
      body: '<p>For most people, a check-up and cleaning every six months is a good baseline. It gives your dental team a chance to catch small problems before they become painful or expensive.</p><h2>Who may need more frequent visits?</h2><ul><li>People with a history of gum disease</li><li>Anyone who gets cavities often</li><li>Smokers and people with diabetes</li><li>Pregnant patients, as hormone changes can affect gums</li></ul><p>Some low-risk patients may be able to go a little longer between visits, but that decision should be made with your dentist.</p><h2>What happens at a check-up?</h2><p>A routine visit usually includes an exam of your teeth and gums, a professional cleaning, an oral cancer screening and X-rays when needed.</p><div class="callout"><strong>Between visits:</strong> brush twice a day for two minutes with fluoride toothpaste, clean between your teeth daily and limit sugary snacks and drinks.</div>' },
    { id: 'aligners-vs-braces', title: 'Clear Aligners vs. Braces: Which Is Right for You?', category: 'Orthodontics', date: '2026-09-28', read: 6, author: 'priya-raman', icon: 'aligner', colors: ['#4f46e5', '#818cf8'],
      excerpt: 'Both straighten teeth beautifully. The right choice depends on your bite, lifestyle and how disciplined you are with wear time.',
      body: '<p>Clear aligners and traditional braces can both deliver excellent results. Here is how they compare.</p><h2>Appearance and comfort</h2><p>Aligners are nearly invisible and have no brackets or wires to irritate your cheeks. Ceramic braces are a discreet middle ground.</p><h2>Responsibility</h2><p>Aligners only work when you wear them, typically 20 to 22 hours a day. Braces work around the clock without you having to remember anything.</p><h2>Complexity</h2><p>Braces are often preferred for complex bite corrections, although aligner technology handles more cases every year.</p><h2>Treatment time</h2><p>Many cases take between 12 and 24 months with either option, but it varies widely by person.</p><div class="callout">The best way to decide is a consultation with a 3D scan, so we can show you your options side by side.</div>' },
    { id: 'foods-for-healthy-smile', title: 'Foods That Help Keep Your Smile Healthy', category: 'Nutrition', date: '2026-09-10', read: 4, author: 'marcus-chen', icon: 'heart', colors: ['#16a34a', '#4ade80'],
      excerpt: 'What you eat affects your teeth as much as how you brush. These smile-friendly foods are worth adding to your list.',
      body: '<p>A balanced diet supports strong teeth and healthy gums. A few foods deserve special mention.</p><ul><li><strong>Crunchy fruits and vegetables</strong> such as apples, carrots and celery stimulate saliva, your mouth\'s natural cleanser.</li><li><strong>Cheese and yogurt</strong> provide calcium and phosphate that support enamel.</li><li><strong>Leafy greens</strong> are packed with vitamins and minerals.</li><li><strong>Water</strong>, especially fluoridated tap water, rinses away food and acids.</li></ul><h2>Foods to enjoy in moderation</h2><p>Sticky candy, sugary drinks and very acidic foods can increase your risk of decay and erosion. Coffee, tea and red wine can stain.</p><div class="callout"><strong>Tip:</strong> after acidic foods or drinks, rinse with water and wait about 30 minutes before brushing.</div>' },
    { id: 'dental-emergency-guide', title: 'What To Do in a Dental Emergency', category: 'Emergency', date: '2026-08-22', read: 5, author: 'daniel-okafor', icon: 'alert', colors: ['#dc2626', '#fb7185'],
      excerpt: 'A knocked-out tooth or sudden severe pain can be scary. Knowing these first steps can save your tooth.',
      body: '<h2>Knocked-out adult tooth</h2><p>Pick it up by the crown, not the root. If it is dirty, rinse it briefly without scrubbing. Try to place it back in the socket, or keep it in milk, and see a dentist immediately. Time matters most.</p><h2>Severe toothache</h2><p>Rinse with warm water, gently floss to remove trapped food and use a cold compress on the outside of your cheek. Never put aspirin directly on the gums.</p><h2>Chipped or broken tooth</h2><p>Save any pieces, rinse your mouth and apply a cold compress to reduce swelling. Call us for a same-day visit.</p><div class="callout"><strong>Go to the emergency room or call 911</strong> if you have swelling that affects breathing or swallowing, uncontrolled bleeding or a serious facial injury.</div>' },
    { id: 'childs-first-dental-visit', title: "Your Child's First Dental Visit: A Parent's Guide", category: 'Kids', date: '2026-08-05', read: 4, author: 'sofia-alvarez', icon: 'smile', colors: ['#f59e0b', '#fbbf24'],
      excerpt: 'Pediatric dentists recommend a first visit by the first birthday. Here is what to expect and how to prepare.',
      body: '<p>The American Academy of Pediatric Dentistry recommends a child\'s first dental visit by their first birthday, or within six months of the first tooth appearing.</p><h2>What happens at the visit?</h2><p>For little ones, the exam is often done with your child sitting on your lap. We count teeth, check gums and jaw development, gently clean and may apply fluoride varnish.</p><h2>How to prepare</h2><ul><li>Use positive, simple words like "count your teeth"</li><li>Read a picture book about visiting the dentist</li><li>Book a morning appointment when kids are rested</li><li>Bring a favorite toy or blanket</li></ul><div class="callout">Early visits build trust and make future check-ups something kids look forward to.</div>' },
    { id: 'are-dental-implants-worth-it', title: 'Are Dental Implants Worth It?', category: 'Restorative', date: '2026-07-18', read: 6, author: 'daniel-okafor', icon: 'implant', colors: ['#0f2a43', '#2563eb'],
      excerpt: 'Implants cost more up front than other options, but their stability and longevity make them a favorite for many patients.',
      body: '<p>A dental implant has three parts: a titanium post in the jawbone, a connector called an abutment and a custom crown.</p><h2>Benefits</h2><ul><li>Stable and natural-feeling for eating and speaking</li><li>Helps preserve jawbone after tooth loss</li><li>Does not require reshaping neighboring teeth</li><li>Can last for decades with good care</li></ul><h2>The process</h2><p>After a consultation and 3D imaging, the implant is placed and allowed to fuse with the bone, often over three to six months, before the final crown is attached.</p><h2>Am I a candidate?</h2><p>Healthy gums and enough bone are important, and bone grafting can help when bone is thin. Smoking and uncontrolled diabetes can affect healing.</p><div class="callout">Bridges and dentures are good alternatives, and we will walk you through every option.</div>' }
  ];

  const reviews = [
    { name: 'Sarah M.', rating: 5, date: '2026-10-12', service: 'Professional Teeth Whitening', text: "I've always been nervous at the dentist, but the team made me feel completely at ease. My whitening results were amazing and my smile is several shades brighter." },
    { name: 'James T.', rating: 5, date: '2026-09-30', service: 'Dental Implants', text: 'Dr. Okafor walked me through every step of my implant. The procedure was far more comfortable than I expected and the result looks completely natural.' },
    { name: 'Priya K.', rating: 5, date: '2026-09-12', service: "Children's Dentistry", text: 'Dr. Alvarez is wonderful with kids. My four-year-old actually asks when she can go back!' },
    { name: 'Michael R.', rating: 4, date: '2026-08-28', service: 'Check-ups & Cleanings', text: 'Thorough cleaning and a very friendly hygienist. I wish there were more evening slots, but overall an excellent experience.' },
    { name: 'Elena G.', rating: 5, date: '2026-08-03', service: 'Clear Aligners', text: 'Fourteen months later my teeth are perfectly straight. Dr. Raman showed me a 3D preview before we started, and the final result matched it exactly.' },
    { name: 'David L.', rating: 5, date: '2026-07-19', service: 'Root Canal Therapy', text: 'I dreaded my root canal for weeks. Dr. Whitaker was so gentle that I barely felt a thing. Wish I had come in sooner.' },
    { name: 'Hannah W.', rating: 5, date: '2026-07-02', service: 'Porcelain Veneers', text: 'My veneers look so natural that friends just say I look well rested. Dr. Chen is a true artist.' },
    { name: 'Robert J.', rating: 4, date: '2026-06-15', service: 'Crowns & Bridges', text: 'Great crown work and no messy impressions thanks to the digital scanner. Parking can be busy at lunchtime.' },
    { name: 'Aisha B.', rating: 5, date: '2026-05-30', service: 'Emergency Dental Care', text: 'I chipped a tooth on a Saturday morning and they fit me in within an hour. Lifesavers!' },
    { name: 'Kevin P.', rating: 3, date: '2026-05-11', service: 'Check-ups & Cleanings', text: 'Good care, but I waited about 20 minutes past my appointment time. The staff apologized and were friendly about it.' },
    { name: 'Olivia S.', rating: 5, date: '2026-04-22', service: 'Smile Makeover', text: 'Whitening plus bonding completely changed how I feel about smiling in photos. The whole team was so supportive.' },
    { name: 'Tom H.', rating: 5, date: '2026-04-02', service: 'Wisdom Teeth Removal', text: 'All four wisdom teeth out with sedation. Clear aftercare instructions and a follow-up call the next day. Very professional.' }
  ];

  const ratingSummary = { average: 4.9, total: 1248, distribution: { 5: 92, 4: 6, 3: 1, 2: 0.5, 1: 0.5 } };

  const faqCategories = { general: 'General', appointments: 'Appointments', insurance: 'Insurance & Payments', treatments: 'Treatments', kids: 'Kids', emergencies: 'Emergencies' };
  const faqs = [
    { cat: 'general', q: 'Are you accepting new patients?', a: 'Yes! We welcome new patients of all ages. You can <a href="book.html">book online</a> in about two minutes or call us.' },
    { cat: 'general', q: 'Where are you located and is there parking?', a: 'We are at 1200 Harbor Avenue, Suite 200. Free parking is available in the attached garage, and the building is fully wheelchair accessible.' },
    { cat: 'general', q: 'What sterilization and safety protocols do you follow?', a: 'We follow CDC infection-control guidelines, use hospital-grade sterilization for every instrument, single-use disposables where possible and medical-grade air filtration in every room.' },
    { cat: 'appointments', q: 'How do I book an appointment?', a: 'Use our <a href="book.html">online booking</a>, call the office or send a message through the <a href="contact.html">contact page</a>.' },
    { cat: 'appointments', q: 'What should I bring to my first visit?', a: 'Please bring a photo ID, your insurance card, a list of current medications and your completed <a href="patients.html#forms">new patient forms</a>.' },
    { cat: 'appointments', q: 'What is your cancellation policy?', a: 'Please give us at least 24 hours notice if you need to cancel or reschedule so we can offer the time to another patient.' },
    { cat: 'appointments', q: 'Do you offer evening or weekend appointments?', a: 'We are open until 6 PM Monday to Thursday and 9 AM to 2 PM on Saturdays.' },
    { cat: 'insurance', q: 'Which insurance plans do you accept?', a: 'We work with most major PPO plans. See the list and use our <a href="patients.html#insurance">insurance checker</a>, or call us to verify your benefits.' },
    { cat: 'insurance', q: 'Do you offer payment plans?', a: 'Yes. We offer 0% financing for up to 12 months and extended plans for larger treatments. Try our <a href="patients.html#financing">payment calculator</a>.' },
    { cat: 'insurance', q: "What if I don't have insurance?", a: 'Our in-house <a href="patients.html#membership">membership plans</a> include cleanings, exams and X-rays plus discounts on treatment, with no deductibles or waiting periods.' },
    { cat: 'treatments', q: 'Does professional teeth whitening damage enamel?', a: 'Whitening done under dental supervision is considered safe for enamel. Some people notice temporary sensitivity, which we minimize with a low-sensitivity formula.' },
    { cat: 'treatments', q: 'How long do dental implants last?', a: 'With good care, the implant post can last for decades. The crown on top may need replacing after 10 to 15 years due to normal wear.' },
    { cat: 'treatments', q: 'Do you offer sedation for anxious patients?', a: 'Yes. We offer nitrous oxide ("laughing gas") and oral sedation, and IV sedation for oral surgery. Let us know about any anxiety when you book.' },
    { cat: 'kids', q: 'When should my child first see a dentist?', a: 'By their first birthday, or within six months of the first tooth appearing. Read our <a href="post.html?id=childs-first-dental-visit">parent\'s guide</a>.' },
    { cat: 'kids', q: 'Are dental X-rays safe for children?', a: 'We use low-radiation digital X-rays, protective shielding where appropriate and only take X-rays when they are needed for diagnosis.' },
    { cat: 'emergencies', q: 'What counts as a dental emergency?', a: 'Severe pain, a knocked-out or broken tooth, swelling, an abscess or bleeding that will not stop. See our <a href="emergency.html">emergency guide</a>.' },
    { cat: 'emergencies', q: 'What if I have an emergency after hours?', a: 'Call our emergency line at (555) 012-9111. If swelling affects your breathing or swallowing, call 911 or go to the nearest emergency room.' }
  ];

  const insurers = ['Delta Dental', 'Aetna', 'Cigna', 'MetLife', 'Guardian', 'UnitedHealthcare', 'Humana', 'Blue Cross Blue Shield', 'Principal', 'Ameritas', 'Sun Life', 'United Concordia'];

  const plans = [
    { id: 'essential', name: 'Essential', price: 29, desc: 'Preventive care for individuals without insurance.', features: ['2 exams & cleanings per year', 'All routine X-rays', '1 emergency exam per year', '15% off all treatments'] },
    { id: 'premier', name: 'Premier', price: 45, featured: true, desc: 'Our most popular plan, with cosmetic perks.', features: ['Everything in Essential', 'Annual take-home whitening kit', 'Unlimited emergency exams', '20% off all treatments'] },
    { id: 'family', name: 'Family', price: 79, desc: 'Coverage for up to four family members.', features: ['Essential benefits for 4 people', 'Fluoride & sealants for kids', 'Priority scheduling', '15% off all treatments'] }
  ];

  const gallery = [
    { id: 'whitening-1', title: 'In-Office Whitening', category: 'whitening', issues: ['stain'], time: '1 visit · 90 min', dentist: 'Dr. Marcus Chen', service: 'teeth-whitening', text: 'Years of coffee staining lifted by several shades in a single session.' },
    { id: 'veneers-1', title: 'Porcelain Veneers', category: 'veneers', issues: ['chip', 'stain'], time: '3 visits · 4 weeks', dentist: 'Dr. Marcus Chen', service: 'veneers', text: 'Six upper veneers corrected a chipped front tooth and uneven color.' },
    { id: 'aligners-1', title: 'Clear Aligners', category: 'orthodontics', issues: ['crooked'], time: '14 months', dentist: 'Dr. Priya Raman', service: 'clear-aligners', text: 'Moderate crowding straightened discreetly with removable aligners.' },
    { id: 'implant-1', title: 'Single Dental Implant', category: 'implants', issues: ['missing'], time: '4 months', dentist: 'Dr. Daniel Okafor', service: 'dental-implants', text: 'A missing lateral incisor replaced with an implant and custom crown.' },
    { id: 'bonding-1', title: 'Gap Closure with Bonding', category: 'bonding', issues: ['gap'], time: '1 visit · 2 hours', dentist: 'Dr. Amelia Hart', service: 'smile-makeover', text: 'Tooth-colored bonding closed spaces between the front teeth in one visit.' },
    { id: 'makeover-1', title: 'Complete Smile Makeover', category: 'veneers', issues: ['crooked', 'stain'], time: '6 weeks', dentist: 'Dr. Marcus Chen', service: 'smile-makeover', text: 'Whitening and ten veneers created a bright, even and symmetrical smile.' },
    { id: 'braces-1', title: 'Ceramic Braces', category: 'orthodontics', issues: ['crooked', 'gap'], time: '20 months', dentist: 'Dr. Priya Raman', service: 'braces', text: 'Crowding and spacing corrected with tooth-colored ceramic braces.' },
    { id: 'implant-2', title: 'Implant & Whitening', category: 'implants', issues: ['missing', 'stain'], time: '5 months', dentist: 'Dr. Daniel Okafor', service: 'dental-implants', text: 'An implant restored a missing tooth, followed by whitening for a uniform shade.' }
  ];

  return { clinic, categories, services, team, staff, posts, reviews, ratingSummary, faqCategories, faqs, insurers, plans, gallery };
})();
