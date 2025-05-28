d3.csv("hr_summary_by_minute.csv").then(data => {
    // Convert numeric values
    data.forEach(d => {
        d.minute = +d.minute;
        d.mean = +d.mean;
        d.min = +d.min;
        d.max = +d.max;
    });

    const margin = { top: 30, right: 60, bottom: 50, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
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

    const colorScale = d3.scaleOrdinal().domain(["female", "male"]).range(["#e26ba9", "#69b3a2"]);

    function update(selectedGroup) {
        const filtered = data.filter(d => d.gender === selectedGroup);

        // Clamp y-axis to safe HR range
        const maxY = d3.max(filtered, d => d.max);
        const minY = d3.min(filtered, d => d.min);
        y.domain([Math.max(minY, 40), Math.min(maxY, 150)]);

        svg.select(".y-axis").transition().duration(500).call(yAxis);

        // Clear old paths and interactions
        svg.selectAll(".line-path").remove();
        svg.selectAll(".area-path").remove();
        svg.selectAll(".hover-rect").remove();
        svg.selectAll(".focus-dot").remove();

        // Shaded range area
        svg.append("path")
            .datum(filtered)
            .attr("class", "area-path")
            .attr("fill", colorScale(selectedGroup))
            .attr("opacity", 0.2)
            .attr("d", area);

        // Line
        svg.append("path")
            .datum(filtered)
            .attr("class", "line-path")
            .attr("fill", "none")
            .attr("stroke", colorScale(selectedGroup))
            .attr("stroke-width", 2.5)
            .attr("d", line);

        // Hover dot
        const focus = svg.append("circle")
            .attr("class", "focus-dot")
            .attr("r", 4)
            .attr("fill", colorScale(selectedGroup))
            .style("opacity", 0);

        // Mouse overlay for tracking
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

    // Dropdown for gender
    const uniqueGroups = [...new Set(data.map(d => d.gender))];
    const dropdown = d3.select("#measure")
        .selectAll("option")
        .data(uniqueGroups)
        .join("option")
        .text(d => d.toUpperCase())
        .attr("value", d => d);

    update(uniqueGroups[0]);

    d3.select("#measure").on("change", function() {
        update(this.value);
    });
});