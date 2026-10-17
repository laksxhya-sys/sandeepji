const fs = require('fs');
const path = require('path');

const promptData = [
  // ==========================================
  // SECTION 1: HOMEPAGE SITUATION CARDS (13 IMAGES)
  // ==========================================
  {
    num: 1,
    targetFile: "_raw/situation-01.jpg",
    page: "index.htm (Situation Card 01)",
    category: "Love & Relationships",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Love & Relationship Problems — Emotional Detachment",
    scene: "An Indian couple in their late 20s sitting at opposite ends of an elegant couch, gazing away from each other with silent sorrow, a visible emotional gap between them, subtle warm evening lamplight, royal Vedic home decor.",
    prompt: "Cinematic, realistic photograph of an attractive young Indian couple experiencing emotional detachment. A handsome man in a simple linen shirt sitting on one side of a contemporary classic sofa looking down pensively, and a beautiful Indian woman in an elegant kurti on the other side looking out of a large balcony window with tears in her eyes. Deep emotional silence, soft golden sunset light streaming through sheer curtains, gentle depth of field, atmospheric, poignant, 8k resolution, photorealistic, award-winning composition, shot on 85mm f/1.4 lens.",
    negativePrompt: "cartoon, anime, 3d render, distorted hands, extra limbs, ugly faces, oversaturated, blurry, bad anatomy"
  },
  {
    num: 2,
    targetFile: "_raw/situation-02.jpg",
    page: "index.htm (Situation Card 02)",
    category: "Love & Relationships",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Breakups & Deep Heartbreak Recovery",
    scene: "A heartbroken young woman sitting by a rain-streaked window holding an old photograph of happier times with her partner, emotional, solitary, soft moody illumination.",
    prompt: "Emotional cinematic portrait of a beautiful Indian woman in her late 20s coping with a painful breakup. She sits beside a rainy window pane at twilight, holding an old photograph of her and her lover. Soft tears on her cheeks, wistful expression, warm indoor ambient table lamp casting subtle golden highlights against the cool blue rainy evening outside, shallow depth of field, tender, deeply melancholic, photorealistic, 8k, ultra-detailed skin textures, cinematic lighting.",
    negativePrompt: "cartoon, 3d CGI, deformed fingers, unrealistic face, bright neon, cartoonish sadness"
  },
  {
    num: 3,
    targetFile: "_raw/situation-03.jpg",
    page: "index.htm (Situation Card 03)",
    category: "Love & Relationships",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Partner Stopped Talking & Silent Treatment (Blocked on Phone)",
    scene: "A young man anxiously staring at his smartphone in the dark, showing red blocked/call failure indicators, feeling desperate and hopeless due to sudden silent treatment.",
    prompt: "A young handsome South Asian man sitting at a dark wooden bedside table at 2 AM, looking down in despair at his glowing smartphone screen showing unread messages and a disconnected call. Atmospheric cinematic mood, deep shadows, soft warm lamplight from a brass bedside lamp reflecting on his worried face, emotional vulnerability, authentic expressions, hyperrealistic, 8k resolution, cinematic color grading with crimson and warm amber tones.",
    negativePrompt: "cartoon, exaggerated expressions, text on screen, deformed hands, blurry"
  },
  {
    num: 4,
    targetFile: "_raw/situation-04.jpg",
    page: "index.htm (Situation Card 04)",
    category: "Love & Relationships",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Get Ex Love Back & Soul Reunion",
    scene: "A separated couple reuniting outdoors in an ancient heritage temple courtyard, emotional tears of joy, holding hands tightly as they look into each other's eyes.",
    prompt: "A deeply emotional cinematic reunion of an estranged Indian couple in an ancient, sandstone Vedic temple courtyard during golden hour. The man gently holds both hands of the woman, tears of relief and love in their eyes, the woman smiling through emotional tears. Radiant warm amber sunlight, dust motes dancing in the air, ancient intricately carved temple pillars in soft background blur, soulmate connection, 8k, photorealistic masterpiece, shot on 50mm f/1.2.",
    negativePrompt: "cartoon, 3d model, plastic skin, unnatural smiles, deformed fingers, blur"
  },
  {
    num: 5,
    targetFile: "_raw/situation-05.jpg",
    page: "index.htm (Situation Card 05)",
    category: "Love & Relationships",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "One-Sided Love Attraction & First Proposal Call",
    scene: "A radiant, beautiful Indian girl smiling warmly as she holds her mobile phone to her ear, making the first call with love and genuine affection.",
    prompt: "Stunning cinematic portrait of an attractive 24-year-old Indian woman with sparkling eyes and a genuine, shy romantic smile, holding a smartphone to her ear, making a heartfelt phone call. She is wearing a soft pastel peach traditional outfit with delicate golden embroidery. Warm morning golden sunlight filtering through garden foliage in background, radiant skin, romantic atmosphere, authentic happiness, 8k resolution, award-winning photography, photorealistic.",
    negativePrompt: "oversaturated, fake smile, 3d render, extra fingers, distorted eyes, blurry"
  },
  {
    num: 6,
    targetFile: "_raw/situation-06.jpg",
    page: "index.htm (Situation Card 06)",
    category: "Love & Relationships",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Relationship Conflicts & Constant Fights",
    scene: "A couple in the middle of a tense verbal disagreement in a modern living room, tension in the air, looking away in frustration and hurt pride.",
    prompt: "Cinematic realistic shot of an Indian couple in a modern apartment facing conflict. The man stands with hands on his hips looking away frustrated, while the woman sits at the dining table with head resting in her hand, exhausted from constant arguing. Subtle dramatic lighting, high emotional tension, authentic domestic atmosphere, muted warm tones, shallow depth of field, 8k resolution, shot on Arri Alexa, masterclass cinematography.",
    negativePrompt: "cartoon, theatrical screaming, comical, distorted anatomy, low quality"
  },
  {
    num: 7,
    targetFile: "_raw/situation-07.jpg",
    page: "index.htm (Situation Card 07)",
    category: "Love & Relationships",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Toxic Relationships & Mental Relief / Evil Eye",
    scene: "A woman finding peace and spiritual relief after cleansing toxic energy, meditating peacefully with a calm expression, soft divine rays around her.",
    prompt: "A beautiful serene Indian woman sitting in quiet meditation in a tranquil sacred space with subtle floating incense smoke and gentle diya oil lamp glow. Her face radiates newfound peace, freedom from toxic attachments, inner healing. Soft golden light illuminating her profile, sacred brass bowls and rudraksha beads nearby in soft focus, spiritual aura, ethereal yet grounded and hyperrealistic, 8k resolution, cinematic lighting.",
    negativePrompt: "dark fantasy, scary, demonic, cartoon, over-exposed, deformed anatomy"
  },
  {
    num: 8,
    targetFile: "_raw/situation-08.jpg",
    page: "index.htm (Situation Card 08)",
    category: "Husband-Wife & Divorce",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Divorce Prevention & Reconciliation",
    scene: "Husband and wife sitting across a table with legal divorce papers pushed aside, their hands touching in mutual forgiveness, breaking the split.",
    prompt: "Poignant cinematic scene of a married Indian husband and wife in their early 30s. A table between them holds legal separation papers and wedding rings, but their hands are reaching out and clasping together in heartfelt reconciliation. Subtle tears, deep emotional relief and healing, soft natural window light, warm timber interior, hyperrealistic, 8k resolution, award-winning storytelling photography.",
    negativePrompt: "cartoon, fake emotions, text on paper, deformed hands, blurry"
  },
  {
    num: 9,
    targetFile: "_raw/situation-09.jpg",
    page: "index.htm (Situation Card 09)",
    category: "Husband-Wife & Divorce",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Marriage & Husband-Wife Disputes",
    scene: "Married couple sitting in silent tension, but with an underlying longing to reconnect, subtle domestic atmosphere.",
    prompt: "Cinematic portrait of an Indian married couple in a traditional home experiencing marital tension. The husband in a kurta sits on an armchair looking deeply concerned, the wife in a saree stands near an arched doorway looking over her shoulder with longing and sadness. Sacred Vedic home atmosphere with brass bells and warm lamps in background, authentic emotional depth, 8k resolution, hyperrealistic.",
    negativePrompt: "cartoon, exaggerated drama, low resolution, extra arms"
  },
  {
    num: 10,
    targetFile: "_raw/situation-10.jpg",
    page: "index.htm (Situation Card 10)",
    category: "Marriage Specialist",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Family Not Accepting Love Marriage",
    scene: "A young couple standing respectfully before conservative Indian parents in a traditional living room, seeking blessings, parents' stern expressions starting to soften.",
    prompt: "A dramatic, emotional cinematic shot inside a traditional Indian family home. A young devoted couple in traditional attire standing respectfully with folded hands (Namaste) before elder parents seated on a sofa. The father and mother have contemplative, softening expressions. Warm rich Indian interior with marigold garlands and ancestral portraits in background, atmospheric depth of field, 8k resolution, photorealistic masterpiece.",
    negativePrompt: "cartoon, flat lighting, aggressive caricatures, deformed fingers"
  },
  {
    num: 11,
    targetFile: "_raw/situation-11.jpg",
    page: "index.htm (Situation Card 11)",
    category: "Marriage Specialist",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Inter-Caste & Interfaith Marriage Solutions",
    scene: "A couple from different cultural backgrounds celebrating their sacred wedding rituals, hands tied in marriage knot (Gathbandhan), holy fire (Havan) glowing.",
    prompt: "Rich cinematic close-up of an inter-caste Indian wedding ritual. The bride's henna-adorned hands and the groom's hands tied together with a sacred red and gold silk thread (Gathbandhan) over the warm glowing Vedic holy fire (Havan). Rose petals scattered, gold bangles glistening in the firelight, sacred smoke curling upward, profound spiritual unity, 8k resolution, ultra-detailed macro photography, warm royal color palette.",
    negativePrompt: "blurry, deformed fingers, cartoon, distorted fire, artificial CGI"
  },
  {
    num: 12,
    targetFile: "_raw/situation-12.jpg",
    page: "index.htm (Situation Card 12)",
    category: "Visa & Overseas",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Visa Delays & Overseas Settlement with Partner",
    scene: "An international airport terminal, an Indian couple with passports and luggage, joyfully hugging before departure to settle abroad together.",
    prompt: "Cinematic photograph of an Indian husband and wife at an international airport departures terminal. They are joyfully holding passports with visa stamps, standing beside their travel luggage. Through the expansive floor-to-ceiling glass windows, a modern commercial jet airliner is seen on the tarmac bathed in golden sunrise light. Expressions of triumphant happiness, relief, and adventure, 8k, photorealistic, 50mm f/1.4 lens.",
    negativePrompt: "cartoon, distorted planes, fake passports, weird limbs, blurry"
  },
  {
    num: 13,
    targetFile: "_raw/situation-13.jpg",
    page: "index.htm (Situation Card 13)",
    category: "Graha Dosha & Protection",
    dimensions: "800 x 600 px (4:3 aspect ratio)",
    subject: "Career Hurdles, Mangal Dosha & Evil Eye Protection",
    scene: "A sacred Vedic brass Navagraha plate with red coral and gemstones, oil lamps, surrounded by holy Vedic scriptures, radiating protective golden light.",
    prompt: "Atmospheric, majestic still life of authentic Vedic astrology rituals. An ancient copper Navagraha Yantra surrounded by glowing brass oil lamps (diyas), sacred red vermillion (kumkum), energized gemstones including natural red coral, yellow sapphire, and rudraksha beads resting on an ancient palm-leaf manuscript. Gentle curls of frankincense smoke, golden warm bokeh, spiritual authority and serenity, 8k resolution, macro photorealism.",
    negativePrompt: "cartoon, dark occult, scary, skull, modern digital graphics, blurry"
  },

  // ==========================================
  // SECTION 2: 57 DEDICATED SERVICE LANDING PAGES
  // ==========================================
  // Category 1: World Best & Marriage Specialist (14 pages)
  {
    num: 14,
    targetFile: "_raw/world-best-marriage-specialist.jpg",
    page: "world-best-marriage-specialist.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "World's Best Marriage Specialist Astrologer",
    scene: "Vedic master astrologer in saffron silk conducting a sacred marriage blessing ritual with Kundali birth charts and holy fire.",
    prompt: "Majestic cinematic scene of a revered Vedic astrologer seated serenely in a traditional consultation room with carved wooden shelves filled with ancient astrological scriptures. On his wooden desk lies an authentic handwritten Janam Kundali birth chart, brass compass, energized crystals, and fresh jasmine flowers. A glowing brass lamp illuminates his wise, compassionate face. Royal ivory, crimson and gold atmosphere, 8k resolution, hyperrealistic, award-winning editorial lighting.",
    negativePrompt: "cartoon, Western wizard, crystal ball, dark occult, distorted hands"
  },
  {
    num: 15,
    targetFile: "_raw/love-marriage-specialist.jpg",
    page: "love-marriage-specialist.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer",
    scene: "A joyous young Indian bride and groom in gorgeous royal wedding attire, looking into each other's eyes during their Vedic wedding ceremony.",
    prompt: "An exquisite cinematic portrait of a regal Indian bride in an ornate red and gold Zardozi lehenga and a handsome groom in an ivory sherwani and safa, smiling tenderly at each other amidst falling marigold and rose petals during their Vedic Vivah ceremony. Soft sacred fire glow, opulent royal palace backdrop, authentic cultural grandeur, 8k resolution, photorealistic, rich warm tones.",
    negativePrompt: "cartoon, cheap clothing, artificial 3d, deformed eyes, blurry"
  },
  {
    num: 16,
    targetFile: "_raw/world-best-astrologer.jpg",
    page: "world-best-astrologer.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "World's Best Vedic Astrologer Sandeep Ji",
    scene: "An authoritative, wise Vedic astrological consultation setting with celestial brass armillary sphere, horoscope charts, and sacred symbols.",
    prompt: "Cinematic, dignified portrait of a distinguished Indian Vedic astrological master in a rich ivory and maroon silk shawl, studying planetary positions on an antique brass astrological armillary sphere and handwritten Sanskrit horoscope chart. Warm library of sacred ancient texts in background, soft morning sunlight casting divine rays, wisdom and deep serenity, 8k resolution, master portrait photography.",
    negativePrompt: "cartoon, fantasy sorcerer, crystal ball, evil look, blurry"
  },
  {
    num: 17,
    targetFile: "_raw/intercaste-love-marriage-specialist.jpg",
    page: "intercaste-love-marriage-specialist.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Inter-Caste Love Marriage Specialist",
    scene: "Two diverse families joining hands in celebration around an auspicious wedding setup, joy and harmony uniting them.",
    prompt: "A heartwarming cinematic photograph of two diverse Indian families happily celebrating an engagement ceremony. The fathers are embracing warmly, mothers smiling and sharing traditional sweets (laddoo), while the young couple in traditional silk outfits exchange loving glances. Joyous cultural harmony, festive marigold decorations, warm incandescent lighting, authentic happiness, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, fake smiles, awkward poses, extra limbs"
  },
  {
    num: 18,
    targetFile: "_raw/interfaith-love-marriage-solution.jpg",
    page: "interfaith-love-marriage-solution.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Interfaith & Inter-Religion Marriage Astrologer",
    scene: "A loving couple from two distinct cultural and religious heritages standing together hand in hand under a canopy of white blossoms and golden lights.",
    prompt: "A beautiful, respectful cinematic visual of an interfaith couple standing hand in hand. The woman wears an elegant pastel embroidered attire and the man wears a classic formal outfit. They stand peacefully under a floral wedding canopy adorned with white orchids and warm fairy lights. Subtle sacred symbols of peace in the soft background, mutual respect, profound harmony, 8k resolution, soft focus portrait.",
    negativePrompt: "religious stereotypes, conflict, cartoon, deformed hands"
  },
  {
    num: 19,
    targetFile: "_raw/convince-parents-for-love-marriage.jpg",
    page: "convince-parents-for-love-marriage.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "How to Convince Parents for Love Marriage",
    scene: "Emotional moment where traditional Indian parents warmly place their hands in blessing on the heads of the young couple kneeling before them.",
    prompt: "An authentic, deeply touching cinematic scene in a cultured Indian home. Elderly Indian parents smiling with tears of joy, placing their hands in blessing on the heads of their kneeling son and future daughter-in-law. The daughter-in-law touches the mother's feet with reverence. Warm afternoon light, rich family home setting, generational healing and reconciliation, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, rigid stiffness, distorted hands, blurry"
  },
  {
    num: 20,
    targetFile: "_raw/delay-in-marriage-solution.jpg",
    page: "delay-in-marriage-solution.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Late Marriage & Delay in Marriage Problem Solution",
    scene: "A beautiful young Indian woman performing Katyayani Vrata / Shiva-Parvati puja with fresh flowers and diya for early marriage yoga.",
    prompt: "Cinematic photograph of a graceful 28-year-old Indian woman in a yellow silk saree performing a sacred Vivah Badha Nivaran prayer before a Shiva-Parvati idol. She offers fresh red hibiscus and bael leaves, hands folded in prayer, a glowing brass diya casting gentle light on her hopeful, serene face. Sacred temple sanctuary atmosphere, divine grace, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, dark occult, scary, ugly faces, extra limbs"
  },
  {
    num: 21,
    targetFile: "_raw/kundali-milan-for-marriage.jpg",
    page: "kundali-milan-for-marriage.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Authentic Kundali Milan & Gun Milan for Marriage",
    scene: "Two traditional Janam Kundali horoscope charts placed side by side with a golden quill, gemstones, and 36 Guna Ashtakoot matching calculations.",
    prompt: "High-end aesthetic macro photograph of two authentic handwritten Vedic Kundali birth charts lying side-by-side on antique parchment paper. An ornate golden pen, natural yellow sapphire and red coral gemstones, rudraksha beads, and fresh jasmine buds rest beside the charts. Soft candlelight casting warm amber shadows, ancient wisdom, astrological precision, 8k resolution, hyperrealistic depth of field.",
    negativePrompt: "blurry text, digital screens, modern laptops, cartoon"
  },
  {
    num: 22,
    targetFile: "_raw/mangal-dosha-marriage-problem.jpg",
    page: "mangal-dosha-marriage-problem.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Manglik Dosha Nivaran & Marital Protection Remedies",
    scene: "Sacred Mangal Shanti puja setup with natural red coral, copper Yantra, red flowers, and holy havan fire.",
    prompt: "Majestic cinematic visual of a traditional Mangal Shanti Vedic ritual. A consecrated copper Mangal Yantra surrounded by red carnations, natural triangular red coral in gold, copper water pot (Kalash) with coconut and mango leaves, and sacred havan fire glowing softly in background. Sacred spiritual power, deep crimson and bronze tones, 8k resolution, photorealistic macro photography.",
    negativePrompt: "cartoon, scary fire, devilish, fantasy, deformed objects"
  },
  {
    num: 23,
    targetFile: "_raw/nadi-dosha-marriage-solution.jpg",
    page: "nadi-dosha-marriage-solution.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Nadi Dosha Cancellation & Marriage Problem Solution",
    scene: "A sacred Maha Mrityunjaya and gold donation ritual being performed by Vedic priests to cancel Nadi Dosha for a smiling couple.",
    prompt: "A reverent Vedic ritual scene where an Indian couple participates in a sacred Nadi Dosha Shanti puja led by a Vedic pundit. The couple offers flowers and sacred water to a copper Shivling, blessed with holy ash and sandalwood paste. Sacred temple ambiance, golden lamps flickering, spiritual cleansing, peaceful expressions, 8k resolution, authentic cultural photography.",
    negativePrompt: "cartoon, 3d render, distorted anatomy, messy hands"
  },
  {
    num: 24,
    targetFile: "_raw/bhakoot-dosha-nivaran.jpg",
    page: "bhakoot-dosha-nivaran.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Bhakoot Dosha Nivaran & Marital Harmony",
    scene: "A couple holding a sacred Shiva-Parvati silver coin together over sacred water, symbolizing balance and emotional harmony.",
    prompt: "Close-up cinematic shot of an Indian husband and wife's hands jointly holding a consecrated silver coin depicting Shiva and Parvati over a polished brass Kalash filled with sacred water and rose petals. Glistening reflections, emotional peace, marital harmony, soft warm lighting, 8k resolution, high-end editorial macro photography.",
    negativePrompt: "blurry, distorted fingers, cartoon, plastic skin"
  },
  {
    num: 25,
    targetFile: "_raw/arranged-marriage-problem-solution.jpg",
    page: "arranged-marriage-problem-solution.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Arranged Marriage Compatibility & Problem Solution",
    scene: "A newlywed couple in an arranged marriage enjoying a candid, warm laugh together on their balcony over evening tea, growing closer.",
    prompt: "A candid, tender cinematic moment between an Indian newlywed couple on their scenic balcony at dusk. The husband in a casual kurta and the wife in a modern pastel saree are sharing evening chai, laughing warmly together as genuine affection blossoms between them. Fairy lights and city skyline in soft bokeh background, romance, emotional comfort, 8k resolution, photorealistic.",
    negativePrompt: "stiff models, cartoon, fake laugh, bad anatomy"
  },
  {
    num: 26,
    targetFile: "_raw/second-marriage-yoga-astrology.jpg",
    page: "second-marriage-yoga-astrology.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Second Marriage & Remarriage Astrological Guidance",
    scene: "A mature, elegant Indian couple in their mid-to-late 30s enjoying a serene walk in a palace garden, ready for a blissful new beginning.",
    prompt: "A dignified and romantic cinematic portrait of a mature Indian couple (late 30s/early 40s) walking together through a sun-dappled heritage palace garden. The woman looks elegant in a rose gold silk suit and the man in a tailored bandhgala. They look at each other with deep gratitude, healing, and maturity. Golden autumn sunlight, peaceful new beginnings, 8k resolution, photorealistic masterpiece.",
    negativePrompt: "teenage models, cartoon, over-saturated, plastic skin"
  },
  {
    num: 27,
    targetFile: "_raw/marriage-proposal-acceptance.jpg",
    page: "marriage-proposal-acceptance.html",
    category: "Marriage Specialist",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Marriage Proposal Acceptance & Quick Rishta Remedies",
    scene: "A romantic marriage proposal where the Indian woman with a radiant expression joyfully accepts a ring under fairy lights.",
    prompt: "A breathtaking cinematic marriage proposal in a romantic rooftop terrace adorned with warm fairy lights, candles, and red rose petals. A handsome Indian man in a sharp blazer presents an open velvet ring box to a gorgeous Indian woman covering her mouth in overwhelmed joy and tearful happiness, saying YES. Intimate, magical atmosphere, 8k resolution, photorealistic, 85mm f/1.4 lens.",
    negativePrompt: "cartoon, distorted jewelry, awkward hands, flat lighting"
  },

  // Category 2: Visa, Overseas & Foreign Settlement (7 pages)
  {
    num: 28,
    targetFile: "_raw/visa-problem-solution-astrology.jpg",
    page: "visa-problem-solution-astrology.html",
    category: "Visa & Overseas",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Visa Problem Solution Astrologer & Foreign Travel Remedies",
    scene: "An Indian professional holding an approved visa passport, standing in front of a modern international embassy building with golden sunrise light.",
    prompt: "A triumphant cinematic photograph of a young Indian professional holding an open passport displaying a stamped visa approval, standing outside a sleek international consular building at sunrise. A confident, joyful smile, modern professional attire, golden morning sun flare reflecting off glass architecture, freedom, global success, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, fake looking passport, blurry, distorted hands"
  },
  {
    num: 29,
    targetFile: "_raw/foreign-settlement-astrology.jpg",
    page: "foreign-settlement-astrology.html",
    category: "Visa & Overseas",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Foreign Settlement Astrology & Overseas PR Yoga",
    scene: "A happy Indian family standing in front of their beautiful new home in a scenic North American/European suburb with suitcases.",
    prompt: "A heartwarming cinematic portrait of a successful Indian couple with their young child standing happily in front of their contemporary home in a scenic overseas suburban neighborhood (Canada/USA). Lush green lawn, autumn maple trees, luggage on the porch, warm afternoon sunlight, the realization of the global dream, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, distorted faces, unnatural poses, low resolution"
  },
  {
    num: 30,
    targetFile: "_raw/spouse-visa-delay-solution.jpg",
    page: "spouse-visa-delay-solution.html",
    category: "Visa & Overseas",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Spouse Visa Delay & International Reunion Astrology",
    scene: "A couple embracing tightly in the arrivals gate of an international airport after a long and painful visa separation.",
    prompt: "An intensely emotional cinematic photograph of an Indian husband and wife embracing tightly at an international airport arrivals gate. Tears of pure relief and joy streaming down their faces after months of separation. Luggage trolley beside them, blurred airport travelers in background, poignant reunion, 8k resolution, documentary-style photorealism.",
    negativePrompt: "cartoon, cold emotion, deformed faces, blurry"
  },
  {
    num: 31,
    targetFile: "_raw/student-visa-astrology-remedies.jpg",
    page: "student-visa-astrology-remedies.html",
    category: "Visa & Overseas",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Student Visa Approval & Foreign Education Astrology",
    scene: "An Indian student with a backpack holding an acceptance letter outside a historic ivy-league university campus.",
    prompt: "A cheerful, ambitious 22-year-old Indian student carrying a backpack and holding a university acceptance folder, standing proudly on the cobblestone quad of a prestigious ivy-covered historic university campus abroad. Crisp autumn foliage, golden sunshine, optimism, academic triumph, 8k resolution, photorealistic, 50mm f/1.4 lens.",
    negativePrompt: "cartoon, blurry, distorted architecture, extra fingers"
  },
  {
    num: 32,
    targetFile: "_raw/pr-citizenship-astrology.jpg",
    page: "pr-citizenship-astrology.html",
    category: "Visa & Overseas",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Permanent Residency (PR) & Citizenship Astrology",
    scene: "An Indian couple celebrating receiving their official permanent residency confirmation documents with joy.",
    prompt: "A joyful cinematic photograph of a proud Indian couple in their modern apartment holding an official Permanent Residency confirmation document with happy smiles. A miniature global globe and laptop on the wooden desk, celebratory flowers on table, warm natural lighting pouring in from tall windows, 8k resolution, hyperrealistic.",
    negativePrompt: "cartoon, text artifacts, bad anatomy, flat colors"
  },
  {
    num: 33,
    targetFile: "_raw/work-visa-job-abroad-astrology.jpg",
    page: "work-visa-job-abroad-astrology.html",
    category: "Visa & Overseas",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Work Permit & Overseas Career Astrology Remedies",
    scene: "An Indian professional in formal business attire standing in a high-rise office overlooking a global skyline (Dubai / New York / London).",
    prompt: "An inspiring cinematic portrait of a sharp Indian tech/corporate professional in a tailored suit standing in a modern glass corner office, looking out at the panoramic skyline of a global city (skyscrapers, modern architecture). Confident posture, ambient executive office lighting, global career success, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, unrealistic skyline, blurry, distorted hands"
  },
  {
    num: 34,
    targetFile: "_raw/cross-border-love-marriage-visa.jpg",
    page: "cross-border-love-marriage-visa.html",
    category: "Visa & Overseas",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Cross-Border Love Marriage & International Visa Solutions",
    scene: "An international couple holding hands across a vintage world map with two passports and wedding rings placed on it.",
    prompt: "An artistic cinematic still life: two distinct international passports lying side by side on an antique parchment world map, linked together by two shining gold wedding bands and a red silk ribbon. Soft vintage compass and fresh white roses nearby. Warm golden candlelight, symbolizing cross-border love conquering distance, 8k resolution, macro photography.",
    negativePrompt: "cartoon, digital CGI, messy text, blurry"
  },

  // Category 3: Lost Love, Ex Recovery & Relationship Healing (10 pages)
  {
    num: 35,
    targetFile: "_raw/get-lost-love-back.jpg",
    page: "get-lost-love-back.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Get Lost Love Back by Authentic Vedic Astrology",
    scene: "A couple reuniting under an ancient banyan tree during golden hour, holding each other close after long separation.",
    prompt: "A breathtaking cinematic photograph of an Indian couple embracing passionately beneath a grand ancient banyan tree during a golden hour sunset. Warm rays of sunlight filter through the leaves, illuminating their faces filled with relief, deep forgiveness, and rekindled love. Emotional intimacy, dreamlike yet photorealistic, 8k resolution, masterclass composition.",
    negativePrompt: "cartoon, awkward poses, extra limbs, bad lighting"
  },
  {
    num: 36,
    targetFile: "_raw/get-ex-love-back.jpg",
    page: "get-ex-love-back.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Get Your Ex Love Back Specialist Astrologer",
    scene: "An ex-partner returning with flowers, standing at the doorstep with an apologetic, loving smile.",
    prompt: "Cinematic shot of a handsome Indian man standing on an apartment doorstep holding a bouquet of fresh red roses, gazing with an apologetic, tender, and deeply loving smile at the door opening. Warm hallway lamplight, emotional reconciliation, vulnerability, photorealistic, 8k resolution, shot on 85mm lens.",
    negativePrompt: "cartoon, creepy smile, distorted flowers, bad hands"
  },
  {
    num: 37,
    targetFile: "_raw/partner-stopped-talking-solution.jpg",
    page: "partner-stopped-talking-solution.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Partner Stopped Talking & Blocked on Calls/WhatsApp Solution",
    scene: "A phone on a table illuminating with an incoming call from 'My Love', after days of silence.",
    prompt: "Atmospheric cinematic close-up of a modern smartphone resting on a dark rustic wooden table in a dimly lit room. The screen illuminates brightly showing an incoming call with a heart icon and the contact name glowing in warm white and green. Beside the phone sits a cup of tea and a small brass Ganesha idol. A feeling of divine intervention and overwhelming relief, 8k resolution, photorealistic macro.",
    negativePrompt: "cartoon, messy text, broken screen, blurry"
  },
  {
    num: 38,
    targetFile: "_raw/breakup-problem-solution.jpg",
    page: "breakup-problem-solution.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Breakup Problem Solution & Heartbreak Healing Astrology",
    scene: "A soul healing from heartbreak, looking up toward radiant golden morning sunlight as dark clouds part.",
    prompt: "A powerful, uplifting cinematic image of an Indian woman sitting peacefully in a sun-drenched veranda, closing her eyes and breathing in the morning breeze as golden rays warm her face. A subtle visual motif of a glowing energetic heart healing within her chest. Nature in full bloom around her, emotional liberation, hope, 8k resolution, photorealistic.",
    negativePrompt: "dark, gory, cartoon, medical illustration, blurry"
  },
  {
    num: 39,
    targetFile: "_raw/one-sided-love-solution.jpg",
    page: "one-sided-love-solution.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "One-Sided Love Attraction & Successful Proposal Specialist",
    scene: "A young Indian man and woman seated across a quaint cafe table, the woman leaning forward with sparkling, captivated eyes of mutual attraction.",
    prompt: "A romantic cinematic photograph inside a cozy, charming cafe with vintage wooden decor and hanging warm filament bulbs. A beautiful Indian woman is leaning forward across the table, gazing with sparkling, captivated romantic attraction at a handsome Indian man who smiles warmly back. Golden bokeh, undeniable chemistry, 8k resolution, photorealistic, shot on 50mm f/1.2.",
    negativePrompt: "cartoon, bored expression, flat lighting, extra fingers"
  },
  {
    num: 40,
    targetFile: "_raw/toxic-relationship-healing.jpg",
    page: "toxic-relationship-healing.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Toxic Relationship Healing & Mental Relief Astrology",
    scene: "A person peacefully lighting a diya lamp in a sacred home temple, feeling protected and free from negativity.",
    prompt: "A soothing cinematic photograph of an Indian person lighting an ornate brass oil lamp (diya) in front of a serene household altar. The warm flame casts a protective golden glow, dissolving surrounding shadows. Sacred marigolds, incense smoke drifting peacefully, deep tranquility, emotional sanctuary, 8k resolution, photorealistic.",
    negativePrompt: "scary, dark, cartoon, distorted flame, low quality"
  },
  {
    num: 41,
    targetFile: "_raw/love-breakup-remedies.jpg",
    page: "love-breakup-remedies.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Vedic Remedies for Love Breakup & Soul Reunion",
    scene: "Authentic Gauri-Shankar Rudraksha and Vedic Kamdev yantra surrounded by fresh pink lotus petals and warm lamps.",
    prompt: "Magnificent macro photograph of an authentic, naturally joined Gauri-Shankar Rudraksha bead resting atop a sacred consecrated brass Kamdev Yantra plate. Fresh pink lotus petals and fragrant jasmine flowers surround the sacred setup, illuminated by gentle brass oil lamp flames. Divine spiritual love, 8k resolution, ultra-detailed textures, photorealistic.",
    negativePrompt: "cartoon, plastic rudraksha, dark fantasy, blurry"
  },
  {
    num: 42,
    targetFile: "_raw/attract-desired-partner.jpg",
    page: "attract-desired-partner.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Attract Desired Partner with Vedic Kamdev & Shukra Astrology",
    scene: "A charismatic, radiant person standing confidently with a glowing, warm aura of magnetism and charm.",
    prompt: "A stunning cinematic portrait of an attractive Indian individual radiating magnetic charm and confidence. Dressed in elegant attire, standing against a softly illuminated architectural background during twilight. Warm golden light enhances facial features and sparkling eyes, evoking irresistible charisma, pure attraction, and self-worth, 8k resolution, high-fashion editorial quality.",
    negativePrompt: "cartoon, glowing neon superpowers, fake anime aura, distorted face"
  },
  {
    num: 43,
    targetFile: "_raw/stop-unwanted-marriage.jpg",
    page: "stop-unwanted-marriage.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Stop Forced or Unwanted Marriage Astrological Remedies",
    scene: "A woman standing with serene relief as unwanted matchmaker papers dissolve peacefully, walking toward her true path.",
    prompt: "A symbolic cinematic photograph of an Indian woman standing in a luminous sunlit corridor of an ancient palace, breathing a sigh of deep relief. In the soft blurred background, formal matrimonial proposals are peacefully set aside, while she walks confidently toward a sun-drenched archway representing freedom and true love. Dignified, peaceful resolution, 8k resolution, photorealistic.",
    negativePrompt: "violence, fighting, cartoon, dramatic screaming, blurry"
  },
  {
    num: 44,
    targetFile: "_raw/cheating-partner-solution.jpg",
    page: "cheating-partner-solution.html",
    category: "Love & Relationships",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Cheating Partner Loyalty & Relationship Commitment Remedies",
    scene: "A husband holding his wife's hands with genuine remorse and unwavering loyalty, recommitting to his family.",
    prompt: "An emotional cinematic moment between an Indian husband and wife in their home. The husband holds both of his wife's hands against his chest, looking into her eyes with deep humility, sincere repentance, and absolute devotion. The wife's face shows gentle forgiveness and trust returning. Warm, intimate indoor lighting, 8k resolution, photorealistic masterpiece.",
    negativePrompt: "cartoon, melodramatic crying, distorted hands, blurry"
  },

  // Category 4: Husband-Wife Disputes & Divorce (6 pages)
  {
    num: 45,
    targetFile: "_raw/husband-wife-dispute-solution.jpg",
    page: "husband-wife-dispute-solution.html",
    category: "Husband-Wife & Divorce",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Husband Wife Dispute Problem Solution Astrologer",
    scene: "A married Indian couple sharing a tender moment of forgiveness and love in their living room, ending arguments.",
    prompt: "A beautiful cinematic photograph of an Indian married couple in their early 30s. The husband gently wipes a joyful tear from his wife's cheek as they smile tenderly at each other, sitting close on a couch in their warm living room. Fresh flowers on table, warm home ambiance, reconciliation and peaceful companionship, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, stiff poses, plastic skin, distorted fingers"
  },
  {
    num: 46,
    targetFile: "_raw/divorce-problem-solution.jpg",
    page: "divorce-problem-solution.html",
    category: "Husband-Wife & Divorce",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Divorce Prevention & Reconciliation Astrological Remedies",
    scene: "A couple standing together holding hands outside a family court, choosing to tear up separation papers and stay married.",
    prompt: "A deeply moving cinematic scene outside a courthouse. A married Indian couple stands together on the sunlit steps, their wedding rings gleaming as they tear a divorce petition in half with smiles of profound relief and renewal. Warm sunlight bathing the scene, triumph of love over dispute, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, messy text, ugly faces, bad hands, blurry"
  },
  {
    num: 47,
    targetFile: "_raw/extra-marital-affair-solution.jpg",
    page: "extra-marital-affair-solution.html",
    category: "Husband-Wife & Divorce",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Stop Extra Marital Affairs & Restore Marital Fidelity",
    scene: "A devoted husband sitting happily with his wife and child at home, completely detached from outside distractions.",
    prompt: "A heartwarming cinematic portrait of a reunited Indian family in their cozy living room. A devoted husband lovingly playing with his young child while laughing warmly with his wife, who leans against his shoulder. His smartphone lies face down, forgotten on the side table. Pure domestic bliss, absolute loyalty, warm golden ambient lighting, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, infidelity imagery, dark mood, blurry"
  },
  {
    num: 48,
    targetFile: "_raw/in-laws-problem-solution.jpg",
    page: "in-laws-problem-solution.html",
    category: "Husband-Wife & Divorce",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "In-Laws Problem Solution & Saas-Bahu Kalesh Shanti",
    scene: "A mother-in-law and daughter-in-law laughing together warmly in a kitchen while preparing festive food, united in affection.",
    prompt: "A cheerful, heartwarming cinematic scene in a traditional Indian kitchen. An elderly mother-in-law in a cotton saree and her young daughter-in-law are cooking festive sweets together, sharing a joyful, affectionate laugh. The daughter-in-law lovingly feeds a sweet to the mother-in-law. Warm domestic harmony, mutual respect, golden morning light, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, evil caricatures, fighting, bad anatomy"
  },
  {
    num: 49,
    targetFile: "_raw/relationship-counseling-astrology.jpg",
    page: "relationship-counseling-astrology.html",
    category: "Husband-Wife & Divorce",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Vedic Relationship Counseling & Astrological Guidance",
    scene: "A couple engaged in an open, peaceful, deeply connected conversation with birth charts on a table, guided by Vedic wisdom.",
    prompt: "A serene, elegant visual of an Indian couple having an authentic, heartfelt conversation in a quiet consultation room. Between them on a low wooden table rests a Vedic astrology chart and a brass singing bowl. They are listening to each other with empathy, relaxed postures, soft natural lighting through bamboo blinds, emotional maturity, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, arguing, angry faces, clinical hospital setting"
  },
  {
    num: 50,
    targetFile: "_raw/family-dispute-problem-solution.jpg",
    page: "family-dispute-problem-solution.html",
    category: "Husband-Wife & Divorce",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Family Dispute & Parivar Kalesh Shanti Astrologer",
    scene: "An entire multi-generational Indian family seated together in harmony, enjoying a festive meal with laughter and unity.",
    prompt: "A grand, joyful cinematic photograph of a joint Indian family of three generations gathered around a lavish dining table for a festival meal. Grandparents, adult siblings, spouses, and children laughing together in genuine unity and celebration. Warm brass lamps, marigold garlands, abundance of food, family peace restored, 8k resolution, award-winning cultural photography.",
    negativePrompt: "cartoon, flat lighting, messy table, distorted faces"
  },

  // Category 5: Graha Dosha, Vashikaran & Protection (7 pages)
  {
    num: 51,
    targetFile: "_raw/positive-vashikaran-specialist.jpg",
    page: "positive-vashikaran-specialist.html",
    category: "Graha Dosha & Protection",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Positive Vedic Vashikaran Specialist Astrologer",
    scene: "Sacred Vedic Sammohan rituals with golden energized yantras, rose petals, and holy Vedic mantras written on Bhojpatra.",
    prompt: "An exquisite, reverent still life of sacred Satvik Vedic Vashikaran. An authentic golden Sammohan Yantra inscribed with sacred Sanskrit Beej mantras, placed on an ancient Bhojpatra birch bark sheet. Fresh pink lotus flowers, fragrant sandalwood paste, glowing ghee lamps, and pure white quartz crystals surround the sacred plate. Divine spiritual magnetism, 8k resolution, hyperrealistic macro.",
    negativePrompt: "black magic, dark fantasy, voodoo, skulls, demonic, cartoon"
  },
  {
    num: 52,
    targetFile: "_raw/evil-eye-nazar-dosh-removal.jpg",
    page: "evil-eye-nazar-dosh-removal.html",
    category: "Graha Dosha & Protection",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Evil Eye (Buri Nazar) Removal & Spiritual Protection",
    scene: "A protective silver Vedic Kavach amulet with sacred black thread and camphor flame, cleansing negative psychic energy.",
    prompt: "A dramatic, atmospheric macro photograph of a consecrated silver Vedic Raksha Kavach (protective talisman) hanging from a sacred black thread, held over a purifying camphor flame on a brass aarti plate. Wisps of white smoke dissipating into the dark background, golden embers, divine protection from evil eye, 8k resolution, cinematic lighting.",
    negativePrompt: "cartoon, scary eyes, demonic symbols, blurry"
  },
  {
    num: 53,
    targetFile: "_raw/black-magic-removal-astrologer.jpg",
    page: "black-magic-removal-astrologer.html",
    category: "Graha Dosha & Protection",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Black Magic Removal & Negative Energy Protection",
    scene: "Divine golden light breaking through dark shadows, symbolizing victorious Vedic Maha Sudarshana mantra clearing dark energy.",
    prompt: "An epic, divine spiritual visual: a radiant, golden sacred Sudarshana Chakra of pure cosmic light bursting through dissolving dark, foggy shadows. Sacred Sanskrit syllables glowing in brilliant gold, radiating peace, invincible divine protection, and absolute purification. Majestic, sacred, hyperrealistic cinematic quality, 8k resolution.",
    negativePrompt: "cartoon, demonic imagery, gore, horror movie poster, dark occult"
  },
  {
    num: 54,
    targetFile: "_raw/graha-shanti-puja-remedies.jpg",
    page: "graha-shanti-puja-remedies.html",
    category: "Graha Dosha & Protection",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Navagraha Shanti Puja & Vedic Planetary Remedies",
    scene: "A complete Navagraha mandala setup with 9 distinct colored grains, 9 planetary gems, and sacred havan kund fire.",
    prompt: "A breathtaking high-angle cinematic view of an authentic Navagraha Shanti mandala created on a polished marble temple floor with nine colored grains, nine energized planetary gemstones, betel leaves, and nine brass oil lamps. Sacred Vedic Havan fire glowing beside the mandala with aromatic smoke rising. Supreme Vedic precision, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, messy grains, blurry, distorted geometry"
  },
  {
    num: 55,
    targetFile: "_raw/kaal-sarp-dosha-nivaran.jpg",
    page: "kaal-sarp-dosha-nivaran.html",
    category: "Graha Dosha & Protection",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Kaal Sarp Dosh Nivaran & Complete Shanti Puja",
    scene: "Sacred silver Nag-Nagin pair offered during Shiva Abhishek puja with milk, bilva leaves, and glowing diya.",
    prompt: "Reverent close-up shot of an authentic Kaal Sarp Shanti ritual. A handcrafted silver pair of serpents (Nag-Nagin) resting on a black granite Shivling during Panchamrit abhishek. Fresh green Bael leaves, white Datura flowers, and raw milk flowing gracefully over the lingam. Faint incense smoke, holy temple atmosphere, 8k resolution, photorealistic.",
    negativePrompt: "scary snake, venomous animal, cartoon, fake CGI"
  },
  {
    num: 56,
    targetFile: "_raw/shani-sade-sati-remedies.jpg",
    page: "shani-sade-sati-remedies.html",
    category: "Graha Dosha & Protection",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Shani Sade Sati & Dhaiya Astrological Remedies",
    scene: "A consecrated iron ring, black sesame seeds, and mustard oil diya lit on a Saturday for Lord Shani Dev's grace.",
    prompt: "Atmospheric, dignified still life of a Shani Dev propitiation setup. An ancient black stone Shani Yantra with an energized black horseshoe ring resting on a brass dish filled with black sesame seeds and blue aprajita flowers. A mustard oil iron lamp (diya) burns with a calm, steady golden flame. Solemn, powerful, meditative, 8k resolution, photorealistic macro.",
    negativePrompt: "cartoon, scary devil, distorted objects, blurry"
  },
  {
    num: 57,
    targetFile: "_raw/rahu-ketu-dosha-remedies.jpg",
    page: "rahu-ketu-dosha-remedies.html",
    category: "Graha Dosha & Protection",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Rahu Ketu Mahadasha & Shadow Planet Remedies",
    scene: "Gomed (Hessonite) and Cat's Eye gemstones glowing beside ancient palm-leaf shadow planet charts and copper yantras.",
    prompt: "Exquisite macro still life of shadow planet astrology: a sparkling, honey-colored natural Hessonite (Gomed) gemstone and a sharp-eyed Chrysoberyl Cat's Eye gemstone set in silver pendants, resting on a sacred copper Rahu-Ketu Yantra. Ancient Sanskrit manuscript pages in soft background, mystical yet scientifically precise, 8k resolution, hyperrealistic.",
    negativePrompt: "cartoon, dark demons, fake plastic gems, blurry"
  },

  // Category 6: Career, Business & Wealth (3 pages)
  {
    num: 58,
    targetFile: "_raw/career-problem-solution-astrology.jpg",
    page: "career-problem-solution-astrology.html",
    category: "Career & Business",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Career Problem Solution & Job Growth Astrology",
    scene: "A young Indian professional receiving a promotion letter and congratulations from colleagues in a modern office.",
    prompt: "A triumphant cinematic photograph in a modern corporate office. A young Indian professional in business attire smiling proudly as senior executives shake his hand, handing him a promotion letter. Colleagues applauding in the background. Bright, professional office setting, morning sun streaming through glass windows, career milestone victory, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, fake smiles, distorted hands, blurry"
  },
  {
    num: 59,
    targetFile: "_raw/business-growth-astrology.jpg",
    page: "business-growth-astrology.html",
    category: "Career & Business",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Business Growth Astrology & Business Loss Recovery",
    scene: "A business owner in their thriving store/office, smiling warmly as customers and revenue flow in.",
    prompt: "An inspiring cinematic shot of an Indian entrepreneur standing proudly inside their upscale, bustling retail showroom or commercial enterprise. A brass Kuber wealth yantra is discreetly placed behind the counter with fresh marigold garland. Happy customers browsing in the background, warm commercial lighting, thriving business success, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, empty store, sad expression, messy composition"
  },
  {
    num: 60,
    targetFile: "_raw/financial-crisis-money-astrology.jpg",
    page: "financial-crisis-money-astrology.html",
    category: "Career & Business",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Financial Crisis, Debt Relief & Wealth Astrology",
    scene: "Golden Maha Lakshmi Shri Yantra radiating abundant golden light, surrounded by gold coins, symbolizing debt eradication.",
    prompt: "Majestic, high-end macro photograph of an authentic three-dimensional Maha Meru Shri Yantra in solid panchdhatu gold, radiating divine abundance and golden light. Fresh lotus flowers, unbroken rice grains (akshat), and pure gold coins scattered around its sacred geometric base. Wealth manifestation, divine prosperity, 8k resolution, photorealistic masterpiece.",
    negativePrompt: "cartoon, cheap fake gold, distorted geometry, blurry"
  },

  // Category 7: Global & NRI Locations (10 pages)
  {
    num: 61,
    targetFile: "_raw/love-marriage-specialist-usa.jpg",
    page: "love-marriage-specialist-usa.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in USA",
    scene: "An Indian NRI couple in modern chic winter coats smiling happily against the New York City skyline and Brooklyn Bridge.",
    prompt: "A stylish, romantic cinematic photograph of a young Indian NRI couple standing affectionately on the Brooklyn Bridge promenade during sunset. The Manhattan skyline and soft golden sky reflected in the East River behind them. The woman wears a chic camel trench coat and the man wears a tailored wool coat, holding hands and smiling lovingly, 8k resolution, photorealistic, 50mm f/1.4 lens.",
    negativePrompt: "cartoon, tourist stereotypes, bad anatomy, blurry"
  },
  {
    num: 62,
    targetFile: "_raw/love-marriage-specialist-uk.jpg",
    page: "love-marriage-specialist-uk.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in UK",
    scene: "A British Asian couple walking hand in hand along the Thames riverbank with the London Eye and Westminster in background.",
    prompt: "Romantic cinematic photograph of an attractive British Asian couple walking hand in hand along the South Bank in London during blue hour twilight. Warm street lamps glowing, iconic London architecture softly blurred in the background, elegant autumn coats, intimate and romantic connection, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, rainy grim darkness, distorted faces, blurry"
  },
  {
    num: 63,
    targetFile: "_raw/love-marriage-specialist-canada.jpg",
    page: "love-marriage-specialist-canada.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in Canada",
    scene: "An Indian couple enjoying an autumn walk in a Toronto park with CN tower in the background, surrounded by red maple trees.",
    prompt: "A gorgeous cinematic photograph of an Indian couple in love, walking through a Toronto park surrounded by vibrant red and golden autumn maple trees. The iconic CN Tower skyline is visible in the soft background. The couple laughs warmly as the man wraps his arm around her shoulders, Canadian NRI love story, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, snow blizzard, distorted faces, bad limbs"
  },
  {
    num: 64,
    targetFile: "_raw/love-marriage-specialist-australia.jpg",
    page: "love-marriage-specialist-australia.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in Australia",
    scene: "An Indian couple by the Sydney Harbour promenade enjoying the golden sunset breeze, holding hands lovingly.",
    prompt: "A radiant cinematic photograph of an Indian couple holding hands by the Sydney Harbour waterfront at golden hour sunset. Iconic white sails of the Opera House and Harbour Bridge gently blurred across the sparkling blue water, gentle sea breeze playing with her hair, romantic happiness, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, tourist selfie style, harsh flash, extra limbs"
  },
  {
    num: 65,
    targetFile: "_raw/love-marriage-specialist-uae.jpg",
    page: "love-marriage-specialist-uae.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in UAE & Dubai",
    scene: "An Indian expat couple dressed in elegant evening attire by a rooftop terrace overlooking the illuminated Dubai Marina skyline.",
    prompt: "An opulent, romantic cinematic photograph of a glamorous Indian couple standing on a luxury rooftop terrace overlooking the Dubai Marina illuminated by glittering skyscrapers at night. The woman wears a chic designer gown and the man a crisp tailored suit, sharing an intimate romantic moment under desert starlight, 8k resolution, photorealistic masterpiece.",
    negativePrompt: "cartoon, tacky neon, distorted architecture, blurry"
  },
  {
    num: 66,
    targetFile: "_raw/love-marriage-specialist-delhi.jpg",
    page: "love-marriage-specialist-delhi.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in Delhi NCR",
    scene: "A young couple in traditional modern ethnic wear smiling lovingly in the serene gardens of Lodhi Garden or India Gate backdrop.",
    prompt: "A charming cinematic portrait of a Delhi couple in contemporary Indian designer wear strolling through the lush historic greenery of Lodhi Gardens. Mughal architectural arches in background bathed in golden afternoon sunlight, authentic Delhi romance, serene and deeply connected, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, crowded tourist mess, traffic, smog, blurry"
  },
  {
    num: 67,
    targetFile: "_raw/love-marriage-specialist-mumbai.jpg",
    page: "love-marriage-specialist-mumbai.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in Mumbai",
    scene: "A romantic couple enjoying the sunset breeze at Marine Drive sea face, looking out into the Arabian sea together.",
    prompt: "An iconic, romantic cinematic photograph of a young Mumbai couple sitting on the Marine Drive promenade at sunset. Golden orange sunlight reflecting on the Arabian Sea waves, Queen's Necklace curve in soft background, holding hands in quiet intimacy, authentic Mumbai love story, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, trash, crowded chaos, over-saturated, blurry"
  },
  {
    num: 68,
    targetFile: "_raw/love-marriage-specialist-punjab.jpg",
    page: "love-marriage-specialist-punjab.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in Punjab & Chandigarh",
    scene: "A Punjabi couple in traditional Phulkari and Kurta Pajama standing joyfully amidst blooming mustard fields (Sarson) in Punjab.",
    prompt: "A vibrant, heart-stirring cinematic photograph of a Punjabi couple in lush golden-yellow blooming mustard fields (Sarson ke Khet) in Punjab. The woman wears an exquisite embroidered Phulkari dupatta and Punjabi suit, and the man wears a classic Kurta with a matching turban. Pure joy, genuine love, golden hour radiance, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, cheap Bollywood parody, distorted anatomy, blurry"
  },
  {
    num: 69,
    targetFile: "_raw/love-marriage-specialist-bangalore.jpg",
    page: "love-marriage-specialist-bangalore.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in Bangalore",
    scene: "A modern tech couple enjoying a peaceful weekend stroll under the majestic rain trees of Cubbon Park, Bangalore.",
    prompt: "A serene, romantic cinematic photograph of an Indian tech professional couple in smart casual wear walking hand in hand beneath the towering green canopies and pink trumpet flowers of Cubbon Park in Bangalore. Gentle morning mist, dappled sunlight, coffee mugs in hand, modern urban love finding peace, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, office cubicles, busy traffic, flat lighting"
  },
  {
    num: 70,
    targetFile: "_raw/love-marriage-specialist-hyderabad.jpg",
    page: "love-marriage-specialist-hyderabad.html",
    category: "Global & NRI Locations",
    dimensions: "1200 x 675 px (16:9 aspect ratio)",
    subject: "Love Marriage Specialist Astrologer in Hyderabad",
    scene: "A couple in royal Hyderabadi ethnic wear enjoying a quiet moment at a heritage palace courtyard in Hyderabad.",
    prompt: "A regal, romantic cinematic photograph of a Hyderabadi couple dressed in elegant Nawabi ethnic attire, standing on an intricately carved stone terrace of a heritage palace in Hyderabad at twilight. The lit heritage domes and Hussain Sagar lake glow softly in the distance, timeless romantic elegance, 8k resolution, photorealistic.",
    negativePrompt: "cartoon, tourist clutter, bad posture, distorted eyes"
  },

  // ==========================================
  // SECTION 3: 7 CATEGORY MASTER BANNERS
  // ==========================================
  {
    num: 71,
    targetFile: "_raw/banner-category-marriage.jpg",
    page: "sitemap.html & Category Sections (Marriage)",
    category: "Category Banner",
    dimensions: "1200 x 500 px (2.4:1 banner aspect ratio)",
    subject: "Marriage & Love Marriage Specialist Master Category Banner",
    scene: "Panoramic Vedic wedding ceremony with golden mandap, sacred holy fire, marigolds, and traditional wedding ornaments.",
    prompt: "An opulent cinematic panoramic banner of an auspicious royal Vedic wedding altar (Mandap). Intricately carved wooden pillars draped with fresh orange marigolds and red roses, glowing holy Havan kund fire in the center, brass Kalash with sacred water, and silk cushions in rich ivory and crimson. Golden divine light radiating, royal luxury, 8k resolution, wide-angle architectural photography.",
    negativePrompt: "cartoon, empty sterile room, bad fire, low resolution"
  },
  {
    num: 72,
    targetFile: "_raw/banner-category-visa.jpg",
    page: "sitemap.html & Category Sections (Visa & Overseas)",
    category: "Category Banner",
    dimensions: "1200 x 500 px (2.4:1 banner aspect ratio)",
    subject: "Visa & Overseas Settlement Master Category Banner",
    scene: "Panoramic conceptual banner blending an ancient astrological chart with a global world map and international flight trajectories.",
    prompt: "A panoramic conceptual artwork: an ancient golden astrological chart and celestial zodiac globe seamlessly blending into a vintage map of the world with glowing flight paths connecting India to USA, UK, Canada, and Australia. Passports and golden compass in foreground bathed in sunrise light, aspirational, global, 8k resolution, hyperrealistic.",
    negativePrompt: "cartoon, blurry, low resolution, messy graphics"
  },
  {
    num: 73,
    targetFile: "_raw/banner-category-love.jpg",
    page: "sitemap.html & Category Sections (Lost Love & Ex)",
    category: "Category Banner",
    dimensions: "1200 x 500 px (2.4:1 banner aspect ratio)",
    subject: "Lost Love & Relationship Healing Master Category Banner",
    scene: "Panoramic romantic sunset with two soulmates walking together hand in hand along a tranquil beach, waves glowing gold.",
    prompt: "A panoramic cinematic banner of two lovers walking hand in hand along a serene shoreline at golden sunset. The sea waves reflect warm liquid amber light, silhouettes framed by a soft pink and gold twilight sky, pure romantic emotional connection, peaceful reconciliation, 8k resolution, wide-angle cinematic composition.",
    negativePrompt: "cartoon, storm, dark, awkward silhouettes, blurry"
  },
  {
    num: 74,
    targetFile: "_raw/banner-category-disputes.jpg",
    page: "sitemap.html & Category Sections (Husband-Wife)",
    category: "Category Banner",
    dimensions: "1200 x 500 px (2.4:1 banner aspect ratio)",
    subject: "Husband-Wife Disputes & Divorce Prevention Master Category Banner",
    scene: "A peaceful Indian household sanctuary with glowing diya lamps, fresh flowers, and symbols of enduring domestic bliss.",
    prompt: "A panoramic cinematic banner of a peaceful, harmonious Indian home interior. An elegant wooden swing (jhula) with silk cushions, a brass urli bowl floating with fresh pink roses and floating candles on a carved table, soft evening sunlight streaming through traditional jali screens. Domestic serenity, peace, and loving sanctuary, 8k resolution, architectural interior photography.",
    negativePrompt: "cartoon, dark messy room, broken items, blurry"
  },
  {
    num: 75,
    targetFile: "_raw/banner-category-dosha.jpg",
    page: "sitemap.html & Category Sections (Dosha & Protection)",
    category: "Category Banner",
    dimensions: "1200 x 500 px (2.4:1 banner aspect ratio)",
    subject: "Graha Dosha, Vashikaran & Protection Master Category Banner",
    scene: "Panoramic temple altar with nine sacred planetary lamps (Navagraha deepam) and ancient Sanskrit yantras.",
    prompt: "A panoramic, sacred visual of nine ornate brass oil lamps burning steadily in a line on a temple stone pedestal, illuminating ancient Sanskrit mantras and geometric yantras inscribed on copper plates behind them. Incense smoke swirling into soft golden bokeh, aura of ancient divine protection and cosmic order, 8k resolution, photorealistic.",
    negativePrompt: "dark magic, demonic, cartoon, blurry, low quality"
  },
  {
    num: 76,
    targetFile: "_raw/banner-category-career.jpg",
    page: "sitemap.html & Category Sections (Career & Business)",
    category: "Category Banner",
    dimensions: "1200 x 500 px (2.4:1 banner aspect ratio)",
    subject: "Career, Business & Financial Growth Master Category Banner",
    scene: "A panoramic skyline of modern business towers at sunrise with ancient golden scales of Lakshmi and Kuber.",
    prompt: "A wide panoramic visual blending a breathtaking modern global corporate skyline at golden sunrise with classical Vedic symbols of wealth and prosperity: an ornate golden kalash overflowing with gold coins, a brass Meru Shri Yantra, and blossoming lotus flowers. Economic triumph, financial stability, 8k resolution, hyperrealistic.",
    negativePrompt: "cartoon, casino chips, cheap money graphics, blurry"
  },
  {
    num: 77,
    targetFile: "_raw/banner-category-locations.jpg",
    page: "sitemap.html & Category Sections (Global & NRI)",
    category: "Category Banner",
    dimensions: "1200 x 500 px (2.4:1 banner aspect ratio)",
    subject: "Global & NRI Astrological Services Master Category Banner",
    scene: "Panoramic montage of iconic world landmarks (Statue of Liberty, Big Ben, CN Tower, Sydney Opera House, Burj Khalifa, India Gate) under a starry celestial sky.",
    prompt: "A magnificent panoramic cinematic collage of world-famous landmarks (Statue of Liberty, Big Ben, CN Tower, Sydney Opera House, Burj Khalifa, and India Gate) united under a deep indigo celestial night sky shimmering with golden constellation lines and zodiac symbols. Harmonious, global Vedic reach, 8k resolution, master digital matte painting.",
    negativePrompt: "cartoon, messy collage cuts, low resolution, blurry"
  }
];

// Build text content
let textOutput = `================================================================================
ASTROLOGER SANDEEP JI — MASTER IMAGE REQUIREMENTS & AI GENERATION PROMPTS
Total Images: 77 (Numbered 1 to 77)
Organized by:
  Part 1: Homepage Situation Cards (Images 1 to 13)
  Part 2: 57 Dedicated Service Landing Pages (Images 14 to 70)
  Part 3: 7 Category Master Banners (Images 71 to 77)
================================================================================

HOW TO USE THIS FILE:
1. Every image is uniquely numbered from [IMAGE #01] to [IMAGE #77].
2. For each number, copy the "EXACT AI PROMPT" into Midjourney, DALL-E 3, Flux, or Google Imagen.
3. Save the generated image with the given "TARGET FILENAME" (e.g. "_raw/situation-01.jpg").
4. When you provide the images or tell me "I have image #01, #02...", I will place them in the correct pages immediately!

================================================================================
`;

promptData.forEach(item => {
  const numPad = String(item.num).padStart(2, '0');
  textOutput += `
--------------------------------------------------------------------------------
[IMAGE #${numPad}] — ${item.subject}
--------------------------------------------------------------------------------
• TARGET FILENAME   : ${item.targetFile}
• DESTINATION PAGE  : ${item.page}
• CATEGORY          : ${item.category}
• RECOMMENDED SIZE  : ${item.dimensions}
• SCENE DESCRIPTION : ${item.scene}

• EXACT AI PROMPT (Copy-Paste this into Midjourney / DALL-E / Flux):
"${item.prompt}"

• NEGATIVE PROMPT:
"${item.negativePrompt}"
`;
});

textOutput += `
================================================================================
SUMMARY DIRECTORY TABLE (FOR QUICK TRACKING)
================================================================================
`;

promptData.forEach(item => {
  const numPad = String(item.num).padStart(2, '0');
  textOutput += `[#${numPad}] ${item.targetFile.padEnd(46, ' ')} -> ${item.subject}\n`;
});

textOutput += `
================================================================================
END OF FILE — ALL 77 IMAGE PROMPTS READY
================================================================================
`;

fs.writeFileSync(path.join(__dirname, 'ALL_IMAGE_DETAILS_AND_PROMPTS.txt'), textOutput, 'utf8');
console.log('Successfully generated ALL_IMAGE_DETAILS_AND_PROMPTS.txt with 77 complete numbered prompts!');
