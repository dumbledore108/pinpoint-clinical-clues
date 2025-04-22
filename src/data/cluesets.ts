
import { ClueSet } from "../types/game";

export const CLUE_SETS: ClueSet[] = [
  {
    theme: "Banned or Withdrawn Drugs",
    keyword: "withdrawn",
    clues: [
      "Rofecoxib",
      "Thalidomide",
      "Fenfluramine",
      "Cisapride",
      "Terfenadine"
    ]
  },
  {
    theme: "DNA Viruses",
    keyword: "DNA",
    clues: [
      "Hepatitis B",
      "Herpes simplex",
      "HPV",
      "Adenovirus",
      "Varicella-zoster"
    ]
  },
  {
    theme: "Checkpoint Inhibitor Targets",
    keyword: "checkpoint",
    clues: [
      "PD-1",
      "PD-L1",
      "CTLA-4",
      "LAG-3",
      "TIM-3"
    ]
  },
  {
    theme: "Zoonotic Infections",
    keyword: "zoonotic",
    clues: [
      "Brucellosis",
      "Leptospirosis",
      "Anthrax",
      "Rabies",
      "Tularemia"
    ]
  },
  {
    theme: "Antiarrhythmic Drugs (Class III)",
    keyword: "class3",
    clues: [
      "Amiodarone",
      "Dronedarone",
      "Sotalol",
      "Ibutilide",
      "Dofetilide"
    ]
  },
  {
    theme: "Conditions Associated with HLA-B27",
    keyword: "hla-b27",
    clues: [
      "Ankylosing spondylitis",
      "Reactive arthritis",
      "Psoriatic arthritis",
      "IBD-associated arthritis",
      "Uveitis"
    ]
  },
  {
    theme: "Black Box Warning Drugs for Suicidality",
    keyword: "suicidality",
    clues: [
      "Fluoxetine",
      "Sertraline",
      "Venlafaxine",
      "Bupropion",
      "Atomoxetine"
    ]
  }
];

