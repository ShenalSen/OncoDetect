import React from 'react';
import cancerImage from "../../public/cancerImage.png";


function DiagnosticResults() {
    return (
    
        <div className="diagnostic-results">
            <h1 className="topic-header">
                <span>Diagnostic Analysis Results</span>
            </h1>

            <div className="results-container">
                <div className="mammogram">
                    <h2>Annotated Mammogram</h2>
                    <img src={cancerImage} alt="Annotated Mammogram" />
                    <p>Heatmap Overlay: Red indicates areas of concern.</p>
                    <p>Bounding Boxes: Highlight detected features</p>
                </div>

                <div className="results-summary">
                    <h2>Results Summary</h2>
                    <ul>
                        <li>
                            <strong>Prediction Outcome:</strong>
                            <span className="highlight-link">Potential Abnormalities Found</span>
                        </li>
                        <li>
                            <strong>Confidence Score:</strong>
                            <span className="highlight">87% (High confidence in malignancy detection)</span>
                        </li>
                        <li>
                            <strong>Diagnostic Category:</strong>
                            <span className="malignant">Malignant</span>
                        </li>
                        <li>
                            <strong>Key Features Detected:</strong>
                            <ul>
                                <li>
                                    <span className="highlight-link">Microcalcifications detected in the upper-left quadrant.</span>
                                </li>
                                <li>
                                    <span className="highlight-link">Irregular mass with undefined borders observed.</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>


                <div className="statistical-visualization">
                    <h2>Statistical Visualization</h2>
                    <div className="stat-chart">
                        <div className="stat-circle">
                            <div className="circle-percentage">
                                <span>87%</span>
                            </div>
                        </div>
                        <div className="legend">
                            <div className="legend-item">
                                <span className="legend-color normals"></span> Normals
                            </div>
                            <div className="legend-item">
                                <span className="legend-color abnormalities"></span> Abnormalities
                            </div>
                            <div className="legend-item">
                                <span className="legend-color ambiguities"></span> Ambiguities
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="patient-info-container">
                <h2>Patient Information</h2>
                <div className="patient-details">
                    <p><strong>Patient ID:</strong> <span className="highlight">EM87520</span></p>
                    <p><strong>Patient Name:</strong> <span className="highlight">Jane Doe</span></p>
                    <p><strong>Date of Scan Upload:</strong> <span className="highlight">November 18, 2024</span></p>
                    <p><strong>Appointment ID:</strong> <span className="highlight">AP89435000</span></p>
                </div>
                <button className="view-predictions-btn">View Past Predictions</button>
            </div>


            <div className="additional-insights">
                <h2>Additional Insights</h2>
                <p>
                    <strong style={{ color: "red" }}>Comparison with Previous Records:</strong> <br />
                    <span style={{ color: "purple" }}>
                        Compared to the scan from January 2023, there is evidence of new calcifications in the upper-left quadrant.
                    </span>
                </p>
            </div>

            <div className="actions">
                <h2>Actions</h2>
                <p>
                    <strong>Doctor’s Recommendation :</strong> <a href="/recommendations">Go to recommendations →</a>
                </p>
                <button className="button-pdf">Download Report as PDF</button>
                <button className="button-confirm">Result Confirmation</button>
            </div>

        </div>
    );
}

export default DiagnosticResults;