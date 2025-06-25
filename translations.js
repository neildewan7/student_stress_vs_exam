// Internationalization (i18n) Translation System
const translations = {
  en: {
    header: {
      title: "Stress Signals: How Physiology Reflects Academic Pressure",
      subtitle: "Explore how wearable data reveals student stress during exams",
      authors: "By Jessica Jiaxin, Neil Dewan, Alex Evans, Seiichi Nakahira",
    },
    nav: {
      overview: "Overview",
      stories: "Student Stories",
      explorer: "Data Explorer",
      patterns: "Pattern Discovery",
      insights: "Insights",
    },
    overview: {
      title: "Project Overview",
      description1:
        "In this project, we explore the relationship between academic stress and physiological responses by analyzing data from wearable sensors collected during midterm and final exams. Our goal is to uncover how cognitive pressure manifests in real time through measurable signals such as heart rate (HR) and electrodermal activity (EDA). This work helps illustrate the invisible toll of academic pressure and offers insight into how stress varies by individual and context.",
      description2:
        "Going into this, we expect there to be an optimum level of stress for exam performance. Obviously, if you're too stressed, you can't focus properly on the exam and you'll do worse, but we also expect that if you go in not stressed at all, your brain won't be able to focus as well and won't see the proper 'threat' of the exam to trigger the correct signals to your body. Because of this, we expect that there will be a level of stress inbetween that you can train your body to perform at, to increase your exam performance.",
      featured: "Featured Student Journeys",
    },
    stories: {
      title: "Student Journey Stories",
      intro:
        "Follow individual students through their semester journey. Each story reveals how stress patterns correlate with academic performance and personal resilience.",
      comeback: {
        title: "The Comeback Story",
        subtitle: "From struggle to excellence through stress management",
        summary: "Student S03 turned their semester around",
        description:
          "Student S03 shows us that initial struggles don't define final outcomes. Starting with a challenging first midterm, they developed better stress management techniques that led to remarkable improvement.",
        analysis:
          "This student's journey demonstrates the importance of stress management. As their stress levels decreased from exam to exam, their performance dramatically improved. The final exam shows nearly optimal stress levels correlating with their best performance.",
        insights: [
          "Stress decreased progressively: High → Moderate → Low",
          "Performance improved steadily: 77% → 90% → 94%",
          "Final exam showed optimal stress-performance balance",
        ],
      },
      steady: {
        title: "The Steady Climber",
        subtitle: "Consistent improvement through methodical preparation",
        summary: "Student S01 showed consistent improvement",
        description:
          "Student S01 exemplifies steady, consistent improvement. Their approach shows how methodical preparation and consistent stress levels can lead to gradual but reliable academic growth.",
        analysis:
          "This student shows the power of consistency. Rather than dramatic swings, they maintained steady stress levels while gradually improving their performance through each exam cycle.",
        insights: [
          "Maintained consistent moderate stress levels",
          "Showed steady improvement: 78% → 82% → 91%",
          "Demonstrates the value of consistent preparation",
        ],
      },
      struggle: {
        title: "The Struggle Story",
        subtitle: "When stress becomes overwhelming",
        summary: "Student S07 faced increasing challenges",
        description:
          "Student S07's journey illustrates how escalating stress can impact academic performance. This story highlights the importance of recognizing when stress becomes counterproductive.",
        analysis:
          "This case study shows how unmanaged stress can create a negative feedback loop. The dramatic spike in stress during Midterm 2 corresponded with the worst performance, and while there was some recovery for the final, elevated stress levels persisted.",
        insights: [
          "Stress escalated from Moderate → Very High → High",
          "Performance declined then partially recovered: 64% → 33% → 55%",
          "Shows the negative impact of unmanaged stress",
        ],
      },
      examLabels: {
        midterm1: "Midterm 1",
        midterm2: "Midterm 2",
        final: "Final",
      },
      stressLevels: {
        low: "Low",
        moderate: "Moderate",
        high: "High",
        veryHigh: "Very High",
      },
    },
    visualization: {
      title: "Interactive Data Explorer",
      intro:
        "Dive deep into the data with our interactive visualizations. Compare different students, exam types, and physiological signals.",
      hrChart: {
        title: "Heart Rate Over Time",
        description:
          "This line chart shows the average heart rate of students during exams. Users can filter by gender group to observe trends across male and female students. The time axis spans a 3-hour exam window, and hovering reveals minute-level HR details. Design choice: A line chart was chosen for its effectiveness in showing temporal trends, especially for identifying patterns such as pre-exam spikes or post-midpoint plateaus.",
        student: "Student:",
        exam: "Exam:",
        xAxisLabel: "Exam Time (minutes)",
        yAxisLabel: "Heart Rate (BPM)",
      },
      scoreChart: {
        title: "Signal Strength vs Exam Score",
        description:
          "This scatterplot correlates students' average physiological signal levels (e.g., EDA or HR) with their performance on exams. Users can switch between midterm and final data. Design choice: We used scatterplots to investigate possible trends between stress indicators and outcomes, encouraging exploration of whether heightened physiological response relates to higher or lower academic performance.",
        footnote:
          "Exam Scores are in percentage. Both midterms were out of 100, but the final was 200 points and is normalized",
        signal: "Signal:",
        xAxisLabel: "Average Signal Level",
        yAxisLabel: "Exam Score",
      },
    },
    patterns: {
      title: "Stress Pattern Discovery",
      intro:
        'Using machine learning to discover hidden patterns in how different students experience stress during exams. Our clustering algorithm identifies distinct "stress archetypes" based on physiological responses.',
      algorithmToggle: "How Does The Algorithm Work?",
      algorithmHide: "Hide Algorithm Explanation",
      results: {
        title: "Discovered Stress Archetypes",
        subtitle:
          "Click on any archetype to explore the students who exhibit this pattern:",
      },
      clusterCount: "Number of Stress Types:",
      analyzeBtn: "🔄 Analyze Patterns",
      insights: {
        title: "Key ML Insights",
        patterns: "Pattern Discovery",
        patternsDesc:
          "Machine learning revealed {count} distinct stress response patterns that weren't obvious from individual analysis.",
        temporal: "Temporal Features",
        temporalDesc:
          "The strongest differentiating factor is when during the exam stress peaks occur, not just the intensity.",
        clustering: "Student Clustering",
        clusteringDesc:
          "Students with similar stress patterns often show different performance outcomes, confirming stress doesn't predict grades.",
        personalization: "Personalization",
        personalizationDesc:
          "Understanding your stress archetype could help develop personalized stress management strategies.",
      },
      quiz: {
        title: "🎮 What's Your Stress Archetype?",
        intro:
          "Answer a few questions to discover which stress pattern you most likely exhibit:",
        question1: "When do you typically feel most stressed during an exam?",
        q1Options: {
          early: "Right at the beginning",
          middle: "Halfway through",
          late: "Near the end when time runs out",
          steady: "Consistently throughout",
        },
        question2: "How does your stress level change during the exam?",
        q2Options: {
          spike: "Sharp spikes and drops",
          gradual: "Gradual increase",
          plateau: "Quick rise then stable",
          decline: "Starts high then decreases",
        },
        question3:
          "How quickly do you recover after stressful moments during the exam?",
        q3Options: {
          fast: "Very quickly (within minutes)",
          moderate: "Moderately (takes some time)",
          slow: "Slowly (stays elevated)",
          variable: "It varies",
        },
        retakeBtn: "Take Quiz Again",
        result: "Your Stress Archetype",
      },
      archetypes: {
        earlySpiker: {
          name: "Early Spiker",
          description:
            "You tend to experience high stress at the beginning of exams that then stabilizes.",
        },
        endRusher: {
          name: "End Rusher",
          description:
            "You build up stress throughout the exam, especially under time pressure.",
        },
        gradualBuilder: {
          name: "Gradual Builder",
          description:
            "Your stress increases steadily and you take time to recover from stressful moments.",
        },
        volatileResponder: {
          name: "Volatile Responder",
          description:
            "You experience frequent stress spikes with variable recovery patterns.",
        },
        steadyState: {
          name: "Steady State",
          description: "You likely maintain consistent stress levels.",
        },
      },
    },
    insights: {
      title: "What We Learned",
      heartRate: {
        title: "Heart Rate Patterns",
        description:
          "Heart rate typically spikes near the end of exams, likely reflecting time pressure or final effort. Some students show consistent patterns across all exams.",
      },
      stressVariability: {
        title: "Stress Variability",
        description:
          "Female students demonstrated more variability in EDA during finals, suggesting different stress coping mechanisms between genders.",
      },
      individualDifferences: {
        title: "Individual Differences",
        description:
          "Physiological responses varied more by individual than by exam type, emphasizing personal stress thresholds and coping strategies.",
      },
      realityCheck: {
        title: "The Reality Check",
        description:
          "There's very little correlation between stress levels and exam results, meaning unfortunately there is no easy way to get ahead on your exams. You're stuck studying hard if you want to do well!",
      },
    },
    methods: {
      title: "Dataset & Methodology",
      description:
        "We used the publicly available Wearable Exam Stress Dataset from PhysioNet, which includes continuous recordings of heart rate (HR) and electrodermal activity (EDA) collected during real university exams.",
      steps: "Data processing steps included:",
      stepList: [
        "Resampling data for consistent time intervals",
        "Converting timestamps to relative exam time",
        "Grouping by student and exam type",
        "Calculating averages and ranges for visualization",
      ],
      tools:
        "All preprocessing was done in Python using Pandas and NumPy. The visualizations were developed with D3.js to support interactivity and dynamic exploration.",
    },
    limitations: {
      title: "Limitations & Considerations",
      list: [
        'The dataset lacks baseline readings outside of exams, making it difficult to compare to "normal" physiological states.',
        "Movement artifacts or environmental factors (e.g., room temperature) may influence signal accuracy.",
        "Sample size and demographic variety are limited, so generalizations should be made cautiously.",
      ],
    },
    team: {
      title: "About the Team",
      description:
        "We are a group of students passionate about data storytelling. This project was built collaboratively as part of our final visualization course assignment.",
    },
  },
  ja: {
    header: {
      title: "ストレス信号：生理学が学業プレッシャーを反映する方法",
      subtitle:
        "ウェアラブルデータが試験中の学生のストレスをどのように明らかにするかを探る",
      authors: "著者：Jessica Jiaxin、Neil Dewan、Alex Evans、Seiichi Nakahira",
    },
    nav: {
      overview: "概要",
      stories: "学生の物語",
      explorer: "データエクスプローラー",
      patterns: "パターン発見",
      insights: "洞察",
    },
    overview: {
      title: "プロジェクト概要",
      description1:
        "このプロジェクトでは、中間試験と期末試験中に収集されたウェアラブルセンサーのデータを分析することで、学業ストレスと生理的反応の関係を探ります。我々の目標は、心拍数（HR）や皮膚電気活動（EDA）などの測定可能な信号を通じて、認知的プレッシャーがリアルタイムでどのように現れるかを明らかにすることです。この研究は、学業プレッシャーの見えない負担を明らかにし、ストレスが個人や状況によってどのように変化するかについての洞察を提供します。",
      description2:
        "この研究に取り組む中で、試験パフォーマンスには最適なストレスレベルが存在すると予想しています。明らかに、ストレスが高すぎると、試験に適切に集中できず、パフォーマンスが低下します。しかし、全くストレスがない状態でも、脳が適切に集中できず、体に正しい信号を送るための試験の「脅威」を認識できないと考えています。そのため、体を訓練して最適なパフォーマンスを発揮できる中間的なストレスレベルが存在すると予想しています。",
      featured: "注目の学生の軌跡",
    },
    stories: {
      title: "学生の軌跡物語",
      intro:
        "個々の学���の学期を通じた軌跡を追跡します。各物語は、ストレスパターンが学業成績と個人の回復力とどのように相関するかを明らかにします。",
      comeback: {
        title: "カムバック物語",
        subtitle: "ストレス管理を通じた苦闘から優秀さへ",
        summary: "学生S03は学期を通じて状況を好転させた",
        description:
          "学生S03は、初期の苦闘が最終的な結果を決定するものではないことを示しています。困難な最初の中間試験から始まり、より良いストレス管理技術を開発し、それが著しい改善につながりました。",
        analysis:
          "この学生の軌跡は、ストレス管理の重要性を示しています。試験ごとにストレスレベルが低下するにつれて、パフォーマンスが劇的に向上しました。期末試験では、最高のパフォーマンスと相関するほぼ最適なストレスレベルを示しています。",
        insights: [
          "ストレスが段階的に減少：高→中→低",
          "パフォーマンスが着実に向上：77% → 90% → 94%",
          "期末試験で最適なストレス-パフォーマンスバランスを示した",
        ],
      },
      steady: {
        title: "着実な上昇者",
        subtitle: "体系的な準備による一貫した改善",
        summary: "学生S01は一貫した改善を示した",
        description:
          "学生S01は着実で一貫した改善の典型例です。彼らのアプローチは、体系的な準備と一貫したストレスレベルが段階的だが信頼できる学業成長につながることを示しています。",
        analysis:
          "この学生は一貫性の力を示しています。劇的な変動ではなく、各試験サイクルを通じてパフォーマンスを徐々に向上させながら、安定したストレスレベルを維持しました。",
        insights: [
          "一貫して中程度のストレスレベルを維持",
          "着実な改善を示した：78% → 82% → 91%",
          "一貫した準備の価値を実証",
        ],
      },
      struggle: {
        title: "苦闘物語",
        subtitle: "ストレスが圧倒的になるとき",
        summary: "学生S07は増大する課題に直面した",
        description:
          "学生S07の軌跡は、エスカレートするストレスが学業成績にどのような影響を与えるかを示しています。この物語は、ストレスがいつ逆効果になるかを認識することの重要性を強調しています。",
        analysis:
          "このケーススタディは、管理されていないストレスがどのように負のフィードバックループを作り出すかを示しています。中間試験2でのストレスの劇的な急上昇は最悪のパフォーマンスと対応し、期末試験では部分的な回復がありましたが、高いストレスレベルが持続しました。",
        insights: [
          "ストレスが中程度→非常に高い→高いとエスカレート",
          "パフォーマンスが低下し、その後部分的に回復：64% → 33% → 55%",
          "管理されていないストレスの負の影響を示す",
        ],
      },
      examLabels: {
        midterm1: "中間試験1",
        midterm2: "中間試験2",
        final: "期末試験",
      },
      stressLevels: {
        low: "低",
        moderate: "中程度",
        high: "高",
        veryHigh: "非常に高い",
      },
    },
    visualization: {
      title: "インタラクティブデータエクスプローラー",
      intro:
        "インタラクティブな可視化でデータを深く掘り下げます。異なる学生、試験タイプ、生理学的信号を比較できます。",
      hrChart: {
        title: "時間経過による心拍数",
        description:
          "この線グラフは、試験中の学生の平均心拍数を示しています。性別グループでフィルタリングして、男女学生の傾向を観察できます。時間軸は3時間の試験時間をカバーし、ホバーすると分レベルのHR詳細が表示されます。設計選択：線グラフは、試験前の急���昇や中間点後の平坦化などのパターンを特定するための時間的傾向を示すのに効果的であるため選択されました。",
        student: "学生：",
        exam: "試験：",
        xAxisLabel: "試験時間（分）",
        yAxisLabel: "心拍数（BPM）",
      },
      scoreChart: {
        title: "信号強度対試験スコア",
        description:
          "この散布図は、学生の平均生理学的信号レベル（EDAやHRなど）と試験での成績を相関させています。中間試験と期末試験のデータを切り替えることができます。設計選択：ストレス指標と結果の間の可能な傾向を調査するために散布図を使用し、生理学的反応の高まりがより高いまたはより低い学業成績に関連するかどうかの探索を促進しています。",
        footnote:
          "試験スコアはパーセンテージです。両方の中間試験は100点満点でしたが��期末試験は200点で正規化されています",
        signal: "信号：",
        xAxisLabel: "平均信号レベル",
        yAxisLabel: "試験スコア",
      },
    },
    patterns: {
      title: "ストレスパターン発見",
      intro:
        "機械学習を使用して、試験中に異なる学生がストレスを経験する隠れたパターンを発見します。我々のクラスタリングアルゴリズムは、生理学的反応に基づいて独特の「ストレスアーキタイプ」を識別します。",
      algorithmToggle: "アルゴリズムの仕組みは？",
      algorithmHide: "アルゴリズムの説明を隠す",
      results: {
        title: "発見されたストレスアーキタイプ",
        subtitle:
          "このパターンを示す学生を探索するには、任意のアーキタイプをクリックしてください：",
      },
      clusterCount: "ストレスタイプの数：",
      analyzeBtn: "🔄 パターンを分析",
      insights: {
        title: "主要ML洞察",
        patterns: "パターン発見",
        patternsDesc:
          "機械学習により、個別分析では明らかでなかった{count}の異なるストレス反応パターンが明らかになりました。",
        temporal: "時間的特徴",
        temporalDesc:
          "最も強力な識別要因は、ストレスのピークが試験中のいつ発生するかであり、強度だけではありません。",
        clustering: "学生クラスタリング",
        clusteringDesc:
          "類似のストレスパターンを持つ学生は、しばしば異なるパフォーマンス結果を示し、ストレスが成績を予測しないことを確認しています。",
        personalization: "パーソナライゼーション",
        personalizationDesc:
          "あなたのストレスアーキタイプを理解することで、個人に合わせたストレス管理戦略の開発に役立つ可能性があります。",
      },
      quiz: {
        title: "🎮 あなたのストレスアーキタイプは？",
        intro:
          "いくつかの質問に答えて、あなたが最も示し���すいストレスパターンを発見してください：",
        question1: "試験中、通常いつ最もストレスを感じますか？",
        q1Options: {
          early: "最初から",
          middle: "途中で",
          late: "時間がなくなる終盤近く",
          steady: "一貫して全体を通じて",
        },
        question2: "試験中、あなたのストレスレベルはどのように変化しますか？",
        q2Options: {
          spike: "急激な上昇と下降",
          gradual: "段階的な増加",
          plateau: "急速な上昇後安定",
          decline: "高いレベルで始まり減少",
        },
        question3:
          "試験中のストレスの多い瞬間の後、どのくらい早く回復しますか？",
        q3Options: {
          fast: "非常に早く（数分以内）",
          moderate: "中程度（時間がかかる）",
          slow: "ゆっくり（高いレベルのまま）",
          variable: "場合による",
        },
        retakeBtn: "クイズを再受験",
        result: "あな���のストレスアーキタイプ",
      },
      archetypes: {
        earlySpiker: {
          name: "早期スパイカー",
          description:
            "試験開始時に高いストレスを経験し、その後安定する傾向があります。",
        },
        endRusher: {
          name: "終盤ラッシャー",
          description:
            "試験を通じてストレスを蓄積し、特に時間的プレッシャーの下で。",
        },
        gradualBuilder: {
          name: "段階的ビルダー",
          description:
            "ストレスが着実に増加し、ストレスの多い瞬間から回復するのに時間がかかります。",
        },
        volatileResponder: {
          name: "不安定レスポンダー",
          description:
            "可変的な回復パターンで頻繁なストレススパイクを経験します。",
        },
        steadyState: {
          name: "安定状態",
          description: "一貫したストレスレベルを維持する可能性があります。",
        },
      },
    },
    insights: {
      title: "学んだこと",
      heartRate: {
        title: "心拍数パターン",
        description:
          "心拍数は通常、試験の終盤近くでスパイクし、これは時間的プレッシャーや最後の努力を反映している可能性があります。一部の学生は、すべての試験で一貫したパターンを示します。",
      },
      stressVariability: {
        title: "ストレス変動性",
        description:
          "女子学生は期末試験中にEDAでより多くの変動性を示し、性別間で異なるストレス対処メカニズムを示唆しています。",
      },
      individualDifferences: {
        title: "個人差",
        description:
          "生理学的反応は、試験タイプよりも個人によってより多く変動し、個人のストレス閾値と対処戦略を強調しています。",
      },
      realityCheck: {
        title: "現実チェック",
        description:
          "ストレスレベ��と試験結果の間にはほとんど相関がありません。つまり、残念ながら試験で先んじる簡単な方法はありません。良い成績を取りたければ、一生懸命勉強するしかありません！",
      },
    },
    methods: {
      title: "データセットと方法論",
      description:
        "我々は、実際の大学試験中に収集された心拍数（HR）と皮膚電気活動（EDA）の連続記録を含む、PhysioNetから公開されているウェアラブル試験ストレスデータセットを使用しました。",
      steps: "データ処理ステップには以下が含まれます：",
      stepList: [
        "一貫した時間間隔のためのデータリサンプリング",
        "タイムスタンプの相対試験時間への変換",
        "学生と試験タイプによるグループ化",
        "可視化のための平均と範囲の計算",
      ],
      tools:
        "すべての��処理はPandasとNumPyを使用してPythonで行われました。可視化はインタラクティブ性と動的探索をサポートするためにD3.jsで開発されました。",
    },
    limitations: {
      title: "制限と考慮事項",
      list: [
        "データセットには試験外のベースライン測定値がなく、「正常な」生理学的状態との比較が困難です。",
        "動作アーティファクトや環境要因（例：室温）が信号精度に影響を与える可能性があります。",
        "サンプルサイズと人口統計の多様性が限られているため、一般化は慎重に行う必要があります。",
      ],
    },
    team: {
      title: "チームについて",
      description:
        "我々はデータストーリーテリングに情熱を持つ学生のグループです。このプロジェクトは、最終的な可視化コース課題の一部として共同で構築されました。",
    },
  },
};

// Current language state
let currentLanguage = "en";

// Initialize language system
function initializeI18n() {
  // Check for saved language preference
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
  }

  // Set up language switcher buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const newLang = btn.getAttribute("data-lang");
      switchLanguage(newLang);
    });
  });

  // Apply initial language
  updateLanguageDisplay();
  translatePage();
}

// Switch language
function switchLanguage(newLang) {
  if (translations[newLang]) {
    currentLanguage = newLang;
    localStorage.setItem("preferredLanguage", newLang);
    updateLanguageDisplay();
    translatePage();

    // Update student stories in memory
    updateStudentStoriesLanguage();
  }
}

// Update language button display
function updateLanguageDisplay() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.getAttribute("data-lang") === currentLanguage,
    );
  });
}

// Translate the entire page
function translatePage() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const text = getTranslation(key);
    if (text) {
      element.textContent = text;
    }
  });
}

// Get translation by key
function getTranslation(key) {
  const keys = key.split(".");
  let current = translations[currentLanguage];

  for (const k of keys) {
    if (current && current[k]) {
      current = current[k];
    } else {
      // Fallback to English if translation not found
      current = translations.en;
      for (const fallbackKey of keys) {
        if (current && current[fallbackKey]) {
          current = current[fallbackKey];
        } else {
          return null;
        }
      }
      break;
    }
  }

  return typeof current === "string" ? current : null;
}

// Update student stories with current language
function updateStudentStoriesLanguage() {
  // This will be called to update the dynamic student story content
  // when language changes
  if (typeof loadStudentStory === "function") {
    // Re-load current story if one is selected
    const activeStoryBtn = document.querySelector(".story-btn.active");
    if (activeStoryBtn) {
      const storyId = activeStoryBtn.getAttribute("data-story");
      loadStudentStory(storyId);
    }
  }
}

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = { translations, getTranslation, currentLanguage };
}
