package routes

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

func InitDB() {
	// Cargar el archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	dbConnStr := os.Getenv("DATABASE_URL")
	var openErr error
	db, openErr = sql.Open("postgres", dbConnStr)
	if openErr != nil {
		log.Fatal("Error connecting to the database:", openErr)
	}
}

func GetDBInstance() *sql.DB {
	return db
}

// No necesitas CloseDB ya que la conexión se cerrará cuando el programa termine
