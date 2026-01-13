export const allowed_profiles = [
  {
    value: "developer",
    label: "Developer",
    description: "Clean & simple",
    allowed_languages: [
      {
        value: "de",
        label: "German"
      },
      {
        value: "en",
        label: "English"
      },
      {
        value: "es",
        label: "Spanish"
      },
      {
        value: "fr",
        label: "French"
      },
      {
        value: "ja",
        label: "Japanese"
      }
    ]
  },
  {
    value: "teacher",
    label: "Teacher",
    description: "Clean & simple",
    allowed_languages: [
      {
        value: "en",
        label: "English"
      },
      {
        value: "ja",
        label: "Japanese"
      }
    ]
  }
] as const;
