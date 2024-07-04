export const projectResources: object[] = [
    { resourceId: 1, resourceName: 'Project Manager' },
    { resourceId: 2, resourceName: 'Software Analyst' },
    { resourceId: 3, resourceName: 'Developer' },
    { resourceId: 4, resourceName: 'Testing Engineer' }
];

export const data: object[] = [
    {
        TaskID: 1,
        TaskName: 'DS1 / - / DRA 702',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 2, TaskName: 'DS2 / - / DRA713', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, resources: [2, 3] },
            { TaskID: 3, TaskName: 'DS3 / - / Resulting Object', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50, resources: [2] },
            { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Predecessor: '3FS', Progress: 50, resources: [1] },
        ]
    },
    {
        TaskID: 5,
        TaskName: 'DS4 / - / DRA714',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 6, TaskName: 'DS5 / - / DRA714', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
            { TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50, resources: [1, 3, 5] },
            { TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Predecessor: '7SS', Progress: 50 }
        ]
    },
];