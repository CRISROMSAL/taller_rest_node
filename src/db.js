import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

/**
 * Configuración del pool de conexiones MySQL
 *
 * Este bloque crea un "pool" (grupo) de conexiones reutilizables a la base de datos.
 * Usar un pool mejora el rendimiento y evita abrir y cerrar conexiones constantemente.
 *
 * Parámetros de configuración:
 * ---------------------------------------------
 * host              → Dirección del servidor MySQL (por ejemplo: "localhost" en XAMPP)
 * user              → Usuario con permisos para acceder a la base de datos
 * password          → Contraseña del usuario (puede quedar vacía en local)
 * database          → Nombre de la base de datos que usará la aplicación
 * waitForConnections → Si es TRUE, las peticiones esperan una conexión libre cuando se alcanza el límite
 * connectionLimit   → Número máximo de conexiones activas permitidas al mismo tiempo
 * queueLimit        → Número máximo de peticiones que pueden quedar en cola (0 = sin límite)
 *
 * Las variables se leen desde el archivo .env mediante process.env
 * Esto evita incluir credenciales o datos sensibles directamente en el código fuente.
 */
export const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "workshop",
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT || 10),
  queueLimit: 0,
});


export async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1");
    if (rows) console.log("✅ Conectado a MySQL correctamente.");
  } catch (err) {
    console.error("❌ Error al conectar con MySQL:", err.message);
    process.exit(1);
  }
}
