// Global data storage
let hrData = [];
let scoresData = [];
let mlData = [];
let clusteringResults = null;

// Student story data
const studentStories = {
  S03: {
    title: "The Comeback Story",
    subtitle: "From struggle to excellence through stress management",
    description:
      "Student S03 shows us that initial struggles don't define final outcomes. Starting with a challenging first midterm, they developed better stress management techniques that led to remarkable improvement.",
    timeline: [
      {
        exam: "Midterm 1",
        score: 77,
        stress: "High",
        description: "High stress levels impacted initial performance",
      },
      {
        exam: "Midterm 2",
        score: 90,
        stress: "Moderate",
        description: "Learned to manage stress better, significant improvement",
      },
      {
        exam: "Final",
        score: 94,
        stress: "Low",
        description: "Optimal stress level achieved, excellent performance",
      },
    ],
    analysis:
      "This student's journey demonstrates the importance of stress management. As their stress levels decreased from exam to exam, their performance dramatically improved. The final exam shows nearly optimal stress levels correlating with their best performance.",
    insights: [
      "Stress decreased progressively: High → Moderate → Low",
      "Performance improved steadily: 77% → 90% → 94%",
      "Final exam showed optimal stress-performance balance",
    ],
  },
  S01: {
    title: "The Steady Climber",
    subtitle: "Consistent improvement through methodical preparation",
    description:
      "Student S01 exemplifies steady, consistent improvement. Their approach shows how methodical preparation and consistent stress levels can lead to gradual but reliable academic growth.",
    timeline: [
      {
        exam: "Midterm 1",
        score: 78,
        stress: "Moderate",
        description: "Solid baseline performance with manageable stress",
      },
      {
        exam: "Midterm 2",
        score: 82,
        stress: "Moderate",
        description: "Steady improvement with consistent stress management",
      },
      {
        exam: "Final",
        score: 91,
        stress: "Low",
        description: "Excellent final performance with reduced stress",
      },
    ],
    analysis:
      "This student shows the power of consistency. Rather than dramatic swings, they maintained steady stress levels while gradually improving their performance through each exam cycle.",
    insights: [
      "Maintained consistent moderate stress levels",
      "Showed steady improvement: 78% → 82% → 91%",
      "Demonstrates the value of consistent preparation",
    ],
  },
  S07: {
    title: "The Struggle Story",
    subtitle: "When stress becomes overwhelming",
    description:
      "Student S07's journey illustrates how escalating stress can impact academic performance. This story highlights the importance of recognizing when stress becomes counterproductive.",
    timeline: [
      {
        exam: "Midterm 1",
        score: 64,
        stress: "Moderate",
        description:
          "Started with manageable stress but below-average performance",
      },
      {
        exam: "Midterm 2",
        score: 33,
        stress: "Very High",
        description:
          "Stress levels spiked dramatically, performance declined severely",
      },
      {
        exam: "Final",
        score: 55,
        stress: "High",
        description: "Partial recovery but stress remained elevated",
      },
    ],
    analysis:
      "This case study shows how unmanaged stress can create a negative feedback loop. The dramatic spike in stress during Midterm 2 corresponded with the worst performance, and while there was some recovery for the final, elevated stress levels persisted.",
    insights: [
      "Stress escalated from Moderate → Very High → High",
      "Performance declined then partially recovered: 64% → 33% → 55%",
      "Shows the negative impact of unmanaged stress",
    ],
  },
};

// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation
  const navBtns = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSection = btn.dataset.section;

      // Update nav buttons
      navBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update sections
      sections.forEach((s) => s.classList.remove("active"));
      document.getElementById(targetSection).classList.add("active");
    });
  });

  // Student card clicks
  document.querySelectorAll(".student-card").forEach((card) => {
    card.addEventListener("click", () => {
      const studentId = card.dataset.student;
      // Switch to stories section
      document.querySelector('[data-section="stories"]').click();
      // Load the specific student story
      setTimeout(() => loadStudentStory(studentId), 100);
    });
  });

  // Story selector buttons
  document.querySelectorAll(".story-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const storyId = btn.dataset.story;
      document
        .querySelectorAll(".story-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      loadStudentStory(storyId);
    });
  });

  // Load initial story
  loadStudentStory("S03");

  // Load visualization data
  loadVisualizationData();

  // Initialize ML functionality
  initializeMLAnalysis();
});

function loadStudentStory(studentId) {
  const story = studentStories[studentId];
  if (!story) return;

  const storyContent = document.getElementById("story-content");
  storyContent.innerHTML = `
        <div class="story-header">
            <h3 class="story-title">${story.title}</h3>
            <p class="story-subtitle">${story.subtitle}</p>
            <p>${story.description}</p>
        </div>

        <div class="story-timeline">
            ${story.timeline
              .map(
                (item, index) => `
                <div class="timeline-item ${index === story.timeline.length - 1 ? "highlight" : ""}">
                    <div class="exam-name">${item.exam}</div>
                    <div class="exam-score">${item.score}%</div>
                    <div class="stress-level">Stress: ${item.stress}</div>
                    <p style="margin-top: 10px; font-size: 14px; color: #666;">${item.description}</p>
                </div>
            `,
              )
              .join("")}
        </div>

        <div class="story-analysis">
            <h4 style="margin-bottom: 15px; color: #333;">Analysis</h4>
            <p style="margin-bottom: 15px;">${story.analysis}</p>
            <h5 style="margin-bottom: 10px; color: #333;">Key Insights:</h5>
            <ul>
                ${story.insights.map((insight) => `<li>${insight}</li>`).join("")}
            </ul>
        </div>
    `;

  // Load student-specific visualizations
  loadStudentVisualizations(studentId);
}

function loadStudentVisualizations(studentId) {
  // Clear previous visualizations
  document.getElementById("student-timeline").innerHTML = "";
  document.getElementById("student-stress-chart").innerHTML = "";

  // Create student-specific timeline chart
  createStudentTimeline(studentId);
  createStudentStressChart(studentId);
}

function createStudentTimeline(studentId) {
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const svg = d3
    .select("#student-timeline")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Add title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -5)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "600")
    .text(`${studentId} - Score Progression Over Time`);

  const story = studentStories[studentId];
  if (!story) return;

  const data = story.timeline.map((item, i) => ({
    exam: item.exam,
    score: item.score,
    x: i,
  }));

  const x = d3
    .scalePoint()
    .domain(data.map((d) => d.exam))
    .range([0, width])
    .padding(0.2);

  const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

  // Add axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  // Add line
  const line = d3
    .line()
    .x((d) => x(d.exam))
    .y((d) => y(d.score))
    .curve(d3.curveMonotoneX);

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#3c6ca4")
    .attr("stroke-width", 3)
    .attr("d", line);

  // Add points
  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => x(d.exam))
    .attr("cy", (d) => y(d.score))
    .attr("r", 6)
    .attr("fill", "#3c6ca4");

  // Add score labels
  svg
    .selectAll(".score-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "score-label")
    .attr("x", (d) => x(d.exam))
    .attr("y", (d) => y(d.score) - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "600")
    .style("fill", "#3c6ca4")
    .text((d) => `${d.score}%`);
}

function createStudentStressChart(studentId) {
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const svg = d3
    .select("#student-stress-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Add title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -5)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "600")
    .text(`${studentId} - Stress Level Progression`);

  const story = studentStories[studentId];
  if (!story) return;

  const stressLevels = {
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  const data = story.timeline.map((item, i) => ({
    exam: item.exam,
    stress: stressLevels[item.stress],
    stressLabel: item.stress,
    x: i,
  }));

  const x = d3
    .scalePoint()
    .domain(data.map((d) => d.exam))
    .range([0, width])
    .padding(0.2);

  const y = d3.scaleLinear().domain([0, 5]).range([height, 0]);

  // Add axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(
    d3.axisLeft(y).tickFormat((d) => {
      const labels = ["", "Low", "Moderate", "High", "Very High"];
      return labels[d] || "";
    }),
  );

  // Color scale for stress levels
  const colorScale = d3
    .scaleOrdinal()
    .domain([1, 2, 3, 4])
    .range(["#4CAF50", "#FF9800", "#FF5722", "#D32F2F"]);

  // Add bars
  svg
    .selectAll(".stress-bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "stress-bar")
    .attr("x", (d) => x(d.exam) - 20)
    .attr("y", (d) => y(d.stress))
    .attr("width", 40)
    .attr("height", (d) => height - y(d.stress))
    .attr("fill", (d) => colorScale(d.stress))
    .attr("opacity", 0.8);

  // Add stress level labels
  svg
    .selectAll(".stress-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "stress-label")
    .attr("x", (d) => x(d.exam))
    .attr("y", (d) => y(d.stress) - 5)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-weight", "600")
    .style("fill", "#333")
    .text((d) => d.stressLabel);
}

function loadVisualizationData() {
  // Load heart rate data
  d3.csv("hr_summary_by_minute.csv").then((data) => {
    hrData = data;
    data.forEach((d) => {
      d.minute = +d.minute;
      d.mean = +d.mean;
      d.min = +d.min;
      d.max = +d.max;
    });

    hrData = data.filter((d) => d.minute > 0.0);
    initializeHRChart();
  });

  // Load scores data
  d3.csv("merged_signal_grades.csv").then((data) => {
    scoresData = data;
    data.forEach((d) => {
      d.avg_value = +d.avg_value;
      d.exam_score = +d.exam_score;
    });
    initializeScoreChart();
  });
}

function initializeHRChart() {
  const margin = { top: 30, right: 60, bottom: 50, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#hr-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, 180]).range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = d3
    .axisBottom(x)
    .ticks(10)
    .tickFormat((d) => `${d} min`);
  const yAxis = d3.axisLeft(y);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  svg.append("g").attr("class", "y-axis");

  const tooltip = d3.select(".tooltip");

  const line = d3
    .line()
    .x((d) => x(d.minute))
    .y((d) => y(d.mean));

  const area = d3
    .area()
    .x((d) => x(d.minute))
    .y0((d) => y(d.min))
    .y1((d) => y(d.max));

  const students = [...new Set(hrData.map((d) => d.student))];
  const exams = [...new Set(hrData.map((d) => d.exam))];

  // Student dropdown
  const studentDropdown = d3
    .select("#hr-measure")
    .html("")
    .selectAll("option")
    .data(students)
    .enter()
    .append("option")
    .text((d) => d)
    .attr("value", (d) => d);

  // Exam dropdown
  const examDropdown = d3
    .select("#hr-chart")
    .insert("div", ":first-child")
    .attr("class", "controls")
    .html(
      '<label for="exam-select">Exam:</label><select id="exam-select"></select>',
    );

  d3.select("#exam-select")
    .selectAll("option")
    .data(exams)
    .enter()
    .append("option")
    .text((d) => d)
    .attr("value", (d) => d);

  function updateHRChart(selectedStudent, selectedExam) {
    const filtered = hrData.filter(
      (d) => d.student === selectedStudent && d.exam === selectedExam,
    );

    if (selectedExam.includes("Final")) {
      x.domain([0.1, 180]);
    } else {
      x.domain([0.1, 90]);
    }

    svg.select(".x-axis").transition().duration(500).call(xAxis);

    y.domain([40, 200]);
    svg.select(".y-axis").transition().duration(500).call(yAxis);

    svg.selectAll(".line-path, .area-path, .hover-rect, .focus-dot").remove();

    // X axis label
    svg.select(".x-label").remove();
    svg
      .append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Exam Time (minutes)");

    // Y axis label
    svg.select(".y-label").remove();
    svg
      .append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .text("Heart Rate (BPM)");

    svg
      .append("path")
      .datum(filtered)
      .attr("class", "area-path")
      .attr("fill", "steelblue")
      .attr("opacity", 0.2)
      .attr("d", area);

    svg
      .append("path")
      .datum(filtered)
      .attr("class", "line-path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    const focus = svg
      .append("circle")
      .attr("class", "focus-dot")
      .attr("r", 4)
      .attr("fill", "steelblue")
      .style("opacity", 0);

    svg
      .append("rect")
      .attr("class", "hover-rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mousemove", (event) => {
        const [mx] = d3.pointer(event);
        const time = x.invert(mx);
        const bisect = d3.bisector((d) => d.minute).left;
        const idx = bisect(filtered, time);
        const d = filtered[Math.min(idx, filtered.length - 1)];

        if (d) {
          focus
            .attr("cx", x(d.minute))
            .attr("cy", y(d.mean))
            .style("opacity", 1);

          tooltip
            .style("opacity", 1)
            .html(
              `Minute: ${d.minute.toFixed(1)}<br>HR: ${d.mean.toFixed(1)} bpm`,
            )
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
        }
      })
      .on("mouseout", () => {
        focus.style("opacity", 0);
        tooltip.style("opacity", 0);
      });
  }

  d3.select("#hr-measure").on("change", function () {
    const selectedStudent = this.value;
    const selectedExam = d3.select("#exam-select").property("value");
    updateHRChart(selectedStudent, selectedExam);
  });

  d3.select("#exam-select").on("change", function () {
    const selectedStudent = d3.select("#hr-measure").property("value");
    const selectedExam = this.value;
    updateHRChart(selectedStudent, selectedExam);
  });

  // Initial call
  updateHRChart(students[0], exams[0]);
}

function initializeScoreChart() {
  const margin = { top: 30, right: 60, bottom: 50, left: 80 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#score-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`);

  svg.append("g").attr("class", "y-axis");

  const tooltip = d3.select("body").select(".tooltip");
  if (tooltip.empty()) {
    d3.select("body").append("div").attr("class", "tooltip");
  }

  const color = d3
    .scaleOrdinal()
    .domain(["Midterm 1", "Midterm 2", "Final"])
    .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

  const signals = [...new Set(scoresData.map((d) => d.signal))];
  const exams = [...new Set(scoresData.map((d) => d.exam))];

  // Dropdown for signal
  const signalDropdown = d3
    .select("#score-chart")
    .insert("div", ":first-child")
    .attr("class", "controls")
    .html('<label for="signal-dropdown">Signal:</label>')
    .append("select")
    .attr("id", "signal-dropdown");

  signalDropdown
    .selectAll("option")
    .data(signals)
    .enter()
    .append("option")
    .text((d) => d)
    .attr("value", (d) => d);

  // Checkbox group for exams
  const examControls = d3
    .select("#score-chart")
    .insert("div", ":first-child")
    .attr("class", "controls")
    .attr("id", "exam-checkboxes");

  exams.forEach((exam) => {
    const label = examControls.append("label");
    label
      .append("input")
      .attr("type", "checkbox")
      .attr("value", exam)
      .property("checked", true);
    label.append("span").text(` ${exam}`);
  });

  function updateScoreChart() {
    const selectedSignal = d3.select("#signal-dropdown").property("value");
    const selectedExams = Array.from(
      document.querySelectorAll("#exam-checkboxes input:checked"),
    ).map((d) => d.value);

    const filtered = scoresData.filter(
      (d) => d.signal === selectedSignal && selectedExams.includes(d.exam),
    );

    y.domain([0, 100]);
    x.domain(d3.extent(filtered, (d) => d.avg_value)).nice();

    svg.select(".x-axis").transition().duration(500).call(xAxis);

    svg.select(".y-axis").transition().duration(500).call(yAxis);

    // Remove old labels and add new ones
    svg.select(".x-axis-label").remove();
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .style("text-anchor", "middle")
      .text("Average Signal Level");

    svg.select(".y-axis-label").remove();
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -50)
      .style("text-anchor", "middle")
      .text("Exam Score");

    const circles = svg
      .selectAll(".point")
      .data(filtered, (d) => d.student + d.signal + d.exam);

    circles.exit().remove();

    const newCircles = circles
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("r", 0)
      .attr("opacity", 0.8)
      .on("mouseover", function (event, d) {
        d3.select("body")
          .select(".tooltip")
          .style("opacity", 1)
          .html(
            `Student: ${d.student}<br>Exam: ${d.exam}<br>Score: ${d.exam_score}<br>Signal Value: ${d.avg_value.toFixed(2)}`,
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () =>
        d3.select("body").select(".tooltip").style("opacity", 0),
      );

    newCircles
      .merge(circles)
      .transition()
      .duration(500)
      .attr("cx", (d) => x(d.avg_value))
      .attr("cy", (d) => y(d.exam_score))
      .attr("r", 6)
      .attr("fill", (d) => color(d.exam));
  }

  d3.select("#signal-dropdown").on("change", updateScoreChart);
  d3.selectAll("#exam-checkboxes input").on("change", updateScoreChart);

  updateScoreChart();
}

// ML Analysis Functions
function initializeMLAnalysis() {
  // Set up ML controls
  document
    .getElementById("run-clustering")
    .addEventListener("click", runClusteringAnalysis);
  document
    .getElementById("cluster-count")
    .addEventListener("change", runClusteringAnalysis);

  // Initialize quiz
  initializeStressQuiz();

  // Load initial clustering
  setTimeout(() => {
    if (hrData.length > 0) {
      runClusteringAnalysis();
    }
  }, 1000);
}

function runClusteringAnalysis() {
  const clusterCount = parseInt(document.getElementById("cluster-count").value);

  // Prepare data for clustering
  const features = prepareMLFeatures();

  // Run K-means clustering
  clusteringResults = performKMeansClustering(features, clusterCount);

  // Display results
  displayClusteringResults(clusteringResults);

  // Update insights
  updateMLInsights(clusteringResults);
}

function prepareMLFeatures() {
  // Extract features from heart rate data for each student
  const studentFeatures = {};

  hrData.forEach((d) => {
    if (!studentFeatures[d.student]) {
      studentFeatures[d.student] = {
        student: d.student,
        exams: {},
      };
    }

    if (!studentFeatures[d.student].exams[d.exam]) {
      studentFeatures[d.student].exams[d.exam] = [];
    }

    studentFeatures[d.student].exams[d.exam].push({
      minute: d.minute,
      hr: d.mean,
    });
  });

  // Calculate features for each student
  const features = [];
  Object.keys(studentFeatures).forEach((studentId) => {
    const studentData = studentFeatures[studentId];
    Object.keys(studentData.exams).forEach((exam) => {
      const examData = studentData.exams[exam];
      if (examData.length > 10) {
        // Ensure enough data points
        const feature = calculateStressFeatures(examData, studentId, exam);
        features.push(feature);
      }
    });
  });

  return features;
}

function calculateStressFeatures(examData, studentId, exam) {
  // Sort by minute
  examData.sort((a, b) => a.minute - b.minute);

  const hrValues = examData.map((d) => d.hr);
  const minutes = examData.map((d) => d.minute);

  // Calculate various stress pattern features
  const meanHR = hrValues.reduce((a, b) => a + b, 0) / hrValues.length;
  const maxHR = Math.max(...hrValues);
  const minHR = Math.min(...hrValues);
  const hrRange = maxHR - minHR;

  // Find peak timing (when max HR occurs)
  const maxHRIndex = hrValues.indexOf(maxHR);
  const peakTiming = minutes[maxHRIndex];
  const examDuration = Math.max(...minutes);
  const normalizedPeakTiming = peakTiming / examDuration;

  // Calculate stress build-up rate (early vs late stress)
  const firstQuarter = examData.slice(0, Math.floor(examData.length / 4));
  const lastQuarter = examData.slice(-Math.floor(examData.length / 4));
  const earlyStress =
    firstQuarter.reduce((a, b) => a + b.hr, 0) / firstQuarter.length;
  const lateStress =
    lastQuarter.reduce((a, b) => a + b.hr, 0) / lastQuarter.length;
  const stressBuildUp = lateStress - earlyStress;

  // Calculate variability (standard deviation)
  const variance =
    hrValues.reduce((acc, val) => acc + Math.pow(val - meanHR, 2), 0) /
    hrValues.length;
  const stdDev = Math.sqrt(variance);

  // Calculate trend (overall increase/decrease)
  const firstHalf = examData.slice(0, Math.floor(examData.length / 2));
  const secondHalf = examData.slice(Math.floor(examData.length / 2));
  const firstHalfMean =
    firstHalf.reduce((a, b) => a + b.hr, 0) / firstHalf.length;
  const secondHalfMean =
    secondHalf.reduce((a, b) => a + b.hr, 0) / secondHalf.length;
  const overallTrend = secondHalfMean - firstHalfMean;

  return {
    student: studentId,
    exam: exam,
    meanHR: meanHR,
    maxHR: maxHR,
    hrRange: hrRange,
    normalizedPeakTiming: normalizedPeakTiming,
    stressBuildUp: stressBuildUp,
    variability: stdDev,
    overallTrend: overallTrend,
    rawData: examData,
  };
}

function performKMeansClustering(features, k) {
  // Extract feature vectors for clustering
  const featureVectors = features.map((f) => [
    f.normalizedPeakTiming,
    f.stressBuildUp / 100, // Normalize
    f.variability / 100, // Normalize
    f.overallTrend / 100, // Normalize
  ]);

  // Simple K-means implementation
  const clusters = kMeans(featureVectors, k);

  // Assign cluster labels to original features
  features.forEach((feature, index) => {
    feature.cluster = clusters.assignments[index];
  });

  // Analyze clusters to create archetypes
  const archetypes = analyzeClusterArchetypes(features, clusters);

  return {
    features: features,
    clusters: clusters,
    archetypes: archetypes,
  };
}

function kMeans(data, k, maxIterations = 100) {
  const n = data.length;
  const dimensions = data[0].length;

  // Initialize centroids randomly
  let centroids = [];
  for (let i = 0; i < k; i++) {
    centroids.push(data[Math.floor(Math.random() * n)].slice());
  }

  let assignments = new Array(n);
  let converged = false;
  let iterations = 0;

  while (!converged && iterations < maxIterations) {
    // Assign points to nearest centroid
    for (let i = 0; i < n; i++) {
      let minDistance = Infinity;
      let closestCentroid = 0;

      for (let j = 0; j < k; j++) {
        const distance = euclideanDistance(data[i], centroids[j]);
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroid = j;
        }
      }
      assignments[i] = closestCentroid;
    }

    // Update centroids
    const newCentroids = [];
    for (let i = 0; i < k; i++) {
      const clusterPoints = data.filter((_, index) => assignments[index] === i);
      if (clusterPoints.length > 0) {
        const centroid = new Array(dimensions).fill(0);
        clusterPoints.forEach((point) => {
          point.forEach((value, dim) => {
            centroid[dim] += value;
          });
        });
        centroid.forEach((_, dim) => {
          centroid[dim] /= clusterPoints.length;
        });
        newCentroids.push(centroid);
      } else {
        newCentroids.push(centroids[i]);
      }
    }

    // Check for convergence
    converged = true;
    for (let i = 0; i < k; i++) {
      if (euclideanDistance(centroids[i], newCentroids[i]) > 0.001) {
        converged = false;
        break;
      }
    }

    centroids = newCentroids;
    iterations++;
  }

  return {
    centroids: centroids,
    assignments: assignments,
    iterations: iterations,
  };
}

function euclideanDistance(a, b) {
  return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
}

function analyzeClusterArchetypes(features, clusters) {
  const archetypes = [];
  const k = clusters.centroids.length;
  const usedNames = new Set(); // Track used archetype names

  for (let i = 0; i < k; i++) {
    const clusterFeatures = features.filter((f) => f.cluster === i);

    if (clusterFeatures.length === 0) continue;

    // Calculate cluster characteristics
    const avgPeakTiming =
      clusterFeatures.reduce((sum, f) => sum + f.normalizedPeakTiming, 0) /
      clusterFeatures.length;
    const avgStressBuildUp =
      clusterFeatures.reduce((sum, f) => sum + f.stressBuildUp, 0) /
      clusterFeatures.length;
    const avgVariability =
      clusterFeatures.reduce((sum, f) => sum + f.variability, 0) /
      clusterFeatures.length;
    const avgTrend =
      clusterFeatures.reduce((sum, f) => sum + f.overallTrend, 0) /
      clusterFeatures.length;

    // Determine archetype based on characteristics with unique naming
    let archetypeName, icon, description;

    // Use a scoring system to determine the best archetype
    const scores = {
      earlySpiker: avgPeakTiming < 0.3 && avgVariability < 15 ? 3 : 0,
      gradualBuilder: avgStressBuildUp > 5 && avgTrend > 5 ? 3 : 0,
      endRusher: avgPeakTiming > 0.65 ? 3 : 0,
      volatileResponder: avgVariability > 15 ? 2 : 0,
      steadyState: Math.abs(avgTrend) < 5 && avgVariability < 12 ? 2 : 0,
    };

    // Add secondary characteristics for more nuanced classification
    if (avgPeakTiming > 0.4 && avgPeakTiming < 0.65) scores.gradualBuilder += 1;
    if (avgVariability > 10 && avgVariability < 20)
      scores.volatileResponder += 1;
    if (avgStressBuildUp < -5) scores.earlySpiker += 1;

    // Find the highest scoring archetype
    const topArchetype = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b,
    );

    // Assign unique names based on top archetype and cluster characteristics
    if (topArchetype === "earlySpiker" && !usedNames.has("Early Spiker")) {
      archetypeName = "Early Spiker";
      icon = "🚀";
      description =
        "Stress peaks early in the exam then stabilizes. Often indicates initial anxiety that settles once the exam begins.";
    } else if (
      topArchetype === "gradualBuilder" &&
      !usedNames.has("Gradual Builder")
    ) {
      archetypeName = "Gradual Builder";
      icon = "📈";
      description =
        "Stress increases steadily throughout the exam. May indicate growing pressure from time constraints.";
    } else if (topArchetype === "endRusher" && !usedNames.has("End Rusher")) {
      archetypeName = "End Rusher";
      icon = "⏰";
      description =
        "Stress spikes dramatically near the end. Often related to time pressure and rushing to finish.";
    } else if (
      topArchetype === "volatileResponder" &&
      !usedNames.has("Volatile Responder")
    ) {
      archetypeName = "Volatile Responder";
      icon = "⚡";
      description =
        "High variability with frequent stress spikes. May indicate difficulty maintaining consistent focus.";
    } else if (
      topArchetype === "steadyState" &&
      !usedNames.has("Steady State")
    ) {
      archetypeName = "Steady State";
      icon = "📊";
      description =
        "Maintains relatively consistent stress levels throughout. Shows good stress management and focus.";
    } else {
      // Create unique variants for duplicate archetypes
      if (avgPeakTiming < 0.4) {
        archetypeName = usedNames.has("Early Spiker")
          ? "Quick Adapter"
          : "Early Spiker";
        icon = usedNames.has("Early Spiker") ? "🎯" : "🚀";
        description =
          archetypeName === "Quick Adapter"
            ? "Adapts quickly to exam conditions with minimal sustained stress."
            : "Stress peaks early in the exam then stabilizes. Often indicates initial anxiety that settles once the exam begins.";
      } else if (avgPeakTiming > 0.6) {
        archetypeName = usedNames.has("End Rusher")
          ? "Time Pressured"
          : "End Rusher";
        icon = usedNames.has("End Rusher") ? "⏳" : "⏰";
        description =
          archetypeName === "Time Pressured"
            ? "Experiences mounting pressure as exam time runs out."
            : "Stress spikes dramatically near the end. Often related to time pressure and rushing to finish.";
      } else if (avgVariability > 15) {
        archetypeName = usedNames.has("Volatile Responder")
          ? "Stress Fluctuator"
          : "Volatile Responder";
        icon = usedNames.has("Volatile Responder") ? "🌊" : "⚡";
        description =
          archetypeName === "Stress Fluctuator"
            ? "Shows irregular stress patterns with unpredictable fluctuations."
            : "High variability with frequent stress spikes. May indicate difficulty maintaining consistent focus.";
      } else {
        archetypeName = usedNames.has("Steady State")
          ? "Consistent Performer"
          : "Steady State";
        icon = usedNames.has("Steady State") ? "⚖️" : "📊";
        description =
          archetypeName === "Consistent Performer"
            ? "Maintains balanced and controlled stress responses throughout exams."
            : "Maintains relatively consistent stress levels throughout. Shows good stress management and focus.";
      }
    }

    usedNames.add(archetypeName);

    archetypes.push({
      id: i,
      name: archetypeName,
      icon: icon,
      description: description,
      students: clusterFeatures,
      characteristics: {
        avgPeakTiming: avgPeakTiming,
        avgStressBuildUp: avgStressBuildUp,
        avgVariability: avgVariability,
        avgTrend: avgTrend,
      },
    });
  }

  return archetypes;
}

function displayClusteringResults(results) {
  const archetypeCardsContainer = document.getElementById("archetype-cards");
  archetypeCardsContainer.innerHTML = "";

  results.archetypes.forEach((archetype) => {
    const card = document.createElement("div");
    card.className = "archetype-card";
    card.dataset.archetypeId = archetype.id;

    card.innerHTML = `
            <div class="archetype-icon">${archetype.icon}</div>
            <div class="archetype-title">${archetype.name}</div>
            <div class="archetype-description">${archetype.description}</div>
            <div class="archetype-count">${archetype.students.length} instances</div>
        `;

    card.addEventListener("click", () => {
      document
        .querySelectorAll(".archetype-card")
        .forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      showArchetypeDetail(archetype);
    });

    archetypeCardsContainer.appendChild(card);
  });

  // Create visualizations
  createPatternComparisonChart(results);
  createArchetypeDistributionChart(results);

  // Auto-select first archetype
  if (results.archetypes.length > 0) {
    setTimeout(() => {
      archetypeCardsContainer.firstChild.click();
    }, 500);
  }
}

function showArchetypeDetail(archetype) {
  const detailContainer = document.getElementById("archetype-detail");

  detailContainer.innerHTML = `
        <h3>${archetype.icon} ${archetype.name} - Detailed Analysis</h3>
        <p>${archetype.description}</p>

        <div class="archetype-stats">
            <div class="stat-grid">
                <div class="stat-item">
                    <div class="stat-value">${(archetype.characteristics.avgPeakTiming * 100).toFixed(0)}%</div>
                    <div class="stat-label">Average Peak Timing</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${archetype.characteristics.avgVariability.toFixed(1)}</div>
                    <div class="stat-label">Stress Variability</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${archetype.characteristics.avgStressBuildUp.toFixed(1)}</div>
                    <div class="stat-label">Stress Build-up</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${archetype.students.length}</div>
                    <div class="stat-label">Student Instances</div>
                </div>
            </div>
        </div>

        <div class="example-students">
            <h4>Example Students:</h4>
            <div class="student-list">
                ${archetype.students
                  .slice(0, 6)
                  .map(
                    (student) =>
                      `<span class="student-tag">${student.student} (${student.exam})</span>`,
                  )
                  .join("")}
                ${archetype.students.length > 6 ? `<span class="student-tag">+${archetype.students.length - 6} more</span>` : ""}
            </div>
        </div>

        <div id="archetype-pattern-chart"></div>
    `;

  detailContainer.classList.add("active");

  // Create detailed pattern chart for this archetype
  createArchetypePatternChart(archetype);
}

function createPatternComparisonChart(results) {
  const container = document.getElementById("pattern-comparison-chart");
  container.innerHTML = "";

  const margin = { top: 20, right: 30, bottom: 40, left: 140 }; // Increased left margin
  const width = 450 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Prepare data for the chart
  const data = results.archetypes.map((archetype) => ({
    name: archetype.name,
    peakTiming: archetype.characteristics.avgPeakTiming,
    displayName:
      archetype.name.length > 15
        ? archetype.name.substring(0, 12) + "..."
        : archetype.name,
  }));

  // Create scales
  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, height])
    .padding(0.2);

  const x = d3.scaleLinear().domain([0, 1]).range([0, width]);

  const color = d3
    .scaleOrdinal()
    .domain(results.archetypes.map((a) => a.name))
    .range(["#3c6ca4", "#5a88d1", "#8bb3e8", "#b8d4f2", "#e8f4fd"]);

  // Add axes with custom formatting
  const yAxis = svg.append("g").call(
    d3.axisLeft(y).tickFormat((d) => {
      // Custom formatting for long names
      const archetype = data.find((item) => item.name === d);
      return archetype ? archetype.displayName : d;
    }),
  );

  // Style y-axis text
  yAxis
    .selectAll("text")
    .style("font-size", "11px")
    .style("font-weight", "600")
    .style("fill", "#333");

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickFormat((d) => `${(d * 100).toFixed(0)}%`),
    );

  // Add bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", (d) => y(d.name))
    .attr("width", (d) => x(d.peakTiming))
    .attr("height", y.bandwidth())
    .attr("fill", (d) => color(d.name))
    .attr("opacity", 0.8)
    .attr("rx", 4); // Rounded corners

  // Add value labels on bars
  svg
    .selectAll(".bar-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr("x", (d) => x(d.peakTiming) + 5)
    .attr("y", (d) => y(d.name) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .style("font-size", "10px")
    .style("font-weight", "600")
    .style("fill", "#333")
    .text((d) => `${(d.peakTiming * 100).toFixed(0)}%`);

  // Add chart title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -5)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "600")
    .style("fill", "#333")
    .text("Average Peak Timing (% through exam)");
}

function createArchetypeDistributionChart(results) {
  const container = document.getElementById("archetype-distribution-chart");
  container.innerHTML = "";

  const width = 450;
  const height = 350;
  const radius = Math.min(width, height) / 2 - 60; // More margin for labels

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const pie = d3
    .pie()
    .value((d) => d.count)
    .sort(null);

  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  const labelArc = d3
    .arc()
    .innerRadius(radius + 15)
    .outerRadius(radius + 15);

  const color = d3
    .scaleOrdinal()
    .domain(results.archetypes.map((a) => a.name))
    .range(["#3c6ca4", "#5a88d1", "#8bb3e8", "#b8d4f2", "#e8f4fd"]);

  const data = results.archetypes.map((archetype) => ({
    name: archetype.name,
    count: archetype.students.length,
  }));

  const arcs = svg
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data.name))
    .attr("opacity", 0.9)
    .attr("stroke", "white")
    .attr("stroke-width", 2);

  // Add lines from pie slices to labels
  arcs
    .append("polyline")
    .attr("points", (d) => {
      const centroid = arc.centroid(d);
      const labelPos = labelArc.centroid(d);
      return [centroid, labelPos];
    })
    .style("fill", "none")
    .style("stroke", "#666")
    .style("stroke-width", 1);

  // Add labels outside the pie
  arcs
    .append("text")
    .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
    .attr("text-anchor", (d) => {
      const centroid = labelArc.centroid(d);
      return centroid[0] > 0 ? "start" : "end";
    })
    .style("font-size", "11px")
    .style("font-weight", "600")
    .style("fill", "#333")
    .text((d) => `${d.data.name} (${d.data.count})`);
}

function createArchetypePatternChart(archetype) {
  const container = document.getElementById("archetype-pattern-chart");
  container.innerHTML = "";

  const margin = { top: 20, right: 30, bottom: 40, left: 60 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Show average pattern for this archetype
  const exampleStudent = archetype.students[0];
  if (!exampleStudent || !exampleStudent.rawData) return;

  const data = exampleStudent.rawData;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.minute))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.hr))
    .range([height, 0]);

  const line = d3
    .line()
    .x((d) => x(d.minute))
    .y((d) => y(d.hr))
    .curve(d3.curveMonotoneX);

  // Add axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  // Add line
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#3c6ca4")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Add title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -5)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("font-weight", "600")
    .text(
      `Example Pattern: ${exampleStudent.student} - ${exampleStudent.exam}`,
    );
}

function updateMLInsights(results) {
  document.getElementById("ml-insight-patterns").textContent =
    results.archetypes.length;
}

// Stress Quiz Functions
function initializeStressQuiz() {
  let currentQuestion = 1;
  let answers = {};

  document.querySelectorAll(".quiz-option").forEach((option) => {
    option.addEventListener("click", function () {
      const question = this.closest(".quiz-question");
      const questionNum = question.dataset.question;

      // Clear previous selections
      question
        .querySelectorAll(".quiz-option")
        .forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");

      // Store answer
      answers[questionNum] = this.dataset.value;

      // Move to next question or show result
      setTimeout(() => {
        const nextQuestion = parseInt(questionNum) + 1;
        if (nextQuestion <= 3) {
          question.classList.remove("active");
          document
            .querySelector(`[data-question="${nextQuestion}"]`)
            .classList.add("active");
        } else {
          // Show result
          question.classList.remove("active");
          showQuizResult(answers);
        }
      }, 500);
    });
  });
}

function showQuizResult(answers) {
  const resultContainer = document.getElementById("quiz-result");

  // Simple algorithm to determine stress type based on answers
  let stressType = "Steady State";
  let icon = "📊";
  let description = "You likely maintain consistent stress levels.";

  if (answers["1"] === "early" && answers["2"] === "spike") {
    stressType = "Early Spiker";
    icon = "🚀";
    description =
      "You tend to experience high stress at the beginning of exams that then stabilizes.";
  } else if (answers["1"] === "late" && answers["2"] === "gradual") {
    stressType = "End Rusher";
    icon = "⏰";
    description =
      "You build up stress throughout the exam, especially under time pressure.";
  } else if (answers["2"] === "gradual" && answers["3"] === "slow") {
    stressType = "Gradual Builder";
    icon = "📈";
    description =
      "Your stress increases steadily and you take time to recover from stressful moments.";
  } else if (answers["2"] === "spike" && answers["3"] === "variable") {
    stressType = "Volatile Responder";
    icon = "⚡";
    description =
      "You experience frequent stress spikes with variable recovery patterns.";
  }

  resultContainer.innerHTML = `
        <div class="quiz-result-icon">${icon}</div>
        <h4>Your Stress Archetype: ${stressType}</h4>
        <p>${description}</p>
        <div style="margin-top: 20px;">
            <button onclick="resetQuiz()" class="ml-btn">Take Quiz Again</button>
        </div>
    `;

  resultContainer.classList.add("active");
}

function resetQuiz() {
  document.getElementById("quiz-result").classList.remove("active");
  document
    .querySelectorAll(".quiz-question")
    .forEach((q) => q.classList.remove("active"));
  document
    .querySelectorAll(".quiz-option")
    .forEach((opt) => opt.classList.remove("selected"));
  document.querySelector('[data-question="1"]').classList.add("active");
}
