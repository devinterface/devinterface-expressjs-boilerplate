
exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert({
    email: 'info@devinterface.com',
    password: '$2a$10$pdbvH.ReqZ6LakV0H8E6FOANr7Sxqw1C0P2emDlU0th5P2Rn88m7G', // password,
    role: 0,
    created_at: new Date(),
    updated_at: new Date()
  })
}
