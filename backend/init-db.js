import 'dotenv/config';
import pool from './config/db.js';

/**
 * ==========================================
 * SCRIPT DE INICIALIZACIÓN DE BASE DE DATOS
 * ==========================================
 * 
 * PROPÓSITO:
 * Este script crea todas las tablas necesarias para el funcionamiento
 * del sistema de marchas.
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
 * 1. marchas - Listado de marchas disponibles en el sistema
 * 2. autores - Compositores de las marchas
 * 3. bandas - Diferenetes bandas musicales que interpretan las marchas
 * 4. marchas_autores - VIncular marchas con sus autores
 * 5. usuarios - usuarios registrados en el sistema
 * 6. usuarios_favoritos - Vincular usuarios con sus marchas favoritas
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
    await crearTablaUsuarios();
    await crearTablaFavoritos();
    
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
 * PROPÓSITO: Almacena los marchas disponibles en el sistema
 * 
 * CAMPOS:
 * - id: Identificador único (clave primaria)
 * - titulo: nombre de la marcha
 * - anio: año de composición de la marcha
 * - descripcion: Descripción detallada de la marcha
 * - duracion_segundos: Duración de la marcha en segundos
 * - tipo: Tipo de marcha (cornetas y tambores, capilla musical, banda de música, agrupación musical, otros estilos)
 * - dedicatoria: A quién está dedicada la marcha
 * - created_at: Fecha de creación del registro
 * - updated_at: Fecha de última actualización del registro
 * 
 * RELACIONES:
 * - Una marcha puede tener múltiples autores (tabla marchas_autores)
 * - Una marcha puede ser interpretada por múltiples bandas (tabla bandas)
 * - Los usuarios pueden marcar marchas como favoritas (tabla usuarios_favoritos)
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
) ENGINE=InnoDB 
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
    anio_fundacion INT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
) ENGINE=InnoDB 
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
) ENGINE=InnoDB 
      COMMENT='Vincular marchas con sus autores (relación muchos a muchos)'
  `);
  
  console.log("✅ Tabla 'marchas_autores' creada");
}

/**
 * ==========================================
 * TABLA: USUARIOS
 * ==========================================
 * 
 * PROPÓSITO: * Almacenar la información de los usuarios registrados en el sistema.
 * Estos usuarios podrán iniciar sesión y marcar marchas como favoritas.
 * 
 * CAMPOS:
 * - id: Identificador único de la línea de pedido
 * - nombre: ID del pedido al que pertenece esta línea (FK)
 * - email: ID del producto incluido en esta línea (FK)
 * - password: Cantidad de unidades del producto
 * - creado_en: Fecha de creación del registro
 * - actualizado_en: Fecha de última actualización del registro
 * - email_verificado: Indica si el mail ha sido verificado
 * - activo: Indica si el usuario está activo
 * 
 * RELACIÓN:
 * Un usuario puede tener múltiples marchas favoritas (tabla usuarios_favoritos)
 * Las marchas pueden ser marcadas como favoritas por múltiples usuarios
 */

async function crearTablaUsuarios() {
  console.log("📋 Creando tabla 'usuarios'...");
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  email_verificado TINYINT(1) DEFAULT 0,
  activo TINYINT(1) DEFAULT 1,
  INDEX idx_nombre (nombre)
)
ENGINE=InnoDB
COMMENT='Usuario registrados en el sistema';
`);
  
  console.log("✅ Tabla 'usuarios' creada");
}

/**
 * ==========================================
 * TABLA: USUARIOS_FAVORITOS
 * ==========================================
 * PROPÓSITO: Vincular usuarios con sus marchas favoritas (relación muchos a muchos)
 * 
 * CAMPOS:
 * - id: Identificador único
 * - usuario_id: ID del usuario que marcó como favorito (FK)
 * - marcha_id: ID de la marcha marcada como favorita (FK)
 * - creado_en : Fecha de creación del registro
 * 
 * RELACIÓN:
 * Un usuario puede tener múltiples marchas favoritas
 * Una marcha puede ser favorita de múltiples usuarios
 */
async function crearTablaFavoritos() {
  console.log("📋 Creando tabla 'favoritos'...");
  
  await pool.query(`
CREATE TABLE usuarios_favoritos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  marcha_id INT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_fav (usuario_id, marcha_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (marcha_id) REFERENCES marchas(id) ON DELETE CASCADE
)
ENGINE=InnoDB
COMMENT='Usuario registrados en el sistema';
`);
console.log("✅ Tabla 'usuarios_favoritos' creada");
}
/**
 * ==========================================
 * INSERCIÓN DE DATOS DE EJEMPLO
 * ==========================================
 * 
 * PROPÓSITO: Facilitar las pruebas insertando datos realistas
 * 
 */
async function insertarDatosDeEjemplo() {
  console.log("🧪 Insertando datos de ejemplo...");

  try {
    // Limpiar relación primero
    await pool.query('DELETE FROM marchas_autores');
    await pool.query('DELETE FROM marchas');
    await pool.query('DELETE FROM autores');
    await pool.query('DELETE FROM bandas');

    // Reset de auto_increment
    await pool.query('ALTER TABLE marchas AUTO_INCREMENT = 1');
    await pool.query('ALTER TABLE autores AUTO_INCREMENT = 1');
    await pool.query('ALTER TABLE bandas AUTO_INCREMENT = 1');

    console.log("🗑️ Datos anteriores limpiados");


    // ======================
    // AUTORES
    // ======================
    await pool.query(`
      INSERT INTO autores (nombre, fecha_nacimiento, fecha_fallecimiento, created_at, updated_at)
      VALUES
      ('Manuel Font de Anta', '1895-10-10', '1936-07-10', NOW(), NOW()),
      ('Vicente Gómez-Zarzuela', '1870-01-01', '1940-01-01', NOW(), NOW()),
      ('Abel Moreno', '1944-02-01', NULL, NOW(), NOW()),
      ('Pedro Braña Martínez', '1895-12-05', '1967-01-01', NOW(), NOW()),
      ('Pedro Gámez Laserna', '1907-09-10', '1987-04-18', NOW(), NOW())
    `);


    // ======================
    // MARCHAS
    // ======================
    await pool.query(`
      INSERT INTO marchas (titulo, anio, descripcion, duracion_segundos, tipo, dedicatoria, created_at, updated_at)
      VALUES
      ('Amarguras', 1919, 'Considerada el himno de la Semana Santa', 430, 'banda de música', 'A la Virgen de la Amargura', NOW(), NOW()),
      ('Virgen del Valle', 1898, 'Clásico intemporal del Jueves Santo', 450, 'banda de música', NULL, NOW(), NOW()),
      ('La Madrugá', 1987, 'Emblema del autor Abel Moreno', 420, 'banda de música', NULL, NOW(), NOW()),
      ('Coronación de la Macarena', 1964, 'Marcha solemne dedicada a la coronación', 440, 'banda de música', 'A la Esperanza Macarena', NOW(), NOW()),
      ('Pasa la Virgen Macarena', 1959, NULL, 410, 'banda de música', 'A la Esperanza Macarena', NOW(), NOW()),
      ('Encarnación Coronada', 1994, 'Marcha de la Coronación de la Virgen de la Encarnación de San Benito', 430, 'banda de música', NULL, NOW(), NOW()),
      ('Soleá, dame la mano', 1918, 'Obra emocional y profunda', 460, 'banda de música', 'A la Esperanza de Triana', NOW(), NOW()),
      ('Pasan los Campanilleros', 1924, 'Muy reconocida por su melodía', 400, 'banda de música', 'Al Cristo de las Siete Palabras', NOW(), NOW()),
      ('Reina de Triana', 1988, NULL, 420, 'banda de música', 'A la Esperanza de Triana', NOW(), NOW())
    `);


    // ======================
    // BANDAS
    // ======================
    await pool.query(`
      INSERT INTO bandas (nombre, tipo, localidad, anio_fundacion,created_at, updated_at)
      VALUES
      ('Asociación Músico-Cultural “Nuestra Señora de la Paz”', 'banda de música', 'Málaga', 1997, NOW(), NOW()),
      ('Sociedad Filarmónica Nuestra Señora de La Oliva de Salteras', 'banda de música', 'Salteras (Sevilla)', 1913, NOW(), NOW()),
      ('Banda Municipal de Sevilla', 'banda de música', 'Sevilla', 1838, NOW(), NOW()),
      ('Banda del Sol', 'banda de música', 'Sevilla', 1975, NOW(), NOW()),
      ('Bandas de cornetas y tambores Nuestra Señora de la Victoria y Sagrada Columna y Azotes - Las Cigarreras -', 'cornetas y tambores', 'Sevilla', 1979, NOW(), NOW()),
      ('Agrupación Musical Virgen de los Reyes', 'agrupación musical', 'Sevilla', 1980, NOW(), NOW())
    `);


    // ======================
    // RELACIONES marchas_autores
    // ======================
    await pool.query(`
      INSERT INTO marchas_autores (marcha_id, autor_id)
      VALUES
      (1, 1),  -- Amarguras - Font de Anta
      (2, 2),  -- Virgen del Valle - Zarzuela
      (3, 3),  -- La Madrugá - Abel Moreno
      (4, 4),  -- Coronación Macarena - Braña
      (5, 5),  -- Pasa la Virgen Macarena - Gámez Laserna
      (6, 3),  -- Encarnación Coronada - Abel Moreno
      (7, 1)  -- Soleá dame la mano - Font de Anta
    `);

    console.log("✅ Datos de ejemplo insertados correctamente");

  } catch (error) {
    console.error("❌ Error insertando datos de ejemplo:", error);
  }
}

crearTablas();