package routes

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type Destino struct {
	ID     int    `json:"id"`
	Nombre string `json:"nombre"`
	Pais   string `json:"pais"`
}

func GetDestinosHandler(w http.ResponseWriter, r *http.Request) {

	rows, err := db.Query("SELECT * FROM destinos")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	destinos := []Destino{}
	for rows.Next() {
		var destino Destino
		if err := rows.Scan(&destino.ID, &destino.Nombre, &destino.Pais); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		destinos = append(destinos, destino)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(destinos)
}

func CreateDestinoHandler(w http.ResponseWriter, r *http.Request) {

	var destino Destino
	if err := json.NewDecoder(r.Body).Decode(&destino); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := db.Exec("INSERT INTO destinos (nombre, pais) VALUES ($1, $2) RETURNING id", destino.Nombre, destino.Pais)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	destino.ID = int(id)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(destino)
}

func UpdateDestinoHandler(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	destinoID, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid destino ID", http.StatusBadRequest)
		return
	}

	var destino Destino
	if err := json.NewDecoder(r.Body).Decode(&destino); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE destinos SET nombre = $1, pais = $2 WHERE id = $3", destino.Nombre, destino.Pais, destinoID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(destino)
}

func DeleteDestinoHandler(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	destinoID, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid destino ID", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("DELETE FROM destinos WHERE id = $1", destinoID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Destino eliminado correctamente"})
}
