export type BallisticPoint = {
  rangeMeters: number;
  deviationCm: number;
};

export type BallisticProfile = {
  id: string;
  weapon: string;
  sight: string;
  zeroRangeMeters: number;
  points: BallisticPoint[];
};

export const ballisticProfiles: BallisticProfile[] = [
  {
    "id": "profile_01",
    "weapon": "M16 ארוך",
    "sight": "ברזל",
    "zeroRangeMeters": 42,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -1.4
      },
      {
        "rangeMeters": 50,
        "deviationCm": 3
      },
      {
        "rangeMeters": 100,
        "deviationCm": 6
      },
      {
        "rangeMeters": 150,
        "deviationCm": 6.5
      },
      {
        "rangeMeters": 200,
        "deviationCm": 7
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -10
      }
    ]
  },
  {
    "id": "profile_02",
    "weapon": "M16 קצר",
    "sight": "ברזל",
    "zeroRangeMeters": 18,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": 1
      },
      {
        "rangeMeters": 50,
        "deviationCm": 8
      },
      {
        "rangeMeters": 100,
        "deviationCm": 16
      },
      {
        "rangeMeters": 150,
        "deviationCm": 13.5
      },
      {
        "rangeMeters": 200,
        "deviationCm": 11
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -25
      }
    ]
  },
  {
    "id": "profile_03",
    "weapon": "M16 קצר",
    "sight": "מפרולייט",
    "zeroRangeMeters": 23,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": 1
      },
      {
        "rangeMeters": 50,
        "deviationCm": 8
      },
      {
        "rangeMeters": 100,
        "deviationCm": 16
      },
      {
        "rangeMeters": 150,
        "deviationCm": 13.5
      },
      {
        "rangeMeters": 200,
        "deviationCm": 11
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -25
      }
    ]
  },
  {
    "id": "profile_04",
    "weapon": "M4",
    "sight": "ברזל",
    "zeroRangeMeters": 25,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": 0
      },
      {
        "rangeMeters": 50,
        "deviationCm": 6
      },
      {
        "rangeMeters": 100,
        "deviationCm": 12
      },
      {
        "rangeMeters": 150,
        "deviationCm": 13
      },
      {
        "rangeMeters": 200,
        "deviationCm": 16
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -24
      }
    ]
  },
  {
    "id": "profile_05_01",
    "weapon": "M4",
    "sight": "מפרולייט",
    "zeroRangeMeters": 30,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -2
      },
      {
        "rangeMeters": 50,
        "deviationCm": 2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_05_02",
    "weapon": "M4",
    "sight": "מפרומור",
    "zeroRangeMeters": 30,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -2
      },
      {
        "rangeMeters": 50,
        "deviationCm": 2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_05_03",
    "weapon": "M4",
    "sight": "M5",
    "zeroRangeMeters": 30,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -2
      },
      {
        "rangeMeters": 50,
        "deviationCm": 2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_05_04",
    "weapon": "M4",
    "sight": "טריג׳יקון",
    "zeroRangeMeters": 30,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -2
      },
      {
        "rangeMeters": 50,
        "deviationCm": 2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_05_05",
    "weapon": "M4",
    "sight": "ליאור",
    "zeroRangeMeters": 30,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -2
      },
      {
        "rangeMeters": 50,
        "deviationCm": 2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_05_06",
    "weapon": "M4",
    "sight": "אקילה",
    "zeroRangeMeters": 30,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -2
      },
      {
        "rangeMeters": 50,
        "deviationCm": 2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_06",
    "weapon": "M4",
    "sight": "מארס",
    "zeroRangeMeters": 40,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -3.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_07",
    "weapon": "M4",
    "sight": "מכבים",
    "zeroRangeMeters": 45,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -5
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0.5
      },
      {
        "rangeMeters": 100,
        "deviationCm": 6
      },
      {
        "rangeMeters": 150,
        "deviationCm": 8
      },
      {
        "rangeMeters": 200,
        "deviationCm": 6.5
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -11.5
      }
    ]
  },
  {
    "id": "profile_08_01",
    "weapon": "דור ג׳",
    "sight": "ליאור",
    "zeroRangeMeters": 40,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -3.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": -2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 9
      },
      {
        "rangeMeters": 150,
        "deviationCm": 12
      },
      {
        "rangeMeters": 200,
        "deviationCm": 9
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -17
      }
    ]
  },
  {
    "id": "profile_08_02",
    "weapon": "דור ג׳",
    "sight": "מפרומור",
    "zeroRangeMeters": 40,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -3.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": -2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 9
      },
      {
        "rangeMeters": 150,
        "deviationCm": 12
      },
      {
        "rangeMeters": 200,
        "deviationCm": 9
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -17
      }
    ]
  },
  {
    "id": "profile_08_03",
    "weapon": "דור ג׳",
    "sight": "טריג׳",
    "zeroRangeMeters": 40,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -3.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": -2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 9
      },
      {
        "rangeMeters": 150,
        "deviationCm": 12
      },
      {
        "rangeMeters": 200,
        "deviationCm": 9
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -17
      }
    ]
  },
  {
    "id": "profile_08_04",
    "weapon": "דור ג׳",
    "sight": "M5",
    "zeroRangeMeters": 40,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -3.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": -2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 9
      },
      {
        "rangeMeters": 150,
        "deviationCm": 12
      },
      {
        "rangeMeters": 200,
        "deviationCm": 9
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -17
      }
    ]
  },
  {
    "id": "profile_09_01",
    "weapon": "מיקרו",
    "sight": "מפרולייט",
    "zeroRangeMeters": 38,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -4
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_09_02",
    "weapon": "מיקרו",
    "sight": "מפרומור",
    "zeroRangeMeters": 38,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -4
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_09_03",
    "weapon": "מיקרו",
    "sight": "M5",
    "zeroRangeMeters": 38,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -4
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -14
      }
    ]
  },
  {
    "id": "profile_10_01",
    "weapon": "מיקרו קלעים",
    "sight": "טריג׳יקון",
    "zeroRangeMeters": 50,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -6
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -13
      }
    ]
  },
  {
    "id": "profile_10_02",
    "weapon": "מיקרו קלעים",
    "sight": "אקילה",
    "zeroRangeMeters": 50,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -6
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -13
      }
    ]
  },
  {
    "id": "profile_10_03",
    "weapon": "מיקרו קלעים",
    "sight": "ליאור",
    "zeroRangeMeters": 50,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -6
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 8
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -13
      }
    ]
  },
  {
    "id": "profile_11",
    "weapon": "מיקרו קלעים",
    "sight": "מכבים",
    "zeroRangeMeters": 60,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -6.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": -2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 4.5
      },
      {
        "rangeMeters": 150,
        "deviationCm": 7
      },
      {
        "rangeMeters": 200,
        "deviationCm": 6
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -11.5
      }
    ]
  },
  {
    "id": "profile_12_01",
    "weapon": "מיקרו מטול",
    "sight": "מארס",
    "zeroRangeMeters": 50,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -4.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 6
      },
      {
        "rangeMeters": 150,
        "deviationCm": 9
      },
      {
        "rangeMeters": 200,
        "deviationCm": 7
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -13
      }
    ]
  },
  {
    "id": "profile_12_02",
    "weapon": "מיקרו מטול",
    "sight": "מפרולייט",
    "zeroRangeMeters": 50,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -4.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 6
      },
      {
        "rangeMeters": 150,
        "deviationCm": 9
      },
      {
        "rangeMeters": 200,
        "deviationCm": 7
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -13
      }
    ]
  },
  {
    "id": "profile_12_03",
    "weapon": "מיקרו מטול",
    "sight": "מפרומור",
    "zeroRangeMeters": 50,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -4.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 6
      },
      {
        "rangeMeters": 150,
        "deviationCm": 9
      },
      {
        "rangeMeters": 200,
        "deviationCm": 7
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -13
      }
    ]
  },
  {
    "id": "profile_12_04",
    "weapon": "מיקרו מטול",
    "sight": "M5",
    "zeroRangeMeters": 50,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -4.5
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 6
      },
      {
        "rangeMeters": 150,
        "deviationCm": 9
      },
      {
        "rangeMeters": 200,
        "deviationCm": 7
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -13
      }
    ]
  },
  {
    "id": "profile_13",
    "weapon": "נגב",
    "sight": "ברזל",
    "zeroRangeMeters": 20,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": 2.8
      },
      {
        "rangeMeters": 50,
        "deviationCm": 5
      },
      {
        "rangeMeters": 100,
        "deviationCm": 8.5
      },
      {
        "rangeMeters": 150,
        "deviationCm": 10
      },
      {
        "rangeMeters": 200,
        "deviationCm": 11.5
      },
      {
        "rangeMeters": 250,
        "deviationCm": 7.5
      },
      {
        "rangeMeters": 300,
        "deviationCm": 0
      }
    ]
  },
  {
    "id": "profile_14",
    "weapon": "נגב",
    "sight": "מפרולייט",
    "zeroRangeMeters": 32,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -2
      },
      {
        "rangeMeters": 50,
        "deviationCm": 2
      },
      {
        "rangeMeters": 100,
        "deviationCm": 7
      },
      {
        "rangeMeters": 150,
        "deviationCm": 9
      },
      {
        "rangeMeters": 200,
        "deviationCm": 7
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -12
      }
    ]
  },
  {
    "id": "profile_15",
    "weapon": "נגב",
    "sight": "נגבון+מפרומור",
    "zeroRangeMeters": 30,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -1
      },
      {
        "rangeMeters": 50,
        "deviationCm": 5
      },
      {
        "rangeMeters": 100,
        "deviationCm": 14
      },
      {
        "rangeMeters": 150,
        "deviationCm": 19
      },
      {
        "rangeMeters": 200,
        "deviationCm": 18
      },
      {
        "rangeMeters": 250,
        "deviationCm": 12
      },
      {
        "rangeMeters": 300,
        "deviationCm": 0
      }
    ]
  },
  {
    "id": "profile_16",
    "weapon": "נגב",
    "sight": "נגב+מפרומור",
    "zeroRangeMeters": 35,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -3
      },
      {
        "rangeMeters": 50,
        "deviationCm": 3
      },
      {
        "rangeMeters": 100,
        "deviationCm": 11
      },
      {
        "rangeMeters": 150,
        "deviationCm": 16
      },
      {
        "rangeMeters": 200,
        "deviationCm": 16
      },
      {
        "rangeMeters": 250,
        "deviationCm": 11
      },
      {
        "rangeMeters": 300,
        "deviationCm": 0
      }
    ]
  },
  {
    "id": "profile_17",
    "weapon": "נגב",
    "sight": "מארס",
    "zeroRangeMeters": 50,
    "points": [
      {
        "rangeMeters": 25,
        "deviationCm": -4
      },
      {
        "rangeMeters": 50,
        "deviationCm": 0
      },
      {
        "rangeMeters": 100,
        "deviationCm": 6
      },
      {
        "rangeMeters": 150,
        "deviationCm": 9
      },
      {
        "rangeMeters": 200,
        "deviationCm": 7
      },
      {
        "rangeMeters": 250,
        "deviationCm": 0
      },
      {
        "rangeMeters": 300,
        "deviationCm": -12
      }
    ]
  }
];

export const uniqueWeapons = Array.from(
  new Set(ballisticProfiles.map((profile) => profile.weapon)),
);
