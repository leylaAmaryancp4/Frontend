import { Role } from '../models/role.model.js';

const ROLES = [
  { name: 'user', description: 'Default user role' },
  { name: 'admin', description: 'Administrator role with full access' },
  { name: 'doctor', description: 'Doctor role for managing patients' },
  { name: 'hospital', description: 'Hospital role for managing records' },
];

export const seedRoles = async (req, res) => {
  try {
    // Using an upsert strategy is safer than deleting all roles.
    // This will insert roles if they don't exist and do nothing if they do.
    const operations = ROLES.map(role => ({
      updateOne: {
        filter: { name: role.name },
        update: { $setOnInsert: role },
        upsert: true,
      },
    }));

    const result = await Role.bulkWrite(operations);

    res.status(200).json({
      message: 'Roles seeded successfully!',
      newRolesCreated: result.upsertedCount,
    });
  } catch (err) {
    console.error('Error seeding roles:', err);
    res.status(500).json({ error: err.message || 'Server error while seeding roles' });
  }
};