
import { ClueSet } from "../types/game";

export const CLUE_SETS: ClueSet[] = [
  // EASY SETS
  {
    theme: "NSAIDs",
    keyword: "nsaids",
    clues: [
      "Ibuprofen",
      "Naproxen",
      "Diclofenac",
      "Ketorolac",
      "Indomethacin"
    ]
  },
  {
    theme: "Beta Blockers",
    keyword: "beta-blockers",
    clues: [
      "Metoprolol",
      "Propranolol",
      "Atenolol",
      "Carvedilol",
      "Bisoprolol"
    ]
  },
  {
    theme: "SSRIs",
    keyword: "ssri",
    clues: [
      "Sertraline",
      "Escitalopram",
      "Fluoxetine",
      "Paroxetine",
      "Citalopram"
    ]
  },
  // MEDIUM SETS
  {
    theme: "Diabetes Complications",
    keyword: "complications",
    clues: [
      "Retinopathy",
      "Nephropathy",
      "Neuropathy",
      "Gastroparesis",
      "Foot ulcer"
    ]
  },
  {
    theme: "Tumor Markers",
    keyword: "markers",
    clues: [
      "PSA",
      "CA-125",
      "AFP",
      "CEA",
      "CA 19-9"
    ]
  },
  {
    theme: "Autoimmune Skin Disorders",
    keyword: "autoimmune",
    clues: [
      "Pemphigus vulgaris",
      "Bullous pemphigoid",
      "Dermatitis herpetiformis",
      "Psoriasis",
      "Vitiligo"
    ]
  },
  // HARD SETS
  {
    theme: "Opportunistic Infections in HIV",
    keyword: "opportunistic",
    clues: [
      "Pneumocystis jirovecii",
      "CMV retinitis",
      "Toxoplasmosis",
      "Cryptococcal meningitis",
      "Mycobacterium avium complex"
    ]
  },
  {
    theme: "Reversible Causes of Cardiac Arrest (Hs and Ts)",
    keyword: "hs-and-ts",
    clues: [
      "Hypoxia",
      "Hypovolemia",
      "Tension pneumothorax",
      "Tamponade",
      "Toxins"
    ]
  }
];

