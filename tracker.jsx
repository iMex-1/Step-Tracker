import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Card } from "react-bootstrap";
import { FaWalking, FaFireAlt, FaClock, FaHeartbeat } from "react-icons/fa";

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

  const handleCalculate = () => {
    const numSteps = parseInt(steps);

    if (isNaN(numSteps) || numSteps <= 0) {
      setError("⚠️ Veuillez entrer un nombre de pas valide !");
      return;
    }

    setError("");
    const distance = (numSteps * 0.78) / 1000; // km
    const calories = numSteps * 0.04; // kcal
    const duration = numSteps / 100; // minutes

    let activityLevel = "";
    if (numSteps < 5000) activityLevel = "Sédentaire 🛋️";
    else if (numSteps < 10000) activityLevel = "Actif 🚶‍♂️";
    else activityLevel = "Très actif 💪";

    setStats({
      distance: distance.toFixed(2),
      calories: calories.toFixed(1),
      duration: duration.toFixed(1),
      activityLevel,
      numSteps,
    });
  };

  const getProgressVariant = () => {
    const s = stats.numSteps;
    if (s < 5000) return "danger";
    if (s < 10000) return "warning";
    return "success";
  };

  const getActivityGif = () => {
    if(stats.numSteps<100) return "./assets/sonicidle.gif"
    if (stats.numSteps < 5000)
      return "https://media.giphy.com/media/3orieYzUkkpQbTzZqQ/giphy.gif"; // sedentary - sitting
    if (stats.numSteps < 10000)
      return "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"; // walking
    return "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"; // running
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 text-primary fw-bold">
        🏃‍♂️ StepTracker - Suivi des pas
      </h3>

    <div className="d-flex justify-content-center align-items-center mb-3">
      <div className="d-flex align-items-center w-50">
        <input
          type="number"
          className="form-control me-2"
          placeholder="Entrez le nombre de pas effectués"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />

        {/* GIF appears only when user is typing */}
        {steps && (
          <div
            className="ms-2"
            style={{
              width: "60px",
              height: "60px",
            }}
          >
            <img
              src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" // typing / thinking GIF
              alt="typing animation"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
      </div>

      <button
        className="btn btn-success ms-3"
        onClick={() => {
          handleCalculate();
          setSteps(""); // hide GIF after calculation
        }}
      >
        Calculer
      </button>
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
                <FaFireAlt /> Calories brûlées
              </h5>
              <p className="fs-5 fw-bold text-warning">{stats.calories} kcal</p>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="border border-info shadow-sm">
            <Card.Body>
              <h5 className="text-info">
                <FaClock /> Durée estimée
              </h5>
              <p className="fs-5 fw-bold text-info">{stats.duration} min</p>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 mb-3">
          <Card className="border border-success shadow-sm">
            <Card.Body>
              <h5 className="text-success">
                <FaHeartbeat /> Niveau d’activité
              </h5>
              <p className="fs-5 fw-bold text-success">{stats.activityLevel}</p>
              <img
                src={getActivityGif()}
                alt="niveau activité"
                style={{
                  width: "100%",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 text-center">
        <p className="mb-2">
          Objectif 🎯 : <strong>10 000 pas</strong>
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
