/**
 * ICS (iCalendar) file generation and download service
 * For the ISMIR 2025 program schedule
 */

// ISMIR 2025 basic info (used where needed)
// const CONFERENCE_INFO = {
//   name: 'ISMIR 2025',
//   location: 'KAIST, Daejeon, South Korea',
//   googleMapUrl: 'https://maps.google.com/?q=KAIST,+Daejeon,+South+Korea',
//   timezone: 'Asia/Seoul',
//   year: 2025,
//   month: 9, // September (0-based: 8, but we'll use 9 for clarity)
// };

// Date mapping (9/20 = 2025-09-20)
const DATE_MAPPING = {
  '9/20': new Date(2025, 8, 20), // September 20, 2025
  '9/21': new Date(2025, 8, 21), // September 21, 2025
  '9/22': new Date(2025, 8, 22), // September 22, 2025
  '9/23': new Date(2025, 8, 23), // September 23, 2025
  '9/24': new Date(2025, 8, 24), // September 24, 2025
  '9/25': new Date(2025, 8, 25), // September 25, 2025
  '9/26': new Date(2025, 8, 26), // September 26, 2025
};

// Column index to date mapping (excluding the time column)
const COLUMN_TO_DATE = {
  1: '9/20', // Satellite
  2: '9/21', // Tutorial
  3: '9/22', // Conference Day 1
  4: '9/23', // Conference Day 2
  5: '9/24', // Conference Day 3
  6: '9/25', // Conference Day 4
  7: '9/26', // Satellite (KAIST)
  8: '9/26', // Satellite (Sogang)
};

// Venue info mapping (based on SectionVenue.vue and SectionCampusMapPage.vue)
const LOCATION_MAPPING = {
  1: 'KAIST, Daejeon, South Korea', // 9/20 Satellite
  2: 'KAIST Creative Learning Building E11, Daejeon, South Korea', // 9/21 Tutorial
  3: 'KAIST Main Auditorium E15, Daejeon, South Korea', // 9/22 Conference
  4: 'KAIST Main Auditorium E15, Daejeon, South Korea', // 9/23 Conference
  5: 'KAIST Main Auditorium E15, Daejeon, South Korea', // 9/24 Conference
  6: 'KAIST Main Auditorium E15, Daejeon, South Korea', // 9/25 Conference
  7: 'KAIST, Daejeon, South Korea', // 9/26 KAIST Satellite
  8: 'Sogang University, Seoul, South Korea', // 9/26 Sogang Satellite
};

// Detailed venue mapping (specific room info per building) - prepared for future extension
// eslint-disable-next-line no-unused-vars
const DETAILED_LOCATION_MAPPING = {
  // Tutorial Sessions (9/21 @ E11)
  'tutorial': {
    building: 'KAIST Creative Learning Building E11',
    rooms: {
      'morning': ['T1@E11-101A', 'T2@E11-102A', 'T3@E11-103A'], // 09:00-12:30
      'afternoon': ['T4@E11-101A', 'T5@E11-102A', 'T6@E11-103A'] // 14:00-17:30
    },
    address: 'KAIST, Daejeon, South Korea',
    registration: 'E11 1F Lobby'
  },
  // Main Conference (9/22-25 @ E15)
  'conference': {
    building: 'KAIST Main Auditorium E15',
    rooms: {
      'oral': 'E15 Concert Hall',
      'poster': 'E15 Seminar Room',
      'keynote': 'E15 Concert Hall',
      'registration': 'E15 1F Lobby'
    },
    address: 'KAIST, Daejeon, South Korea'
  },
  // Special Venues
  'welcome_reception': {
    venue: 'Golfzon Zoimaru',
    address: 'Daejeon, South Korea',
    date: '9/21',
    time: '18:30 - 21:00'
  },
  'banquet': {
    venue: 'ICC Hotel',
    address: 'Daejeon, South Korea',
    date: '9/24',
    time: '19:30 - 22:00'
  }
};

// Google Maps URL mapping (working links from SectionVenue.vue)
const GOOGLE_MAPS_URLS = {
  1: 'https://maps.app.goo.gl/5RB8d6FcahjnnGgg9', // 9/20 KAIST campus map
  2: 'https://maps.google.com/?q=KAIST+Creative+Learning+Building+E11,+Daejeon,+South+Korea', // 9/21 E11
  3: 'https://maps.google.com/?q=KAIST+E15+%EB%8C%80%EA%B0%95%EB%8B%B9,+%EB%8C%80%EC%A0%84%EA%B4%91%EC%97%AD%EC%8B%9C+%EC%9C%A0%EC%84%B1%EA%B5%AC', // 9/22-25 E15
  4: 'https://maps.google.com/?q=KAIST+E15+%EB%8C%80%EA%B0%95%EB%8B%B9,+%EB%8C%80%EC%A0%84%EA%B4%91%EC%97%AD%EC%8B%9C+%EC%9C%A0%EC%84%B1%EA%B5%AC', // 9/23 E15
  5: 'https://maps.google.com/?q=KAIST+E15+%EB%8C%80%EA%B0%95%EB%8B%B9,+%EB%8C%80%EC%A0%84%EA%B4%91%EC%97%AD%EC%8B%9C+%EC%9C%A0%EC%84%B1%EA%B5%AC', // 9/24 E15
  6: 'https://maps.google.com/?q=KAIST+E15+%EB%8C%80%EA%B0%95%EB%8B%B9,+%EB%8C%80%EC%A0%84%EA%B4%91%EC%97%AD%EC%8B%9C+%EC%9C%A0%EC%84%B1%EA%B5%AC', // 9/25 E15
  7: 'https://maps.app.goo.gl/5RB8d6FcahjnnGgg9', // 9/26 KAIST campus map
  8: 'https://maps.google.com/?q=Sogang+University,+Seoul,+South+Korea', // 9/26 Sogang
};

// Google Maps URLs for special events
const SPECIAL_EVENT_MAPS = {
  'welcome_reception': 'https://maps.google.com/?q=%EA%B3%A8%ED%94%84%EC%A1%B4+%EC%A1%B0%EC%9D%B4%EB%A7%88%EB%A3%A8,+%EB%8C%80%EC%A0%84',
  'banquet': 'https://maps.google.com/?q=%ED%98%B8%ED%85%94ICC,+%EB%8C%80%EC%A0%84',
  'k_culture': 'https://maps.google.com/?q=KAIST+E15+%EB%8C%80%EA%B0%95%EB%8B%B9,+%EB%8C%80%EC%A0%84%EA%B4%91%EC%97%AD%EC%8B%9C+%EC%9C%A0%EC%84%B1%EA%B5%AC',
  'korean_concert': 'https://maps.google.com/?q=KAIST+E15+%EB%8C%80%EA%B0%95%EB%8B%B9,+%EB%8C%80%EC%A0%84%EA%B4%91%EC%97%AD%EC%8B%9C+%EC%9C%A0%EC%84%B1%EA%B5%AC',
  'hcmir25': 'https://maps.app.goo.gl/btnbicuVZpe12Cd49'
};

// Actual time mapping for special events (works around the 30-minute schedule grid)
const SPECIAL_EVENT_TIMES = {
  'hcmir25': {
    date: '9/20',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Room #3229, Paik Nam June Hall (백남준 Hall), N25 Building, Industrial Design Department, KAIST',
    googleMapUrl: 'https://maps.app.goo.gl/btnbicuVZpe12Cd49'
  },
  'tutorial_morning': {
    date: '9/21',
    startTime: '09:00',
    endTime: '12:30',
    location: 'KAIST Creative Learning Building E11, Daejeon, South Korea'
  },
  'tutorial_afternoon': {
    date: '9/21', 
    startTime: '14:00',
    endTime: '17:30',
    location: 'KAIST Creative Learning Building E11, Daejeon, South Korea'
  },
  'welcome_reception': {
    date: '9/21',
    startTime: '18:30',
    endTime: '21:30',
    location: 'Golfzon Zoimaru, Daejeon, South Korea',
    googleMapUrl: 'https://maps.google.com/?q=%EA%B3%A8%ED%94%84%EC%A1%B4+%EC%A1%B0%EC%9D%B4%EB%A7%88%EB%A3%A8,+%EB%8C%80%EC%A0%84'
  },
  'registration_921': {
    date: '9/21',
    startTime: '07:00',
    endTime: '09:00',
    location: 'KAIST Creative Learning Building E11, Daejeon, South Korea'
  },
  'lunch_921': {
    date: '9/21',
    startTime: '12:30',
    endTime: '14:00',
    location: 'KAIST Creative Learning Building E11, Daejeon, South Korea'
  },
  // 9/22 Conference Day 1 events
  'registration_922': {
    date: '9/22',
    startTime: '07:00',
    endTime: '08:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'opening_922': {
    date: '9/22',
    startTime: '08:30',
    endTime: '09:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'oral_session_1_922': {
    date: '9/22',
    startTime: '09:00',
    endTime: '10:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'coffee_poster_1_922': {
    date: '9/22',
    startTime: '10:30',
    endTime: '12:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'lunch_922': {
    date: '9/22',
    startTime: '12:00',
    endTime: '13:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'keynote_1_922': {
    date: '9/22',
    startTime: '13:00',
    endTime: '14:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'oral_session_2_922': {
    date: '9/22',
    startTime: '14:30',
    endTime: '16:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'poster_session_2_922': {
    date: '9/22',
    startTime: '16:00',
    endTime: '17:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'industry_meetup_922': {
    date: '9/22',
    startTime: '17:30',
    endTime: '19:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'music_program_922': {
    date: '9/22',
    startTime: '19:30',
    endTime: '20:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  // 9/23 Conference Day 2 events
  'registration_923': {
    date: '9/23',
    startTime: '08:00',
    endTime: '09:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'oral_session_3_923': {
    date: '9/23',
    startTime: '09:00',
    endTime: '10:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'coffee_poster_3_923': {
    date: '9/23',
    startTime: '10:30',
    endTime: '12:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'lunch_923': {
    date: '9/23',
    startTime: '12:00',
    endTime: '13:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'industry_session_923': {
    date: '9/23',
    startTime: '13:00',
    endTime: '14:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'oral_session_4_923': {
    date: '9/23',
    startTime: '14:30',
    endTime: '16:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'poster_session_4_923': {
    date: '9/23',
    startTime: '16:00',
    endTime: '17:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'wimir_session_923': {
    date: '9/23',
    startTime: '17:30',
    endTime: '18:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'korean_traditional_music_923': {
    date: '9/23',
    startTime: '18:30',
    endTime: '19:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'k_culture_night_923': {
    date: '9/23',
    startTime: '19:30',
    endTime: '21:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  // 9/24 Conference Day 3 events
  'registration_924': {
    date: '9/24',
    startTime: '08:00',
    endTime: '09:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'oral_session_5_924': {
    date: '9/24',
    startTime: '09:00',
    endTime: '10:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'coffee_poster_5_924': {
    date: '9/24',
    startTime: '10:30',
    endTime: '12:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'lunch_924': {
    date: '9/24',
    startTime: '12:00',
    endTime: '13:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'keynote_2_924': {
    date: '9/24',
    startTime: '13:00',
    endTime: '14:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'oral_session_6_924': {
    date: '9/24',
    startTime: '14:30',
    endTime: '16:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'poster_session_6_924': {
    date: '9/24',
    startTime: '16:00',
    endTime: '17:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'special_session_924': {
    date: '9/24',
    startTime: '17:30',
    endTime: '18:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  // 9/25 Conference Day 4 events
  'registration_925': {
    date: '9/25',
    startTime: '08:00',
    endTime: '09:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'oral_session_7_925': {
    date: '9/25',
    startTime: '09:00',
    endTime: '10:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'coffee_poster_7_925': {
    date: '9/25',
    startTime: '10:30',
    endTime: '12:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'lunch_925': {
    date: '9/25',
    startTime: '12:00',
    endTime: '13:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'society_meeting_925': {
    date: '9/25',
    startTime: '13:00',
    endTime: '14:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'award_talks_925': {
    date: '9/25',
    startTime: '14:00',
    endTime: '14:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'closing_remarks_925': {
    date: '9/25',
    startTime: '14:30',
    endTime: '15:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'late_breaking_demo_925': {
    date: '9/25',
    startTime: '15:00',
    endTime: '17:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'unconference_925': {
    date: '9/25',
    startTime: '17:00',
    endTime: '18:30',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  // 9/26 Workshop Day events
  'llm4ma_workshop_926': {
    date: '9/26',
    startTime: '09:00',
    endTime: '17:00',
    location: 'KAIST Main Auditorium E15, Daejeon, South Korea'
  },
  'dlfm_workshop_926': {
    date: '9/26',
    startTime: '09:00',
    endTime: '18:00',
    location: 'Sogang University, Seoul, South Korea'
  },
  'banquet': {
    date: '9/24',
    startTime: '19:30', 
    endTime: '22:00',
    location: 'ICC Hotel, Daejeon, South Korea',
    googleMapUrl: 'https://maps.google.com/?q=%ED%98%B8%ED%85%94ICC,+%EB%8C%80%EC%A0%84'
  },
  'rencon_925': {
    date: '9/25',
    startTime: '19:30',
    endTime: '21:00',
    location: 'KAIST, Daejeon, South Korea'
  }
};

/**
 * Detect special events and return their actual time info
 * @param {string} eventTitle - Event title
 * @param {number} columnIndex - Column index
 * @returns {Object|null} Special event info, or null
 */
function getSpecialEventTime(eventTitle, columnIndex) {
  // Normalize after removing superscripts (¹²³⁴⁵⁶⁷⁸⁹⁰)
  const normalizedTitle = eventTitle
    .toLowerCase()
    .replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/g, '') // Remove superscripts
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // HCMIR25 event
  if (normalizedTitle.includes('hcmir') && columnIndex === 1) {
    console.log('HCMIR25 special event detected:', eventTitle, 'columnIndex:', columnIndex);
    return SPECIAL_EVENT_TIMES.hcmir25;
  }
  
  // Tutorial sessions
  if (normalizedTitle.includes('tutorial') && columnIndex === 2) {
    if (normalizedTitle.includes('t1') || normalizedTitle.includes('t2') || normalizedTitle.includes('t3')) {
      return SPECIAL_EVENT_TIMES.tutorial_morning;
    } else if (normalizedTitle.includes('t4') || normalizedTitle.includes('t5') || normalizedTitle.includes('t6')) {
      return SPECIAL_EVENT_TIMES.tutorial_afternoon;
    }
  }
  
  // 9/21 Registration event (merged 07:00-09:00)
  if (normalizedTitle.includes('registration') && columnIndex === 2) {
    return SPECIAL_EVENT_TIMES.registration_921;
  }
  
  // 9/21 Lunch event
  if (normalizedTitle.includes('lunch') && columnIndex === 2) {
    return SPECIAL_EVENT_TIMES.lunch_921;
  }
  
  // 9/22 Conference Day 1 events
  if (columnIndex === 3) {
    // Registration
    if (normalizedTitle.includes('registration')) {
      return SPECIAL_EVENT_TIMES.registration_922;
    }
    // Opening
    if (normalizedTitle.includes('opening')) {
      return SPECIAL_EVENT_TIMES.opening_922;
    }
    // Oral Session 1
    if (normalizedTitle.includes('oral') && normalizedTitle.includes('session') && normalizedTitle.includes('1')) {
      return SPECIAL_EVENT_TIMES.oral_session_1_922;
    }
    // Coffee + Poster Session 1
    if ((normalizedTitle.includes('coffee') && normalizedTitle.includes('poster')) && normalizedTitle.includes('1')) {
      return SPECIAL_EVENT_TIMES.coffee_poster_1_922;
    }
    // Lunch
    if (normalizedTitle.includes('lunch')) {
      return SPECIAL_EVENT_TIMES.lunch_922;
    }
    // Keynote 1
    if (normalizedTitle.includes('keynote') && normalizedTitle.includes('1')) {
      return SPECIAL_EVENT_TIMES.keynote_1_922;
    }
    // Oral Session 2
    if (normalizedTitle.includes('oral') && normalizedTitle.includes('session') && normalizedTitle.includes('2')) {
      return SPECIAL_EVENT_TIMES.oral_session_2_922;
    }
    // Poster Session 2
    if (normalizedTitle.includes('poster') && normalizedTitle.includes('session') && normalizedTitle.includes('2')) {
      return SPECIAL_EVENT_TIMES.poster_session_2_922;
    }
    // Industry Meetup
    if (normalizedTitle.includes('industry') && normalizedTitle.includes('meetup')) {
      return SPECIAL_EVENT_TIMES.industry_meetup_922;
    }
    // ISMIR Music Program
    if (normalizedTitle.includes('ismir') && normalizedTitle.includes('music')) {
      return SPECIAL_EVENT_TIMES.music_program_922;
    }
  }
  
  // 9/23 Conference Day 2 events
  if (columnIndex === 4) {
    // Registration
    if (normalizedTitle.includes('registration')) {
      return SPECIAL_EVENT_TIMES.registration_923;
    }
    // Oral Session 3
    if (normalizedTitle.includes('oral') && normalizedTitle.includes('session') && normalizedTitle.includes('3')) {
      return SPECIAL_EVENT_TIMES.oral_session_3_923;
    }
    // Coffee + Poster Session 3
    if ((normalizedTitle.includes('coffee') && normalizedTitle.includes('poster')) && normalizedTitle.includes('3')) {
      return SPECIAL_EVENT_TIMES.coffee_poster_3_923;
    }
    // Lunch
    if (normalizedTitle.includes('lunch')) {
      return SPECIAL_EVENT_TIMES.lunch_923;
    }
    // Industry Session
    if (normalizedTitle.includes('industry') && normalizedTitle.includes('session')) {
      return SPECIAL_EVENT_TIMES.industry_session_923;
    }
    // Oral Session 4
    if (normalizedTitle.includes('oral') && normalizedTitle.includes('session') && normalizedTitle.includes('4')) {
      return SPECIAL_EVENT_TIMES.oral_session_4_923;
    }
    // Poster Session 4
    if (normalizedTitle.includes('poster') && normalizedTitle.includes('session') && normalizedTitle.includes('4')) {
      return SPECIAL_EVENT_TIMES.poster_session_4_923;
    }
    // WIMIR Session
    if (normalizedTitle.includes('wimir')) {
      return SPECIAL_EVENT_TIMES.wimir_session_923;
    }
    // Korean Traditional Music Concert
    if (normalizedTitle.includes('korean') && normalizedTitle.includes('traditional') && normalizedTitle.includes('music')) {
      return SPECIAL_EVENT_TIMES.korean_traditional_music_923;
    }
    // K-Culture Night
    if (normalizedTitle.includes('k-culture') || normalizedTitle.includes('culture')) {
      return SPECIAL_EVENT_TIMES.k_culture_night_923;
    }
  }
  
  // 9/24 Conference Day 3 events
  if (columnIndex === 5) {
    // Registration
    if (normalizedTitle.includes('registration')) {
      return SPECIAL_EVENT_TIMES.registration_924;
    }
    // Oral Session 5
    if (normalizedTitle.includes('oral') && normalizedTitle.includes('session') && normalizedTitle.includes('5')) {
      return SPECIAL_EVENT_TIMES.oral_session_5_924;
    }
    // Coffee + Poster Session 5
    if ((normalizedTitle.includes('coffee') && normalizedTitle.includes('poster')) && normalizedTitle.includes('5')) {
      return SPECIAL_EVENT_TIMES.coffee_poster_5_924;
    }
    // Lunch
    if (normalizedTitle.includes('lunch')) {
      return SPECIAL_EVENT_TIMES.lunch_924;
    }
    // Keynote 2
    if (normalizedTitle.includes('keynote') && normalizedTitle.includes('2')) {
      return SPECIAL_EVENT_TIMES.keynote_2_924;
    }
    // Oral Session 6
    if (normalizedTitle.includes('oral') && normalizedTitle.includes('session') && normalizedTitle.includes('6')) {
      return SPECIAL_EVENT_TIMES.oral_session_6_924;
    }
    // Poster Session 6
    if (normalizedTitle.includes('poster') && normalizedTitle.includes('session') && normalizedTitle.includes('6')) {
      return SPECIAL_EVENT_TIMES.poster_session_6_924;
    }
    // Special Session
    if (normalizedTitle.includes('special') && normalizedTitle.includes('session')) {
      return SPECIAL_EVENT_TIMES.special_session_924;
    }
  }
  
  // 9/25 Conference Day 4 events
  if (columnIndex === 6) {
    // Registration
    if (normalizedTitle.includes('registration')) {
      return SPECIAL_EVENT_TIMES.registration_925;
    }
    // Oral Session 7
    if (normalizedTitle.includes('oral') && normalizedTitle.includes('session') && normalizedTitle.includes('7')) {
      return SPECIAL_EVENT_TIMES.oral_session_7_925;
    }
    // Coffee + Poster Session 7
    if ((normalizedTitle.includes('coffee') && normalizedTitle.includes('poster')) && normalizedTitle.includes('7')) {
      return SPECIAL_EVENT_TIMES.coffee_poster_7_925;
    }
    // Lunch
    if (normalizedTitle.includes('lunch')) {
      return SPECIAL_EVENT_TIMES.lunch_925;
    }
    // Society Meeting / Board Election
    if (normalizedTitle.includes('society') || normalizedTitle.includes('board') || normalizedTitle.includes('meeting')) {
      return SPECIAL_EVENT_TIMES.society_meeting_925;
    }
    // Award and Test-of-Time Talks
    if (normalizedTitle.includes('award') || normalizedTitle.includes('test-of-time')) {
      return SPECIAL_EVENT_TIMES.award_talks_925;
    }
    // Closing Remarks, ISMIR 2026
    if (normalizedTitle.includes('closing') || normalizedTitle.includes('remarks') || normalizedTitle.includes('2026')) {
      return SPECIAL_EVENT_TIMES.closing_remarks_925;
    }
    // Late-Breaking/Demo
    if (normalizedTitle.includes('late-breaking') || normalizedTitle.includes('demo')) {
      return SPECIAL_EVENT_TIMES.late_breaking_demo_925;
    }
    // Unconference
    if (normalizedTitle.includes('unconference')) {
      return SPECIAL_EVENT_TIMES.unconference_925;
    }
  }
  
  // 9/26 Workshop Day events
  if (columnIndex === 7) {
    // LLM4MA Workshop
    if (normalizedTitle.includes('llm4ma')) {
      return SPECIAL_EVENT_TIMES.llm4ma_workshop_926;
    }
  }
  
  if (columnIndex === 8) {
    // DLfM Workshop
    if (normalizedTitle.includes('dlfm')) {
      return SPECIAL_EVENT_TIMES.dlfm_workshop_926;
    }
  }
  
  // Welcome Reception
  if (normalizedTitle.includes('welcome') || normalizedTitle.includes('reception')) {
    return SPECIAL_EVENT_TIMES.welcome_reception;
  }
  
  // Banquet
  if (normalizedTitle.includes('banquet') || normalizedTitle.includes('jam')) {
    return SPECIAL_EVENT_TIMES.banquet;
  }
  
  // Rencon (9/25)
  if (normalizedTitle.includes('rencon') && columnIndex === 6) {
    return SPECIAL_EVENT_TIMES.rencon_925;
  }
  
  return null;
}

/**
 * Parse a time string and return the start/end times
 * @param {string} timeString - Time string in "09:00 - 09:30" format
 * @returns {Object} {startHour, startMinute, endHour, endMinute}
 */
function parseTimeString(timeString) {
  const timeMatch = timeString.match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/);
  if (!timeMatch) {
    throw new Error(`Invalid time format: ${timeString}`);
  }

  return {
    startHour: parseInt(timeMatch[1]),
    startMinute: parseInt(timeMatch[2]),
    endHour: parseInt(timeMatch[3]),
    endMinute: parseInt(timeMatch[4]),
  };
}

/**
 * Convert a Date object to an ICS-format date string (UTC)
 * @param {Date} date - Date object to convert
 * @returns {string} String in YYYYMMDDTHHMMSSZ format
 */
function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Convert a Date object to an ICS-format local date string (no timezone info)
 * @param {Date} date - Date object to convert
 * @returns {string} String in YYYYMMDDTHHMMSS format (no Z)
 */
function formatICSLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Generate a unique UID
 * @param {string} eventTitle - Event title
 * @param {string} dateStr - Date string
 * @param {string} timeStr - Time string
 * @returns {string} Unique UID
 */
function generateUID(eventTitle, dateStr, timeStr) {
  const cleanTitle = eventTitle.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const cleanTime = timeStr.replace(/[^0-9]/g, '');
  return `${cleanTitle}-${dateStr.replace('/', '')}-${cleanTime}@ismir2025.github.io`;
}

/**
 * Clean up and enhance the event title
 * @param {string} rawTitle - Original title
 * @returns {string} Cleaned title
 */
function cleanEventTitle(rawTitle) {
  if (!rawTitle || typeof rawTitle !== 'string') {
    return 'ISMIR 2025 Event';
  }

  // Replace line breaks with spaces and collapse multiple spaces
  let cleaned = rawTitle.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Remove emojis (optional)
  cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
  
  // Add the ISMIR 2025 prefix (if not already present)
  if (!cleaned.toLowerCase().includes('ismir')) {
    cleaned = `ISMIR 2025 - ${cleaned}`;
  }

  return cleaned;
}

/**
 * Generate the event description
 * @param {string} eventTitle - Event title
 * @param {string} location - Location
 * @param {string} googleMapUrl - Google Maps URL
 * @param {string} detailedLocation - Detailed location info
 * @returns {string} Event description
 */
function generateEventDescription(eventTitle, location, googleMapUrl, detailedLocation) {
  const description = [
    `ISMIR 2025 Conference Event: ${eventTitle}`,
    ''
  ];
  
  // Append detailed location info if available
  if (detailedLocation) {
    description.push(`Venue Details: ${detailedLocation}`);
  }
  
  description.push(
    `Location: ${location}`,
    `Google Maps: ${googleMapUrl}`,
    '',
    '📍 KAIST Campus Map: https://maps.app.goo.gl/5RB8d6FcahjnnGgg9',
    '',
    '🎵 International Society for Music Information Retrieval Conference 2025',
    'Website: https://ismir2025.ismir.net/',
    '',
    'Korea Advanced Institute of Science and Technology (KAIST)',
    'Daejeon, South Korea'
  );

  return description.join('\\n');
}

/**
 * Convert a Google Maps embed URL to a regular user-facing URL
 * @param {string} embedUrl - embed URL
 * @returns {string} URL the user can click
 */
// eslint-disable-next-line no-unused-vars
function convertEmbedToUserUrl(embedUrl) {
  // Return as-is if it is already a regular URL
  if (!embedUrl.includes('/embed')) {
    return embedUrl;
  }
  
  // Extract the place ID from the embed URL
  const placeIdMatch = embedUrl.match(/!1s([^!]+)/);
  if (placeIdMatch) {
    const placeId = placeIdMatch[1];
    return `https://maps.google.com/?cid=${placeId}`;
  }
  
  // Fall back to coordinates if no place ID is found
  const coordMatch = embedUrl.match(/!2d([^!]+)!3d([^!]+)/);
  if (coordMatch) {
    const lng = coordMatch[1];
    const lat = coordMatch[2];
    return `https://maps.google.com/?q=${lat},${lng}`;
  }
  
  // Default to a KAIST search if conversion is not possible
  return 'https://maps.google.com/?q=KAIST,+Daejeon,+South+Korea';
}

/**
 * Get specific location info based on the event type
 * @param {string} eventTitle - Event title
 * @param {number} columnIndex - Column index
 * @returns {Object} {location, googleMapUrl, detailedLocation}
 */
function getEventSpecificVenue(eventTitle, columnIndex) {
  const normalizedTitle = eventTitle.toLowerCase().replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // HCMIR25 - N25 Paik Nam June Hall (9/20)
  if (normalizedTitle.includes('hcmir') && columnIndex === 1) {
    return {
      location: 'Room #3229, Paik Nam June Hall (백남준 Hall), N25 Building, Industrial Design Department, KAIST',
      googleMapUrl: SPECIAL_EVENT_MAPS.hcmir25,
      detailedLocation: 'Sep 20 (Sat) 14:00 - 18:00 @ Room #3229, Paik Nam June Hall, N25 Building, KAIST'
    };
  }
  
  // Welcome Reception - Golfzon Zoimaru (9/21)
  if (normalizedTitle.includes('welcome') || normalizedTitle.includes('reception')) {
    return {
      location: 'Golfzon Zoimaru, Daejeon, South Korea',
      googleMapUrl: SPECIAL_EVENT_MAPS.welcome_reception,
      detailedLocation: 'Sep 21 (Sun) 18:30 - 21:00 @ Golfzon Zoimaru'
    };
  }
  
  // Banquet & Jam Session - ICC Hotel (9/24)
  if (normalizedTitle.includes('banquet') || normalizedTitle.includes('jam')) {
    return {
      location: 'ICC Hotel, Daejeon, South Korea',
      googleMapUrl: SPECIAL_EVENT_MAPS.banquet,
      detailedLocation: 'Sep 24 (Wed) 19:30 - 22:00 @ ICC Hotel'
    };
  }
  
  // Korean Traditional Music Concert & K-Culture Night (9/23)
  if (normalizedTitle.includes('korean') && normalizedTitle.includes('traditional')) {
    return {
      location: 'KAIST Main Auditorium E15, Daejeon, South Korea',
      googleMapUrl: SPECIAL_EVENT_MAPS.korean_concert,
      detailedLocation: 'KAIST E15 Concert Hall'
    };
  }
  if (normalizedTitle.includes('k-culture') || normalizedTitle.includes('culture')) {
    return {
      location: 'KAIST Main Auditorium E15, Daejeon, South Korea',
      googleMapUrl: SPECIAL_EVENT_MAPS.k_culture,
      detailedLocation: 'KAIST E15 Concert Hall'
    };
  }
  
  // Tutorial Sessions - E11 (9/21)
  if (normalizedTitle.includes('tutorial') && columnIndex === 2) {
    // Distinguish tutorial sessions by time slot
    let sessionDetails = 'Tutorial Sessions @ E11';
    if (normalizedTitle.includes('t1') || normalizedTitle.includes('t2') || normalizedTitle.includes('t3')) {
      sessionDetails = 'Morning Tutorial Sessions (T1@101A, T2@102A, T3@103A) @ E11';
    } else if (normalizedTitle.includes('t4') || normalizedTitle.includes('t5') || normalizedTitle.includes('t6')) {
      sessionDetails = 'Afternoon Tutorial Sessions (T4@101A, T5@102A, T6@103A) @ E11';
    } else {
      sessionDetails = 'Tutorial Sessions (101A, 102A, 103A) @ E11';
    }
    
    return {
      location: 'KAIST Creative Learning Building E11, Daejeon, South Korea',
      googleMapUrl: GOOGLE_MAPS_URLS[2],
      detailedLocation: `${sessionDetails} (Registration: E11 1F Lobby)`
    };
  }
  
  // Registration - split by building
  if (normalizedTitle.includes('registration')) {
    if (columnIndex === 2) { // 9/21 Tutorial day
      return {
        location: 'KAIST Creative Learning Building E11, Daejeon, South Korea',
        googleMapUrl: GOOGLE_MAPS_URLS[2],
        detailedLocation: 'Registration @ E11 1F Lobby'
      };
    } else { // 9/22-25 Conference days
      return {
        location: 'KAIST Main Auditorium E15, Daejeon, South Korea',
        googleMapUrl: GOOGLE_MAPS_URLS[columnIndex],
        detailedLocation: 'Registration @ E15 1F Lobby'
      };
    }
  }
  
  // Oral Sessions - E15 Concert Hall
  if (normalizedTitle.includes('oral')) {
    return {
      location: 'KAIST Main Auditorium E15, Daejeon, South Korea',
      googleMapUrl: GOOGLE_MAPS_URLS[columnIndex],
      detailedLocation: 'Oral Presentation Session @ E15 Concert Hall'
    };
  }
  
  // Poster Sessions - E15 Seminar Room
  if (normalizedTitle.includes('poster')) {
    return {
      location: 'KAIST Main Auditorium E15, Daejeon, South Korea',
      googleMapUrl: GOOGLE_MAPS_URLS[columnIndex],
      detailedLocation: 'Poster Session @ E15 Seminar Room'
    };
  }
  
  // Keynote - E15 Concert Hall
  if (normalizedTitle.includes('keynote')) {
    return {
      location: 'KAIST Main Auditorium E15, Daejeon, South Korea',
      googleMapUrl: GOOGLE_MAPS_URLS[columnIndex],
      detailedLocation: 'Keynote @ E15 Concert Hall'
    };
  }
  
  // DLfM Workshop - Sogang University (9/26)
  if (normalizedTitle.includes('dlfm') && columnIndex === 8) {
    return {
      location: 'Sogang University, Seoul, South Korea',
      googleMapUrl: 'https://maps.app.goo.gl/wXu9FhD28N1Fj1nj6',
      detailedLocation: 'Sep 26 (Fri) 09:00 - 18:00 @ Sogang University, Seoul'
    };
  }
  
  // Default: use the column-based mapping
  return {
    location: LOCATION_MAPPING[columnIndex],
    googleMapUrl: GOOGLE_MAPS_URLS[columnIndex],
    detailedLocation: null
  };
}

/**
 * Generate ICS file content
 * @param {Object} eventData - Event data
 * @param {string} eventData.title - Event title
 * @param {string} eventData.timeString - Time string ("09:00 - 09:30")
 * @param {number} eventData.columnIndex - Column index (1-8)
 * @returns {string} ICS file content
 */
export function generateICSContent(eventData) {
  const { title, timeString, columnIndex } = eventData;

  // Input validation
  if (!title || !timeString || !columnIndex) {
    throw new Error('Missing required event data');
  }

  // Check for special event times (use the actual time range)
  const specialEventTime = getSpecialEventTime(title, columnIndex);
  console.log('Generating ICS:', title, 'columnIndex:', columnIndex, 'timeString:', timeString, 'specialEventTime:', specialEventTime);
  
  let startDate, endDate, location, googleMapUrl, detailedLocation;
  
  if (specialEventTime) {
    console.log('Using special event time:', specialEventTime.startTime, '-', specialEventTime.endTime);
    // Use the actual time for special events
    const baseDate = DATE_MAPPING[specialEventTime.date];
    const { startHour, startMinute, endHour, endMinute } = parseTimeString(`${specialEventTime.startTime} - ${specialEventTime.endTime}`);
    
    startDate = new Date(baseDate);
    startDate.setHours(startHour, startMinute, 0, 0);
    
    endDate = new Date(baseDate);
    endDate.setHours(endHour, endMinute, 0, 0);
    
    location = specialEventTime.location;
    googleMapUrl = specialEventTime.googleMapUrl || GOOGLE_MAPS_URLS[columnIndex];
    detailedLocation = `${specialEventTime.startTime} - ${specialEventTime.endTime}`;
  } else {
    // Use the existing logic for regular events
  const dateStr = COLUMN_TO_DATE[columnIndex];
  const baseDate = DATE_MAPPING[dateStr];

  if (!baseDate) {
    throw new Error(`Invalid column index: ${columnIndex}`);
  }

  // Parse the time
  const { startHour, startMinute, endHour, endMinute } = parseTimeString(timeString);

  // Build start/end times (in KST)
    startDate = new Date(baseDate);
  startDate.setHours(startHour, startMinute, 0, 0);

    endDate = new Date(baseDate);
  endDate.setHours(endHour, endMinute, 0, 0);
    
    // Get event-specific location info
    const venueInfo = getEventSpecificVenue(title, columnIndex);
    location = venueInfo.location;
    googleMapUrl = venueInfo.googleMapUrl;
    detailedLocation = venueInfo.detailedLocation;
  }

  // Convert to ICS format
  const dtStamp = formatICSDate(new Date());

  // Clean up event info
  const cleanTitle = cleanEventTitle(title);
  const description = generateEventDescription(title, location, googleMapUrl, detailedLocation);
  const dateStr = specialEventTime ? specialEventTime.date : COLUMN_TO_DATE[columnIndex];
  const uid = generateUID(title, dateStr, timeString);

  // Generate ICS content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ISMIR 2025//Conference Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Seoul',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0900',
    'TZOFFSETTO:+0900',
    'TZNAME:KST',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=Asia/Seoul:${formatICSLocalDate(startDate)}`,
    `DTEND;TZID=Asia/Seoul:${formatICSLocalDate(endDate)}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'CATEGORIES:CONFERENCE,ACADEMIC,MUSIC,TECHNOLOGY',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return icsContent.join('\r\n');
}

/**
 * Download the ICS file
 * @param {Object} eventData - Event data
 */
export function downloadICSFile(eventData) {
  try {
    const icsContent = generateICSContent(eventData);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    
    // Build the filename
    const cleanTitle = cleanEventTitle(eventData.title)
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '_')
      .toLowerCase();
    const dateStr = COLUMN_TO_DATE[eventData.columnIndex].replace('/', '-');
    const filename = `ismir2025_${cleanTitle}_${dateStr}.ics`;

    // Trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`ICS file downloaded: ${filename}`);
  } catch (error) {
    console.error('Error generating ICS file:', error);
    alert('An error occurred while generating the calendar file. Please try again.');
  }
}

/**
 * Validate event data
 * @param {string} cellValue - Cell value
 * @returns {boolean} Whether this is a valid event
 */
export function isValidEvent(cellValue) {
  if (!cellValue || typeof cellValue !== 'string') {
    return false;
  }

  const trimmed = cellValue.trim().toLowerCase();
  
  // Empty cells and "End" markers are not events
  if (!trimmed || trimmed === 'end') {
    return false;
  }

  return true;
}

/**
 * Generate a Google Calendar URL
 * @param {Object} eventData - Event data
 * @returns {string} Google Calendar URL
 */
export function generateGoogleCalendarUrl(eventData) {
  const { title, timeString, columnIndex } = eventData;
  
  // Check for special event times (use the actual time range)
  const specialEventTime = getSpecialEventTime(title, columnIndex);
  console.log('Generating Google Calendar URL:', title, 'columnIndex:', columnIndex, 'timeString:', timeString, 'specialEventTime:', specialEventTime);
  
  let startDate, endDate, location;
  
  if (specialEventTime) {
    console.log('Using special event time (Google Calendar):', specialEventTime.startTime, '-', specialEventTime.endTime);
    // Use the actual time for special events
    const baseDate = DATE_MAPPING[specialEventTime.date];
    const { startHour, startMinute, endHour, endMinute } = parseTimeString(`${specialEventTime.startTime} - ${specialEventTime.endTime}`);
    
    startDate = new Date(baseDate);
    startDate.setHours(startHour, startMinute, 0, 0);
    
    endDate = new Date(baseDate);
    endDate.setHours(endHour, endMinute, 0, 0);
    
    location = specialEventTime.location;
  } else {
    // Use the existing logic for regular events
  const dateStr = COLUMN_TO_DATE[columnIndex];
  const baseDate = DATE_MAPPING[dateStr];
  const { startHour, startMinute, endHour, endMinute } = parseTimeString(timeString);
  
    startDate = new Date(baseDate);
  startDate.setHours(startHour, startMinute, 0, 0);
  
    endDate = new Date(baseDate);
  endDate.setHours(endHour, endMinute, 0, 0);
    
    // Location info
    const venueInfo = getEventSpecificVenue(title, columnIndex);
    location = venueInfo.location;
  }
  
  // Convert to Google Calendar format (YYYYMMDDTHHMMSSZ)
  const formatGoogleDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };
  
  // Build URL parameters
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: cleanEventTitle(title),
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    details: `ISMIR 2025 Conference Event\n\nLocation: ${location}\nWebsite: https://ismir2025.ismir.net/`,
    location: location,
    ctz: 'Asia/Seoul'
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate an Outlook Web URL
 * @param {Object} eventData - Event data
 * @returns {string} Outlook Web URL
 */
export function generateOutlookUrl(eventData) {
  const { title, timeString, columnIndex } = eventData;
  
  // Check for special event times (use the actual time range)
  const specialEventTime = getSpecialEventTime(title, columnIndex);
  console.log('Generating Outlook URL:', title, 'columnIndex:', columnIndex, 'timeString:', timeString, 'specialEventTime:', specialEventTime);
  
  let startDate, endDate, location;
  
  if (specialEventTime) {
    console.log('Using special event time (Outlook):', specialEventTime.startTime, '-', specialEventTime.endTime);
    // Use the actual time for special events
    const baseDate = DATE_MAPPING[specialEventTime.date];
    const { startHour, startMinute, endHour, endMinute } = parseTimeString(`${specialEventTime.startTime} - ${specialEventTime.endTime}`);
    
    startDate = new Date(baseDate);
    startDate.setHours(startHour, startMinute, 0, 0);
    
    endDate = new Date(baseDate);
    endDate.setHours(endHour, endMinute, 0, 0);
    
    location = specialEventTime.location;
  } else {
    // Use the existing logic for regular events
  const dateStr = COLUMN_TO_DATE[columnIndex];
  const baseDate = DATE_MAPPING[dateStr];
  const { startHour, startMinute, endHour, endMinute } = parseTimeString(timeString);
  
    startDate = new Date(baseDate);
  startDate.setHours(startHour, startMinute, 0, 0);
  
    endDate = new Date(baseDate);
  endDate.setHours(endHour, endMinute, 0, 0);
  
  // Location info
  const venueInfo = getEventSpecificVenue(title, columnIndex);
    location = venueInfo.location;
  }
  
  // Build URL parameters
  const params = new URLSearchParams({
    subject: cleanEventTitle(title),
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString(),
    body: `ISMIR 2025 Conference Event\n\nLocation: ${location}\nWebsite: https://ismir2025.ismir.net/`,
    location: location
  });
  
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generate an Apple Calendar URL (works in iOS Safari)
 * @param {Object} eventData - Event data
 * @returns {string} Apple Calendar URL
 */
export function generateAppleCalendarUrl(eventData) {
  // Apple Calendar is served the ICS file as a data URL
  const icsContent = generateICSContent(eventData);
  const dataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  return dataUrl;
}

/**
 * Build the list of calendar options
 * @returns {Array} Available calendar options
 */
export function getAvailableCalendarOptions() {
  const userAgent = navigator.userAgent;
  const options = [
    {
      id: 'google',
      name: 'Google Calendar',
      icon: '📅',
      color: '#4285f4',
      supported: true,
      handler: generateGoogleCalendarUrl
    },
    {
      id: 'outlook',
      name: 'Outlook',
      icon: '📧',
      color: '#0078d4',
      supported: true,
      handler: generateOutlookUrl
    }
  ];
  
  // Offer the Apple Calendar option to iOS users only
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    options.push({
      id: 'apple',
      name: 'Apple Calendar',
      icon: '📱',
      color: '#007aff',
      supported: true,
      handler: generateAppleCalendarUrl
    });
  }
  
  // Always offer the ICS download option (guaranteed compatibility)
  options.push({
    id: 'download',
    name: 'Download ICS',
    icon: '⬇️',
    color: '#6c757d',
    supported: true,
    handler: downloadICSFile
  });
  
  return options;
}

/**
 * Merge multiple events into a single ICS file
 * @param {Array} eventDataArray - Array of event data
 * @returns {string} Merged ICS file content
 */
export function generateMergedICSContent(eventDataArray) {
  if (!eventDataArray || eventDataArray.length === 0) {
    throw new Error('No events provided for merging');
  }

  const dtStamp = formatICSDate(new Date());
  
  // ICS header
  const icsHeader = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ISMIR 2025//Conference Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:ISMIR 2025 Complete Schedule',
    'X-WR-CALDESC:Complete schedule for ISMIR 2025 Conference',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Seoul',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0900',
    'TZOFFSETTO:+0900',
    'TZNAME:KST',
    'END:STANDARD',
    'END:VTIMEZONE'
  ];

  // Process all events
  const events = [];
  
  eventDataArray.forEach((eventData, index) => {
    try {
      const { title, timeString, columnIndex } = eventData;

      // Check for special event times
      const specialEventTime = getSpecialEventTime(title, columnIndex);
      
      let startDate, endDate, location, googleMapUrl, detailedLocation;
      
      if (specialEventTime) {
        // Use the actual time for special events
        const baseDate = DATE_MAPPING[specialEventTime.date];
        const { startHour, startMinute, endHour, endMinute } = parseTimeString(`${specialEventTime.startTime} - ${specialEventTime.endTime}`);
        
        startDate = new Date(baseDate);
        startDate.setHours(startHour, startMinute, 0, 0);
        
        endDate = new Date(baseDate);
        endDate.setHours(endHour, endMinute, 0, 0);
        
        location = specialEventTime.location;
        googleMapUrl = specialEventTime.googleMapUrl || GOOGLE_MAPS_URLS[columnIndex];
        detailedLocation = `${specialEventTime.startTime} - ${specialEventTime.endTime}`;
      } else {
        // Use the existing logic for regular events
        const dateStr = COLUMN_TO_DATE[columnIndex];
        const baseDate = DATE_MAPPING[dateStr];
        const { startHour, startMinute, endHour, endMinute } = parseTimeString(timeString);

        startDate = new Date(baseDate);
        startDate.setHours(startHour, startMinute, 0, 0);

        endDate = new Date(baseDate);
        endDate.setHours(endHour, endMinute, 0, 0);
        
        // Get event-specific location info
        const venueInfo = getEventSpecificVenue(title, columnIndex);
        location = venueInfo.location;
        googleMapUrl = venueInfo.googleMapUrl;
        detailedLocation = venueInfo.detailedLocation;
      }

      // Clean up event info
      const cleanTitle = cleanEventTitle(title);
      const description = generateEventDescription(title, location, googleMapUrl, detailedLocation);
      const dateStr = specialEventTime ? specialEventTime.date : COLUMN_TO_DATE[columnIndex];
      const uid = generateUID(title, dateStr, timeString) + `-${index}`; // Append the index to guarantee uniqueness

      // Create the individual event
      const eventLines = [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART;TZID=Asia/Seoul:${formatICSLocalDate(startDate)}`,
        `DTEND;TZID=Asia/Seoul:${formatICSLocalDate(endDate)}`,
        `SUMMARY:${cleanTitle}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'CATEGORIES:CONFERENCE,ACADEMIC,MUSIC,TECHNOLOGY',
        'END:VEVENT'
      ];

      events.push(...eventLines);
    } catch (error) {
      console.warn(`Failed to process event: ${eventData.title}`, error);
      // Skip failed events and continue
    }
  });

  // ICS footer
  const icsFooter = ['END:VCALENDAR'];

  // Join all parts
  const fullICS = [...icsHeader, ...events, ...icsFooter];
  
  return fullICS.join('\r\n');
}

/**
 * Download the merged ICS file
 * @param {Array} eventDataArray - Array of event data
 * @param {string} filename - Filename (optional)
 */
export function downloadMergedICSFile(eventDataArray, filename = 'ismir2025_complete_schedule.ics') {
  try {
    const icsContent = generateMergedICSContent(eventDataArray);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    
    // Trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`Merged ICS file downloaded: ${filename} (${eventDataArray.length} events)`);
  } catch (error) {
    console.error('Error generating merged ICS file:', error);
    alert('An error occurred while generating the complete schedule file. Please try again.');
  }
}

export default {
  generateICSContent,
  downloadICSFile,
  generateMergedICSContent,
  downloadMergedICSFile,
  generateGoogleCalendarUrl,
  generateOutlookUrl,
  generateAppleCalendarUrl,
  getAvailableCalendarOptions,
  isValidEvent,
};
