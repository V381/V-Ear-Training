const state = {
    currentNote: null, 
    currentSlide: 0,
    currentScale: null,
    lastPlayedNotes: null,
    isPlaying: false,
    correctInterval: null,
    correctScore: 0,
    incorrectScore: 0,
    keyToNote: {
        'a': 'C',
        'w': 'Csharp',
        's': 'D',
        'e': 'Dsharp',
        'd': 'E',
        'f': 'F',
        't': 'Fsharp',
        'g': 'G',
        'y': 'Gsharp',
        'h': 'A',
        'u': 'Asharp',
        'j': 'B'
    },
    scales: {
        "C Major (Ionian)": ["C", "D", "E", "F", "G", "A", "B", "C"],
        "G Major": ["G", "A", "B", "C", "D", "E", "F#", "G"],
        "D Major": ["D", "E", "F#", "G", "A", "B", "C#", "D"],
        "A Minor (Aeolian)": ["A", "B", "C", "D", "E", "F", "G", "A"],
        "E Minor": ["E", "F#", "G", "A", "B", "C", "D", "E"],
        "B Minor": ["B", "C#", "D", "E", "F#", "G", "A", "B"],
        "Lydian": ["F", "G", "A", "B", "C", "D", "E", "F"],
        "Mixolydian": ["G", "A", "B", "C", "D", "E", "F", "G"],
        "Dorian": ["D", "E", "F", "G", "A", "B", "C", "D"],
        "Phrygian": ["E", "F", "G", "A", "B", "C", "D", "E"],
        "Locrian": ["B", "C", "D", "E", "F", "G", "A", "B"],
        "A Melodic Minor": ["A", "B", "C", "D", "E", "F#", "G#", "A"],
        "E Harmonic Minor": ["E", "F#", "G", "A", "B", "C", "D#", "E"]
    }
}
  