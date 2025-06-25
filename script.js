// Global data storage
let hrData = [];
let scoresData = [];

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
