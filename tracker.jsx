import React, { useState } from "react";

export default function StepTracker() {
  const [steps, setSteps] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    const numSteps = parseInt(steps);

    if (isNaN(numSteps) || numSteps <= 0) {
      setError("⚠️ Veuillez entrer un nombre de pas valide !");
      setStats(null);
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

  const getProgressColor = () => {
    if (!stats) return "bg-secondary";
    if (stats.numSteps < 5000) return "bg-danger";
    if (stats.numSteps < 10000) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 text-primary">
        🏃‍♂️ StepTracker - Suivi des pas
      </h3>

      <div className="d-flex justify-content-center mb-3">
        <input
          type="number"
          className="form-control w-50 me-2"
          placeholder="Entrez le nombre de pas effectués"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleCalculate}>
          Calculer
        </button>
      </div>

      {error && (
        <div className="alert alert-danger text-center w-75 mx-auto">
          {error}
        </div>
      )}

      {stats && (
        <>
          <div className="row text-center mt-4">
            <div className="col-md-3 mb-3">
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title">Distance</h5>
                  <p className="card-text fw-bold">{stats.distance} km</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-success">
                <div className="card-body">
                  <h5 className="card-title">Calories brûlées</h5>
                  <p className="card-text fw-bold">{stats.calories} kcal</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-warning">
                <div className="card-body">
                  <h5 className="card-title">Durée estimée</h5>
                  <p className="card-text fw-bold">{stats.duration} min</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-danger">
                <div className="card-body">
                  <h5 className="card-title">Niveau d’activité</h5>
                  <p className="card-text fw-bold">{stats.activityLevel}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="mb-1">
              Objectif 🎯 : <strong>10 000 pas</strong>
            </p>
            <div className="progress w-75 mx-auto" style={{ height: "20px" }}>
              <div
                className={`progress-bar ${getProgressColor()}`}
                role="progressbar"
                style={{
                  width: `${Math.min((stats.numSteps / 10000) * 100, 100)}%`,
                }}
              >
                {Math.min((stats.numSteps / 10000) * 100, 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
