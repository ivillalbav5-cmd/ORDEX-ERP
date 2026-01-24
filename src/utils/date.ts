/**
 * Formatea una fecha string a formato premium: DD MMM YYYY (ej: 26 FEB 2026)
 */
export function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return '-';

    // Manejar casos especiales de mock data
    if (dateString.toLowerCase().includes('hace') || dateString.toLowerCase().includes('ayer')) {
        return dateString.toUpperCase();
    }

    const months = [
        'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
        'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
    ];

    try {
        // Intentar parsear fecha (DD/MM/YYYY o YYYY-MM-DD)
        let date: Date;

        if (dateString.includes('/')) {
            const [day, month, year] = dateString.split('/').map(Number);
            date = new Date(year, month - 1, day);
        } else {
            date = new Date(dateString);
        }

        if (isNaN(date.getTime())) return dateString.toUpperCase();

        const d = date.getDate();
        const m = months[date.getMonth()];
        const y = date.getFullYear();

        return `${d} ${m} ${y}`;
    } catch (e) {
        return dateString.toUpperCase();
    }
}
