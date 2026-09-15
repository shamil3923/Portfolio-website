import type { EducationItem } from "@/lib/types";

export const education: EducationItem[] = [
  {
    institution: "University of Moratuwa",
    qualification: "BSc (Hons) in Artificial Intelligence",
    period: "2022 – 2026",
    location: "Colombo, Sri Lanka",
    detail: "CGPA 3.30 / 4.00",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Reinforcement Learning",
      "Data Science",
      "Algorithms",
    ],
  },
  {
    institution: "Kekunagolla National School",
    qualification: "G.C.E. Advanced Level — Physical Science",
    period: "2018 – 2020",
    location: "Kurunegala, Sri Lanka",
    results: [
      { label: "Mathematics", value: "A" },
      { label: "Chemistry", value: "A" },
      { label: "Physics", value: "B" },
    ],
  },
];
