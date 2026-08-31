import Roles from '../models/roles.model.js';

export async function seedRolesAdmin() {
    const [adminRol] = await Roles.findOrCreate({
        where: { rol_name: 'admin' },
        defaults: { rol_name: 'admin' }
    });

    return adminRol;
}

export async function seedRolesRequestMaganer() {
    const [requestManagerRol] = await Roles.findOrCreate({
        where: { rol_name: 'request manager' },
        defaults: { rol_name: 'request manager' }
    });

    return requestManagerRol;
}

export async function seedRolesHospitalMaganer() {
    const [hospitalManagerRol] = await Roles.findOrCreate({
        where: { rol_name: 'hospital manager' },
        defaults: { rol_name: 'hospital manager' }
    });

    return hospitalManagerRol;
}