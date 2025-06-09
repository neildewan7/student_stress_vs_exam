// --- Heart Rate Over Time ---
d3.csv("hr_summary_by_minute.csv").then(data => {
    data.forEach(d => {
        d.minute = +d.minute;
        d.mean = +d.mean;
        d.min = +d.min;
        d.max = +d.max;
    });

    const margin = { top: 30, right: 60, bottom: 50, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#hr-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 180]).range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x).ticks(10).tickFormat(d => `${d} min`);
    const yAxis = d3.axisLeft(y);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis");

    const tooltip = d3.select(".tooltip");

    const line = d3.line()
        .x(d => x(d.minute))
        .y(d => y(d.mean));

    const area = d3.area()
        .x(d => x(d.minute))
        .y0(d => y(d.min))
        .y1(d => y(d.max));

    const students = [...new Set(data.map(d => d.student))];
    const exams = [...new Set(data.map(d => d.exam))];

    // Student dropdown
    const studentDropdown = d3.select("#hr-measure")
        .html("")
        .selectAll("option")
        .data(students)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    // Exam dropdown
    const examDropdown = d3.select("#hr-chart")
        .insert("div", ":first-child")
        .attr("class", "controls")
        .html('<label for="exam-select">Exam:</label><select id="exam-select"></select>');

    d3.select("#exam-select")
        .selectAll("option")
        .data(exams)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    function update(selectedStudent, selectedExam) {
        const filtered = data.filter(d => d.student === selectedStudent && d.exam === selectedExam);
        const maxY = d3.max(filtered, d => d.max);
        const minY = d3.min(filtered, d => d.min);
        y.domain([Math.max(minY, 40), Math.min(maxY, 150)]);

        svg.select(".y-axis").transition().duration(500).call(yAxis);
        svg.selectAll(".line-path, .area-path, .hover-rect, .focus-dot").remove();

        svg.append("path")
            .datum(filtered)
            .attr("class", "area-path")
            .attr("fill", "steelblue")
            .attr("opacity", 0.2)
            .attr("d", area);

        svg.append("path")
            .datum(filtered)
            .attr("class", "line-path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5)
            .attr("d", line);

        svg.append("path")
            .datum(filtered)
            .attr("class", "line-path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5)
            .attr("d", line)
            .attr("stroke-dasharray", function() {
                const totalLength = this.getTotalLength();
                return `${totalLength} ${totalLength}`;
            })
            .attr("stroke-dashoffset", function() {
                return this.getTotalLength();
            })
            .transition()
            .duration(1000)
            .attr("stroke-dashoffset", 0);


        const focus = svg.append("circle")
            .attr("class", "focus-dot")
            .attr("r", 4)
            .attr("fill", "steelblue")
            .style("opacity", 0);

        svg.append("rect")
            .attr("class", "hover-rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("mousemove", event => {
                const [mx] = d3.pointer(event);
                const time = x.invert(mx);
                const bisect = d3.bisector(d => d.minute).left;
                const idx = bisect(filtered, time);
                const d = filtered[Math.min(idx, filtered.length - 1)];

                focus
                    .attr("cx", x(d.minute))
                    .attr("cy", y(d.mean))
                    .style("opacity", 1);

                tooltip
                    .style("opacity", 1)
                    .html(`Minute: ${d.minute.toFixed(1)}<br>HR: ${d.mean.toFixed(1)} bpm`)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 28}px`);
            })
            .on("mouseout", () => {
                focus.style("opacity", 0);
                tooltip.style("opacity", 0);
            });
    }

    d3.select("#hr-measure").on("change", function() {
        const selectedStudent = this.value;
        const selectedExam = d3.select("#exam-select").property("value");
        update(selectedStudent, selectedExam);
    });

    d3.select("#exam-select").on("change", function() {
        const selectedStudent = d3.select("#hr-measure").property("value");
        const selectedExam = this.value;
        update(selectedStudent, selectedExam);
    });

    // Initial call
    update(students[0], exams[0]);
});