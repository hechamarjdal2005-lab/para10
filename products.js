const PRODUCTS = [
  {
    id: 1,
    name: "Crème Hydratante Visage",
    price: 149,
    category: "Skincare",
    image: "https://picsum.photos/seed/skincare1/400/400",
    description: "Crème hydratante enrichie en acide hyaluronique pour une peau douce et repulpée.",
    badge: "Populaire"
  },
  {
    id: 2,
    name: "Sérum Vitamine C Éclat",
    price: 199,
    category: "Skincare",
    image: "https://picsum.photos/seed/skincare2/400/400",
    description: "Sérum concentré en vitamine C pour un teint lumineux et unifié.",
    badge: "Nouveau"
  },
  {
    id: 3,
    name: "Shampooing Réparateur Kératine",
    price: 89,
    category: "Hair Care",
    image: "https://picsum.photos/seed/hair1/400/400",
    description: "Shampooing enrichi en kératine pour cheveux abîmés et cassants.",
    badge: ""
  },
  {
    id: 4,
    name: "Huile d'Argan Pure",
    price: 129,
    category: "Hair Care",
    image: "https://picsum.photos/seed/hair2/400/400",
    description: "Huile d'argan 100% pure pour nourrir et protéger vos cheveux et votre peau.",
    badge: "Bio"
  },
  {
    id: 5,
    name: "Gel Douche Surgras",
    price: 49,
    category: "Body Care",
    image: "https://picsum.photos/seed/body1/400/400",
    description: "Gel douche surgras pour les peaux sensibles, sans paraben ni sulfates.",
    badge: ""
  },
  {
    id: 6,
    name: "Lait Corporel Nutrition Intense",
    price: 79,
    category: "Body Care",
    image: "https://picsum.photos/seed/body2/400/400",
    description: "Lait corporel enrichi en beurre de karité pour une hydration longue durée.",
    badge: ""
  },
  {
    id: 7,
    name: "Complexe Multivitaminé",
    price: 119,
    category: "Supplements",
    image: "https://picsum.photos/seed/supp1/400/400",
    description: "Complément alimentaire riche en vitamines et minéraux essentiels.",
    badge: "Conseillé"
  },
  {
    id: 8,
    name: "Oméga 3 Premium",
    price: 159,
    category: "Supplements",
    image: "https://picsum.photos/seed/supp2/400/400",
    description: "Huile de poisson concentrée en Oméga 3 pour la santé cardiovasculaire.",
    badge: ""
  },
  {
    id: 9,
    name: "Crème Pansement Bébé",
    price: 69,
    category: "Baby Care",
    image: "https://picsum.photos/seed/baby1/400/400",
    description: "Crème protectrice pour la peau délicate des bébés, sans parfum.",
    badge: "Doux"
  },
  {
    id: 10,
    name: "Coffret Soins Bébé",
    price: 189,
    category: "Baby Care",
    image: "https://picsum.photos/seed/baby2/400/400",
    description: "Ensemble complet de soins pour les besoins quotidiens de votre bébé.",
    badge: "Coffret"
  },
  {
    id: 11,
    name: "Protection Solaire SPF50+",
    price: 139,
    category: "Skincare",
    image: "https://picsum.photos/seed/sun1/400/400",
    description: "Protection solaire haute SPF 50+ pour une défense optimale contre les UV.",
    badge: "Essentiel"
  },
  {
    id: 12,
    name: "Déodorant Naturel 48h",
    price: 45,
    category: "Personal Care",
    image: "https://picsum.photos/seed/personal1/400/400",
    description: "Déodorant naturel sans aluminium, protection longue durée 48h.",
    badge: "Naturel"
  },
  {
    id: 13,
    name: "Dentifrice Blancheur",
    price: 39,
    category: "Personal Care",
    image: "https://picsum.photos/seed/personal2/400/400",
    description: "Dentifrice blancheur à l'hydroxyapatite pour des dents visiblement plus blanches.",
    badge: ""
  },
  {
    id: 14,
    name: "Masque Visage Purifiant",
    price: 89,
    category: "Skincare",
    image: "https://picsum.photos/seed/skincare3/400/400",
    description: "Masque à l'argile verte pour purifier les peaux grasses et mixtes.",
    badge: ""
  },
  {
    id: 15,
    name: "Sérum Anti-Âge Nuit",
    price: 229,
    category: "Skincare",
    image: "https://picsum.photos/seed/skincare4/400/400",
    description: "Sérum nocturne anti-âge enrichi en rétinol et peptides.",
    badge: "Premium"
  },
  {
    id: 16,
    name: "Vitamine D3 1000 UI",
    price: 79,
    category: "Supplements",
    image: "https://picsum.photos/seed/supp3/400/400",
    description: "Complément en vitamine D3 pour le maintien d'os solides.",
    badge: ""
  },
  {
    id: 17,
    name: "Après-Shampooing Démêlant",
    price: 65,
    category: "Hair Care",
    image: "https://picsum.photos/seed/hair3/400/400",
    description: "Après-shampooing démêlant pour des cheveux doux et faciles à coiffer.",
    badge: ""
  },
  {
    id: 18,
    name: "Crème Mains Réparatrice",
    price: 39,
    category: "Body Care",
    image: "https://picsum.photos/seed/body3/400/400",
    description: "Crème pour les mains sèches et abîmées, réparation intense.",
    badge: ""
  }
];

const CATEGORIES = [
  { id: "skincare", name: "Skincare", icon: "✦", description: "Soins du visage et protection solaire" },
  { id: "haircare", name: "Hair Care", icon: "✧", description: "Shampooings et soins capillaires" },
  { id: "bodycare", name: "Body Care", icon: "◈", description: "Gels douche et soins du corps" },
  { id: "supplements", name: "Supplements", icon: "⬡", description: "Compléments alimentaires et vitamines" },
  { id: "babycare", name: "Baby Care", icon: "♡", description: "Soins délicats pour bébé" },
  { id: "personalcare", name: "Personal Care", icon: "○", description: "Hygiène quotidienne et bien-être" }
];
