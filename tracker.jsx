import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Card } from "react-bootstrap";
import { FaWalking, FaFireAlt, FaClock, FaHeartbeat } from "react-icons/fa";

import sonicidle from "./assets/sonicidle.gif";
import sonicrun from "./assets/sonicrun.gif";
import sonicspeed from "./assets/sonicspeed.gif";

export default function StepTracker() {
  const [steps, setSteps] = useState("");
  const [stats, setStats] = useState({
    distance: 0,
    calories: 0,
    duration: 0,
    activityLevel: "Aucun",
    numSteps: 0,
  });
  const [error, setError] = useState("");

  // 🔁 Automatically calculate stats when input changes
  useEffect(() => {
    const numSteps = parseInt(steps);

    if (!steps) {
      setError("");
      setStats({
        distance: 0,
        calories: 0,
        duration: 0,
        activityLevel: "Aucun",
        numSteps: 0,
      });
      return;
    }

    if (isNaN(numSteps) || numSteps <= 0) {
      setError("⚠️ Please enter a valid number of steps!");
      return;
    }

    setError("");
    const distance = (numSteps * 0.78) / 1000; // km
    const calories = numSteps * 0.04; // kcal
    const duration = numSteps / 100; // minutes

    let activityLevel = "";
    if (numSteps < 1000) activityLevel = "💤 Idle";
    else if (numSteps < 5000) activityLevel = "🚶 Walking";
    else if (numSteps < 10000) activityLevel = "🏃 Running";
    else activityLevel = "⚡ Max Speed";

    setStats({
      distance: distance.toFixed(2),
      calories: calories.toFixed(1),
      duration: duration.toFixed(1),
      activityLevel,
      numSteps,
    });
  }, [steps]);

  const getProgressVariant = () => {
    const s = stats.numSteps;
    if (s < 1000) return "secondary";
    if (s < 5000) return "info";
    if (s < 10000) return "warning";
    return "success";
  };

  // 🌀 4 GIFs for activity levels
  const getActivityGif = () => {
    const s = stats.numSteps;
    if (s < 1000) return sonicidle; // idle
    if (s < 5000)
      return sonicrun; // walking
    if (s < 10000)
      return sonicspeed; // running
    return "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif"; // max speed
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 text-primary fw-bold">
        🏃‍♂️ StepTracker - Step Monitor
      </h3>

      <div className="d-flex justify-content-center mb-3">
        <input
          type="number"
          className="form-control w-50"
          placeholder="Enter number of steps..."
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </div>

      {error && (
        <div className="alert alert-danger text-center w-75 mx-auto">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="row text-center mt-4">
        <div className="col-md-3 mb-3">
          <Card className="border border-primary shadow-sm">
            <Card.Body>
              <h5 className="text-primary">
                <FaWalking /> Distance
              </h5>
              <p className="fs-5 fw-bold">{stats.distance} km</p>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="border border-warning shadow-sm">
            <Card.Body>
              <h5 style={{ color: "orange" }}>
                <FaFireAlt /> Calories
              </h5>
              <p className="fs-5 fw-bold text-warning">{stats.calories} kcal</p>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="border border-info shadow-sm">
            <Card.Body>
              <h5 className="text-info">
                <FaClock /> Duration
              </h5>
              <p className="fs-5 fw-bold text-info">{stats.duration} min</p>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="border border-success shadow-sm">
            <Card.Body>
              <h5 className="text-success">
                <FaHeartbeat /> Activity Level
              </h5>
              <p className="fs-5 fw-bold text-success">{stats.activityLevel}</p>
              <img
                src={getActivityGif()}
                alt="activity level"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "fill",
                  borderRadius: "8px",
                  transition: "all 0.3s ease-in-out",
                }}
              />
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 text-center">
        <p className="mb-2">
          Goal 🎯 : <strong>10,000 steps</strong>
        </p>
        <div className="w-75 mx-auto">
          <ProgressBar
            now={Math.min((stats.numSteps / 10000) * 100, 100)}
            label={`${Math.min((stats.numSteps / 10000) * 100, 100).toFixed(
              0
            )}%`}
            variant={getProgressVariant()}
            animated
            striped
          />
        </div>
      </div>
    </div>
  );
}
