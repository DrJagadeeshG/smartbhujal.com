// Wait for the Supabase SDK to load before initializing
document.addEventListener("DOMContentLoaded", function () {
    if (typeof supabase === "undefined") {
        console.error("🚨 Supabase SDK is not loaded. Check script order in gwflowai.html!");
        return;
    }

    // Define Supabase constants
    const SUPABASE_URL = "https://auzqfsljjbcvlhbgtivm.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

    // Initialize Supabase Client
    window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase Initialized");

    // Function to Open Supabase Auth Window
    window.openSupabaseAuth = async function () {
        console.log("🔄 Opening Supabase Auth...");

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google", // Change to "github" if needed
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
