<?php
// process_optin.php

session_start(); // Start the session to store the key

// In a real Follow.it setup, after a successful subscription, Follow.it redirects
// the user's browser to this URL. We assume reaching this page means a successful opt-in.

// Generate a unique, strong key
$access_key = bin2hex(random_bytes(16)); // Generates a 32-character hexadecimal key

// Store the key in the user's session
$_SESSION['access_key'] = $access_key;

// Redirect the user immediately to the thank you page gatekeeper
// This makes sure the key is set before they hit the gatekeeper.
header("Location: thankyou.php");
exit();
?>
