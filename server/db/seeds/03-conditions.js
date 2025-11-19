export async function seed(knex) {
  await knex('conditions').del()
  await knex('conditions').insert([
    {
      id: 1,
      description: 'Used',
    },
    {
      id: 2,
      description: 'Like New',
    },
    {
      id: 3,
      description: 'New',
    },
  ])
}
