// --- BVP Over Time by Student ---
d3.csv("BVP_with_grades.csv").then(data => {
    data.forEach(d => {
        d.timestamp = +d.timestamp;
        d.value = +d.value;
        d.grade = +d.grade;
    });

    const margin = { top: 30, right: 60, bottom: 50, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#bvp-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);
    const yAxis = svg.append("g");

    const tooltip = d3.select("body").append("div").attr("class", "tooltip");

    const students = [...new Set(data.map(d => d.student))];
    const studentSelect = d3.select("#student-select");
    studentSelect.selectAll("option")
        .data(students)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    const examSelect = d3.select("#exam-select");

    function updateChart() {
        const selectedStudent = studentSelect.property("value");
        const selectedExam = examSelect.property("value");
        const filtered = data.filter(d => d.student === selectedStudent && d.exam === selectedExam);

        if (filtered.length === 0) return;

        x.domain(d3.extent(filtered, d => d.timestamp));
        y.domain(d3.extent(filtered, d => d.value));

        xAxis.transition().call(d3.axisBottom(x));
        yAxis.transition().call(d3.axisLeft(y));

        svg.selectAll(".line").remove();

        const color = filtered[0].grade >= 85 ? "green" : (filtered[0].grade < 70 ? "red" : "orange");

        svg.append("path")
            .datum(filtered)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(d => x(d.timestamp))
                .y(d => y(d.value)));

        svg.selectAll(".dot").remove();

        svg.selectAll(".dot")
            .data(filtered)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("r", 3)
            .attr("cx", d => x(d.timestamp))
            .attr("cy", d => y(d.value))
            .attr("fill", color)
            .on("mouseover", (event, d) => {
                tooltip
                    .style("opacity", 1)
                    .html(`Time: ${d.timestamp.toFixed(2)}s<br>BVP: ${d.value.toFixed(3)}<br>Grade: ${d.grade}`)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 28}px`);
            })
            .on("mouseout", () => tooltip.style("opacity", 0));
    }

    studentSelect.on("change", updateChart);
    examSelect.on("change", updateChart);

    // Init
    studentSelect.property("value", students[0]);
    examSelect.property("value", "midterm_1");
    updateChart();
});