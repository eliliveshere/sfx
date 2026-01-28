export const MOCK_JOBS = [
    {
        id: 'j1',
        clientName: 'Alice Johnson',
        address: '123 Maple St',
        status: 'In Progress',
        date: '2023-10-25',
        description: 'Leaky kitchen sink faucet',
        email: 'alice.j@example.com',
        phone: '(555) 123-4567',
        notes: 'Gate code is #1234. Watch out for the dog.'
    },
    {
        id: 'j2',
        clientName: 'Bob Smith',
        address: '456 Oak Ave',
        status: 'Scheduled',
        date: '2023-10-26',
        description: 'Water heater maintenance',
        email: 'bob.smith@example.com',
        phone: '(555) 987-6543',
        notes: 'Water heater is in the garage. Call before arriving.'
    },
    {
        id: 'j3',
        clientName: 'Carol White',
        address: '789 Pine Ln',
        status: 'Completed',
        date: '2023-10-24',
        description: 'Toilet installation',
        email: 'carol.white@example.com',
        phone: '(555) 555-5555',
        notes: 'Master bathroom upstairs.'
    },
];

export const MOCK_PARTS = [
    // Pipes
    { id: 'p1', name: '1/2" PEX Pipe (10ft)', category: 'Pipes', cost: 4.50, price: 8.00 },
    { id: 'p6', name: '3/4" PEX Pipe (10ft)', category: 'Pipes', cost: 6.50, price: 11.00 },
    { id: 'p7', name: '1" PEX Pipe (10ft)', category: 'Pipes', cost: 9.00, price: 16.00 },
    { id: 'p8', name: '1/2" Copper Type L (10ft)', category: 'Pipes', cost: 22.00, price: 38.00 },
    { id: 'p9', name: '2" PVC Sch 40 (10ft)', category: 'Pipes', cost: 14.00, price: 24.00 },

    // Valves
    { id: 'p2', name: '3/4" Brass Ball Valve', category: 'Valves', cost: 12.00, price: 22.00 },
    { id: 'p10', name: '1/2" PEX Ball Valve', category: 'Valves', cost: 8.50, price: 15.00 },
    { id: 'p11', name: 'Angle Stop Valve 1/2"', category: 'Valves', cost: 6.00, price: 12.00 },
    { id: 'p12', name: 'Pressure Reducing Valve 3/4"', category: 'Valves', cost: 65.00, price: 120.00 },

    // Seals & Gaskets
    { id: 'p3', name: 'Toilet Wax Ring', category: 'Seals', cost: 2.50, price: 6.00 },
    { id: 'p13', name: 'Tank to Bowl Gasket', category: 'Seals', cost: 4.00, price: 9.00 },
    { id: 'p14', name: 'O-Ring Kit (Assorted)', category: 'Seals', cost: 15.00, price: 30.00 },
    { id: 'p15', name: 'Plumbers Putty', category: 'Seals', cost: 3.00, price: 7.00 },

    // Repair Parts
    { id: 'p4', name: 'Faucet Cartridge (Moen)', category: 'Repair Parts', cost: 18.00, price: 35.00 },
    { id: 'p16', name: 'Toilet Flapper 3"', category: 'Repair Parts', cost: 5.50, price: 12.00 },
    { id: 'p17', name: 'Fill Valve Universal', category: 'Repair Parts', cost: 11.00, price: 25.00 },
    { id: 'p18', name: 'Garbage Disposal 1/2 HP', category: 'Repair Parts', cost: 95.00, price: 165.00 },
    { id: 'p19', name: 'Water Heater Element', category: 'Repair Parts', cost: 14.00, price: 32.00 },

    // Fittings
    { id: 'p5', name: 'PVC Elbow 90deg 2"', category: 'Fittings', cost: 0.80, price: 2.50 },
    { id: 'p20', name: 'PEX 1/2" Tee', category: 'Fittings', cost: 1.20, price: 3.50 },
    { id: 'p21', name: 'PEX 1/2" 90deg Elbow', category: 'Fittings', cost: 0.90, price: 2.50 },
    { id: 'p22', name: 'Copper 3/4" Coupling', category: 'Fittings', cost: 1.80, price: 4.00 },
    { id: 'p23', name: 'SharkBite 1/2" Coupling', category: 'Fittings', cost: 8.00, price: 15.00 },
    { id: 'p24', name: 'PVC Sanitary Tee 3"', category: 'Fittings', cost: 4.50, price: 10.00 }
];

export const MOCK_SUPPLIERS = [
    { id: 's1', name: 'PlumberSupplyCo' },
    { id: 's2', name: 'MegaDepot' },
    { id: 's3', name: 'LocalHardware' },
];

export const MOCK_INVOICES = [
    {
        id: 'inv-001',
        jobId: 'j3',
        number: 1001,
        date: '2023-10-24T14:30:00.000Z',
        status: 'Sent',
        subtotal: 416.67,
        tax: 33.33,
        total: 450.00,
        items: [
            { name: 'Toilet Installation (Labor)', qty: 2, price: 150.00 },
            { name: 'Toilet Wax Ring', qty: 1, price: 6.00 },
            { name: 'Angle Stop Valve 1/2"', qty: 1, price: 12.00 },
            { name: 'Haul Away Old Unit', qty: 1, price: 45.00 }
        ]
    },
    {
        id: 'inv-002',
        jobId: 'j2',
        number: 1002,
        date: '2023-10-22T09:15:00.000Z',
        status: 'Paid',
        subtotal: 116.20,
        tax: 9.30,
        total: 125.50,
        items: [
            { name: 'Service Call / Diagnostic', qty: 1, price: 85.00 },
            { name: 'Thermocouple Replacement', qty: 1, price: 25.00 },
            { name: 'Misc Shop Supplies', qty: 1, price: 6.20 }
        ]
    },
];
