package main

import (
	"go-back/go-back/routes"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	router := mux.NewRouter()

	routes.InitDB()

	// Registrar enrutadores para diferentes recursos
	router.HandleFunc("/destinos", routes.GetDestinosHandler).Methods("GET")
	router.HandleFunc("/destinos", routes.CreateDestinoHandler).Methods("POST")
	router.HandleFunc("/destinos/{id}", routes.UpdateDestinoHandler).Methods("PUT")
	router.HandleFunc("/destinos/{id}", routes.DeleteDestinoHandler).Methods("DELETE")

	router.HandleFunc("/paquetes", routes.GetPaquetesHandler).Methods("GET")
	router.HandleFunc("/paquetes", routes.CreatePaqueteHandler).Methods("POST")
	router.HandleFunc("/paquetes/{id}", routes.UpdatePaqueteHandler).Methods("PUT")
	router.HandleFunc("/paquetes/{id}", routes.DeletePaqueteHandler).Methods("DELETE")
	router.HandleFunc("/paquetes/{id}/image", routes.UpdatePaqueteImageHandler).Methods("PUT")

	// Configurar las opciones de CORS
	corsOptions := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"}, // Cambia esto según tus necesidades
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	// Usar CORS en tu router
	handler := corsOptions.Handler(router)

	log.Println("Server started on port 8080")
	http.ListenAndServe(":8080", handler)
}
