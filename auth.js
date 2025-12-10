import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const supabaseUrl = 'https://ftrlgqmizqnntzpfsqnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cmxncW1penFubnR6cGZzcW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyODk2OTEsImV4cCI6MjA3OTg2NTY5MX0.oWW_Xbs2oUL1sCcIOhEmHo_di29Vrg_oFlnPWODap00';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function handleSignUp(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/index.html`
            }
        });
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function handleSignIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function handleSignOut() {
    try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function checkAuth() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
            return null;
        }
        
        return user;
    } catch (error) {
        return null;
    }
}
