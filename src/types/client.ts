export type ClientStatus = 'Activo' | 'Inactivo' | 'Suspendido';

export interface Rubro {
    id: string;
    nombre: string;
}

export interface Subrubro {
    id: string;
    rubroId: string;
    nombre: string;
}

export interface Provincia {
    id: string;
    nombre: string;
}

export interface CondicionIVA {
    id: string;
    nombre: string;
}

export interface TipoContribuyenteIIBB {
    id: string;
    nombre: string;
}

export interface CondicionVenta {
    id: string;
    nombre: string; // CONTADO, CREDITO / CTA CTE
}

export interface Vendedor {
    id: string;
    nombre: string;
    email: string;
    avatar?: string;
}

export interface Bonificacion {
    id: string;
    fechaCarga: string;
    porcentaje: number;
    usuarioResponsable: string;
    validez: string | null; // Si es null es perpetuo
}

export interface MargenCredito {
    id: string;
    fechaCarga: string;
    monto: number;
    usuarioResponsable: string;
    validez: string | null; // Si es null es perpetuo
}

export interface ListaPrecio {
    id: string;
    nombre: string;
}

export interface Address {
    id: string;
    domicilio: string;
    localidad: string;
    codigoPostal: string;
    provinciaId: string;
    telefono: string;
    responsable: string;
    vendedorId: string;
    email: string;
    esDomicilioEntrega: boolean;
    transporteId: string;
    diasHorariosEntrega: string;
}

export interface CommercialManagement {
    id: string;
    clienteId: string;
    fecha: string;
    usuarioId: string;
    trato: string;
    respuesta: string;
}

export interface Client {
    id: string;
    razonSocial: string;
    nombreFantasia: string;
    cuit: string;
    vencimientoAFIP: string;
    numeroIIBB: string;
    vencimientoIIBB: string;
    condicionIVAId: string;
    tipoIIBBId: string;
    email: string;
    fechaAlta: string;
    fechaBaja: string | null;
    fechaUltimaCompra: string | null;
    estadoId: ClientStatus;
    rubroId: string;
    subRubroId: string;
    observaciones: string;

    // Condicion Comercial
    condicionVentaId: string;
    vendedorId: string;
    bonificaciones: Bonificacion[];
    margenesCredito: MargenCredito[];
    listaPrecioId: string;

    // Domicilios
    domicilios: Address[];

    // Virtuales / Calculados para UI
    ultimaActividad?: string;
}
