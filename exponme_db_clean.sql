DROP TABLE IF EXISTS busquedas CASCADE;
DROP TABLE IF EXISTS reportes CASCADE;
DROP TYPE IF EXISTS tipo_reporte CASCADE;
DROP TYPE IF EXISTS genero CASCADE;

CREATE TYPE genero AS ENUM ('hombre', 'mujer');
CREATE TYPE tipo_reporte AS ENUM ('infiel', 'cachudo');

CREATE TABLE reportes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255),
  edad INTEGER NOT NULL,
  ciudad VARCHAR(255) NOT NULL,
  genero genero NOT NULL,
  tipo_reporte tipo_reporte NOT NULL DEFAULT 'infiel',
  fecha TIMESTAMP NOT NULL DEFAULT NOW(),
  descripcion TEXT NOT NULL,
  denuncias INTEGER DEFAULT 1,
  red_social VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reportes_nombre_apellido ON reportes(nombre, apellido);
CREATE INDEX IF NOT EXISTS idx_reportes_ciudad ON reportes(ciudad);
CREATE INDEX IF NOT EXISTS idx_reportes_genero ON reportes(genero);
CREATE INDEX IF NOT EXISTS idx_reportes_tipo_reporte ON reportes(tipo_reporte);
CREATE INDEX IF NOT EXISTS idx_reportes_fecha ON reportes(fecha);

CREATE TABLE busquedas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  termino VARCHAR(255) NOT NULL,
  ciudad VARCHAR(255),
  genero genero,
  fecha TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_busquedas_termino ON busquedas(termino);
CREATE INDEX IF NOT EXISTS idx_busquedas_fecha ON busquedas(fecha);

INSERT INTO reportes (id, nombre, apellido, edad, ciudad, genero, tipo_reporte, fecha, descripcion, denuncias, red_social, created_at, updated_at) VALUES
  ('876564b4-508d-49ab-9a48-ff7955adf856', 'villa kbrejo', 'waaa', 23, 'Lima', 'hombre', 'cachudo', '2025-12-06T08:18:49.474Z', 'esaaa', 1, '@villakbroaa', '2025-12-06T08:18:49.474Z', '2025-12-06T08:18:49.474Z'),
  ('94d4dd8b-f7d6-4c48-a4d6-a31dbc248cd9', 'villa kbro', 'eskbroaaaa', 42, 'Lima', 'mujer', 'infiel', '2025-12-06T08:16:14.794Z', 'aaa', 1, '@pepe', '2025-12-06T08:16:14.794Z', '2025-12-06T08:16:14.794Z'),
  ('2a5a9830-62cc-448e-a16e-697265dbe145', 'villa kbro', 'pablito', 21, 'Lima', 'hombre', 'infiel', '2025-12-06T08:15:44.073Z', 'asdw', 1, '@pablo', '2025-12-06T08:15:44.073Z', '2025-12-06T08:15:44.073Z'),
  ('9d447f69-0106-4b91-8f34-5a25e6c80528', 'villa', 'eskbro', 23, 'Lima', 'hombre', 'infiel', '2025-12-06T07:27:09.165Z', 'LE HICIERON INFIEL 999 VECES JSJAJAJAJA', 1, '@villakbro', '2025-12-06T07:27:09.165Z', '2025-12-06T07:27:09.165Z'),
  ('20fcb60a-13f3-4ecb-9454-132cac308089', 'Francisco', 'Ibarra', 31, 'Ica', 'hombre', 'infiel', '2025-12-06T07:10:16.567Z', 'Infidelidad', 1, '@francisco_iba', '2025-12-06T07:10:16.567Z', '2025-12-06T07:10:16.567Z'),
  ('c4121cc4-5b20-421c-8413-998b3123d027', 'Adriana', 'Ponce', 26, 'Ica', 'mujer', 'infiel', '2025-12-06T07:10:16.461Z', 'Engaño', 2, '@adriana_pon', '2025-12-06T07:10:16.461Z', '2025-12-06T07:10:16.461Z'),
  ('407e7bf6-e8fc-409c-ac09-0871a612dfce', 'Fernanda', 'Molina', 29, 'Ica', 'mujer', 'infiel', '2025-12-06T07:10:16.358Z', 'Infiel', 1, '@fernanda_mol', '2025-12-06T07:10:16.358Z', '2025-12-06T07:10:16.358Z'),
  ('42da239f-9772-42ed-8bd7-30f79c22c0bd', 'Alejandro', 'Carrillo', 33, 'Callao', 'hombre', 'infiel', '2025-12-06T07:10:16.255Z', 'Infidelidad', 1, '@alejandro_car', '2025-12-06T07:10:16.255Z', '2025-12-06T07:10:16.255Z'),
  ('8f9c2b25-e342-46c7-a4c2-1076a62fe644', 'Carolina', 'Ríos', 28, 'Callao', 'mujer', 'infiel', '2025-12-06T07:10:16.152Z', 'Engaño', 2, '@carolina_río', '2025-12-06T07:10:16.152Z', '2025-12-06T07:10:16.152Z'),
  ('8f5a1249-e0b9-4a86-a63a-24044b265a2c', 'Daniela', 'Acosta', 30, 'Callao', 'mujer', 'infiel', '2025-12-06T07:10:16.049Z', 'Infiel', 1, '@daniela_aco', '2025-12-06T07:10:16.049Z', '2025-12-06T07:10:16.049Z'),
  ('2a3f2a73-919f-4296-80fa-a97da2ada3fb', 'Valeria', 'Peña', 27, 'Piura', 'mujer', 'infiel', '2025-12-06T07:10:15.946Z', 'Infidelidad', 1, '@valeria_peñ', '2025-12-06T07:10:15.946Z', '2025-12-06T07:10:15.946Z'),
  ('9e3fcbe5-2e16-4d60-9ed0-b6ac7a7b644f', 'Manuel', 'Figueroa', 29, 'Piura', 'hombre', 'infiel', '2025-12-06T07:10:15.841Z', 'Infiel', 1, '@manuel_fig', '2025-12-06T07:10:15.841Z', '2025-12-06T07:10:15.841Z'),
  ('eaf6309b-dd66-4e49-b0fb-a08f19eb0b1b', 'Andrés', 'Cortés', 31, 'Piura', 'hombre', 'infiel', '2025-12-06T07:10:15.738Z', 'Engaño', 2, '@andrés_cor', '2025-12-06T07:10:15.738Z', '2025-12-06T07:10:15.738Z'),
  ('5522c2cc-0c0c-4e89-8760-85204d21736f', 'Natalia', 'Salazar', 28, 'La Libertad', 'mujer', 'infiel', '2025-12-06T07:10:15.635Z', 'Infidelidad', 1, '@natalia_sal', '2025-12-06T07:10:15.635Z', '2025-12-06T07:10:15.635Z'),
  ('1b90cb49-82c0-42f8-8003-09731f68f168', 'Luis', 'Montes', 32, 'La Libertad', 'hombre', 'infiel', '2025-12-06T07:10:15.533Z', 'Infiel', 1, '@luis_mon', '2025-12-06T07:10:15.533Z', '2025-12-06T07:10:15.533Z'),
  ('e8378fde-66b3-4a12-b264-52673bd8e74b', 'Camila', 'Navarro', 29, 'La Libertad', 'mujer', 'infiel', '2025-12-06T07:10:15.429Z', 'Engaño', 2, '@camila_nav', '2025-12-06T07:10:15.429Z', '2025-12-06T07:10:15.429Z'),
  ('6efe97a4-e5ba-4f48-b28a-9d22bcc2de3f', 'Isabella', 'Reyes', 26, 'La Libertad', 'mujer', 'infiel', '2025-12-06T07:10:15.326Z', 'Infidelidad', 1, '@isabella_rey', '2025-12-06T07:10:15.326Z', '2025-12-06T07:10:15.326Z'),
  ('16c72c1d-b3a2-4c76-b3b1-c89cc0a5b536', 'Daniel', 'Paredes', 34, 'Cusco', 'hombre', 'infiel', '2025-12-06T07:10:15.223Z', 'Infiel', 1, '@daniel_par', '2025-12-06T07:10:15.223Z', '2025-12-06T07:10:15.223Z'),
  ('9da4c316-19c4-4473-83a0-6c1ce58ab0f4', 'Gabriela', 'Campos', 27, 'Cusco', 'mujer', 'infiel', '2025-12-06T07:10:15.121Z', 'Infidelidad', 1, '@gabriela_cam', '2025-12-06T07:10:15.121Z', '2025-12-06T07:10:15.121Z'),
  ('8a4bc150-56e1-4325-a215-77e056b1eeaf', 'Antonio', 'Herrera', 30, 'Cusco', 'hombre', 'infiel', '2025-12-06T07:10:15.018Z', 'Engaño', 2, '@antonio_her', '2025-12-06T07:10:15.018Z', '2025-12-06T07:10:15.018Z'),
  ('b87ebc2b-e812-4b71-8398-d8b61a82685d', 'Javier', 'Gutiérrez', 33, 'Cusco', 'hombre', 'infiel', '2025-12-06T07:10:14.912Z', 'Infiel', 1, '@javier_gut', '2025-12-06T07:10:14.912Z', '2025-12-06T07:10:14.912Z'),
  ('fc98843c-f081-4dff-b7ae-fcc983ee1b86', 'Ricardo', 'Ortiz', 31, 'Áncash', 'hombre', 'infiel', '2025-12-06T07:10:14.809Z', 'Engaño', 2, '@ricardo_ort', '2025-12-06T07:10:14.809Z', '2025-12-06T07:10:14.809Z'),
  ('7f383815-5647-404f-8dab-8a0b361210d6', 'Sandra', 'Méndez', 28, 'Áncash', 'mujer', 'infiel', '2025-12-06T07:10:14.707Z', 'Infiel', 1, '@sandra_mén', '2025-12-06T07:10:14.707Z', '2025-12-06T07:10:14.707Z'),
  ('9dbfa77a-8a03-4fb0-bb71-5961f11927e6', 'Alberto', 'Ruiz', 35, 'Áncash', 'hombre', 'infiel', '2025-12-06T07:10:14.603Z', 'Infidelidad', 3, '@alberto_rui', '2025-12-06T07:10:14.603Z', '2025-12-06T07:10:14.603Z'),
  ('2cc05bb5-36a6-40c8-b1c0-a754b795eb8f', 'Fernando', 'Vargas', 29, 'Áncash', 'hombre', 'infiel', '2025-12-06T07:10:14.500Z', 'Engaño', 1, '@fernando_var', '2025-12-06T07:10:14.500Z', '2025-12-06T07:10:14.500Z'),
  ('e81bea06-73f7-42b2-bb94-bb272ff67ede', 'Miguel', 'Castro', 32, 'Áncash', 'hombre', 'infiel', '2025-12-06T07:10:14.396Z', 'Infiel', 2, '@miguel_cas', '2025-12-06T07:10:14.396Z', '2025-12-06T07:10:14.396Z'),
  ('caae09ed-ef7a-430d-9335-31cf05c95ada', 'Lucía', 'Morales', 30, 'Arequipa', 'mujer', 'infiel', '2025-12-06T07:10:14.293Z', 'Engaño', 2, '@lucía_mor', '2025-12-06T07:10:14.293Z', '2025-12-06T07:10:14.293Z'),
  ('53b88e5a-bdbb-4a8c-a6f4-668db63ef810', 'Valentina', 'Rojas', 27, 'Arequipa', 'mujer', 'infiel', '2025-12-06T07:10:14.190Z', 'Infidelidad', 1, '@valentina_roj', '2025-12-06T07:10:14.190Z', '2025-12-06T07:10:14.190Z'),
  ('3f4010de-63c3-438b-b391-d6fc3808da74', 'Roberto', 'Flores', 34, 'Arequipa', 'hombre', 'infiel', '2025-12-06T07:10:14.087Z', 'Infiel', 1, '@roberto_flo', '2025-12-06T07:10:14.087Z', '2025-12-06T07:10:14.087Z'),
  ('a707290d-2fbd-4865-9ec7-717549d6b33a', 'Elena', 'Silva', 31, 'Arequipa', 'mujer', 'infiel', '2025-12-06T07:10:13.984Z', 'Engaño', 2, '@elena_sil', '2025-12-06T07:10:13.984Z', '2025-12-06T07:10:13.984Z'),
  ('f46fac24-7623-49d5-b5cb-e7830d3c9ef5', 'Diana', 'Cruz', 29, 'Arequipa', 'mujer', 'infiel', '2025-12-06T07:10:13.875Z', 'Infidelidad', 1, '@diana_cru', '2025-12-06T07:10:13.875Z', '2025-12-06T07:10:13.875Z'),
  ('a8f41946-49b8-47b1-b2c6-104dbcae4105', 'Patricia', 'Vega', 28, 'Lima', 'mujer', 'infiel', '2025-12-06T07:10:13.773Z', 'Infiel', 1, '@patricia_veg', '2025-12-06T07:10:13.773Z', '2025-12-06T07:10:13.773Z'),
  ('68271e9a-857a-4c06-a597-8e153faede15', 'Jorge', 'Ramírez', 33, 'Lima', 'hombre', 'infiel', '2025-12-06T07:10:13.670Z', 'Engaño', 2, '@jorge_ram', '2025-12-06T07:10:13.670Z', '2025-12-06T07:10:13.670Z'),
  ('1598f720-6abc-44dc-a4c8-d3be068af8bd', 'Carmen', 'Díaz', 30, 'Lima', 'mujer', 'infiel', '2025-12-06T07:10:13.568Z', 'Infidelidad', 1, '@carmen_día', '2025-12-06T07:10:13.568Z', '2025-12-06T07:10:13.568Z'),
  ('b03c7b5e-75c8-45b9-bdad-d9268f8e73c1', 'Sofía', 'Torres', 27, 'Lima', 'mujer', 'infiel', '2025-12-06T07:10:13.466Z', 'Infiel', 2, '@sofía_tor', '2025-12-06T07:10:13.466Z', '2025-12-06T07:10:13.466Z'),
  ('69576225-d9d7-46b9-b97f-adb2e051628a', 'Pedro', 'Sánchez', 31, 'Lima', 'hombre', 'infiel', '2025-12-06T07:10:13.363Z', 'Engaño', 1, '@pedro_sán', '2025-12-06T07:10:13.363Z', '2025-12-06T07:10:13.363Z'),
  ('bb643ff6-3ca0-4f71-b074-de3395b77702', 'Rosa', 'Fernández', 26, 'Lima', 'mujer', 'infiel', '2025-12-06T07:10:13.260Z', 'Infidelidad', 1, '@rosa_fer', '2025-12-06T07:10:13.260Z', '2025-12-06T07:10:13.260Z'),
  ('abe89d91-c203-4d06-be12-50ec6c792ea7', 'Laura', 'Martínez', 29, 'Lima', 'mujer', 'infiel', '2025-12-06T07:10:13.157Z', 'Doble vida', 2, '@laura_mar', '2025-12-06T07:10:13.157Z', '2025-12-06T07:10:13.157Z'),
  ('e83b3f46-dcfe-44a7-86fa-a92c84506007', 'Carlos', 'Pérez', 35, 'Lima', 'hombre', 'infiel', '2025-12-06T07:10:13.055Z', 'Infiel serial', 3, '@carlos_pér', '2025-12-06T07:10:13.055Z', '2025-12-06T07:10:13.055Z'),
  ('a1caaf7e-8475-421b-add0-235c48292a3b', 'Ana', 'López', 32, 'Lima', 'mujer', 'infiel', '2025-12-06T07:10:12.951Z', 'Engaño confirmado', 1, '@ana_lóp', '2025-12-06T07:10:12.951Z', '2025-12-06T07:10:12.951Z'),
  ('c634990a-e980-4ac9-9e2d-30bce9b3bba4', 'María', 'García', 28, 'Lima', 'mujer', 'infiel', '2025-12-06T07:10:12.700Z', 'Infidelidad comprobada', 2, '@maría_gar', '2025-12-06T07:10:12.700Z', '2025-12-06T07:10:12.700Z');
