package main

import (
	"encoding/json"
	"net/http"
)

func(app *application) statusHandler(w http.ResponseWriter, r *http.Request) {
	currentStatus := AppStatus{
		Status:      "Available",
		Environment: app.config.env,
		Version:     version,
	}

	js, err := json.MarshalIndent(currentStatus, "", "\t")
	// js, err := json.Marshal(currentStatus)
	if err != nil {
		app.logger.Panicln(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(append(js, []byte("\n")...))	
}