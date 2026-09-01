import Users from '../models/users.model.js';
import bcrypt from 'bcrypt';
import { seedRolesAdmin } from './001.roles.seed.js';
import { seedRolesRequestMaganer } from './001.roles.seed.js';
import { seedRolesHospitalMaganer } from './001.roles.seed.js';

export async function seedUsersAdmin() {
    const adminId = await seedRolesAdmin();
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const [adminUser] = await Users.findOrCreate({
        where: { email: 'admin@riwi.co' },
        defaults: {
            first_name: 'Admin',
            last_name: 'Riwi',
            email: 'admin@riwi.co',
            password: hashedPassword,
            birth_date: '1990-01-01',
            document_number: 123456789,
            document_type: 'CC',
            rol: adminId.id
        }
    });

    return adminUser;
}

export async function seedUsersRequestMaganer() {
    const requestManagerId = await seedRolesRequestMaganer();
    const hashedPassword = await bcrypt.hash('requestmanager123', 10);

    const [requestManagerUser] = await Users.findOrCreate({
        where: { email: 'requestmanager@riwi.co' },
        defaults: {
            first_name: 'Request',
            last_name: 'Manager',
            email: 'requestmanager@riwi.co',
            password: hashedPassword,
            birth_date: '1990-01-01',
            document_number: 987654321,
            document_type: 'CC',
            rol: requestManagerId.id
        }
    });

    return requestManagerUser;
}

export async function seedUsersHospitalManager() {
    const hospitalManagerId = await seedRolesHospitalMaganer();
    const hashedPassword = await bcrypt.hash('hospitalmanager123', 10);

    const [hospitalManagerUser] = await Users.findOrCreate({
        where: { email: 'hospitalmanager@riwi.co' },
        defaults: {
            first_name: 'Hospital',
            last_name: 'Manager',
            email: 'hospitalmanager@riwi.co',
            password: hashedPassword,
            birth_date: '1990-01-01',
            document_number: 123434789,
            document_type: 'CC',
            rol: hospitalManagerId.id
        }
    });

    return hospitalManagerUser;
}