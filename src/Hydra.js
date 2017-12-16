export function paginatedHydraData(data) {
    return {
        pagination: {
            total: data['hydra:totalItems'],
            current: data['hydra:view']['@id'],
            first: data['hydra:view']['hydra:first'],
            last: data['hydra:view']['hydra:last'],
            next: data['hydra:view']['hydra:next'],
            prev: data['hydra:view']['hydra:previous'],
        },
        member: data['hydra:member'],
    };
}