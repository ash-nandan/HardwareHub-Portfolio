export async function seed(knex) {
  await knex('conditions').del()
  await knex('conditions').insert([
    {
      id: 1,
      name: 'CPU',
    },
    {
      id: 2,
      name: 'GPU',
    },
    {
      id: 3,
      name: 'Motherboard',
    },
    {
      id: 4,
      name: 'RAM',
    },
    {
      id: 5,
      name: 'Storage',
    },
    {
      id: 6,
      name: 'Power Supply',
    },
  ])
}
