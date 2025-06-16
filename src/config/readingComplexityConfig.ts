var common_configs = {
    contentLevel: [
      {
        level: 'L1',
        syllableCount: { $eq: 2 },
        language: 'ta',
        contentType: 'Word',
      },
      {
        level: 'L1',
        wordCount: { $gte: 2, $lte: 3 },
        language: 'ta',
        contentType: 'Sentence',
      },
      {
        level: 'L2',
        syllableCount: { $gte: 2, $lte: 3 },
        language: 'ta',
        contentType: 'Word',
      },
      {
        level: 'L2',
        wordCount: { $gte: 2, $lte: 3 },
        syllableCount: { $lte: 8 },
        syllableCountArray: {
          $not: {
            $elemMatch: {
              v: { $gte: 4 },
            },
          },
        },
        language: 'ta',
        contentType: 'Sentence',
      },
      {
        level: 'L3',
        syllableCount: { $gte: 4 },
        language: 'ta',
        contentType: 'Word',
      },
      {
        level: 'L3',
        wordCount: { $gt: 2, $lte: 5 },
        syllableCount: { $lte: 15 },
        language: 'ta',
        syllableCountArray: {
          $not: {
            $elemMatch: {
              v: { $gte: 5 },
            },
          },
        },
        contentType: 'Sentence',
      },
      {
        level: 'L3',
        wordCount: { $lte: 10 },
        language: 'ta',
        contentType: 'Paragraph',
      },
      {
        level: 'L4',
        wordCount: { $gt: 5, $lte: 7 },
        syllableCount: { $lte: 20 },
        language: 'ta',
        syllableCountArray: {
          $not: {
            $elemMatch: {
              v: { $gte: 7 },
            },
          },
        },
        contentType: 'Sentence',
      },
      {
        level: 'L4',
        wordCount: { $lte: 10 },
        language: 'ta',
        contentType: 'Paragraph',
      },
      {
        level: 'L5',
        wordCount: { $gte: 7, $lte: 10 },
        language: 'ta',
        contentType: 'Sentence',
      },
      {
        level: 'L5',
        wordCount: { $gt: 10, $lte: 15 },
        language: 'ta',
        contentType: 'Paragraph',
      },
      {
        level: 'L6',
        wordCount: { $gte: 7, $lte: 12 },
        language: 'ta',
        contentType: 'Sentence',
      },
      {
        level: 'L6',
        wordCount: { $gt: 15 },
        language: 'ta',
        contentType: 'Paragraph',
      },
    ],
    complexity: [
      {
        level: 'C0',
        readingComplexity : {$lt:1},
        language: 'ta',
        contentType: 'Word',
      },
      {
        level: 'C1',
        readingComplexity : { $gte :1 ,$lte:8 },
        language: 'ta',
        contentType: 'Word',
      },
      {
        level: 'C1',
        readingComplexity : { $lte:12 },
        language: 'ta',
        contentType: 'Sentence',
      },
      {
        level: 'C2',
        readingComplexity : { $lt:15 },
        language: 'ta',
        contentType: 'Word',
      },
      {
        level: 'C2',
        language: 'ta',
        readingComplexity : { $lte:30 },
        contentType: 'Sentence',
      },
      {
        level: 'C3',
        readingComplexity : { $lte:20},
        language: 'ta',
        contentType: 'Word',
      },
      {
        level: 'C3',
        readingComplexity : { $lte:50},
        language: 'ta',
        contentType: 'Sentence',
      },
      {
        level: 'C4',
        readingComplexity : { $gt:20},
        language: 'ta',
        contentType: 'Word',
      },
      {
        level: 'C4',
        readingComplexity : { $gt:50},
        language: 'ta',
        contentType: 'Sentence',
      },
    ],
  };
  
  export default common_configs;
  