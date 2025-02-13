// Ensure Supabase SDK is available globally
let supabase;

// Wait for the document to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Define Supabase constants
    const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
    const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

    // Ensure Supabase credentials exist
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.error("🚨 Supabase credentials are missing!");
        return;
    }

    // Initialize Supabase Client (Global Scope)
    supabase = window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase Initialized");

    // Function to Open Supabase Auth Window
    window.openSupabaseAuth = async function () {
        console.log("🔄 Opening Supabase Auth...");

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google", // Use "github" for GitHub login
                options: {
                    redirectTo: "https://www.smartbhujal.com/gwflowai.html"
                }
            });

            if (error) {
                console.error("🚨 Authentication Error:", error.message);
            } else {
                console.log("✅ Supabase Auth Window Opened");
            }
        } catch (err) {
            console.error("🚨 Unexpected Error:", err);
        }
    };

    // Handle Authentication State Change
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
            console.log("✅ User Logged In:", session.user.email);
            document.getElementById("search-button").innerText = `Welcome, ${session.user.email}`;
        }
    });
});
