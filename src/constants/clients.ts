export type ClientStatus = "Activo" | "Inactivo" | "Suspendido";

export interface Client {
    id: string;
    razonSocial: string;
    cuit: string;
    vencimientoAFIP: string;
    iibb: string;
    vencimientoIIBB: string;
    condicionIVA: string;
    tipoContribuyenteIIBB: string;
    nombreFantasia: string;
    email: string;
    fechaAlta: string;
    fechaBaja?: string;
    fechaUltimaCompra: string;
    estado: ClientStatus;
    rubro: string;
    subRubro: string;
    observaciones: string;

    // Condiciones Comerciales
    condicionVenta: string;
    vendedorAsignado: string;
    bonificaciones: string;
    margenCredito: number;
    listaPrecios: string;
    saldoDeuda: number; // For "Top Deudores"

    // Domicilio
    domicilio: string;
    localidad: string;
    cp: string;
    provincia: string;
    telefono: string;
    responsable: string;
    emailContacto: string;
    esDomicilioEntrega: boolean;
    transporte: string;
    horariosEntrega: string;
}

export type GestionTipo = "Llamada" | "Visita" | "Email" | "Creación de Cuenta";

export interface Gestion {
    id: string;
    tipo: GestionTipo;
    vendedor: string;
    cliente: string;
    fecha: string;
    observaciones: string;
}

export const CLIENTS: Client[] = [
    {
        id: "CL-001",
        razonSocial: "Construcciones Modernas S.A.",
        cuit: "30-71123456-9",
        vencimientoAFIP: "2025-12-31",
        iibb: "901-123456-7",
        vencimientoIIBB: "2025-12-31",
        condicionIVA: "Responsable Inscripto",
        tipoContribuyenteIIBB: "Convenio Multilateral",
        nombreFantasia: "Modern House",
        email: "compras@modernhouse.com.ar",
        fechaAlta: "2022-01-15",
        fechaUltimaCompra: "2024-05-20",
        estado: "Activo",
        rubro: "Ferretería",
        subRubro: "Herramientas Eléctricas",
        observaciones: "Cliente VIP, entrega preferencial los martes.",
        condicionVenta: "30 Días",
        vendedorAsignado: "Juan Pérez",
        bonificaciones: "5% General",
        margenCredito: 5000000,
        listaPrecios: "Mayorista A",
        saldoDeuda: 1250000,
        domicilio: "Av. Libertador 1234",
        localidad: "CABA",
        cp: "1428",
        provincia: "Buenos Aires",
        telefono: "011-4567-8901",
        responsable: "Carlos Gómez",
        emailContacto: "carlos@modernhouse.com.ar",
        esDomicilioEntrega: true,
        transporte: "Expreso Camión Blanco",
        horariosEntrega: "08:00 - 12:00"
    },
    {
        id: "CL-002",
        razonSocial: "Distribuidora San Juan S.R.L.",
        cuit: "30-58876543-2",
        vencimientoAFIP: "2025-06-30",
        iibb: "1234567-8",
        vencimientoIIBB: "2025-06-30",
        condicionIVA: "Responsable Inscripto",
        tipoContribuyenteIIBB: "Contribuyente Local",
        nombreFantasia: "San Juan Mayorista",
        email: "info@distrisanjuan.com",
        fechaAlta: "2021-03-10",
        fechaUltimaCompra: "2023-11-15",
        estado: "Activo",
        rubro: "Iluminación",
        subRubro: "LED Industrial",
        observaciones: "Pendiente de actualización de CUIT.",
        condicionVenta: "Contado",
        vendedorAsignado: "María López",
        bonificaciones: "Sin bonificaciones",
        margenCredito: 2000000,
        listaPrecios: "Minorista",
        saldoDeuda: 0,
        domicilio: "Ruta 40 km 12",
        localidad: "San Juan",
        cp: "5400",
        provincia: "San Juan",
        telefono: "0264-421-3344",
        responsable: "Elena Martínez",
        emailContacto: "elena@distrisanjuan.com",
        esDomicilioEntrega: true,
        transporte: "transporte Propio",
        horariosEntrega: "Todo el día"
    },
    {
        id: "CL-003",
        razonSocial: "AgroIndustria Pampeana",
        cuit: "33-66778899-1",
        vencimientoAFIP: "2024-10-15",
        iibb: "902-887766-5",
        vencimientoIIBB: "2024-10-15",
        condicionIVA: "Exento",
        tipoContribuyenteIIBB: "Convenio Multilateral",
        nombreFantasia: "La Pampa",
        email: "pampa@agro.com.ar",
        fechaAlta: "2020-05-20",
        fechaUltimaCompra: "2021-02-10",
        estado: "Inactivo",
        rubro: "Agroindustria",
        subRubro: "Maquinaria",
        observaciones: "No compra hace más de 3 años.",
        condicionVenta: "60 Días",
        vendedorAsignado: "Juan Pérez",
        bonificaciones: "10% Maquinaria",
        margenCredito: 10000000,
        listaPrecios: "Mayorista B",
        saldoDeuda: 0,
        domicilio: "Calle Real 456",
        localidad: "Santa Rosa",
        cp: "6300",
        provincia: "La Pampa",
        telefono: "02954-432-109",
        responsable: "Ricardo Pampa",
        emailContacto: "ricardo@agro.com.ar",
        esDomicilioEntrega: false,
        transporte: "Expreso Pampero",
        horariosEntrega: "09:00 - 17:00"
    },
    {
        id: "CL-004",
        razonSocial: "Servicios Energéticos del Sur",
        cuit: "30-55443322-7",
        vencimientoAFIP: "2025-01-01",
        iibb: "10-223344-5",
        vencimientoIIBB: "2025-01-01",
        condicionIVA: "Responsable Inscripto",
        tipoContribuyenteIIBB: "Contribuyente Local",
        nombreFantasia: "Energía Sur",
        email: "pagos@energiasur.com.ar",
        fechaAlta: "2023-08-12",
        fechaUltimaCompra: "2024-05-01",
        estado: "Suspendido",
        rubro: "Energía",
        subRubro: "Cables y Conexiones",
        observaciones: "Cuenta suspendida por falta de pago.",
        condicionVenta: "7 Días",
        vendedorAsignado: "Ricardo Darín",
        bonificaciones: "Sin bonificaciones",
        margenCredito: 500000,
        listaPrecios: "Minorista",
        saldoDeuda: 450000,
        domicilio: "Av. Colón 500",
        localidad: "Neuquén",
        cp: "8300",
        provincia: "Neuquén",
        telefono: "0299-445-5667",
        responsable: "Mirta Legrand",
        emailContacto: "mirta@energiasur.com.ar",
        esDomicilioEntrega: true,
        transporte: "Patagonia Cargo",
        horariosEntrega: "08:00 - 13:00"
    }
];

// In a real scenario, I'd generate the remaining 116 records programmatically
// To avoid a massive file here if not needed, I'll stop at these 4 examples 
// But wait, the user asked for 120. I should generate them.
// I'll use a small script to generate the rest.

const rubros = ["Ferretería", "Iluminación", "Agroindustria", "Energía", "Construcción", "Limpieza", "Tecnología", "Textil"];
const vendedores = ["Juan Pérez", "María López", "Ricardo Darín", "Mirta Legrand", "Roberto Sánchez"];
const provincias = ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Tucumán", "Entre Ríos", "Salta", "Misiones"];

for (let i = 5; i <= 120; i++) {
    const id = `CL-${String(i).padStart(3, '0')}`;
    const rubro = rubros[Math.floor(Math.random() * rubros.length)];
    const vendedor = vendedores[Math.floor(Math.random() * vendedores.length)];
    const provincia = provincias[Math.floor(Math.random() * provincias.length)];
    const estado: ClientStatus = i % 10 === 0 ? "Suspendido" : i % 7 === 0 ? "Inactivo" : "Activo";

    CLIENTS.push({
        id,
        razonSocial: `Cliente Genérico ${i} S.A.`,
        cuit: `30-${Math.floor(Math.random() * 90000000) + 10000000}-${Math.floor(Math.random() * 9)}`,
        vencimientoAFIP: "2025-12-31",
        iibb: `${Math.floor(Math.random() * 900)}-${Math.floor(Math.random() * 900000)}-${Math.floor(Math.random() * 9)}`,
        vencimientoIIBB: "2025-12-31",
        condicionIVA: "Responsable Inscripto",
        tipoContribuyenteIIBB: "Convenio Multilateral",
        nombreFantasia: `Fantasia ${i}`,
        email: `cliente${i}@correo.com`,
        fechaAlta: "2022-01-01",
        fechaUltimaCompra: estado === "Inactivo" ? "2020-01-01" : "2024-05-01",
        estado,
        rubro,
        subRubro: `Categoría ${rubro}`,
        observaciones: "Generado automáticamente.",
        condicionVenta: "30 Días",
        vendedorAsignado: vendedor,
        bonificaciones: "Sin bonificaciones",
        margenCredito: Math.floor(Math.random() * 5000000),
        listaPrecios: "Mayorista A",
        saldoDeuda: estado === "Suspendido" ? Math.floor(Math.random() * 1000000) : 0,
        domicilio: `Calle Falsa ${i}`,
        localidad: "Cualquiera",
        cp: "1000",
        provincia,
        telefono: "555-5555",
        responsable: `Responsable ${i}`,
        emailContacto: `contacto${i}@correo.com`,
        esDomicilioEntrega: true,
        transporte: "Expreso Genérico",
        horariosEntrega: "09:00 - 18:00"
    });
}

export const GESTIONES: Gestion[] = [
    {
        id: "G-001",
        tipo: "Creación de Cuenta",
        vendedor: "Sistema",
        cliente: "Construcciones Modernas S.A.",
        fecha: "2022-01-15T10:00:00Z",
        observaciones: "Alta de cliente inicial en el sistema."
    },
    {
        id: "G-002",
        tipo: "Llamada",
        vendedor: "Juan Pérez",
        cliente: "Construcciones Modernas S.A.",
        fecha: "2024-05-18T14:30:00Z",
        observaciones: "Consulta sobre nuevos ingresos de herramientas Bosch."
    },
    {
        id: "G-003",
        tipo: "Visita",
        vendedor: "María López",
        cliente: "Distribuidora San Juan S.R.L.",
        fecha: "2024-05-19T11:00:00Z",
        observaciones: "Reunión presencial para negociar lista de precios Mayorista A."
    },
    {
        id: "G-004",
        tipo: "Email",
        vendedor: "Juan Pérez",
        cliente: "AgroIndustria Pampeana",
        fecha: "2024-05-20T09:15:00Z",
        observaciones: "Se envió catálogo actualizado de maquinaria pesada."
    }
];

// Generate some more mock gestiones
const tiposGestion: GestionTipo[] = ["Llamada", "Visita", "Email"];
for (let i = 5; i <= 25; i++) {
    const tipo = tiposGestion[Math.floor(Math.random() * tiposGestion.length)];
    const vendedor = vendedores[Math.floor(Math.random() * vendedores.length)];
    const cliente = CLIENTS[Math.floor(Math.random() * CLIENTS.length)].razonSocial;

    GESTIONES.push({
        id: `G-${String(i).padStart(3, '0')}`,
        tipo,
        vendedor,
        cliente,
        fecha: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
        observaciones: `Registro de gestión comercial #${i}. Seguimiento de cuenta y prospección.`
    });
}
