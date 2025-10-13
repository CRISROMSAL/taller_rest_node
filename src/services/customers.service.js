import { pool } from "../db.js";
/*
export async function listCustomers() {
  const [rows] = await pool.query("SELECT * FROM customers ORDER BY id DESC");
  return rows;
}*/


/**
 * Lista todos los clientes o filtra por nombre si se proporciona uno.
 * Si 'name' es undefined o vacío, devuelve todos.
 */
export async function listCustomers(name) {
  let sql = "SELECT * FROM customers";
  const params = [];

  // Si se proporciona un filtro, añadimos la condición WHERE
  if (name && name.trim() !== "") {
    sql += " WHERE name LIKE ?";
    params.push(`%${name}%`);
  }

  sql += " ORDER BY id DESC";

  const [rows] = await pool.query(sql, params);
  return rows;
}

export async function getCustomerById(id) {
  const [rows] = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);
  return rows[0];
}

export async function createCustomer({ name, email }) {
  const [result] = await pool.execute(
    "INSERT INTO customers (name, email) VALUES (?, ?)",
    [name, email]
  );
  return result.insertId;
}

export async function deleteCustomer(id) {
  const [result] = await pool.execute("DELETE FROM customers WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
