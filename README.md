# Stress & Academic Performance Analysis

An interactive web application visualizing the relationship between physiological stress (wearable sensor data) and exam performance, built for a Halıcıoğlu Data Science Institute data-storytelling competition (50+ teams).

**My role:** team project with Jessica He, Alexander Evans, and others. My contribution was the data preprocessing (pandas), the k-means clustering analysis, and the D3.js visualizations; teammates built other parts of the app and used Builder.io for some UI scaffolding.

## What it does

Lets a user explore how physiological stress signals (heart rate data from wearable sensors, in `Data/S1`–`S10`) relate to exam performance (`StudentGrades.txt`), surfacing that students fall into different "stress archetypes" rather than one uniform stress-performance relationship — the core data-storytelling angle of the competition entry.

## How it was built

Python (pandas) for preprocessing and merging the sensor + grades data (`merged_signal_grades.csv`, `hr_summary_by_minute.csv`), k-means clustering to identify stress archetypes, D3.js for the interactive visualizations in the web app.

## Run it locally

Open `index.html` in a browser. `process.ipynb` shows the data preprocessing and clustering steps.
