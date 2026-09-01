import Medicines from '../models/medicines.model.js';

export async function seedMedicines() {
    const [medicine] = await Medicines.findOrCreate({
        where: { medication_name: 'Paracetamol' },
        defaults: {
            medication_name: 'Paracetamol',
            medication_description: 'Analgesic and antipyretic'
        }
    });

    return medicine;
}