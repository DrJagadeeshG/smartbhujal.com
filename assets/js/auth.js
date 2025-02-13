// Supabase Authentication Setup
document.addEventListener("DOMContentLoaded", async function () {
    const SUPABASE_URL = "{{ SUPABASE_URL }}";
    const SUPABASE_ANON_KEY = "{{ SUPABASE_ANON_KEY }}";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.error("🚨 Supabase credentials are missing!");
        return;
    }

    // Initialize Supabase Client
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Function to Open Login when "Search" Button is Clicked
    window.openLogin = function () {
        const authContainer = document.getElementById("auth-container");
        if (authContainer.style.display === "none" || authContainer.style.display === "") {
            authContainer.style.display = "block"; // Show login
        }
    };

    // Render the authentication UI inside #auth-container
    const { Auth } = supabase.auth;

    Auth.mount("#auth-container", {
        appearance: {
            theme: "dark",
            variables: {
                primaryButtonBackground: "#2563eb",
                primaryButtonText: "#ffffff",
                inputBackground: "#f3f4f6",
                inputBorder: "#d1d5db",
                inputText: "#374151",
            }
        },
        providers: ["google", "github"], // Enable Google & GitHub login
        redirectTo: "https://www.smartbhujal.com/gwflowai.html"
    });

    // Handle Login Event
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
            document.getElementById("auth-container").innerHTML = `<h2>Welcome, ${session.user.email}!</h2>`;
        }
    });
});
