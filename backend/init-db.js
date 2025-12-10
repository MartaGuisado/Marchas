// backend-bazar/init-db.js
import 'dotenv/config';
import pool from './config/db.js';

/**
 * ==========================================
 * SCRIPT DE INICIALIZACIÓN DE BASE DE DATOS
 * ==========================================
 * 
 * PROPÓSITO:
 * Este script crea todas las tablas necesarias para el funcionamiento
 * del sistema de bazar (tienda online).
 * 
 * USO:
 * node init-db.js
 * 
 * CARACTERÍSTICAS:
 * - Crea las tablas solo si no existen (CREATE TABLE IF NOT EXISTS)
 * - Establece relaciones entre tablas (FOREIGN KEY)
 * - Define índices para optimizar consultas
 * - Inserta datos de ejemplo para facilitar las pruebas
 * 
 * ESTRUCTURA DE LA BASE DE DATOS:
 * 1. clientes - Usuarios registrados en el sistema
 * 2. categorias - Categorías de productos
 * 3. productos - Catálogo de productos
 * 4. pedidos - Cabecera de pedidos de clientes
 * 5. pedidos_productos - Líneas de pedido (productos específicos)
 */

/**
 * Función principal que orquesta la creación de todas las tablas
 */
async function crearTablas() {
  try {
    console.log("🚀 Iniciando creación de base de datos...");

    // Crear tablas en orden correcto (respetando dependencias)
    await crearTablaMarchas();
    
    await crearTablaAutores();
    await crearTablaBandas();
    await crearTablaMarchasAutores();
    
    // Insertar datos de ejemplo para pruebas
    await insertarDatosDeEjemplo();

    console.log('✅ Base de datos inicializada correctamente.');
    console.log('📊 Las tablas están listas para usar.');
    console.log('🧪 Se han insertado datos de ejemplo para pruebas.');
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

/**
 * ==========================================
 * TABLA: MARCHAS
 * ==========================================
 * 
 * PROPÓSITO: Almacena los usuarios registrados en el sistema
 * 
 * CAMPOS:
 * - id: Identificador único (clave primaria)
 * - nombre: Nombre completo del cliente
 * - email: Dirección de correo (única, usada para login)
 * - password: Contraseña hasheada con bcrypt
 * - creado_en: Fecha de registro del usuario
 */
async function crearTablaMarchas() {
  console.log("👤 Creando tabla 'marchas'...");
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS marchas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    anio INT NULL,
    descripcion TEXT NULL,
    duracion_segundos INT NULL,
    tipo ENUM(
        'cornetas y tambores',
        'capilla musical',
        'banda de música',
        'agrupación musical',
        'otros estilos'
    ) NOT NULL,
    dedicatoria VARCHAR(255) NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
    ) ENGINE=InnoDB 
      COMMENT='Listado de marchas disponibles en el sistema'
  `);
  console.log("✅ Tabla 'marchas' creada");
}

/**
 * ==========================================
 * TABLA: AUTORES
 * ==========================================
 * 
 * PROPÓSITO: compositores de las marchas
 * 
 * CAMPOS:
 * - id: Identificador único del autor
 * - nombre: Nombre del autor
 * - fecha_nacimiento: fecha de nacimiento del autor
 * - fecha_fallecimiento: fecha de fallecimiento del autor
 * - updated_en: Fecha de última actualización del registro
 * - creado_en: Fecha de creación del registro
 */
async function crearTablaAutores() {
  console.log("📦 Creando tabla 'autores'...");
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NULL,
    fecha_fallecimiento DATE NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);ENGINE=InnoDB 
      COMMENT='Listado de compositores de las marchas'
  `);
  
  console.log("✅ Tabla 'autores' creada");
}

/**
 * ==========================================
 * TABLA: BANDAS
 * ==========================================
 * 
 * PROPÓSITO: Diferentes bandas musicales que interpretan las marchas
 * 
 * CAMPOS:
 * - id: Identificador único del pedido
 * - nombre: nombre de la Banda
 * - tipo: estilo musical de la Banda
 * - fecha: Fecha y hora de creación del pedido
 * 
 * TIPOS POSIBLES:
 * - cornetas y tambores
 * - capilla musical
 * - banda de música
 * - agrupación musical
 * - otros estilos
 */
async function crearTablaBandas() {
  console.log("🧾 Creando tabla 'bandas'...");
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bandas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo ENUM(
        'cornetas y tambores',
        'capilla musical',
        'banda de música',
        'agrupación musical',
        'otros estilos'
    ) NOT NULL,
    localidad VARCHAR(255) NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
); ENGINE=InnoDB 
      COMMENT='Listado de formaciones musicales que interpretan las marchas'
  `);
  
  console.log("✅ Tabla 'bandas' creada");
}

/**
 * ==========================================
 * TABLA: MARCHAS_AUTORES
 * ==========================================
 * 
 * PROPÓSITO: Vincular marchas con sus autores (relación muchos a muchos)
 * 
 * CAMPOS:
 * - id: Identificador único de la línea de pedido
 * - pedido_id: ID del pedido al que pertenece esta línea (FK)
 * - producto_id: ID del producto incluido en esta línea (FK)
 * - cantidad: Cantidad de unidades del producto
 * 
 * RELACIÓN:
 * Una marcha puede tener múltiples autores
 * Un autor puede haber compuesto múltiples marchas
 */
async function crearTablaMarchasAutores() {
  console.log("📋 Creando tabla 'marchas_autores'...");
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS marchas_autores (
    marcha_id INT NOT NULL,
    autor_id INT NOT NULL,
    PRIMARY KEY (marcha_id, autor_id),
    FOREIGN KEY (marcha_id) REFERENCES marchas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (autor_id) REFERENCES autores(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
); ENGINE=InnoDB 
      COMMENT='Vincular marchas con sus autores (relación muchos a muchos)'
  `);
  
  console.log("✅ Tabla 'marchas_autores' creada");
}

/**
 * ==========================================
 * INSERCIÓN DE DATOS DE EJEMPLO
 * ==========================================
 * 
 * PROPÓSITO: Facilitar las pruebas insertando datos realistas
 * 
 * CATEGORÍAS DISPONIBLES:
 * - Ropa: Productos de vestimenta
 * - Electrónicos: Dispositivos y gadgets tecnológicos  
 * - Hogar: Artículos para el hogar y decoración
 */
async function insertarDatosDeEjemplo() {
  console.log("🧪 Insertando datos de ejemplo...");

  try {
    // Limpiar datos existentes para recrear con estructura correcta
    await pool.query('DELETE FROM pedidos_productos');
    await pool.query('DELETE FROM pedidos');
    await pool.query('DELETE FROM productos');
    await pool.query('DELETE FROM clientes');

    // Resetear auto_increment
    await pool.query('ALTER TABLE productos AUTO_INCREMENT = 1');
    await pool.query('ALTER TABLE clientes AUTO_INCREMENT = 1');

    console.log("🗑️ Datos anteriores limpiados");

    // Insertar productos de ejemplo con las 3 categorías
    await pool.query(`
      INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES 
      ('Camiseta Básica', 'Camiseta de algodón 100% en varios colores', 19.99, 50, 'Ropa', 'https://via.placeholder.com/300x300?text=Camiseta'),
      ('Pantalón Vaquero', 'Vaqueros clásicos de corte regular', 49.99, 30, 'Ropa', 'https://via.placeholder.com/300x300?text=Pantalon'),
      ('Chaqueta de Abrigo', 'Chaqueta impermeable para invierno', 79.99, 20, 'Ropa', 'https://via.placeholder.com/300x300?text=Chaqueta'),
      ('Zapatos Deportivos', 'Zapatillas cómodas para correr', 89.99, 25, 'Ropa', 'https://via.placeholder.com/300x300?text=Zapatos'),
      
      ('Smartphone XL', 'Teléfono inteligente con pantalla de 6.5 pulgadas', 299.99, 15, 'Electrónicos', 'https://via.placeholder.com/300x300?text=Smartphone'),
      ('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 89.99, 20, 'Electrónicos', 'https://via.placeholder.com/300x300?text=Auriculares'),
      ('Tablet 10"', 'Tablet con pantalla de alta resolución', 199.99, 18, 'Electrónicos', 'https://via.placeholder.com/300x300?text=Tablet'),
      ('Cargador Inalámbrico', 'Base de carga rápida para dispositivos', 35.99, 40, 'Electrónicos', 'https://via.placeholder.com/300x300?text=Cargador'),
      
      ('Lámpara LED', 'Lámpara de escritorio con regulador de intensidad', 35.00, 25, 'Hogar', 'https://via.placeholder.com/300x300?text=Lampara'),
      ('Cojín Decorativo', 'Cojín suave para sofá en varios colores', 18.50, 30, 'Hogar', 'https://via.placeholder.com/300x300?text=Cojin'),
      ('Espejo de Pared', 'Espejo decorativo para salón', 45.00, 12, 'Hogar', 'https://via.placeholder.com/300x300?text=Espejo'),
      ('Maceta Cerámica', 'Maceta artesanal para plantas de interior', 22.99, 35, 'Hogar', 'https://via.placeholder.com/300x300?text=Maceta')
    `);

    // Insertar un usuario de prueba con password hasheado
    await pool.query(`
      INSERT INTO clientes (nombre, email, password) VALUES 
      ('Usuario Prueba', 'test@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.JfVK7fCQpNpCPq9QdoW6lQk1K6kMSO')
    `);

    console.log("✅ Datos de ejemplo insertados correctamente");
    console.log("👤 Usuario de prueba creado: test@example.com / 123456");
    console.log("📦 12 productos creados en 3 categorías: Ropa, Electrónicos, Hogar");

  } catch (error) {
    console.error("❌ Error insertando datos de ejemplo:", error.message);
  }
}

// Ejecutar el script
crearTablas();