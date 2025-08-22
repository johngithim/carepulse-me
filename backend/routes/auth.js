

const router = express.Router();

// Register
router.post("/doctor/register", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    age,
    phoneno,
    address,
    speciality,
    telegram,
    whatsapp,
    password,
  } = req.body;


    
  const hashed = await bcrypt.hash(password, 10);

  try {

    await pool.query(
      "INSERT INTO doctor (firstname, lastname, email, age, phoneno, adress, speciality, telegram, whatsapp, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstname,
        lastname,
        email,
        age,
        phoneno,
        address,
        speciality,
        telegram,
        whatsapp,
        hashed,
      ],
    );

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Email already exists or DB error" });
  }
});

// Login


  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password);


  if (!doctorId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const [existing] = await pool.query('SELECT * FROM doctor WHERE id = ?', [doctorId]);

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const current = existing[0];

    // Use new values if provided, otherwise keep the old ones
    const updatedDoctor = {
      firstname: fields.firstname || current.firstname,
      lastname: fields.lastname || current.lastname,
      age: fields.age || current.age,
      phoneno: fields.phoneno || current.phoneno,
      adress: fields.adress || current.adress,
      speciality: fields.speciality || current.speciality,
      telegram: fields.telegram || current.telegram,
      whatsapp: fields.whatsapp || current.whatsapp
    };

    // Perform the update
    await pool.query(
      `UPDATE doctor SET firstname = ?, lastname = ?, age = ?, phoneno = ?, adress = ?, speciality = ?, telegram = ?, whatsapp = ? WHERE id = ?`,
      [
        updatedDoctor.firstname,
        updatedDoctor.lastname,
        updatedDoctor.age,
        updatedDoctor.phoneno,
        updatedDoctor.adress,
        updatedDoctor.speciality,
        updatedDoctor.telegram,
        updatedDoctor.whatsapp,
        doctorId
      ]
    );

    res.status(200).json({ message: 'Doctor profile updated successfully' });

  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Database update failed', error: err.message });
  }
});

// Edit Profile for doctors
router.put("/doctor/profile", verifyToken, async (req, res) => {
  const doctorId = req.user.id;
  const fields = req.body;

  if (!doctorId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const [existing] = await pool.query("SELECT * FROM doctor WHERE id = ?", [
      doctorId,
    ]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const current = existing[0];

    // Use new values if provided, otherwise keep the old ones
    const updatedDoctor = {
      firstname: fields.firstname || current.firstname,
      lastname: fields.lastname || current.lastname,
      age: fields.age || current.age,
      phoneno: fields.phoneno || current.phoneno,
      adress: fields.adress || current.adress,
      speciality: fields.speciality || current.speciality,
      telegram: fields.telegram || current.telegram,
      whatsapp: fields.whatsapp || current.whatsapp,
    };

    // Perform the update
    await pool.query(
      `UPDATE doctor SET firstname = ?, lastname = ?, age = ?, phoneno = ?, adress = ?, speciality = ?, telegram = ?, whatsapp = ? WHERE id = ?`,
      [
        updatedDoctor.firstname,
        updatedDoctor.lastname,
        updatedDoctor.age,
        updatedDoctor.phoneno,
        updatedDoctor.adress,
        updatedDoctor.speciality,
        updatedDoctor.telegram,
        updatedDoctor.whatsapp,
        doctorId,
      ],
    );

    res.status(200).json({ message: "Doctor profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res
      .status(500)
      .json({ message: "Database update failed", error: err.message });
  }
});

module.exports = router;
