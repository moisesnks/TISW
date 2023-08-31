package routes

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type Paquete struct {
	ID        int     `json:"id"`
	Nombre    string  `json:"nombre"`
	DestinoID int     `json:"destino_id"`
	Precio    float64 `json:"precio"`
	Img       []uint8 `json:"img"`
}

func GetPaquetesHandler(w http.ResponseWriter, r *http.Request) {

	rows, err := db.Query("SELECT id, nombre, destino_id, precio, img FROM paquetes")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	paquetes := []Paquete{}
	for rows.Next() {
		var paquete Paquete
		if err := rows.Scan(&paquete.ID, &paquete.Nombre, &paquete.DestinoID, &paquete.Precio, &paquete.Img); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		paquetes = append(paquetes, paquete)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(paquetes)
}

func CreatePaqueteHandler(w http.ResponseWriter, r *http.Request) {

	var paquete Paquete
	if err := json.NewDecoder(r.Body).Decode(&paquete); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := db.Exec("INSERT INTO paquetes (nombre, destino_id, precio) VALUES ($1, $2, $3) RETURNING id", paquete.Nombre, paquete.DestinoID, paquete.Precio)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	paquete.ID = int(id)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(paquete)
}

func UpdatePaqueteImageHandler(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	paqueteID, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid paquete ID", http.StatusBadRequest)
		return
	}

	imageBuffer, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = db.Exec("UPDATE paquetes SET img = $1 WHERE id = $2", imageBuffer, paqueteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Imagen actualizada correctamente"))
}

func UpdatePaqueteHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	paqueteID, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid paquete ID", http.StatusBadRequest)
		return
	}

	var paquete Paquete
	if err := json.NewDecoder(r.Body).Decode(&paquete); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE paquetes SET nombre = $1, destino_id = $2, precio = $3 WHERE id = $4", paquete.Nombre, paquete.DestinoID, paquete.Precio, paqueteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(paquete)
}

func DeletePaqueteHandler(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	paqueteID, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid paquete ID", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("DELETE FROM paquetes WHERE id = $1", paqueteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Paquete eliminado correctamente"})
}
