"use client"

import { useMemo, useState, type CSSProperties, type ReactNode } from "react"
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  ClipboardCheck,
  ListChecks,
  Moon,
  RotateCcw,
  Search,
  Sparkles,
  Sun,
  Target,
  X,
} from "lucide-react"
import accesoDatosData from "@/acceso_datos.json"
import desarrolloInterfacesData from "@/desarrollo_interfaces.json"
import digitalizacionData from "@/digitalizacion.json"
import gestionEmpresarialData from "@/gestion_empresarial.json"
import inglesData from "@/ingles.json"
import studyInfo from "@/info.json"
import studyPack from "@/index.json"
import itpData from "@/itp.json"
import multimediaData from "@/multimedia_dispositivos_moviles.json"
import pspData from "@/psp.json"
import sostenibilidadData from "@/sostenibilidad.json"

export type Subject = {
  id: string
  name: string
  icon: string
  color: string
  theory: TheorySection[]
  questions: Question[]
  accent?: string
  difficulty?: string
  priority?: string
  likely?: string[]
  cheatSheet?: string[]
  probableQuestions?: ProbableQuestion[]
  probableQuestionsTitle?: string
}

export type TheorySection = {
  title: string
  content?: string[] // For older structure
  items?: string[] // For new structure
}

export type Question = {
  id?: number // Present in existing, but not in update
  question: string
  options: string[]
  correctAnswer?: number
  correct?: number
  explanation?: string
}

export type ProbableQuestion = {
  pregunta: string
  respuesta: string
}

const subjects: Subject[] = [
  {
    id: "bases-datos",
    name: "Bases de Datos",
    icon: "🗄️",
    color: "from-emerald-500 to-teal-600",
    theory: [
      {
        title: "Unidad 1: Ficheros",
        content: [
          'Fichero secuencial: los datos van "en fila", y para llegar a un registro hay que leer desde el principio (simple, pero poco flexible).',
          "Fichero de acceso directo/indexado: puedes ir a un registro concreto usando un índice/dirección (más rápido en búsquedas, pero puede desperdiciar espacio).",
          "Modos de apertura y permisos: según cómo abras el fichero y los permisos del sistema, podrás solo leer o también escribir/borrar.",
        ],
      },
      {
        title: "Unidad 1: Modelo ER (conceptual)",
        content: [
          'Entidad / atributo / relación: una entidad es "una cosa" (Jugador), los atributos son sus datos (nombre) y las relaciones conectan entidades (Jugador pertenece a Equipo).',
          "Clave primaria (PK): el dato que identifica de forma única cada elemento (normalmente un id).",
          "Clave foránea (FK): un campo que guarda el id de otra tabla para crear el enlace entre ambas.",
          "Cardinalidades (1:1, 1:N, N:M): indican cuántos elementos se relacionan; N:M suele necesitar una tabla intermedia.",
        ],
      },
      {
        title: "Unidades 2–3: Modelo relacional + base",
        content: [
          "Niveles: se pasa de la realidad al diagrama ER, luego a tablas (modelo relacional) y finalmente a cómo se guardan físicamente en disco.",
          'Tabla y conceptos: "relación" es tabla, "tupla" es fila; "esquema" es la estructura y "instancia" son los datos que hay ahora.',
          "Reglas de Codd (idea): base de datos relacional = información en tablas, acceso por claves y uso de un lenguaje estándar (SQL).",
          "Normalización: reorganiza tablas para evitar repetir datos y prevenir errores típicos al insertar/actualizar/borrar.",
          "Formas normales: 1FN (valores atómicos), 2FN (sin dependencias parciales con PK compuesta) y 3FN (sin dependencias transitivas).",
        ],
      },
      {
        title: "Unidades 4–6: SQL básico (DDL, DML, SELECT)",
        content: [
          "Sublenguajes: DDL define estructura, DML cambia/consulta datos, DCL gestiona permisos y TCL gestiona transacciones.",
          "DDL (estructura): CREATE TABLE define columnas/tipos y reglas (PK, NOT NULL, DEFAULT) y ALTER/DROP modifican o eliminan estructura.",
          "FK en SQL: FOREIGN KEY enlaza tablas y la columna referenciada debe ser única (PK o UNIQUE).",
          "DML (datos): INSERT añade filas (una o varias), UPDATE modifica y DELETE borra; el WHERE decide qué filas se tocan.",
          "LOAD DATA: carga muchos datos desde un fichero (como CSV) de forma eficiente.",
          "SELECT: FROM elige la tabla, WHERE filtra filas, ORDER BY ordena, LIMIT limita resultados; GROUP BY agrupa y HAVING filtra grupos.",
        ],
      },
      {
        title: 'Unidad 7 y 9: SQL "avanzado"',
        content: [
          "JOIN: une varias tablas usando una condición (normalmente PK–FK); INNER devuelve coincidencias y LEFT/RIGHT mantienen todo de un lado.",
          "ON y DISTINCT: ON define cómo se emparejan filas entre tablas y DISTINCT elimina duplicados del resultado.",
          'Vistas: son SELECT guardados como "tabla virtual" (guardan la consulta, no los datos).',
          "Transacciones (ACID) y bloqueos: las transacciones aseguran cambios fiables y los bloqueos controlan accesos simultáneos (compartido, exclusivo, escalada).",
          "Procedimientos/funciones/triggers/eventos: lógica guardada en el servidor; triggers se disparan antes/después de INSERT/UPDATE/DELETE y eventos son tareas programadas.",
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: "En un fichero de acceso secuencial:",
        options: [
          "Los registros se almacenan dispersos y se accede mediante índice directo.",
          "Los registros se leen siempre desde el principio hasta el final, en un solo sentido.",
          "Es habitual insertar registros nuevos entre los ya grabados sin reescribir nada.",
          "Siempre permite acceso simultáneo de varios usuarios a distintos registros.",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Abrir un fichero en modo "solo lectura" implica que:',
        options: [
          "Se puede leer y escribir, pero no borrar.",
          "Solo se permite leer datos, no escribir, modificar ni borrar.",
          "Solo se permite escribir nuevos datos, no leer los existentes.",
          "Se deshabilita cualquier control de permisos del sistema operativo.",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "En un diagrama Entidad–Relación, una entidad se representa como:",
        options: [
          "Un rombo, con las relaciones dentro.",
          "Un rectángulo, con el nombre de la entidad.",
          "Una elipse, con el nombre del atributo.",
          "Un triángulo, con las claves primarias.",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "¿Cuál de las siguientes afirmaciones sobre una clave primaria es correcta?",
        options: [
          "Puede contener valores duplicados pero no NULL.",
          "Debe ser única y admite valores NULL ilimitados.",
          "Debe ser única y no admite valores NULL.",
          "No es necesario que exista en todas las tablas.",
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "La función principal de una clave foránea es:",
        options: [
          "Aumentar la velocidad de las consultas sobre la tabla.",
          "Evitar que se puedan borrar filas en cualquier tabla.",
          "Establecer la relación con la clave primaria de otra tabla.",
          "Generar automáticamente valores secuenciales.",
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        question:
          "Para implementar en el modelo relacional una relación muchos a muchos (N:M) entre dos entidades se necesita:",
        options: [
          "Una única tabla con una clave primaria compuesta.",
          "Dos tablas y ningún tipo de clave foránea.",
          "Una tabla intermedia con claves foráneas a ambas tablas.",
          "Una vista en lugar de tablas físicas.",
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        question: "¿Cuál es la pareja definición correcta?",
        options: [
          "Esquema = datos actuales; instancia = definición de tablas.",
          "Esquema = estructura de la BD; instancia = datos en un momento dado.",
          "Esquema = permisos de usuario; instancia = copia de seguridad.",
          "Esquema = solo nombres de tablas; instancia = nombres de columnas.",
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "En el contexto del modelo relacional, ¿qué combinación es correcta?",
        options: [
          "Relación = fila; tupla = tabla; atributo = columna.",
          "Relación = tabla; tupla = fila; atributo = columna.",
          "Relación = columna; tupla = tabla; atributo = fila.",
          "Relación = base de datos; tupla = columna; atributo = fila.",
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: "La normalización de tablas tiene como objetivo principal:",
        options: [
          "Maximizar la redundancia para acelerar las búsquedas.",
          "Minimizar redundancias y anomalías de actualización.",
          "Aumentar el tamaño físico de la base de datos.",
          "Evitar el uso de claves foráneas.",
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: "Una tabla está en Primera Forma Normal (1FN) si:",
        options: [
          "Todas las filas tienen el mismo número de columnas y valores atómicos.",
          "No existen claves primarias compuestas.",
          "No hay claves foráneas que apunten a otras tablas.",
          "Todas las columnas son de tipo numérico.",
        ],
        correctAnswer: 0,
      },
      {
        id: 11,
        question: "¿En qué caso se viola la Segunda Forma Normal (2FN)?",
        options: [
          "Cuando existe un atributo que depende funcionalmente de toda la clave primaria compuesta.",
          "Cuando un atributo no clave depende solo de una parte de la clave primaria compuesta.",
          "Cuando una tabla tiene más de diez columnas.",
          "Cuando no hay ninguna clave foránea.",
        ],
        correctAnswer: 1,
      },
      {
        id: 12,
        question: "Una dependencia transitiva se da cuando:",
        options: [
          "Un atributo clave depende de otro atributo clave.",
          "Un atributo no clave depende de la clave primaria.",
          "Un atributo no clave depende de otro atributo no clave.",
          "Dos claves primarias dependen entre sí.",
        ],
        correctAnswer: 2,
      },
      {
        id: 13,
        question: "¿Cuál de las siguientes asociaciones es correcta?",
        options: [
          "DDL – manipular datos (INSERT, UPDATE, DELETE).",
          "DML – definir tablas y columnas (CREATE TABLE).",
          "DCL – controlar permisos sobre los datos.",
          "TCL – crear y borrar bases de datos.",
        ],
        correctAnswer: 2,
      },
      {
        id: 14,
        question: "En MySQL, ¿qué sentencia es correcta para crear una base de datos solo si aún no existe?",
        options: [
          "CREATE DATABASE nombre;",
          "CREATE DATABASE IF NOT EXISTS nombre;",
          "CREATE IF NOT EXISTS DATABASE nombre;",
          "CREATE SCHEMA IF MISSING nombre;",
        ],
        correctAnswer: 1,
      },
      {
        id: 15,
        question: "¿Qué definición típica de columna se usa para una PK numérica que se incremente sola?",
        options: [
          "id INT NOT NULL DEFAULT 0;",
          "id INT AUTO_INCREMENT PRIMARY KEY;",
          "id VARCHAR(10) PRIMARY KEY;",
          "id SERIAL NULL;",
        ],
        correctAnswer: 1,
      },
      {
        id: 16,
        question:
          "En una tabla con edad INT NULL y genero ENUM(...) DEFAULT 'no especificado', si en el INSERT solo se indica el nombre del empleado:",
        options: [
          "edad se rellena con 0 y genero queda NULL.",
          "edad queda NULL y genero toma el valor por defecto.",
          "Ambas columnas quedan obligatoriamente en NULL.",
          "La inserción falla siempre por falta de datos obligatorios.",
        ],
        correctAnswer: 1,
      },
      {
        id: 17,
        question: "¿Cuál de las siguientes afirmaciones sobre TRUNCATE y DELETE es correcta en MySQL?",
        options: [
          "TRUNCATE puede tener cláusula WHERE, DELETE no.",
          "DELETE reinicia el contador AUTO_INCREMENT, TRUNCATE no.",
          "TRUNCATE vacía la tabla y suele reiniciar AUTO_INCREMENT.",
          "TRUNCATE nunca respeta las restricciones de integridad referencial.",
        ],
        correctAnswer: 2,
      },
      {
        id: 18,
        question:
          "¿Qué instrucción es correcta para añadir una columna email VARCHAR(100) NOT NULL a la tabla empleados?",
        options: [
          "MODIFY TABLE empleados ADD email VARCHAR(100) NOT NULL;",
          "ALTER TABLE empleados ADD email VARCHAR(100) NOT NULL;",
          "UPDATE TABLE empleados ADD email VARCHAR(100) NOT NULL;",
          "CREATE COLUMN email VARCHAR(100) NOT NULL IN empleados;",
        ],
        correctAnswer: 1,
      },
      {
        id: 19,
        question: "¿Cuál de las siguientes consultas devuelve todas las columnas y filas de la tabla clientes?",
        options: ["SELECT * FROM clientes;", "SELECT clientes FROM *;", "SELECT ALL clientes;", "SHOW TABLE clientes;"],
        correctAnswer: 0,
      },
      {
        id: 20,
        question: "¿Qué devuelve la consulta SELECT COUNT(*) FROM pedidos;?",
        options: [
          "La suma de los importes de todos los pedidos.",
          "El número total de filas de la tabla pedidos.",
          "El número de columnas de la tabla pedidos.",
          "El valor máximo de la clave primaria.",
        ],
        correctAnswer: 1,
      },
      {
        id: 21,
        question: "En una consulta SELECT * FROM productos ORDER BY precio DESC LIMIT 5; se obtienen:",
        options: [
          "Los 5 productos más baratos, sin ordenar.",
          "Los 5 productos más caros, ordenados de mayor a menor precio.",
          "Todos los productos más caros que la media.",
          "Cinco productos aleatorios de la tabla.",
        ],
        correctAnswer: 1,
      },
      {
        id: 22,
        question: "¿En cuál de estas consultas tiene sentido utilizar HAVING y no WHERE?",
        options: [
          "Filtrar filas donde precio > 100 antes de agrupar.",
          "Filtrar grupos para mostrar solo categorías con COUNT(*) > 10.",
          "Filtrar filas donde nombre LIKE 'A%'.",
          "Filtrar filas donde fecha > '2024-01-01'.",
        ],
        correctAnswer: 1,
      },
      {
        id: 23,
        question: "¿Cuál de las siguientes consultas contaría cuántos empleados hay por cada departamento?",
        options: [
          "SELECT COUNT(*) FROM empleados;",
          "SELECT dpto, COUNT(*) FROM empleados GROUP BY dpto;",
          "SELECT dpto FROM empleados WHERE COUNT(*) > 1;",
          "SELECT dpto, SUM(*) FROM empleados;",
        ],
        correctAnswer: 1,
      },
      {
        id: 24,
        question: "¿Qué devuelve un INNER JOIN entre dos tablas A y B?",
        options: [
          "Todas las filas de A, coincidan o no con B.",
          "Todas las filas de B, coincidan o no con A.",
          "Solo las filas donde hay coincidencia según la condición ON en ambas tablas.",
          "El producto cartesiano de A y B, sin condiciones.",
        ],
        correctAnswer: 2,
      },
      {
        id: 25,
        question:
          "En un LEFT JOIN entre tablas departamentos (izquierda) y empleados (derecha) usando ON departamentos.id = empleados.id_depto, el resultado:",
        options: [
          "Solo muestra departamentos que tienen al menos un empleado.",
          "Muestra todos los departamentos, tengan o no empleados, y NULL en columnas de empleados si no hay coincidencia.",
          "Muestra solo empleados que no tienen departamento asignado.",
          "Muestra únicamente filas sin coincidencia entre ambas tablas.",
        ],
        correctAnswer: 1,
      },
      {
        id: 26,
        question: "¿Qué efecto tiene usar SELECT DISTINCT nombre_dept FROM departamentos d JOIN empleados e ON ...;?",
        options: [
          "Elimina filas con valores de nombre_dept repetidos en el resultado.",
          "Ordena los departamentos alfabéticamente.",
          "Convierte los NULL en cadenas vacías.",
          "Ignora todas las columnas excepto nombre_dept.",
        ],
        correctAnswer: 0,
      },
      {
        id: 27,
        question: "La diferencia principal entre una vista y una tabla base es que:",
        options: [
          "La vista almacena físicamente los datos y la tabla base no.",
          "La vista almacena solo la definición de la consulta y genera los datos al ejecutarse.",
          "La tabla base no puede usarse en consultas SELECT.",
          "Una vista no puede basarse en varias tablas.",
        ],
        correctAnswer: 1,
      },
      {
        id: 28,
        question: "En el contexto de transacciones, la atomicidad significa que:",
        options: [
          "Las transacciones siempre se ejecutan muy rápido.",
          "Todas las operaciones de la transacción se completan o ninguna se aplica.",
          "Solo se permite una transacción a la vez en todo el sistema.",
          "Los datos se guardan en forma de átomos lógicos.",
        ],
        correctAnswer: 1,
      },
      {
        id: 29,
        question: "Un bloqueo exclusivo en una zona de la base de datos implica que:",
        options: [
          "Varios usuarios pueden leer y escribir simultáneamente en la misma zona.",
          "Solo un usuario o proceso puede leer/escribir en esa zona mientras dure el bloqueo.",
          "Se permite siempre lectura, pero nunca escritura.",
          "El bloqueo se aplica solo a índices, no a datos.",
        ],
        correctAnswer: 1,
      },
      {
        id: 30,
        question: "¿Cuál de estas afirmaciones es correcta sobre procedimientos y funciones?",
        options: [
          "Una función puede modificar datos con INSERT y UPDATE, un procedimiento no.",
          "Un procedimiento almacenado siempre devuelve exactamente un valor escalar.",
          "Una función devuelve un único valor y no debería modificar datos; un procedimiento puede modificar datos y devolver varios valores.",
          "Ambos son idénticos; solo cambia el nombre en MySQL.",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "entornos",
    name: "Entornos de Desarrollo",
    icon: "⚙️",
    color: "from-blue-500 to-cyan-600",
    theory: [
      {
        title: "Unidad 1: Lenguajes",
        content: [
          'Un lenguaje de programación es una forma "formal" de decirle a un ordenador qué hacer, con reglas de cómo se escribe (sintaxis) y qué significa (semántica).',
          "Se diferencia del lenguaje máquina porque el lenguaje máquina son 0 y 1 entendibles por el hardware, y el lenguaje de programación es más fácil para humanos y luego se traduce.",
          "Programar es escribir código; desarrollar software incluye además analizar lo que se necesita, diseñar y tomar decisiones antes de picar código.",
          "Nivel alto (Java/Python) = más legible; nivel bajo (ensamblador) = más cerca del hardware; intermedio (C) = legible pero con más control de recursos.",
          "Compilado (C/C++) genera un ejecutable; interpretado (Python/JS) se ejecuta con un intérprete; Java/C# suelen compilar a bytecode y lo ejecuta una máquina virtual.",
          "Paradigmas: imperativo (paso a paso), declarativo (dices el resultado, como en SQL) y orientado a objetos (clases y objetos).",
        ],
      },
      {
        title: "Unidad 2: IDEs",
        content: [
          "Un IDE es un programa que junta en un solo sitio lo necesario para desarrollar: editor, ejecución/compilación, depurador y gestión del proyecto.",
          "Funciones típicas: autocompletado (te sugiere código), resaltado (colorea y ayuda a ver errores) y refactorización (cambios como renombrar y que se actualice todo).",
          "Ejemplos mencionados: Visual Studio Code, IntelliJ, Eclipse, NetBeans, PyCharm y Visual Studio (este último suele usarse mucho en C++).",
        ],
      },
      {
        title: "Unidad 3: Depuración y pruebas",
        content: [
          "Un bug es un fallo del programa, y depurar es encontrarlo y arreglarlo mirando qué está pasando realmente al ejecutar.",
          "Un depurador permite parar en breakpoints, ejecutar paso a paso y ver valores de variables; también hay breakpoints condicionales y evaluación de expresiones para casos concretos.",
          "Errores de sintaxis se detectan antes de ejecutar; errores de ejecución o de lógica aparecen al correr el programa y suelen requerir depuración.",
          'Las pruebas unitarias son tests automáticos que comprueban funciones con datos de ejemplo para detectar fallos y evitar "regresiones" tras cambios.',
        ],
      },
      {
        title: "Unidades 4–6: Git y UML",
        content: [
          "Git es un control de versiones distribuido: guarda el historial de cambios y cada copia local tiene el historial completo; se asocia a su creación por Linus Torvalds en 2005 para el kernel de Linux.",
          "Conceptos básicos: repositorio, working directory, staging y commit; comandos típicos: init/status/add/commit/log/clone/push/pull/remote add, además de trabajar con local y remoto (p. ej., GitHub), configurar usuario y usar .gitignore.",
          'UML es un lenguaje de diagramas para modelar software; hay diagramas de estructura (lo "estático") y de comportamiento (cómo se usa/interactúa).',
          "Los casos de uso (UML) muestran actores, funcionalidades y el límite del sistema, y pueden relacionarse con include (siempre se incluye), extend (opcional según condición) y generalización (especialización).",
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: "¿Qué describe mejor un lenguaje de alto nivel?",
        options: [
          "Ofrece una sintaxis más cercana al lenguaje humano.",
          "Se ejecuta solo como binario sin traducción.",
          "Es siempre más rápido que ensamblador.",
          "Solo sirve para sistemas operativos.",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "¿Qué hace principalmente un compilador?",
        options: [
          "Ejecuta el código línea por línea a medida que se lee.",
          "Traduce el programa completo antes de ejecutarlo.",
          "Evita que existan bugs automáticamente.",
          "Solo funciona en lenguajes interpretados.",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "¿Qué lenguaje se ejecuta habitualmente sobre una máquina virtual?",
        options: ["C", "Java", "Bash", "Ensamblador"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "¿Qué caracteriza al ensamblador?",
        options: [
          "Requiere JVM para funcionar.",
          "Está formado por instrucciones simbólicas cercanas al código máquina.",
          "No permite acceso al hardware.",
          "Es el más rápido de programar.",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'En POO, una clase se considera "plantilla" porque…',
        options: [
          "Es una copia exacta de un objeto existente.",
          "Solo almacena datos, nunca métodos.",
          "Define la estructura de los objetos creados a partir de ella.",
          "Ejecuta automáticamente todo el programa.",
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: "¿Qué describe mejor el polimorfismo?",
        options: [
          "Todas las clases deben tener los mismos atributos.",
          "Métodos con el mismo nombre pueden comportarse distinto según el contexto.",
          "Un objeto solo puede tener un método.",
          "Las clases solo pueden almacenar números.",
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "¿Cuál es el objetivo principal del encapsulamiento?",
        options: [
          "Aumentar velocidad de compilación sacrificando legibilidad.",
          "Garantizar que los atributos se cambian mediante métodos controlados.",
          "Permitir heredar de múltiples clases siempre.",
          "Evitar el uso de constructores.",
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "Una ventaja típica de las metodologías ágiles es…",
        options: [
          "Obligan a terminar el proyecto antes de mostrarlo al cliente.",
          "Eliminan reuniones.",
          "Entregas frecuentes y mejora continua.",
          "No requieren feedback del cliente.",
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        question: "En Scrum, ¿quién maximiza el valor del producto?",
        options: ["Scrum Master", "Product Owner", "Desarrollador líder", "Stakeholder"],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: "El modelo en cascada se caracteriza por…",
        options: [
          "Iteraciones constantes con feedback continuo.",
          "Fases rígidas y secuenciales.",
          "Ausencia total de documentación.",
          "Uso exclusivo en proyectos ágiles.",
        ],
        correctAnswer: 1,
      },
      {
        id: 11,
        question: "¿Cuál es un componente habitual de un IDE?",
        options: [
          "Antivirus integrado obligatorio",
          "Editor con resaltado de sintaxis",
          "Gestor de impresoras",
          "Driver de GPU",
        ],
        correctAnswer: 1,
      },
      {
        id: 12,
        question: 'La "asistencia de código" (autocompletado) sirve para…',
        options: [
          "Ejecutar pruebas automáticamente sin configurarlas.",
          "Sugerir instrucciones/métodos mientras escribes.",
          "Renombrar el disco duro del sistema.",
          "Convertir el PC en servidor.",
        ],
        correctAnswer: 1,
      },
      {
        id: 13,
        question: "Un depurador (debugger) permite…",
        options: [
          "Instalar librerías del sistema.",
          "Analizar paso a paso y ver valores de variables.",
          "Convertir código en lenguaje máquina.",
          "Encriptar el repositorio Git.",
        ],
        correctAnswer: 1,
      },
      {
        id: 14,
        question: "¿Qué hace un gestor de dependencias?",
        options: [
          "Modifica la RAM para acelerar el IDE.",
          "Instala y actualiza librerías/paquetes del proyecto.",
          "Sustituye a Git.",
          "Crea automáticamente diagramas UML.",
        ],
        correctAnswer: 1,
      },
      {
        id: 15,
        question: "git add se utiliza para…",
        options: [
          "Preparar archivos para el commit (staging area).",
          "Descargar cambios del remoto.",
          "Deshacer el último commit siempre.",
          "Fusionar ramas.",
        ],
        correctAnswer: 0,
      },
      {
        id: 16,
        question: "Un git commit sirve para…",
        options: [
          'Guardar una "foto" de cambios preparados con un mensaje.',
          "Subir cambios al remoto obligatoriamente.",
          "Crear un repositorio remoto en GitHub.",
          "Borrar el historial de Git.",
        ],
        correctAnswer: 0,
      },
      {
        id: 17,
        question: "git push…",
        options: [
          "Sincroniza remoto → local.",
          "Sube local → remoto.",
          "Borra archivos ignorados.",
          "Solo funciona si no hay commits.",
        ],
        correctAnswer: 1,
      },
      {
        id: 18,
        question: "Un conflicto suele aparecer cuando…",
        options: [
          "El repositorio remoto está vacío.",
          "Nunca hubo un commit.",
          "Dos ramas cambian la misma zona del código.",
          "Clonas el repositorio en otra carpeta.",
        ],
        correctAnswer: 2,
      },
      {
        id: 19,
        question: "git checkout / git switch se usan principalmente para…",
        options: [
          "Subir cambios al remoto.",
          "Cambiar de rama.",
          "Crear commits automáticos.",
          "Ver el historial (log).",
        ],
        correctAnswer: 1,
      },
      {
        id: 20,
        question: "¿Qué comando muestra el historial de commits?",
        options: ["git status", "git log", "git init", "git add"],
        correctAnswer: 1,
      },
      {
        id: 21,
        question: "¿Para qué sirve .gitignore?",
        options: [
          "Guardar el historial del repositorio.",
          "Ocultar archivos del sistema operativo.",
          "Indicar archivos/carpetas que Git no debe rastrear.",
          "Forzar un merge sin conflictos.",
        ],
        correctAnswer: 2,
      },
      {
        id: 22,
        question: "¿Qué diferencia clave hay entre Git y GitHub?",
        options: [
          "Git es la plataforma web y GitHub el comando de terminal.",
          "Git es el sistema de control de versiones; GitHub es una plataforma para repositorios remotos.",
          "Git y GitHub son lo mismo con distinto nombre.",
          "Git solo sirve para proyectos privados.",
        ],
        correctAnswer: 1,
      },
      {
        id: 23,
        question: "¿Qué es un fork en GitHub?",
        options: [
          "Descargar un repo remoto al PC.",
          "Una copia del repo original en tu propia cuenta de GitHub.",
          "Un comando de Git para borrar ramas.",
          "Un tipo de commit.",
        ],
        correctAnswer: 1,
      },
      {
        id: 24,
        question: "¿Qué diferencia clave hay entre fork y clone?",
        options: [
          "Fork = copia remoto→remoto; clone = copia remoto→local.",
          "Fork = copia local→remoto; clone = copia local→local.",
          "Fork solo existe en Linux; clone solo en Windows.",
          "Son sinónimos exactos.",
        ],
        correctAnswer: 0,
      },
      {
        id: 25,
        question: "git fetch se usa para…",
        options: [
          "Traer cambios del remoto sin fusionar automáticamente.",
          "Subir cambios forzando el historial.",
          "Crear una rama nueva y moverse a ella.",
          "Reescribir todos los commits en uno.",
        ],
        correctAnswer: 0,
      },
      {
        id: 26,
        question: "¿Qué hace git merge normally?",
        options: [
          "Combina cambios de ramas (puede generar commit de merge).",
          "Convierte un repo en público.",
          "Elimina el directorio .git.",
          "Cambia el editor por defecto.",
        ],
        correctAnswer: 0,
      },
      {
        id: 27,
        question: "¿Qué describe mejor git rebase frente a merge?",
        options: [
          "Rebase crea siempre conflictos imposibles.",
          "Rebase reescribe historial para dejarlo más lineal.",
          "Rebase solo existe en GitHub Desktop.",
          "Merge elimina el historial anterior.",
        ],
        correctAnswer: 1,
      },
      {
        id: 28,
        question: "UML se usa principalmente para…",
        options: [
          "Compilar más rápido.",
          "Modelar/diseñar sistemas software de forma visual.",
          "Sustituir la documentación.",
          "Crear bases de datos automáticamente.",
        ],
        correctAnswer: 1,
      },
      {
        id: 29,
        question: "Un diagrama de casos de uso representa…",
        options: [
          "La estructura de clases con atributos y métodos.",
          "La interacción de usuarios/actores con el sistema (funcionalidades).",
          "Servidores y despliegue físico del sistema.",
          "El empaquetado (packages) de Java.",
        ],
        correctAnswer: 1,
      },
      {
        id: 30,
        question: "En casos de uso UML, la relación <<extend>> indica…",
        options: [
          "Un caso de uso obligatorio siempre.",
          "Un comportamiento opcional bajo condiciones.",
          "Una herencia entre clases.",
          "Un actor que pasa dentro del sistema.",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "programacion",
    name: "Programación",
    icon: "💻",
    color: "from-purple-500 to-pink-600",
    theory: [
      {
        title: "Tipos y conversiones (U2)",
        content: [
          "En Java hay tipos primitivos (guardan el valor directamente: int, double, boolean, etc.) y tipos de referencia (guardan una referencia a un objeto, como String).",
          'Cada tipo tiene un rango; si te sales puede haber overflow o errores, y al convertir ("casting") de un tipo grande a uno pequeño puedes perder información (por ejemplo, double a int pierde decimales).',
          "Literales: los decimales suelen ser double por defecto; para float se usa sufijo f/F y para long a veces L cuando el número no cabe en int.",
        ],
      },
      {
        title: "Control y arrays/colecciones (U3–U4)",
        content: [
          'Estructuras de control: if/else, switch (con case, default y break para evitar que "caiga" al siguiente caso), y bucles for, while, do-while (este último ejecuta al menos una vez).',
          "Entrada por teclado con Scanner: leer números o texto cambia el método usado y si el usuario mete un tipo inesperado pueden aparecer errores.",
          "Arrays: empiezan en índice 0 y se recorre normally con i < array.length; for es útil si necesitas índice y for-each si solo necesitas valores.",
          'ArrayList es una "lista dinámica" (crece/disminuye) y suele usarse con genéricos como ArrayList<String>; en matrices (int[][]) se accede con [fila][columna] y se recorre con bucles anidados.',
        ],
      },
      {
        title: "Métodos y POO base/avanzada (U5–U10)",
        content: [
          'Un método (función) en Java se define con una "firma" (modificadores como public/static, tipo de retorno como void o un tipo, nombre y parámetros).',
          "Sobrecarga: puedes tener varios métodos con el mismo nombre si cambian los parámetros (cantidad/tipos), pero no vale cambiar solo el tipo de retorno.",
          "Paso de datos: Java pasa por valor; en primitivos no cambias el valor externo, pero con objetos/arrays puedes modificar su contenido porque lo que se copia es la referencia.",
          "POO: clase = molde, objeto = instancia; encapsulación = atributos private y acceso con métodos; y en String, == compara referencias, mientras que equals() compara contenido.",
          'Interfaces y herencia: una interface define un contrato de métodos; el polimorfismo permite tratar objetos distintos de forma común (por ejemplo, una lista de "cosas que implementan X").',
        ],
      },
      {
        title: "JSON, Maven y persistencia simple (U11)",
        content: [
          "JSON es un formato de intercambio de datos (muy usado en APIs) y Maven gestiona dependencias del proyecto mediante el pom.xml.",
          'Con librerías tipo Gson/Jackson, puedes "exportar" objetos a JSON (serializar) y "importarlos" de vuelta (deserializar), normally leyendo/escribiendo ficheros en UTF‑8 y controlando errores de E/S.',
          "Detalle típico de colecciones: si una colección es final, no puedes reasignar la referencia, pero sí puedes modificar su contenido (añadir/quitar elementos).",
        ],
      },
      {
        title: "Calidad, recursividad y JavaFX (U12–U14–U21)",
        content: [
          "assert sirve para comprobar condiciones durante el desarrollo; en Java suelen estar desactivadas por defecto y no sustituyen a las excepciones (que son para errores en ejecución controlados).",
          "JUnit permite pruebas automatizadas con anotaciones (por ejemplo @Test) para validar comportamiento sin probar manualmente todo cada vez.",
          "Recursividad: una función se llama a sí misma y necesita caso base + paso recursivo; en Java puede fallar si hay demasiadas llamadas por límite de pila (stack).",
          "JavaFX es un framework de interfaces gráficas; suele separar vista (FXML, que es XML y puede llevar CSS) y lógica (controlador), y en proyectos se apoya en Maven y herramientas visuales como Scene Builder.",
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: "En JSON, ¿qué delimitador indica un array (lista)?",
        options: ["()", "{}", "[]", "<>"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "En JSON, ¿qué delimitador indica un objeto?",
        options: ["()", "{}", "[]", "<>"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Según el temario, ¿para qué se usa JSON de forma típica?",
        options: [
          'Persistencia "real" como una base de datos',
          "Intercambio de datos entre aplicaciones/cliente-servidor",
          "Compilar código Java",
          "Reemplazar a JDBC",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "En JSON, ¿cómo se representan los booleanos?",
        options: ['"true" y "false"', "True y False", "true y false", "1 y 0"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "En un proyecto Java con Maven, ¿en qué archivo se añaden dependencias (p. ej. Gson)?",
        options: ["build.gradle", "pom.xml", "settings.json", "manifest.mf"],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: "¿Cuál es el propósito principal de Maven mencionado en clase para este tema?",
        options: [
          "Diseñar interfaces JavaFX",
          "Gestionar dependencias del proyecto",
          "Depurar recursividad",
          "Crear XML automáticamente",
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "En Gson, ¿qué método se usa para convertir un objeto Java a JSON (serializar)?",
        options: ["fromJson()", "toJson()", "parse()", "encode()"],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "En Gson, ¿qué método se usa para convertir JSON a objeto Java (deserializar)?",
        options: ["toJson()", "fromJson()", "stringify()", "marshal()"],
        correctAnswer: 1,
      },
      {
        id: 9,
        question:
          "Al escribir/leer ficheros (exportar/importar JSON), ¿qué tipo de excepción se indicó que suele gestionarse?",
        options: ["NullPointerException", "IOException", "ArithmeticException", "ClassNotFoundException"],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: 'En Gson, ¿qué opción se usa para generar JSON "bonito" (indentado/legible)?',
        options: ["setPrettyPrinting()", "enableIndent()", "formatJson(true)", "beautify()"],
        correctAnswer: 0,
      },
      {
        id: 11,
        question: "En una función recursiva, ¿qué elemento es imprescindible para que no se llame indefinidamente?",
        options: ["Un bucle for", "Un caso base (condición de parada)", "Un Scanner", "Un switch"],
        correctAnswer: 1,
      },
      {
        id: 12,
        question:
          "En el ejemplo de factorial recursivo, ¿qué se devuelve en el caso base para no alterar la multiplicación final?",
        options: ["0", "1", "-1", "n"],
        correctAnswer: 1,
      },
      {
        id: 13,
        question: '¿Qué describe mejor "backtracking" en los ejemplos recursivos vistos?',
        options: [
          "La fase de entrada donde se hacen las operaciones finales",
          "La fase de vuelta donde se consolidan operaciones (multiplicaciones/sumas)",
          "Un tipo de bucle do-while",
          "Un modo de JavaFX para volver a una Scene anterior",
        ],
        correctAnswer: 1,
      },
      {
        id: 14,
        question: "En la suma recursiva de un array, ¿por qué se añadió un parámetro índice i además del vector?",
        options: [
          "Para ordenar el array antes de sumarlo",
          'Porque el array no "se reduce" solo y hay que indicar la posición actual',
          "Para evitar usar return",
          "Para poder usar switch",
        ],
        correctAnswer: 1,
      },
      {
        id: 15,
        question: "En los ejemplos, ¿cuál fue una condición de parada típica al recorrer un vector recursivamente?",
        options: ["i == v.length", "i == -1", "v[i] == 0", "v.length == 0 siempre"],
        correctAnswer: 0,
      },
      {
        id: 16,
        question:
          "¿Qué operación se usa para obtener el último dígito de un entero (p. ej. en sumar dígitos recursivo)?",
        options: ["n / 10", "n % 10", "n * 10", "n + 10"],
        correctAnswer: 1,
      },
      {
        id: 17,
        question:
          '¿Qué operación se usa para "quitar" el último dígito de un entero en los ejemplos (avance recursivo)?',
        options: ["n % 10", "n / 10", "n * 10", "n - 10"],
        correctAnswer: 1,
      },
      {
        id: 18,
        question: "En clase se comparó rendimiento: para sumar elementos de un vector, normally es más rápido…",
        options: [
          "El enfoque recursivo que el iterativo",
          "El enfoque iterativo que el recursivo",
          "Da exactamente igual siempre",
          "Depende solo de System.nanoTime()",
        ],
        correctAnswer: 1,
      },
      {
        id: 19,
        question: "¿Qué riesgo se explicó al subir mucho el tamaño de un problema recursivo (ej. 10.000+ llamadas)?",
        options: [
          "Se corrompe el pom.xml",
          "Desbordamiento de la pila de llamadas (stack) / exceso de llamadas",
          "Se convierte automáticamente a bucle for",
          "JavaFX deja de cargar FXML",
        ],
        correctAnswer: 1,
      },
      {
        id: 20,
        question: 'Según lo explicado, la recursividad se usa "de verdad" sobre todo al recorrer…',
        options: [
          "Tablas SQL con JDBC",
          "Árboles/grafos (estructuras tipo nodos)",
          "Strings con equals()",
          "CSS de JavaFX",
        ],
        correctAnswer: 1,
      },
      {
        id: 21,
        question: "En JavaFX con FXML, ¿qué atributo vincula un componente con una variable del controlador?",
        options: ["fx:id", "id", "name", "controllerId"],
        correctAnswer: 0,
      },
      {
        id: 22,
        question: "En JavaFX, ¿qué debe cumplirse para que un Label del FXML se inyecte bien en el controlador?",
        options: [
          "Que el fx:id y el nombre del campo coincidan exactamente",
          "Que el fx:id sea distinto del nombre del campo",
          "Que el campo sea public static",
          "Que el Label no tenga fx:id",
        ],
        correctAnswer: 0,
      },
      {
        id: 23,
        question:
          "Si en FXML el fx:id es LBLResultado, pero en el controller el campo se llama lblResultado, lo más probable es…",
        options: [
          "Funciona igual porque Java ignora mayúsculas/minúsculas",
          "No se inyecta y puede dar null al usarlo",
          "Se convierte automáticamente a String",
          "Solo falla si el botón no tiene onAction",
        ],
        correctAnswer: 1,
      },
      {
        id: 24,
        question:
          "En JavaFX, ¿qué atributo se usa típicamente para enlazar un botón con un método (evento) del controlador?",
        options: ["onAction", "onClick", "onPress", "actionListener"],
        correctAnswer: 0,
      },
      {
        id: 25,
        question: "Si el método puesto en onAction no existe o no coincide, normally ocurre…",
        options: [
          "Se ignora y la app sigue sin más",
          "Error al cargar/ejecutar la vista (evento no enlazado correctamente)",
          "Se crea un método vacío automáticamente",
          "Se ejecuta el main dos veces",
        ],
        correctAnswer: 1,
      },
      {
        id: 26,
        question: "En la relación JavaFX, ¿qué afirmación es correcta?",
        options: [
          "Stage va dentro de Scene",
          "Scene va dentro de Stage",
          "Stage y Scene son lo mismo",
          "No existen Stage ni Scene en JavaFX",
        ],
        correctAnswer: 1,
      },
      {
        id: 27,
        question: "Si un Label aparece como null en la lógica, una comprobación prioritaria es…",
        options: [
          "Revisar si el fx:id del FXML coincide con el campo del controller",
          "Cambiar Label por TextField",
          "Quitar Maven",
          "Cambiar System.out.println por printf",
        ],
        correctAnswer: 0,
      },
      {
        id: 28,
        question:
          "En el ejemplo de la calculadora, un fallo típico era tener una letra mayúscula distinta en el nombre del Label entre vista y controlador. Esto se debe a que…",
        options: [
          "FXML siempre convierte a minúsculas",
          "Los nombres son sensibles a mayúsculas/minúsculas",
          "JavaFX solo permite variables en mayúsculas",
          "Maven fuerza un estilo de nombres",
        ],
        correctAnswer: 1,
      },
      {
        id: 29,
        question: "¿Qué estructura representa un JSON como [{...},{...}]?",
        options: ["Un objeto", "Un array de objetos", "Un string", "Un mapa de claves sin valores"],
        correctAnswer: 1,
      },
      {
        id: 30,
        question:
          "En recursividad, si una función se llama a sí misma sin alcanzar nunca el caso base, el resultado típico es…",
        options: [
          "Devuelve null automáticamente",
          "Recursión infinita hasta fallo/stack overflow",
          "Se detiene sola en 10 llamadas",
          "Se convierte en un bucle while",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    color: "from-yellow-500 to-orange-500",
    theory: [
      {
        title: "Unidad 1: Python básico",
        content: [
          "Python es un lenguaje de propósito general que normally se ejecuta con un intérprete (vas ejecutando el programa sin generar un ejecutable 'a mano' como en C).",
          "Interpretado vs compilado: en interpretado el código se va ejecutando 'sobre la marcha', y en compilado primero se traduce a código máquina y luego se ejecuta.",
          "Tipado dinámico: no dices el tipo al declarar; depende del valor que tenga la variable en ese momento.",
          "Tipado fuerte: si intentas mezclar tipos incompatibles (por ejemplo, número con texto) te dará error si no conviertes.",
          "Tipos básicos: str (texto), int (enteros), float (decimales), bool (True/False) y complex (complejos).",
          "Variables y print: se asigna con nombre = valor y para imprimir texto debes usar comillas, porque sin comillas se interpreta como una variable.",
          "Versiones: lo normal es usar una versión estable y con soporte para evitar fallos y problemas de seguridad.",
        ],
      },
      {
        title: "Unidad 2: Operadores y control",
        content: [
          "Operadores: + - * / // % **; / da resultado decimal, // hace división entera (sin decimales) y % devuelve el resto.",
          "El módulo % se usa mucho para par/impar (resto 0 o 1) y para comprobar múltiplos.",
          "Booleanos y comparaciones: se usan True/False, comparadores (== != < <= > >=) y lógica (and, or, not) para tomar decisiones.",
          "Casting: input() devuelve texto, así que para operar con números hay que convertir con int() o float().",
          "Cadenas: split() separa texto, lower() pasa a minúsculas y len() cuenta longitud.",
          "Condicionales: if/elif/else ejecuta una parte u otra según se cumpla una condición.",
          "Bucles: for con range() (el final no se incluye) y while para repetir hasta que se cumpla algo; break corta y continue salta a la siguiente vuelta.",
        ],
      },
      {
        title: "Unidad 3: Colecciones",
        content: [
          "Listas []: conjuntos ordenados y mutables, con índices desde 0 (y negativos para contar desde el final). Sintaxis: mi_lista = [1, 2, 3]",
          "Métodos típicos: append/insert (añadir), remove/pop (quitar), sort/reverse (ordenar) y len() (tamaño).",
          "Diccionarios {clave: valor}: guardan datos como clave → valor, se accede por la clave y se pueden recorrer con keys(), values() e items(). Sintaxis: mi_dict = {'nombre': 'Juan', 'edad': 25}",
          "Tuplas (): parecidas a listas pero no se pueden modificar; se usan para datos fijos y permiten 'desempaquetar' (ej.: a, b = tupla). Sintaxis: mi_tupla = (1, 2, 3)",
          "Sets {}: conjuntos no ordenados de elementos únicos (sin duplicados). Sintaxis: mi_set = {1, 2, 3}",
          "Recorridos: puedes iterar por elementos o por índice, y usar bucles anidados para estructuras tipo 'lista de listas'.",
        ],
      },
      {
        title: "Unidad 4: Funciones",
        content: [
          "Una función es un bloque reutilizable con nombre: recibe parámetros y puede devolver un resultado; se define con def y se llama por su nombre.",
          "Puede no tener parámetros, no devolver nada, o devolver uno o varios valores (varios valores se comportan como una tupla).",
          "Ámbito: lo creado dentro de la función suele ser 'local' y no afecta fuera salvo que se devuelva o se modifique algo compartido.",
          "Parámetros: pueden tener valores por defecto para que sean opcionales.",
          "Paso de datos: con tipos simples suele 'parecer copia', pero con listas/diccionarios puedes cambiar su contenido desde dentro.",
        ],
      },
      {
        title: "Unidad 5: Archivos y errores",
        content: [
          "Abrir archivos: open(ruta, modo), donde r lee, w escribe sobrescribiendo y a añade al final.",
          "Leer/escribir: read/readline/readlines leen, y write/writelines escriben.",
          "with open(...) as f: asegura que el archivo se cierra automáticamente al acabar.",
          "Errores (excepciones): try/except captura fallos (archivo inexistente, datos mal formateados) y raise permite lanzar errores propios.",
        ],
      },
      {
        title: "Unidad 7: Automatización (os, sys, csv)",
        content: [
          "os sirve para trabajar con carpetas y rutas (listar, crear/borrar, comprobar si existe algo y unir rutas).",
          "sys.argv permite pasar parámetros al programa desde la terminal (por ejemplo, la ruta de una carpeta a procesar).",
          "csv lee y escribe ficheros CSV con reader/writer, para tratar datos tabulares fila a fila.",
          "La idea es combinar funciones + os + sys + csv para automatizar tareas reales (limpieza, informes, procesamiento de logs, etc.).",
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: "En Python, ¿qué palabra clave se usa para definir una función?",
        options: ["func", "def", "function", "lambda"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "¿Qué instrucción se usa para devolver un valor desde una función?",
        options: ["yield", "print", "return", "break"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "¿Qué ocurre si llamas a una función que no tiene return y haces print(funcion())?",
        options: ["Imprime 0", "Imprime False", "Imprime None", "Lanza TypeError"],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "¿Cuál es el propósito principal de usar funciones en un programa?",
        options: [
          "Hacer el programa más lento",
          "Evitar bucles",
          "Reutilizar código y modularizar",
          "Eliminar variables",
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "¿Cuál es la sintaxis correcta de una función con parámetro por defecto?",
        options: ["def f(x := 3):", "def f(x = 3):", "def f(x default 3):", "def f(x, default=3):"],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: "Si una función devuelve suma, resta, ¿cómo se asigna correctamente a dos variables?",
        options: [
          "x = operaciones(10,4)",
          "x, y = operaciones(10,4)",
          "x:y = operaciones(10,4)",
          "x <- y <- operaciones(10,4)",
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "Respecto al 'scope' (ámbito) en funciones, ¿qué afirmación es correcta?",
        options: [
          "Las variables locales siempre modifican las globales",
          "Las variables definidas dentro de una función no existen fuera de ella",
          "Python no tiene ámbito",
          "El ámbito solo afecta a if pero no a funciones",
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "Al pasar un int a una función y modificarlo dentro, normally…",
        options: [
          "Se modifica el int original fuera de la función",
          "No cambia el valor original fuera porque se pasa una copia",
          "Se borra la variable original",
          "Se convierte automáticamente a float",
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: "Al pasar una list a una función y modificar sus elementos dentro, normally…",
        options: [
          "No se modifica la lista original fuera",
          "Se modifica la lista original fuera",
          "Se produce siempre IndexError",
          "La lista se convierte en tupla",
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: "¿Qué convención de nombres se recomendó para funciones/variables en Python?",
        options: ["camelCase", "PascalCase", "snake_case", "kebab-case"],
        correctAnswer: 2,
      },
      {
        id: 11,
        question: "¿Qué función se usa para abrir un archivo en Python?",
        options: ["file()", "open()", "read()", "load()"],
        correctAnswer: 1,
      },
      {
        id: 12,
        question: "¿Qué modo de open() se usa para lectura?",
        options: ["w", "a", "r", "rw"],
        correctAnswer: 2,
      },
      {
        id: 13,
        question: "¿Qué modo de open() se usa para escribir sobrescribiendo el contenido?",
        options: ["r", "w", "a", "x"],
        correctAnswer: 1,
      },
      {
        id: 14,
        question: "¿Qué modo de open() se usa para añadir contenido al final sin borrar lo anterior?",
        options: ["a", "w", "r", "ra"],
        correctAnswer: 0,
      },
      {
        id: 15,
        question: "¿Qué método lee el archivo completo y devuelve un único str?",
        options: ["read()", "readline()", "readlines()", "lines()"],
        correctAnswer: 0,
      },
      {
        id: 16,
        question: "¿Qué método devuelve una lista donde cada elemento suele ser una línea del fichero?",
        options: ["read()", "readline()", "readlines()", "splitlines(False)"],
        correctAnswer: 2,
      },
      {
        id: 17,
        question: "¿Qué estructura se recomendó para abrir y cerrar automáticamente un archivo incluso si hay error?",
        options: ["try/finally sin más", "with open(...) as f:", "close(open(...))", "open(...).safe()"],
        correctAnswer: 1,
      },
      {
        id: 18,
        question: "Si quieres contar palabras de un texto leído por líneas, una forma típica es…",
        options: [
          "palabras += len(line.split())",
          "palabras += line.len()",
          "palabras += count(line)",
          "palabras += sum(line)",
        ],
        correctAnswer: 0,
      },
      {
        id: 19,
        question: "Para sustituir una palabra por otra en el contenido de un archivo, lo más típico es…",
        options: [
          "Convertirlo a binario",
          "Leerlo, aplicar reemplazo, y escribirlo",
          "Ejecutar chmod",
          "Usar sys.argv obligatoriamente",
        ],
        correctAnswer: 1,
      },
      {
        id: 20,
        question: "Para buscar una palabra ignorando mayúsculas/minúsculas, una técnica común es…",
        options: [
          "Comparar con == sin tocar nada",
          "Usar lower()/upper() en ambas partes",
          "Usar int()",
          "Convertir a dict",
        ],
        correctAnswer: 1,
      },
      {
        id: 21,
        question: "¿Qué bloque se usa para capturar errores en Python?",
        options: ["catch {}", "try/except", "if/error", "guard/except"],
        correctAnswer: 1,
      },
      {
        id: 22,
        question: "¿Qué palabra clave se usa para lanzar una excepción manualmente?",
        options: ["throw", "raise", "panic", "except"],
        correctAnswer: 1,
      },
      {
        id: 23,
        question: "Si un script espera un fichero como argumento y el fichero no existe, una práctica vista fue…",
        options: ["Ignorar el fallo", "raise FileNotFoundError('...')", "return 'ok'", "Convertir la ruta a int"],
        correctAnswer: 1,
      },
      {
        id: 24,
        question: "¿Qué módulo se usa para operaciones del sistema (directorios/archivos) como listar o renombrar?",
        options: ["fs", "os", "io", "pathlib2"],
        correctAnswer: 1,
      },
      {
        id: 25,
        question: "¿Qué función devuelve el directorio de trabajo actual?",
        options: ["os.cwd()", "os.getcwd()", "os.pwd()", "os.workdir()"],
        correctAnswer: 1,
      },
      {
        id: 26,
        question: "¿Qué función lista los elementos de un directorio?",
        options: ["os.list()", "os.listdir()", "os.ls()", "os.scan()"],
        correctAnswer: 1,
      },
      {
        id: 27,
        question: "¿Qué función comprueba si existe una ruta?",
        options: ["os.path.exists()", "os.exists()", "path.exists()", "os.path.is()"],
        correctAnswer: 0,
      },
      {
        id: 28,
        question: "Sobre sys.argv, ¿qué afirmación es correcta según lo visto?",
        options: [
          "No incluye el nombre del script",
          "Incluye el nombre del script en argv[0]",
          "Solo sirve en Windows",
          "Siempre tiene longitud 0",
        ],
        correctAnswer: 1,
      },
      {
        id: 29,
        question: "En CSV, ¿qué módulo se usa para leer/escribir CSV 'bien formateado' en Python?",
        options: ["excel", "csv", "pandas", "table"],
        correctAnswer: 1,
      },
      {
        id: 30,
        question: "En csv.writer(..., delimiter=...), ¿para qué sirve delimiter?",
        options: [
          "Cambiar el salto de línea",
          "Elegir el carácter separador entre campos (coma, punto y coma, etc.)",
          "Encriptar el fichero",
          "Ordenar las columnas",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "marcas",
    name: "Lenguaje de Marcas",
    icon: "🏷️",
    color: "from-pink-500 to-rose-600",
    theory: [
      {
        title: "Unidad 1: HTML y marcas",
        items: [
          "Un lenguaje de marcas usa etiquetas para estructurar información (ej.: HTML, XML) y no 'programa' lógica como tal.",
          "En la web: HTML pone la estructura/contenido, CSS pone el estilo visual y JavaScript añade comportamiento/interactividad.",
          "Un HTML5 típico se divide en <!DOCTYPE html>, <html>, <head> (metadatos) y <body> (lo visible).",
          "En <head>: charset='UTF-8' evita problemas con caracteres, viewport ayuda en móviles y metas como description se usan para describir la página.",
          "Etiquetas básicas: títulos <h1>…<h6>, párrafos <p> y listas <ul>/<ol> con <li>.",
          "Atributos clave: href (enlaces), src (ruta de imagen), alt (texto alternativo), title (tooltip) e id (identificador único).",
          "Clasificación típica: presentación (HTML+CSS), estructuración de datos (XML) y transformación (XSLT).",
          "Entorno común: editar con VS Code y previsualizar con Live Server en una URL local (mejor que abrir el archivo desde el disco).",
        ],
      },
      {
        title: "Unidad 2: CSS esencial",
        items: [
          "Lo recomendable es separar estilos en un .css y enlazarlo con <link rel='stylesheet' href='styles.css'>.",
          "Selectores: por etiqueta (p), por clase (.clase), por id (#id), combinados (section p) y pseudo-clases (a:hover).",
          "id se usa para un elemento único; class se reutiliza en muchos elementos para aplicar el mismo estilo.",
          "Propiedades típicas: color (texto), background-color (fondo), tipografía (font-*), alineación (text-*) y caja (margin/padding/border).",
          "Box model: un elemento tiene contenido + padding + border + margin, y un 'reset' común pone márgenes a 0 y usa box-sizing: border-box.",
          "Maquetación: display:block ocupa toda la línea, inline ocupa lo justo, y flex facilita alinear y repartir elementos.",
          "Unidades: px es fijo, y %/em/rem/vw/vh se adaptan mejor a pantallas distintas.",
          "Responsive: con @media (max-width: ...) o @media (min-width: ...) cambias estilos según el tamaño de pantalla.",
        ],
      },
      {
        title: "Unidad 2: JavaScript básico",
        items: [
          "JavaScript maneja tipos como números, texto, booleanos, null, undefined, arrays y objetos, y no obliga a declarar tipos.",
          "Variables: se recomienda let y const (ámbito de bloque); var tiene comportamiento más antiguo (ámbito de función y 'hoisting').",
          "Funciones: bloques reutilizables con function nombre(param){...} que pueden devolver un valor con return o no.",
          "DOM: el navegador representa el HTML como objetos y se puede seleccionar con getElementById, querySelector o querySelectorAll para cambiar contenido/estilos.",
          "Eventos: puedes reaccionar a acciones (click, etc.) con onclick o mejor con addEventListener, y leer formularios con input.value.",
          "Comparaciones: == convierte tipos (más 'permisivo') y === compara tipo y valor (más seguro).",
          "Temporizadores: setInterval repite, setTimeout ejecuta una vez, y se cancelan con clearInterval/clearTimeout.",
          "Aleatorios: Math.random() da un valor entre 0 y 1, y con Math.floor/round se llevan a enteros.",
        ],
      },
      {
        title: "Unidad 3: XML y derivados (DTD/XSD/XPath/XQuery/XSLT/RSS/JSON)",
        items: [
          "XML sirve para estructurar datos con tus propias etiquetas, y puede estar 'bien formado' (reglas correctas) o además 'válido' si cumple una definición (DTD o XSD).",
          "DTD define qué elementos/atributos se permiten y cuántas veces aparecen (símbolos ?, *, +, y atributos como #REQUIRED).",
          "XSD es más potente que DTD porque permite tipos de datos y restricciones (xs:string, minOccurs/maxOccurs, etc.).",
          "XPath selecciona partes de un XML con rutas (/, //), atributos (@) y filtros por posición ([1], [last()]).",
          "XQuery consulta/transforma XML con un esquema tipo FLWR (for/where/order by/return) y funciones como count().",
          "XSLT transforma XML a otros formatos (muy típico a HTML) usando plantillas y elementos como value-of, for-each, sort y condicionales.",
          "RSS es un XML 'estándar' para feeds con <rss>, un <channel> y varios <item> con campos como title/link/description.",
          "JSON representa datos con objetos {} y arrays [] y se usa mucho en APIs por ser ligero y fácil de procesar.",
        ],
      },
    ],
    questions: [
      {
        question: "¿Qué indica <!DOCTYPE html> al inicio de un documento?",
        options: [
          "Que el documento está en XML.",
          "Que el navegador debe usar el modo estándar (HTML5).",
          "Que el documento usa JavaScript.",
          "Que el documento está validado por W3C.",
        ],
        correct: 1,
      },
      {
        question: "¿Para qué sirve lang='es' en <html lang='es'>?",
        options: [
          "Para cambiar el color por defecto.",
          "Para indicar el idioma principal a navegador/buscadores.",
          "Para habilitar JavaScript.",
          "Para definir el 'viewport'.",
        ],
        correct: 1,
      },
      {
        question: "¿Dónde debe ir el contenido visible principal de la página?",
        options: ["En <head>.", "En <meta>.", "En <body>.", "En <!DOCTYPE html>."],
        correct: 2,
      },
      {
        question: "¿Cuál es la sintaxis correcta de un comentario en HTML?",
        options: ["// comentario", "/* comentario */", "<!-- comentario -->", "# comentario"],
        correct: 2,
      },
      {
        question: "¿Qué atributo se usa típicamente para enlazar un CSS externo en HTML?",
        options: ["src", "href", "alt", "lang"],
        correct: 1,
      },
      {
        question: "¿Cuál es la forma recomendada de enlazar un archivo JavaScript externo al HTML según lo explicado?",
        options: [
          "<link rel='script' href='...'>",
          "<script href='...'></script>",
          "<script src='...'></script>",
          "<js src='...'></js>",
        ],
        correct: 2,
      },
      {
        question: "¿Dónde se recomienda colocar el <script src='...'> para priorizar que cargue el contenido?",
        options: [
          "Al inicio de <head>.",
          "Al final de <body>, antes de su cierre.",
          "Entre </head> y <body>.",
          "Da igual, siempre se ejecuta igual.",
        ],
        correct: 1,
      },
      {
        question: "¿Qué método se usa para imprimir por consola en JavaScript?",
        options: ["print()", "console.log()", "System.out.println()", "document.print()"],
        correct: 1,
      },
      {
        question: "En JavaScript, ¿qué palabra clave se indica como la habitual/recomendada frente a var?",
        options: ["let", "int", "define", "static"],
        correct: 0,
      },
      {
        question: "¿Qué diferencia se explica entre var y let?",
        options: [
          "let tiene ámbito de bloque; var tiene ámbito de función.",
          "let se usa solo en HTML.",
          "var obliga a tipar el dato.",
          "let no permite guardar números.",
        ],
        correct: 0,
      },
      {
        question: "¿Qué es el DOM según la explicación del profesor?",
        options: [
          "Un servidor para alojar páginas.",
          "La estructura de objetos que genera el navegador al cargar el documento.",
          "Un formato de imagen web.",
          "Un tipo de CSS para móviles.",
        ],
        correct: 1,
      },
      {
        question: "¿Qué hace document.querySelector('#caja') en el enfoque mostrado?",
        options: [
          "Selecciona todos los elementos con id caja.",
          "Selecciona un único elemento que coincide con el selector (id caja).",
          "Selecciona todos los elementos con clase caja.",
          "Crea un nuevo elemento div.",
        ],
        correct: 1,
      },
      {
        question: "¿Para qué sirve document.querySelectorAll('.cajas')?",
        options: [
          "Devuelve una colección (NodeList) con todos los elementos que coinciden.",
          "Devuelve solo el primer elemento que coincide.",
          "Cambia el color del body.",
          "Valida el HTML con W3C.",
        ],
        correct: 0,
      },
      {
        question: "¿Qué propiedad se usa en JS para aplicar estilos directamente a un elemento (según el ejemplo)?",
        options: [".css()", ".style", ".design", ".paint"],
        correct: 1,
      },
      {
        question: "¿Cuál es la definición correcta de una función (según la clase)?",
        options: [
          "Se ejecuta siempre al cargar el archivo.",
          "Es un bloque de código que solo se ejecuta cuando es llamado.",
          "Es un tipo de variable numérica.",
          "Es una etiqueta HTML.",
        ],
        correct: 1,
      },
      {
        question:
          "En CSS, ¿qué unidad se explica que '1 rem' equivale al tamaño por defecto del elemento raíz (HTML), típicamente 16px?",
        options: ["em", "rem", "%", "vh"],
        correct: 1,
      },
      {
        question: "Según lo explicado, ¿en qué se basa rem?",
        options: [
          "En el tamaño del elemento padre directo.",
          "En el tamaño del elemento raíz (HTML).",
          "En el ancho del monitor.",
          "En el color del fondo.",
        ],
        correct: 1,
      },
      {
        question: "Según lo explicado, ¿en qué se basa em?",
        options: [
          "En el tamaño fuente del elemento padre.",
          "En el tamaño fuente del elemento raíz siempre.",
          "En la resolución del navegador.",
          "En el atributo lang.",
        ],
        correct: 0,
      },
      {
        question: "¿Qué hace display: block (idea principal)?",
        options: [
          "No inicia nueva línea y no acepta ancho/alto.",
          "Oculta el elemento.",
          "Ocupa todo el ancho disponible e inicia en línea nueva.",
          "Convierte el elemento en un grid.",
        ],
        correct: 2,
      },
      {
        question: "¿Qué hace display: inline (idea principal)?",
        options: [
          "Ocupa todo el ancho disponible.",
          "No inicia nueva línea y ocupa solo su contenido (sin ancho/alto).",
          "Siempre crea un scroll horizontal.",
          "Es obligatorio para <div>.",
        ],
        correct: 1,
      },
      {
        question: "¿Qué ventaja tiene display: inline-block frente a inline?",
        options: [
          "Permite definir ancho y alto.",
          "Oculta el elemento.",
          "Fuerza salto de línea siempre.",
          "Desactiva herencia.",
        ],
        correct: 0,
      },
      {
        question: "¿Para qué se usa :hover en CSS?",
        options: [
          "Para cambiar estilos cuando el cursor está encima del elemento.",
          "Para crear funciones JS.",
          "Para declarar variables.",
          "Para validar XML.",
        ],
        correct: 0,
      },
      {
        question: "¿Qué propiedad CSS se mostró para suavizar cambios (p. ej., en hover) con tiempo?",
        options: ["transition", "opacity-lock", "render-delay", "smooth()"],
        correct: 0,
      },
      {
        question: "¿Qué propiedad CSS se mostró para redondear esquinas de una caja?",
        options: ["border-smooth", "border-radius", "corner-round", "outline-radius"],
        correct: 1,
      },
      {
        question: "¿Qué estructura base se menciona para un documento XML (modelo conceptual)?",
        options: [
          "Lista plana sin jerarquía.",
          "Árbol de nodos con un nodo raíz.",
          "Tabla con filas/columnas obligatoria.",
          "Solo texto sin etiquetas.",
        ],
        correct: 1,
      },
      {
        question: "En DTD, ¿qué significa ? aplicado a un elemento (ocurrencias)?",
        options: ["0 o 1 vez.", "0 o más veces.", "1 o más veces.", "Exactamente 2 veces."],
        correct: 0,
      },
      {
        question: "En DTD, ¿qué significa * aplicado a un elemento (ocurrencias)?",
        options: ["0 o 1 vez.", "0 o más veces.", "1 o más veces.", "Exactamente 1 vez."],
        correct: 1,
      },
      {
        question: "En XPath, ¿qué significa // en una ruta?",
        options: [
          "Ruta absoluta desde la raíz únicamente.",
          "Selección del nodo padre.",
          "Búsqueda en cualquier nivel del documento.",
          "Selección de atributos.",
        ],
        correct: 2,
      },
      {
        question: "En XSLT, ¿qué hace xsl:value-of select='...'?",
        options: [
          "Recorre una lista de nodos repetidamente.",
          "Extrae/muestra el valor de un nodo según una expresión XPath.",
          "Ordena resultados.",
          "Declara un atributo DTD.",
        ],
        correct: 1,
      },
      {
        question: "En XSLT, ¿qué hace xsl:for-each select='...'?",
        options: [
          "Repite un bloque para cada nodo que coincide con la selección.",
          "Inserta un script JavaScript.",
          "Convierte JSON a XML.",
          "Cambia el doctype del HTML.",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "sistemas",
    name: "Sistemas",
    icon: "🖥️",
    color: "from-slate-400 to-zinc-500",
    theory: [],
    questions: [],
  },
]

type CourseId = "1dam" | "2dam"
type Screen = "courses" | "subjects" | "detail" | "test"
type ThemeMode = "dark" | "light"
type AnswerResult = "correct" | "wrong" | "blank"

type CourseConfig = {
  id: CourseId
  title: string
  kicker: string
  description: string
  subjects: Subject[]
  exam?: {
    format: string
    questionCount: number
    penalty: string
    strategy: string[]
  }
}

const secondDamAccents = [
  "#5eead4",
  "#93c5fd",
  "#fbbf24",
  "#fb7185",
  "#a78bfa",
  "#34d399",
  "#f97316",
  "#c084fc",
  "#60a5fa",
]

const firstDamAccents = ["#5eead4", "#93c5fd", "#fbbf24", "#fb7185", "#a78bfa", "#34d399"]

const firstDamSubjects: Subject[] = subjects.map((subject, index) => ({
  ...subject,
  accent: firstDamAccents[index % firstDamAccents.length],
  questions: subject.questions.map((question, questionIndex) => ({
    ...question,
    id: question.id ?? questionIndex + 1,
    correctAnswer: question.correctAnswer ?? question.correct ?? 0,
  })),
}))

const secondDamData = [
  pspData,
  accesoDatosData,
  multimediaData,
  desarrolloInterfacesData,
  gestionEmpresarialData,
  digitalizacionData,
  sostenibilidadData,
  itpData,
  inglesData,
]

const invalidOptionLabels = [
  "respuesta parecida pero incorrecta",
  "concepto de otra asignatura",
  "opcion demasiado absoluta",
  "opción demasiado absoluta",
]

function hasPlaceholderOption(options: string[]) {
  return options.some((option) => invalidOptionLabels.includes(option.trim().toLowerCase()))
}

function mapNewQuestions(subject: (typeof secondDamData)[number]): Question[] {
  return subject.preguntas
    .filter((question) => !hasPlaceholderOption(question.opciones))
    .map((question) => ({
      id: question.id,
      question: question.pregunta,
      options: question.opciones,
      correctAnswer: Math.max(question.opciones.indexOf(question.respuesta_correcta), 0),
      explanation: question.explicacion,
    }))
}

function mapOldQuestions(oldSubject: (typeof studyInfo.asignaturas)[number]): Question[] {
  return oldSubject.preguntas_tipo_test.map((question, questionIndex) => ({
    id: questionIndex + 1,
    question: question.pregunta,
    options: question.opciones,
    correctAnswer: Math.max(question.opciones.indexOf(question.respuesta_correcta), 0),
    explanation: question.explicacion,
  }))
}

const secondDamSubjects: Subject[] = secondDamData.map((subject, index) => {
  const oldSubject = studyInfo.asignaturas[index]
  const newQuestions = mapNewQuestions(subject)

  return {
    id: subject.slug,
    name: subject.asignatura,
    icon: getInitials(subject.asignatura),
    color: "",
    accent: secondDamAccents[index % secondDamAccents.length],
    difficulty: subject.dificultad,
    priority: subject.prioridad,
    likely: oldSubject.lo_que_mas_probablemente_sale,
    cheatSheet: oldSubject.chuleta,
    probableQuestions: oldSubject.preguntas_muy_probables,
    theory: [
      {
        title: "Temario super resumido",
        content: oldSubject.temario_super_resumido,
      },
      {
        title: "Lo que más probablemente sale",
        content: oldSubject.lo_que_mas_probablemente_sale,
      },
      {
        title: "Chuleta",
        content: oldSubject.chuleta,
      },
    ],
    questions: newQuestions.length > 0 ? newQuestions : mapOldQuestions(oldSubject),
  }
})

const courses: Record<CourseId, CourseConfig> = {
  "1dam": {
    id: "1dam",
    title: "1 DAM",
    kicker: "Primer curso",
    description: "Banco actual de teoría y tests.",
    subjects: firstDamSubjects,
  },
  "2dam": {
    id: "2dam",
    title: "2 DAM",
    kicker: "Segundo curso",
    description: studyPack.descripcion,
    subjects: secondDamSubjects,
    exam: {
      format: studyPack.pack.toLowerCase().includes("tipo test") ? "Tipo test" : "Test",
      questionCount: studyPack.configuracion_examen_general.numero_preguntas,
      penalty: formatPenalty(studyPack.configuracion_examen_general.puntuacion.incorrecta),
      strategy: studyPack.configuracion_examen_general.estrategia,
    },
  },
}

function formatPenalty(value: number) {
  if (Math.abs(value + 1 / 3) < 0.0001) return "Fallo: -1/3"
  return `Fallo: ${value}`
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function getInitials(value: string) {
  const words = value.split(/\s+/).filter(Boolean)
  if (words.length === 0) return "DAM"
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
}

function getQuestionAnswer(question: Question) {
  const answer = question.correctAnswer ?? question.correct ?? 0
  if (answer < 0 || answer >= question.options.length) return 0
  return answer
}

function getQuestionCount(subjectsToCount: Subject[]) {
  return subjectsToCount.reduce((total, subject) => total + subject.questions.length, 0)
}

function accentStyle(accent?: string) {
  return { "--accent": accent ?? "#5eead4" } as CSSProperties
}

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>("dark")
  const [screen, setScreen] = useState<Screen>("courses")
  const [courseId, setCourseId] = useState<CourseId | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [query, setQuery] = useState("")

  const course = courseId ? courses[courseId] : null

  const visibleSubjects = useMemo(() => {
    if (!course) return []
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return course.subjects
    return course.subjects.filter((subject) => subject.name.toLowerCase().includes(normalizedQuery))
  }, [course, query])

  const selectCourse = (nextCourseId: CourseId) => {
    setCourseId(nextCourseId)
    setSelectedSubject(null)
    setQuery("")
    setScreen("subjects")
  }

  const selectSubject = (subject: Subject) => {
    setSelectedSubject(subject)
    setScreen("detail")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goBack = () => {
    if (screen === "test") {
      setScreen("detail")
      return
    }

    if (screen === "detail") {
      setSelectedSubject(null)
      setScreen("subjects")
      return
    }

    if (screen === "subjects") {
      setCourseId(null)
      setSelectedSubject(null)
      setQuery("")
      setScreen("courses")
    }
  }

  return (
    <main className="study-app" data-theme={theme}>
      <div className="study-shell">
        <TopBar
          canGoBack={screen !== "courses"}
          onBack={goBack}
          theme={theme}
          onToggleTheme={() => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
        />

        {screen === "courses" && <CoursePicker onSelect={selectCourse} />}

        {screen === "subjects" && course && (
          <SubjectBrowser course={course} query={query} onQueryChange={setQuery} onSelectSubject={selectSubject}>
            {visibleSubjects}
          </SubjectBrowser>
        )}

        {screen === "detail" && course && selectedSubject && (
          <SubjectStudy subject={selectedSubject} course={course} onStartTest={() => setScreen("test")} />
        )}

        {screen === "test" && course && selectedSubject && (
          <TestPanel
            key={`${course.id}-${selectedSubject.id}`}
            subject={selectedSubject}
            showPenalty={course.id === "2dam"}
            onBack={goBack}
          />
        )}
      </div>
    </main>
  )
}

function TopBar({
  canGoBack,
  onBack,
  theme,
  onToggleTheme,
}: {
  canGoBack: boolean
  onBack: () => void
  theme: ThemeMode
  onToggleTheme: () => void
}) {
  return (
    <header className="study-topbar">
      <button className="icon-button" onClick={onBack} disabled={!canGoBack} aria-label="Volver">
        <ArrowLeft aria-hidden="true" />
      </button>
      <div className="brand-lockup">
        <span className="brand-mark">DAM</span>
        <span>Repaso</span>
      </div>
      <button className="icon-button" onClick={onToggleTheme} aria-label="Cambiar tema">
        {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </button>
    </header>
  )
}

function CoursePicker({ onSelect }: { onSelect: (course: CourseId) => void }) {
  return (
    <section className="course-screen">
      <div className="hero-copy">
        <p className="eyebrow">Repaso rápido</p>
        <h1>Repaso DAM</h1>
        <p>Elige curso y entra directo a teoría, chuletas y test.</p>
      </div>

      <div className="course-grid" aria-label="Cursos">
        {(Object.values(courses) as CourseConfig[]).map((course) => (
          <button key={course.id} className="course-tile" onClick={() => onSelect(course.id)}>
            <span className="course-kicker">{course.kicker}</span>
            <strong className="course-title">
              {course.title.split(" ").map((part) => (
                <span key={part}>{part}</span>
              ))}
            </strong>
            <span className="course-meta">
              {course.subjects.length} asignaturas · {getQuestionCount(course.subjects)} preguntas
            </span>
            <ChevronRight aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  )
}

function SubjectBrowser({
  course,
  query,
  onQueryChange,
  onSelectSubject,
  children: subjectsToRender,
}: {
  course: CourseConfig
  query: string
  onQueryChange: (value: string) => void
  onSelectSubject: (subject: Subject) => void
  children: Subject[]
}) {
  return (
    <section className="stacked-screen">
      <div className="screen-heading">
        <p className="eyebrow">{course.kicker}</p>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>

      <div className="metrics-grid">
        <Metric icon={<BookOpen aria-hidden="true" />} label="Asignaturas" value={course.subjects.length.toString()} />
        <Metric
          icon={<ClipboardCheck aria-hidden="true" />}
          label="Preguntas"
          value={getQuestionCount(course.subjects).toString()}
        />
        <Metric
          icon={<Target aria-hidden="true" />}
          label={course.id === "2dam" ? "Formato" : "Modo"}
          value={course.exam?.format ?? "Repaso"}
        />
      </div>

      {course.exam && (
        <div className="exam-strip">
          <span>{course.exam.questionCount} preguntas</span>
          <span>{course.exam.penalty}</span>
        </div>
      )}

      <label className="search-box">
        <Search aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar asignatura"
          type="search"
        />
      </label>

      <div className="subject-list">
        {subjectsToRender.map((subject, index) => (
          <button
            key={subject.id}
            className="subject-card"
            style={accentStyle(subject.accent)}
            onClick={() => onSelectSubject(subject)}
          >
            <span className="subject-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="subject-body">
              <strong>{subject.name}</strong>
              <span>
                {subject.questions.length} preguntas
                {subject.priority ? ` · prioridad ${subject.priority}` : ""}
              </span>
            </span>
            <ChevronRight aria-hidden="true" />
          </button>
        ))}
      </div>

      {course.exam && (
        <details className="study-section compact">
          <summary>
            <Sparkles aria-hidden="true" />
            Estrategia
          </summary>
          <ul>
            {course.exam.strategy.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      )}
    </section>
  )
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="metric-card">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function SubjectStudy({
  subject,
  course,
  onStartTest,
}: {
  subject: Subject
  course: CourseConfig
  onStartTest: () => void
}) {
  return (
    <section className="stacked-screen">
      <div className="subject-hero" style={accentStyle(subject.accent)}>
        <div className="subject-mark">{getInitials(subject.name)}</div>
        <div>
          <p className="eyebrow">{course.title}</p>
          <h1>{subject.name}</h1>
          <div className="chip-row">
            {subject.difficulty && <span>Dificultad {subject.difficulty}</span>}
            {subject.priority && <span>Prioridad {subject.priority}</span>}
            <span>{subject.questions.length} preguntas</span>
          </div>
        </div>
      </div>

      <button className="primary-action" onClick={onStartTest}>
        <ListChecks aria-hidden="true" />
        Empezar test
        <ChevronRight aria-hidden="true" />
      </button>

      <div className="section-stack">
        {subject.theory.length > 0 ? (
          subject.theory.map((section, index) => (
            <StudySection key={`${subject.id}-${section.title}`} section={section} defaultOpen={index === 0} />
          ))
        ) : (
          <div className="empty-state">Sin teoría disponible.</div>
        )}

        {subject.probableQuestions && subject.probableQuestions.length > 0 && (
          <details className="study-section">
            <summary>
              <Target aria-hidden="true" />
              {subject.probableQuestionsTitle ?? "Preguntas muy probables"}
            </summary>
            <div className="qa-list">
              {subject.probableQuestions.map((item) => (
                <article key={item.pregunta} className="qa-card">
                  <strong>{item.pregunta}</strong>
                  <span>{item.respuesta}</span>
                </article>
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}

function StudySection({ section, defaultOpen = false }: { section: TheorySection; defaultOpen?: boolean }) {
  const items = section.content ?? section.items ?? []

  return (
    <details className="study-section" open={defaultOpen}>
      <summary>
        <BookOpen aria-hidden="true" />
        {section.title}
      </summary>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Sin contenido disponible.</p>
      )}
    </details>
  )
}

function TestPanel({
  subject,
  showPenalty,
  onBack,
}: {
  subject: Subject
  showPenalty: boolean
  onBack: () => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<AnswerResult[]>([])

  const questions = subject.questions
  const question = questions[currentQuestion]
  const correctAnswer = question ? getQuestionAnswer(question) : 0
  const correctCount = answers.filter((answer) => answer === "correct").length
  const wrongCount = answers.filter((answer) => answer === "wrong").length
  const blankCount = answers.filter((answer) => answer === "blank").length
  const penaltyScore = Math.max(0, correctCount - wrongCount / 3)

  const finishOrNext = (result: AnswerResult) => {
    const nextAnswers = [...answers, result]
    setAnswers(nextAnswers)

    if (currentQuestion >= questions.length - 1) {
      setFinished(true)
      return
    }

    setCurrentQuestion((value) => value + 1)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const restart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setFinished(false)
    setAnswers([])
  }

  if (questions.length === 0) {
    return (
      <section className="stacked-screen">
        <div className="empty-state">Sin preguntas disponibles.</div>
      </section>
    )
  }

  if (finished) {
    const percentage = Math.round((correctCount / questions.length) * 100)

    return (
      <section className="stacked-screen">
        <div className="result-card">
          <div className="result-ring">{percentage}%</div>
          <p className="eyebrow">{subject.name}</p>
          <h1>Resultado</h1>
          <div className="result-grid">
            <span>
              <strong>{correctCount}</strong>
              Aciertos
            </span>
            <span>
              <strong>{wrongCount}</strong>
              Fallos
            </span>
            <span>
              <strong>{blankCount}</strong>
              Blanco
            </span>
          </div>
          {showPenalty && <p className="penalty-note">Puntuación con penalización: {penaltyScore.toFixed(2)}</p>}
          <div className="action-row">
            <button className="secondary-action" onClick={onBack}>
              <ArrowLeft aria-hidden="true" />
              Volver
            </button>
            <button className="primary-action compact-action" onClick={restart}>
              <RotateCcw aria-hidden="true" />
              Repetir
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="test-screen" style={accentStyle(subject.accent)}>
      <div className="test-progress">
        <span>
          {currentQuestion + 1}/{questions.length}
        </span>
        <div>
          <i style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <article className="question-card">
        <p className="eyebrow">{subject.name}</p>
        <h1>{question.question}</h1>
      </article>

      <div className="answer-list">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === correctAnswer
          const isWrongSelection = showResult && isSelected && !isCorrect

          return (
            <button
              key={option}
              className="answer-option"
              data-selected={isSelected}
              data-correct={showResult && isCorrect}
              data-wrong={isWrongSelection}
              onClick={() => {
                if (!showResult) setSelectedAnswer(index)
              }}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{option}</strong>
              {showResult && isCorrect && <Check aria-hidden="true" />}
              {isWrongSelection && <X aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      {showResult && question.explanation && <p className="explanation">{question.explanation}</p>}

      <div className="test-actions">
        {!showResult ? (
          <>
            <button className="secondary-action" onClick={() => finishOrNext("blank")}>
              Dejar en blanco
            </button>
            <button
              className="primary-action compact-action"
              disabled={selectedAnswer === null}
              onClick={() => setShowResult(true)}
            >
              Confirmar
            </button>
          </>
        ) : (
          <button
            className="primary-action"
            onClick={() => finishOrNext(selectedAnswer === correctAnswer ? "correct" : "wrong")}
          >
            {currentQuestion < questions.length - 1 ? "Siguiente" : "Ver resultado"}
            <ChevronRight aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  )
}
