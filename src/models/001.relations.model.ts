import Hospital from './hospital.model.js';
import inventory from './inventory.model.js';
import medicines from './medicines.model.js';
import Roles from './roles.model.js';
import Users from './users.model.js';
import Warehouse from './warehouse.model.js';

////////////////////////////////////////////////////////////
// Roles relations
// Relation between Roles and Users
Roles.hasMany(Users, { foreignKey: 'rol_id' });
Users.belongsTo(Roles, { foreignKey: 'rol_id' });

////////////////////////////////////////////////////////////
// Users relations
// Relation between Users and Hospital
Users.belongsTo(Hospital, { foreignKey: 'responsable' });
Hospital.hasMany(Users, { foreignKey: 'responsable' });

////////////////////////////////////////////////////////////
// Warehouse relations
// Relation between Warehouse and Inventory
Warehouse.belongsTo(inventory, { foreignKey: 'warehouse_id' });
inventory.hasMany(Warehouse, { foreignKey: 'warehouse_id' });

////////////////////////////////////////////////////////////
// Medicines relations
// Relation between Medicines and Inventory
medicines.hasMany(inventory, { foreignKey: 'medication_id' });
inventory.belongsTo(medicines, { foreignKey: 'medication_id' });