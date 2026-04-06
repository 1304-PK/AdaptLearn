const supabase = require("../lib/supabaseClient");

const createUser = async (req, res) => {
    const {
        employee_email,
        password,
        full_name,
        employee_id,
        job_title,
        department,
        joining_date,
        created_by
    } = req.body;

    console.log(req.body);

    try {
        // 1. Create the user in Supabase Auth
        // We use admin.createUser so we can set the password and metadata directly
        const { data, error } = await supabase.auth.admin.createUser({
            email: employee_email,
            password: password,
            email_confirm: true, // Automatically confirms the email
            user_metadata: {
                role: 'employee', // Tells your SQL trigger where to route this user
                full_name,
                employee_id,
                job_title,
                department,
                joining_date,
                created_by // The UUID of the HR manager
            }
        });

        if (error) throw error;

        return res.status(201).json({
            message: "Employee created successfully",
            user: data.user
        });

    } catch (error) {
        console.error("Signup Error:", error.message);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { createUser };
