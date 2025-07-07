<?php
// thankyou.php - The Gatekeeper

session_start(); // Start the session to retrieve the key

$is_authorized = false;
$redirect_if_unauthorized = "subscribe-post40gains.html"; // Redirect back to your opt-in page
$redirect_if_authorized = "thankyou.html";               // Redirect to your actual content page

// Check if an access key exists in the session
if (isset($_SESSION['access_key'])) {
    $is_authorized = true;
    // OPTIONAL: Uncomment the line below if you want the key to be valid for ONLY ONE visit
    // after which the user would need to re-opt-in to access the content.
    // unset($_SESSION['access_key']);
}

// If authorized, redirect to the actual thank you HTML page
if ($is_authorized) {
    header("Location: " . $redirect_if_authorized);
    exit();
} else {
    // If not authorized (no valid key in session), redirect back to the opt-in page
    header("Location: " . $redirect_if_unauthorized);
    exit();
}
?>
