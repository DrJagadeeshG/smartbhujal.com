// Fetch Supabase credentials dynamically
const SUPABASE_URL = "{{ SUPABASE_URL }}";  // Injected from GitHub Secrets
const SUPABASE_ANON_KEY = "{{ SUPABASE_ANON_KEY }}";  // Injected from GitHub Secrets

// Ensure credentials exist
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes("{{")) {
    console.error("🚨 Supabase credentials are missing! Ensure GitHub Secrets are properly configured.");
} else {
    console.log("✅ Supabase Credentials Loaded");
}

// Initialize Supabase
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
        const searchButton = document.getElementById("search-button");

        if (searchButton) {
            searchButton.innerText = `Welcome, ${session.user.email.split("@")[0]}`;
            searchButton.disabled = true; // Disable button after login
        }
    }
});
