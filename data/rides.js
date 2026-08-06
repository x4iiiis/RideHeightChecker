// Update this by hand whenever ride data has actually been re-checked
// against official park sources -- not on every edit. scripts/build_rides.mjs
// reads it and stamps "in <Month> <Year>" into the .verified paragraph on
// every page, so it only needs to change in one place.
export const dataVerifiedDate = '2026-08-01';

export const parks = {
  all: {
    name: 'All Florida Parks',
    shortName: 'All Parks',
    resort: 'all'
  },
  'magic-kingdom': {
    name: 'Magic Kingdom',
    shortName: 'Magic Kingdom',
    resort: 'disney'
  },
  epcot: {
    name: 'EPCOT',
    shortName: 'EPCOT',
    resort: 'disney'
  },
  'hollywood-studios': {
    name: 'Disney’s Hollywood Studios',
    shortName: 'Hollywood Studios',
    resort: 'disney'
  },
  'animal-kingdom': {
    name: 'Disney’s Animal Kingdom',
    shortName: 'Animal Kingdom',
    resort: 'disney'
  },
  'typhoon-lagoon': {
    name: "Disney’s Typhoon Lagoon",
    shortName: 'Typhoon Lagoon',
    resort: 'disney'
  },
  'universal-studios': {
    name: 'Universal Studios Florida',
    shortName: 'Universal Studios',
    resort: 'universal'
  },
  'islands-of-adventure': {
    name: 'Universal Islands of Adventure',
    shortName: 'Islands of Adventure',
    resort: 'universal'
  },
  'epic-universe': {
    name: 'Universal Epic Universe',
    shortName: 'Epic Universe',
    resort: 'universal'
  },
  'volcano-bay': {
    name: "Universal's Volcano Bay",
    shortName: 'Volcano Bay',
    resort: 'universal'
  },
  'seaworld-orlando': {
    name: 'SeaWorld Orlando',
    shortName: 'SeaWorld Orlando',
    resort: 'seaworld'
  },
  'busch-gardens-tampa': {
    name: 'Busch Gardens Tampa Bay',
    shortName: 'Busch Gardens Tampa Bay',
    resort: 'seaworld'
  }
};

export const rides = [
  // Magic Kingdom
  {
    name: 'Astro Orbiter',
    park: 'magic-kingdom',
    land: 'Tomorrowland',
    minHeight: 0
  },
  {
    name: 'The Barnstormer',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 35
  },
  {
    name: 'Big Thunder Mountain Railroad',
    park: 'magic-kingdom',
    land: 'Frontierland',
    minHeight: 38
  },
  {
    name: 'Buzz Lightyear’s Space Ranger Spin',
    park: 'magic-kingdom',
    land: 'Tomorrowland',
    minHeight: 0
  },
  {
    name: 'Casey Jr. Splash ‘N’ Soak Station',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'Country Bear Musical Jamboree',
    park: 'magic-kingdom',
    land: 'Frontierland',
    minHeight: 0
  },
  {
    name: 'Dumbo the Flying Elephant',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'Enchanted Tales with Belle',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'The Hall of Presidents',
    park: 'magic-kingdom',
    land: 'Liberty Square',
    minHeight: 0
  },
  {
    name: 'Haunted Mansion',
    park: 'magic-kingdom',
    land: 'Liberty Square',
    minHeight: 0
  },
  {
    name: '“it’s a small world”',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'Jungle Cruise',
    park: 'magic-kingdom',
    land: 'Adventureland',
    minHeight: 0
  },
  {
    name: 'Mad Tea Party',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'The Magic Carpets of Aladdin',
    park: 'magic-kingdom',
    land: 'Adventureland',
    minHeight: 0
  },
  {
    name: 'The Many Adventures of Winnie the Pooh',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'Mickey’s PhilharMagic',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'Monsters, Inc. Laugh Floor',
    park: 'magic-kingdom',
    land: 'Tomorrowland',
    minHeight: 0
  },
  {
    name: 'Peter Pan’s Flight',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'A Pirate’s Adventure ~ Treasures of the Seven Seas',
    park: 'magic-kingdom',
    land: 'Adventureland',
    minHeight: 0
  },
  {
    name: 'Pirates of the Caribbean',
    park: 'magic-kingdom',
    land: 'Adventureland',
    minHeight: 0
  },
  {
    name: 'Prince Charming Regal Carrousel',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'Seven Dwarfs Mine Train',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 38
  },
  {
    name: 'Space Mountain',
    park: 'magic-kingdom',
    land: 'Tomorrowland',
    minHeight: 44
  },
  {
    name: 'Swiss Family Treehouse',
    park: 'magic-kingdom',
    land: 'Adventureland',
    minHeight: 0
  },
  {
    name: 'Tiana’s Bayou Adventure',
    park: 'magic-kingdom',
    land: 'Frontierland',
    minHeight: 40
  },
  {
    name: 'Tomorrowland Speedway',
    park: 'magic-kingdom',
    land: 'Tomorrowland',
    minHeight: 32,
    independentHeight: 54,
    independentRule: '32 in minimum · 54 in to drive alone',
    conditionalText: 'Can ride with a driver who is at least 54 in tall.'
  },
  {
    name: 'Tomorrowland Transit Authority PeopleMover',
    park: 'magic-kingdom',
    land: 'Tomorrowland',
    minHeight: 0
  },
  {
    name: 'TRON Lightcycle / Run',
    park: 'magic-kingdom',
    land: 'Tomorrowland',
    minHeight: 48
  },
  {
    name: 'Under the Sea ~ Journey of the Little Mermaid',
    park: 'magic-kingdom',
    land: 'Fantasyland',
    minHeight: 0
  },
  {
    name: 'Walt Disney’s Carousel of Progress',
    park: 'magic-kingdom',
    land: 'Tomorrowland',
    minHeight: 0
  },
  {
    name: 'Walt Disney’s Enchanted Tiki Room',
    park: 'magic-kingdom',
    land: 'Adventureland',
    minHeight: 0
  },
  {
    name: 'Walt Disney World Railroad',
    park: 'magic-kingdom',
    land: 'Multiple lands',
    minHeight: 0
  },

  // EPCOT
  {
    name: 'Advanced Training Lab',
    park: 'epcot',
    land: 'World Discovery',
    minHeight: 0
  },
  {
    name: 'The American Adventure',
    park: 'epcot',
    land: 'World Showcase',
    minHeight: 0
  },
  {
    name: 'Beauty and the Beast Sing-Along',
    park: 'epcot',
    land: 'World Showcase',
    minHeight: 0
  },
  {
    name: 'Disney & Pixar Short Film Festival',
    park: 'epcot',
    land: 'World Celebration',
    minHeight: 0
  },
  {
    name: 'Frozen Ever After',
    park: 'epcot',
    land: 'World Showcase',
    minHeight: 0
  },
  {
    name: 'Gran Fiesta Tour Starring The Three Caballeros',
    park: 'epcot',
    land: 'World Showcase',
    minHeight: 0
  },
  {
    name: 'Guardians of the Galaxy: Cosmic Rewind',
    park: 'epcot',
    land: 'World Discovery',
    minHeight: 42
  },
  {
    name: 'Impressions de France',
    park: 'epcot',
    land: 'World Showcase',
    minHeight: 0
  },
  {
    name: 'Journey Into Imagination With Figment',
    park: 'epcot',
    land: 'World Celebration',
    minHeight: 0
  },
  {
    name: 'Living with the Land',
    park: 'epcot',
    land: 'World Nature',
    minHeight: 0
  },
  {
    name: 'Mission: SPACE',
    park: 'epcot',
    land: 'World Discovery',
    minHeight: 40
  },
  {
    name: 'Canada Far and Wide in Circle-Vision 360',
    park: 'epcot',
    land: 'World Showcase',
    minHeight: 0
  },
  {
    name: 'Reflections of China',
    park: 'epcot',
    land: 'World Showcase',
    minHeight: 0
  },
  {
    name: 'Remy’s Ratatouille Adventure',
    park: 'epcot',
    land: 'World Showcase',
    minHeight: 0
  },
  {
    name: 'The Seas with Nemo & Friends',
    park: 'epcot',
    land: 'World Nature',
    minHeight: 0
  },
  {
    name: 'Soarin’ Around the World',
    park: 'epcot',
    land: 'World Nature',
    minHeight: 40
  },
  {
    name: 'Spaceship Earth',
    park: 'epcot',
    land: 'World Celebration',
    minHeight: 0
  },
  {
    name: 'Test Track',
    park: 'epcot',
    land: 'World Discovery',
    minHeight: 40
  },
  {
    name: 'Turtle Talk With Crush',
    park: 'epcot',
    land: 'World Nature',
    minHeight: 0
  },
  // Disney’s Hollywood Studios
  {
    name: 'Alien Swirling Saucers',
    park: 'hollywood-studios',
    land: 'Toy Story Land',
    minHeight: 32
  },
  {
    name: 'Beauty and the Beast – Live on Stage',
    park: 'hollywood-studios',
    land: 'Sunset Boulevard',
    minHeight: 0
  },
  {
    name: 'Disney Junior Play and Dance!',
    park: 'hollywood-studios',
    land: 'Animation Courtyard',
    minHeight: 0
  },
  {
    name: 'For the First Time in Forever: A Frozen Sing-Along Celebration',
    park: 'hollywood-studios',
    land: 'Echo Lake',
    minHeight: 0
  },
  {
    name: 'Indiana Jones Epic Stunt Spectacular!',
    park: 'hollywood-studios',
    land: 'Echo Lake',
    minHeight: 0
  },
  {
    name: 'Mickey & Minnie’s Runaway Railway',
    park: 'hollywood-studios',
    land: 'Hollywood Boulevard',
    minHeight: 0
  },
  {
    name: 'Millennium Falcon: Smugglers Run',
    park: 'hollywood-studios',
    land: 'Star Wars: Galaxy’s Edge',
    minHeight: 38
  },
  {
    name: 'Rock ’n’ Roller Coaster Starring The Muppets',
    park: 'hollywood-studios',
    land: 'Sunset Boulevard',
    minHeight: 48
  },
  {
    name: 'Slinky Dog Dash',
    park: 'hollywood-studios',
    land: 'Toy Story Land',
    minHeight: 38
  },
  {
    name: 'Star Tours – The Adventures Continue',
    park: 'hollywood-studios',
    land: 'Echo Lake',
    minHeight: 40
  },
  {
    name: 'Star Wars: Rise of the Resistance',
    park: 'hollywood-studios',
    land: 'Star Wars: Galaxy’s Edge',
    minHeight: 40
  },
  {
    name: 'The Twilight Zone Tower of Terror',
    park: 'hollywood-studios',
    land: 'Sunset Boulevard',
    minHeight: 40
  },
  {
    name: 'Toy Story Mania!',
    park: 'hollywood-studios',
    land: 'Toy Story Land',
    minHeight: 0
  },
  {
    name: 'Vacation Fun – An Original Animated Short with Mickey & Minnie',
    park: 'hollywood-studios',
    land: 'Echo Lake',
    minHeight: 0
  },
  {
    name: 'Walt Disney Presents',
    park: 'hollywood-studios',
    land: 'Animation Courtyard',
    minHeight: 0
  },
  // Disney’s Animal Kingdom
  {
    name: 'Affection Section',
    park: 'animal-kingdom',
    land: 'Rafiki’s Planet Watch',
    minHeight: 0
  },
  {
    name: 'Avatar Flight of Passage',
    park: 'animal-kingdom',
    land: 'Pandora – The World of Avatar',
    minHeight: 44
  },
  {
    name: 'Conservation Station',
    park: 'animal-kingdom',
    land: 'Rafiki’s Planet Watch',
    minHeight: 0
  },
  {
    name: 'Discovery Island Trails',
    park: 'animal-kingdom',
    land: 'Discovery Island',
    minHeight: 0
  },
  {
    name: 'Expedition Everest – Legend of the Forbidden Mountain',
    park: 'animal-kingdom',
    land: 'Asia',
    minHeight: 44
  },
  {
    name: 'Feathered Friends in Flight!',
    park: 'animal-kingdom',
    land: 'Asia',
    minHeight: 0
  },
  {
    name: 'Festival of the Lion King',
    park: 'animal-kingdom',
    land: 'Africa',
    minHeight: 0
  },
  {
    name: 'Finding Nemo: The Big Blue... and Beyond!',
    park: 'animal-kingdom',
    land: 'DinoLand U.S.A.',
    minHeight: 0
  },
  {
    name: 'Gorilla Falls Exploration Trail',
    park: 'animal-kingdom',
    land: 'Africa',
    minHeight: 0
  },
  {
    name: 'Kali River Rapids',
    park: 'animal-kingdom',
    land: 'Asia',
    minHeight: 38
  },
  {
    name: 'Kilimanjaro Safaris',
    park: 'animal-kingdom',
    land: 'Africa',
    minHeight: 0
  },
  {
    name: 'Maharajah Jungle Trek',
    park: 'animal-kingdom',
    land: 'Asia',
    minHeight: 0
  },
  {
    name: 'Na’vi River Journey',
    park: 'animal-kingdom',
    land: 'Pandora – The World of Avatar',
    minHeight: 0
  },
  {
    name: 'The Oasis Exhibits',
    park: 'animal-kingdom',
    land: 'Oasis',
    minHeight: 0
  },
  {
    name: 'Wildlife Express Train',
    park: 'animal-kingdom',
    land: 'Africa',
    minHeight: 0
  },
  {
    name: 'Zootopia: Better Zoogether!',
    park: 'animal-kingdom',
    land: 'Discovery Island',
    minHeight: 0
  }
,
  // Disney's Typhoon Lagoon — verified against TouringPlans height-requirement guidance
  { name: "Crush ’n’ Gusher", park: 'typhoon-lagoon', land: 'Mount Mayday', minHeight: 48 },
  { name: 'Humunga Kowabunga', park: 'typhoon-lagoon', land: 'Mount Mayday', minHeight: 48 },
  { name: 'Jib Jammer', park: 'typhoon-lagoon', land: 'Mount Mayday', minHeight: 0 },
  { name: 'Stern Burner', park: 'typhoon-lagoon', land: 'Mount Mayday', minHeight: 0 },
  { name: 'Rudder Buster', park: 'typhoon-lagoon', land: 'Mount Mayday', minHeight: 0 },
  { name: 'Mayday Falls', park: 'typhoon-lagoon', land: 'Mount Mayday', minHeight: 0 },
  { name: 'Keelhaul Falls', park: 'typhoon-lagoon', land: 'Mount Mayday', minHeight: 0 },
  { name: 'Gang Plank Falls', park: 'typhoon-lagoon', land: 'Mount Mayday', minHeight: 0 },
  { name: 'Miss Adventure Falls', park: 'typhoon-lagoon', land: 'Mount Mayday', minHeight: 0 },
  { name: 'Typhoon Lagoon Surf Pool', park: 'typhoon-lagoon', land: 'Surf Pool', minHeight: 0 },
  { name: 'Bay Slides', park: 'typhoon-lagoon', land: 'Surf Pool', minHeight: 0, maxHeight: 60, overMaxStatus: 'restricted', withinRangeText: 'Within the maximum height for this kids’ slide area.', overMaxText: 'Guests over 60 in may not use Bay Slides.' },
  { name: 'Castaway Creek', park: 'typhoon-lagoon', land: 'Castaway Creek', minHeight: 0 },
  { name: 'Ketchakiddee Creek', park: 'typhoon-lagoon', land: 'Ketchakiddee Creek', minHeight: 0, maxHeight: 48, overMaxStatus: 'restricted', withinRangeText: 'Within the maximum height for this kids’ area.', overMaxText: 'Guests over 48 in may not enter.' },

  // Universal Studios Florida
  { name: 'Despicable Me Minion Mayhem', park: 'universal-studios', land: 'Minion Land', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.', underMinimumAlternative: 'May experience the attraction from an adjacent stationary seat.' },
  { name: 'Illumination’s Villain-Con Minion Blast', park: 'universal-studios', land: 'Minion Land', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in. No hand-held infants.' },
  { name: 'TRANSFORMERS: The Ride-3D', park: 'universal-studios', land: 'New York', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Race Through New York Starring Jimmy Fallon', park: 'universal-studios', land: 'New York', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Revenge of the Mummy', park: 'universal-studios', land: 'New York', minHeight: 48 },
  { name: 'The Blues Brothers Show', park: 'universal-studios', land: 'New York', minHeight: 0 },
  { name: 'Fast & Furious – Supercharged', park: 'universal-studios', land: 'San Francisco', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Hogwarts Express – King’s Cross Station', park: 'universal-studios', land: 'Diagon Alley', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in. Park-to-Park admission is required.' },
  { name: 'Harry Potter and the Escape from Gringotts', park: 'universal-studios', land: 'Diagon Alley', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'MEN IN BLACK Alien Attack', park: 'universal-studios', land: 'World Expo', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'The Simpsons Ride', park: 'universal-studios', land: 'Springfield', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Kang & Kodos’ Twirl ’n’ Hurl', park: 'universal-studios', land: 'Springfield', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in.' },
  { name: 'DreamWorks Imagination Celebration', park: 'universal-studios', land: 'DreamWorks Land', minHeight: 0 },
  { name: 'Shrek’s Swamp for Little Ogres', park: 'universal-studios', land: 'DreamWorks Land', minHeight: 0 },
  { name: 'Mama Luna Feline Fiesta', park: 'universal-studios', land: 'DreamWorks Land', minHeight: 0 },
  { name: 'King Harold’s Swamp Symphony', park: 'universal-studios', land: 'DreamWorks Land', minHeight: 0 },
  { name: 'Trolls Trollercoaster', park: 'universal-studios', land: 'DreamWorks Land', minHeight: 36, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Po’s Kung Fu Training Camp', park: 'universal-studios', land: 'DreamWorks Land', minHeight: 0 },
  { name: 'Po Live!', park: 'universal-studios', land: 'DreamWorks Land', minHeight: 0 },
  { name: 'Animal Actors On Location!', park: 'universal-studios', land: 'Hollywood', minHeight: 0 },
  { name: 'E.T. Adventure', park: 'universal-studios', land: 'Hollywood', minHeight: 34, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Universal Orlando’s Horror Make-Up Show', park: 'universal-studios', land: 'Hollywood', minHeight: 0 },
  { name: 'The Bourne Stuntacular', park: 'universal-studios', land: 'Hollywood', minHeight: 0 },

  // Universal Islands of Adventure
  { name: 'The High in the Sky Seuss Trolley Train Ride!', park: 'islands-of-adventure', land: 'Seuss Landing', minHeight: 36, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Caro-Seuss-el', park: 'islands-of-adventure', land: 'Seuss Landing', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in.' },
  { name: 'One Fish, Two Fish, Red Fish, Blue Fish', park: 'islands-of-adventure', land: 'Seuss Landing', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in.' },
  { name: 'The Cat in the Hat', park: 'islands-of-adventure', land: 'Seuss Landing', minHeight: 36, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'If I Ran The Zoo', park: 'islands-of-adventure', land: 'Seuss Landing', minHeight: 0 },
  { name: 'Harry Potter and the Forbidden Journey', park: 'islands-of-adventure', land: 'Hogsmeade', minHeight: 48 },
  { name: 'Flight of the Hippogriff', park: 'islands-of-adventure', land: 'Hogsmeade', minHeight: 36, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Hagrid’s Magical Creatures Motorbike Adventure', park: 'islands-of-adventure', land: 'Hogsmeade', minHeight: 48 },
  { name: 'Hogwarts Express – Hogsmeade Station', park: 'islands-of-adventure', land: 'Hogsmeade', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in. Park-to-Park admission is required.' },
  { name: 'Camp Jurassic', park: 'islands-of-adventure', land: 'Jurassic Park', minHeight: 0 },
  { name: 'Pteranodon Flyers', park: 'islands-of-adventure', land: 'Jurassic Park', minHeight: 36, independentHeight: 48, maxHeight: 56, overMaxStatus: 'conditional', conditionalText: 'Tall enough with a supervising companion.', overMaxText: 'Guests over 56 in must ride with a child between 36 and 56 in.' },
  { name: 'Jurassic Park Discovery Center', park: 'islands-of-adventure', land: 'Jurassic Park', minHeight: 0 },
  { name: 'Jurassic Park River Adventure', park: 'islands-of-adventure', land: 'Jurassic Park', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Jurassic World VelociCoaster', park: 'islands-of-adventure', land: 'Jurassic Park', minHeight: 51 },
  { name: 'Skull Island: Reign of Kong', park: 'islands-of-adventure', land: 'Skull Island', minHeight: 36, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Me Ship, The Olive', park: 'islands-of-adventure', land: 'Toon Lagoon', minHeight: 0 },
  { name: 'Popeye & Bluto’s Bilge-Rat Barges', park: 'islands-of-adventure', land: 'Toon Lagoon', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Dudley Do-Right’s Ripsaw Falls', park: 'islands-of-adventure', land: 'Toon Lagoon', minHeight: 44, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'The Incredible Hulk Coaster', park: 'islands-of-adventure', land: 'Marvel Super Hero Island', minHeight: 54 },
  { name: 'Storm Force Accelatron', park: 'islands-of-adventure', land: 'Marvel Super Hero Island', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in.' },
  { name: 'Doctor Doom’s Fearfall', park: 'islands-of-adventure', land: 'Marvel Super Hero Island', minHeight: 52 },
  { name: 'The Amazing Adventures of Spider-Man', park: 'islands-of-adventure', land: 'Marvel Super Hero Island', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },

  // Universal Epic Universe
  { name: 'Astronomica', park: 'epic-universe', land: 'Celestial Park', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in.' },
  { name: 'Constellation Carousel', park: 'epic-universe', land: 'Celestial Park', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in. No hand-held infants.' },
  { name: 'Stardust Racers', park: 'epic-universe', land: 'Celestial Park', minHeight: 48 },
  { name: 'Dragon Racer’s Rally', park: 'epic-universe', land: 'How to Train Your Dragon – Isle of Berk', minHeight: 48 },
  { name: 'Fyre Drill', park: 'epic-universe', land: 'How to Train Your Dragon – Isle of Berk', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in. No hand-held infants.' },
  { name: 'Hiccup’s Wing Gliders', park: 'epic-universe', land: 'How to Train Your Dragon – Isle of Berk', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'The Untrainable Dragon', park: 'epic-universe', land: 'How to Train Your Dragon – Isle of Berk', minHeight: 0 },
  { name: 'Viking Training Camp', park: 'epic-universe', land: 'How to Train Your Dragon – Isle of Berk', minHeight: 0, independentHeight: 48, conditionalText: 'Children under 48 in should be accompanied by a supervising companion.' },
  { name: 'Harry Potter and the Battle at the Ministry', park: 'epic-universe', land: 'The Wizarding World of Harry Potter – Ministry of Magic', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Le Cirque Arcanus', park: 'epic-universe', land: 'The Wizarding World of Harry Potter – Ministry of Magic', minHeight: 0 },
  { name: 'Curse of the Werewolf', park: 'epic-universe', land: 'Dark Universe', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Monsters Unchained: The Frankenstein Experiment', park: 'epic-universe', land: 'Dark Universe', minHeight: 48 },
  { name: 'Mario Kart: Bowser’s Challenge', park: 'epic-universe', land: 'SUPER NINTENDO WORLD', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Mine-Cart Madness', park: 'epic-universe', land: 'SUPER NINTENDO WORLD', minHeight: 40, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Yoshi’s Adventure', park: 'epic-universe', land: 'SUPER NINTENDO WORLD', minHeight: 34, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },

  // SeaWorld Orlando — verified against the May 2026 official accessibility guide
  { name: 'Abby’s Flower Tower', park: 'seaworld-orlando', land: 'Sesame Street Land', minHeight: 0, independentHeight: 42, conditionalText: 'Requires a supervising companion under 42 in. No hand-held infants.' },
  { name: 'Cookie Drop', park: 'seaworld-orlando', land: 'Sesame Street Land', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in. No hand-held infants.' },
  { name: 'Elmo’s Choo Choo Train', park: 'seaworld-orlando', land: 'Sesame Street Land', minHeight: 0, independentHeight: 36, conditionalText: 'Requires a supervising companion under 36 in. No hand-held infants.' },
  { name: 'Expedition Odyssey: Fire & Ice', park: 'seaworld-orlando', land: 'Wild Arctic', minHeight: 39, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Ice Breaker', park: 'seaworld-orlando', land: 'Wild Arctic', minHeight: 48, independentHeight: 54, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Infinity Falls', park: 'seaworld-orlando', land: 'Sea of Mystery', minHeight: 42, independentHeight: 48, maxHeight: 77, overMaxStatus: 'restricted', conditionalText: 'Tall enough with a supervising companion.', overMaxText: 'Guests over 77 in may not ride.' },
  { name: 'Journey to Atlantis', park: 'seaworld-orlando', land: 'Atlantis', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Kraken', park: 'seaworld-orlando', land: 'Kraken Plaza', minHeight: 54 },
  { name: 'Mako', park: 'seaworld-orlando', land: 'Shark Wreck Reef', minHeight: 54 },
  { name: 'Manta', park: 'seaworld-orlando', land: 'Sea of Shallows', minHeight: 54 },
  { name: 'Flamingo Paddle Boats', park: 'seaworld-orlando', land: 'Central Lagoon', minHeight: 0, independentHeight: 56, conditionalText: 'Requires a supervising companion under 56 in. No hand-held infants.' },
  { name: 'Penguin Trek', park: 'seaworld-orlando', land: 'Antarctica', minHeight: 42, independentHeight: 51, maxHeight: 78, overMaxStatus: 'restricted', conditionalText: 'Tall enough with a supervising companion seated beside them.', overMaxText: 'Guests over 78 in may not ride.' },
  { name: 'Pipeline: The Surf Coaster', park: 'seaworld-orlando', land: 'Surf Zone', minHeight: 54, maxHeight: 78, overMaxStatus: 'restricted', overMaxText: 'Guests over 78 in may not ride.' },
  { name: 'Sky Tower', park: 'seaworld-orlando', land: 'Central Lagoon', minHeight: 0, independentHeight: 48, conditionalText: 'Requires a supervising companion under 48 in.' },
  { name: 'Slimey’s Sliders', park: 'seaworld-orlando', land: 'Sesame Street Land', minHeight: 0, independentHeight: 42, conditionalText: 'Requires a supervising companion under 42 in. No hand-held infants.' },
  { name: 'Sunny Day Carousel', park: 'seaworld-orlando', land: 'Sesame Street Land', minHeight: 0, independentHeight: 42, conditionalText: 'Requires a supervising companion under 42 in. Hand-held infants may use a bench seat with a supervising companion.' },
  { name: 'Super Grover’s Box Car Derby', park: 'seaworld-orlando', land: 'Sesame Street Land', minHeight: 38, independentHeight: 41, conditionalText: 'Tall enough with a supervising companion.' }
,

  // Busch Gardens Tampa Bay — verified against official accessibility guidance and current attraction pages
  { name: 'Air Grover', park: 'busch-gardens-tampa', land: 'Sesame Street Safari of Fun', minHeight: 38, independentHeight: 41, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Big Bird’s Whirly Ride', park: 'busch-gardens-tampa', land: 'Sesame Street Safari of Fun', minHeight: 0, independentHeight: 36, maxHeight: 56, overMaxStatus: 'conditional', conditionalText: 'Requires a supervising companion under 36 in. No hand-held infants.', overMaxText: 'Guests over 56 in may ride only when accompanying a child. Hand-held infants may not ride.' },
  { name: 'Cheetah Hunt', park: 'busch-gardens-tampa', land: 'Edge of Africa', minHeight: 48 },
  { name: 'Cobra’s Curse', park: 'busch-gardens-tampa', land: 'Egypt', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion aged 14 or older.' },
  { name: 'Congo River Rapids', park: 'busch-gardens-tampa', land: 'Congo', minHeight: 42 },
  { name: 'The Count’s Zambezi Rally', park: 'busch-gardens-tampa', land: 'Sesame Street Safari of Fun', minHeight: 0, independentHeight: 36, maxHeight: 56, overMaxStatus: 'conditional', conditionalText: 'Requires a supervising companion under 36 in. No hand-held infants.', overMaxText: 'Guests over 56 in may ride only when accompanying a child. Hand-held infants may not ride.' },
  { name: 'Elmo’s Safari Go-Round', park: 'busch-gardens-tampa', land: 'Sesame Street Safari of Fun', minHeight: 0, maxHeight: 56, maxHeightExclusive: true, overMaxStatus: 'conditional', overMaxText: 'Guests 56 in or taller may ride only when accompanying a child under 36 in.' },
  { name: 'Falcon’s Fury', park: 'busch-gardens-tampa', land: 'Pantopia', minHeight: 54, maxHeight: 77, overMaxStatus: 'restricted', overMaxText: 'Guests over 77 in may not ride.' },
  { name: 'Grand Caravan Carousel', park: 'busch-gardens-tampa', land: 'Pantopia', minHeight: 0, independentHeight: 42, conditionalText: 'Requires a supervising companion under 42 in; younger riders use designated rows or bench seating.' },
  { name: 'Gwazi Gliders', park: 'busch-gardens-tampa', land: 'Jungala', minHeight: 0, maxHeight: 56, maxHeightExclusive: true, overMaxStatus: 'restricted', overMaxText: 'Guests 56 in or taller may not ride. Hand-held infants may not ride.' },
  { name: 'Iron Gwazi', park: 'busch-gardens-tampa', land: 'Morocco', minHeight: 48 },
  { name: 'Kumba', park: 'busch-gardens-tampa', land: 'Congo', minHeight: 54, lifecycle: 'retiring', closes: '2026-08-02' },
  { name: 'Montu', park: 'busch-gardens-tampa', land: 'Egypt', minHeight: 54 },
  { name: 'Phoenix Rising', park: 'busch-gardens-tampa', land: 'Pantopia', minHeight: 42, independentHeight: 51, maxHeight: 77, overMaxStatus: 'restricted', conditionalText: 'Guests under 51 in must ride with a supervising adult seated beside them.', overMaxText: 'Guests over 77 in may not ride.' },
  { name: 'Rosita’s Djembe Fly-Away', park: 'busch-gardens-tampa', land: 'Sesame Street Safari of Fun', minHeight: 0, maxHeight: 42, maxHeightExclusive: true, overMaxStatus: 'restricted', withinRangeText: 'Under the maximum height. Infants may not ride.', overMaxText: 'Guests 42 in or taller may not ride. Infants may not ride.' },
  { name: 'Serengeti Express', park: 'busch-gardens-tampa', land: 'Serengeti Plain', minHeight: 0 },
  { name: 'Serengeti Flyer', park: 'busch-gardens-tampa', land: 'Serengeti Plain', minHeight: 48 },
  { name: 'SheiKra', park: 'busch-gardens-tampa', land: 'Stanleyville', minHeight: 54 },
  { name: 'SkyRide', park: 'busch-gardens-tampa', land: 'Multiple areas', minHeight: 0, independentHeight: 56, conditionalText: 'Requires a supervising companion under 56 in.' },
  { name: 'Snuffy’s Elephant Romp', park: 'busch-gardens-tampa', land: 'Sesame Street Safari of Fun', minHeight: 0, independentHeight: 36, maxHeight: 56, overMaxStatus: 'conditional', conditionalText: 'Requires a supervising companion under 36 in. Hand-held infants may not ride.', overMaxText: 'Guests over 56 in may ride only when accompanying a child. Hand-held infants may not ride.' },
  { name: 'Tigris', park: 'busch-gardens-tampa', land: 'Stanleyville', minHeight: 54 },
  { name: 'Treetop Drop', park: 'busch-gardens-tampa', land: 'Jungala', minHeight: 38, independentHeight: 42, conditionalText: 'Tall enough with a supervising companion aged 14 or older.' },
  { name: 'Ubanga-Banga Bumper Cars', park: 'busch-gardens-tampa', land: 'Congo', minHeight: 42, independentHeight: 52, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Zoe-Patra and the Hippos of the Nile', park: 'busch-gardens-tampa', land: 'Sesame Street Safari of Fun', minHeight: 36, maxHeight: 56, overMaxStatus: 'restricted', overMaxText: 'Guests over 56 in may not ride. Hand-held infants may not ride.' }
,

  // Universal's Volcano Bay
  { name: 'Krakatau Aqua Coaster', park: 'volcano-bay', land: 'Krakatau', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: "Ko'okiri Body Plunge", park: 'volcano-bay', land: 'Krakatau', minHeight: 48 },
  { name: 'Ohyah Drop Slide', park: 'volcano-bay', land: 'Krakatau', minHeight: 48 },
  { name: 'Ohno Drop Slide', park: 'volcano-bay', land: 'Krakatau', minHeight: 48 },
  { name: 'Honu ika Moana: Honu', park: 'volcano-bay', land: 'Rainforest Village', minHeight: 48 },
  { name: 'Honu ika Moana: ika Moana', park: 'volcano-bay', land: 'Rainforest Village', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Kala Serpentine Body Slide', park: 'volcano-bay', land: 'Rainforest Village', minHeight: 48 },
  { name: 'Tai Nui Serpentine Body Slide', park: 'volcano-bay', land: 'Rainforest Village', minHeight: 48 },
  { name: 'Punga Racers', park: 'volcano-bay', land: 'Rainforest Village', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Taniwha Tubes', park: 'volcano-bay', land: 'Rainforest Village', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Puka Uli Lagoon', park: 'volcano-bay', land: 'Rainforest Village', minHeight: 0, independentHeight: 48, conditionalText: 'Under 48 in must wear a life vest and be accompanied by a supervising companion.' },
  { name: 'Maku Round Raft Ride', park: 'volcano-bay', land: 'River Village', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Puihi Round Raft Ride', park: 'volcano-bay', land: 'River Village', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'TeAwa The Fearless River', park: 'volcano-bay', land: 'River Village', minHeight: 42, independentHeight: 48, conditionalText: 'Tall enough with a supervising companion.' },
  { name: 'Kopiko Wai Winding River', park: 'volcano-bay', land: 'River Village', minHeight: 0, independentHeight: 48, conditionalText: 'Under 48 in must wear a life vest and be accompanied by a supervising companion.' },
  { name: 'Waturi Beach', park: 'volcano-bay', land: 'Wave Village', minHeight: 0, independentHeight: 48, conditionalText: 'Under 48 in must wear a life vest and be accompanied by a supervising companion.' },
  { name: 'The Reef', park: 'volcano-bay', land: 'Wave Village', minHeight: 0, independentHeight: 48, conditionalText: 'Under 48 in must wear a life vest and be accompanied by a supervising companion.' },
  { name: 'Tot Tiki Reef', park: 'volcano-bay', land: 'Wave Village', minHeight: 0, maxHeight: 48, overMaxStatus: 'restricted', withinRangeText: 'Within the maximum height for this kids’ area.', overMaxText: 'Guests over 48 in may not enter.' },
  { name: 'Runamukka Reef', park: 'volcano-bay', land: 'Wave Village', minHeight: 0, maxHeight: 54, overMaxStatus: 'restricted', withinRangeText: 'Within the maximum height for this kids’ area.', overMaxText: 'Guests over 54 in may not enter.' }

];
